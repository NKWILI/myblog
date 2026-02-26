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
	/** Intro text above portrait (mobile). */
	heroIntroText:
		"Hello, I am Alain. I am an engineer and writer focused on clarity, structure, and building systems that last.",
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
			label: "Tutorial",
			description: "Step-by-step guides and how-tos.",
		},
		{
			href: "/projects",
			label: "Projects",
			description: "Things I build and ship.",
		},
	],
	/** Footer social links. */
	socialLinks: [
		{
			label: "LinkedIn",
			href: "https://www.linkedin.com/in/alain-ngongang-0b57ab19a/",
		},
		{ label: "Email", href: "mailto:ngeukeualain@gmail.com" },
	],
} as const;
