interface AccessTokenCache {
  token: string;
  expiry: number;
}

let tokenCache: AccessTokenCache | null = null;

interface GbpReviewer {
  profilePhotoUrl: string;
  displayName: string;
  isAnonymous: boolean;
}

interface GbpReview {
  name: string;
  reviewId: string;
  reviewer: GbpReviewer;
  starRating: "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";
  comment: string;
  createTime: string;
  updateTime: string;
}

interface GbpListResponse {
  reviews?: GbpReview[];
  averageRating?: number;
  totalReviewCount?: number;
  nextPageToken?: string;
}

export interface Review {
  name: string;
  profilePhotoUrl: string;
  displayName: string;
  rating: number;
  text: string;
  relativeTime: string;
}

export interface ReviewsResult {
  reviews: Review[];
  averageRating: number;
  totalCount: number;
}

const STAR_MAP: Record<string, number> = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
};

function relativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  if (diffYear > 0) return `${diffYear} year${diffYear !== 1 ? "s" : ""} ago`;
  if (diffMonth > 0) return `${diffMonth} month${diffMonth !== 1 ? "s" : ""} ago`;
  if (diffWeek > 0) return `${diffWeek} week${diffWeek !== 1 ? "s" : ""} ago`;
  if (diffDay > 0) return `${diffDay} day${diffDay !== 1 ? "s" : ""} ago`;
  if (diffHr > 0) return `${diffHr} hour${diffHr !== 1 ? "s" : ""} ago`;
  if (diffMin > 0) return `${diffMin} minute${diffMin !== 1 ? "s" : ""} ago`;
  return "just now";
}

function mapReview(raw: GbpReview): Review {
  return {
    name: raw.name,
    profilePhotoUrl: raw.reviewer.profilePhotoUrl || "",
    displayName: raw.reviewer.isAnonymous ? "Anonymous" : raw.reviewer.displayName,
    rating: STAR_MAP[raw.starRating] || 0,
    text: raw.comment || "",
    relativeTime: relativeTime(raw.createTime),
  };
}

async function getAccessToken(): Promise<string> {
  const now = Date.now();
  if (tokenCache && now < tokenCache.expiry) {
    return tokenCache.token;
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN must be configured");
  }

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`OAuth token exchange failed ${response.status}:`, errorBody);
    throw new Error(`Token exchange failed: ${response.status} - ${errorBody.slice(0, 500)}`);
  }

  const data = await response.json();
  const expiresIn = data.expires_in || 3600;

  tokenCache = {
    token: data.access_token,
    expiry: now + (expiresIn - 60) * 1000,
  };

  return tokenCache.token;
}

export async function fetchGoogleReviews(): Promise<ReviewsResult> {
  const accountId = process.env.GOOGLE_ACCOUNT_ID;
  const locationId = process.env.GOOGLE_LOCATION_ID;

  if (!accountId || !locationId) {
    throw new Error("GOOGLE_ACCOUNT_ID and GOOGLE_LOCATION_ID must be configured");
  }

  const accessToken = await getAccessToken();
  const allReviews: Review[] = [];
  let averageRating = 0;
  let totalCount = 0;
  let pageToken: string | undefined;

  do {
    const url = new URL(
      `https://mybusiness.googleapis.com/v4/accounts/-/locations/${locationId}/reviews`
    );
    url.searchParams.set("pageSize", "50");
    url.searchParams.set("orderBy", "updateTime desc");
    if (pageToken) {
      url.searchParams.set("pageToken", pageToken);
    }

    const response = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`GBP API error ${response.status}:`, errorBody);

      if (allReviews.length > 0) {
        break;
      }

      throw new Error(`GBP API responded with ${response.status}: ${errorBody.slice(0, 500)}`);
    }

    const data: GbpListResponse = await response.json();

    if (data.reviews) {
      allReviews.push(...data.reviews.map(mapReview));
    }

    averageRating = data.averageRating ?? averageRating;
    totalCount = data.totalReviewCount ?? totalCount;
    pageToken = data.nextPageToken;
  } while (pageToken);

  return { reviews: allReviews, averageRating, totalCount };
}
