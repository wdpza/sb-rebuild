import { GraphQLClient } from "graphql-request";

const WP_USERNAME = process.env.WP_USERNAME!;
const WP_APP_PASSWORD = process.env.WP_APP_PASSWORD!;
const WP_GRAPHQL_URL = process.env.WORDPRESS_GRAPHQL_URL!;
const GRAPHQL_FETCH_TIMEOUT_MS = 15000;
const GRAPHQL_FETCH_MAX_ATTEMPTS = 3;
const GRAPHQL_RETRYABLE_STATUS_CODES = new Set([408, 429, 500, 502, 503, 504, 522, 524]);

type NextRequestInit = RequestInit & {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
};

// Create the Basic Auth header
const authHeader = "Basic " + Buffer.from(`${WP_USERNAME}:${WP_APP_PASSWORD}`).toString("base64");

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetryableFetchError(error: unknown) {
  const message = error instanceof Error ? error.message.toLowerCase() : "";
  const name = error instanceof Error ? error.name : "";
  const cause = typeof error === "object" && error !== null && "cause" in error
    ? (error as { cause?: { code?: string } }).cause
    : undefined;
  const causeCode = cause?.code;

  return (
    name === "AbortError" ||
    causeCode === "UND_ERR_SOCKET" ||
    causeCode === "UND_ERR_CONNECT_TIMEOUT" ||
    causeCode === "ECONNRESET" ||
    causeCode === "ETIMEDOUT" ||
    message.includes("fetch failed")
  );
}

async function fetchWithRetries(url: RequestInfo | URL, options: NextRequestInit = {}) {
  let lastError: unknown;

  for (let attempt = 1; attempt <= GRAPHQL_FETCH_MAX_ATTEMPTS; attempt += 1) {
    const timeoutController = options.signal ? null : new AbortController();
    const timeoutId = timeoutController
      ? setTimeout(() => timeoutController.abort(), GRAPHQL_FETCH_TIMEOUT_MS)
      : null;

    try {
      const response = await fetch(url, {
        ...options,
        signal: options.signal ?? timeoutController?.signal,
        next: {
          ...options.next,
          revalidate: false,
          tags: ["wordpress", ...(options.next?.tags ?? []).filter((tag) => tag !== "wordpress")],
        },
      });

      if (GRAPHQL_RETRYABLE_STATUS_CODES.has(response.status) && attempt < GRAPHQL_FETCH_MAX_ATTEMPTS) {
        await delay(attempt * 500);
        continue;
      }

      return response;
    } catch (error) {
      lastError = error;
      if (!isRetryableFetchError(error) || attempt === GRAPHQL_FETCH_MAX_ATTEMPTS) {
        throw error;
      }

      await delay(attempt * 500);
    } finally {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }
  }

  throw lastError;
}

export const client = new GraphQLClient(WP_GRAPHQL_URL, {
  headers: {
    "Content-Type": "application/json",
    "Authorization": authHeader,
  },
  fetch: async (url: RequestInfo | URL, options: NextRequestInit = {}) => {
    const response = await fetchWithRetries(url, options);

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
