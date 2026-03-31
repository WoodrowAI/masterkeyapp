"use client";

import { useMemo } from "react";
import { useMounted } from "@/hooks/use-mounted";
import { Card } from "@/components/ui/card";
import { KPICard } from "@/components/kpi-card";
import { PlatformIcon } from "@/components/platform-badge";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
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
  getFilteredDailyViewsCombined,
  getFilteredKPIs,
  getFilteredEngagement,
  getFilteredTopContent,
  getFilteredSparklineData,
  posthogWebsiteTraffic,
} from "@/lib/mock-data";
import { Globe, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { platforms, type PlatformKey } from "@/lib/platforms";
import { useDateRange } from "@/lib/date-range-context";
import { useActivePlatforms } from "@/lib/active-platforms-context";

const PLATFORM_COLORS: Record<string, string> = {
  youtube: "var(--color-chart-1)",
  instagram: "var(--color-chart-2)",
  tiktok: "var(--color-chart-4)",
  facebook: "var(--color-chart-5)",
};

export default function Dashboard() {
  const mounted = useMounted();
  const { dateRange } = useDateRange();
  const { activePlatforms } = useActivePlatforms();

  const kpis = useMemo(() => getFilteredKPIs(activePlatforms, dateRange), [activePlatforms, dateRange]);
  const engagement = useMemo(() => getFilteredEngagement(dateRange), [dateRange]);
  const viewsSparkline = useMemo(() => getFilteredSparklineData("views", dateRange), [dateRange]);

  const filteredViews = useMemo(
    () =>
      getFilteredDailyViewsCombined(dateRange).map((d) => ({
        date: d.date.slice(5),
        ...Object.fromEntries(activePlatforms.map((p) => [p, d[p as keyof typeof d]])),
      })),
    [activePlatforms, dateRange]
  );

  const filteredTopContent = useMemo(() => getFilteredTopContent(dateRange), [dateRange]);

  return (
    <div className="space-y-6" data-testid="dashboard-page">
      {/* KPI Row */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        <KPICard
          title="Total Views"
          value={kpis.totalViews.toLocaleString()}
          delta={12.4}
          sparklineData={viewsSparkline}
          testId="kpi-total-views"
        />
        <KPICard
          title="Watch Time"
          value={kpis.totalWatchHours.toLocaleString()}
          suffix="hrs"
          delta={8.2}
          testId="kpi-watch-time"
        />
        <KPICard
          title="Engagement Rate"
          value={kpis.engagementRate}
          suffix="%"
          delta={3.1}
          testId="kpi-engagement-rate"
        />
        <KPICard
          title="New Followers"
          value={kpis.newFollowers}
          delta={15.7}
          testId="kpi-new-followers"
        />
        <KPICard
          title="Avg View Duration"
          value={`${Math.floor(kpis.avgViewDuration / 60)}:${String(kpis.avgViewDuration % 60).padStart(2, "0")}`}
          delta={-2.3}
          testId="kpi-avg-duration"
        />
        <KPICard
          title="Click-Through Rate"
          value={kpis.ctr}
          suffix="%"
          delta={5.6}
          testId="kpi-ctr"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Views Over Time */}
        <Card className="p-4 border border-border" data-testid="chart-views-over-time">
          <h3 className="text-sm font-semibold mb-3">Views Over Time</h3>
          <div className="h-[280px] w-full">
            {mounted && <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredViews}>
                <defs>
                  {activePlatforms.map((p) => (
                    <linearGradient key={p} id={`grad-${p}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={PLATFORM_COLORS[p]} stopOpacity={0.3} />
                      <stop offset="100%" stopColor={PLATFORM_COLORS[p]} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => {
                    if (v === 0) return "0";
                    if (v >= 1000) return `${(v / 1000).toFixed(1)}k`;
                    return v.toLocaleString();
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                {activePlatforms.map((p) => (
                  <Area
                    key={p}
                    type="monotone"
                    dataKey={p}
                    stroke={PLATFORM_COLORS[p]}
                    fill={`url(#grad-${p})`}
                    strokeWidth={2}
                    name={platforms[p].name}
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>}
          </div>
        </Card>

        {/* Engagement by Platform */}
        <Card className="p-4 border border-border" data-testid="chart-engagement">
          <h3 className="text-sm font-semibold mb-3">Engagement by Platform</h3>
          <div className="h-[280px] w-full">
            {mounted && <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagement} layout="vertical" barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => {
                    if (v === 0) return "0";
                    if (v >= 1000) return `${(v / 1000).toFixed(1)}k`;
                    return v.toLocaleString();
                  }}
                />
                <YAxis
                  type="category"
                  dataKey="platform"
                  tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                  width={80}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="likes" fill="var(--color-chart-1)" radius={[0, 4, 4, 0]} barSize={14} name="Likes" />
                <Bar dataKey="comments" fill="var(--color-chart-2)" radius={[0, 4, 4, 0]} barSize={14} name="Comments" />
                <Bar dataKey="shares" fill="var(--color-chart-3)" radius={[0, 4, 4, 0]} barSize={14} name="Shares" />
              </BarChart>
            </ResponsiveContainer>}
          </div>
        </Card>
      </div>

      {/* Top Performing Content */}
      <Card className="p-4 border border-border" data-testid="table-top-content">
        <h3 className="text-sm font-semibold mb-3">Top Performing Content</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="w-20">Platform</TableHead>
                <TableHead className="text-right w-24">Views</TableHead>
                <TableHead className="text-right w-28">Engagement</TableHead>
                <TableHead className="text-right w-24">Avg Watch %</TableHead>
                <TableHead className="text-right w-28">Published</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTopContent.length > 0 ? (
                filteredTopContent.slice(0, 10).map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium text-sm max-w-[250px] truncate">
                      {item.title}
                    </TableCell>
                    <TableCell>
                      <PlatformIcon platform={item.platform} />
                    </TableCell>
                    <TableCell
                      className="text-right tabular-nums"
                      style={{ fontVariantNumeric: "tabular-nums lining-nums" }}
                    >
                      {item.views.toLocaleString()}
                    </TableCell>
                    <TableCell
                      className="text-right tabular-nums"
                      style={{ fontVariantNumeric: "tabular-nums lining-nums" }}
                    >
                      {item.engagementRate}%
                    </TableCell>
                    <TableCell
                      className="text-right tabular-nums"
                      style={{ fontVariantNumeric: "tabular-nums lining-nums" }}
                    >
                      {item.avgWatchPercent > 0 ? `${item.avgWatchPercent}%` : "—"}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground text-xs">
                      {item.publishedDate}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground text-sm py-6">
                    No content published in this date range
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Website Traffic Sources (PostHog) */}
      <Card className="p-4 border border-border" data-testid="chart-website-traffic">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-semibold">Website Traffic by Source</h3>
          <Badge variant="outline" className="text-[10px] h-5 px-2 gap-1">
            <Globe className="h-3 w-3" />
            PostHog
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mb-3">Pageviews attributed via referrer tracking (90 days)</p>
        <div className="h-[280px] w-full">
          {mounted && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={posthogWebsiteTraffic.filter((s) => s.pageviews > 0)}
                layout="vertical"
                margin={{ left: 10, right: 20, top: 4, bottom: 4 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => {
                    if (v === 0) return "0";
                    if (v >= 1000) return `${(v / 1000).toFixed(1)}k`;
                    return v.toLocaleString();
                  }}
                />
                <YAxis
                  type="category"
                  dataKey="source"
                  tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                  width={90}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value) => [typeof value === "number" ? value.toLocaleString() : value, "Pageviews"]}
                />
                <Bar dataKey="pageviews" radius={[0, 4, 4, 0]} barSize={18} name="Pageviews">
                  {posthogWebsiteTraffic
                    .filter((s) => s.pageviews > 0)
                    .map((entry) => {
                      let color: string;
                      if (entry.platform === "facebook") color = "var(--color-chart-5)";
                      else if (entry.platform === "youtube") color = "var(--color-chart-1)";
                      else color = "var(--color-chart-3)";
                      return <Cell key={entry.source} fill={color} />;
                    })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="flex items-start gap-2 mt-3 rounded-md border border-border bg-muted/30 p-2.5 text-xs text-muted-foreground">
          <Info className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
          <span>
            <strong className="text-foreground">Facebook</strong> tracked via referrer domain (75 pageviews).{" "}
            <strong className="text-foreground">Instagram UTM</strong> live (13 pageviews via Linktree).{" "}
            <strong className="text-foreground">TikTok</strong> Linktree set up, awaiting first traffic data.
          </span>
        </div>
      </Card>
    </div>
  );
}
