import { promises as fs } from "fs";
import path from "path";

// Token storage file path — used for local dev, ephemeral on Vercel
const TOKEN_FILE = path.join(process.cwd(), ".tiktok-tokens.json");

export interface TikTokTokens {
  access_token: string;
  refresh_token: string;
  open_id: string;
  scope: string;
  expires_at: number; // Unix timestamp in ms
  refresh_expires_at: number; // Unix timestamp in ms
  updated_at: string; // ISO date string
}

export async function saveTokens(tokens: TikTokTokens): Promise<void> {
  try {
    await fs.writeFile(TOKEN_FILE, JSON.stringify(tokens, null, 2), "utf-8");
  } catch {
    console.log("Could not write token file (expected on Vercel)");
  }
}

export async function loadTokens(): Promise<TikTokTokens | null> {
  // First try environment variables (persistent on Vercel)
  if (process.env.TIKTOK_ACCESS_TOKEN) {
    return {
      access_token: process.env.TIKTOK_ACCESS_TOKEN,
      refresh_token: process.env.TIKTOK_REFRESH_TOKEN || "",
      open_id: process.env.TIKTOK_OPEN_ID || "",
      scope: process.env.TIKTOK_SCOPE || "",
      expires_at: parseInt(process.env.TIKTOK_EXPIRES_AT || "0"),
      refresh_expires_at: parseInt(process.env.TIKTOK_REFRESH_EXPIRES_AT || "0"),
      updated_at: process.env.TIKTOK_UPDATED_AT || "",
    };
  }

  // Fall back to file (works in local dev)
  try {
    const data = await fs.readFile(TOKEN_FILE, "utf-8");
    return JSON.parse(data) as TikTokTokens;
  } catch {
    return null;
  }
}

export function isTokenExpired(tokens: TikTokTokens): boolean {
  // Consider expired if less than 5 minutes remaining
  return Date.now() > tokens.expires_at - 5 * 60 * 1000;
}

export function isRefreshTokenExpired(tokens: TikTokTokens): boolean {
  // Consider expired if less than 1 day remaining
  return Date.now() > tokens.refresh_expires_at - 24 * 60 * 60 * 1000;
}

// TikTok API credentials
export const TIKTOK_CLIENT_KEY = process.env.TIKTOK_CLIENT_KEY || "7623599459196207105";
export const TIKTOK_CLIENT_SECRET = process.env.TIKTOK_CLIENT_SECRET || "b0aff60d91a8ec3083877094a3d9e7e5d6d47183";
// This must match what's registered in TikTok Developer Portal
export const TIKTOK_REDIRECT_URI =
  process.env.TIKTOK_REDIRECT_URI || "https://masterkeyapp-5ho6.vercel.app/auth/tiktok/callback";
// deployed 2026-04-01T06:20:35Z
