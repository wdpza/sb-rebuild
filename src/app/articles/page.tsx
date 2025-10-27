import Link from "next/link";
import Image from "next/image";

import { getAllPosts } from "@/lib/graphql/queries/getAllPosts";

export default async function BlogPage() {
    const { posts } = await getAllPosts(10);

    if (!posts?.nodes?.length) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">posts</h1>
                <p>No posts found.</p>
            </div>
        );
    }

    return (
        <div className="mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-2">
                {posts.nodes.map((post: any) => {
                    return (
                        <div
                            key={post.id}
                            className="grid grid-cols-12 rounded overflow-hidden duration-200 mb-8"
                        >
                            {/* Featured Image or Placeholder */}
                            {post.featuredImage?.node?.sourceUrl ? (
                                <div className="relative w-full col-span-4 rounded">
                                    <Image
                                        src={post.featuredImage.node.sourceUrl}
                                        alt={post.featuredImage.node.altText || post.title}
                                        fill
                                        sizes="100vw"
                                        className="object-cover object-center rounded-lg"
                                    />
                                </div>
                            ) : (
                                <div className="w-full bg-neutral-strong flex items-center justify-center col-span-2">
                                    <span className="text-neutral-softest text-sm tracking-wide uppercase">
                                        No Image Available
                                    </span>
                                </div>
                            )}

                            {/* Article Content */}
                            <div className="p-4 col-span-8 p-12">
                                <h2 className="font-bold mb-2 text-neutral-softest text-gradient-starbright text-4xl mb-12">
                                    {post.title}
                                </h2>

                                <div
                                    className="text-neutral-softer mb-8 line-clamp-3"
                                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
                                />

                                <Link
                                    className="text-sm inline-block gradient-border rounded py-2 px-6"
                                    href="#"
                                >
                                    Read It!
                                </Link>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Pagination */}
            {posts.pageInfo?.hasNextPage && (
                <div className="text-center mt-10">
                    <form action="/posts/load-more" method="GET">
                        <input
                            type="hidden"
                            name="after"
                            value={posts.pageInfo.endCursor}
                        />
                        <button
                            type="submit"
                            className="px-6 py-2 bg-accent-strong text-white rounded hover:bg-accent-strong/90"
                        >
                            Load More
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
