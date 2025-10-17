import { gql } from "graphql-request";
import { client } from "@/lib/graphql/client";

export const GET_POST_ITEMS = gql`
    query GetPostItems($numberPerPage: Int) {
        posts(first: $numberPerPage) {
            nodes {
            title
            content
            slug
            featuredImage {
                node {
                altText
                mediaItemUrl
                }
            }
            id
            }
            pageInfo {
                endCursor
                hasNextPage
                hasPreviousPage
                startCursor
            }
        }
    }
`;

export async function getPostItems(numberPerPage: number = 4) {
    try {
        const data: any = await client.request(GET_POST_ITEMS, {
            numberPerPage,
        });

        return data.posts?.nodes || [];
    } catch (error) {
        console.error("Error fetching post items:", error);
        return [];
    }
}
