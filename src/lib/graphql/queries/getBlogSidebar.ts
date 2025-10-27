import { gql } from "graphql-request";
import { client } from "@/lib/graphql/client";

export const GET_BLOG_EXTRA = gql`
    query getPostCategories {
        categories {
            nodes {
                name
                uri
            }
        }
    }
`;

export async function getAllPosts(first = 10, after?: string | null) {
    try {
        const data: any = await client.request(GET_BLOG_EXTRA, { first, after });
        return data.categories;
    } catch (err) {
        console.error("Error fetching posts:", err);
        return { nodes: [], pageInfo: { hasNextPage: false, endCursor: null } };
    }
}
