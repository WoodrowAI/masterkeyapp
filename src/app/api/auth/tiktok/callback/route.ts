import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import {
  saveTokens,
  TIKTOK_CLIENT_KEY,
  TIKTOK_CLIENT_SECRET,
  TIKTOK_REDIRECT_URI,
  type TikTokTokens,
} from "@/lib/tiktok-tokens";

const BUSINESS_TOKEN_FILE = path.join(process.cwd(), ".tiktok-business-tokens.json");

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code") || searchParams.get("auth_code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  // Handle error from TikTok
  if (error) {
    console.error("TikTok OAuth error:", error, errorDescription);
    return NextResponse.redirect(
      new URL(`/settings?tiktok_error=${encodeURIComponent(errorDescription || error)}`, request.url)
    );
  }

  // Validate auth code
  if (!code) {
    return NextResponse.redirect(
      new URL("/settings?tiktok_error=no_code", request.url)
    );
  }

  // Determine flow: Business API (advertiser) or Content API (login kit)
  const isBusinessFlow = state === "masterkey_business";

  try {
    if (isBusinessFlow) {
      // === BUSINESS API TOKEN EXCHANGE ===
      const tokenResponse = await fetch(
        "https://business-api.tiktok.com/open_api/v1.3/oauth2/access_token/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            app_id: TIKTOK_CLIENT_KEY,
            secret: TIKTOK_CLIENT_SECRET,
            auth_code: code,
          }),
        }
      );

      const tokenData = await tokenResponse.json();
      console.log("TikTok Business API token response:", JSON.stringify(tokenData));

      if (tokenData.code !== 0 || !tokenData.data?.access_token) {
        const errMsg = tokenData.message || "business_token_exchange_failed";
        console.error("TikTok Business token error:", errMsg);
        return NextResponse.redirect(
          new URL(`/settings?tiktok_error=${encodeURIComponent(errMsg)}`, request.url)
        );
      }

      // Save business tokens
      const businessTokens = {
        access_token: tokenData.data.access_token,
        advertiser_ids: tokenData.data.advertiser_ids || [],
        scope: tokenData.data.scope || [],
        updated_at: new Date().toISOString(),
      };

      await fs.writeFile(
        BUSINESS_TOKEN_FILE,
        JSON.stringify(businessTokens, null, 2),
        "utf-8"
      );

      console.log("TikTok Business tokens saved! Advertiser IDs:", businessTokens.advertiser_ids);

      // Return tokens in response so they can be saved as env vars
      // (Vercel serverless file system is ephemeral)
      return new NextResponse(
        JSON.stringify({
          success: true,
          type: "business",
          message: "TikTok Ads connected! Copy these tokens to set as environment variables.",
          tokens: businessTokens,
        }, null, 2),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      // === CONTENT API TOKEN EXCHANGE (Login Kit) ===
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
      console.log("TikTok Content API token response:", JSON.stringify(tokenData));

      if (tokenData.error || !tokenData.access_token) {
        const errMsg = tokenData.error_description || tokenData.error || "token_exchange_failed";
        console.error("TikTok Content token error:", errMsg);
        return NextResponse.redirect(
          new URL(`/settings?tiktok_error=${encodeURIComponent(errMsg)}`, request.url)
        );
      }

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
      console.log("TikTok Content tokens saved!");

      // Return tokens in response so they can be saved as env vars
      // (Vercel serverless file system is ephemeral)
      return new NextResponse(
        JSON.stringify({
          success: true,
          type: "content",
          message: "TikTok Content connected! Copy these tokens to set as environment variables.",
          tokens,
        }, null, 2),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (err) {
    console.error("TikTok token exchange error:", err);
    return NextResponse.redirect(
      new URL("/settings?tiktok_error=exchange_failed", request.url)
    );
  }
}
