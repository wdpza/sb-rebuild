import Link from "next/link";
import Image from "next/image";

import { getAllPosts, getPostPagination } from "@/lib/graphql/queries/getAllPosts";
import BlogPagination from "@/components/blog/BlogPagination";

interface BlogPageProps {
    searchParams: Promise<{ page?: string; s?: string; sort?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
    const { page: pageParam, s, sort } = await searchParams;
    const isOldestFirst = sort === "oldest";
    const order = isOldestFirst ? "ASC" : "DESC";
    const sortHref = `/articles?sort=${isOldestFirst ? "newest" : "oldest"}${s ? `&s=${encodeURIComponent(s)}` : ""}`;

    const [{ postsPerPage }, cursors] = await Promise.all([
        getAllPosts({}),
        getPostPagination(s, order),
    ]);
    const totalPages = Math.max(1, Math.ceil(cursors.length / postsPerPage));
    const requestedPage = Number.parseInt(pageParam ?? "1", 10);
    const currentPage = Math.min(Math.max(Number.isFinite(requestedPage) ? requestedPage : 1, 1), totalPages);
    const after = currentPage > 1 ? cursors[(currentPage - 1) * postsPerPage - 1] : undefined;

    const { posts } = await getAllPosts({ first: postsPerPage, after, search: s, order });

    if (!posts?.nodes?.length) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">posts</h1>
                <p>No posts found.</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <Link href={sortHref} className="mb-10 inline-flex cursor-pointer items-center gap-2 text-[24px] font-normal text-neutral-softest transition-colors hover:text-white">
                Sort By {isOldestFirst ? "Oldest" : "Newest"}
                <span aria-hidden="true" className="text-[18px]">{isOldestFirst ? "↑" : "↓"}</span>
            </Link>
            <div className="flex flex-col gap-10">
                {posts.nodes.map((post: any) => {
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
                    );
                })}
            </div>

            <BlogPagination pathname="/articles" currentPage={currentPage} totalPages={totalPages} search={s} sort={isOldestFirst ? "oldest" : "newest"} />
        </div>
    );
}
