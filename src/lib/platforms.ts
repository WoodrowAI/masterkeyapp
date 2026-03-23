import { SiYoutube, SiInstagram, SiTiktok, SiFacebook } from "react-icons/si";

export type PlatformKey = "youtube" | "instagram" | "tiktok" | "facebook";

export const platforms: Record<
  PlatformKey,
  { name: string; color: string; chartVar: string; icon: typeof SiYoutube }
> = {
  youtube: {
    name: "YouTube",
    color: "oklch(0.65 0.12 190)",
    chartVar: "var(--color-youtube)",
    icon: SiYoutube,
  },
  instagram: {
    name: "Instagram",
    color: "oklch(0.60 0.15 300)",
    chartVar: "var(--color-instagram)",
    icon: SiInstagram,
  },
  tiktok: {
    name: "TikTok",
    color: "oklch(0.65 0.18 340)",
    chartVar: "var(--color-tiktok)",
    icon: SiTiktok,
  },
  facebook: {
    name: "Facebook",
    color: "oklch(0.60 0.14 240)",
    chartVar: "var(--color-facebook)",
    icon: SiFacebook,
  },
};

export const platformKeys: PlatformKey[] = [
  "youtube",
  "instagram",
  "tiktok",
  "facebook",
];
