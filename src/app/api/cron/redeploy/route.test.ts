import { GET } from "@/app/api/cron/redeploy/route";

const VALID_SECRET = "a-valid-cron-secret-16ch";
const VALID_TOKEN = "vercel-token";
const VALID_PROJECT_ID = "prj_abc";

function listOk() {
	return Response.json({
		deployments: [{ uid: "d1", name: "my-app" }],
	});
}
function createOk() {
	return Response.json({ id: "new-id" });
}

function request(opts?: { authorization?: string }): Request {
	return new Request("http://localhost/api/cron/redeploy", {
		method: "GET",
		headers:
			opts?.authorization !== undefined
				? { Authorization: opts.authorization }
				: {},
	});
}

function setValidAuthEnv() {
	process.env.CRON_SECRET = VALID_SECRET;
	process.env.VERCEL_TOKEN = VALID_TOKEN;
	process.env.VERCEL_PROJECT_ID = VALID_PROJECT_ID;
}

describe("GET /api/cron/redeploy", () => {
	const envRestore: Record<string, string | undefined> = {};

	beforeEach(() => {
		envRestore.CRON_SECRET = process.env.CRON_SECRET;
		envRestore.VERCEL_TOKEN = process.env.VERCEL_TOKEN;
		envRestore.VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;
		envRestore.VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;
	});

	afterEach(() => {
		process.env.CRON_SECRET = envRestore.CRON_SECRET;
		process.env.VERCEL_TOKEN = envRestore.VERCEL_TOKEN;
		process.env.VERCEL_PROJECT_ID = envRestore.VERCEL_PROJECT_ID;
		process.env.VERCEL_TEAM_ID = envRestore.VERCEL_TEAM_ID;
		vi.unstubAllGlobals();
	});

	describe("401 Unauthorized", () => {
		it("returns 401 when Authorization header is missing", async () => {
			setValidAuthEnv();
			vi.stubGlobal("fetch", vi.fn());

			const res = await GET(request());
			const data = await res.json();

			expect(res.status).toBe(401);
			expect(data).toEqual({ error: "Unauthorized" });
		});

		it("returns 401 when secret is wrong", async () => {
			process.env.CRON_SECRET = VALID_SECRET;
			process.env.VERCEL_TOKEN = VALID_TOKEN;
			process.env.VERCEL_PROJECT_ID = VALID_PROJECT_ID;
			vi.stubGlobal("fetch", vi.fn());

			const res = await GET(request({ authorization: "Bearer wrong-secret" }));
			const data = await res.json();

			expect(res.status).toBe(401);
			expect(data).toEqual({ error: "Unauthorized" });
		});

		it("returns 401 when Authorization has no Bearer prefix", async () => {
			process.env.CRON_SECRET = VALID_SECRET;
			process.env.VERCEL_TOKEN = VALID_TOKEN;
			process.env.VERCEL_PROJECT_ID = VALID_PROJECT_ID;
			vi.stubGlobal("fetch", vi.fn());

			const res = await GET(request({ authorization: VALID_SECRET }));
			const data = await res.json();

			expect(res.status).toBe(401);
			expect(data).toEqual({ error: "Unauthorized" });
		});
	});

	describe("500 env validation", () => {
		it("returns 500 when CRON_SECRET is missing", async () => {
			process.env.CRON_SECRET = undefined;
			process.env.VERCEL_TOKEN = VALID_TOKEN;
			process.env.VERCEL_PROJECT_ID = VALID_PROJECT_ID;
			vi.stubGlobal("fetch", vi.fn());

			const res = await GET(request({ authorization: "Bearer anything" }));
			const data = await res.json();

			expect(res.status).toBe(500);
			expect(data).toMatchObject({
				error: "CRON_SECRET not configured or too short (min 16 chars)",
			});
		});

		it("returns 500 when CRON_SECRET is too short", async () => {
			process.env.CRON_SECRET = "short";
			process.env.VERCEL_TOKEN = VALID_TOKEN;
			process.env.VERCEL_PROJECT_ID = VALID_PROJECT_ID;
			vi.stubGlobal("fetch", vi.fn());

			const res = await GET(request({ authorization: "Bearer short" }));
			const data = await res.json();

			expect(res.status).toBe(500);
			expect(data).toMatchObject({
				error: "CRON_SECRET not configured or too short (min 16 chars)",
			});
		});

		it("returns 500 when VERCEL_TOKEN is missing", async () => {
			process.env.CRON_SECRET = VALID_SECRET;
			process.env.VERCEL_TOKEN = undefined;
			process.env.VERCEL_PROJECT_ID = VALID_PROJECT_ID;
			vi.stubGlobal("fetch", vi.fn());

			const res = await GET(
				request({ authorization: `Bearer ${VALID_SECRET}` }),
			);
			const data = await res.json();

			expect(res.status).toBe(500);
			expect(data).toEqual({
				error: "VERCEL_TOKEN and VERCEL_PROJECT_ID must be set",
			});
		});

		it("returns 500 when VERCEL_PROJECT_ID is missing", async () => {
			process.env.CRON_SECRET = VALID_SECRET;
			process.env.VERCEL_TOKEN = VALID_TOKEN;
			process.env.VERCEL_PROJECT_ID = undefined;
			vi.stubGlobal("fetch", vi.fn());

			const res = await GET(
				request({ authorization: `Bearer ${VALID_SECRET}` }),
			);
			const data = await res.json();

			expect(res.status).toBe(500);
			expect(data).toEqual({
				error: "VERCEL_TOKEN and VERCEL_PROJECT_ID must be set",
			});
		});
	});

	describe("502 Vercel API", () => {
		it("returns 502 when list deployments fetch throws", async () => {
			setValidAuthEnv();
			vi.stubGlobal(
				"fetch",
				vi.fn().mockRejectedValue(new Error("network error")),
			);

			const res = await GET(
				request({ authorization: `Bearer ${VALID_SECRET}` }),
			);
			const data = await res.json();

			expect(res.status).toBe(502);
			expect(data.error).toBe("Failed to list deployments");
			expect(data.detail).toContain("network error");
		});

		it("returns 502 when list deployments returns non-ok", async () => {
			setValidAuthEnv();
			vi.stubGlobal(
				"fetch",
				vi
					.fn()
					.mockResolvedValue(new Response("server error", { status: 500 })),
			);

			const res = await GET(
				request({ authorization: `Bearer ${VALID_SECRET}` }),
			);
			const data = await res.json();

			expect(res.status).toBe(502);
			expect(data).toMatchObject({
				error: "Vercel API list failed",
				status: 500,
				body: "server error",
			});
		});

		it("returns 502 when create deployment fetch throws", async () => {
			setValidAuthEnv();
			const mockFetch = vi.fn();
			mockFetch.mockResolvedValueOnce(listOk());
			mockFetch.mockRejectedValueOnce(new Error("create failed"));
			vi.stubGlobal("fetch", mockFetch);

			const res = await GET(
				request({ authorization: `Bearer ${VALID_SECRET}` }),
			);
			const data = await res.json();

			expect(res.status).toBe(502);
			expect(data.error).toBe("Failed to create redeploy");
			expect(data.detail).toContain("create failed");
		});

		it("returns 502 when create deployment returns non-ok", async () => {
			setValidAuthEnv();
			const mockFetch = vi.fn();
			mockFetch.mockResolvedValueOnce(listOk());
			mockFetch.mockResolvedValueOnce(
				new Response(JSON.stringify({ err: "bad request" }), {
					status: 400,
				}),
			);
			vi.stubGlobal("fetch", mockFetch);

			const res = await GET(
				request({ authorization: `Bearer ${VALID_SECRET}` }),
			);
			const data = await res.json();

			expect(res.status).toBe(502);
			expect(data).toMatchObject({
				error: "Vercel API create deployment failed",
				status: 400,
			});
			expect(data.body).toEqual({ err: "bad request" });
		});
	});

	describe("200 Success", () => {
		it("returns 200 with ok: true when auth and env valid and Vercel APIs succeed", async () => {
			setValidAuthEnv();
			const mockFetch = vi.fn();
			mockFetch.mockResolvedValueOnce(listOk());
			mockFetch.mockResolvedValueOnce(createOk());
			vi.stubGlobal("fetch", mockFetch);

			const res = await GET(
				request({ authorization: `Bearer ${VALID_SECRET}` }),
			);
			const data = await res.json();

			expect(res.status).toBe(200);
			expect(data).toEqual({
				ok: true,
				deploymentId: "new-id",
				message: "Redeploy triggered; build will refresh Notion cache.",
			});
		});
	});
});
