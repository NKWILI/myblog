const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const src = path.join(root, "e2e", "fixtures", "posts-cache.json");
const dest = path.join(root, "posts-cache.json");

if (!fs.existsSync(src)) {
	console.error("E2E fixture not found:", src);
	process.exit(1);
}
fs.copyFileSync(src, dest);
console.log("Copied e2e fixture to posts-cache.json");
