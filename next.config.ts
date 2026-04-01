import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Rewrite /auth/tiktok/callback to the API route handler
  // This allows the TikTok redirect URI to stay as /auth/tiktok/callback
  async rewrites() {
    return [
      {
        source: "/auth/tiktok/callback",
        destination: "/api/auth/tiktok/callback",
      },
    ];
  },
};

export default nextConfig;
