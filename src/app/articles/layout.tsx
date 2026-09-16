import { getAllPosts } from "@/lib/graphql/queries/getAllPosts";
import { notFound } from "next/navigation";
import BlogHero from "@/components/blog/BlogHero";
import CategorySidebar from "@/components/shared/CategorySidebar";
import BlogExit from "@/components/blog/BlogExit";

export default async function ArticleLayout({ children }: { children: React.ReactNode }) {
	const { blogOptions, categories } = await getAllPosts({});

	if (!blogOptions || !categories) return notFound();

	return (
		<div className="article-layout flex flex-col w-full">
		<BlogHero blogOptions={blogOptions.blogOptionsFields} />

		<div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-16">
			<div>
			<CategorySidebar categories={categories} />
			</div>

			<div className="min-w-0">
			{children}
			</div>
		</div>

		<BlogExit blogOptions={blogOptions.blogOptionsFields} />
		</div>
	);
}
