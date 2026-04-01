import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const BUSINESS_TOKEN_FILE = path.join(process.cwd(), ".tiktok-business-tokens.json");

export async function GET() {
  try {
    const data = await fs.readFile(BUSINESS_TOKEN_FILE, "utf-8");
    const tokens = JSON.parse(data);

    return NextResponse.json({
      connected: true,
      advertiser_ids: tokens.advertiser_ids || [],
      scope: tokens.scope || [],
      updated_at: tokens.updated_at,
    });
  } catch {
    return NextResponse.json({
      connected: false,
      message: "No TikTok Business API tokens found",
    });
  }
}
