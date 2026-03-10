import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * WordPress on-demand revalidation endpoint.
 *
 * WordPress (via WP Webhooks plugin or custom hook) sends a POST request here
 * whenever content is saved/published. The endpoint validates a shared secret
 * and then invalidates the relevant Next.js cache entries.
 *
 * Required env var: REVALIDATION_SECRET
 *
 * Expected WordPress webhook payload:
 * {
 *   "post_type": "post" | "page" | "service" | "case_study" | "portfolio" | ...,
 *   "slug": "my-post-slug",
 *   "post_status": "publish" | "draft" | ...
 * }
 */

// Map WordPress post types to the Next.js path prefixes they appear under
const POST_TYPE_PATHS: Record<string, string[]> = {
  page: ["/"],
  post: ["/article", "/articles"],
  service: ["/service"],
  case_study: ["/case-study"],
  "case-study": ["/case-study"],
  portfolio: ["/portfolio"],
  business_solution: ["/business-solution"],
  "business-solution": ["/business-solution"],
};

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let body: Record<string, string> = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const { post_type, slug } = body;

  // Always bust the global wordpress tag — covers all cached GQL/REST fetches
  revalidateTag("wordpress");

  // Also revalidate specific paths so static pages refresh immediately
  const paths = POST_TYPE_PATHS[post_type] ?? [];
  for (const prefix of paths) {
    if (slug) {
      // Revalidate the specific page
      revalidatePath(`${prefix}/${slug}`);
    }
    // Revalidate the listing page / root in case nav or listings changed
    revalidatePath(prefix || "/");
  }

  // Always revalidate the root layout (covers header/footer/menu changes)
  revalidatePath("/", "layout");

  console.log(
    `[revalidate] tag=wordpress post_type=${post_type ?? "unknown"} slug=${slug ?? "unknown"}`
  );

  return NextResponse.json({
    revalidated: true,
    tag: "wordpress",
    post_type: post_type ?? null,
    slug: slug ?? null,
  });
}
