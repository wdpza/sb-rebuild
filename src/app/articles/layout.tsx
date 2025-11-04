import { getAllPosts } from "@/lib/graphql/queries/getAllPosts";
import { notFound } from "next/navigation";
import BlogHero from "@/components/blog/BlogHero";
import CategorySidebar from "@/components/shared/CategorySidebar";
import { constructFromSymbol } from "date-fns/constants";
import BlogExit from "@/components/blog/BlogExit";

export default async function ArticleLayout({ children }: { children: React.ReactNode }) {
	const { blogOptions, categories } = await getAllPosts();

	if (!blogOptions || !categories) return notFound();

	return (
		<div className="article-layout flex flex-col w-full">
			<BlogHero blogOptions={blogOptions.blogOptionsFields} />

			<div className="grid w-full max-w-[1600px] mx-auto grid-cols-8 gap-6 px-12 py-16">
				<div className="col-span-2">
					<CategorySidebar categories={categories} />
				</div>

				<div className="col-span-6">{children}</div>
			</div>

			<BlogExit blogOptions={blogOptions.blogOptionsFields} />
		</div>
	);
}
