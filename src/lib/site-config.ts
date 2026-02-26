/**
 * Site copy and asset paths. Edit here instead of components.
 */
export const siteConfig = {
	siteName: "Notes by Alain Ngongang",
	/** Optional tagline shown under the site name in the header. Set to empty string to hide. */
	tagline: "Essays and technical notes about Modern Software Engineering.",
	portraitPath: "/potrait.png",
	portraitAlt: "Alain Ngongang",
	recentPostsCount: 5,
	/** Hero headline (e.g. name). */
	heroHeadline: "Alain Ngongang",
	/** Hero subheadline lines (stacked for rhythm). */
	heroSubheadlineLines: [
		"Engineer.",
		"System thinker.",
		"Building software that lasts.",
	],
	/** Hero subtext below the tagline. */
	heroSubtext:
		"I write about modern software engineering, architecture, and the decisions behind real systems.",
	/** Short mission/positioning paragraph (homepage). */
	missionStatement:
		"This blog is where I think in public. I explore engineering tradeoffs, system design decisions, and lessons from building real-world software.",
	/** "Currently Building" section (signals ambition). */
	buildingStatement:
		"Currently building tools and communities focused on helping engineers design stronger systems.",
	/** Footer hireability line. */
	hireabilityLine:
		"Available for engineering collaborations and technical roles.",
	/** CV URL (e.g. Google Drive, Notion). Set in env or here. */
	cvUrl: "",
	aboutParagraph:
		"Engineer and writer. I focus on clarity, structure, and building systems that last. This space is for notes and longer pieces—positioning over persuasion.",
	/** One sentence for About block on mobile. If omitted, aboutParagraph is truncated. */
	aboutShort: "Engineer and writer. Clarity, structure, and systems that last.",
	navItems: [
		{
			href: "/blog",
			label: "Blog",
			description: "Notes and longer pieces on engineering and writing.",
		},
		{
			href: "/tutorial",
			label: "Guides",
			description: "Step-by-step guides and how-tos.",
		},
		{
			href: "/projects",
			label: "Projects",
			description: "Things I build and ship.",
		},
	],
	/** Footer and header social links (LinkedIn, GitHub, Email). CV is separate (cvUrl). */
	socialLinks: [
		{
			label: "LinkedIn",
			href: "https://www.linkedin.com/in/alain-ngongang-0b57ab19a/",
		},
		{ label: "GitHub", href: "https://github.com/NKWILI" },
		{ label: "Email", href: "mailto:ngeukeualain@gmail.com" },
	],
} as const;
