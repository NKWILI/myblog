"use client";

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { toast } from "sonner";

interface ShareButtonProps {
	url: string;
	title: string;
	description?: string;
	className?: string;
}

export function ShareButton({
	url,
	title,
	description,
	className,
}: ShareButtonProps) {
	async function handleShare() {
		try {
			if (typeof navigator !== "undefined" && navigator.share) {
				await navigator.share({
					title,
					text: description ?? title,
					url,
				});
				toast.success("Shared");
			} else {
				await navigator.clipboard.writeText(url);
				toast.success("Link copied!");
			}
		} catch (err) {
			if (err instanceof Error && err.name === "AbortError") {
				return;
			}
			toast.error("Could not share");
		}
	}

	return (
		<Button
			type="button"
			variant="ghost"
			size="sm"
			onClick={handleShare}
			className={className}
			aria-label="Share this post"
		>
			<Share2 className="size-4" />
		</Button>
	);
}
