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
                        mediaDetails {
                            file
                        }
                        }
                    }
                    link {
                        target
                        title
                        url
                    }
                    }
                    ... on PageFieldGroupPageBuilderTeamsSectionLayout {
                    description
                    subTitle
                    title
                    }
                    ... on PageFieldGroupPageBuilderCertificationSectionLayout {
                    fieldGroupName
                    certificates {
                        description
                        logo {
                        node {
                            altText
                            mediaItemUrl
                        }
                        }
                        title
                    }
                    }
                    ... on PageFieldGroupPageBuilderEmployeeCarouselLayout {
                    description
                    employeePhotos {
                        nodes {
                        altText
                        mediaItemUrl
                        }
                    }
                    title
                    }
                    ... on PageFieldGroupPageBuilderLeftGallerySectionLayout {
                    description
                    fieldGroupName
                    gallery {
                        nodes {
                        altText
                        mediaItemUrl
                        }
                    }
                    title
                    }
                    ... on PageFieldGroupPageBuilderRightImageSectionLayout {
                    description
                    fieldGroupName
                    image {
                        node {
                        altText
                        mediaItemUrl
                        }
                    }
                    title
                    }
                    ... on PageFieldGroupPageBuilderPortfolioTabsLayout {
                    perCategory
                    categories {
                        nodes {
                        termTaxonomyId
                        slug
                        name
                        databaseId
                        }
                    }
                    }
                    ... on PageFieldGroupPageBuilderBlogTabsLayout {
                    fieldGroupName
                    perPage
                    categories {
                        nodes {
                        databaseId
                        name
                        slug
                        termTaxonomyId
                        }
                    }
                    }
                }
            }
        }
    }
`;
