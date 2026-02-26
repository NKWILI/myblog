import { MobileNav } from "@/components/mobile-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { siteConfig } from "@/lib/site-config";
import { FileText, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

function SocialIcon({ label, href }: { label: string; href: string }) {
	const isMail = label === "Email" || href.startsWith("mailto:");
	const isGitHub = label === "GitHub";
	if (isMail) return <Mail className="size-5" />;
	if (isGitHub) return <Github className="size-5" />;
	if (label === "LinkedIn") return <Linkedin className="size-5" />;
	return null;
}

interface LayoutProps {
	children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return (
		<div className="min-h-[100dvh] bg-background">
			<header className="border-b">
				<nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex md:grid md:grid-cols-[1fr_auto_1fr] justify-between md:justify-stretch items-start sm:items-center min-h-16 py-3 sm:py-0 gap-4">
						<div className="flex flex-col min-w-0">
							<Link
								href="/"
								className="text-xl font-bold text-foreground tracking-wide hover:text-link transition-[color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] w-fit"
							>
								{siteConfig.siteName}
							</Link>
							{siteConfig.tagline?.trim() ? (
								<span className="text-xs text-muted-foreground mt-0.5 w-fit max-w-[min(100%,20rem)]">
									{siteConfig.tagline.trim()}
								</span>
							) : null}
						</div>
						<ul className="hidden md:flex justify-center items-center gap-6">
							{siteConfig.navItems.map(({ href, label }) => (
								<li key={href}>
									<Link
										href={href}
										className="text-foreground/90 tracking-wide hover:text-link transition-[color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] text-sm sm:text-base"
									>
										{label}
									</Link>
								</li>
							))}
						</ul>
						<div className="flex items-center justify-end shrink-0 gap-2">
							<MobileNav navItems={siteConfig.navItems} />
							<ul className="flex items-center gap-2" aria-label="Social links">
								{siteConfig.socialLinks.map(({ label, href }) => (
									<li key={href}>
										<Link
											href={href}
											target={href.startsWith("http") ? "_blank" : undefined}
											rel={
												href.startsWith("http")
													? "noopener noreferrer"
													: undefined
											}
											className="text-muted-foreground hover:text-link transition-[color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] p-1.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
											aria-label={label}
										>
											<SocialIcon label={label} href={href} />
										</Link>
									</li>
								))}
								{siteConfig.cvUrl ? (
									<li>
										<Link
											href={siteConfig.cvUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="text-muted-foreground hover:text-link transition-[color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] p-1.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
											aria-label="CV"
										>
											<FileText className="size-5" />
										</Link>
									</li>
								) : null}
							</ul>
							<ModeToggle />
						</div>
					</div>
				</nav>
			</header>

			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				{children}
			</main>

			<footer className="bg-muted border-t">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="flex flex-col items-center justify-center gap-4 text-center">
						{siteConfig.hireabilityLine ? (
							<p className="text-muted-foreground text-sm">
								{siteConfig.hireabilityLine}
							</p>
						) : null}
						<ul className="flex flex-wrap items-center justify-center gap-6">
							{siteConfig.socialLinks.map(({ label, href }) => (
								<li key={href}>
									<Link
										href={href}
										target={href.startsWith("http") ? "_blank" : undefined}
										rel={
											href.startsWith("http")
												? "noopener noreferrer"
												: undefined
										}
										className="text-muted-foreground hover:text-link hover:underline transition-[color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] text-sm"
									>
										{label}
									</Link>
								</li>
							))}
							{siteConfig.cvUrl ? (
								<li>
									<Link
										href={siteConfig.cvUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="text-muted-foreground hover:text-link hover:underline transition-[color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] text-sm"
									>
										CV
									</Link>
								</li>
							) : null}
						</ul>
						<p className="text-muted-foreground text-sm">
							© {new Date().getFullYear()} {siteConfig.siteName}
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
