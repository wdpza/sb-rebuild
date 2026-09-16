import { getCategoryBySlug, getCategoryPostPagination } from "@/lib/graphql/queries/getCategoryBySlug";
import BlogPagination from "@/components/blog/BlogPagination";
import Image from "next/image";
import Link from "next/link";

export default async function ArticlesSlugPage({
    params,
    searchParams,
}: {
    params: Promise<{ slug: string }>;
    searchParams?: Promise<{ page?: string | null; s?: string | null; sort?: string | null }>;
}) {
    const { slug } = await params;
    const resolvedSearchParams = await searchParams;
    const search = resolvedSearchParams?.s ?? null;
    const isOldestFirst = resolvedSearchParams?.sort === "oldest";
    const order = isOldestFirst ? "ASC" : "DESC";

    const postsPerPage = 10;
    const cursors = await getCategoryPostPagination(slug, search, order);
    const totalPages = Math.max(1, Math.ceil(cursors.length / postsPerPage));
    const requestedPage = Number.parseInt(resolvedSearchParams?.page ?? "1", 10);
    const currentPage = Math.min(Math.max(Number.isFinite(requestedPage) ? requestedPage : 1, 1), totalPages);
    const after = currentPage > 1 ? cursors[(currentPage - 1) * postsPerPage - 1] : null;

    const category = await getCategoryBySlug(slug, postsPerPage, after, search, order);

    if (!category) {
        return (
            <div className="mx-auto px-6 py-8">
                <h2 className="text-xl text-red-500">Category not found.</h2>
            </div>
        );
    }

    const posts = category.posts?.nodes ?? [];
    return (
        <div className="w-full">
            <h1 className="mb-2 text-[32px] font-bold text-neutral-softest">{category.name}</h1>
            <Link
                href={`/articles/${slug}?sort=${isOldestFirst ? "newest" : "oldest"}${search ? `&s=${encodeURIComponent(search)}` : ""}`}
                className="mb-10 inline-flex cursor-pointer items-center gap-2 text-[24px] font-normal text-neutral-softest transition-colors hover:text-white"
            >
                Sort By {isOldestFirst ? "Oldest" : "Newest"}
                <span aria-hidden="true" className="text-[18px]">{isOldestFirst ? "↑" : "↓"}</span>
            </Link>

            {posts.length === 0 ? (
                <p className="text-gray-400">No posts found in this category.</p>
            ) : (
                <div className="flex flex-col gap-10">
                    {posts.map((post: any) => {
                        const formattedDate = post.date
                            ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(post.date))
                            : null;

                        return (
                            <article
                                key={post.id}
                                className="grid grid-cols-1 overflow-hidden md:grid-cols-[minmax(260px,0.9fr)_minmax(0,1.1fr)] md:gap-9"
                            >
                                {/* Featured Image or Placeholder */}
                                {post.featuredImage?.node?.sourceUrl ? (
                                    <div className="relative h-[300px] max-h-[300px] w-full overflow-hidden rounded-sm">
                                        <Image
                                            src={post.featuredImage.node.sourceUrl}
                                            alt={post.featuredImage.node.altText || post.title}
                                            fill
                                            sizes="(min-width: 1280px) 380px, (min-width: 768px) 40vw, 100vw"
                                            className="object-cover object-center"
                                        />
                                    </div>
                                ) : (
                                    <div className="flex h-[300px] max-h-[300px] w-full items-center justify-center rounded-sm bg-neutral-strong">
                                        <span className="text-neutral-softest text-sm tracking-wide uppercase">
                                            No Image Available
                                        </span>
                                    </div>
                                )}

                                {/* Article Content */}
                                <div className="flex flex-col justify-center px-1 py-7 md:py-4">
                                    {formattedDate && <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.08em] text-neutral-softer">{formattedDate}</p>}
                                    <h2 className="mb-4 text-[24px] font-bold uppercase leading-[1.12] text-gradient-starbright md:text-[27px]">
                                        {post.title}
                                    </h2>

                                    <div
                                        className="mb-5 line-clamp-3 text-[15px] leading-6 text-neutral-softer [&_p]:m-0"
                                        dangerouslySetInnerHTML={{ __html: post.excerpt }}
                                    />

                                    <Link
                                        className="gradient-border inline-block w-fit rounded text-[13px] text-neutral-softest"
                                        href={`/article/${post.slug}`}
                                    >
                                        Read It!
                                    </Link>
                                </div>
                            </article>
                        )
                    })}
                </div>
            )}

            <BlogPagination pathname={`/articles/${slug}`} currentPage={currentPage} totalPages={totalPages} search={search} sort={isOldestFirst ? "oldest" : "newest"} />
        </div>
    );
}
