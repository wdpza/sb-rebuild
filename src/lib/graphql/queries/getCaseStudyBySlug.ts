import { gql } from "graphql-request";

export const GET_CASE_STUDY_BY_SLUG = gql`
    query GetCaseStudyBySlug($slug: ID!) {
        caseStudy(id: $slug, idType: URI) {
            caseStudies {
            clientFeedback
            clientFeedbackClient
            factCheckedBy
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
            headerText
            howLongRead
            pageSection {
                sectionCtaLink {
                title
                url
                target
                }
                sectionDescription
                sectionTitle
            }
            }
            title
        }
    }
`;
