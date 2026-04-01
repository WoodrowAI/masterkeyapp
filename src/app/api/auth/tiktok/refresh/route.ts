import { NextResponse } from "next/server";
import {
  loadTokens,
  saveTokens,
  isRefreshTokenExpired,
  TIKTOK_CLIENT_KEY,
  TIKTOK_CLIENT_SECRET,
  type TikTokTokens,
} from "@/lib/tiktok-tokens";

export async function POST() {
  try {
    const tokens = await loadTokens();

    if (!tokens) {
      return NextResponse.json(
        { error: "No TikTok tokens found. Please authorize first." },
        { status: 401 }
      );
    }

    if (isRefreshTokenExpired(tokens)) {
      return NextResponse.json(
        { error: "Refresh token expired. Please re-authorize." },
        { status: 401 }
      );
    }

    // Refresh the access token using v2 API
    const refreshResponse = await fetch(
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
          grant_type: "refresh_token",
          refresh_token: tokens.refresh_token,
        }),
      }
    );

    const refreshData = await refreshResponse.json();

    if (refreshData.error || !refreshData.access_token) {
      return NextResponse.json(
        { error: refreshData.error_description || "Token refresh failed" },
        { status: 400 }
      );
    }

    // Update tokens
    const updatedTokens: TikTokTokens = {
      access_token: refreshData.access_token,
      refresh_token: refreshData.refresh_token || tokens.refresh_token,
      open_id: refreshData.open_id || tokens.open_id,
      scope: refreshData.scope || tokens.scope,
      expires_at: Date.now() + refreshData.expires_in * 1000,
      refresh_expires_at: refreshData.refresh_expires_in
        ? Date.now() + refreshData.refresh_expires_in * 1000
        : tokens.refresh_expires_at,
      updated_at: new Date().toISOString(),
    };

    await saveTokens(updatedTokens);

    return NextResponse.json({
      success: true,
      expires_at: updatedTokens.expires_at,
      message: "Token refreshed successfully",
    });
  } catch (err) {
    console.error("Token refresh error:", err);
    return NextResponse.json(
      { error: "Internal server error during token refresh" },
      { status: 500 }
    );
  }
}
