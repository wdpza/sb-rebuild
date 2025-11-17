import { gql } from "graphql-request";
import { client } from "@/lib/graphql/client";

export const GET_ALL_TERMS_AND_CONDITIONS = gql`
    query GetAllTermsAndConditions($numberOfItems: Int) {
        termsConditions(first: $numberOfItems) {
            nodes {
            content
            title
            id
            }
        }
        termsConditionsOptions {
            termsConditionsOptionsFields {
            termsConditionsHero {
                anchor
                backgroundImage {
                node {
                    altText
                    mediaItemUrl
                }
                }
                description
                subHeading
                title
                mainImage {
                node {
                    altText
                    mediaItemUrl
                }
                }
            }
            termsConditionsExit {
                backgroundImage {
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
                title
            }
            }
        }
    }
`;

export async function getAllTermsAndConditions() {
    try {
        const data: any = await client.request(
            GET_ALL_TERMS_AND_CONDITIONS
        );

        return data;

    } catch (error) {
        console.error("Error fetching terms & Conditions:", error);
        return { menu: null, logo: null };
    }
}
