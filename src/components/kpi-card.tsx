"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

interface KPICardProps {
  title: string;
  value: string | number;
  delta?: number;
  sparklineData?: number[];
  prefix?: string;
  suffix?: string;
  testId?: string;
}

export function KPICard({
  title,
  value,
  delta,
  sparklineData,
  prefix,
  suffix,
  testId,
}: KPICardProps) {
  const isPositive = delta !== undefined && delta >= 0;
  const sparkData = sparklineData?.map((v, i) => ({ i, v }));

  return (
    <Card
      className="relative overflow-hidden p-4 border border-border"
      data-testid={testId}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1 flex-1">
          <p className="text-xs font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-1">
            {prefix && (
              <span className="text-sm text-muted-foreground">{prefix}</span>
            )}
            <span
              className="text-xl font-semibold tabular-nums"
              style={{ fontVariantNumeric: "tabular-nums lining-nums" }}
            >
              {typeof value === "number" ? value.toLocaleString() : value}
            </span>
            {suffix && (
              <span className="text-sm text-muted-foreground">{suffix}</span>
            )}
          </div>
          {delta !== undefined && (
            <div
              className={cn(
                "inline-flex items-center gap-0.5 text-xs font-medium",
                isPositive ? "text-emerald-500" : "text-red-500"
              )}
            >
              {isPositive ? (
                <ArrowUpRight className="h-3 w-3" />
              ) : (
                <ArrowDownRight className="h-3 w-3" />
              )}
              <span
                className="tabular-nums"
                style={{ fontVariantNumeric: "tabular-nums lining-nums" }}
              >
                {Math.abs(delta).toFixed(1)}%
              </span>
              <span className="text-muted-foreground ml-0.5">vs prev.</span>
            </div>
          )}
        </div>
        {sparkData && sparkData.length > 0 && (
          <div className="h-10 w-20 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparkData}>
                <defs>
                  <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="var(--color-primary)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--color-primary)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke="var(--color-primary)"
                  fill="url(#sparkGrad)"
                  strokeWidth={1.5}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </Card>
  );
}
