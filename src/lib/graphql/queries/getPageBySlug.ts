import { gql } from "graphql-request";

export const GET_PAGE_BY_SLUG = gql`
    query GetPageBySlug($slug: ID!) {
        page(id: $slug, idType: URI) {
            title
            pageFieldGroup {
            pageBuilder {
                __typename
                ... on PageFieldGroupPageBuilderHeroLayout {
                title
                description
                subTitle
                background {
                    node {
                    mediaItemUrl
                    mediaDetails {
                        file
                    }
                    }
                }
                image {
                    node {
                    mediaItemUrl
                    }
                }
                }
                ... on PageFieldGroupPageBuilderServicesAccordionLayout {
                content {
                    title
                    description
                }
                }
                ... on PageFieldGroupPageBuilderLogoSliderLayout {
                logo {
                    logo {
                    node {
                        altText
                        mediaItemUrl
                        sizes
                        sourceUrl
                        srcSet
                    }
                    }
                }
                }
                ... on PageFieldGroupPageBuilderPortfolioSectionLayout {
                numberOfItems
                title
                }
                ... on PageFieldGroupPageBuilderBusinessSolutionsLayout {
                numberOfItems
                title
                }
                ... on PageFieldGroupPageBuilderStatsSectionLayout {
                statsFirst
                statsSecond
                statsThird
                }
                ... on PageFieldGroupPageBuilderExitSectionLayout {
                title
                backgroundImage {
                    node {
                    altText
                    mediaItemUrl
                    }
                }
                link {
                    target
                    title
                    url
                }
                }
            }
            }
        }
    }
`;
