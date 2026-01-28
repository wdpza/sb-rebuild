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
                        ctaLink {
                            url
                            title
                        }
                        showContactForm
						forms {
							showForm
							fieldGroupName
							gravityFormId
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
                    ... on PageFieldGroupPageBuilderPortfolioTabsLayout {
                        fieldGroupName
                        categories {
                            nodes {
                                name
                                ... on PortfolioCategory {
                                    id
                                    name
                                    portfolioCategoryFields {
                                        categoryImages {
                                            image {
                                                node {
                                                    altText
                                                    filePath
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
						backgroundImage {
							node {
								filePath
							}
						}
                    }
                    ... on PageFieldGroupPageBuilderFormLayout {
                        fieldGroupName
                        formId
                        title
                        backgroundImage {
                            node {
                                altText
                                filePath
                            }
                        }
                    }
                    ... on PageFieldGroupPageBuilderWhyWorkWithUsSectionLayout {
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
                }
            }
        }
    }
`;
