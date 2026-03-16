import { siteConfig } from "@/lib/site-config";

const eyebrowText = "Projects";
const titleText = "Product Evolution";
const subtitleText =
	"How products evolved over time—problems first, solutions second, version by version.";

export function ProductEvolutionSectionHeader() {
	return (
		<header className="space-y-3">
			<p className="pe-eyebrow">
				<span className="opacity-80">{eyebrowText}</span>
			</p>
			<div className="space-y-2">
				<h1 className="pe-serif-heading text-3xl sm:text-4xl font-semibold tracking-tight pe-text">
					{titleText}
				</h1>
				<p className="text-sm sm:text-base pe-muted max-w-xl">
					{subtitleText}
					{siteConfig.siteName ? (
						<>
							{" "}
							<span className="opacity-80">
								Case studies from {siteConfig.siteName}.
							</span>
						</>
					) : null}
				</p>
			</div>
		</header>
	);
}
