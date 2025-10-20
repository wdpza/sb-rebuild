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
                    item {
                        description
                        title
                    }
                    }
                    ... on ServicePageFieldsServicePageBuilderSocialMediaPackagedLayout {
                    introTitle
                    item {
                        description
                        title
                    }
                    }
                    ... on ServicePageFieldsServicePageBuilderHostingPackagesLayout {
                    packagesTable
                    title
                    }
                }
            }
        }
    }
`;
