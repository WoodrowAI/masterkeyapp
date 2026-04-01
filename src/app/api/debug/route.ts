import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    has_tiktok_access_token: !!process.env.TIKTOK_ACCESS_TOKEN,
    has_tiktok_business_token: !!process.env.TIKTOK_BUSINESS_ACCESS_TOKEN,
    env_keys_with_tiktok: Object.keys(process.env).filter(k => k.includes("TIKTOK")),
  });
}
