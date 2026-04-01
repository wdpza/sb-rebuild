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
  fetch: async (url: RequestInfo | URL, options: RequestInit = {}) => {
    const response = await fetch(url, {
      ...options,
      next: { revalidate: false, tags: ["wordpress"] },
    });

    // Guard: if the WordPress server returned HTML (e.g. WP Redirection intercepted
    // the GraphQL POST) or an empty body, return a synthetic error JSON so that
    // graphql-request throws a typed GraphQL error instead of crashing with
    // "SyntaxError: Unexpected end of JSON input".
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      const syntheticBody = JSON.stringify({
        errors: [{ message: `GraphQL endpoint returned non-JSON response (${response.status}) — content-type: ${contentType}` }],
      });
      return new Response(syntheticBody, {
        status: response.status,
        headers: { "content-type": "application/json" },
      });
    }

    return response;
  },
});
