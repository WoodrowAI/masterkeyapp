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
  getAggregatedKPIs,
  dailyViewsCombined,
  getEngagementByPlatform,
  topContent,
  getSparklineData,
} from "@/lib/mock-data";
import { platforms, platformKeys, type PlatformKey } from "@/lib/platforms";

const PLATFORM_COLORS: Record<string, string> = {
  youtube: "var(--color-chart-1)",
  instagram: "var(--color-chart-2)",
  tiktok: "var(--color-chart-4)",
  facebook: "var(--color-chart-5)",
};

export default function Dashboard() {
  const mounted = useMounted();
  const activePlatforms = platformKeys;
  const kpis = useMemo(() => getAggregatedKPIs(activePlatforms), [activePlatforms]);
  const engagement = useMemo(() => getEngagementByPlatform(), []);
  const viewsSparkline = useMemo(() => getSparklineData("views"), []);

  const filteredViews = useMemo(
    () =>
      dailyViewsCombined.map((d) => ({
        date: d.date.slice(5),
        ...Object.fromEntries(activePlatforms.map((p) => [p, d[p]])),
      })),
    [activePlatforms]
  );

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
              {topContent.slice(0, 10).map((item) => (
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
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
