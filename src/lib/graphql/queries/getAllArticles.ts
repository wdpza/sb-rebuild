import { gql } from "graphql-request";
import { client } from "@/lib/graphql/client";

export const GET_ALL_ARTICLES = gql`
    query GetAllArticles($first: Int = 100) {
        posts(first: $first) {
            nodes {
                slug
            }
        }
    }
`;

export async function getAllArticles(first: number = 100) {
    try {
        const data: any = await client.request(GET_ALL_ARTICLES, {
            first,
        });

        return data.posts?.nodes || [];
    } catch (error) {
        console.error("Error fetching all articles:", error);
        return [];
    }
}
