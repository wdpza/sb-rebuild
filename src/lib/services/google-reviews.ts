interface GoogleReview {
  author_name: string;
  author_url: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

interface PlaceDetailsResponse {
  result?: {
    rating?: number;
    user_ratings_total?: number;
    reviews?: GoogleReview[];
  };
  status: string;
  error_message?: string;
}

export interface ReviewsResult {
  reviews: GoogleReview[];
  averageRating: number;
  totalCount: number;
}

export async function fetchGoogleReviews(): Promise<ReviewsResult> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    throw new Error("GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID must be configured");
  }

  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("key", apiKey);
  url.searchParams.set("language", "en");

  const response = await fetch(url.toString(), {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Places API responded with ${response.status}`);
  }

  const data: PlaceDetailsResponse = await response.json();

  if (data.status !== "OK") {
    throw new Error(`Places API error: ${data.status}${data.error_message ? ` — ${data.error_message}` : ""}`);
  }

  return {
    reviews: data.result?.reviews || [],
    averageRating: data.result?.rating || 0,
    totalCount: data.result?.user_ratings_total || 0,
  };
}
