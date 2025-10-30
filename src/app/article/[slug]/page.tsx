import { getPostBySlug } from "@/lib/graphql/queries/getPostBySlug";

export default async function ArticleSlugPage(
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;

    // getPostBySlug
    const post = await getPostBySlug(slug);

    if (!post) {
        return (
            <div className="mx-auto px-6 py-8">
                <h2 className="text-xl text-red-500">Article not found.</h2>
            </div>
        );
    }

    console.log(post);
    return (
        <div className="article-slug-page">
            <h1>Article Slug Page for {slug}</h1>
        </div>
    );
}