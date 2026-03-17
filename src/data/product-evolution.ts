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
	websiteTechStack?: string[];
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
		websiteTechStack: [
			"Next.js",
			"App Router",
			"TypeScript",
			"Tailwind CSS",
			"Zod",
			"GSAP",
			"Vercel Analytics",
			"Playwright",
			"Vitest",
			"GitHub Actions",
			"Google Sheets (Apps Script)",
		],
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
			"Modular SaaS website generator: pick a template, customize content/theme, ship a production Next.js site.",
		liveSiteUrl: "https://mvpfastsite.vercel.app/",
		websiteTechStack: [
			"Next.js",
			"App Router",
			"React",
			"TypeScript",
			"Tailwind CSS",
			"CSS Variables",
			"Drizzle ORM",
			"Supabase",
			"Neon",
			"Upstash Redis",
			"Vercel",
			"PayPal",
			"Resend",
			"Sentry",
			"Vitest",
			"Playwright",
		],
		metrics: [
			{
				label: "Web Vitals score",
				value: "80",
				trend: "TTFB 688ms · LCP 2.50s · INP 90ms · FCP 1.75s",
				isFlagship: true,
			},
			{
				label: "Sentry errors (weekly)",
				value: "0",
				trend: "Mar 7–14, 2026",
				isFlagship: false,
			},
			{
				label: "Sentry transactions (weekly)",
				value: "39",
				trend: "Mar 7–14, 2026",
				isFlagship: false,
			},
			{
				label: "Top transaction improvement",
				value: "26.60s → 20.40s",
				trend: "/editor/:templateId (8 txns)",
				isFlagship: false,
			},
		],
		versions: [
			{
				id: "fastsite-v2",
				versionLabel: "v2.0",
				versionName: "CV extraction + form autofill (Gemini)",
				date: "2026-06-01",
				isCurrent: true,
				techTags: ["Next.js", "Supabase", "Gemini", "Zod", "Upstash Redis"],
				impact: [
					{
						label: "Faster onboarding",
						value: "Autofill from CV",
						trend: "users start with structured data instead of blank forms",
					},
					{
						label: "Cost control",
						value: "Guardrails before AI",
						trend: "auth + ownership + rate limit + size checks",
					},
					{
						label: "Reliability",
						value: "Timeout + cleanup",
						trend: "8s abort + deletes temp uploads in finally",
					},
				],
				userStories: [
					{
						persona: "user",
						goal: "fill my portfolio form using information extracted from my CV",
						benefit: "create my portfolio faster with less manual copy/paste",
						acceptanceCriteria: [
							"Upload a PDF to Supabase Storage (client → storage)",
							"Trigger extraction via POST /api/extract-cv with bucket/path/portfolioId",
							"Enforce auth, ownership, rate limit (10/day), and max file size (6MB)",
							"Return structured JSON validated by Zod; user can review/edit before applying",
							"Temp file is deleted in a finally block",
						],
					},
				],
				problem: {
					label: "The Problem",
					body: "Filling portfolio forms from a CV was repetitive and slow.",
					bodyBullets: [
						"Users had to copy/paste bio, skills, education, and links manually",
						"Forms were time-consuming and error-prone",
						"There was no safe, structured extraction pipeline",
					],
					caption: "Before: manual copy/paste slowed portfolio creation.",
					technologies: ["Manual entry", "PDF copy/paste"],
				},
				solution: {
					label: "The Solution",
					body: "Implemented a CV extraction pipeline that returns validated, structured data.",
					bodyBullets: [
						"Upload PDF directly to Supabase Storage from the client (server never handles raw uploads)",
						"Client triggers POST /api/extract-cv with a pointer (bucket/path/portfolioId), not the file bytes",
						"Serverless function runs ordered checks: Auth (401), Ownership (403), Rate limit (429), File size (413)",
						"Downloads PDF via Supabase Admin SDK (SSRF-safe), converts to base64, calls Gemini with prompt + JSON schema",
						"Uses AbortController with an 8-second timeout to return a clean timeout error instead of a generic 504",
						"Validates output with Zod and normalizes data (dates, dedupe skills, icon matching)",
						"Always deletes the temp PDF in finally (no orphaned uploads)",
					],
					caption:
						"After: CV → structured data → editable autofill, with guardrails and cleanup.",
					technologies: [
						"Supabase Storage",
						"Next.js Route Handlers",
						"Upstash Redis",
						"Gemini",
						"Zod",
					],
					screenshotPath: "/screenshots/fastsite-v2-solution.png",
					links: [],
				},
			},
			{
				id: "fastsite-v1",
				versionLabel: "v1.0",
				versionName: "Modular SaaS website generator",
				date: "2026-04-10",
				isCurrent: false,
				techTags: ["Next.js", "React", "Tailwind CSS", "Vercel", "Drizzle ORM"],
				impact: [
					{
						label: "Speed to launch",
						value: "Template → live site",
						trend: "pick, customize, generate, deploy",
					},
					{
						label: "Taste at scale",
						value: "Consistent UI output",
						trend: "reusable templates + runtime theming",
					},
					{
						label: "Production-ready",
						value: "Real Next.js project",
						trend: "deploys to Vercel via API route",
					},
				],
				userStories: [
					{
						persona: "student",
						goal: "create a personal portfolio website by selecting a template, adding my bio, projects, skills, and links, and publishing it online",
						benefit:
							"apply for internships/jobs with a professional web presence",
						acceptanceCriteria: [
							"Select a React template and add bio, projects, skills, and links",
							"Preview updates instantly in a live editor",
							"Publish the portfolio with a shareable URL",
							"Portfolio is mobile-ready and looks professional",
						],
					},
				],
				problem: {
					label: "The Problem",
					body: "Shipping a polished SaaS website repeatedly was too slow and too bespoke.",
					bodyBullets: [
						"Templates are hard to reuse across different products and brands",
						"Theme changes (colors/typography) often require rebuilds",
						"Export + deploy workflows are usually manual and fragile",
					],
					caption: "Before: every site felt like a one-off build.",
					technologies: ["Manual builds", "Custom components"],
				},
				solution: {
					label: "The Solution",
					body: "Built a modular generator with a live editor, runtime theming, and one-click deploy.",
					bodyBullets: [
						"Pick a React template and edit text/images/colors inside a live editor + preview (dynamic imports)",
						"Runtime theming via CSS variables (instant brand changes without rebuilds)",
						"Generate a production Next.js project and deploy it to Vercel via an API route",
						"Back-end route handlers integrate with Vercel Deployments; optional integrations: PayPal, Resend, Sentry",
						"Infra + testing: Drizzle ORM, Supabase + Neon, Upstash Redis rate limiting, Vitest + Playwright",
					],
					caption:
						"After: a repeatable workflow to generate and ship SaaS sites fast.",
					technologies: [
						"Next.js Route Handlers",
						"Vercel Deployment API",
						"Drizzle ORM",
						"Supabase",
						"Neon",
					],
					links: [],
				},
			},
		],
	},
];
