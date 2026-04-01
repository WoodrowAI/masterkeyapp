"use client";

import { useMemo } from "react";
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
  getFilteredTopContent,
  posthogWebsiteTraffic,
  funnelData,
} from "@/lib/mock-data";
import { Globe, Info, Magnet, ArrowRight } from "lucide-react";
import { useDateRange } from "@/lib/date-range-context";
import type { PlatformKey } from "@/lib/platforms";

const funnelSteps = [
  { name: "Content Views", value: 508, color: "var(--color-chart-1)" },
  { name: "Landing Page Visits", value: 287, color: "var(--color-chart-2)" },
  { name: "Form Starts", value: 5, color: "var(--color-chart-3)" },
  { name: "Calls Booked", value: 0, color: "var(--color-chart-4)" },
];

// UTM sources that drive lead magnet traffic
const utmLeadSources = [
  { source: "YouTube UTM", pageviews: 88, topLanding: "Thousand Oaks Guide", platform: "youtube" as PlatformKey },
  { source: "Instagram UTM", pageviews: 13, topLanding: "Buy Guide (6), Scorecard (3)", platform: "instagram" as PlatformKey },
  { source: "Facebook Referrer", pageviews: 75, topLanding: "Various pages", platform: "facebook" as PlatformKey },
  { source: "Linktree UTM", pageviews: 4, topLanding: "Mixed", platform: "instagram" as PlatformKey },
  { source: "Google PPC", pageviews: 4, topLanding: "Paid landing pages", platform: "youtube" as PlatformKey },
];

export default function LeadMagnets() {
  const mounted = useMounted();
  const { dateRange } = useDateRange();

  const leadMagnetContent = useMemo(() => {
    return getFilteredTopContent(dateRange).filter(
      (c) => c.contentType === "Lead Magnet"
    );
  }, [dateRange]);

  // Calculate KPIs
  const totalLeadViews = leadMagnetContent.reduce((s, c) => s + c.views, 0);
  const totalLandingVisits = 287; // From PostHog sessions
  const formStarts = 5; // From PostHog events
  const conversionRate = totalLandingVisits > 0 ? ((formStarts / totalLandingVisits) * 100).toFixed(1) : "0";

  return (
    <div className="space-y-6" data-testid="leads-page">
      {/* KPI Row */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KPICard
          title="Lead Magnet Views"
          value={totalLeadViews.toLocaleString()}
          delta={0}
          testId="kpi-lead-views"
        />
        <KPICard
          title="Landing Page Visits"
          value={totalLandingVisits.toLocaleString()}
          delta={0}
          testId="kpi-landing-visits"
        />
        <KPICard
          title="Form Starts"
          value={formStarts.toString()}
          delta={0}
          testId="kpi-form-starts"
        />
        <KPICard
          title="Visit → Form Rate"
          value={conversionRate}
          suffix="%"
          delta={0}
          testId="kpi-conversion-rate"
        />
      </div>

      {/* Lead Magnet Funnel */}
      <Card className="p-4 border border-border" data-testid="lead-funnel">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-semibold">Lead Magnet Funnel</h3>
          <Badge variant="outline" className="text-[10px] h-5 px-2 gap-1">
            <Globe className="h-3 w-3" />
            PostHog + Instagram API
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          From content view to form completion across all platforms
        </p>
        <div className="h-[220px] w-full">
          {mounted && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={funnelSteps}
                layout="vertical"
                margin={{ left: 20, right: 30, top: 4, bottom: 4 }}
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
                  tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                  width={120}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24} name="Count">
                  {funnelSteps.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
          <Info className="h-3.5 w-3.5 flex-shrink-0" />
          <span>
            508 lead magnet views → 287 landing page visits → 5 form starts.{" "}
            <strong className="text-foreground">1.7% conversion rate</strong> — biggest opportunity is optimizing landing page CTAs.
          </span>
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Lead Magnet Content */}
        <Card className="p-4 border border-border" data-testid="lead-content">
          <h3 className="text-sm font-semibold mb-3">Lead Magnet Content</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead className="w-20">Platform</TableHead>
                  <TableHead className="text-right w-20">Views</TableHead>
                  <TableHead className="text-right w-24">Engagement</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leadMagnetContent.length > 0 ? (
                  leadMagnetContent.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium text-sm max-w-[200px] truncate">
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
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground text-sm py-6">
                      No lead magnet content in this date range
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* UTM Attribution */}
        <Card className="p-4 border border-border" data-testid="utm-attribution">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-semibold">Traffic Attribution</h3>
            <Badge variant="outline" className="text-[10px] h-5 px-2 gap-1">
              <Globe className="h-3 w-3" />
              PostHog UTM
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Where landing page visitors are coming from
          </p>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Source</TableHead>
                  <TableHead className="text-right w-24">Pageviews</TableHead>
                  <TableHead>Top Landing</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {utmLeadSources.map((src) => (
                  <TableRow key={src.source}>
                    <TableCell className="text-sm">
                      <div className="flex items-center gap-2">
                        <PlatformIcon platform={src.platform} className="h-3.5 w-3.5" />
                        {src.source}
                      </div>
                    </TableCell>
                    <TableCell
                      className="text-right tabular-nums font-medium"
                      style={{ fontVariantNumeric: "tabular-nums lining-nums" }}
                    >
                      {src.pageviews}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground max-w-[160px] truncate">
                      {src.topLanding}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="p-4 border border-border" data-testid="lead-recommendations">
        <div className="flex items-center gap-2 mb-3">
          <Magnet className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold">Lead Magnet Recommendations</h3>
        </div>
        <div className="space-y-3">
          {[
            {
              title: "Increase Lead Magnet Frequency",
              body: "You're posting only 1 lead magnet per month but they generate the highest views (480 IG, 28 YT) and drive the most funnel traffic. Aim for 2-3 per month.",
            },
            {
              title: "Optimize Landing Page CTAs",
              body: "With 287 sessions but only 5 form starts (1.7%), the landing pages need stronger calls-to-action. Consider adding urgency, social proof, or simplifying the form.",
            },
            {
              title: "Cross-Platform Lead Magnets",
              body: "The Home Value Tool demo performs 17x better on Instagram (480 views) vs YouTube (28 views). Consider Instagram-first launches for lead magnet content.",
            },
          ].map((rec) => (
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
