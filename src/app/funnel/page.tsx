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
import { funnelDatasets, getAggregatedFunnelData, funnelSources, ghlPipelines, type FunnelData } from "@/lib/mock-data";
import { platforms, type PlatformKey } from "@/lib/platforms";
import { ArrowRight, Info, Trophy, AlertTriangle } from "lucide-react";

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
        "Social Media Views": pb.socialContent,
        "Landing Page Visits": pb.linkClicked,
        "Leads": pb.leads,
        "Consult Booked": pb.consultBooked,
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
        <Badge variant="outline" className="text-[10px] h-5 px-2 gap-1 ml-auto">
          GoHighLevel + PostHog
        </Badge>
      </div>

      {/* Funnel Visualization */}
      <Card className="p-5 border border-border" data-testid="funnel-visualization">
        <h3 className="text-sm font-semibold mb-5">
          {activeFunnel.name} — Conversion Funnel
        </h3>
        {(() => {
          const steps = activeFunnel.steps;
          const n = steps.length;
          const segH = 64;
          const gapH = 28;
          const totalH = n * segH + (n - 1) * gapH;
          const maxW = 90; // widest segment as % of container
          const minW = 25; // narrowest segment (or 0-count floor)

          // Compute width % for each step proportional to count
          const widths = steps.map((step) => {
            if (maxCount === 0) return minW;
            const raw = (step.count / maxCount) * maxW;
            return Math.max(raw, minW);
          });

          return (
            <div className="flex flex-col items-center w-full">
              <svg
                viewBox={`0 0 400 ${totalH}`}
                className="w-full"
                style={{ maxWidth: 560 }}
                preserveAspectRatio="xMidYMid meet"
              >
                {steps.map((step, i) => {
                  const y = i * (segH + gapH);
                  const topW = (widths[i] / 100) * 400;
                  const botW = i < n - 1 ? (widths[i + 1] / 100) * 400 : topW * 0.7;
                  const cx = 200;
                  const topL = cx - topW / 2;
                  const topR = cx + topW / 2;
                  const botL = cx - botW / 2;
                  const botR = cx + botW / 2;

                  const points = `${topL},${y} ${topR},${y} ${botR},${y + segH} ${botL},${y + segH}`;
                  const color = stepColors[Math.min(i, stepColors.length - 1)];

                  return (
                    <g key={step.name}>
                      {/* Trapezoid segment */}
                      <polygon
                        points={points}
                        fill={color}
                        opacity={0.85}
                      />
                      {/* Step name — left-aligned inside trapezoid */}
                      <text
                        x={cx}
                        y={y + segH / 2 - 7}
                        textAnchor="middle"
                        fill="white"
                        fontSize="13"
                        fontWeight="600"
                        style={{ textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
                      >
                        {step.name}
                      </text>
                      {/* Count */}
                      <text
                        x={cx}
                        y={y + segH / 2 + 12}
                        textAnchor="middle"
                        fill="white"
                        fontSize="16"
                        fontWeight="700"
                        style={{ fontVariantNumeric: "tabular-nums lining-nums", textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
                      >
                        {step.count.toLocaleString()}
                      </text>
                      {/* Drop-off label between segments */}
                      {i < n - 1 && steps[i + 1].dropOff > 0 && (
                        <text
                          x={cx}
                          y={y + segH + gapH / 2 + 4}
                          textAnchor="middle"
                          fill="var(--color-muted-foreground)"
                          fontSize="10"
                        >
                          ↓ {steps[i + 1].dropOff.toFixed(1)}% drop-off
                        </text>
                      )}
                      {/* Conversion from prev on the right side */}
                      {i > 0 && step.conversionFromPrev <= 100 && (
                        <text
                          x={topR + 6}
                          y={y + segH / 2 + 4}
                          textAnchor="start"
                          fill="var(--color-muted-foreground)"
                          fontSize="10"
                        >
                          {step.conversionFromPrev.toFixed(1)}%
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
          );
        })()}
        <div className="mt-4 space-y-1 text-[11px] text-muted-foreground leading-relaxed">
          <p className="font-medium text-foreground text-xs mb-1.5">Data Sources</p>
          <p><span className="font-medium">Social Media Views</span> — Total video views from YouTube Analytics API, Instagram Graph API, and TikTok Content API</p>
          <p><span className="font-medium">Landing Page Visits</span> — Sessions on your lead magnet landing pages from organic social only — tracked by PostHog, filtered to Linktree referrers and social UTM parameters (excludes direct, Google, paid ads)</p>
          <p><span className="font-medium">Leads</span> — Contacts who downloaded a lead magnet, tracked via GoHighLevel form submissions and pipeline data</p>
          <p><span className="font-medium">Consult Booked</span> — Contacts who reached the &quot;Consult Booked&quot; stage in their GoHighLevel lead magnet pipeline</p>
        </div>
      </Card>

      {/* Pipeline Comparison (aggregate view) */}
      {selectedFunnelId === "all" && (
        <Card className="p-5 border border-border" data-testid="pipeline-comparison">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold">GHL Pipeline Comparison</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Lead magnet pipelines — leads by stage
              </p>
            </div>
            <Badge variant="outline" className="text-[10px] h-5 px-2 gap-1">
              GoHighLevel CRM
            </Badge>
          </div>
          <div className="h-[280px] w-full">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={ghlPipelines.map((p) => ({
                    name: p.leadMagnet,
                    total: p.totalOpportunities,
                    "Consult+": p.stages
                      .filter((s) => s.name.toLowerCase().includes("consult") || s.name.toLowerCase().includes("active") || s.name.toLowerCase().includes("closed"))
                      .reduce((sum, s) => sum + s.count, 0),
                  }))}
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
                  <Bar dataKey="total" name="Total Leads" radius={[0, 4, 4, 0]} barSize={14} fill="var(--color-chart-1)" />
                  <Bar dataKey="Consult+" name="Consult Booked+" radius={[0, 4, 4, 0]} barSize={14} fill="var(--color-chart-2)" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="mt-3 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pipeline</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right">In Nurture</TableHead>
                  <TableHead className="text-right">Consult+</TableHead>
                  <TableHead className="text-right">Conv. Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ghlPipelines.map((p) => {
                  const consultPlus = p.stages
                    .filter((s) => s.name.toLowerCase().includes("consult") || s.name.toLowerCase().includes("active") || s.name.toLowerCase().includes("closed"))
                    .reduce((sum, s) => sum + s.count, 0);
                  const nurture = p.stages.find((s) => s.name === "Nurture")?.count ?? 0;
                  const convRate = p.totalOpportunities > 0 ? ((consultPlus / p.totalOpportunities) * 100).toFixed(0) : "0";
                  return (
                    <TableRow key={p.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium text-sm">{p.leadMagnet}</div>
                          <div className="text-[10px] text-muted-foreground">{p.id.slice(0, 8)}…</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right tabular-nums font-semibold" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                        {p.totalOpportunities}
                      </TableCell>
                      <TableCell className="text-right tabular-nums" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                        {nurture}
                      </TableCell>
                      <TableCell className="text-right tabular-nums" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                        {consultPlus}
                      </TableCell>
                      <TableCell className="text-right tabular-nums" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                        {convRate}%
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}

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
                <Bar dataKey="Social Media Views" fill={stepColors[0]} radius={[4, 4, 0, 0]} barSize={18} />
                <Bar dataKey="Leads" fill={stepColors[2]} radius={[4, 4, 0, 0]} barSize={18} />
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
                <TableHead className="text-right">Social Media Views</TableHead>
                <TableHead className="text-right">Landing Page Visits</TableHead>
                <TableHead className="text-right">Leads</TableHead>
                <TableHead className="text-right">Consult Booked</TableHead>
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
                      {pb.platform === "instagram" && (
                        <Badge variant="secondary" className="text-[9px] h-3.5 px-1 font-normal">GHL + API</Badge>
                      )}
                      {pb.platform === "facebook" && (
                        <Badge variant="outline" className="text-[9px] h-3.5 px-1 font-normal">PostHog</Badge>
                      )}
                      {pb.platform === "tiktok" && (
                        <Badge variant="outline" className="text-[9px] h-3.5 px-1 font-normal text-muted-foreground">No UTM yet</Badge>
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
                    {pb.leads.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right tabular-nums" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                    {pb.consultBooked}
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
                  {activeFunnel.platformBreakdown.reduce((s, r) => s + r.leads, 0).toLocaleString()}
                </TableCell>
                <TableCell className="text-right tabular-nums font-semibold" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                  {activeFunnel.platformBreakdown.reduce((s, r) => s + r.consultBooked, 0)}
                </TableCell>
                <TableCell className="text-right tabular-nums font-semibold" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                  {(() => {
                    const totalContent = activeFunnel.platformBreakdown.reduce((s, r) => s + r.socialContent, 0);
                    const totalOpps = activeFunnel.platformBreakdown.reduce((s, r) => s + r.consultBooked, 0);
                    return totalContent > 0 ? ((totalOpps / totalContent) * 100).toFixed(2) : "0";
                  })()}%
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Traffic Source Breakdown */}
      <Card className="p-4 border border-border" data-testid="traffic-source-table">
        <h3 className="text-sm font-semibold mb-3">Traffic Source Breakdown</h3>
        <p className="text-xs text-muted-foreground mb-3">Sessions attributed by UTM source and referrer (PostHog + GHL)</p>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source</TableHead>
                <TableHead className="text-right">Sessions</TableHead>
                <TableHead className="text-right">Landing Views</TableHead>
                <TableHead className="text-right">Leads</TableHead>
                <TableHead className="text-right">Consult Booked</TableHead>
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
                    {fs.leads}
                  </TableCell>
                  <TableCell className="text-right tabular-nums" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                    {fs.consultBooked}
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
                  {funnelSources.reduce((s, r) => s + r.leads, 0)}
                </TableCell>
                <TableCell className="text-right tabular-nums font-semibold" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                  {funnelSources.reduce((s, r) => s + r.consultBooked, 0)}
                </TableCell>
                <TableCell className="text-right tabular-nums font-semibold" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                  {(() => {
                    const totalClicks = funnelSources.reduce((s, r) => s + r.clicks, 0);
                    const totalOpps = funnelSources.reduce((s, r) => s + r.consultBooked, 0);
                    return totalClicks > 0 ? ((totalOpps / totalClicks) * 100).toFixed(1) : "0";
                  })()}%
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Attribution Insight */}
      <div
        className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-xs text-muted-foreground"
        data-testid="attribution-insight"
      >
        <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0 text-amber-500" />
        <div>
          <span className="font-medium text-foreground">82 organic social landing page visits — YouTube drives 83%.</span>{" "}
          68 of 82 visits came from YouTube UTM links (all to Neighborhood Scorecard). Instagram contributed 10, Linktree 4.
          TikTok generates the most views (8,697) but 0 attributed landing page visits — UTM tracking not yet configured.
        </div>
      </div>

      {/* Data Source Note */}
      <div
        className="flex items-start gap-2 rounded-lg border border-border bg-muted/30 p-3 text-xs text-muted-foreground"
        data-testid="posthog-note"
      >
        <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
        <div>
          <span className="font-medium text-foreground">Data Sources:</span>{" "}
          GoHighLevel CRM (leads, pipelines, tags) + PostHog (UTM tracking, sessions) + YouTube/Instagram/TikTok APIs (content views).
          Organic social only: YouTube UTM 68 visits, Instagram UTM 10 visits, Linktree 4 visits. TikTok: awaiting UTM setup. Non-social traffic (direct, Google, Facebook referrer) excluded from funnel.
        </div>
      </div>
    </div>
  );
}
