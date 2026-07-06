import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    if (!id) {
        return NextResponse.json({ error: "Missing contact id" }, { status: 400 });
    }

    const linkedId = request.cookies.get("everlytic_linked_id")?.value;
    if (!linkedId || linkedId !== id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const apiKey = process.env.EVERLYTIC_API_KEY;
    const apiUrl =
        process.env.EVERLYTIC_API_URL ||
        "http://bulkemail.starbright.co.za/api/2.0/contacts";
    const username = process.env.EVERLYTIC_USERNAME || "";

    if (!apiKey) {
        return NextResponse.json({ error: "EVERLYTIC_API_KEY not configured" }, { status: 500 });
    }

    try {
        const auth = Buffer.from(`${username}:${apiKey}`).toString("base64");
        const url = `${apiUrl}/${id}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Basic ${auth}`,
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: `Everlytic API error: ${response.status} ${response.statusText}` },
                { status: response.status }
            );
        }

        const data = await response.json();
        const item = data.item;
        const custom = item.custom_fields || item.custom_values || {};

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
            "cfv_business_type94": custom.cfv_business_type94 || item.business_type94 || item.cfv_business_type94 || "",
            "cfv_facebook_business_page88": custom.cfv_facebook_business_page88 || item.facebook_business_page88 || item.cfv_facebook_business_page88 || "",
            "cfv_instagram_business_profile37": custom.cfv_instagram_business_profile37 || item.instagram_business_profile37 || item.cfv_instagram_business_profile37 || "",
        };

        return NextResponse.json(contactData);
    } catch (error) {
        console.error("[api/everlytic-contact] Failed to fetch contact:", error);
        return NextResponse.json({ error: "Failed to fetch contact" }, { status: 500 });
    }
}
