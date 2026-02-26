"use client";

import PostRowHeadline from "@/components/post-row-headline";
import type { Post } from "@/lib/types";
import { useMemo, useRef, useState } from "react";

interface BlogSearchAndFeedProps {
	posts: Post[];
}

export default function BlogSearchAndFeed({ posts }: BlogSearchAndFeedProps) {
	const [query, setQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const categories = useMemo(() => {
		const cats = [
			...new Set(posts.map((p) => p.category).filter(Boolean)),
		] as string[];
		return cats.sort((a, b) => a.localeCompare(b));
	}, [posts]);

	const candidatePosts = useMemo(
		() =>
			selectedCategory
				? posts.filter((p) => p.category === selectedCategory)
				: posts,
		[posts, selectedCategory],
	);

	const filteredPosts = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return candidatePosts;
		return candidatePosts.filter((post) => {
			const title = post.title.toLowerCase();
			const desc = (post.description || "").toLowerCase();
			const tags = (post.tags || []).join(" ").toLowerCase();
			const cat = (post.category || "").toLowerCase();
			return (
				title.includes(q) ||
				desc.includes(q) ||
				tags.includes(q) ||
				cat.includes(q)
			);
		});
	}, [candidatePosts, query]);

	function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Escape") {
			inputRef.current?.blur();
		}
	}

	if (posts.length === 0) {
		return (
			<div className="max-w-6xl mx-auto">
				<p className="text-muted-foreground text-center py-12">No posts yet.</p>
			</div>
		);
	}

	return (
		<div className="layout-container max-w-6xl mx-auto">
			{/* Category / tag row */}
			<div
				className="flex flex-wrap items-center gap-2 mb-4 max-w-3xl mx-auto "
				role="tablist"
				aria-label="Filter by category"
			>
				<button
					type="button"
					role="tab"
					aria-pressed={selectedCategory === null}
					onClick={() => setSelectedCategory(null)}
					className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
						selectedCategory === null
							? "bg-foreground text-background"
							: "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
					}`}
				>
					All Notes
				</button>
				{categories.map((cat) => (
					<button
						key={cat}
						type="button"
						role="tab"
						aria-pressed={selectedCategory === cat}
						onClick={() =>
							setSelectedCategory((prev) => (prev === cat ? null : cat))
						}
						className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
							selectedCategory === cat
								? "bg-foreground text-background"
								: "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
						}`}
					>
						{cat}
					</button>
				))}
			</div>

			{/* Search input */}
			<div className="mb-8 max-w-3xl mx-auto">
				<input
					ref={inputRef}
					type="search"
					className="search-input w-full rounded-md border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link/30 focus-visible:border-link/50 transition-colors duration-200"
					placeholder="Search posts..."
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onKeyDown={handleKeyDown}
					aria-label="Search posts"
				/>
			</div>

			{/* Post feed */}
			<div
				className="post-feed transition-opacity duration-300 ease-out"
				style={{ transitionDuration: "0.4s" }}
			>
				{filteredPosts.length === 0 ? (
					<p className="text-muted-foreground py-8">
						No posts match your search.
					</p>
				) : (
					filteredPosts.map((post, index) => (
						<PostRowHeadline
							key={post.id}
							post={post}
							isLast={index === filteredPosts.length - 1}
						/>
					))
				)}
			</div>
		</div>
	);
}
