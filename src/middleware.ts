import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname === "/competition") {
        const urlContactId = request.nextUrl.searchParams.get("contact_id");

        if (urlContactId) {
            const linkedId = request.cookies.get("everlytic_linked_id")?.value;

            // If a cookie exists and doesn't match the URL param, strip the param
            // to prevent a user from tampering with contact_id in the URL.
            if (linkedId && linkedId !== urlContactId) {
                const url = request.nextUrl.clone();
                url.searchParams.delete("contact_id");
                return NextResponse.redirect(url);
            }

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
