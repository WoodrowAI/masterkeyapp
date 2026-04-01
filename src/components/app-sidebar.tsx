"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PlayCircle,
  Filter,
  BarChart3,
  Lightbulb,
  Magnet,
  Megaphone,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { PlatformBadge } from "@/components/platform-badge";
import { PerplexityAttribution } from "@/components/perplexity-attribution";
import { platformKeys, type PlatformKey } from "@/lib/platforms";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/videos", label: "Video Performance", icon: PlayCircle },
  { href: "/funnel", label: "Funnel Analysis", icon: Filter },
  { href: "/leads", label: "Lead Magnets", icon: Magnet },
  { href: "/ads", label: "Ads", icon: Megaphone },
  { href: "/posthog", label: "PostHog", icon: BarChart3 },
  { href: "/insights", label: "AI Insights", icon: Lightbulb },
  { href: "/settings", label: "Settings", icon: Settings },
];

function MasterkeyLogo() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-sidebar-primary"
      aria-label="Masterkey logo"
    >
      <circle cx="11" cy="10" r="6" />
      <circle cx="11" cy="10" r="2.5" strokeWidth="1.5" />
      <line x1="17" y1="10" x2="30" y2="10" />
      <line x1="24" y1="10" x2="24" y2="15" />
      <line x1="28" y1="10" x2="28" y2="14" />
    </svg>
  );
}

interface AppSidebarProps {
  activePlatforms: PlatformKey[];
  togglePlatform: (p: PlatformKey) => void;
}

export function AppSidebar({ activePlatforms, togglePlatform }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-2.5" data-testid="sidebar-logo">
          <MasterkeyLogo />
          <div>
            <div className="text-sm font-semibold tracking-tight text-sidebar-foreground">
              Masterkey
            </div>
            <div className="text-[10px] font-medium text-sidebar-foreground/50 uppercase tracking-widest">
              Analytics
            </div>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  render={<Link href={item.href} data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`} />}
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Platforms</SidebarGroupLabel>
          <div className="flex flex-wrap gap-1.5 px-2 pt-1">
            {platformKeys.map((pk) => (
              <PlatformBadge
                key={pk}
                platform={pk}
                active={activePlatforms.includes(pk)}
                onClick={() => togglePlatform(pk)}
                size="sm"
              />
            ))}
          </div>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-2 pb-2">
        <PerplexityAttribution />
      </SidebarFooter>
    </Sidebar>
  );
}
