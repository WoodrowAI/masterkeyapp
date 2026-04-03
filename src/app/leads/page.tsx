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
  ghlPipelines,
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
  AlertTriangle,
} from "lucide-react";
import type { PlatformKey } from "@/lib/platforms";

// Real GHL lead counts by lead magnet (from GoHighLevel CRM tags)
// Data refreshed: April 3, 2026 — all lead magnet pipeline stages are empty
const GHL_REAL_LEADS: Record<LeadMagnetName, number> = {
  "Buyer Guide": 0,
  "Seller Guide": 0,
  "Instant Valuation": 0,
  "Neighborhood Scorecard": 0,
  "Property Management Guide": 0,
  "MarketPulse": 0,
};

type FilterKey = "All" | LeadMagnetName;

const LEAD_MAGNET_COLORS: Record<string, string> = {
  "Buyer Guide": "var(--color-chart-1)",
  "Seller Guide": "var(--color-chart-2)",
  "Instant Valuation": "var(--color-chart-3)",
  "Neighborhood Scorecard": "var(--color-chart-4)",
  "Property Management Guide": "var(--color-chart-5)",
  "MarketPulse": "var(--color-chart-2)",
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

  // KPIs — use real GHL lead counts and real PostHog organic social landing page visits
  const totalViews = deduped.reduce((s, m) => s + m.views, 0);
  // Real organic social landing page visits from PostHog (filtered to social UTM + Linktree)
  const ORGANIC_SOCIAL_VISITS: Record<LeadMagnetName, number> = {
    "Neighborhood Scorecard": 70,
    "Buyer Guide": 8,
    "Seller Guide": 4,
    "Instant Valuation": 0,
    "Property Management Guide": 0,
    "MarketPulse": 0,
  };
  const totalClicks = filter === "All"
    ? Object.values(ORGANIC_SOCIAL_VISITS).reduce((s, n) => s + n, 0)
    : ORGANIC_SOCIAL_VISITS[filter] ?? 0;
  const realLeads = filter === "All"
    ? Object.values(GHL_REAL_LEADS).reduce((s, n) => s + n, 0)
    : GHL_REAL_LEADS[filter] ?? 0;
  const conversionRate = totalClicks > 0 ? ((realLeads / totalClicks) * 100).toFixed(2) : "0";

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
      for (const m of items) {
        const key = `${m.videoId}-${m.platform}`;
        if (!seen.has(key)) {
          seen.add(key);
          views += m.views;
        }
      }
      return { name, views, leads: GHL_REAL_LEADS[name] ?? 0, videos: seen.size };
    }).sort((a, b) => b.views - a.views);
  }, [filter]);

  // Video performance table sorted by views
  const videoTable = useMemo(() => {
    return [...deduped].sort((a, b) => b.views - a.views);
  }, [deduped]);

  // Recommendations — based on real data (all GHL lead magnet pipelines currently empty)
  const recommendations = useMemo(() => {
    const recs: { title: string; body: string }[] = [];

    recs.push({
      title: "All Lead Magnet Pipelines Are Empty — Focus on Capture",
      body: "0 leads across all 6 lead magnet pipelines in GHL. The 43 social media contacts in GHL exist but none have lead magnet tags. Ensure GHL automations are tagging contacts when they submit lead magnet forms.",
    });

    recs.push({
      title: "YouTube Drives 83% of Organic Social Visits",
      body: "68 of 82 organic social landing page visits came from YouTube UTM links (all to Neighborhood Scorecard). Instagram contributed 10 visits, Linktree 4. TikTok generates 8,697 views but 0 attributed visits — set up UTM tracking.",
    });

    recs.push({
      title: "Neighborhood Scorecard Dominates Organic Traffic",
      body: "70 of 82 organic social visits (85%) go to the Neighborhood Scorecard landing page. The Wildwood content series is clearly driving traffic. Ensure the scorecard form connects to GHL and tags contacts properly.",
    });

    recs.push({
      title: "Property Management Guide Has Zero Social Traffic",
      body: "Only 1 video (81 views) promoting PM Guide and 0 organic social visits. The California Landlord Laws topic has engagement potential. Add social UTM links and create TikTok and Instagram versions.",
    });

    recs.push({
      title: "MarketPulse and Home Valuation Need Social UTM Links",
      body: "Both MarketPulse and Instant Valuation have 0 organic social landing page visits despite video content promoting them. Add UTM-tagged links in video descriptions and bio to start tracking the funnel.",
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
          title="Organic Social Visits"
          value={totalClicks.toLocaleString()}
          testId="kpi-landing-clicks"
        />
        <KPICard
          title="Leads (GHL)"
          value={realLeads.toLocaleString()}
          testId="kpi-leads"
        />
        <KPICard
          title="Click → Lead Rate"
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
              Total views and real GHL leads across all lead magnets
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
                    <Bar dataKey="leads" name="Leads (GHL)" radius={[0, 4, 4, 0]} barSize={14} fill="var(--color-chart-3)" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </Card>
        )}

        {/* Lead Magnet Performance (GHL) */}
        <Card className="p-4 border border-border" data-testid="attribution-card">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-semibold">Lead Magnet Performance</h3>
            <Badge variant="outline" className="text-[10px] h-5 px-2 gap-1">
              GoHighLevel CRM
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Real lead counts from GHL tags and pipeline data
          </p>
          <div className="space-y-2.5">
            {leadMagnetNames.map((name) => {
              const leads = GHL_REAL_LEADS[name];
              const pipeline = ghlPipelines.find((p) => p.leadMagnet === name);
              const items = leadMagnetMappings.filter((m) => m.leadMagnet === name);
              const seen = new Set<string>();
              let views = 0;
              for (const m of items) {
                const key = `${m.videoId}-${m.platform}`;
                if (!seen.has(key)) { seen.add(key); views += m.views; }
              }
              const consultPlus = pipeline
                ? pipeline.stages
                    .filter((s) => s.name.toLowerCase().includes("consult") || s.name.toLowerCase().includes("active") || s.name.toLowerCase().includes("closed"))
                    .reduce((sum, s) => sum + s.count, 0)
                : 0;
              const convRate = leads > 0 ? ((consultPlus / leads) * 100).toFixed(0) : "0";
              return (
                <div key={name} className="rounded-md border border-border p-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {seen.size} videos · {views.toLocaleString()} views
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-lg font-bold tabular-nums" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                        {leads}
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        {convRate}% to consult+
                      </div>
                    </div>
                  </div>
                  {pipeline && leads > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {pipeline.stages.filter((s) => s.count > 0).map((s) => (
                        <span
                          key={s.name}
                          className="inline-flex items-center rounded bg-muted/50 px-1.5 py-0.5 text-[10px] text-muted-foreground"
                        >
                          {s.count} {s.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {filter === "All" && (
            <div className="flex items-start gap-2 mt-3 rounded-md border border-border bg-muted/20 p-2 text-xs text-muted-foreground">
              <Info className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
              <span>
                Total: <strong className="text-foreground">0 leads</strong> across 6 pipelines — all lead magnet pipelines are currently empty in GHL. <strong className="text-foreground">82 organic social landing page visits</strong> (68 YouTube, 10 Instagram, 4 Linktree). Scorecard dominates organic traffic (70 of 82 visits).
              </span>
            </div>
          )}
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
