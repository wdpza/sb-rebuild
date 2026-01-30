import { getAllPosts } from "@/lib/graphql/queries/getAllPosts";
import { notFound } from "next/navigation";
import BlogHero from "@/components/blog/BlogHero";
import CategorySidebar from "@/components/shared/CategorySidebar";
import BlogExit from "@/components/blog/BlogExit";

export default async function ArticleLayout({ children }: { children: React.ReactNode }) {
	const { blogOptions, categories } = await getAllPosts();

	if (!blogOptions || !categories) return notFound();

	return (
		<div className="article-layout flex flex-col w-full">
		<BlogHero blogOptions={blogOptions.blogOptionsFields} />

		<div className="layout-wrapper grid mx-auto grid-cols-1 lg:grid-cols-8 gap-6 px-4 sm:px-8 lg:px-12 py-10 sm:py-16">
			<div className="lg:col-span-2">
			<CategorySidebar categories={categories} />
			</div>

			<div className="lg:col-span-6">
			{children}
			</div>
		</div>

		<BlogExit blogOptions={blogOptions.blogOptionsFields} />
		</div>
	);
}
