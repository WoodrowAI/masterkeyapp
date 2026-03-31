# Time Range Filtering — Implementation Summary

## Overview

Wired up functional time range filtering for the Next.js analytics dashboard. The 1D / 7D / 30D / 90D / 1Y / Custom buttons now filter all time-series data on the Dashboard and PostHog pages.

---

## Files Created

### `src/lib/date-range-context.tsx`
- Exports a `DateRangeKey` type (`"1D" | "7D" | "30D" | "90D" | "1Y" | "Custom"`)
- Exports a `DateRangeProvider` component that holds `dateRange` state (default `"30D"`)
- Exports a `useDateRange()` hook for consuming the context in any child component
- The context lives at the layout level and is accessible to all pages

### `src/lib/date-utils.ts`
- `getDateRange(rangeKey)` — returns `{ start: Date; end: Date }` using today = Mar 31, 2026. Maps 1D → -1 day, 7D → -7 days, 30D/Custom → -30 days, 90D → -90 days, 1Y → -365 days.
- `filterByDateRange<T>(items, dateKey, rangeKey)` — generic filter that keeps items whose `dateKey` field (a `"YYYY-MM-DD"` string) falls within the computed date range
- `getDateRangeLabel(rangeKey)` — returns human-readable label, e.g. `"7d"`, `"30d"`
- `getDaysInRange(rangeKey)` — returns the integer number of days in the range

---

## Files Modified

### `src/components/client-layout.tsx`
- Imported `DateRangeProvider` and `useDateRange` from the new context
- Removed local `dateRange` useState — state now lives in `DateRangeProvider`
- Wrapped `<LayoutInner>` in `<DateRangeProvider>` inside `<ClientLayout>`
- `LayoutInner` now calls `useDateRange()` to get `dateRange`/`setDateRange`
- `DateRangeSelector` passes `onValueChange` as a cast wrapper (`v as DateRangeKey`) to satisfy TypeScript

### `src/lib/mock-data.ts`
Added six new exported functions at the end of the file (all existing exports are preserved):

| Function | Description |
|---|---|
| `getFilteredDailyViewsCombined(rangeKey)` | Returns `dailyViewsCombined` filtered by date |
| `getFilteredKPIs(activePlatforms, rangeKey)` | Sums KPIs (views, watch time, engagement, followers, avg duration, CTR) from filtered daily metrics |
| `getFilteredTopContent(rangeKey)` | Returns `topContent` filtered by `publishedDate` |
| `getFilteredEngagement(rangeKey)` | Returns engagement-by-platform chart data from the filtered period |
| `getFilteredSparklineData(metricKey, rangeKey, platform?)` | Returns sparkline numbers for the filtered period |
| `getFilteredPosthogSessions(rangeKey)` | Returns `posthogSessions` filtered by date |

### `src/app/page.tsx` (Dashboard)
- Added `useDateRange()` hook
- Replaced `getAggregatedKPIs` → `getFilteredKPIs(activePlatforms, dateRange)`
- Replaced `dailyViewsCombined` → `getFilteredDailyViewsCombined(dateRange)`
- Replaced `getEngagementByPlatform()` → `getFilteredEngagement(dateRange)`
- Replaced `getSparklineData("views")` → `getFilteredSparklineData("views", dateRange)`
- Added `filteredTopContent` computed from `getFilteredTopContent(dateRange)` with empty-state row when no content falls in the range
- All `useMemo` dependencies now include `dateRange`

### `src/app/posthog/page.tsx`
- Added `useDateRange()` hook
- All session-based KPIs (totalSessions, totalUniqueVisitors, totalPageviews, avgBounceRate, avgSessionDuration) now computed from `getFilteredPosthogSessions(dateRange)`
- Sessions chart data and sparkline computed from filtered sessions
- Sessions KPI card title is dynamic: `"Sessions (7d)"`, `"Sessions (30d)"`, etc.
- Added a yellow warning banner when the selected range exceeds 30 days (granular session data limit)
- Static tables (landing pages, user paths, events, devices, browsers, UTM sources) remain unchanged — they represent full-period aggregates with no date field

---

## Pages Left Unchanged

- **`/src/app/videos/page.tsx`** — Video retention data is per-video, not time-series. No filtering applied.
- **`/src/app/funnel/page.tsx`** — Funnel data is aggregate totals representing the full attribution window. No filtering applied.
- **`/src/app/insights/page.tsx`** — Static AI analysis. No filtering applied.

---

## Build Status

`npm run build` passes with zero TypeScript errors. All 6 static pages generated successfully.
