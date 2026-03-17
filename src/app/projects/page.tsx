"use client";

import { ProjectHeader } from "@/components/product-evolution/project-header";
import { ProjectMetrics } from "@/components/product-evolution/project-metrics";
import { ProjectWebsiteTechStack } from "@/components/product-evolution/project-website-tech-stack";
import { ProductEvolutionSectionHeader } from "@/components/product-evolution/section-header";
import { ProductEvolutionTabBar } from "@/components/product-evolution/tab-bar";
import { VersionTimeline } from "@/components/product-evolution/version-timeline";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import type { ProductVersion } from "@/data/product-evolution";
import { productEvolutionProjects } from "@/data/product-evolution";
import {
	formatProjectVersionHash,
	parseProductEvolutionUrl,
} from "@/lib/product-evolution-url";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function getDefaultOpenState(
	versions: ProductVersion[],
	initialVersionId?: string,
): Record<string, boolean> {
	const sorted = [...versions].sort((a, b) => {
		const ta = Date.parse(a.date);
		const tb = Date.parse(b.date);
		return Number.isNaN(tb) || Number.isNaN(ta) ? 0 : tb - ta;
	});
	const target = initialVersionId
		? sorted.find(
				(v) =>
					v.versionLabel.toLowerCase() === initialVersionId.toLowerCase() ||
					v.versionLabel
						.toLowerCase()
						.startsWith(`${initialVersionId.toLowerCase()}.`),
			)
		: null;
	const toOpen = target ?? sorted.find((v) => v.isCurrent) ?? sorted[0];
	if (!toOpen) return {};
	return { [toOpen.id]: true };
}

export default function ProjectsPage() {
	const projects = useMemo(() => {
		// Deduplicate by id, first occurrence wins.
		const seen = new Set<string>();
		return productEvolutionProjects.filter((project) => {
			if (seen.has(project.id)) return false;
			seen.add(project.id);
			return true;
		});
	}, []);

	const projectIds = projects.map((project) => project.id);
	const firstProjectId = projectIds[0] ?? null;

	const [activeProjectId, setActiveProjectId] = useState<string | null>(
		firstProjectId,
	);
	const [urlVersionId, setUrlVersionId] = useState<string | undefined>(
		undefined,
	);
	const [urlProjectId, setUrlProjectId] = useState<string | null>(null);
	// Per-project version open state so it persists when switching tabs (Epic 5).
	const [openByProjectAndVersion, setOpenByProjectAndVersion] = useState<
		Record<string, Record<string, boolean>>
	>({});
	const urlSyncRan = useRef(false);

	useEffect(() => {
		if (typeof window === "undefined" || !projectIds.length) return;
		if (urlSyncRan.current) return;
		urlSyncRan.current = true;
		const { projectId, versionId } = parseProductEvolutionUrl(
			window.location.href,
		);
		const validProjectId =
			projectId && projectIds.includes(projectId) ? projectId : null;
		const safeId = validProjectId ?? firstProjectId;
		if (safeId) {
			setActiveProjectId(safeId);
			setUrlProjectId(validProjectId);
			setUrlVersionId(validProjectId && versionId ? versionId : undefined);
		}
		const canonicalHash = formatProjectVersionHash(
			safeId ?? "",
			validProjectId && versionId ? versionId : undefined,
		);
		// Normalize to pathname + hash only (strip query so canonical form is e.g. /projects#fastsite).
		if (canonicalHash) {
			const canonicalUrl = window.location.pathname + canonicalHash;
			if (
				window.location.pathname + window.location.hash !== canonicalUrl ||
				window.location.search
			) {
				window.history.replaceState({}, "", canonicalUrl);
			}
		}
	}, [projectIds, firstProjectId]);

	function handleTabChange(id: string) {
		setActiveProjectId(id);
		if (typeof window !== "undefined") {
			window.history.replaceState(
				{},
				"",
				window.location.pathname + formatProjectVersionHash(id),
			);
		}
	}

	if (!projects.length) {
		return (
			<section
				className="product-evolution-section pe-bg pe-text rounded-2xl border pe-border-b px-6 py-10 sm:px-10 sm:py-12"
				aria-label="Product Evolution"
			>
				<div className="space-y-4 max-w-2xl">
					<ProductEvolutionSectionHeader />
					<p className="pe-muted text-sm">
						Product Evolution projects are not configured yet. Add at least one
						project to `product-evolution.ts` to enable this section.
					</p>
				</div>
			</section>
		);
	}

	const safeActiveId =
		(activeProjectId && projectIds.includes(activeProjectId)
			? activeProjectId
			: firstProjectId) ?? projectIds[0];
	if (!safeActiveId) {
		return (
			<section
				className="product-evolution-section pe-bg pe-text rounded-2xl border pe-border-b px-6 py-10 sm:px-10 sm:py-12"
				aria-label="Product Evolution"
			>
				<div className="space-y-4 max-w-2xl">
					<ProductEvolutionSectionHeader />
					<p className="pe-muted text-sm">
						Product Evolution projects are not configured yet.
					</p>
				</div>
			</section>
		);
	}

	const activeProject = projects.find((project) => project.id === safeActiveId);

	const initialVersionId =
		urlProjectId === safeActiveId ? urlVersionId : undefined;

	const getOpenByIdForProject = useCallback(
		(projectId: string, versions: ProductVersion[]) =>
			openByProjectAndVersion[projectId] ??
			getDefaultOpenState(
				versions,
				projectId === safeActiveId ? initialVersionId : undefined,
			),
		[openByProjectAndVersion, safeActiveId, initialVersionId],
	);

	return (
		<section
			className="product-evolution-section pe-bg pe-text rounded-2xl border pe-border-b px-6 py-10 sm:px-10 sm:py-12"
			aria-label="Product Evolution"
		>
			<div className="space-y-8">
				<ProductEvolutionSectionHeader />

				<Tabs
					value={safeActiveId}
					onValueChange={handleTabChange}
					className="w-full space-y-6"
					aria-label="Select a product to explore its evolution"
				>
					<ProductEvolutionTabBar projects={projects} />

					<div className="mt-4">
						{projects.map((project) => (
							<TabsContent
								key={project.id}
								value={project.id}
								id={`panel-${project.id}`}
								role="tabpanel"
								aria-labelledby={project.id}
								className={
									project.id === safeActiveId
										? "block focus-visible:outline-none"
										: "hidden focus-visible:outline-none"
								}
							>
								{project.id === activeProject?.id && activeProject ? (
									<div className="space-y-6">
										<ProjectHeader project={activeProject} />
										<ProjectMetrics project={activeProject} />
										<ProjectWebsiteTechStack project={activeProject} />
										<VersionTimeline
											versions={activeProject.versions}
											initialVersionId={
												project.id === safeActiveId
													? initialVersionId
													: undefined
											}
											openById={getOpenByIdForProject(
												project.id,
												activeProject.versions,
											)}
											onOpenChange={(nextOpenById: Record<string, boolean>) => {
												setOpenByProjectAndVersion((prev) => ({
													...prev,
													[project.id]: nextOpenById,
												}));
											}}
										/>
									</div>
								) : null}
							</TabsContent>
						))}
					</div>
				</Tabs>
			</div>
		</section>
	);
}
