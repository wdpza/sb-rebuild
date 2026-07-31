const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://starbright.co.za").replace(/\/+$/, "");

export function toSiteUrl(url?: string | null): string | undefined {
  if (!url) return undefined;
  try {
    const parsed = new URL(url);
    return `${SITE_URL}${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return url;
  }
}
