"use client";

import { useMemo, useState } from "react";
import { useMounted } from "@/hooks/use-mounted";
import { Card } from "@/components/ui/card";
import { KPICard } from "@/components/kpi-card";
import { Badge } from "@/components/ui/badge";
import { PlatformIcon } from "@/components/platform-badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  leadMagnetMappings,
  leadMagnetNames,
  type LeadMagnetName,
  type LeadMagnetMapping,
} from "@/lib/mock-data";
import {
  Magnet,
  ArrowRight,
  Info,
  ShieldCheck,
  ShieldAlert,
  ShieldQuestion,
} from "lucide-react";
import type { PlatformKey } from "@/lib/platforms";

type FilterKey = "All" | LeadMagnetName;

const LEAD_MAGNET_COLORS: Record<string, string> = {
  "Buyer Guide": "var(--color-chart-1)",
  "Seller Guide": "var(--color-chart-2)",
  "Instant Valuation": "var(--color-chart-3)",
  "Neighborhood Scorecard": "var(--color-chart-4)",
  "Property Management Guide": "var(--color-chart-5)",
};

const PLATFORM_BAR_COLORS: Record<string, string> = {
  youtube: "var(--color-chart-1)",
  instagram: "var(--color-chart-2)",
  tiktok: "var(--color-chart-4)",
};

function ConfidenceBadge({ level }: { level: "high" | "medium" | "low" }) {
  if (level === "high")
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-500">
        <ShieldCheck className="h-3 w-3" /> High
      </span>
    );
  if (level === "medium")
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-500">
        <ShieldAlert className="h-3 w-3" /> Medium
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-zinc-400">
      <ShieldQuestion className="h-3 w-3" /> Low
    </span>
  );
}

export default function LeadMagnets() {
  const mounted = useMounted();
  const [filter, setFilter] = useState<FilterKey>("All");

  const filtered = useMemo(() => {
    if (filter === "All") return leadMagnetMappings;
    return leadMagnetMappings.filter((m) => m.leadMagnet === filter);
  }, [filter]);

  // Deduplicate videos for the selected lead magnet(s) — same videoId+platform should only count once
  const deduped = useMemo(() => {
    const seen = new Set<string>();
    const result: LeadMagnetMapping[] = [];
    for (const m of filtered) {
      const key = `${m.videoId}-${m.platform}`;
      if (!seen.has(key)) {
        seen.add(key);
        result.push(m);
      }
    }
    return result;
  }, [filtered]);

  // KPIs
  const totalViews = deduped.reduce((s, m) => s + m.views, 0);
  const totalClicks = deduped.reduce((s, m) => s + m.estimatedClicks, 0);
  const totalDownloads = deduped.reduce((s, m) => s + m.estimatedDownloads, 0);
  const conversionRate = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(2) : "0";

  // Platform comparison data for filtered set
  const platformComparison = useMemo(() => {
    const map: Record<string, { youtube: number; instagram: number; tiktok: number }> = {};
    for (const m of filtered) {
      if (!map[m.leadMagnet]) map[m.leadMagnet] = { youtube: 0, instagram: 0, tiktok: 0 };
      if (m.platform in map[m.leadMagnet]) {
        map[m.leadMagnet][m.platform as "youtube" | "instagram" | "tiktok"] += m.views;
      }
    }
    if (filter !== "All") {
      // Single lead magnet: show platform breakdown
      const d = map[filter] ?? { youtube: 0, instagram: 0, tiktok: 0 };
      return [
        { name: "YouTube", views: d.youtube, fill: PLATFORM_BAR_COLORS.youtube },
        { name: "Instagram", views: d.instagram, fill: PLATFORM_BAR_COLORS.instagram },
        { name: "TikTok", views: d.tiktok, fill: PLATFORM_BAR_COLORS.tiktok },
      ];
    }
    return [];
  }, [filtered, filter]);

  // Lead magnet comparison (for "All" view)
  const lmComparison = useMemo(() => {
    if (filter !== "All") return [];
    return leadMagnetNames.map((name) => {
      const items = leadMagnetMappings.filter((m) => m.leadMagnet === name);
      // Deduplicate by videoId+platform
      const seen = new Set<string>();
      let views = 0;
      let clicks = 0;
      for (const m of items) {
        const key = `${m.videoId}-${m.platform}`;
        if (!seen.has(key)) {
          seen.add(key);
          views += m.views;
          clicks += m.estimatedClicks;
        }
      }
      return { name, views, clicks, videos: seen.size };
    }).sort((a, b) => b.views - a.views);
  }, [filter]);

  // Video performance table sorted by views
  const videoTable = useMemo(() => {
    return [...deduped].sort((a, b) => b.views - a.views);
  }, [deduped]);

  // Recommendations
  const recommendations = useMemo(() => {
    const recs: { title: string; body: string }[] = [];

    // Compute per-lead-magnet stats
    const lmStats = leadMagnetNames.map((name) => {
      const items = leadMagnetMappings.filter((m) => m.leadMagnet === name);
      const seen = new Set<string>();
      let views = 0;
      for (const m of items) {
        const key = `${m.videoId}-${m.platform}`;
        if (!seen.has(key)) { seen.add(key); views += m.views; }
      }
      return { name, views, videos: seen.size, perVideo: seen.size > 0 ? Math.round(views / seen.size) : 0 };
    });

    const scorecard = lmStats.find((s) => s.name === "Neighborhood Scorecard");
    const valuation = lmStats.find((s) => s.name === "Instant Valuation");
    if (scorecard && valuation && valuation.perVideo > 0 && scorecard.perVideo > 0) {
      const contentRatio = Math.round(scorecard.videos / Math.max(valuation.videos, 1));
      const perVideoRatio = (valuation.perVideo / scorecard.perVideo).toFixed(1);
      recs.push({
        title: "Instant Valuation Punches Above Its Weight",
        body: `Neighborhood Scorecard has ${contentRatio}x more content pieces, but Instant Valuation averages ${perVideoRatio}x more views per video (${valuation.perVideo.toLocaleString()} vs ${scorecard.perVideo.toLocaleString()}). Consider creating more Home Value Tool content.`,
      });
    }

    const propMgmt = lmStats.find((s) => s.name === "Property Management Guide");
    if (propMgmt && propMgmt.videos <= 1) {
      recs.push({
        title: "Property Management Guide Needs Content",
        body: "Only 1 video promotes the Property Management Guide (26 views). The California Landlord Laws topic resonated — create TikTok and Instagram versions to expand reach.",
      });
    }

    recs.push({
      title: "TikTok Drives Volume, YouTube Drives Clicks",
      body: "TikTok videos generate the most raw views (75% of Listings = 4,487 views) but YouTube's 3.5% CTR vs TikTok's 1.5% means YouTube delivers more clicks per view. Prioritize YouTube for conversion-focused lead magnets.",
    });

    recs.push({
      title: "Dual-CTA Strategy Is Working",
      body: "Videos with both Buyer Guide and Seller Guide CTAs (\"comment BUY GUIDE or SELL GUIDE\") are your top performers. Continue this approach for market update content.",
    });

    return recs;
  }, []);

  const filterOptions: FilterKey[] = ["All", ...leadMagnetNames];

  return (
    <div className="space-y-6" data-testid="leads-page">
      {/* Lead Magnet Selector */}
      <div className="flex flex-wrap gap-2">
        {filterOptions.map((opt) => (
          <button
            key={opt}
            onClick={() => setFilter(opt)}
            className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === opt
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-foreground/30"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KPICard
          title="Video Views (Promoting)"
          value={totalViews.toLocaleString()}
          testId="kpi-lead-views"
        />
        <KPICard
          title="Est. Landing Page Clicks"
          value={totalClicks.toLocaleString()}
          testId="kpi-landing-clicks"
        />
        <KPICard
          title="Est. Downloads / Form Starts"
          value={totalDownloads.toLocaleString()}
          testId="kpi-downloads"
        />
        <KPICard
          title="View → Click Rate"
          value={conversionRate}
          suffix="%"
          testId="kpi-conversion-rate"
        />
      </div>

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Platform Comparison (single lead magnet) OR Lead Magnet Comparison (all) */}
        {filter !== "All" ? (
          <Card className="p-4 border border-border" data-testid="platform-comparison">
            <h3 className="text-sm font-semibold mb-1">Platform Comparison</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Views promoting <strong>{filter}</strong> by platform
            </p>
            <div className="h-[220px] w-full">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={platformComparison} margin={{ left: 0, right: 16, top: 4, bottom: 4 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={true} vertical={false} />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                      axisLine={false}
                      tickLine={false}
                      width={50}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--color-card)",
                        border: "1px solid var(--color-border)",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                    <Bar dataKey="views" radius={[4, 4, 0, 0]} barSize={40} name="Views">
                      {platformComparison.map((entry) => (
                        <Cell key={entry.name} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </Card>
        ) : (
          <Card className="p-4 border border-border" data-testid="lm-comparison">
            <h3 className="text-sm font-semibold mb-1">Lead Magnet Comparison</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Total views and estimated clicks across all lead magnets
            </p>
            <div className="h-[260px] w-full">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={lmComparison}
                    layout="vertical"
                    margin={{ left: 10, right: 30, top: 4, bottom: 4 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                      axisLine={false}
                      tickLine={false}
                      width={140}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--color-card)",
                        border: "1px solid var(--color-border)",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: "11px" }}
                    />
                    <Bar dataKey="views" name="Views" radius={[0, 4, 4, 0]} barSize={14} fill="var(--color-chart-1)" />
                    <Bar dataKey="clicks" name="Est. Clicks" radius={[0, 4, 4, 0]} barSize={14} fill="var(--color-chart-3)" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </Card>
        )}

        {/* Time-Correlation Attribution */}
        <Card className="p-4 border border-border" data-testid="attribution-card">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-semibold">Time-Correlation Attribution</h3>
            <Badge variant="outline" className="text-[10px] h-5 px-2 gap-1">
              <Info className="h-3 w-3" /> Estimated
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Estimated downloads attributed by publish date proximity
          </p>
          <div className="overflow-x-auto max-h-[240px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Video</TableHead>
                  <TableHead className="w-20">Date</TableHead>
                  <TableHead className="text-right w-16">Views</TableHead>
                  <TableHead className="text-right w-20">Est. DLs</TableHead>
                  <TableHead className="w-16">Conf.</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {videoTable.slice(0, 10).map((m) => (
                  <TableRow key={`${m.videoId}-${m.platform}-attr`}>
                    <TableCell className="text-xs font-medium max-w-[160px] truncate">
                      <div className="flex items-center gap-1.5">
                        <PlatformIcon platform={m.platform} className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">{m.title}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground tabular-nums">
                      {m.publishDate.slice(5)}
                    </TableCell>
                    <TableCell className="text-right text-xs tabular-nums" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                      {m.views.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right text-xs tabular-nums font-medium" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                      {m.estimatedDownloads}
                    </TableCell>
                    <TableCell>
                      <ConfidenceBadge level={m.confidence} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>

      {/* Video Performance Table */}
      <Card className="p-4 border border-border" data-testid="video-performance">
        <h3 className="text-sm font-semibold mb-3">
          Video Performance {filter !== "All" && <span className="text-muted-foreground font-normal">— {filter}</span>}
        </h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="w-20">Platform</TableHead>
                <TableHead className="w-24">Date</TableHead>
                <TableHead className="text-right w-20">Views</TableHead>
                <TableHead className="text-right w-24">Eng. Rate</TableHead>
                <TableHead className="text-right w-24">Est. Clicks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {videoTable.length > 0 ? (
                videoTable.map((m) => {
                  const engRate =
                    m.views > 0
                      ? (((m.likes + m.comments + m.shares) / m.views) * 100).toFixed(2)
                      : "0.00";
                  return (
                    <TableRow key={`${m.videoId}-${m.platform}`}>
                      <TableCell className="font-medium text-sm max-w-[260px] truncate">
                        {m.title}
                      </TableCell>
                      <TableCell>
                        <PlatformIcon platform={m.platform} />
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground tabular-nums">
                        {m.publishDate}
                      </TableCell>
                      <TableCell
                        className="text-right tabular-nums"
                        style={{ fontVariantNumeric: "tabular-nums lining-nums" }}
                      >
                        {m.views.toLocaleString()}
                      </TableCell>
                      <TableCell
                        className="text-right tabular-nums"
                        style={{ fontVariantNumeric: "tabular-nums lining-nums" }}
                      >
                        {engRate}%
                      </TableCell>
                      <TableCell
                        className="text-right tabular-nums font-medium"
                        style={{ fontVariantNumeric: "tabular-nums lining-nums" }}
                      >
                        {m.estimatedClicks.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground text-sm py-6">
                    No videos promoting this lead magnet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Recommendations */}
      <Card className="p-4 border border-border" data-testid="lead-recommendations">
        <div className="flex items-center gap-2 mb-3">
          <Magnet className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold">AI Insights</h3>
        </div>
        <div className="space-y-3">
          {recommendations.map((rec) => (
            <div
              key={rec.title}
              className="flex items-start gap-3 rounded-md border border-border p-3"
            >
              <ArrowRight className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
              <div>
                <div className="text-sm font-medium">{rec.title}</div>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  {rec.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
