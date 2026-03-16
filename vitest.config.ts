import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: "node",
		include: ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts"],
		exclude: ["node_modules", ".next", "**/e2e/**", "**/tests/**"],
		globals: true,
		setupFiles: [path.resolve(__dirname, "src/test/setup.ts")],
		// Supported at runtime; Vitest 4 typings omit this property
		// @ts-expect-error - environmentMatchGlobs not in InlineConfig
		environmentMatchGlobs: [
			["**/*.test.tsx", "jsdom"],
			["**/projects/**/*.test.tsx", "jsdom"],
		],
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
});
