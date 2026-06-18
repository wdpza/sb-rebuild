import { NextResponse } from "next/server";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    if (!id) {
        return NextResponse.json({ error: "Missing contact id" }, { status: 400 });
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

        return NextResponse.json(contactData);
    } catch (error) {
        console.error("[api/everlytic-contact] Failed to fetch contact:", error);
        return NextResponse.json({ error: "Failed to fetch contact" }, { status: 500 });
    }
}
