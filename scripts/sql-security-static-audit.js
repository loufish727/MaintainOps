const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const supabaseDir = path.join(rootDir, "supabase");

function sqlFiles() {
  return fs
    .readdirSync(supabaseDir)
    .filter((file) => file.endsWith(".sql"))
    .map((file) => ({ file, text: fs.readFileSync(path.join(supabaseDir, file), "utf8") }));
}

function normalize(sql) {
  return sql.replace(/\s+/g, " ").toLowerCase();
}

function extractFunctions(file, text) {
  const functions = [];
  const regex = /create\s+or\s+replace\s+function\s+([\s\S]*?)(?=create\s+or\s+replace\s+function|grant\s+|revoke\s+|alter\s+table|drop\s+policy|create\s+policy|$)/gi;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const block = match[0];
    const signature = block.match(/create\s+or\s+replace\s+function\s+([^\n]+(?:\n\s*[^\n]+)?)/i)?.[1]?.trim() || "unknown";
    functions.push({ file, signature, block, normalized: normalize(block) });
  }
  return functions;
}

function verdict(name, status, detail) {
  return { name, status, detail };
}

const files = sqlFiles();
const allSql = files.map(({ text }) => text).join("\n");
const allFunctions = files.flatMap(({ file, text }) => extractFunctions(file, text));

const results = [];

const securityDefiners = allFunctions.filter((fn) => fn.normalized.includes("security definer"));
const missingSearchPath = securityDefiners.filter((fn) => !fn.normalized.includes("set search_path"));
results.push(
  verdict(
    "security_definer_search_path",
    missingSearchPath.length === 0 ? "PASS" : "REVIEW",
    missingSearchPath.length === 0
      ? `${securityDefiners.length} security-definer function blocks include search_path.`
      : missingSearchPath.map((fn) => `${fn.file}: ${fn.signature}`).join("; ")
  )
);

const anonGrantLines = allSql
  .split(/\r?\n/)
  .map((line, index) => ({ line: line.trim(), index: index + 1 }))
  .filter(({ line }) => /^grant\s+/i.test(line) && /\banon\b/i.test(line));

const unexpectedAnonGrants = anonGrantLines.filter(({ line }) => {
  const lower = line.toLowerCase();
  return !(
    lower.includes("usage on schema public") ||
    lower.includes("get_public_request_intake") ||
    lower.includes("submit_public_location_request") ||
    lower.includes("attach_maintenance_request_photo") ||
    lower.includes("storage.objects")
  );
});
results.push(
  verdict(
    "anonymous_grant_surface_static",
    unexpectedAnonGrants.length === 0 ? "PASS" : "REVIEW",
    unexpectedAnonGrants.length === 0
      ? `${anonGrantLines.length} anon grant lines found; all match public request/storage intake allowlist.`
      : unexpectedAnonGrants.map(({ index, line }) => `${index}: ${line}`).join("; ")
  )
);

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
  return !(text.includes("role in ('admin', 'manager')") || text.includes("role = 'admin'") || text.includes("only admins") || text.includes("only managers") || text.includes("is_company_member"));
});
results.push(
  verdict(
    "destructive_rpc_role_language_static",
    destructiveWithoutRoleLanguage.length === 0 ? "PASS" : "REVIEW",
    destructiveWithoutRoleLanguage.length === 0
      ? `${destructiveFunctions.length} destructive/admin function blocks include membership or role-check language.`
      : destructiveWithoutRoleLanguage.map((fn) => `${fn.file}: ${fn.signature}`).join("; ")
  )
);

const grantExecuteAnon = anonGrantLines.filter(({ line }) => /execute\s+on\s+function/i.test(line));
results.push(verdict("anon_execute_grants_static", "INFO", grantExecuteAnon.map(({ line }) => line).join(" | ") || "none"));

console.log(JSON.stringify({ generatedAt: new Date().toISOString(), results }, null, 2));

if (results.some((result) => result.status === "REVIEW")) {
  process.exitCode = 2;
}
