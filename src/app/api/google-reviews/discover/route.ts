import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function getAccessToken(): Promise<string> {
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
    throw new Error(`Token exchange failed: ${response.status}`);
  }

  const data = await response.json();
  return data.access_token;
}

export async function GET() {
  try {
    const accessToken = await getAccessToken();

    const accountsRes = await fetch(
      "https://mybusinessaccountmanagement.googleapis.com/v1/accounts",
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    if (!accountsRes.ok) {
      return NextResponse.json(
        { error: `Failed to list accounts: ${accountsRes.status}` },
        { status: 502 }
      );
    }

    const accountsData = await accountsRes.json();
    const accounts = accountsData.accounts || [];

    const results = [];

    for (const account of accounts) {
      const accountId = account.name.replace("accounts/", "");

      const locationsRes = await fetch(
        `https://mybusinessbusinessinformation.googleapis.com/v1/accounts/${accountId}/locations?readMask=name,title`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      let locations: Array<{ name: string; title: string }> = [];
      let locationsError: string | undefined;

      if (locationsRes.ok) {
        const locationsData = await locationsRes.json();
        locations = locationsData.locations || [];
      } else {
        const errBody = await locationsRes.text();
        locationsError = `${locationsRes.status}: ${errBody.slice(0, 200)}`;
      }

      results.push({
        accountId,
        accountName: account.accountName,
        accountType: account.type,
        verificationState: account.verificationState,
        locations: locations.map((loc) => ({
          locationId: loc.name.replace(/.*\/locations\//, ""),
          locationName: loc.title,
          resourceName: loc.name,
        })),
        ...(locationsError && { locationsError }),
      });
    }

    return NextResponse.json({ accounts: results });
  } catch (error) {
    console.error("Discover error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to discover accounts" },
      { status: 500 }
    );
  }
}
