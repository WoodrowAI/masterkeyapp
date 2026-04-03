// ─── Date range utilities ───
// Today is treated as Apr 3, 2026 (current date for this project)
const TODAY = new Date("2026-04-03T23:59:59.999Z");

export function getDateRange(rangeKey: string): { start: Date; end: Date } {
  const end = new Date(TODAY);
  const start = new Date(TODAY);

  switch (rangeKey) {
    case "1D":
      start.setUTCDate(start.getUTCDate() - 1);
      break;
    case "7D":
      start.setUTCDate(start.getUTCDate() - 7);
      break;
    case "30D":
    case "Custom":
      start.setUTCDate(start.getUTCDate() - 30);
      break;
    case "90D":
      start.setUTCDate(start.getUTCDate() - 90);
      break;
    case "1Y":
      start.setUTCDate(start.getUTCDate() - 365);
      break;
    default:
      start.setUTCDate(start.getUTCDate() - 30);
  }

  return { start, end };
}

/**
 * Generic filter that keeps items where item[dateKey] (a "YYYY-MM-DD" string)
 * falls within the date range computed from rangeKey.
 */
export function filterByDateRange<T extends Record<string, unknown>>(
  items: T[],
  dateKey: string,
  rangeKey: string
): T[] {
  const { start, end } = getDateRange(rangeKey);
  return items.filter((item) => {
    const raw = item[dateKey];
    if (typeof raw !== "string") return false;
    const d = new Date(raw + "T00:00:00.000Z");
    return d >= start && d <= end;
  });
}

/**
 * Returns a human-readable label for the date range, e.g. "7d", "30d".
 */
export function getDateRangeLabel(rangeKey: string): string {
  switch (rangeKey) {
    case "1D": return "1d";
    case "7D": return "7d";
    case "30D": return "30d";
    case "90D": return "90d";
    case "1Y": return "1y";
    case "Custom": return "custom";
    default: return "30d";
  }
}

/**
 * Returns number of days in the selected range.
 */
export function getDaysInRange(rangeKey: string): number {
  switch (rangeKey) {
    case "1D": return 1;
    case "7D": return 7;
    case "30D": return 30;
    case "90D": return 90;
    case "1Y": return 365;
    case "Custom": return 30;
    default: return 30;
  }
}
