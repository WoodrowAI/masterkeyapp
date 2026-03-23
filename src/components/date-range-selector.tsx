"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const ranges = [
  { value: "1D", label: "1D" },
  { value: "7D", label: "7D" },
  { value: "30D", label: "30D" },
  { value: "90D", label: "90D" },
  { value: "1Y", label: "1Y" },
  { value: "Custom", label: "Custom" },
];

interface DateRangeSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function DateRangeSelector({ value, onValueChange }: DateRangeSelectorProps) {
  return (
    <ToggleGroup
      value={[value]}
      onValueChange={(newValue) => {
        // When toggling, find the newly added value
        const added = newValue.find((v) => v !== value);
        if (added) {
          onValueChange(added);
        }
      }}
      className="gap-0 rounded-lg border border-border bg-muted/50 p-0.5"
      data-testid="date-range-selector"
    >
      {ranges.map((r) => (
        <ToggleGroupItem
          key={r.value}
          value={r.value}
          data-testid={`date-range-${r.value}`}
          className="rounded-md px-2.5 py-1 text-xs font-medium data-[pressed]:bg-background data-[pressed]:shadow-sm"
        >
          {r.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
