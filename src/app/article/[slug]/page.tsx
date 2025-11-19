import { getPostBySlug } from "@/lib/graphql/queries/getPostBySlug";
import BlogInnerHero from "@/components/blog/BlogInnerHero"
import DOMPurify from 'isomorphic-dompurify';

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
        <div className="article-slug-page">
            <BlogInnerHero background={post.featuredImage.node.sourceUrl} title={post.title} />
            <div className="relative z-10 py-12 w-full max-w-[1600px] mx-auto flex flex-col text-neutral-softest px-6">
                {sanitizedHtml ? (
                <div
                    className="prose w-full text-neutral-softest mb-8 max-w-none"
                    dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
                />
                ) : null}
            </div>
        </div>
    );
}