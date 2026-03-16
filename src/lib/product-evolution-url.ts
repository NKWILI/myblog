/**
 * URL helpers for Product Evolution deep linking (Epic 5).
 * Canonical form: /projects#<projectSlug> or /projects#<projectSlug>@vN
 */

export type ParsedProductEvolutionUrl = {
	projectId: string | null;
	versionId: string | undefined;
};

/**
 * Parses project (and optional version) from a full URL.
 * Hash wins over query when both are present.
 * Version must match pattern @vN (N = integer).
 */
export function parseProductEvolutionUrl(
	urlString: string,
): ParsedProductEvolutionUrl {
	const url = new URL(urlString);
	const hash = url.hash.replace("#", "").trim();
	const queryProject = url.searchParams.get("project")?.trim() ?? "";

	// Hash wins over query
	const fromHash = hash ? parseHashFragment(hash) : null;
	const projectFromHash = fromHash?.projectId ?? null;
	const versionFromHash = fromHash?.versionId;

	const projectFromQuery =
		queryProject && /^[a-z0-9-]{1,32}$/i.test(queryProject)
			? queryProject.toLowerCase()
			: null;

	return {
		projectId: projectFromHash ?? projectFromQuery,
		versionId: versionFromHash,
	};
}

/** Parses "#codex" or "#codex@v3" (vN = integer only). */
function parseHashFragment(fragment: string): {
	projectId: string;
	versionId?: string;
} | null {
	const atIndex = fragment.indexOf("@");
	const projectPart = atIndex >= 0 ? fragment.slice(0, atIndex) : fragment;
	const versionPart = atIndex >= 0 ? fragment.slice(atIndex + 1) : "";

	const projectId = projectPart.toLowerCase();
	if (!projectId || !/^[a-z0-9-]{1,32}$/.test(projectId)) return null;

	const versionMatch = versionPart.match(/^v(\d+)$/i);
	const versionId = versionMatch ? `v${versionMatch[1]}` : undefined;

	return { projectId, versionId };
}

/**
 * Returns the canonical hash for the projects page (e.g. "#codex" or "#codex@v3").
 */
export function formatProjectVersionHash(
	projectId: string,
	versionId?: string,
): string {
	const slug = projectId.toLowerCase();
	return versionId ? `#${slug}@${versionId}` : `#${slug}`;
}
