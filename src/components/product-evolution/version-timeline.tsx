import type { ProductVersion } from "@/data/product-evolution";
import { useEffect, useMemo, useRef } from "react";
import { VersionCard } from "./version-card";

type VersionTimelineProps = {
	versions: ProductVersion[];
	initialVersionId?: string;
	openById: Record<string, boolean>;
	onOpenChange: (nextOpenById: Record<string, boolean>) => void;
};

function matchVersionToUrlParam(
	version: ProductVersion,
	urlVersionId: string,
): boolean {
	const v = urlVersionId.toLowerCase();
	const label = version.versionLabel.toLowerCase();
	return label === v || label.startsWith(`${v}.`);
}

export function VersionTimeline({
	versions,
	initialVersionId,
	openById,
	onOpenChange,
}: VersionTimelineProps) {
	const sorted = useMemo(() => {
		return [...versions].sort((a, b) => {
			const ta = Date.parse(a.date);
			const tb = Date.parse(b.date);
			return Number.isNaN(tb) || Number.isNaN(ta) ? 0 : tb - ta;
		});
	}, [versions]);

	const targetVersion = useMemo(
		() =>
			initialVersionId
				? sorted.find((v) => matchVersionToUrlParam(v, initialVersionId))
				: null,
		[sorted, initialVersionId],
	);

	const scrollTargetRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (targetVersion && scrollTargetRef.current) {
			scrollTargetRef.current.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
			});
		}
	}, [targetVersion]);

	function toggle(id: string) {
		onOpenChange({ ...openById, [id]: !openById[id] });
	}

	if (!sorted.length) return null;

	return (
		<section aria-label="Version history" className="space-y-3">
			<h3 className="text-xs font-semibold uppercase tracking-wide pe-muted">
				Version history
			</h3>
			<div className="space-y-2">
				{sorted.map((version) => (
					<div
						key={version.id}
						ref={targetVersion?.id === version.id ? scrollTargetRef : undefined}
					>
						<VersionCard
							version={version}
							isOpen={openById[version.id] === true}
							onToggle={() => toggle(version.id)}
						/>
					</div>
				))}
			</div>
		</section>
	);
}
