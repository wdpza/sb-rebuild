export const dynamic = "force-dynamic";

import { getCategoryBySlug } from "@/lib/graphql/queries/getCategoryBySlug";
import Image from "next/image";
import Link from "next/link";

export default async function ArticlesSlugPage({
    params,
    searchParams,
}: {
    params: Promise<{ slug: string }>;
    searchParams?: Promise<{ after?: string | null }>;
}) {
    const { slug } = await params;
    const after = (await searchParams)?.after ?? null;

    const category = await getCategoryBySlug(slug, 10, after);

    if (!category) {
        return (
            <div className="mx-auto px-6 py-8">
                <h2 className="text-xl text-red-500">Category not found.</h2>
            </div>
        );
    }

    const posts = category.posts?.nodes ?? [];
    const { hasNextPage, endCursor } = category.posts?.pageInfo ?? {};

    return (
        <div className="mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold mb-6">{category.name}</h1>

            {posts.length === 0 ? (
                <p className="text-gray-400">No posts found in this category.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-2">
                    {posts.map((post: any) => {

                        console.log(post);
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
                                        href={post.uri}
                                    >
                                        Read It!
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

            {/* Pagination */}
            {hasNextPage && (
                <div className="text-center mt-10">
                    <Link
                        href={{
                            pathname: `/articles/${slug}`,
                            query: { after: endCursor },
                        }}
                        className="inline-block px-6 py-3 bg-accent-strong text-white font-semibold rounded hover:bg-accent-strong/90 transition-all duration-300"
                    >
                        Next Page →
                    </Link>
                </div>
            )}
        </div>
    );
}
