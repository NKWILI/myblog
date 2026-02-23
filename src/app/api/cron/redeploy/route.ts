import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Vercel Cron calls this route on a schedule. It triggers a new production
 * deployment so the build runs again (cache:posts fetches from Notion, then
 * next build). Set CRON_SECRET and VERCEL_TOKEN in Vercel Environment Variables.
 * Cron only runs on production; Vercel sends Authorization: Bearer <CRON_SECRET>.
 */
export async function GET(request: Request) {
	const auth = request.headers.get("authorization");
	const expected = process.env.CRON_SECRET;
	if (!expected || expected.length < 16) {
		return NextResponse.json(
			{ error: "CRON_SECRET not configured or too short (min 16 chars)" },
			{ status: 500 },
		);
	}
	if (auth !== `Bearer ${expected}`) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const token = process.env.VERCEL_TOKEN;
	const projectId = process.env.VERCEL_PROJECT_ID;
	if (!token || !projectId) {
		return NextResponse.json(
			{ error: "VERCEL_TOKEN and VERCEL_PROJECT_ID must be set" },
			{ status: 500 },
		);
	}

	const teamId = process.env.VERCEL_TEAM_ID;
	const listUrl = new URL("https://api.vercel.com/v6/deployments");
	listUrl.searchParams.set("projectId", projectId);
	listUrl.searchParams.set("target", "production");
	listUrl.searchParams.set("limit", "1");
	if (teamId) listUrl.searchParams.set("teamId", teamId);

	let listRes: Response;
	try {
		listRes = await fetch(listUrl.toString(), {
			headers: { Authorization: `Bearer ${token}` },
		});
	} catch (e) {
		return NextResponse.json(
			{ error: "Failed to list deployments", detail: String(e) },
			{ status: 502 },
		);
	}

	if (!listRes.ok) {
		const text = await listRes.text();
		return NextResponse.json(
			{ error: "Vercel API list failed", status: listRes.status, body: text },
			{ status: 502 },
		);
	}

	const listData = (await listRes.json()) as {
		deployments?: { uid: string; name: string }[];
	};
	const deployment = listData.deployments?.[0];
	if (!deployment) {
		return NextResponse.json(
			{ error: "No production deployment found" },
			{ status: 404 },
		);
	}

	const createUrl = new URL("https://api.vercel.com/v13/deployments");
	if (teamId) createUrl.searchParams.set("teamId", teamId);

	let createRes: Response;
	try {
		createRes = await fetch(createUrl.toString(), {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				deploymentId: deployment.uid,
				name: deployment.name,
				target: "production",
			}),
		});
	} catch (e) {
		return NextResponse.json(
			{ error: "Failed to create redeploy", detail: String(e) },
			{ status: 502 },
		);
	}

	const createData = await createRes.json();
	if (!createRes.ok) {
		return NextResponse.json(
			{
				error: "Vercel API create deployment failed",
				status: createRes.status,
				body: createData,
			},
			{ status: 502 },
		);
	}

	return NextResponse.json({
		ok: true,
		deploymentId: (createData as { id?: string }).id,
		message: "Redeploy triggered; build will refresh Notion cache.",
	});
}
