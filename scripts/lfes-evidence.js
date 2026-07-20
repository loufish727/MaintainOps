const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function evidenceDirectory() {
  return process.env.MAINTAINOPS_LFES_EVIDENCE_DIR
    ? path.resolve(process.env.MAINTAINOPS_LFES_EVIDENCE_DIR)
    : path.join(root, "lfes-evidence");
}

function writeEvidence(fileName, payload) {
  const directory = evidenceDirectory();
  fs.mkdirSync(directory, { recursive: true });
  const filePath = path.join(directory, fileName);
  fs.writeFileSync(filePath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  return filePath;
}

module.exports = { evidenceDirectory, writeEvidence };
