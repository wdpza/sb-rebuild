import { gql } from "graphql-request";

// Common media node fragment
export const MEDIA_NODE_FRAGMENT = gql`
  fragment MediaNode on MediaItem {
    altText
    mediaItemUrl
  }
`;

// Background image fragment
export const BACKGROUND_IMAGE_FRAGMENT = gql`
  fragment BackgroundImage on ACF_MediaItemConnectionEdge {
    node {
      altText
      mediaItemUrl
    }
  }
`;

// CTA Link fragment
export const CTA_LINK_FRAGMENT = gql`
  fragment CtaLink on AcfLink {
    url
    title
    target
  }
`;

// Common menu item fragment
export const MENU_ITEM_FRAGMENT = gql`
  fragment MenuItem on MenuItem {
    id
    label
    url
    uri
    target
    cssClasses
    parentId
    order
  }
`;

// Portfolio fields fragment
export const PORTFOLIO_FIELDS_FRAGMENT = gql`
  fragment PortfolioFields on Portfolio {
    slug
    title
    portfolioFields {
      logo {
        node {
          altText
          mediaItemUrl
        }
      }
      sliderImageMain {
        node {
          altText
          mediaItemUrl
        }
      }
      sliderImageSlide1 {
        node {
          altText
          mediaItemUrl
        }
      }
      sliderImageSlide2 {
        node {
          altText
          mediaItemUrl
        }
      }
    }
  }
`;

// Post fields fragment
export const POST_FIELDS_FRAGMENT = gql`
  fragment PostFields on Post {
    id
    slug
    title
    date
    excerpt
    featuredImage {
      node {
        altText
        mediaItemUrl
      }
    }
    categories {
      nodes {
        name
        slug
      }
    }
  }
`;
