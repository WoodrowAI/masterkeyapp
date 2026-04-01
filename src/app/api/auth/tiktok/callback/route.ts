import { NextRequest, NextResponse } from "next/server";
import {
  saveTokens,
  TIKTOK_CLIENT_KEY,
  TIKTOK_CLIENT_SECRET,
  TIKTOK_REDIRECT_URI,
  type TikTokTokens,
} from "@/lib/tiktok-tokens";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  // Handle error from TikTok
  if (error) {
    console.error("TikTok OAuth error:", error, errorDescription);
    return NextResponse.redirect(
      new URL(`/?tiktok_error=${encodeURIComponent(errorDescription || error)}`, request.url)
    );
  }

  // Validate auth code
  if (!code) {
    return NextResponse.redirect(
      new URL("/?tiktok_error=no_code", request.url)
    );
  }

  try {
    // Exchange auth code for access token using v2 API
    const tokenResponse = await fetch(
      "https://open.tiktokapis.com/v2/oauth/token/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Cache-Control": "no-cache",
        },
        body: new URLSearchParams({
          client_key: TIKTOK_CLIENT_KEY,
          client_secret: TIKTOK_CLIENT_SECRET,
          code: code,
          grant_type: "authorization_code",
          redirect_uri: TIKTOK_REDIRECT_URI,
        }),
      }
    );

    const tokenData = await tokenResponse.json();

    console.log("TikTok token exchange response:", JSON.stringify(tokenData));

    // Check for errors in the response
    if (tokenData.error || !tokenData.access_token) {
      const errMsg = tokenData.error_description || tokenData.error || "token_exchange_failed";
      console.error("TikTok token exchange error:", errMsg);
      return NextResponse.redirect(
        new URL(`/?tiktok_error=${encodeURIComponent(errMsg)}`, request.url)
      );
    }

    // Save tokens
    const tokens: TikTokTokens = {
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
      open_id: tokenData.open_id || "",
      scope: tokenData.scope || "",
      expires_at: Date.now() + tokenData.expires_in * 1000,
      refresh_expires_at: Date.now() + tokenData.refresh_expires_in * 1000,
      updated_at: new Date().toISOString(),
    };

    await saveTokens(tokens);

    console.log("TikTok tokens saved successfully!");

    // Redirect to dashboard with success
    return NextResponse.redirect(
      new URL("/?tiktok_connected=true", request.url)
    );
  } catch (err) {
    console.error("TikTok token exchange error:", err);
    return NextResponse.redirect(
      new URL(`/?tiktok_error=exchange_failed`, request.url)
    );
  }
}
