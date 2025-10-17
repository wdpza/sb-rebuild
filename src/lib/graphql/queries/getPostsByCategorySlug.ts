import { gql } from "graphql-request";
import { client } from "@/lib/graphql/client";

export const GET_POSTS_BY_CATEGORY_SLUG = gql`
    query GetPostsByCategorySlug($slug: String, $first: Int = 10, $after: String) {
        posts(where: {categoryName: $slug}, first: $first, after: $after) {
            pageInfo {
                hasNextPage
                endCursor
            }
            nodes {
                id
                title
                slug
                date
                excerpt
                uri
                featuredImage {
                    node {
                    sourceUrl
                    altText
                    }
                }
                categories {
                    nodes {
                        id
                        name
                        slug
                    }
                }
            }
        }
    }
`;

export async function GetPostsByCategorySlug() {
    try {
        const data: any = await client.request(
            GET_POSTS_BY_CATEGORY_SLUG
        );

        return data.posts;
    } catch (error) {
        console.error("Error fetching primary menu:", error);
        return { menu: null, logo: null };
    }
}