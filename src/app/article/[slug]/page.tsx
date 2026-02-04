import { getPostBySlug } from "@/lib/graphql/queries/getPostBySlug";
import { getAllArticles } from "@/lib/graphql/queries/getAllArticles";
import BlogInnerHero from "@/components/blog/BlogInnerHero"
import DOMPurify from 'isomorphic-dompurify';
import type { Metadata } from "next";

// Revalidate every hour (3600 seconds)
export const revalidate = 3600;

export async function generateStaticParams() {
    const articles = await getAllArticles(100);
    return articles.map((article: any) => ({
        slug: article.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Article Not Found',
        };
    }

    const seo = post.seo;

    return {
        title: seo?.title || `${post.title} | Starbright`,
        description: seo?.description || post.excerpt,
        keywords: seo?.focusKeywords,
        alternates: {
            canonical: seo?.canonicalUrl,
        },
        robots: seo?.robots ? seo.robots.join(', ') : undefined,
        openGraph: {
            title: seo?.openGraph?.title || `${post.title} | Starbright`,
            description: seo?.openGraph?.description || post.excerpt,
            url: seo?.openGraph?.url,
            siteName: seo?.openGraph?.siteName || 'Starbright',
            locale: seo?.openGraph?.locale || 'en_US',
            type: (seo?.openGraph?.type as any) || 'article',
            images: seo?.openGraph?.image ? [{
                url: seo.openGraph.image.url,
                width: seo.openGraph.image.width || undefined,
                height: seo.openGraph.image.height || undefined,
                type: seo.openGraph.image.type || undefined,
            }] : post.featuredImage?.node?.sourceUrl ? [post.featuredImage.node.sourceUrl] : undefined,
        },
        twitter: {
            card: (seo?.openGraph?.twitterMeta?.card as any) || 'summary_large_image',
            site: seo?.openGraph?.twitterMeta?.site,
            creator: seo?.openGraph?.twitterMeta?.creator,
            title: seo?.openGraph?.twitterMeta?.title || seo?.title || `${post.title} | Starbright`,
            description: seo?.openGraph?.twitterMeta?.description || seo?.description || post.excerpt,
            images: seo?.openGraph?.twitterMeta?.image ? [seo.openGraph.twitterMeta.image] : undefined,
        },
    };
}

export default async function ArticleSlugPage(
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;

    // getPostBySlug
    const post = await getPostBySlug(slug);
    const sanitizedHtml = DOMPurify.sanitize(post.content || '');

    if (!post) {
        return (
            <div className="mx-auto px-6 py-8">
                <h2 className="text-xl text-red-500">Article not found.</h2>
            </div>
        );
    }
    
    return (
        <article className="article-slug-page">
            <BlogInnerHero background={post.featuredImage.node.sourceUrl} title={post.title} />
            <div id="article" className="relative z-10 py-12 w-full max-w-[1600px] mx-auto flex flex-col text-neutral-softest px-6">
                {sanitizedHtml ? (
                <div
                    className="prose w-full text-neutral-softest mb-8 max-w-none"
                    dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
                />
                ) : null}
            </div>
        </article>
    );
}