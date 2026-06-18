import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname === "/competition") {
        const urlContactId = request.nextUrl.searchParams.get("contact_id");

        if (urlContactId) {
            const linkedId = request.cookies.get("everlytic_linked_id")?.value;

            const nextRes = NextResponse.next();

            // Lock the contact_id to this device on first visit
            if (!linkedId) {
                nextRes.cookies.set("everlytic_linked_id", urlContactId, {
                    path: "/",
                    maxAge: 60 * 60 * 24 * 365,
                    httpOnly: true,
                    sameSite: "lax",
                });
            }

            return nextRes;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/competition",
};
