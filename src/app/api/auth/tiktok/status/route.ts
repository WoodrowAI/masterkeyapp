import { NextResponse } from "next/server";
import {
  loadTokens,
  isTokenExpired,
  isRefreshTokenExpired,
} from "@/lib/tiktok-tokens";

export async function GET() {
  try {
    const tokens = await loadTokens();

    if (!tokens) {
      return NextResponse.json({
        connected: false,
        message: "No TikTok tokens found",
      });
    }

    const accessExpired = isTokenExpired(tokens);
    const refreshExpired = isRefreshTokenExpired(tokens);

    return NextResponse.json({
      connected: true,
      access_token_valid: !accessExpired,
      refresh_token_valid: !refreshExpired,
      scope: tokens.scope,
      open_id: tokens.open_id,
      expires_at: new Date(tokens.expires_at).toISOString(),
      refresh_expires_at: new Date(tokens.refresh_expires_at).toISOString(),
      updated_at: tokens.updated_at,
      needs_refresh: accessExpired && !refreshExpired,
      needs_reauth: refreshExpired,
    });
  } catch (err) {
    console.error("Token status error:", err);
    return NextResponse.json(
      { error: "Failed to check token status" },
      { status: 500 }
    );
  }
}
