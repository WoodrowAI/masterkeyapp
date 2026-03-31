"use client";

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider, useTheme } from "@/components/theme-provider";
import { AppSidebar } from "@/components/app-sidebar";
import { DateRangeSelector } from "@/components/date-range-selector";
import { Separator } from "@/components/ui/separator";
import { Moon, Sun } from "lucide-react";
import { DateRangeProvider, useDateRange } from "@/lib/date-range-context";
import { ActivePlatformsProvider, useActivePlatforms } from "@/lib/active-platforms-context";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      data-testid="theme-toggle"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

function LayoutInner({ children }: { children: React.ReactNode }) {
  const { activePlatforms, togglePlatform } = useActivePlatforms();
  const { dateRange, setDateRange } = useDateRange();

  return (
    <SidebarProvider>
      <AppSidebar activePlatforms={activePlatforms} togglePlatform={togglePlatform} />
      <SidebarInset>
        <header className="flex h-12 items-center gap-2 border-b border-border px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-5" />
          <div className="flex-1" />
          <DateRangeSelector value={dateRange} onValueChange={(v) => setDateRange(v as import("@/lib/date-range-context").DateRangeKey)} />
          <ThemeToggle />
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <DateRangeProvider>
        <ActivePlatformsProvider>
          <LayoutInner>{children}</LayoutInner>
        </ActivePlatformsProvider>
      </DateRangeProvider>
    </ThemeProvider>
  );
}
