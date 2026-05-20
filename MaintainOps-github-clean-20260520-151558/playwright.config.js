// LFES Phase 7D: resource-load smoke only. No auth, secrets, or data mutations.
module.exports = {
  testDir: "./tests",
  reporter: "list",
  timeout: 30000,
  use: {
    baseURL: process.env.MAINTAINOPS_BASE_URL || "https://loufish727.github.io/MaintainOps/",
  },
};
