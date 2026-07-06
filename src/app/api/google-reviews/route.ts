import { NextResponse } from "next/server";
import { fetchGoogleReviews } from "@/lib/services/google-reviews";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

let cached: { data: unknown; expiry: number } | null = null;
const CACHE_TTL_MS = 60 * 60 * 1000;

export async function GET() {
  const now = Date.now();
  if (cached && now < cached.expiry) {
    return NextResponse.json(cached.data);
  }

  try {
    const result = await fetchGoogleReviews();

    cached = { data: result, expiry: now + CACHE_TTL_MS };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Google Reviews API error:", error);

    if (cached) {
      return NextResponse.json(cached.data);
    }

    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 502 }
    );
  }
}
