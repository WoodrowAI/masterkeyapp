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
import { videoRetentionData } from "@/lib/mock-data";
import { platforms, type PlatformKey } from "@/lib/platforms";

export default function VideoPerformance() {
  const mounted = useMounted();
  const [selectedVideoId, setSelectedVideoId] = useState(videoRetentionData[0].id);

  const video = useMemo(
    () => videoRetentionData.find((v) => v.id === selectedVideoId) ?? videoRetentionData[0],
    [selectedVideoId]
  );

  const retentionChartData = useMemo(
    () =>
      video.retentionCurve.map((pt) => ({
        progress: Math.round(pt.elapsedVideoTimeRatio * 100),
        retention: +(pt.audienceWatchRatio * 100).toFixed(1),
        average: 45,
      })),
    [video]
  );

  const retAt3Sec = video.retentionCurve[3]?.audienceWatchRatio ?? 0;
  const retAt10Pct = video.retentionCurve[10]?.audienceWatchRatio ?? 0;
  const retAt0 = video.retentionCurve[0]?.audienceWatchRatio ?? 1;
  const hookScore = retAt0 > 0 ? +(retAt10Pct / retAt0).toFixed(2) : 0;

  const platformEntries = Object.entries(video.crossPlatform) as [
    PlatformKey,
    { views: number; avgWatchTime: string; completionRate: number | string }
  ][];

  return (
    <div className="space-y-6" data-testid="video-performance-page">
      {/* Video Selector */}
      <div className="flex items-center gap-3">
        <Select value={selectedVideoId} onValueChange={(v) => v && setSelectedVideoId(v)}>
          <SelectTrigger className="w-full max-w-lg" data-testid="video-selector">
            <SelectValue placeholder="Select a video">
              {(value) => {
                const v = videoRetentionData.find((vid) => vid.id === value);
                return v ? v.title : "Select a video";
              }}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {videoRetentionData.map((v) => (
              <SelectItem key={v.id} value={v.id}>
                <PlatformIcon platform={v.platform} className="h-3 w-3" />
                {v.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Retention Curve */}
      <Card className="p-4 border border-border" data-testid="retention-chart">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold">Audience Retention Curve</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{video.title}</p>
          </div>
          <Badge variant="outline" className="text-xs">
            {Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, "0")} duration
          </Badge>
        </div>
        <div className="h-[340px] w-full">
          {mounted && <ResponsiveContainer width="100%" height="100%">
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
                domain={[0, 100]}
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
          </ResponsiveContainer>}
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
      </Card>

      {/* Hook Effectiveness KPIs */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        <KPICard
          title="3-Second Retention"
          value={`${(retAt3Sec * 100).toFixed(0)}%`}
          delta={4.2}
          testId="kpi-3sec-retention"
        />
        <KPICard
          title="Hook Score"
          value={hookScore.toFixed(2)}
          delta={hookScore > 0.75 ? 6.1 : -3.2}
          testId="kpi-hook-score"
        />
        <KPICard
          title="Avg View Duration"
          value={`${Math.floor(video.averageViewDuration / 60)}:${String(video.averageViewDuration % 60).padStart(2, "0")}`}
          testId="kpi-avg-view-duration"
        />
        <KPICard
          title="Completion Rate"
          value={`${video.averageViewPercentage}%`}
          delta={video.averageViewPercentage > 40 ? 2.8 : -4.5}
          testId="kpi-completion-rate"
        />
        <KPICard
          title="Relative Performance"
          value={video.averageViewPercentage > 45 ? "Above Avg" : video.averageViewPercentage > 35 ? "Average" : "Below Avg"}
          delta={video.averageViewPercentage > 45 ? 8.3 : -5.1}
          testId="kpi-relative-performance"
        />
      </div>

      {/* Drop-off Analysis */}
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
            {video.dropOffPoints.map((dp, i) => (
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

      {/* Platform Comparison */}
      <Card className="p-4 border border-border" data-testid="platform-comparison">
        <h3 className="text-sm font-semibold mb-1">Platform Comparison</h3>
        <p className="text-xs text-muted-foreground mb-3">
          Same content across platforms
        </p>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                {platformEntries.map(([p]) => (
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
                {platformEntries.map(([p, data]) => (
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
                {platformEntries.map(([p, data]) => (
                  <TableCell key={p} className="text-center tabular-nums" style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
                    {data.avgWatchTime}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Completion Rate</TableCell>
                {platformEntries.map(([p, data]) => (
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
        </div>
      </Card>
    </div>
  );
}
