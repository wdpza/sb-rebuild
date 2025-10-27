import { getAllPosts } from "@/lib/graphql/queries/getAllPosts";
import { notFound } from "next/navigation";

import BlogHero from "@/components/blog/BlogHero";
import CategorySidebar from "@/components/shared/CategorySidebar";

export default async function ArticleLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { blogOptions, categories, posts } = await getAllPosts(10);

	if (!blogOptions || !categories) return notFound();

	return (
		<div className="article-layout">
			<BlogHero blogOptions={blogOptions.blogOptionsFields} />
			<div className="grid w-full max-w-[1600px] mx-auto grid-cols-8 md:grid-cols-8 gap-2 px-12">
				<div className="col-span-2">
					<CategorySidebar categories={categories} />
				</div>
				<div className="col-span-6">{children}</div>
			</div>
		</div>
	);
}
