import { gql } from "graphql-request";
import { client } from "@/lib/graphql/client";

export const GET_POST_BY_SLUG = gql`
    query GetPostBySlug($slug: ID!) {
        post(id: $slug, idType: SLUG) {
            id
            title
            content
            excerpt
            featuredImage {
                node {
                    sourceUrl
                    altText
                }
            }
        }
    }
`;

export async function getPostBySlug(
    slug: string,
) {
    try {
        const data: any = await client.request(GET_POST_BY_SLUG, { slug });
        return data.post ?? null;
    } catch (err) {
        console.error(`Error fetching post "${slug}":`, err);
        return null;
    }
}