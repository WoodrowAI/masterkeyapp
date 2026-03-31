"use client";

import { createContext, useContext, useState } from "react";

export type DateRangeKey = "1D" | "7D" | "30D" | "90D" | "1Y" | "Custom";

interface DateRangeContextValue {
  dateRange: DateRangeKey;
  setDateRange: (range: DateRangeKey) => void;
}

const DateRangeContext = createContext<DateRangeContextValue>({
  dateRange: "30D",
  setDateRange: () => undefined,
});

export function useDateRange() {
  return useContext(DateRangeContext);
}

export function DateRangeProvider({ children }: { children: React.ReactNode }) {
  const [dateRange, setDateRange] = useState<DateRangeKey>("30D");

  return (
    <DateRangeContext.Provider value={{ dateRange, setDateRange: setDateRange as (range: DateRangeKey) => void }}>
      {children}
    </DateRangeContext.Provider>
  );
}
