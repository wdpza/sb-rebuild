import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname === "/competition") {
        const linkedId = request.cookies.get("everlytic_linked_id")?.value;
        const urlContactId = request.nextUrl.searchParams.get("contact_id");

        // Tamper guard: if a contact_id is already linked to this device, ignore the URL param
        const contactId = linkedId || urlContactId;

        // Only auto-populate from Everlytic when contact_id is explicitly in the URL
        if (urlContactId) {
            const apiKey = process.env.EVERLYTIC_API_KEY;
            const apiUrl =
                process.env.EVERLYTIC_API_URL ||
                "http://bulkemail.starbright.co.za/api/2.0/contacts";
            const username = process.env.EVERLYTIC_USERNAME || "";

            if (apiKey) {
                try {
                    const auth = btoa(`${username}:${apiKey}`);
                    const url = `${apiUrl}/${contactId}`;

                    console.log(`[middleware] Fetching Everlytic contact: ${contactId}`);

                    const response = await fetch(url, {
                        method: "GET",
                        headers: {
                            Authorization: `Basic ${auth}`,
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        const item = data.item;
                        console.log("[middleware] Everlytic item fields:", Object.keys(item));
                        console.log("[middleware] area64:", item.area64);
                        console.log("[middleware] business_information34:", item.business_information34);

                        const contactData = {
                            "input_1": item.name || "",
                            "input_3": item.lastname || "",
                            "input_4": item.company_name || "",
                            "input_6": item.mobile || "",
                            "input_7": item.email || "",
                            "input_8": item.social_media_channel61 || "",
                            "input_9": item.social_media_username13 || "",
                            "input_10": item.website_url14 || "",
                            "area64": item.area64 || "",
                            "business_information34": item.business_information34 || "",
                        };

                        const nextRes = NextResponse.next();
                        nextRes.cookies.set("everlytic_contact", JSON.stringify(contactData), {
                            path: "/",
                            maxAge: 60,
                            httpOnly: false,
                        });
                        // Lock the contact_id to this device on first visit
                        if (!linkedId && urlContactId) {
                            nextRes.cookies.set("everlytic_linked_id", urlContactId, {
                                path: "/",
                                maxAge: 60 * 60 * 24 * 365,
                                httpOnly: true,
                                sameSite: "lax",
                            });
                        }
                        return nextRes;
                    } else {
                        console.error(
                            `[middleware] Everlytic API error: ${response.status} ${response.statusText}`
                        );
                    }
                } catch (error) {
                    console.error("[middleware] Failed to fetch Everlytic contact:", error);
                }
            } else {
                console.warn("[middleware] EVERLYTIC_API_KEY not configured");
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/competition",
};
