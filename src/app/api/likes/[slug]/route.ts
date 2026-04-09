import { likesKey, redis } from "@/lib/redis";
import { NextResponse } from "next/server";

interface RouteParams {
	params: Promise<{ slug: string }>;
}

export async function GET(_req: Request, { params }: RouteParams) {
	const { slug } = await params;
	const count = (await redis.get<number>(likesKey(slug))) ?? 0;
	return NextResponse.json({ count });
}

export async function POST(req: Request, { params }: RouteParams) {
	const { slug } = await params;
	const { action } = (await req.json()) as { action: "like" | "unlike" };
	const key = likesKey(slug);

	let count: number;
	if (action === "like") {
		count = await redis.incr(key);
	} else {
		count = await redis.decr(key);
		if (count < 0) {
			await redis.set(key, 0);
			count = 0;
		}
	}

	return NextResponse.json({ count });
}
