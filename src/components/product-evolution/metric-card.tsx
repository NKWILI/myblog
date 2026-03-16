import type { ProductMetric } from "@/data/product-evolution";

type MetricCardProps = {
	metric: ProductMetric;
};

export function MetricCard({ metric }: MetricCardProps) {
	const isFlagship = metric.isFlagship;

	return (
		<div
			className="pe-card rounded-lg border pe-border-b px-4 py-3 shadow-sm"
			style={
				isFlagship
					? {
							borderColor: "var(--pe-gold)",
							background:
								"color-mix(in_oklab,var(--pe-card)_80%,var(--pe-gold)_20%)",
						}
					: undefined
			}
			aria-label={metric.label}
		>
			<div className="flex items-baseline justify-between gap-2">
				<div className="space-y-1">
					<p className="text-xs font-medium uppercase tracking-wide pe-muted">
						{metric.label}
					</p>
					<p className="text-xl font-semibold pe-text">{metric.value}</p>
				</div>
				{isFlagship ? (
					<span className="rounded-full border border-[var(--pe-gold)] bg-[var(--pe-bg)] px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-[var(--pe-gold)]">
						Flagship
					</span>
				) : null}
			</div>
			{metric.trend ? (
				<p className="mt-2 text-xs pe-muted">{metric.trend}</p>
			) : null}
		</div>
	);
}
