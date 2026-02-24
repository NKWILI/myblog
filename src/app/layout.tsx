import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-sans-family",
});
const sourceSerif = Source_Serif_4({
	subsets: ["latin"],
	variable: "--font-heading-family",
});
const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-mono-family",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://your-site.com";

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: "Notes By Alain Ngongang",
		template: "%s | Notes By Alain Ngongang",
	},
	description:
		"Essays and technical notes on software architecture, testing strategy, AI systems, and scalable product design. Written by Alain Ngongang for developers who think in systems.",
	openGraph: {
		title: "Notes By Alain Ngongang",
		description:
			"Essays and technical notes on software architecture, testing strategy, AI systems, and scalable product design. Written by Alain Ngongang for developers who think in systems.",
		url: siteUrl,
		siteName: "Notes By Alain Ngongang",
		images: [
			{
				url: `${siteUrl}/opengraph-image.png`,
				width: 1200,
				height: 630,
				alt: "Notes By Alain Ngongang",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Notes By Alain Ngongang",
		description: "A blog built with Next.js and Notion",
		images: [`${siteUrl}/opengraph-image.png`],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
	manifest: `${siteUrl}/site.webmanifest`,
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={cn(
					inter.variable,
					sourceSerif.variable,
					jetbrainsMono.variable,
					inter.className,
				)}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Layout>{children}</Layout>
				</ThemeProvider>
			</body>
		</html>
	);
}
