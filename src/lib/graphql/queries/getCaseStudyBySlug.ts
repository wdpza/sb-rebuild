import { gql } from "graphql-request";

export const GET_CASE_STUDY_BY_SLUG = gql`
    query GetCaseStudyBySlug($slug: ID!) {
        caseStudy(id: $slug, idType: URI) {
            title
            slug
            seo {
                title
                description
                canonicalUrl
                focusKeywords
                robots
                openGraph {
                    title
                    description
                    url
                    type
                    locale
                    siteName
                    image {
                        url
                        width
                        height
                        type
                    }
                    twitterMeta {
                        card
                        site
                        creator
                        title
                        description
                        image
                    }
                }
            }
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
            slug
        }
    }
`;
