import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// TikTok Business API tokens are stored separately from Content API tokens
const BUSINESS_TOKEN_FILE = path.join(process.cwd(), ".tiktok-business-tokens.json");

interface BusinessTokens {
  access_token: string;
  advertiser_ids: string[];
  updated_at: string;
}

async function loadBusinessTokens(): Promise<BusinessTokens | null> {
  try {
    const data = await fs.readFile(BUSINESS_TOKEN_FILE, "utf-8");
    return JSON.parse(data) as BusinessTokens;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const startDate = searchParams.get("start_date") || getDefaultStartDate();
  const endDate = searchParams.get("end_date") || getDefaultEndDate();
  const dataLevel = searchParams.get("data_level") || "AUCTION_CAMPAIGN";

  try {
    const tokens = await loadBusinessTokens();

    if (!tokens) {
      return NextResponse.json(
        {
          error: "TikTok Business API not connected. Please authorize via the advertiser flow.",
          setup_required: true,
        },
        { status: 401 }
      );
    }

    const advertiserId = tokens.advertiser_ids?.[0];
    if (!advertiserId) {
      return NextResponse.json(
        { error: "No advertiser ID found in tokens." },
        { status: 400 }
      );
    }

    // Build report request
    const dimensions = dataLevel === "AUCTION_CAMPAIGN"
      ? '["campaign_id","stat_time_day"]'
      : dataLevel === "AUCTION_ADGROUP"
        ? '["adgroup_id","stat_time_day"]'
        : '["ad_id","stat_time_day"]';

    const metrics = JSON.stringify([
      "campaign_name",
      "spend",
      "impressions",
      "clicks",
      "ctr",
      "cpc",
      "cpm",
      "reach",
      "conversion",
      "conversion_rate",
      "cost_per_conversion",
      "video_play_actions",
      "video_watched_2s",
      "video_watched_6s",
      "average_video_play",
      "average_video_play_per_user",
      "engaged_view",
      "engaged_view_15s",
      "video_views_p25",
      "video_views_p50",
      "video_views_p75",
      "video_views_p100",
    ]);

    const params = new URLSearchParams({
      advertiser_id: advertiserId,
      report_type: "BASIC",
      data_level: dataLevel,
      dimensions: dimensions,
      metrics: metrics,
      start_date: startDate,
      end_date: endDate,
      page_size: "1000",
    });

    const response = await fetch(
      `https://business-api.tiktok.com/open_api/v1.3/report/integrated/get/?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Access-Token": tokens.access_token,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (data.code !== 0) {
      return NextResponse.json(
        {
          error: data.message || "Failed to fetch ads report",
          tiktok_error: data,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      report: data.data?.list || [],
      page_info: data.data?.page_info,
      start_date: startDate,
      end_date: endDate,
      data_level: dataLevel,
      fetched_at: new Date().toISOString(),
    });
  } catch (err) {
    console.error("TikTok ads report error:", err);
    return NextResponse.json(
      { error: "Internal server error while fetching ads report" },
      { status: 500 }
    );
  }
}

function getDefaultStartDate(): string {
  const d = new Date();
  d.setDate(d.getDate() - 30);
  return d.toISOString().split("T")[0];
}

function getDefaultEndDate(): string {
  return new Date().toISOString().split("T")[0];
}
