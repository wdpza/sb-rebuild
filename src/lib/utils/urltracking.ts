const URL_TRACKING_SESSION_KEY = "urltracking";
const EXCLUDED_TRACKING_KEYS = new Set(["redirect_to", "reauth"]);

/**
 * Builds a filtered map of URL tracking params, excluding internal keys.
 */
export function buildTrackingParams(
  searchParams: URLSearchParams
): Record<string, string> {
  const params: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    if (!EXCLUDED_TRACKING_KEYS.has(key)) {
      params[key] = value;
    }
  });
  return params;
}

/**
 * Captures URL tracking params into sessionStorage on first visit only.
 * Subsequent calls within the same session are no-ops.
 */
export function captureUrlTrackingOnce(searchParams: URLSearchParams): void {
  if (typeof window === "undefined") return;
  if (sessionStorage.getItem(URL_TRACKING_SESSION_KEY) !== null) return;
  const params = buildTrackingParams(searchParams);
  if (Object.keys(params).length === 0) return;
  sessionStorage.setItem(URL_TRACKING_SESSION_KEY, JSON.stringify(params));
}

/**
 * Returns the raw JSON string stored in sessionStorage, or null.
 * Always returns null during SSR.
 */
export function getSessionUrlTracking(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(URL_TRACKING_SESSION_KEY);
}

/**
 * Safely parses a urltracking JSON string back to a plain object.
 * Returns null if the value is empty, null, or invalid JSON.
 */
export function parseUrlTracking(
  value: string | null | undefined
): Record<string, string> | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as Record<string, string>;
    }
    return null;
  } catch {
    return null;
  }
}
