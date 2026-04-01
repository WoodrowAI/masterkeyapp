import { promises as fs } from "fs";
import path from "path";

// Token storage file path — stored in project root (outside src/ for safety)
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
  await fs.writeFile(TOKEN_FILE, JSON.stringify(tokens, null, 2), "utf-8");
}

export async function loadTokens(): Promise<TikTokTokens | null> {
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
export const TIKTOK_CLIENT_KEY = "7623599459196207105";
export const TIKTOK_CLIENT_SECRET = "b0aff60d91a8ec3083877094a3d9e7e5d6d47183";
// This must match what's registered in TikTok Developer Portal
// Update to Vercel URL once redirect URI is updated in TikTok portal
export const TIKTOK_REDIRECT_URI =
  process.env.TIKTOK_REDIRECT_URI || "https://masterkeyapp-5ho6.vercel.app/auth/tiktok/callback";
