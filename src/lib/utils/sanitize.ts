import DOMPurify from "isomorphic-dompurify";

/**
 * Sanitizes HTML content using DOMPurify
 * Centralized utility to ensure consistent sanitization across the app
 */
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html);
}

/**
 * Type-safe wrapper for dangerouslySetInnerHTML
 */
export function createSafeHtml(html: string) {
  return { __html: sanitizeHtml(html) };
}
