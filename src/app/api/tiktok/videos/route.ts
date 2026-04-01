import { NextResponse } from "next/server";
import {
  loadTokens,
  isTokenExpired,
  saveTokens,
  TIKTOK_CLIENT_KEY,
  TIKTOK_CLIENT_SECRET,
  type TikTokTokens,
} from "@/lib/tiktok-tokens";

// Auto-refresh access token if needed
async function getValidAccessToken(): Promise<string | null> {
  const tokens = await loadTokens();
  if (!tokens) return null;

  if (!isTokenExpired(tokens)) {
    return tokens.access_token;
  }

  // Try to refresh
  try {
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
      console.error("Auto-refresh failed:", refreshData.error_description);
      return null;
    }

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
    return updatedTokens.access_token;
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const accessToken = await getValidAccessToken();

    if (!accessToken) {
      return NextResponse.json(
        { error: "Not authenticated. Please connect TikTok first." },
        { status: 401 }
      );
    }

    // Fetch user's video list using v2 API
    const fields = [
      "id",
      "create_time",
      "cover_image_url",
      "share_url",
      "video_description",
      "duration",
      "title",
      "like_count",
      "comment_count",
      "share_count",
      "view_count",
    ].join(",");

    const allVideos: any[] = [];
    let cursor: number | null = null;
    let hasMore = true;

    // Paginate through all videos (max 20 per page)
    while (hasMore) {
      const body: any = { max_count: 20 };
      if (cursor) body.cursor = cursor;

      const response = await fetch(
        `https://open.tiktokapis.com/v2/video/list/?fields=${fields}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      if (data.error && data.error.code !== "ok") {
        console.error("TikTok video list error:", data.error);
        return NextResponse.json(
          {
            error: data.error.message || "Failed to fetch videos",
            tiktok_error: data.error,
          },
          { status: 400 }
        );
      }

      if (data.data?.videos) {
        allVideos.push(...data.data.videos);
      }

      hasMore = data.data?.has_more === true;
      cursor = data.data?.cursor || null;

      // Safety valve — max 200 videos
      if (allVideos.length >= 200) break;
    }

    return NextResponse.json({
      success: true,
      video_count: allVideos.length,
      videos: allVideos,
      fetched_at: new Date().toISOString(),
    });
  } catch (err) {
    console.error("TikTok videos fetch error:", err);
    return NextResponse.json(
      { error: "Internal server error while fetching videos" },
      { status: 500 }
    );
  }
}
