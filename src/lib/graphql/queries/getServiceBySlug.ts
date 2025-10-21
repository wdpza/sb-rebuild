import { gql } from "graphql-request";

export const GET_SERVICE_BY_SLUG = gql`
    query GetServiceBySlug($slug: ID!) {
        service(id: $slug, idType: URI) {
            title
            servicePageFields {
                servicePageBuilder {
                    __typename
                    ... on ServicePageFieldsServicePageBuilderHeroLayout {
                    subTitle
                    title
                    ctaLink {
                        url
                        title
                        target
                    }
                    backgrounD {
                        node {
                        altText
                        mediaItemUrl
                        }
                    }
                    }
                    ... on ServicePageFieldsServicePageBuilderServiceCarouselLayout {
                    introTitle
                    item {
                        title
                        description
                    }
                    }
                    ... on ServicePageFieldsServicePageBuilderWhyWordWithUsSectionLayout {
                    introTitle
                    item {
                        description
                        title
                    }
                    backgroundImage {
                        node {
                        altText
                        mediaItemUrl
                        }
                    }
                    }
                    ... on ServicePageFieldsServicePageBuilderFaqSectionLayout {
                    introTitle
                    image {
                        node {
                        altText
                        mediaItemUrl
                        }
                    }
                    item {
                        description
                        title
                    }
                    backgroundImage {
                        node {
                        altText
                        mediaItemUrl
                        }
                    }
                    }
                    ... on ServicePageFieldsServicePageBuilderExitSectionLayout {
                    title
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
                    }
                    ... on ServicePageFieldsServicePageBuilderPortfolioSectionLayout {
                    title
                    portfolioItems {
                        nodes {
                        altText
                        mediaItemUrl
                        }
                    }
                    }
                    ... on ServicePageFieldsServicePageBuilderSocialMediaPlatformsLayout {
                    introTitle
                    backgroundImage {
                        node {
                        altText
                        mediaItemUrl
                        }
                    }
                    platform {
                        platformLink
                        platformImage {
                        node {
                            altText
                            mediaItemUrl
                        }
                        }
                    }
                    }
                    ... on ServicePageFieldsServicePageBuilderSocialMediaPackagedLayout {
                    introTitle
                    spackages {
                        ctaLink {
                        title
                        url
                        target
                        }
                        description
                        title
                    }
                    }
                    ... on ServicePageFieldsServicePageBuilderHostingPackagesLayout {
                    title
                    hpackages {
                        service
                        notes
                        fee
                    }
                    ctaLink {
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
