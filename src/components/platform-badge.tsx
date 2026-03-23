"use client";

import { platforms, type PlatformKey } from "@/lib/platforms";
import { cn } from "@/lib/utils";

interface PlatformBadgeProps {
  platform: PlatformKey;
  active?: boolean;
  onClick?: () => void;
  size?: "sm" | "md";
}

export function PlatformBadge({
  platform,
  active = true,
  onClick,
  size = "md",
}: PlatformBadgeProps) {
  const p = platforms[platform];
  const Icon = p.icon;

  return (
    <button
      data-testid={`platform-badge-${platform}`}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border transition-all",
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1.5 text-sm",
        active
          ? "border-sidebar-primary/40 bg-sidebar-primary/15 text-sidebar-foreground font-medium"
          : "border-sidebar-border bg-sidebar-accent/30 text-sidebar-foreground/50"
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      <span className="font-medium">{p.name}</span>
    </button>
  );
}

export function PlatformIcon({
  platform,
  className,
}: {
  platform: PlatformKey;
  className?: string;
}) {
  const p = platforms[platform];
  const Icon = p.icon;
  return <Icon className={cn("h-4 w-4", className)} style={{ color: p.color }} />;
}
