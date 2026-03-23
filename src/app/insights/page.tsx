"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  Clock,
  TrendingUp,
  Target,
  MessageCircle,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { PlatformIcon } from "@/components/platform-badge";
import { aiInsights, contentScore, trendingTopics } from "@/lib/mock-data";
import type { PlatformKey } from "@/lib/platforms";

const iconMap: Record<string, typeof Zap> = {
  Zap,
  Clock,
  TrendingUp,
  Target,
  MessageCircle,
};

const categoryColors: Record<string, string> = {
  hook: "bg-primary/10 text-primary",
  timing: "bg-chart-2/10 text-chart-2",
  content: "bg-chart-3/10 text-chart-3",
  funnel: "bg-chart-4/10 text-chart-4",
  engagement: "bg-chart-5/10 text-chart-5",
};

export default function AIInsights() {
  return (
    <div className="space-y-6" data-testid="ai-insights-page">
      {/* Content Score */}
      <Card className="p-5 border border-border" data-testid="content-score">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold">Content Health Score</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Overall performance assessment across all platforms
            </p>
          </div>
          <Sparkles className="h-5 w-5 text-chart-3" />
        </div>
        <div className="flex items-center gap-6">
          <div className="flex-shrink-0">
            <div
              className="text-4xl font-bold tabular-nums text-primary"
              style={{ fontVariantNumeric: "tabular-nums lining-nums" }}
            >
              {contentScore.overall}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">out of 100</div>
          </div>

          <div className="flex-1 grid grid-cols-2 gap-x-6 gap-y-3">
            {[
              { label: "Hooks", value: contentScore.hooks, color: "bg-primary" },
              { label: "Engagement", value: contentScore.engagement, color: "bg-chart-2" },
              { label: "Reach", value: contentScore.reach, color: "bg-chart-5" },
              { label: "Conversion", value: contentScore.conversion, color: "bg-chart-3" },
            ].map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                  <span
                    className="text-xs font-medium tabular-nums"
                    style={{ fontVariantNumeric: "tabular-nums lining-nums" }}
                  >
                    {item.value}
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full ${item.color} transition-all duration-500`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* AI Recommendations */}
      <div>
        <h3 className="text-sm font-semibold mb-3">AI Recommendations</h3>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {aiInsights.map((insight) => {
            const Icon = iconMap[insight.icon] ?? Zap;
            const colorClass = categoryColors[insight.category] ?? categoryColors.hook;

            return (
              <Card
                key={insight.id}
                className="p-4 border border-border flex flex-col"
                data-testid={`insight-${insight.id}`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={`rounded-lg p-2 ${colorClass}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold">{insight.title}</h4>
                    <div className="flex items-center gap-1 mt-1">
                      {insight.platforms.map((p) => (
                        <PlatformIcon
                          key={p}
                          platform={p as PlatformKey}
                          className="h-3 w-3"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground flex-1">
                  {insight.body}
                </p>
                <div className="mt-3 pt-3 border-t border-border flex items-center gap-2">
                  <button
                    className="inline-flex items-center justify-center rounded-md text-xs font-medium h-7 px-3 hover:bg-accent hover:text-accent-foreground transition-colors"
                    data-testid={`insight-apply-${insight.id}`}
                  >
                    Apply Suggestion
                  </button>
                  <button
                    className="inline-flex items-center justify-center rounded-md text-xs font-medium h-7 px-3 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    data-testid={`insight-details-${insight.id}`}
                  >
                    View Details
                    <ArrowUpRight className="h-3 w-3 ml-1" />
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Trending Topics */}
      <Card className="p-4 border border-border" data-testid="trending-topics">
        <h3 className="text-sm font-semibold mb-3">
          Trending Topics — Ventura County
        </h3>
        <p className="text-xs text-muted-foreground mb-4">
          Real estate topics trending in your area that could be leveraged for content
        </p>
        <div className="space-y-2">
          {trendingTopics.map((topic) => (
            <div
              key={topic.topic}
              className="flex items-center justify-between rounded-md border border-border px-3 py-2"
            >
              <span className="text-sm">{topic.topic}</span>
              <div className="flex items-center gap-2">
                <Badge
                  variant={topic.volume === "High" ? "default" : "secondary"}
                  className="text-[10px] h-5"
                >
                  {topic.volume}
                </Badge>
                {topic.trend === "up" && (
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
