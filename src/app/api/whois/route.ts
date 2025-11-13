import { NextRequest, NextResponse } from "next/server";
import whois from "whois-json";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    try {
        const { domain } = await req.json();

        if (!domain || typeof domain !== "string") {
            return NextResponse.json({ error: "Domain is required" }, { status: 400 });
        }

        // Basic sanitization
        const cleaned = domain.trim().toLowerCase().replace(/[^a-z0-9.-]/g, "");
        if (!cleaned || !cleaned.includes(".")) {
            return NextResponse.json({ error: "Invalid domain" }, { status: 400 });
        }

        const data = await whois(cleaned, { timeout: 5000 });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: "Lookup failed" },
            { status: 500 }
        );
    }
}
