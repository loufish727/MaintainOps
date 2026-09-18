// Shared browser defaults. Live suites enforce their own isolated-QA guards.
module.exports = {
  testDir: "./tests",
  reporter: "list",
  timeout: 30000,
  use: {
    channel: process.env.MAINTAINOPS_CHROMIUM_CHANNEL || undefined,
    baseURL: process.env.MAINTAINOPS_BASE_URL || "https://loufish727.github.io/MaintainOps/",
  },
};
