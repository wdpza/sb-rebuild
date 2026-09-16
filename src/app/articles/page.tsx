import Link from "next/link";
import Image from "next/image";

import { getAllPosts } from "@/lib/graphql/queries/getAllPosts";

interface BlogPageProps {
    searchParams: Promise<{ after?: string; before?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
    const { after, before } = await searchParams;

    // Fetch the postsPerPage setting first to use as page size
    const { postsPerPage } = await getAllPosts({});

    const { posts } = before
        ? await getAllPosts({ last: postsPerPage, before })
        : await getAllPosts({ first: postsPerPage, after });

    if (!posts?.nodes?.length) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">posts</h1>
                <p>No posts found.</p>
            </div>
        );
    }

    const { hasNextPage, hasPreviousPage, startCursor, endCursor } = posts.pageInfo;

    return (
        <div className="w-full">
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
                                <div className="relative aspect-square w-full overflow-hidden rounded-sm">
                                    <Image
                                        src={post.featuredImage.node.sourceUrl}
                                        alt={post.featuredImage.node.altText || post.title}
                                        fill
                                        sizes="(min-width: 1280px) 380px, (min-width: 768px) 40vw, 100vw"
                                        className="object-cover object-center"
                                    />
                                </div>
                            ) : (
                                <div className="flex aspect-square w-full items-center justify-center rounded-sm bg-neutral-strong">
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

            {/* Pagination */}
            {(hasPreviousPage || hasNextPage) && (
                <div className="mt-14 flex items-center justify-center gap-4 border-t border-neutral-strong pt-7">
                    {hasPreviousPage && startCursor ? (
                        <Link
                            href={`/articles?before=${encodeURIComponent(startCursor)}`}
                            className="text-sm inline-block gradient-border rounded py-2 px-6 text-neutral-softest"
                        >
                            &larr; Previous
                        </Link>
                    ) : (
                        <span />
                    )}

                    {hasNextPage && endCursor ? (
                        <Link
                            href={`/articles?after=${encodeURIComponent(endCursor)}`}
                            className="text-sm inline-block gradient-border rounded py-2 px-6 text-neutral-softest"
                        >
                            Next &rarr;
                        </Link>
                    ) : (
                        <span />
                    )}
                </div>
            )}
        </div>
    );
}
