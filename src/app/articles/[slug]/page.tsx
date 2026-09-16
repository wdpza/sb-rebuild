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
        <div className="w-full">
            <h1 className="mb-10 text-[32px] font-bold text-neutral-softest">{category.name}</h1>

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
                        )
                    })}
                </div>
            )}

            {/* Pagination */}
            {hasNextPage && (
                <div className="text-center mt-10 hidden">
                    <Link
                        href={{
                            pathname: `/articles/${slug}`,
                            query: { after: endCursor },
                        }}
                        className="inline-block px-6 py-3 bg-accent-strong text-neutral-softest font-semibold rounded hover:bg-accent-strong/90 transition-all duration-300"
                    >
                        Next Page →
                    </Link>
                </div>
            )}
        </div>
    );
}
