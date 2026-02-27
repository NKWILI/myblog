import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	const siteUrl =
		process.env.NEXT_PUBLIC_SITE_URL || "https://www.alainngongang.dev";

	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: "/private/",
			},
			{ userAgent: "GPTBot", allow: "/" },
			{ userAgent: "Google-Extended", allow: "/" },
			{ userAgent: "ClaudeBot", allow: "/" },
		],
		sitemap: `${siteUrl}/sitemap.xml`,
	};
}
