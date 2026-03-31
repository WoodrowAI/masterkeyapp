"use client";

import { useState, useMemo } from "react";
import { useMounted } from "@/hooks/use-mounted";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PlatformIcon } from "@/components/platform-badge";
import { funnelDatasets, getAggregatedFunnelData, funnelSources, type FunnelData } from "@/lib/mock-data";
import { platforms, type PlatformKey } from "@/lib/platforms";
import { ArrowRight, Info, Trophy } from "lucide-react";

const PLATFORM_COLORS: Record<string, string> = {
  youtube: "var(--color-chart-1)",
  instagram: "var(--color-chart-2)",
  tiktok: "var(--color-chart-4)",
  facebook: "var(--color-chart-5)",
};

const stepColors = [
  "var(--color-chart-1)",
  "var(--color-chart-5)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
];

export default function FunnelAnalysis() {
  const mounted = useMounted();
  const [selectedFunnelId, setSelectedFunnelId] = useState("all");

  const activeFunnel: FunnelData = useMemo(() => {
    if (selectedFunnelId === "all") return getAggregatedFunnelData();
    return funnelDatasets.find((f) => f.id === selectedFunnelId) ?? getAggregatedFunnelData();
  }, [selectedFunnelId]);

  const maxCount = activeFunnel.steps[0].count;

  const volumeChartData = useMemo(
    () =>
      activeFunnel.platformBreakdown.map((pb) => ({
        platform: platforms[pb.platform].name,
        "Social Content": pb.socialContent,
        "Link Clicked": pb.linkClicked,
        "Call from Asset": pb.callFromAsset,
        "Meeting Scheduled": pb.meetingScheduled,
      })),
    [activeFunnel]
  );

  const conversionChartData = useMemo(
    () =>
      activeFunnel.platformBreakdown.map((pb) => ({
        platform: platforms[pb.platform].name,
        conversionRate: pb.conversionRate,
      })),
    [activeFunnel]
  );

  return (
    <div className="space-y-6" data-testid="funnel-analysis-page">
      {/* Funnel Selector */}
      <div className="flex items-center gap-3 flex-wrap">
        <Select value={selectedFunnelId} onValueChange={(v) => v && setSelectedFunnelId(v)}>
          <SelectTrigger className="w-full max-w-sm" data-testid="funnel-selector">
            <SelectValue placeholder="Select a funnel">
              {(value) => {
                if (value === "all") return "All Funnels (Aggregate)";
                const f = funnelDatasets.find((fd) => fd.id === value);
                return f ? f.name : "Select a funnel";
              }}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Funnels (Aggregate)</SelectItem>
            {funnelDatasets.map((f) => (
              <SelectItem key={f.id} value={f.id}>
                {f.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedFunnelId !== "all" && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Trophy className="h-3 w-3 text-chart-3" />
              <span>Best Volume: <strong className="text-foreground">{platforms[activeFunnel.bestVolumeDriver].name}</strong></span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1">
              <Trophy className="h-3 w-3 text-chart-2" />
              <span>Best Converter: <strong className="text-foreground">{platforms[activeFunnel.bestConverter].name}</strong></span>
            </div>
          </div>
        )}
      </div>

      {/* Funnel Visualization */}
      <Card className="p-5 border border-border" data-testid="funnel-visualization">
        <h3 className="text-sm font-semibold mb-5">
          {activeFunnel.name} — Conversion Funnel
        </h3>
        <div className="space-y-3">
          {activeFunnel.steps.map((step, i) => {
            const widthPct = Math.max((step.count / maxCount) * 100, 8);
            return (
              <div key={step.name} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground w-4">
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium">{step.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span
                      className="font-semibold tabular-nums"
                      style={{ fontVariantNumeric: "tabular-nums lining-nums" }}
                    >
                      {step.count.toLocaleString()}
                    </span>
                    {i > 0 && (
                      <span
                        className="text-muted-foreground tabular-nums"
                        style={{ fontVariantNumeric: "tabular-nums lining-nums" }}
                      >
                        {step.conversionFromPrev.toFixed(1)}% from prev
                      </span>
                    )}
                  </div>
                </div>
                <div className="relative h-8 w-full rounded-md bg-muted/30 overflow-hidden">
                  <div
                    className="h-full rounded-md transition-all duration-500"
                    style={{
                      width: `${widthPct}%`,
                      backgroundColor: stepColors[i],
                      opacity: 0.8,
                    }}
                  />
                </div>
                {i < activeFunnel.steps.length - 1 && (
                  <div className="flex items-center gap-1 pl-6 text-[11px] text-muted-foreground">
                    <ArrowRight className="h-3 w-3" />
                    <span
                      className="tabular-nums"
                      style={{ fontVariantNumeric: "tabular-nums lining-nums" }}
                    >
                      {activeFunnel.steps[i + 1].dropOff.toFixed(1)}% drop-off
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Session Flow */}
      <Card className="p-5 border border-border" data-testid="session-flow">
        <h3 className="text-sm font-semibold mb-4">Session Flow</h3>
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
          {activeFunnel.steps.map((step, i) => (
            <div key={step.name} className="flex items-center gap-2 flex-1 min-w-0">
              <div
                className="flex-1 rounded-lg p-4 text-center min-w-[130px] transition-all border"
                style={{
                  borderColor: stepColors[i],
                  backgroundColor: `color-mix(in srgb, ${stepColors[i]} 12%, transparent)`,
                }}
              >
                <div className="text-xs font-medium text-foreground">
                  {step.name}
                </div>
                <div
                  className="text-xl font-bold mt-1 tabular-nums"
                  style={{ color: stepColors[i], fontVariantNumeric: "tabular-nums lining-nums" }}
                >
                  {step.count.toLocaleString()}
                </div>
              </div>
              {i < activeFunnel.steps.length - 1 && (
                <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Source Attribution + Conversion Rate Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-4 border border-border" data-testid="chart-source-volume">
          <h3 className="text-sm font-semibold mb-3">Source Attribution (Volume)</h3>
          <div className="h-[280px] w-full">
            {mounted && <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volumeChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis
                  dataKey="platform"
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
                <Bar dataKey="Social Content" fill={stepColors[0]} radius={[4, 4, 0, 0]} barSize={18} />
                <Bar dataKey="Meeting Scheduled" fill={stepColors[3]} radius={[4, 4, 0, 0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>}
          </div>
        </Card>

        <Card className="p-4 border border-border" data-testid="chart-conversion-rate">
          <h3 className="text-sm font-semibold mb-3">Conversion Rate by Source</h3>
          <div className="h-[280px] w-full">
            {mounted && <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversionChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis
                  dataKey="platform"
                  tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar
                  dataKey="conversionRate"
                  fill="var(--color-chart-2)"
                  radius={[4, 4, 0, 0]}
                  barSize={32}
                  name="Conv. Rate %"
                />
              </BarChart>
            </ResponsiveContainer>}
          </div>
        </Card>
      </div>

      {/* Platform Breakdown Table */}
      <Card className="p-4 border border-border" data-testid="funnel-breakdown-table">
        <h3 className="text-sm font-semibold mb-3">Platform Breakdown</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Platform</TableHead>
                <TableHead className="text-right">Social Content</TableHead>
                <TableHead className="text-right">Link Clicked</TableHead>
                <TableHead className="text-right">Call from Asset</TableHead>
                <TableHead className="text-right">Meeting Scheduled</TableHead>
                <TableHead className="text-right">Conv. Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeFunnel.platformBreakdown.map((pb) => (
                <TableRow key={pb.platform}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <PlatformIcon platform={pb.platform} className="h-3.5 w-3.5" />
                      <span className="font-medium">{platforms[pb.platform].name}</span>
                      {pb.platform === activeFunnel.bestConverter && selectedFunnelId !== "all" && (
                        <Badge variant="secondary" className="text-[10px] h-4 px-1.5">
                          Best Conv.
                        </Badge>
                      )}
                      {pb.platform === activeFunnel.bestVolumeDriver && selectedFunnelId !== "all" && (
                        <Badge variant="outline" className="text-[10px] h-4 px-1.5">
                          Top Volume
                        </Badge>
                      )}
                      {pb.platform === "youtube" && (
                        <Badge variant="secondary" className="text-[9px] h-3.5 px-1 font-normal">API</Badge>
                      )}
                      {(pb.platform === "facebook" || pb.platform === "instagram") && (
                        <Badge variant="outline" className="text-[9px] h-3.5 px-1 font-normal">PostHog UTM</Badge>
                      )}
                      {pb.platform === "tiktok" && (
                        <Badge variant="outline" className="text-[9px] h-3.5 px-1 font-normal text-muted-foreground">Awaiting Data</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right tabular-nums" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                    {pb.socialContent.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right tabular-nums" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                    {pb.linkClicked.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right tabular-nums" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                    {pb.callFromAsset.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right tabular-nums" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                    {pb.meetingScheduled}
                  </TableCell>
                  <TableCell className="text-right tabular-nums font-medium" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                    {pb.conversionRate}%
                  </TableCell>
                </TableRow>
              ))}
              {/* Totals */}
              <TableRow className="border-t-2">
                <TableCell className="font-semibold">Total</TableCell>
                <TableCell className="text-right tabular-nums font-semibold" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                  {activeFunnel.platformBreakdown.reduce((s, r) => s + r.socialContent, 0).toLocaleString()}
                </TableCell>
                <TableCell className="text-right tabular-nums font-semibold" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                  {activeFunnel.platformBreakdown.reduce((s, r) => s + r.linkClicked, 0).toLocaleString()}
                </TableCell>
                <TableCell className="text-right tabular-nums font-semibold" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                  {activeFunnel.platformBreakdown.reduce((s, r) => s + r.callFromAsset, 0).toLocaleString()}
                </TableCell>
                <TableCell className="text-right tabular-nums font-semibold" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                  {activeFunnel.platformBreakdown.reduce((s, r) => s + r.meetingScheduled, 0)}
                </TableCell>
                <TableCell className="text-right tabular-nums font-semibold" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                  {(
                    (activeFunnel.platformBreakdown.reduce((s, r) => s + r.meetingScheduled, 0) /
                      activeFunnel.platformBreakdown.reduce((s, r) => s + r.socialContent, 0)) *
                    100
                  ).toFixed(2)}%
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Traffic Source Breakdown */}
      <Card className="p-4 border border-border" data-testid="traffic-source-table">
        <h3 className="text-sm font-semibold mb-3">Traffic Source Breakdown</h3>
        <p className="text-xs text-muted-foreground mb-3">Sessions attributed by UTM source and referrer (PostHog)</p>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source</TableHead>
                <TableHead className="text-right">Sessions</TableHead>
                <TableHead className="text-right">Landing Views</TableHead>
                <TableHead className="text-right">Form Fills</TableHead>
                <TableHead className="text-right">Calls Booked</TableHead>
                <TableHead className="text-right">Conv. Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {funnelSources.map((fs) => (
                <TableRow key={fs.source}>
                  <TableCell>
                    <span className="font-medium capitalize">{fs.source}</span>
                  </TableCell>
                  <TableCell className="text-right tabular-nums" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                    {fs.clicks.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right tabular-nums" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                    {fs.landingViews.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right tabular-nums" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                    {fs.formFills}
                  </TableCell>
                  <TableCell className="text-right tabular-nums" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                    {fs.callsBooked}
                  </TableCell>
                  <TableCell className="text-right tabular-nums font-medium" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                    {fs.conversionRate}%
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="border-t-2">
                <TableCell className="font-semibold">Total</TableCell>
                <TableCell className="text-right tabular-nums font-semibold" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                  {funnelSources.reduce((s, r) => s + r.clicks, 0).toLocaleString()}
                </TableCell>
                <TableCell className="text-right tabular-nums font-semibold" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                  {funnelSources.reduce((s, r) => s + r.landingViews, 0).toLocaleString()}
                </TableCell>
                <TableCell className="text-right tabular-nums font-semibold" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                  {funnelSources.reduce((s, r) => s + r.formFills, 0)}
                </TableCell>
                <TableCell className="text-right tabular-nums font-semibold" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                  {funnelSources.reduce((s, r) => s + r.callsBooked, 0)}
                </TableCell>
                <TableCell className="text-right tabular-nums font-semibold" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                  {(
                    (funnelSources.reduce((s, r) => s + r.callsBooked, 0) /
                      funnelSources.reduce((s, r) => s + r.clicks, 0)) *
                    100
                  ).toFixed(1)}%
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* PostHog Integration Note */}
      <div
        className="flex items-start gap-2 rounded-lg border border-border bg-muted/30 p-3 text-xs text-muted-foreground"
        data-testid="posthog-note"
      >
        <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
        <div>
          <span className="font-medium text-foreground">Connected to PostHog</span>{" "}
          (Project: 234009) — UTM tracking live across all platforms via Linktree. Instagram: 13 pageviews via UTM (6 Buy Guide, 3 Scorecard, 2 Seller, 2 PM). YouTube: 88 pageviews via UTM. Facebook: 75 pageviews via referrer. TikTok: Linktree set up, awaiting first traffic data.
        </div>
      </div>
    </div>
  );
}
