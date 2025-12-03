import { gql } from "graphql-request";

// Common media node fragment
export const MEDIA_NODE_FRAGMENT = gql`
  fragment MediaNode on MediaItem {
    altText
    mediaItemUrl
    mediaDetails {
      file
    }
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
