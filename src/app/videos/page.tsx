"use client";

import { useState, useMemo } from "react";
import { useMounted } from "@/hooks/use-mounted";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceArea,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { KPICard } from "@/components/kpi-card";
import { PlatformIcon } from "@/components/platform-badge";
import { getFilteredTopContent, videoRetentionData, topContent } from "@/lib/mock-data";
import { platforms, type PlatformKey } from "@/lib/platforms";
import { useActivePlatforms } from "@/lib/active-platforms-context";
import { useDateRange } from "@/lib/date-range-context";
import { ArrowLeft, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

type SortKey = "title" | "views" | "avgWatchPercent" | "hookScore" | "avgViewDuration";
type SortDir = "asc" | "desc";

// Compute hook score: retentionCurve[10].audienceWatchRatio / retentionCurve[0].audienceWatchRatio
function computeHookScore(videoId: string): number | null {
  const ret = videoRetentionData.find((v) => v.id === videoId);
  if (!ret || ret.retentionCurve.length < 11) return null;
  const r0 = ret.retentionCurve[0]?.audienceWatchRatio ?? 0;
  const r10 = ret.retentionCurve[10]?.audienceWatchRatio ?? 0;
  if (r0 === 0) return null;
  return +(r10 / r0).toFixed(2);
}

// Compute avg view duration display for a video
function computeAvgViewDuration(videoId: string, avgWatchPercent: number): string {
  const ret = videoRetentionData.find((v) => v.id === videoId);
  if (ret) {
    const s = ret.averageViewDuration;
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  }
  // Estimate: not enough info without duration, show N/A
  return "N/A";
}

export default function VideoPerformance() {
  const mounted = useMounted();
  const { activePlatforms } = useActivePlatforms();
  const { dateRange } = useDateRange();

  // Mode state
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  // Sort state for overview table
  const [sortKey, setSortKey] = useState<SortKey>("views");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  // Filter topContent by date range and active platforms
  const filteredContent = useMemo(
    () => getFilteredTopContent(dateRange, activePlatforms),
    [activePlatforms, dateRange]
  );

  // Compute mean avgWatchPercent for relative performance
  const meanWatchPercent = useMemo(() => {
    const validVideos = filteredContent.filter((v) => v.avgWatchPercent > 0);
    if (validVideos.length === 0) return 40;
    return validVideos.reduce((sum, v) => sum + v.avgWatchPercent, 0) / validVideos.length;
  }, [filteredContent]);

  // Enriched content with hook scores
  const enrichedContent = useMemo(
    () =>
      filteredContent.map((v) => ({
        ...v,
        hookScore: computeHookScore(v.id),
        avgViewDurationDisplay: computeAvgViewDuration(v.id, v.avgWatchPercent),
      })),
    [filteredContent]
  );

  // Sorted content
  const sortedContent = useMemo(() => {
    return [...enrichedContent].sort((a, b) => {
      let aVal: number | string = 0;
      let bVal: number | string = 0;
      switch (sortKey) {
        case "title":
          aVal = a.title.toLowerCase();
          bVal = b.title.toLowerCase();
          break;
        case "views":
          aVal = a.views;
          bVal = b.views;
          break;
        case "avgWatchPercent":
          aVal = a.avgWatchPercent;
          bVal = b.avgWatchPercent;
          break;
        case "hookScore":
          aVal = a.hookScore ?? -1;
          bVal = b.hookScore ?? -1;
          break;
        case "avgViewDuration": {
          const aRet = videoRetentionData.find((r) => r.id === a.id);
          const bRet = videoRetentionData.find((r) => r.id === b.id);
          aVal = aRet?.averageViewDuration ?? -1;
          bVal = bRet?.averageViewDuration ?? -1;
          break;
        }
      }
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      const numA = aVal as number;
      const numB = bVal as number;
      return sortDir === "asc" ? numA - numB : numB - numA;
    });
  }, [enrichedContent, sortKey, sortDir]);

  // KPI summary values for overview
  const totalViews = useMemo(() => filteredContent.reduce((s, v) => s + v.views, 0), [filteredContent]);
  const avgCompletionRate = useMemo(() => {
    const valid = filteredContent.filter((v) => v.avgWatchPercent > 0);
    if (valid.length === 0) return 0;
    return +(valid.reduce((s, v) => s + v.avgWatchPercent, 0) / valid.length).toFixed(1);
  }, [filteredContent]);
  const bestHookVideo = useMemo(() => {
    let best: { title: string; score: number } | null = null;
    for (const v of enrichedContent) {
      if (v.hookScore !== null && (best === null || v.hookScore > best.score)) {
        best = { title: v.title, score: v.hookScore };
      }
    }
    return best;
  }, [enrichedContent]);
  const worstVideo = useMemo(() => {
    const valid = filteredContent.filter((v) => v.views > 0);
    if (valid.length === 0) return null;
    return valid.reduce((worst, v) =>
      v.avgWatchPercent < worst.avgWatchPercent ? v : worst
    );
  }, [filteredContent]);

  // Toggle sort
  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  function SortIcon({ k }: { k: SortKey }) {
    if (sortKey !== k) return <ArrowUpDown className="h-3 w-3 ml-1 opacity-40" />;
    return sortDir === "asc" ? (
      <ArrowUp className="h-3 w-3 ml-1" />
    ) : (
      <ArrowDown className="h-3 w-3 ml-1" />
    );
  }

  function relativePerf(pct: number): { label: string; variant: "default" | "secondary" | "destructive" | "outline" } {
    if (pct === 0) return { label: "No Data", variant: "outline" };
    if (pct >= meanWatchPercent * 1.1) return { label: "Above Avg", variant: "default" };
    if (pct >= meanWatchPercent * 0.9) return { label: "Average", variant: "secondary" };
    return { label: "Below Avg", variant: "destructive" };
  }

  // ─── Mode B: Deep Dive ───
  if (selectedVideoId !== null) {
    const topVideo = topContent.find((v) => v.id === selectedVideoId);
    const retVideo = videoRetentionData.find((v) => v.id === selectedVideoId);

    if (!topVideo) {
      return (
        <div className="space-y-4">
          <Button variant="ghost" size="sm" onClick={() => setSelectedVideoId(null)}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to All Videos
          </Button>
          <p className="text-muted-foreground text-sm">Video not found.</p>
        </div>
      );
    }

    const hasRetention = retVideo !== null && retVideo !== undefined;

    // KPI computation for deep dive
    const retAt3Sec = hasRetention ? (retVideo!.retentionCurve[3]?.audienceWatchRatio ?? 0) : 0;
    const retAt10 = hasRetention ? (retVideo!.retentionCurve[10]?.audienceWatchRatio ?? 0) : 0;
    const retAt0 = hasRetention ? (retVideo!.retentionCurve[0]?.audienceWatchRatio ?? 1) : 1;
    const hookScore = hasRetention && retAt0 > 0 ? +(retAt10 / retAt0).toFixed(2) : null;
    const avgViewDuration = hasRetention ? retVideo!.averageViewDuration : null;
    const completionRate = hasRetention ? retVideo!.averageViewPercentage : topVideo.avgWatchPercent;

    const retentionChartData = hasRetention
      ? retVideo!.retentionCurve.map((pt) => ({
          progress: Math.round(pt.elapsedVideoTimeRatio * 100),
          retention: +(pt.audienceWatchRatio * 100).toFixed(1),
          average: 45,
        }))
      : [];

    // Cross-platform entries — filter to active platforms
    const crossPlatformEntries = hasRetention
      ? (Object.entries(retVideo!.crossPlatform) as [
          PlatformKey,
          { views: number; avgWatchTime: string; completionRate: number | string }
        ][]).filter(([p]) => activePlatforms.includes(p))
      : ([
          ["youtube" as PlatformKey, { views: topVideo.views, avgWatchTime: "N/A", completionRate: topVideo.avgWatchPercent }],
        ] as [PlatformKey, { views: number; avgWatchTime: string; completionRate: number | string }][]).filter(([p]) => activePlatforms.includes(p));

    const perf = relativePerf(completionRate);

    return (
      <div className="space-y-6" data-testid="video-deep-dive">
        {/* Back button + title */}
        <div className="flex items-start gap-3">
          <Button variant="ghost" size="sm" className="-ml-1" onClick={() => setSelectedVideoId(null)}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to All Videos
          </Button>
        </div>
        <div className="flex flex-wrap items-start gap-2">
          <h2 className="text-xl font-semibold leading-snug">{topVideo.title}</h2>
          <PlatformIcon platform={topVideo.platform as PlatformKey} className="h-5 w-5 mt-0.5" />
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          <KPICard
            title="3-Sec Retention"
            value={hasRetention ? `${(retAt3Sec * 100).toFixed(0)}%` : "N/A"}
            testId="kpi-3sec-retention"
          />
          <KPICard
            title="Hook Score"
            value={hookScore !== null ? hookScore.toFixed(2) : "N/A"}
            delta={hookScore !== null ? (hookScore > 0.75 ? 6.1 : -3.2) : undefined}
            testId="kpi-hook-score"
          />
          <KPICard
            title="Avg View Duration"
            value={
              avgViewDuration !== null
                ? `${Math.floor(avgViewDuration / 60)}:${String(avgViewDuration % 60).padStart(2, "0")}`
                : "N/A"
            }
            testId="kpi-avg-view-duration"
          />
          <KPICard
            title="Completion Rate"
            value={completionRate > 0 ? `${completionRate}%` : "N/A"}
            delta={completionRate > 0 ? (completionRate > 40 ? 2.8 : -4.5) : undefined}
            testId="kpi-completion-rate"
          />
          <KPICard
            title="Relative Performance"
            value={perf.label}
            testId="kpi-relative-performance"
          />
        </div>

        {/* Retention Curve */}
        <Card className="p-4 border border-border" data-testid="retention-chart">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold">Audience Retention Curve</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{topVideo.title}</p>
            </div>
            {hasRetention && (
              <Badge variant="outline" className="text-xs">
                {Math.floor(retVideo!.duration / 60)}:{String(retVideo!.duration % 60).padStart(2, "0")} duration
              </Badge>
            )}
          </div>
          {hasRetention ? (
            <>
              <div className="h-[340px] w-full">
                {mounted && (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={retentionChartData}>
                      <defs>
                        <linearGradient id="retGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.15} />
                          <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <ReferenceArea
                        x1={0}
                        x2={10}
                        fill="var(--color-chart-1)"
                        fillOpacity={0.06}
                        strokeOpacity={0}
                      />
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                      <XAxis
                        dataKey="progress"
                        tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => `${v}%`}
                        interval={9}
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => `${v}%`}
                        domain={[0, 150]}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--color-card)",
                          border: "1px solid var(--color-border)",
                          borderRadius: "8px",
                          fontSize: "12px",
                        }}
                        labelFormatter={(v) => `${v}% of video`}
                      />
                      <Line
                        type="monotone"
                        dataKey="average"
                        stroke="var(--color-muted-foreground)"
                        strokeWidth={1.5}
                        strokeDasharray="6 4"
                        dot={false}
                        name="Average"
                      />
                      <Line
                        type="monotone"
                        dataKey="retention"
                        stroke="var(--color-chart-1)"
                        strokeWidth={2.5}
                        dot={false}
                        name="Retention"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <div className="h-0.5 w-4 bg-primary rounded" />
                  <span>This video</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-0.5 w-4 border-t-2 border-dashed border-muted-foreground" />
                  <span>Average</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded bg-primary/10" />
                  <span>Hook zone (0-10%)</span>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
              Retention curve not available for this video
            </div>
          )}
        </Card>

        {/* Drop-off Analysis — only if retention data exists */}
        {hasRetention && retVideo!.dropOffPoints.length > 0 && (
          <Card className="p-4 border border-border" data-testid="dropoff-table">
            <h3 className="text-sm font-semibold mb-3">Drop-off Analysis</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-24">Timestamp</TableHead>
                  <TableHead className="text-right w-28">Viewers Lost</TableHead>
                  <TableHead className="text-right w-20">% Drop</TableHead>
                  <TableHead>Possible Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {retVideo!.dropOffPoints.map((dp, i) => (
                  <TableRow key={i}>
                    <TableCell
                      className="font-mono text-sm tabular-nums"
                      style={{ fontVariantNumeric: "tabular-nums lining-nums" }}
                    >
                      {dp.timestamp}
                    </TableCell>
                    <TableCell
                      className="text-right tabular-nums"
                      style={{ fontVariantNumeric: "tabular-nums lining-nums" }}
                    >
                      {dp.viewersLost.toLocaleString()}
                    </TableCell>
                    <TableCell
                      className="text-right tabular-nums text-red-500"
                      style={{ fontVariantNumeric: "tabular-nums lining-nums" }}
                    >
                      -{dp.percentDrop}%
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {dp.reason}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}

        {/* Cross-Platform Performance */}
        <Card className="p-4 border border-border" data-testid="platform-comparison">
          <h3 className="text-sm font-semibold mb-1">Cross-Platform Performance</h3>
          <p className="text-xs text-muted-foreground mb-3">
            How this video performs across platforms
          </p>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Metric</TableHead>
                  {crossPlatformEntries.map(([p]) => (
                    <TableHead key={p} className="text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <PlatformIcon platform={p} className="h-3.5 w-3.5" />
                        <span>{platforms[p].name}</span>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Views</TableCell>
                  {crossPlatformEntries.map(([p, data]) => (
                    <TableCell
                      key={p}
                      className="text-center tabular-nums"
                      style={{ fontVariantNumeric: "tabular-nums lining-nums" }}
                    >
                      {data.views.toLocaleString()}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Avg Watch Time</TableCell>
                  {crossPlatformEntries.map(([p, data]) => (
                    <TableCell key={p} className="text-center tabular-nums" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                      {data.avgWatchTime}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Completion Rate</TableCell>
                  {crossPlatformEntries.map(([p, data]) => (
                    <TableCell key={p} className="text-center tabular-nums" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                      {typeof data.completionRate === "number"
                        ? `${data.completionRate}%`
                        : data.completionRate}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="mt-3 space-y-1 text-[11px] text-muted-foreground">
            <p>* Instagram doesn&apos;t provide retention curves</p>
            <p>† TikTok provides completion buckets, not continuous curves</p>
            <p className="mt-1 text-[11px] text-muted-foreground/70">
              Instagram, TikTok &amp; Facebook data requires API connectors — currently showing YouTube data only
            </p>
          </div>
        </Card>
      </div>
    );
  }

  // ─── Mode A: All Videos Overview ───
  return (
    <div className="space-y-6" data-testid="video-performance-page">
      <div>
        <h2 className="text-xl font-semibold">Video Performance</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Click any row to view deep-dive analytics</p>
      </div>

      {/* Summary KPI row */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KPICard
          title="Total Views"
          value={totalViews.toLocaleString()}
          testId="kpi-total-views"
        />
        <KPICard
          title="Avg Completion Rate"
          value={avgCompletionRate > 0 ? `${avgCompletionRate}%` : "N/A"}
          testId="kpi-avg-completion"
        />
        <KPICard
          title="Best Hook Score"
          value={bestHookVideo ? bestHookVideo.score.toFixed(2) : "N/A"}
          testId="kpi-best-hook"
        />
        <KPICard
          title="Lowest Completion"
          value={worstVideo ? worstVideo.title.slice(0, 22) + "…" : "N/A"}
          testId="kpi-worst-video"
        />
      </div>

      {/* All Videos Table */}
      <Card className="p-4 border border-border" data-testid="videos-table">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <button
                    className="flex items-center text-xs font-medium hover:text-foreground transition-colors"
                    onClick={() => handleSort("title")}
                  >
                    Title <SortIcon k="title" />
                  </button>
                </TableHead>
                <TableHead className="w-20">Platform</TableHead>
                <TableHead className="text-right w-24">
                  <button
                    className="flex items-center justify-end w-full text-xs font-medium hover:text-foreground transition-colors"
                    onClick={() => handleSort("views")}
                  >
                    Views <SortIcon k="views" />
                  </button>
                </TableHead>
                <TableHead className="text-right w-32">
                  <button
                    className="flex items-center justify-end w-full text-xs font-medium hover:text-foreground transition-colors"
                    onClick={() => handleSort("avgViewDuration")}
                  >
                    Avg Duration <SortIcon k="avgViewDuration" />
                  </button>
                </TableHead>
                <TableHead className="text-right w-32">
                  <button
                    className="flex items-center justify-end w-full text-xs font-medium hover:text-foreground transition-colors"
                    onClick={() => handleSort("avgWatchPercent")}
                  >
                    Completion % <SortIcon k="avgWatchPercent" />
                  </button>
                </TableHead>
                <TableHead className="text-right w-28">
                  <button
                    className="flex items-center justify-end w-full text-xs font-medium hover:text-foreground transition-colors"
                    onClick={() => handleSort("hookScore")}
                  >
                    Hook Score <SortIcon k="hookScore" />
                  </button>
                </TableHead>
                <TableHead className="text-center w-32">Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedContent.length > 0 ? (
                sortedContent.map((item) => {
                  const perf = relativePerf(item.avgWatchPercent);
                  return (
                    <TableRow
                      key={item.id}
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => setSelectedVideoId(item.id)}
                    >
                      <TableCell className="font-medium text-sm max-w-[260px] truncate">
                        {item.title}
                      </TableCell>
                      <TableCell>
                        <PlatformIcon platform={item.platform as PlatformKey} />
                      </TableCell>
                      <TableCell
                        className="text-right tabular-nums"
                        style={{ fontVariantNumeric: "tabular-nums lining-nums" }}
                      >
                        {item.views > 0 ? item.views.toLocaleString() : "—"}
                      </TableCell>
                      <TableCell
                        className="text-right tabular-nums text-sm"
                        style={{ fontVariantNumeric: "tabular-nums lining-nums" }}
                      >
                        {item.avgViewDurationDisplay}
                      </TableCell>
                      <TableCell
                        className="text-right tabular-nums"
                        style={{ fontVariantNumeric: "tabular-nums lining-nums" }}
                      >
                        {item.avgWatchPercent > 0 ? `${item.avgWatchPercent}%` : "—"}
                      </TableCell>
                      <TableCell
                        className="text-right tabular-nums"
                        style={{ fontVariantNumeric: "tabular-nums lining-nums" }}
                      >
                        {item.hookScore !== null ? item.hookScore.toFixed(2) : "N/A"}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={perf.variant} className="text-xs">
                          {perf.label}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground text-sm py-6">
                    No videos found for the selected platforms
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
