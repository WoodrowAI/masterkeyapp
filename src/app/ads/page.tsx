"use client";

import { useMemo, useState } from "react";
import { useMounted } from "@/hooks/use-mounted";
import { Card } from "@/components/ui/card";
import { KPICard } from "@/components/kpi-card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
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
  adCampaigns,
  adCreatives,
  adDailySpend,
  type AdPlatform,
} from "@/lib/mock-data";
import { Info, TrendingUp } from "lucide-react";

type PlatformFilter = "all" | AdPlatform;

const STATUS_STYLES: Record<string, string> = {
  Active: "border-emerald-300 text-emerald-700 dark:border-emerald-700 dark:text-emerald-400",
  Paused: "border-amber-300 text-amber-700 dark:border-amber-700 dark:text-amber-400",
  Completed: "border-zinc-300 text-zinc-600 dark:border-zinc-600 dark:text-zinc-400",
};

const FORMAT_STYLES: Record<string, string> = {
  Video: "border-blue-300 text-blue-700 dark:border-blue-700 dark:text-blue-400",
  Image: "border-zinc-300 text-zinc-600 dark:border-zinc-600 dark:text-zinc-400",
  Carousel: "border-purple-300 text-purple-700 dark:border-purple-700 dark:text-purple-400",
  "Spark Ad": "border-pink-300 text-pink-700 dark:border-pink-700 dark:text-pink-400",
};

function numFmt(n: number) {
  return n.toLocaleString();
}

function dollarFmt(n: number) {
  return `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function AdsPage() {
  const mounted = useMounted();
  const [platformFilter, setPlatformFilter] = useState<PlatformFilter>("all");

  const campaigns = useMemo(() => {
    if (platformFilter === "all") return adCampaigns;
    return adCampaigns.filter((c) => c.platform === platformFilter);
  }, [platformFilter]);

  const creatives = useMemo(() => {
    if (platformFilter === "all") return adCreatives;
    return adCreatives.filter((c) => c.platform === platformFilter);
  }, [platformFilter]);

  // KPIs
  const kpis = useMemo(() => {
    const spend = campaigns.reduce((s, c) => s + c.spend, 0);
    const impressions = campaigns.reduce((s, c) => s + c.impressions, 0);
    const clicks = campaigns.reduce((s, c) => s + c.clicks, 0);
    const conversions = campaigns.reduce((s, c) => s + c.conversions, 0);
    const ctr = impressions > 0 ? ((clicks / impressions) * 100).toFixed(2) : "0";
    const cpc = clicks > 0 ? (spend / clicks).toFixed(2) : "0";
    const cpm = impressions > 0 ? ((spend / impressions) * 1000).toFixed(2) : "0";
    const cpa = conversions > 0 ? (spend / conversions).toFixed(2) : "0";
    const roas = spend > 0 ? (campaigns.reduce((s, c) => s + c.roas * c.spend, 0) / spend).toFixed(1) : "0";
    return { spend, impressions, clicks, conversions, ctr, cpc, cpm, cpa, roas };
  }, [campaigns]);

  // Daily spend chart data
  const spendData = useMemo(() => {
    return adDailySpend.map((d) => ({
      date: d.date.slice(5),
      ...(platformFilter === "all"
        ? { Meta: d.meta, TikTok: d.tiktok }
        : platformFilter === "meta"
        ? { Meta: d.meta }
        : { TikTok: d.tiktok }),
    }));
  }, [platformFilter]);

  // Platform comparison data
  const platformCompare = useMemo(() => {
    const metaCampaigns = adCampaigns.filter((c) => c.platform === "meta");
    const ttCampaigns = adCampaigns.filter((c) => c.platform === "tiktok");

    const metaSpend = metaCampaigns.reduce((s, c) => s + c.spend, 0);
    const metaClicks = metaCampaigns.reduce((s, c) => s + c.clicks, 0);
    const metaImpressions = metaCampaigns.reduce((s, c) => s + c.impressions, 0);
    const metaConversions = metaCampaigns.reduce((s, c) => s + c.conversions, 0);

    const ttSpend = ttCampaigns.reduce((s, c) => s + c.spend, 0);
    const ttClicks = ttCampaigns.reduce((s, c) => s + c.clicks, 0);
    const ttImpressions = ttCampaigns.reduce((s, c) => s + c.impressions, 0);
    const ttConversions = ttCampaigns.reduce((s, c) => s + c.conversions, 0);

    return [
      {
        metric: "Spend",
        Meta: metaSpend,
        TikTok: ttSpend,
      },
      {
        metric: "Impressions",
        Meta: metaImpressions,
        TikTok: ttImpressions,
      },
      {
        metric: "Clicks",
        Meta: metaClicks,
        TikTok: ttClicks,
      },
      {
        metric: "Conversions",
        Meta: metaConversions,
        TikTok: ttConversions,
      },
    ];
  }, []);

  // Sort creatives by CTR desc
  const sortedCreatives = useMemo(() => {
    return [...creatives].sort((a, b) => b.ctr - a.ctr);
  }, [creatives]);

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
        <Badge variant="outline" className="text-[10px] h-7 px-2 gap-1 ml-auto">
          <Info className="h-3 w-3" /> Placeholder data — connect ad accounts for live metrics
        </Badge>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-4">
        <KPICard
          title="Total Spend"
          value={dollarFmt(kpis.spend)}
          testId="kpi-ad-spend"
        />
        <KPICard
          title="Impressions"
          value={numFmt(kpis.impressions)}
          testId="kpi-ad-impressions"
        />
        <KPICard
          title="Clicks"
          value={numFmt(kpis.clicks)}
          testId="kpi-ad-clicks"
        />
        <KPICard
          title="Conversions"
          value={numFmt(kpis.conversions)}
          testId="kpi-ad-conversions"
        />
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-4">
        <KPICard title="CTR" value={kpis.ctr} suffix="%" testId="kpi-ad-ctr" />
        <KPICard title="CPC" value={`$${kpis.cpc}`} testId="kpi-ad-cpc" />
        <KPICard title="CPM" value={`$${kpis.cpm}`} testId="kpi-ad-cpm" />
        <KPICard title="ROAS" value={`${kpis.roas}x`} testId="kpi-ad-roas" />
      </div>

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Spend Over Time */}
        <Card className="p-4 border border-border" data-testid="spend-chart">
          <h3 className="text-sm font-semibold mb-1">Ad Spend Over Time</h3>
          <p className="text-xs text-muted-foreground mb-4">Daily spend by platform — March 2026</p>
          <div className="h-[240px] w-full">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={spendData} margin={{ left: 0, right: 16, top: 4, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                    axisLine={false}
                    tickLine={false}
                    interval={3}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                    axisLine={false}
                    tickLine={false}
                    width={45}
                    tickFormatter={(v: number) => `$${v}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(value) => [`$${value}`]}
                  />
                  <Legend wrapperStyle={{ fontSize: "11px" }} />
                  {(platformFilter === "all" || platformFilter === "meta") && (
                    <Line type="monotone" dataKey="Meta" stroke="var(--color-chart-2)" strokeWidth={2} dot={false} />
                  )}
                  {(platformFilter === "all" || platformFilter === "tiktok") && (
                    <Line type="monotone" dataKey="TikTok" stroke="var(--color-chart-4)" strokeWidth={2} dot={false} />
                  )}
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>

        {/* Platform Comparison */}
        <Card className="p-4 border border-border" data-testid="platform-compare">
          <h3 className="text-sm font-semibold mb-1">Platform Comparison</h3>
          <p className="text-xs text-muted-foreground mb-4">Meta vs TikTok side by side</p>
          <div className="h-[240px] w-full">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={platformCompare} margin={{ left: 0, right: 16, top: 4, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis
                    dataKey="metric"
                    tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                    axisLine={false}
                    tickLine={false}
                    width={60}
                    tickFormatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: "11px" }} />
                  <Bar dataKey="Meta" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} barSize={24} />
                  <Bar dataKey="TikTok" fill="var(--color-chart-4)" radius={[4, 4, 0, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>
      </div>

      {/* Campaign Performance Table */}
      <Card className="p-4 border border-border" data-testid="campaign-table">
        <h3 className="text-sm font-semibold mb-3">Campaign Performance</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead className="w-20">Platform</TableHead>
                <TableHead className="w-20">Status</TableHead>
                <TableHead className="text-right w-20">Budget</TableHead>
                <TableHead className="text-right w-20">Spend</TableHead>
                <TableHead className="text-right w-24">Impressions</TableHead>
                <TableHead className="text-right w-16">Clicks</TableHead>
                <TableHead className="text-right w-16">CTR</TableHead>
                <TableHead className="text-right w-16">CPC</TableHead>
                <TableHead className="text-right w-16">Conv.</TableHead>
                <TableHead className="text-right w-16">CPA</TableHead>
                <TableHead className="text-right w-16">ROAS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium text-sm max-w-[200px] truncate">
                    {c.name}
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-medium ${
                      c.platform === "meta"
                        ? "border-blue-300 text-blue-700 dark:border-blue-700 dark:text-blue-400"
                        : "border-pink-300 text-pink-700 dark:border-pink-700 dark:text-pink-400"
                    }`}>
                      {c.platform === "meta" ? "Meta" : "TikTok"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-medium ${STATUS_STYLES[c.status]}`}>
                      {c.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-xs" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                    ${numFmt(c.budget)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-xs" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                    ${numFmt(c.spend)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-xs" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                    {numFmt(c.impressions)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-xs" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                    {numFmt(c.clicks)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-xs" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                    {c.ctr.toFixed(2)}%
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-xs" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                    ${c.cpc.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-xs font-medium" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                    {c.conversions}
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-xs" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                    ${c.cpa.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-xs font-medium" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                    {c.roas.toFixed(1)}x
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Ad Creative Performance */}
      <Card className="p-4 border border-border" data-testid="creative-table">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold">Ad Creative Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Creative</TableHead>
                <TableHead className="w-20">Platform</TableHead>
                <TableHead className="w-20">Format</TableHead>
                <TableHead className="text-right w-24">Impressions</TableHead>
                <TableHead className="text-right w-16">Clicks</TableHead>
                <TableHead className="text-right w-16">CTR</TableHead>
                <TableHead className="text-right w-16">Conv.</TableHead>
                <TableHead className="text-right w-20">Conv. Rate</TableHead>
                <TableHead className="text-right w-20">Spend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedCreatives.map((cr) => (
                <TableRow key={cr.id}>
                  <TableCell className="font-medium text-sm max-w-[200px] truncate">
                    {cr.name}
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-medium ${
                      cr.platform === "meta"
                        ? "border-blue-300 text-blue-700 dark:border-blue-700 dark:text-blue-400"
                        : "border-pink-300 text-pink-700 dark:border-pink-700 dark:text-pink-400"
                    }`}>
                      {cr.platform === "meta" ? "Meta" : "TikTok"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-medium ${FORMAT_STYLES[cr.format] ?? FORMAT_STYLES.Video}`}>
                      {cr.format}
                    </span>
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-xs" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                    {numFmt(cr.impressions)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-xs" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                    {numFmt(cr.clicks)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-xs font-medium" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                    {cr.ctr.toFixed(2)}%
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-xs font-medium" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                    {cr.conversions}
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-xs" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                    {cr.conversionRate.toFixed(2)}%
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-xs" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                    ${numFmt(cr.spend)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
