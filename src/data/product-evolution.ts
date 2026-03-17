export type ProductMetric = {
	label: string;
	value: string;
	trend?: string;
	isFlagship: boolean;
};

export type CaseStudySide = {
	label: string;
	body: string;
	bodyBullets?: string[];
	caption: string;
	technologies: string[];
	links?: Array<{
		label: string;
		href: string;
	}>;
	screenshotPath?: string;
};

export type VersionImpactMetric = {
	label: string;
	value: string;
	trend?: string;
};

export type VersionUserStory = {
	persona: string;
	goal: string;
	benefit: string;
	acceptanceCriteria: string[];
};

export type ProductVersion = {
	id: string;
	versionLabel: string;
	versionName: string;
	date: string;
	isCurrent: boolean;
	techTags: string[];
	impact?: VersionImpactMetric[];
	userStories?: VersionUserStory[];
	problem: CaseStudySide;
	solution: CaseStudySide;
};

export type ProductEvolutionProject = {
	id: string;
	tabLabel: string;
	status: "active" | "in_progress" | "shipped";
	description: string;
	liveSiteUrl?: string;
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
			"Central hub for a local tech community — learn together, share tips, and join workshops.",
		liveSiteUrl: "https://www.codex-cmr.com/",
		metrics: [
			{
				label: "Community members",
				value: "130+",
				trend: "worldwide — across Germany, France, and beyond",
				isFlagship: true,
			},
			{
				label: "Website visits",
				value: "178",
				trend: "unique landings / 30 days",
				isFlagship: false,
			},
			{
				label: "Top acquisition",
				value: "Google + LinkedIn",
				trend: "33 + 13 referrers — organic only",
				isFlagship: false,
			},
			{
				label: "Signup conversion",
				value: "115 → 130+",
				trend: "visitors who became members",
				isFlagship: false,
			},
		],
		versions: [
			{
				id: "codex-v4",
				versionLabel: "v4.0",
				versionName: "Member search directory (skills + university)",
				date: "2026-06-20",
				isCurrent: true,
				techTags: ["Next.js", "Supabase", "Tailwind CSS", "Lucide", "React"],
				impact: [
					{
						label: "Faster connections",
						value: "Find members instantly",
						trend: "search by skills or university",
					},
					{
						label: "Less noise",
						value: "Fewer unanswered questions",
						trend: "reduces group spam",
					},
					{
						label: "Premium UX",
						value: "Search + quick filters",
						trend: "mobile + desktop optimized",
					},
				],
				userStories: [
					{
						persona: "CODEX member",
						goal: "search for other members by skill or university",
						benefit:
							"find the right person instantly without spamming the group with unanswered questions",
						acceptanceCriteria: [
							"Search directory is available at /dashboard/search",
							"Members can be found by skill and university",
							"Quick filters (e.g. DevOps, cyber, Berlin) are available",
							"Search is responsive and usable on mobile and desktop",
						],
					},
				],
				problem: {
					label: "The Problem",
					body: "Members struggled to find the right person inside the community.",
					bodyBullets: [
						"Members asked for specific skills (e.g. DevOps, CI/CD) in the group",
						"Questions often went unanswered, creating frustration",
						"There was no searchable directory to discover who knows what",
					],
					caption: "Before: high-signal questions got lost in chat noise.",
					technologies: ["WhatsApp", "Manual asking"],
					screenshotPath: "/screenshots/codex-v4-problem.png",
				},
				solution: {
					label: "The Solution",
					body: "Implemented a member search engine in the dashboard.",
					bodyBullets: [
						"Built /dashboard/search: a searchable directory of visible members",
						"Server-side auth + member list fetch using Supabase SSR client",
						"Client-side filtering: normalize text (lowercase + remove accents) and match all query terms (AND) against combined member fields",
						"UX: quick filters (DevOps, cyber, Berlin), clear button, Enter-to-search, responsive filters (mobile dropdown + desktop pills)",
					],
					caption:
						"After: find members by skills/university in seconds—without spamming the group.",
					technologies: [
						"Next.js App Router",
						"Supabase SSR",
						"Tailwind CSS",
						"Lucide React",
						"React",
					],
					links: [],
				},
			},
			{
				id: "codex-v3",
				versionLabel: "v3.0",
				versionName: "Member dashboard + self-serve profile updates",
				date: "2026-02-15",
				isCurrent: false,
				techTags: ["Next.js", "Supabase", "Zod", "Vitest", "Playwright"],
				impact: [
					{
						label: "Data accuracy",
						value: "Self-serve member profiles",
						trend: "members can update city, status, skills anytime",
					},
					{
						label: "Operational load",
						value: "No more manual sheet edits",
						trend: "replaces constant spreadsheet maintenance",
					},
					{
						label: "Trust & access",
						value: "Google sign-in",
						trend: "account creation with OAuth + secure sessions",
					},
				],
				userStories: [
					{
						persona: "CODEX member",
						goal: "update my personal information (city, status, skills, etc.)",
						benefit:
							"my profile always reflects my current situation and other members can find me with accurate data",
						acceptanceCriteria: [
							"Sign in with Google (OAuth) with a persistent session",
							"Profile form is validated (e.g. Zod) before saving",
							"Profile updates are saved to the database and reflected immediately",
							"Welcome email is sent on first account creation",
						],
					},
				],
				problem: {
					label: "The Problem",
					body: "Member data became hard to maintain as the community scaled.",
					bodyBullets: [
						"Profiles lived in a spreadsheet and drifted out of date",
						"Members change city, student status, and skills frequently",
						"Manual updates were slow, inconsistent, and error-prone",
					],
					caption:
						"Before: stale member info and constant spreadsheet maintenance.",
					technologies: ["Excel/Sheets", "Manual updates"],
				},
				solution: {
					label: "The Solution",
					body: "Built a dashboard so members can manage their own profiles.",
					bodyBullets: [
						"Google OAuth sign-in + secure sessions",
						"Supabase-backed member profiles (Auth + DB)",
						"Zod validation to keep data clean and consistent",
						"Resend welcome email on first account creation",
						"Tested with Vitest (unit) + Playwright (e2e)",
					],
					caption:
						"After: a secure dashboard where members keep their own profiles up to date.",
					technologies: [
						"Supabase Auth",
						"Supabase DB",
						"Zod",
						"Resend",
						"Playwright",
					],
					links: [],
				},
			},
			{
				id: "codex-v2",
				versionLabel: "v2.0",
				versionName: "Scroll-driven animation with GSAP (GreenSock)",
				date: "2025-06-15",
				isCurrent: false,
				techTags: ["GSAP", "ScrollTrigger", "Next.js", "React", "A11y"],
				impact: [
					{
						label: "Storytelling UX",
						value: "Scroll-driven cinematic flow",
						trend: "every section feels deliberate but stays responsive",
					},
					{
						label: "Workshops discovery",
						value: "Pinned horizontal carousel",
						trend: "desktop section pins + horizontal scroll narrative",
					},
					{
						label: "Stability",
						value: "Route-change safe triggers",
						trend: "ScrollTrigger refresh to avoid fragile animations",
					},
				],
				userStories: [
					{
						persona: "new visitor",
						goal: "experience a clear, cinematic story while scrolling",
						benefit:
							"understand what CODEX offers without reading a wall of text",
						acceptanceCriteria: [
							"Scroll animations are smooth and responsive",
							"Workshops section pins on desktop and scrolls horizontally",
							"Projects cards animate with a clear progression cue",
						],
					},
					{
						persona: "motion-sensitive user",
						goal: "browse the site without intensive motion",
						benefit: "feel comfortable while still accessing the same content",
						acceptanceCriteria: [
							"Respects prefers-reduced-motion",
							"Content remains readable and navigable with reduced motion",
						],
					},
					{
						persona: "maintainer",
						goal: "keep animations stable across navigation and refreshes",
						benefit: "avoid bugs and broken scroll states during iteration",
						acceptanceCriteria: [
							"ScrollTrigger refreshes on route changes",
							"No duplicate triggers on re-mount",
						],
					},
				],
				problem: {
					label: "The Problem",
					body: "The v1 landing page was functional, but it didn’t convey momentum or guide users through workshops and projects in a way that felt premium on desktop.",
					caption: "Before: static sections with no narrative flow.",
					technologies: ["Static layout", "Basic scroll"],
				},
				solution: {
					label: "The Solution",
					body: "Built the homepage as a scroll-driven story using GSAP + ScrollTrigger. Workshops pin and scroll horizontally with a parallax wordmark. Projects becomes a pinned stack where cards fly up with controlled rotation, synced with a progress bar + active index highlight. A two-row marquee transition adds momentum between sections. The system respects prefers-reduced-motion and stays stable across navigation via a provider that refreshes ScrollTrigger on route changes.",
					links: [
						{
							label: "Here is the link to visualize the result.",
							href: "https://www.linkedin.com/feed/update/urn:li:activity:7428112509548752897/",
						},
						{
							label: "GSAP docs (v3)",
							href: "https://gsap.com/docs/v3/",
						},
					],
					caption:
						"After: cinematic scroll storytelling that stays responsive and stable.",
					technologies: [
						"GSAP",
						"ScrollTrigger",
						"prefers-reduced-motion",
						"Next.js",
						"React",
					],
				},
			},
			{
				id: "codex-v1",
				versionLabel: "v1.0",
				versionName: "Community website + signup funnel",
				date: "2024-01-15",
				isCurrent: false,
				techTags: [
					"Next.js",
					"Tailwind CSS",
					"Resend",
					"Google Sheets API",
					"React Icons",
				],
				impact: [
					{
						label: "Signup intent",
						value: "115 visitors",
						trend: "hit /inscription in 30 days",
					},
					{
						label: "Homepage reach",
						value: "178 visitors",
						trend: "landed on / in 30 days",
					},
					{
						label: "Discovery channels",
						value: "Google + LinkedIn",
						trend: "33 + 13 referrers",
					},
				],
				userStories: [
					{
						persona: "new visitor",
						goal: "understand what CODEX is in under 10 seconds",
						benefit: "decide quickly whether to join the community",
						acceptanceCriteria: [
							"Clear mission and tagline above the fold",
							"Primary CTA visible on mobile and desktop",
							"Fast load and readable contrast",
						],
					},
					{
						persona: "interested member",
						goal: "sign up once and receive the WhatsApp group link automatically",
						benefit: "join without back-and-forth or manual admin work",
						acceptanceCriteria: [
							"Form submits and persists to Google Sheets",
							"Confirmation email is delivered via Resend",
							"Email includes the WhatsApp group link",
							"User sees a clear success/failure state",
						],
					},
					{
						persona: "community member",
						goal: "browse projects and workshops from one place",
						benefit: "discover ways to learn, contribute, and participate",
						acceptanceCriteria: [
							"Projects page lists current initiatives with links",
							"Workshops page is easy to find from navigation",
							"About page explains the community purpose",
						],
					},
				],
				problem: {
					label: "The Problem",
					body: "It was hard to find a local community where people could exchange tips, learn together, and discover workshops in one place.",
					caption: "Before: no central hub to join, share, and collaborate.",
					technologies: ["WhatsApp", "LinkedIn", "Word of mouth"],
				},
				solution: {
					label: "The Solution",
					body: "Shipped an initial website (Home, About, Projects, Workshops, Signup) that acts as the community’s central hub. Signup writes to Google Sheets and auto-sends an email with the WhatsApp group link.",
					caption:
						"After: clear story + simple signup flow to join the community.",
					technologies: [
						"Next.js",
						"Tailwind CSS",
						"Resend",
						"Google Sheets API",
					],
					screenshotPath: "/screenshots/codex-v1-solution.png",
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
