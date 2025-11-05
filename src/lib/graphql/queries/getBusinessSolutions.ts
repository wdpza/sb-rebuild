import { gql } from "graphql-request";
import { client } from "@/lib/graphql/client";

export const GET_BUSINESS_SOLUTIONS = gql`
    query GetBusinessSolutions($numberOfItems: Int) {
        businessSolutions(first: $numberOfItems) {
            nodes {
            businessSolutionFields {
                logo {
                node {
                    altText
                    mediaItemUrl
                }
                }
                ctaLink {
                target
                title
                url
                }
            }
            content
            link
            slug
            uri
            }
        }
    }
`;

export async function getBusinessSolutions(numberOfItems: number = 4) {
    try {
        const data: any = await client.request(GET_BUSINESS_SOLUTIONS, {
            numberOfItems,
        });

        return data.businessSolutions?.nodes || [];
    } catch (error) {
        console.error("Error fetching portfolio items:", error);
        return [];
    }
}
