"use client";
import { createContext, useContext, useState, useCallback } from "react";
import { platformKeys, type PlatformKey } from "@/lib/platforms";

interface ActivePlatformsContextValue {
  activePlatforms: PlatformKey[];
  togglePlatform: (p: PlatformKey) => void;
}

const ActivePlatformsContext = createContext<ActivePlatformsContextValue>({
  activePlatforms: [...platformKeys],
  togglePlatform: () => undefined,
});

export function useActivePlatforms() {
  return useContext(ActivePlatformsContext);
}

export function ActivePlatformsProvider({ children }: { children: React.ReactNode }) {
  const [activePlatforms, setActivePlatforms] = useState<PlatformKey[]>([...platformKeys]);

  const togglePlatform = useCallback((p: PlatformKey) => {
    setActivePlatforms((prev) => {
      if (prev.includes(p)) {
        if (prev.length === 1) return prev;
        return prev.filter((x) => x !== p);
      }
      return [...prev, p];
    });
  }, []);

  return (
    <ActivePlatformsContext.Provider value={{ activePlatforms, togglePlatform }}>
      {children}
    </ActivePlatformsContext.Provider>
  );
}
