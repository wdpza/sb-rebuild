import { gql } from "graphql-request";
import { client } from "@/lib/graphql/client";

export const GET_CASE_STUDY_ITEMS = gql`
    query GetCaseStudyItems($numberOfItems: Int) {
        caseStudies(first: $numberOfItems) {
            nodes {
            title
            slug
            caseStudies {
                clientFeedback
                clientFeedbackClient
                factCheckedBy
                headerText
                howLongRead
                headerBackgroundImage {
                node {
                    altText
                    mediaItemUrl
                }
                }
                headerImage {
                node {
                    altText
                    mediaItemUrl
                }
                }
                headerLogo {
                node {
                    altText
                    mediaItemUrl
                }
                }
                pageSection {
                    sectionCtaLink {
                        target
                        title
                        url
                    }
                    sectionDescription
                    sectionTitle
                }
                cardBg {
                    node {
                        altText
                        filePath
                    }
                }
            }
            terms {
                nodes {
                name
                ... on CaseStudyCategory {
                    id
                    name
                }
                }
            }
            }
        }
    }
`;

export async function getCaseStudyItems(numberOfItems: number = 6) {
    try {
        const data: any = await client.request(GET_CASE_STUDY_ITEMS, {
            numberOfItems,
        });

        return data.caseStudies?.nodes || [];
    } catch (error) {
        console.error("Error fetching portfolio items:", error);
        return [];
    }
}
