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
                showContactForm
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
                backgroundImage {
                    node {
                    altText
                    mediaItemUrl
                    }
                }
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
                ctaLink {
                    target
                    title
                    url
                }
                backgroundOverlay
                }
                ... on PageFieldGroupPageBuilderTeamsSectionLayout {
                description
                subTitle
                title
                backgroundImage {
                    node {
                    altText
                    mediaItemUrl
                    }
                }
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
                backgroundImage {
                    node {
                    altText
                    mediaItemUrl
                    }
                }
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
                backgroundImage {
                    node {
                    altText
                    mediaItemUrl
                    }
                }
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
                backgroundImage {
                    node {
                    altText
                    mediaItemUrl
                    }
                }
                }
                ... on PageFieldGroupPageBuilderCaseStudiesLayout {
                numberOfItems
                title
                }
                ... on PageFieldGroupPageBuilderTestWillemLayout {
                description
                title
                }
                ... on PageFieldGroupPageBuilderTextWHeadingLayoutLayout {
                description
                title
                ctaLink {
                    target
                    title
                    url
                }
                backgroundImage {
                    node {
                    altText
                    mediaItemUrl
                    }
                }
                }
            }
            }
        }
    }
`;
