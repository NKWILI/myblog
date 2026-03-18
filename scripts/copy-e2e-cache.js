const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const cacheSrc = path.join(root, "e2e", "fixtures", "posts-cache.json");
const cacheDest = path.join(root, "posts-cache.json");
const imagesSrc = path.join(root, "e2e", "fixtures", "images", "posts");
const imagesDest = path.join(root, "public", "images", "posts");

if (!fs.existsSync(cacheSrc)) {
	console.error("E2E fixture not found:", cacheSrc);
	process.exit(1);
}
fs.copyFileSync(cacheSrc, cacheDest);
console.log("Copied e2e fixture to posts-cache.json");

if (fs.existsSync(imagesSrc)) {
	fs.mkdirSync(imagesDest, { recursive: true });
	for (const name of fs.readdirSync(imagesSrc)) {
		fs.copyFileSync(path.join(imagesSrc, name), path.join(imagesDest, name));
	}
	console.log("Copied e2e fixture images to public/images/posts");
}
