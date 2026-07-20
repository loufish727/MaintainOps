const fs = require("node:fs");
const path = require("node:path");
const { writeEvidence } = require("./lfes-evidence");

const rootDir = path.resolve(__dirname, "..");
const supabaseDir = path.join(rootDir, "supabase");
const migrationsDir = path.join(supabaseDir, "migrations");

function listSqlFiles(directory, relativeBase = directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const absolutePath = path.join(directory, entry.name);
      if (entry.isDirectory()) return listSqlFiles(absolutePath, relativeBase);
      if (!entry.isFile() || !entry.name.endsWith(".sql")) return [];
      return [{
        file: path.relative(relativeBase, absolutePath).replaceAll("\\", "/"),
        absolutePath,
        text: fs.readFileSync(absolutePath, "utf8"),
      }];
    })
    .sort((a, b) => a.file.localeCompare(b.file));
}

function normalize(sql) {
  return sql.replace(/\s+/g, " ").trim().toLowerCase();
}

function extractFunctions(file, text) {
  const functions = [];
  const regex = /create\s+(?:or\s+replace\s+)?function\s+([\s\S]*?)\bas\s+(\$[a-z0-9_]*\$)([\s\S]*?)\2\s*;/gi;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const block = match[0];
    const signature = block.match(/create\s+(?:or\s+replace\s+)?function\s+([^\n]+(?:\n\s*[^\n]+)?)/i)?.[1]?.trim() || "unknown";
    functions.push({ file, signature, block, normalized: normalize(block) });
  }
  return functions;
}

function topLevelGrantStatements(file, text) {
  const withoutBodies = text.replace(/(\$[a-z0-9_]*\$)[\s\S]*?\1/gi, "");
  return [...withoutBodies.matchAll(/^\s*grant\s+[\s\S]*?;/gim)]
    .map((match) => ({ file, statement: normalize(match[0]) }));
}

function verdict(name, status, detail) {
  return { name, status, detail };
}

const files = listSqlFiles(supabaseDir, supabaseDir);
const migrationFiles = listSqlFiles(migrationsDir, supabaseDir);
const allFunctions = files.flatMap(({ file, text }) => extractFunctions(file, text));
const allGrants = files.flatMap(({ file, text }) => topLevelGrantStatements(file, text));
const results = [];

results.push(verdict(
  "sql_inventory_coverage",
  files.length > 0 ? "PASS" : "REVIEW",
  `${files.length} SQL files recursively inspected.`
));

const scannedMigrationFiles = files.filter(({ file }) => file.startsWith("migrations/"));
results.push(verdict(
  "dated_migration_security_coverage",
  migrationFiles.length > 0 && scannedMigrationFiles.length === migrationFiles.length ? "PASS" : "REVIEW",
  `${scannedMigrationFiles.length} of ${migrationFiles.length} dated migrations inspected.`
));

const functionDeclarations = files.reduce(
  (count, { text }) => count + (text.match(/create\s+(?:or\s+replace\s+)?function\b/gi) || []).length,
  0
);
const securityDefiners = allFunctions.filter((fn) => fn.normalized.includes("security definer"));
const missingSearchPath = securityDefiners.filter((fn) => !fn.normalized.includes("set search_path"));
const extractionComplete = allFunctions.length === functionDeclarations;
results.push(verdict(
  "security_definer_extraction_coverage",
  extractionComplete && securityDefiners.length > 0 ? "PASS" : "REVIEW",
  `${allFunctions.length} of ${functionDeclarations} function declarations parsed; ${securityDefiners.length} are security definer.`
));
results.push(verdict(
  "security_definer_search_path",
  missingSearchPath.length === 0 && securityDefiners.length > 0 ? "PASS" : "REVIEW",
  missingSearchPath.length === 0
    ? `${securityDefiners.length} parsed security-definer functions include search_path.`
    : missingSearchPath.map((fn) => `${fn.file}: ${fn.signature}`).join("; ")
));

const anonGrantStatements = allGrants.filter(({ statement }) => /\bto\s+[^;]*\banon\b/.test(statement));
const allowedAnonFunctions = [
  "get_public_request_intake",
  "submit_public_location_request",
  "attach_maintenance_request_photo",
];
const unexpectedAnonGrants = anonGrantStatements.filter(({ statement }) => {
  if (/^grant usage on schema public to /.test(statement)) return false;
  if (!/^grant execute on function public\./.test(statement)) return true;
  return !allowedAnonFunctions.some((functionName) => statement.includes(`public.${functionName}(`));
});
results.push(verdict(
  "anonymous_grant_surface_static",
  unexpectedAnonGrants.length === 0 ? "PASS" : "REVIEW",
  unexpectedAnonGrants.length === 0
    ? `${anonGrantStatements.length} top-level anon grants match the explicit schema/RPC allowlist.`
    : unexpectedAnonGrants.map(({ file, statement }) => `${file}: ${statement}`).join("; ")
));

const destructiveTerms = [
  "delete_work",
  "delete_part",
  "delete asset",
  "equipment_delete",
  "cancel_company_invite",
  "update_company_member_role",
  "create_company_invite",
  "set_company_logo",
  "record_work_order_part_usage",
];
const destructiveFunctions = allFunctions.filter((fn) =>
  destructiveTerms.some((term) => fn.normalized.includes(term.replace(/\s+/g, " ")))
);
const destructiveWithoutRoleLanguage = destructiveFunctions.filter((fn) => {
  const text = fn.normalized;
  return !(
    text.includes("role in ('admin', 'manager')") ||
    text.includes("role = 'admin'") ||
    text.includes("only admins") ||
    text.includes("only managers") ||
    text.includes("is_company_member")
  );
});
results.push(verdict(
  "destructive_rpc_role_language_static",
  destructiveWithoutRoleLanguage.length === 0 && destructiveFunctions.length > 0 ? "PASS" : "REVIEW",
  destructiveWithoutRoleLanguage.length === 0
    ? `${destructiveFunctions.length} destructive/admin function blocks include membership or role-check language.`
    : destructiveWithoutRoleLanguage.map((fn) => `${fn.file}: ${fn.signature}`).join("; ")
));

results.push(verdict(
  "anon_execute_grants_static",
  "INFO",
  anonGrantStatements
    .filter(({ statement }) => statement.startsWith("grant execute on function"))
    .map(({ file, statement }) => `${file}: ${statement}`)
));

const hasReview = results.some((result) => result.status === "REVIEW");
const report = {
  status: hasReview ? "REVIEW" : "PASS",
  scope: "Recursive static SQL inventory and explicit security-pattern inspection; not live policy execution",
  generatedAt: new Date().toISOString(),
  inventory: {
    sqlFiles: files.length,
    datedMigrations: migrationFiles.length,
    parsedFunctions: allFunctions.length,
    parsedSecurityDefiners: securityDefiners.length,
    topLevelAnonGrants: anonGrantStatements.length,
  },
  results,
};

writeEvidence("sql-security-static.json", report);
console.log(JSON.stringify(report, null, 2));
if (hasReview) process.exitCode = 2;
