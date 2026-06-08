const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const appDir = path.join(rootDir, "evrostil");
const appBuildDir = path.join(appDir, "build");
const rootBuildDir = path.join(rootDir, "build");

execFileSync("npm", ["install"], {
  cwd: appDir,
  stdio: "inherit",
  shell: true,
});

execFileSync("npm", ["run", "build"], {
  cwd: appDir,
  stdio: "inherit",
  shell: true,
  env: {
    ...process.env,
    CI: "false",
  },
});

fs.rmSync(rootBuildDir, { recursive: true, force: true });
fs.cpSync(appBuildDir, rootBuildDir, { recursive: true });