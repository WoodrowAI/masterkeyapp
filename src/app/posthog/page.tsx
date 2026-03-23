"use client";

import { useMemo } from "react";
import { useMounted } from "@/hooks/use-mounted";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { KPICard } from "@/components/kpi-card";
import {
  posthogSessions,
  posthogLandingPages,
  posthogUserPaths,
  posthogEvents,
  posthogDevices,
  posthogBrowsers,
  posthogUTMSources,
} from "@/lib/mock-data";
import { Info, ArrowRight, ExternalLink } from "lucide-react";

export default function PostHogDashboards() {
  // Summary KPIs
  const mounted = useMounted();
  const totalSessions = useMemo(
    () => posthogSessions.reduce((s, d) => s + d.sessions, 0),
    []
  );
  const totalUniqueVisitors = useMemo(
    () => posthogSessions.reduce((s, d) => s + d.uniqueVisitors, 0),
    []
  );
  const totalPageviews = useMemo(
    () => posthogSessions.reduce((s, d) => s + d.pageviews, 0),
    []
  );
  const avgBounceRate = useMemo(
    () =>
      +(posthogSessions.reduce((s, d) => s + d.bounceRate, 0) / posthogSessions.length).toFixed(1),
    []
  );
  const avgSessionDuration = useMemo(
    () =>
      Math.round(
        posthogSessions.reduce((s, d) => s + d.avgDuration, 0) / posthogSessions.length
      ),
    []
  );

  const sessionsChartData = useMemo(
    () =>
      posthogSessions.map((d) => ({
        date: d.date.slice(5),
        sessions: d.sessions,
        uniqueVisitors: d.uniqueVisitors,
      })),
    []
  );

  const sessionsSparkline = useMemo(
    () => posthogSessions.slice(-14).map((d) => d.sessions),
    []
  );

  return (
    <div className="space-y-6" data-testid="posthog-page">
      {/* PostHog Info Banner */}
      <div
        className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3 text-xs"
        data-testid="posthog-info"
      >
        <div className="flex items-center gap-2 text-muted-foreground">
          <Info className="h-4 w-4 flex-shrink-0" />
          <span>
            <span className="font-medium text-foreground">PostHog Project: 234009</span>{" "}
            | Instance: us.posthog.com | Data updates in real-time when connected
          </span>
        </div>
        <a
          href="https://us.posthog.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-primary hover:underline"
        >
          Open PostHog <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      {/* 1. Traffic Overview KPIs */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        <KPICard
          title="Sessions (30d)"
          value={totalSessions.toLocaleString()}
          delta={8.5}
          sparklineData={sessionsSparkline}
          testId="kpi-sessions"
        />
        <KPICard
          title="Unique Visitors"
          value={totalUniqueVisitors.toLocaleString()}
          delta={6.2}
          testId="kpi-unique-visitors"
        />
        <KPICard
          title="Pageviews"
          value={totalPageviews.toLocaleString()}
          delta={11.3}
          testId="kpi-pageviews"
        />
        <KPICard
          title="Bounce Rate"
          value={avgBounceRate}
          suffix="%"
          delta={-2.1}
          testId="kpi-bounce-rate"
        />
        <KPICard
          title="Avg Session Duration"
          value={`${Math.floor(avgSessionDuration / 60)}:${String(avgSessionDuration % 60).padStart(2, "0")}`}
          delta={4.8}
          testId="kpi-avg-session"
        />
      </div>

      {/* Sessions Over Time */}
      <Card className="p-4 border border-border" data-testid="chart-sessions">
        <h3 className="text-sm font-semibold mb-3">Sessions Over Time</h3>
        <div className="h-[260px] w-full">
          {mounted && <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sessionsChartData}>
              <defs>
                <linearGradient id="sessionGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="visitorGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0} />
                </linearGradient>
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
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="sessions"
                stroke="var(--color-chart-1)"
                fill="url(#sessionGrad)"
                strokeWidth={2}
                name="Sessions"
              />
              <Area
                type="monotone"
                dataKey="uniqueVisitors"
                stroke="var(--color-chart-2)"
                fill="url(#visitorGrad)"
                strokeWidth={2}
                name="Unique Visitors"
              />
            </AreaChart>
          </ResponsiveContainer>}
        </div>
      </Card>

      {/* UTM Source Breakdown */}
      <Card className="p-4 border border-border" data-testid="utm-sources">
        <h3 className="text-sm font-semibold mb-3">Traffic by UTM Source</h3>
        <div className="h-[240px] w-full">
          {mounted && <ResponsiveContainer width="100%" height="100%">
            <BarChart data={posthogUTMSources} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="source"
                tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                axisLine={false}
                tickLine={false}
                width={100}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="sessions" fill="var(--color-chart-1)" radius={[0, 4, 4, 0]} barSize={16} name="Sessions" />
            </BarChart>
          </ResponsiveContainer>}
        </div>
      </Card>

      {/* 2. Landing Page Performance */}
      <Card className="p-4 border border-border" data-testid="landing-pages">
        <h3 className="text-sm font-semibold mb-3">Landing Page Performance</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Page URL</TableHead>
                <TableHead className="text-right">Unique Visitors</TableHead>
                <TableHead className="text-right">Avg Time on Page</TableHead>
                <TableHead className="text-right">Bounce Rate</TableHead>
                <TableHead className="text-right">Conv. Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posthogLandingPages.map((page) => (
                <TableRow key={page.url}>
                  <TableCell className="font-mono text-sm">{page.url}</TableCell>
                  <TableCell className="text-right tabular-nums" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                    {page.uniqueVisitors.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right tabular-nums" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                    {page.avgTimeOnPage}s
                  </TableCell>
                  <TableCell className="text-right tabular-nums" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                    {page.bounceRate}%
                  </TableCell>
                  <TableCell className="text-right tabular-nums font-medium" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                    <span className={page.conversionRate >= 5 ? "text-emerald-500" : ""}>
                      {page.conversionRate}%
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* 3. User Journey Paths */}
      <Card className="p-4 border border-border" data-testid="user-paths">
        <h3 className="text-sm font-semibold mb-1">User Journey Paths</h3>
        <p className="text-xs text-muted-foreground mb-4">Most common page sequences</p>
        <div className="space-y-2">
          {posthogUserPaths.map((path, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-md border border-border px-3 py-2.5"
            >
              <div className="flex items-center gap-1.5 flex-wrap text-sm">
                {path.path.map((step, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    <span
                      className={
                        step.includes("Exit") || step.includes("bounce")
                          ? "text-red-400"
                          : step.includes("Thank You")
                            ? "text-emerald-400 font-medium"
                            : step === "Contact"
                              ? "text-primary font-medium"
                              : ""
                      }
                    >
                      {step}
                    </span>
                    {i < path.path.length - 1 && (
                      <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    )}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3 text-xs flex-shrink-0 ml-3">
                <span className="tabular-nums text-muted-foreground" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                  {path.sessions.toLocaleString()} sessions
                </span>
                <Badge variant="outline" className="text-[10px] h-5 tabular-nums">
                  {path.percentage}%
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 4. Event Tracking */}
      <Card className="p-4 border border-border" data-testid="event-tracking">
        <h3 className="text-sm font-semibold mb-3">Event Tracking (30d)</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead className="text-right">Count</TableHead>
                <TableHead className="text-right">Unique Users</TableHead>
                <TableHead className="w-32">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posthogEvents.map((evt) => (
                <TableRow key={evt.event}>
                  <TableCell className="font-mono text-sm">{evt.event}</TableCell>
                  <TableCell className="text-right tabular-nums" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                    {evt.count.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right tabular-nums" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                    {evt.uniqueUsers.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <MiniSparkline data={evt.sparkline} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* 5. Device & Browser Breakdown */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-4 border border-border" data-testid="device-breakdown">
          <h3 className="text-sm font-semibold mb-3">Device Breakdown</h3>
          <div className="space-y-3">
            {posthogDevices.map((d) => (
              <div key={d.device} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span>{d.device}</span>
                  <span className="tabular-nums text-muted-foreground" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                    {d.percentage}% ({d.count.toLocaleString()})
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-chart-1 transition-all duration-500"
                    style={{ width: `${d.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4 border border-border" data-testid="browser-breakdown">
          <h3 className="text-sm font-semibold mb-3">Browser Breakdown</h3>
          <div className="space-y-3">
            {posthogBrowsers.map((b) => (
              <div key={b.device} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span>{b.device}</span>
                  <span className="tabular-nums text-muted-foreground" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                    {b.percentage}% ({b.count.toLocaleString()})
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-chart-2 transition-all duration-500"
                    style={{ width: `${b.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function MiniSparkline({ data }: { data: number[] }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 96;
  const h = 24;
  const padding = 2;

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - padding - ((v - min) / range) * (h - padding * 2);
    return `${x},${y}`;
  });

  const polyline = points.join(" ");
  const areaPoints = `0,${h} ${polyline} ${w},${h}`;

  return (
    <svg width={w} height={h} className="overflow-visible">
      <polygon
        points={areaPoints}
        fill="var(--color-primary)"
        fillOpacity={0.15}
      />
      <polyline
        points={polyline}
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
