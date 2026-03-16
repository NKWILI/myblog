export type ProductMetric = {
	label: string;
	value: string;
	trend?: string;
	isFlagship: boolean;
};

export type CaseStudySide = {
	label: string;
	body: string;
	caption: string;
	technologies: string[];
	screenshotPath?: string;
};

export type ProductVersion = {
	id: string;
	versionLabel: string;
	versionName: string;
	date: string;
	isCurrent: boolean;
	techTags: string[];
	problem: CaseStudySide;
	solution: CaseStudySide;
};

export type ProductEvolutionProject = {
	id: string;
	tabLabel: string;
	status: "active" | "in_progress" | "shipped";
	description: string;
	metrics: ProductMetric[];
	versions: ProductVersion[];
};

/**
 * Product Evolution projects.
 *
 * - `id` is a slug used for deep-linking (lowercase, a–z, 0–9, hyphen).
 * - `tabLabel` is the short label shown in the tab bar (max ~30 chars).
 * - `status`, `description`, `metrics`, and `versions` are used by Epics 2–3.
 */
export const productEvolutionProjects: ProductEvolutionProject[] = [
	{
		id: "codex",
		tabLabel: "CODEX",
		status: "active",
		description:
			"AI-native knowledge base for engineering teams, optimized for fast iteration.",
		metrics: [
			{
				label: "Teams onboarded",
				value: "12",
				trend: "up from 3 last quarter",
				isFlagship: true,
			},
			{
				label: "Docs migrated",
				value: "8.4k",
				trend: "legacy wikis and RFCs",
				isFlagship: false,
			},
			{
				label: "Search latency (p95)",
				value: "280 ms",
				trend: "down from 520 ms",
				isFlagship: false,
			},
			{
				label: "Weekly active users",
				value: "160+",
				trend: "eng usage only",
				isFlagship: false,
			},
		],
		versions: [
			{
				id: "codex-v3",
				versionLabel: "v3.0",
				versionName: "AI-native workspace",
				date: "2025-12-10",
				isCurrent: true,
				techTags: ["Next.js", "Vercel KV", "Edge Runtime"],
				problem: {
					label: "The Problem",
					body: "Knowledge was fragmented across wikis, docs, and Slack threads, making it hard for new engineers to find canonical answers.",
					caption: "Before: tribal knowledge scattered across multiple tools.",
					technologies: ["Notion", "Slack"],
				},
				solution: {
					label: "The Solution",
					body: "Unified RFCs, runbooks, and API contracts into a single AI-searchable workspace with opinionated templates.",
					caption:
						"After: one search bar, typed content, and structured templates.",
					technologies: ["Next.js", "TypeScript", "Postgres"],
				},
			},
			{
				id: "codex-v2",
				versionLabel: "v2.1",
				versionName: "Typed content model",
				date: "2025-09-01",
				isCurrent: false,
				techTags: ["TypeScript", "Zod"],
				problem: {
					label: "The Problem",
					body: "Earlier versions allowed arbitrary markdown, which made it easy to introduce inconsistent structures across projects.",
					caption: "Before: free-form markdown with no guarantees.",
					technologies: ["Markdown"],
				},
				solution: {
					label: "The Solution",
					body: "Introduced a typed content model backed by schemas, enabling safer refactors and automated checks.",
					caption: "After: strongly-typed content powering safe migrations.",
					technologies: ["TypeScript", "Zod"],
				},
			},
		],
	},
	{
		id: "fastsite",
		tabLabel: "FastSite",
		status: "in_progress",
		description:
			"Performance-focused marketing sites that ship in days, not weeks.",
		metrics: [
			{
				label: "LCP (p75)",
				value: "1.3 s",
				trend: "on 4G mobile",
				isFlagship: true,
			},
			{
				label: "Core Web Vitals",
				value: "100 / 100 / 98",
				trend: "LCP / CLS / INP",
				isFlagship: false,
			},
			{
				label: "Time-to-first-brief",
				value: "< 48 h",
				trend: "from kickoff to draft",
				isFlagship: false,
			},
			{
				label: "Deploys per month",
				value: "30+",
				trend: "across all client sites",
				isFlagship: false,
			},
		],
		versions: [
			{
				id: "fastsite-v2",
				versionLabel: "v2.0",
				versionName: "Component system",
				date: "2025-11-02",
				isCurrent: true,
				techTags: ["Next.js", "Tailwind CSS", "Storybook"],
				problem: {
					label: "The Problem",
					body: "Each new marketing site was built from scratch, leading to duplicated components and inconsistent UX.",
					caption: "Before: bespoke component sets per site.",
					technologies: ["React"],
				},
				solution: {
					label: "The Solution",
					body: "Introduced a shared component system with design tokens that could be themed per client.",
					caption: "After: one component library, multiple brands.",
					technologies: ["Storybook", "Tailwind CSS", "TypeScript"],
				},
			},
			{
				id: "fastsite-v1",
				versionLabel: "v1.0",
				versionName: "Static-first baseline",
				date: "2025-07-15",
				isCurrent: false,
				techTags: ["Static Export", "ISR"],
				problem: {
					label: "The Problem",
					body: "Dynamic marketing stacks were overkill and often slow, with unnecessary client-side JavaScript.",
					caption: "Before: heavy client bundles for simple pages.",
					technologies: ["Next.js"],
				},
				solution: {
					label: "The Solution",
					body: "Standardized on static-first rendering with incremental updates to keep TTFB low while preserving flexibility.",
					caption: "After: static-first architecture with lean JS.",
					technologies: ["Next.js", "Vercel"],
				},
			},
		],
	},
	{
		id: "signals",
		tabLabel: "Signals",
		status: "shipped",
		description:
			"Lightweight analytics signals that answer product questions in minutes.",
		metrics: [
			{
				label: "Tracked events",
				value: "5.2M",
				trend: "across all environments",
				isFlagship: true,
			},
			{
				label: "Dashboards",
				value: "24",
				trend: "curated for product and eng",
				isFlagship: false,
			},
			{
				label: "Median query time",
				value: "420 ms",
				trend: "for common funnels",
				isFlagship: false,
			},
			{
				label: "Weekly insights",
				value: "8–10",
				trend: "shared with stakeholders",
				isFlagship: false,
			},
		],
		versions: [
			{
				id: "signals-v3",
				versionLabel: "v3.0",
				versionName: "Opinionated funnels",
				date: "2025-10-20",
				isCurrent: true,
				techTags: ["ClickHouse", "Next.js", "tRPC"],
				problem: {
					label: "The Problem",
					body: "Raw event streams required too much expertise to answer basic product questions.",
					caption: "Before: metrics buried in generic BI tools.",
					technologies: ["Snowflake"],
				},
				solution: {
					label: "The Solution",
					body: "Pre-baked funnels and journeys answered the top product questions out of the box.",
					caption: "After: curated dashboards for core flows.",
					technologies: ["ClickHouse", "tRPC", "Next.js"],
				},
			},
			{
				id: "signals-v2",
				versionLabel: "v2.2",
				versionName: "Self-serve queries",
				date: "2025-08-05",
				isCurrent: false,
				techTags: ["SQL", "Drilldowns"],
				problem: {
					label: "The Problem",
					body: "Analysts were a bottleneck for ad-hoc questions from PMs and designers.",
					caption: "Before: custom SQL for every question.",
					technologies: ["SQL"],
				},
				solution: {
					label: "The Solution",
					body: "Added guided query builders that generated safe, parameterized queries on behalf of users.",
					caption: "After: self-serve queries within guardrails.",
					technologies: ["TypeScript", "SQL"],
				},
			},
		],
	},
];
