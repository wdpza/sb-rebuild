import { gql } from "graphql-request";

export const GET_SERVICE_BY_SLUG = gql`
    query GetServiceBySlug($slug: ID!) {
        service(id: $slug, idType: URI) {
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
                        logoSlider {
                            show
                            logos {
                                logo {
                                    node {
                                        altText
                                        filePath
                                        mediaItemUrl
                                    }
                                }
                            }
                        }
                    }
                    ... on ServicePageFieldsServicePageBuilderServiceCarouselLayout {
                        introTitle
                        item {
                            title
                            description
                        }
                        backgroundImage {
                            node {
                                altText
                                mediaItemUrl
                            }
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
                        ctaButtonGroup {
                            buttonLabel
                            ctaButtonUrl {
                                nodes {
                                    uri
                                    slug
                                    link
                                }
                            }
                        }
                        style
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
                        layout
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
                            popular
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
                    ... on ServicePageFieldsServicePageBuilderTextHeadingBlockLayout {
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
                    ... on ServicePageFieldsServicePageBuilderRightImageSectionWTextVideoLayout {
                        description
                        title
                        video
                        image {
                            node {
                                altText
                                mediaItemUrl
                            }
                        }
                    }
                    ... on ServicePageFieldsServicePageBuilderGoogleReviewBoosterLayout {
                        features {
                            description
                            title
                        }
                        image {
                            node {
                                altText
                                mediaItemUrl
                            }
                        }
                    }
                    ... on ServicePageFieldsServicePageBuilderServiceGalleryLayout {
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
                    ... on ServicePageFieldsServicePageBuilderHostingPageHeroLayout {
                        hostingPageHero {
                            background {
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
                            subTitle
                            title
                        }
                        hostingPageServices {
                            item {
                                description
                                title
                            }
                        }
                    }
                    ... on ServicePageFieldsServicePageBuilderTwoColumnImageLeftLayout {
                        image {
                            node {
                                filePath
                                altText
                            }
                        }
                        rightColumn {
                            content
                            heading
                            subHeading
                        }
                        backgroundImage {
                            node {
                                filePath
                            }
                        }
                    }
                    ... on ServicePageFieldsServicePageBuilderTwoColumnImageRightLayout {
                        image {
                            node {
                                altText
                                filePath
                            }
                        }
                        leftColumn {
                            content
                            heading
                            subHeading
                        }
                        backgroundImage {
                            node {
                                filePath
                            }
                        }
                    }
                    ... on ServicePageFieldsServicePageBuilderLogoSliderLayout {
                        fieldGroupName
                        logos {
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
                        style
                    }
                    ... on ServicePageFieldsServicePageBuilderServicesSliderLayout {
                        slide {
                            clientName
                            service
                            image {
                                node {
                                    altText
                                    filePath
                                }
                            }
                        }
                    }
                    ... on ServicePageFieldsServicePageBuilderCtaBlockLayout {
                        heading
                        buttonGroup {
                            ctaLabel
                            ctaLink {
                                nodes {
                                    uri
                                }
                            }
                        }
                    }
                    ... on ServicePageFieldsServicePageBuilderPhotoSliderLayout {
                        slide {
                            image {
                                node {
                                    mediaItemUrl
                                    altText
                                    filePath
                                }
                            }
                        }
                        backgroundImage {
                            node {
                                altText
                                filePath
                                mediaItemUrl
                            }
                        }
                        layout
                    }
                }
            }
        }
    }
`;
