import { GraphQLClient } from "graphql-request";

const WP_USERNAME = process.env.WP_USERNAME!;
const WP_APP_PASSWORD = process.env.WP_APP_PASSWORD!;
const WP_GRAPHQL_URL = process.env.WORDPRESS_GRAPHQL_URL!;

// Create the Basic Auth header
const authHeader = "Basic " + Buffer.from(`${WP_USERNAME}:${WP_APP_PASSWORD}`).toString("base64");

export const client = new GraphQLClient(WP_GRAPHQL_URL, {
  headers: {
    "Content-Type": "application/json",
    "Authorization": authHeader,
  },
  fetch: (url: RequestInfo | URL, options: RequestInit = {}) => {
    return fetch(url, {
      ...options,
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
  },
});
