"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { KPICard } from "@/components/kpi-card";
import { Megaphone, Info } from "lucide-react";

type PlatformFilter = "all" | "meta" | "tiktok";

export default function AdsPage() {
  const [platformFilter, setPlatformFilter] = useState<PlatformFilter>("all");

  return (
    <div className="space-y-6" data-testid="ads-page">
      {/* Platform Toggle */}
      <div className="flex flex-wrap gap-2">
        {(["all", "meta", "tiktok"] as const).map((opt) => (
          <button
            key={opt}
            onClick={() => setPlatformFilter(opt)}
            className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
              platformFilter === opt
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-foreground/30"
            }`}
          >
            {opt === "all" ? "All Platforms" : opt === "meta" ? "Meta Ads" : "TikTok Ads"}
          </button>
        ))}
      </div>

      {/* KPI Row — all zeros */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KPICard title="Total Spend" value="$0.00" testId="kpi-ad-spend" />
        <KPICard title="Impressions" value="0" testId="kpi-ad-impressions" />
        <KPICard title="Clicks" value="0" testId="kpi-ad-clicks" />
        <KPICard title="Conversions" value="0" testId="kpi-ad-conversions" />
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KPICard title="CTR" value="0" suffix="%" testId="kpi-ad-ctr" />
        <KPICard title="CPC" value="$0.00" testId="kpi-ad-cpc" />
        <KPICard title="CPM" value="$0.00" testId="kpi-ad-cpm" />
        <KPICard title="ROAS" value="0x" testId="kpi-ad-roas" />
      </div>

      {/* Empty State */}
      <Card className="flex flex-col items-center justify-center p-12 border border-border text-center" data-testid="ads-empty-state">
        <div className="rounded-full bg-muted p-4 mb-4">
          <Megaphone className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No Active Ad Campaigns</h3>
        <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
          No active ad campaigns found. When you create campaigns on Meta or TikTok,
          their performance data will appear here.
        </p>
        <div className="flex items-start gap-2 mt-6 rounded-md border border-border bg-muted/20 p-3 text-xs text-muted-foreground max-w-md">
          <Info className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
          <span>
            Connect your Meta Business Manager or TikTok Ads Manager in{" "}
            <a href="/settings" className="text-foreground underline underline-offset-2 hover:no-underline">
              Settings
            </a>{" "}
            to start syncing campaign data automatically.
          </span>
        </div>
      </Card>
    </div>
  );
}
