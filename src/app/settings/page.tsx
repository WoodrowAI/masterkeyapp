"use client";

import { useState, useEffect } from "react";
import { SiTiktok, SiInstagram, SiYoutube, SiFacebook } from "react-icons/si";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, ExternalLink, RefreshCw, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { useMounted } from "@/hooks/use-mounted";

const TIKTOK_CLIENT_KEY = "7623599459196207105";
const VERCEL_CALLBACK = encodeURIComponent("https://masterkeyapp-5ho6.vercel.app/auth/tiktok/callback");

// Content API — Login Kit (organic video data, user insights)
const TIKTOK_CONTENT_AUTH_URL = `https://www.tiktok.com/v2/auth/authorize/?client_key=${TIKTOK_CLIENT_KEY}&scope=user.info.basic,user.info.username,user.info.stats,user.info.profile,user.account.type,user.insights,video.list,video.insights,comment.list,comment.list.manage,video.publish,video.upload,biz.spark.auth,discovery.search.words,biz.brand.insights&response_type=code&redirect_uri=${VERCEL_CALLBACK}&state=masterkey_content`;

// Business API — Advertiser (ads performance, spend, reporting)
const TIKTOK_ADS_AUTH_URL = `https://business-api.tiktok.com/portal/auth?app_id=${TIKTOK_CLIENT_KEY}&state=masterkey_business&redirect_uri=${VERCEL_CALLBACK}`;

interface TikTokStatus {
  connected: boolean;
  access_token_valid?: boolean;
  refresh_token_valid?: boolean;
  scope?: string;
  expires_at?: string;
  needs_refresh?: boolean;
  needs_reauth?: boolean;
  message?: string;
}

interface TikTokAdsStatus {
  connected: boolean;
  advertiser_ids?: string[];
  message?: string;
}

interface Connection {
  name: string;
  icon: typeof SiTiktok;
  color: string;
  status: "connected" | "disconnected" | "expired" | "loading";
  description: string;
  authUrl?: string;
  onRefresh?: () => void;
}

export default function SettingsPage() {
  const mounted = useMounted();
  const [tiktokStatus, setTiktokStatus] = useState<TikTokStatus | null>(null);
  const [tiktokAdsStatus, setTiktokAdsStatus] = useState<TikTokAdsStatus | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (mounted) {
      checkTikTokStatus();
      checkTikTokAdsStatus();
    }
  }, [mounted]);

  async function checkTikTokStatus() {
    try {
      const res = await fetch("/api/auth/tiktok/status");
      const data = await res.json();
      setTiktokStatus(data);
    } catch {
      setTiktokStatus({ connected: false, message: "Could not check status" });
    }
  }

  async function checkTikTokAdsStatus() {
    try {
      const res = await fetch("/api/auth/tiktok/ads-status");
      const data = await res.json();
      setTiktokAdsStatus(data);
    } catch {
      setTiktokAdsStatus({ connected: false, message: "Could not check status" });
    }
  }

  async function refreshTikTokToken() {
    setRefreshing(true);
    try {
      const res = await fetch("/api/auth/tiktok/refresh", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        await checkTikTokStatus();
      }
    } catch {
      // ignore
    }
    setRefreshing(false);
  }

  function getTikTokConnectionStatus(): Connection["status"] {
    if (!tiktokStatus) return "loading";
    if (!tiktokStatus.connected) return "disconnected";
    if (tiktokStatus.needs_reauth) return "expired";
    if (tiktokStatus.needs_refresh) return "expired";
    return "connected";
  }

  function getTikTokAdsStatus(): Connection["status"] {
    if (!tiktokAdsStatus) return "loading";
    return tiktokAdsStatus.connected ? "connected" : "disconnected";
  }

  const connections: Connection[] = [
    {
      name: "TikTok Content",
      icon: SiTiktok,
      color: "#000000",
      status: getTikTokConnectionStatus(),
      description: tiktokStatus?.connected
        ? `Organic video data · Expires: ${tiktokStatus.expires_at ? new Date(tiktokStatus.expires_at).toLocaleDateString() : "N/A"}`
        : "Connect to pull organic video views, likes, comments, and insights",
      authUrl: TIKTOK_CONTENT_AUTH_URL,
      onRefresh: tiktokStatus?.needs_refresh ? refreshTikTokToken : undefined,
    },
    {
      name: "TikTok Ads",
      icon: SiTiktok,
      color: "#000000",
      status: getTikTokAdsStatus(),
      description: tiktokAdsStatus?.connected
        ? `Advertiser IDs: ${tiktokAdsStatus.advertiser_ids?.join(", ") || "N/A"}`
        : "Connect your ad account for spend, CPM, CPC, conversions, and ROAS",
      authUrl: TIKTOK_ADS_AUTH_URL,
    },
    {
      name: "Instagram",
      icon: SiInstagram,
      color: "#E4405F",
      status: "connected",
      description: "@usemasterkey · 19 posts · 46 followers",
    },
    {
      name: "YouTube",
      icon: SiYoutube,
      color: "#FF0000",
      status: "connected",
      description: "Connected via YouTube Analytics API",
    },
    {
      name: "Facebook",
      icon: SiFacebook,
      color: "#1877F2",
      status: "connected",
      description: "Connected via Facebook Pages API",
    },
  ];

  const statusBadge = (status: Connection["status"]) => {
    switch (status) {
      case "connected":
        return (
          <Badge variant="outline" className="gap-1 border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs">
            <CheckCircle2 className="h-3 w-3" /> Connected
          </Badge>
        );
      case "disconnected":
        return (
          <Badge variant="outline" className="gap-1 border-zinc-500/30 bg-zinc-500/10 text-zinc-400 text-xs">
            <XCircle className="h-3 w-3" /> Not Connected
          </Badge>
        );
      case "expired":
        return (
          <Badge variant="outline" className="gap-1 border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs">
            <AlertCircle className="h-3 w-3" /> Token Expired
          </Badge>
        );
      case "loading":
        return (
          <Badge variant="outline" className="gap-1 border-zinc-500/30 bg-zinc-500/10 text-zinc-400 text-xs">
            Checking...
          </Badge>
        );
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center gap-3">
        <Settings className="h-5 w-5 text-muted-foreground" />
        <div>
          <h1 className="text-lg font-semibold">Settings</h1>
          <p className="text-sm text-muted-foreground">Manage your platform connections and API integrations</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Platform Connections</CardTitle>
          <CardDescription>
            Connect your social media accounts to pull analytics data into the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {connections.map((conn) => (
            <div
              key={conn.name}
              className="flex items-center justify-between rounded-lg border border-border/50 bg-card p-4"
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${conn.color}15` }}
                >
                  <conn.icon className="h-5 w-5" style={{ color: conn.color }} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{conn.name}</span>
                    {statusBadge(conn.status)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{conn.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {conn.onRefresh && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={conn.onRefresh}
                    disabled={refreshing}
                    className="gap-1.5"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
                    Refresh
                  </Button>
                )}
                {conn.status === "disconnected" && conn.authUrl && (
                  <Button
                    size="sm"
                    className="gap-1.5"
                    onClick={() => window.open(conn.authUrl, "_self")}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Connect
                  </Button>
                )}
                {conn.status === "expired" && conn.authUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5"
                    onClick={() => window.open(conn.authUrl, "_self")}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Re-authorize
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">API Configuration</CardTitle>
          <CardDescription>
            Environment variables and API credentials
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between rounded-lg border border-border/50 p-3">
              <span className="text-muted-foreground">TikTok Redirect URI</span>
              <code className="text-xs bg-muted px-2 py-0.5 rounded">
                masterkeyapp-5ho6.vercel.app/auth/tiktok/callback
              </code>
            </div>
            <div className="flex justify-between rounded-lg border border-border/50 p-3">
              <span className="text-muted-foreground">PostHog Project ID</span>
              <code className="text-xs bg-muted px-2 py-0.5 rounded">234009</code>
            </div>
            <div className="flex justify-between rounded-lg border border-border/50 p-3">
              <span className="text-muted-foreground">Instagram Account</span>
              <code className="text-xs bg-muted px-2 py-0.5 rounded">@usemasterkey (ID: 26723719590626366)</code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
