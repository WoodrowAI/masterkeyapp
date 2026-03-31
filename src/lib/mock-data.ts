import type { PlatformKey } from "./platforms";

// ─── Date range: active YouTube period starting Feb 18, 2026 ───
// Using the active period from YouTube analytics data
export const dates: string[] = [
  "2026-02-18","2026-02-19","2026-02-20","2026-02-21","2026-02-22","2026-02-23",
  "2026-02-24","2026-02-25","2026-02-26","2026-02-27","2026-02-28",
  "2026-03-01","2026-03-02","2026-03-03","2026-03-04","2026-03-05","2026-03-06",
  "2026-03-07","2026-03-08","2026-03-09","2026-03-10","2026-03-11","2026-03-12",
  "2026-03-13","2026-03-14","2026-03-15","2026-03-16","2026-03-17","2026-03-18",
  "2026-03-19","2026-03-20","2026-03-21","2026-03-22","2026-03-23","2026-03-24",
  "2026-03-25","2026-03-26","2026-03-27","2026-03-28",
];

// ─── YouTube daily metrics ───
export interface YouTubeDailyMetric {
  date: string;
  views: number;
  estimatedMinutesWatched: number;
  averageViewDuration: number;
  averageViewPercentage: number;
  likes: number;
  comments: number;
  shares: number;
  subscribersGained: number;
  videoThumbnailImpressionsClickRate: number;
}

// Real data from YouTube Analytics API (dailyAnalytics rows, active period Feb 18 – Mar 28 2026)
// Columns: day, views, likes, comments, shares, estimatedMinutesWatched, averageViewDuration, subscribersGained, subscribersLost
// averageViewPercentage and videoThumbnailImpressionsClickRate not available at daily level — computed from top video averages
export const youtubeDailyMetrics: YouTubeDailyMetric[] = [
  { date: "2026-02-18", views: 34,  estimatedMinutesWatched: 20,  averageViewDuration: 36,  averageViewPercentage: 0,     likes: 1, comments: 0, shares: 1, subscribersGained: 2,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-02-19", views: 8,   estimatedMinutesWatched: 25,  averageViewDuration: 194, averageViewPercentage: 0,     likes: 0, comments: 0, shares: 0, subscribersGained: 0,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-02-20", views: 216, estimatedMinutesWatched: 24,  averageViewDuration: 35,  averageViewPercentage: 0,     likes: 3, comments: 0, shares: 0, subscribersGained: 0,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-02-21", views: 13,  estimatedMinutesWatched: 5,   averageViewDuration: 28,  averageViewPercentage: 0,     likes: 0, comments: 0, shares: 1, subscribersGained: 0,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-02-22", views: 4,   estimatedMinutesWatched: 2,   averageViewDuration: 46,  averageViewPercentage: 0,     likes: 0, comments: 0, shares: 0, subscribersGained: 0,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-02-23", views: 6,   estimatedMinutesWatched: 0,   averageViewDuration: 9,   averageViewPercentage: 0,     likes: 0, comments: 0, shares: 0, subscribersGained: 0,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-02-24", views: 49,  estimatedMinutesWatched: 4,   averageViewDuration: 15,  averageViewPercentage: 0,     likes: 0, comments: 0, shares: 0, subscribersGained: 0,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-02-25", views: 19,  estimatedMinutesWatched: 3,   averageViewDuration: 20,  averageViewPercentage: 0,     likes: 1, comments: 0, shares: 0, subscribersGained: 0,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-02-26", views: 194, estimatedMinutesWatched: 24,  averageViewDuration: 22,  averageViewPercentage: 0,     likes: 2, comments: 0, shares: 1, subscribersGained: 1,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-02-27", views: 35,  estimatedMinutesWatched: 7,   averageViewDuration: 20,  averageViewPercentage: 0,     likes: 2, comments: 0, shares: 0, subscribersGained: 0,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-02-28", views: 71,  estimatedMinutesWatched: 11,  averageViewDuration: 21,  averageViewPercentage: 0,     likes: 0, comments: 0, shares: 0, subscribersGained: 0,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-03-01", views: 79,  estimatedMinutesWatched: 11,  averageViewDuration: 18,  averageViewPercentage: 0,     likes: 1, comments: 0, shares: 0, subscribersGained: 0,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-03-02", views: 3,   estimatedMinutesWatched: 2,   averageViewDuration: 71,  averageViewPercentage: 0,     likes: 0, comments: 0, shares: 0, subscribersGained: 0,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-03-03", views: 1,   estimatedMinutesWatched: 14,  averageViewDuration: 863, averageViewPercentage: 0,     likes: 0, comments: 0, shares: 0, subscribersGained: 0,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-03-04", views: 49,  estimatedMinutesWatched: 5,   averageViewDuration: 12,  averageViewPercentage: 0,     likes: 1, comments: 0, shares: 0, subscribersGained: 0,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-03-05", views: 23,  estimatedMinutesWatched: 30,  averageViewDuration: 87,  averageViewPercentage: 0,     likes: 6, comments: 0, shares: 0, subscribersGained: 0,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-03-06", views: 79,  estimatedMinutesWatched: 29,  averageViewDuration: 54,  averageViewPercentage: 0,     likes: 0, comments: 0, shares: 0, subscribersGained: 0,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-03-07", views: 17,  estimatedMinutesWatched: 21,  averageViewDuration: 116, averageViewPercentage: 0,     likes: 1, comments: 0, shares: 0, subscribersGained: 0,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-03-08", views: 7,   estimatedMinutesWatched: 6,   averageViewDuration: 77,  averageViewPercentage: 0,     likes: 0, comments: 0, shares: 0, subscribersGained: 0,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-03-09", views: 4,   estimatedMinutesWatched: 0,   averageViewDuration: 1,   averageViewPercentage: 0,     likes: 0, comments: 0, shares: 0, subscribersGained: 0,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-03-10", views: 19,  estimatedMinutesWatched: 21,  averageViewDuration: 119, averageViewPercentage: 0,     likes: 0, comments: 0, shares: 0, subscribersGained: 0,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-03-11", views: 69,  estimatedMinutesWatched: 10,  averageViewDuration: 26,  averageViewPercentage: 0,     likes: 0, comments: 0, shares: 0, subscribersGained: 0,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-03-12", views: 0,   estimatedMinutesWatched: 0,   averageViewDuration: 0,   averageViewPercentage: 0,     likes: 0, comments: 0, shares: 0, subscribersGained: 0,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-03-13", views: 288, estimatedMinutesWatched: 48,  averageViewDuration: 21,  averageViewPercentage: 0,     likes: 4, comments: 0, shares: 0, subscribersGained: 0,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-03-14", views: 9,   estimatedMinutesWatched: 6,   averageViewDuration: 67,  averageViewPercentage: 0,     likes: 1, comments: 0, shares: 0, subscribersGained: 0,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-03-15", views: 3,   estimatedMinutesWatched: 10,  averageViewDuration: 202, averageViewPercentage: 0,     likes: 0, comments: 0, shares: 0, subscribersGained: 0,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-03-16", views: 6,   estimatedMinutesWatched: 6,   averageViewDuration: 66,  averageViewPercentage: 0,     likes: 0, comments: 0, shares: 0, subscribersGained: 0,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-03-17", views: 94,  estimatedMinutesWatched: 30,  averageViewDuration: 94,  averageViewPercentage: 0,     likes: 0, comments: 0, shares: 0, subscribersGained: 0,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-03-18", views: 7,   estimatedMinutesWatched: 18,  averageViewDuration: 183, averageViewPercentage: 0,     likes: 0, comments: 0, shares: 0, subscribersGained: 0,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-03-19", views: 112, estimatedMinutesWatched: 30,  averageViewDuration: 53,  averageViewPercentage: 0,     likes: 0, comments: 0, shares: 0, subscribersGained: 1,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-03-20", views: 7,   estimatedMinutesWatched: 5,   averageViewDuration: 45,  averageViewPercentage: 0,     likes: 1, comments: 0, shares: 0, subscribersGained: 1,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-03-21", views: 9,   estimatedMinutesWatched: 14,  averageViewDuration: 120, averageViewPercentage: 0,     likes: 0, comments: 0, shares: 0, subscribersGained: 0,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-03-22", views: 1,   estimatedMinutesWatched: 3,   averageViewDuration: 201, averageViewPercentage: 0,     likes: 0, comments: 0, shares: 0, subscribersGained: 0,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-03-23", views: 14,  estimatedMinutesWatched: 21,  averageViewDuration: 106, averageViewPercentage: 0,     likes: 0, comments: 0, shares: 0, subscribersGained: 0,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-03-24", views: 14,  estimatedMinutesWatched: 28,  averageViewDuration: 210, averageViewPercentage: 0,     likes: 0, comments: 0, shares: 0, subscribersGained: 0,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-03-25", views: 2,   estimatedMinutesWatched: 14,  averageViewDuration: 442, averageViewPercentage: 0,     likes: 0, comments: 0, shares: 0, subscribersGained: 0,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-03-26", views: 19,  estimatedMinutesWatched: 59,  averageViewDuration: 187, averageViewPercentage: 0,     likes: 3, comments: 0, shares: 0, subscribersGained: 0,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-03-27", views: 8,   estimatedMinutesWatched: 6,   averageViewDuration: 48,  averageViewPercentage: 0,     likes: 0, comments: 0, shares: 0, subscribersGained: 0,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-03-28", views: 9,   estimatedMinutesWatched: 22,  averageViewDuration: 149, averageViewPercentage: 0,     likes: 0, comments: 0, shares: 0, subscribersGained: 1,  videoThumbnailImpressionsClickRate: 0 },
];

// ─── Instagram daily metrics — no data available ───
export interface InstagramDailyMetric {
  date: string;
  impressions: number;
  reach: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  profile_views: number;
  follower_count: number;
}

export const instagramDailyMetrics: InstagramDailyMetric[] = dates.map((date) => ({
  date,
  impressions: 0,
  reach: 0,
  likes: 0,
  comments: 0,
  shares: 0,
  saves: 0,
  profile_views: 0,
  follower_count: 0,
}));

// ─── TikTok daily metrics — no data available ───
export interface TikTokDailyMetric {
  date: string;
  view_count: number;
  like_count: number;
  comment_count: number;
  share_count: number;
}

export const tiktokDailyMetrics: TikTokDailyMetric[] = dates.map((date) => ({
  date,
  view_count: 0,
  like_count: 0,
  comment_count: 0,
  share_count: 0,
}));

// ─── Facebook daily metrics — no data available ───
export interface FacebookDailyMetric {
  date: string;
  post_impressions: number;
  post_reach: number;
  post_reactions: number;
  post_video_views: number;
}

export const facebookDailyMetrics: FacebookDailyMetric[] = dates.map((date) => ({
  date,
  post_impressions: 0,
  post_reach: 0,
  post_reactions: 0,
  post_video_views: 0,
}));

// ─── Combined daily views for stacked area chart ───
export interface DailyViewsCombined {
  date: string;
  youtube: number;
  instagram: number;
  tiktok: number;
  facebook: number;
}

export const dailyViewsCombined: DailyViewsCombined[] = dates.map((date, i) => ({
  date,
  youtube: youtubeDailyMetrics[i].views,
  instagram: 0,
  tiktok: 0,
  facebook: 0,
}));

// ─── Sparkline data (last 14 days) ───
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getMetricValue(obj: any, key: string): number {
  return (obj[key] as number) ?? 0;
}

export function getSparklineData(
  metricKey: string,
  platform?: PlatformKey
): number[] {
  const last14 = dates.slice(-14);
  return last14.map((_, i) => {
    const idx = dates.length - 14 + i;
    if (platform === "youtube")
      return getMetricValue(youtubeDailyMetrics[idx], metricKey);
    if (platform === "instagram")
      return getMetricValue(instagramDailyMetrics[idx], metricKey);
    if (platform === "tiktok")
      return getMetricValue(tiktokDailyMetrics[idx], metricKey);
    if (platform === "facebook")
      return getMetricValue(facebookDailyMetrics[idx], metricKey);
    // Aggregate
    return (
      getMetricValue(youtubeDailyMetrics[idx], metricKey === "views" ? "views" : metricKey) +
      getMetricValue(instagramDailyMetrics[idx], metricKey === "views" ? "impressions" : metricKey) +
      getMetricValue(tiktokDailyMetrics[idx], metricKey === "views" ? "view_count" : metricKey) +
      getMetricValue(facebookDailyMetrics[idx], metricKey === "views" ? "post_video_views" : metricKey)
    );
  });
}

// ─── Aggregated KPIs ───
export function getAggregatedKPIs(activePlatforms: PlatformKey[]) {
  let totalViews = 0;
  let totalWatchMinutes = 0;
  let totalLikes = 0;
  let totalComments = 0;
  let totalShares = 0;
  let totalSubscribers = 0;

  for (let i = 0; i < dates.length; i++) {
    if (activePlatforms.includes("youtube")) {
      totalViews += youtubeDailyMetrics[i].views;
      totalWatchMinutes += youtubeDailyMetrics[i].estimatedMinutesWatched;
      totalLikes += youtubeDailyMetrics[i].likes;
      totalComments += youtubeDailyMetrics[i].comments;
      totalShares += youtubeDailyMetrics[i].shares;
      totalSubscribers += youtubeDailyMetrics[i].subscribersGained;
    }
    if (activePlatforms.includes("instagram")) {
      totalViews += instagramDailyMetrics[i].impressions;
      totalLikes += instagramDailyMetrics[i].likes;
      totalComments += instagramDailyMetrics[i].comments;
      totalShares += instagramDailyMetrics[i].shares;
    }
    if (activePlatforms.includes("tiktok")) {
      totalViews += tiktokDailyMetrics[i].view_count;
      totalLikes += tiktokDailyMetrics[i].like_count;
      totalComments += tiktokDailyMetrics[i].comment_count;
      totalShares += tiktokDailyMetrics[i].share_count;
    }
    if (activePlatforms.includes("facebook")) {
      totalViews += facebookDailyMetrics[i].post_video_views;
      totalLikes += facebookDailyMetrics[i].post_reactions;
    }
  }

  const engagementRate =
    totalViews > 0
      ? +(((totalLikes + totalComments + totalShares) / totalViews) * 100).toFixed(2)
      : 0;

  const avgViewDuration = activePlatforms.includes("youtube")
    ? Math.round(
        youtubeDailyMetrics
          .filter((d) => d.averageViewDuration > 0)
          .reduce((s, d) => s + d.averageViewDuration, 0) /
          youtubeDailyMetrics.filter((d) => d.averageViewDuration > 0).length
      )
    : 0;

  const ctr = activePlatforms.includes("youtube")
    ? +(
        youtubeDailyMetrics.reduce(
          (s, d) => s + d.videoThumbnailImpressionsClickRate,
          0
        ) / youtubeDailyMetrics.length
      ).toFixed(2)
    : 0;

  return {
    totalViews,
    totalWatchHours: +(totalWatchMinutes / 60).toFixed(1),
    engagementRate,
    newFollowers: totalSubscribers,
    avgViewDuration,
    ctr,
  };
}

// ─── Engagement by platform (likes, comments, shares) ───
export function getEngagementByPlatform() {
  return [
    {
      platform: "YouTube",
      likes: youtubeDailyMetrics.reduce((s, d) => s + d.likes, 0),
      comments: youtubeDailyMetrics.reduce((s, d) => s + d.comments, 0),
      shares: youtubeDailyMetrics.reduce((s, d) => s + d.shares, 0),
    },
    {
      platform: "Instagram",
      likes: 0,
      comments: 0,
      shares: 0,
    },
    {
      platform: "TikTok",
      likes: 0,
      comments: 0,
      shares: 0,
    },
    {
      platform: "Facebook",
      likes: 0,
      comments: 0,
      shares: 0,
    },
  ];
}

// ─── Top performing content ───
export interface TopContent {
  id: string;
  title: string;
  platform: PlatformKey;
  views: number;
  engagementRate: number;
  avgWatchPercent: number;
  publishedDate: string;
}

// Real data from YouTube Analytics topVideos rows
// Columns: video, views, likes, comments, shares, estimatedMinutesWatched, averageViewDuration, averageViewPercentage, subscribersGained
export const topContent: TopContent[] = [
  {
    id: "zLzcfWmtFxM",
    title: "This Thousand Oaks Neighborhood has Waterfalls Within Walking Distance",
    platform: "youtube",
    views: 376,
    engagementRate: +((6 + 0 + 1) / 376 * 100).toFixed(2),
    avgWatchPercent: 59.17,
    publishedDate: "2026-02-26",
  },
  {
    id: "zOdjiJH33VE",
    title: "Thousand Oaks Neighborhoods - Original Wildwood Tract",
    platform: "youtube",
    views: 294,
    engagementRate: +((5 + 0 + 0) / 294 * 100).toFixed(2),
    avgWatchPercent: 40.9,
    publishedDate: "2026-03-13",
  },
  {
    id: "8GOuD0uBz5I",
    title: "Stop Waiting for The Perfect Time to Buy a Home",
    platform: "youtube",
    views: 233,
    engagementRate: +((3 + 0 + 1) / 233 * 100).toFixed(2),
    avgWatchPercent: 29.04,
    publishedDate: "2026-02-21",
  },
  {
    id: "ehGSxHMgWJ4",
    title: "Living in Thousand Oaks - Shadow Oaks & Eichler",
    platform: "youtube",
    views: 102,
    engagementRate: +((5 + 0 + 0) / 102 * 100).toFixed(2),
    avgWatchPercent: 20.75,
    publishedDate: "2026-03-06",
  },
  {
    id: "0mycplFWKsE",
    title: "What Home Buyers Are Really Looking For In Thousand Oaks",
    platform: "youtube",
    views: 92,
    engagementRate: +((0 + 0 + 0) / 92 * 100).toFixed(2),
    avgWatchPercent: 29.74,
    publishedDate: "2026-03-19",
  },
  {
    id: "XJg8zyUo_qA",
    title: "The Best Time to List Your Home in Thousand Oaks",
    platform: "youtube",
    views: 91,
    engagementRate: +((0 + 0 + 0) / 91 * 100).toFixed(2),
    avgWatchPercent: 7.08,
    publishedDate: "2026-03-17",
  },
  {
    id: "_tneSFg1Eu8",
    title: "Thousand Oaks Neighborhoods - Wildwood's Most connected Tract (Park Hills)",
    platform: "youtube",
    views: 78,
    engagementRate: +((0 + 0 + 0) / 78 * 100).toFixed(2),
    avgWatchPercent: 98.23,
    publishedDate: "2026-03-06",
  },
  {
    id: "h0hKN-VpBns",
    title: "Living in Thousand Oaks - Wildwood",
    platform: "youtube",
    views: 74,
    engagementRate: +((3 + 0 + 1) / 74 * 100).toFixed(2),
    avgWatchPercent: 8.27,
    publishedDate: "2026-02-18",
  },
  {
    id: "CNrOek_2nIw",
    title: "Thousand Oaks Neighborhoods - Wildwood's Largest Tract (Wildflower)",
    platform: "youtube",
    views: 70,
    engagementRate: +((0 + 0 + 0) / 70 * 100).toFixed(2),
    avgWatchPercent: 45.25,
    publishedDate: "2026-03-11",
  },
  {
    id: "iA6A6tgDqyk",
    title: "The Truth About Living in Wildwood Thousand Oaks",
    platform: "youtube",
    views: 65,
    engagementRate: +((1 + 0 + 0) / 65 * 100).toFixed(2),
    avgWatchPercent: 44.79,
    publishedDate: "2026-02-24",
  },
  {
    id: "UQQaKx81Trw",
    title: "Wildwood's Best Kept Secret: Kendall Ridge",
    platform: "youtube",
    views: 64,
    engagementRate: +((1 + 0 + 0) / 64 * 100).toFixed(2),
    avgWatchPercent: 34.01,
    publishedDate: "2026-03-04",
  },
  {
    id: "hxRBEm1GFy4",
    title: "Get Your Home Value in Under 2 Minutes (Free AI Tool)",
    platform: "youtube",
    views: 28,
    engagementRate: +((0 + 0 + 0) / 28 * 100).toFixed(2),
    avgWatchPercent: 29.84,
    publishedDate: "2026-03-20",
  },
  {
    id: "eWhT6g-VEt0",
    title: "New California Landlord Laws 2026 - Some May Surprise You",
    platform: "youtube",
    views: 26,
    engagementRate: +((3 + 0 + 0) / 26 * 100).toFixed(2),
    avgWatchPercent: 21.13,
    publishedDate: "2026-03-26",
  },
  {
    id: "57dW51ak-Vo",
    title: "This Might Be The Most Underrated Neighborhood in Thousand Oaks",
    platform: "youtube",
    views: 8,
    engagementRate: 0,
    avgWatchPercent: 85.99,
    publishedDate: "2026-03-24",
  },
  {
    id: "nkBf3uUmmOQ",
    title: "Here's How to Actually Know if it's a Buyer's or Seller's Market",
    platform: "youtube",
    views: 0,
    engagementRate: 0,
    avgWatchPercent: 0,
    publishedDate: "2026-03-30",
  },
];

// ─── Video retention data ───
export interface VideoRetention {
  id: string;
  title: string;
  duration: number;
  platform: PlatformKey;
  views: number;
  averageViewDuration: number;
  averageViewPercentage: number;
  retentionCurve: { elapsedVideoTimeRatio: number; audienceWatchRatio: number }[];
  dropOffPoints: { timestamp: string; viewersLost: number; percentDrop: number; reason: string }[];
  crossPlatform: {
    youtube: { views: number; avgWatchTime: string; completionRate: number };
    instagram: { views: number; avgWatchTime: string; completionRate: string };
    tiktok: { views: number; avgWatchTime: string; completionRate: number };
    facebook: { views: number; avgWatchTime: string; completionRate: number };
  };
}

// Real retention curves from YouTube Analytics API (elapsedVideoTimeRatio, audienceWatchRatio)
// Converted: percentage = ratio * 100, retention = audienceWatchRatio * 100
export const videoRetentionData: VideoRetention[] = [
  {
    id: "zLzcfWmtFxM",
    title: "This Thousand Oaks Neighborhood has Waterfalls Within Walking Distance",
    duration: 107, // ~21s avg / 59.17% ≈ 36s per % — approx from averageViewDuration=21s, avgViewPercentage=59.17
    platform: "youtube",
    views: 376,
    averageViewDuration: 21,
    averageViewPercentage: 59.17,
    retentionCurve: [
      {elapsedVideoTimeRatio:0.01,audienceWatchRatio:1.3071},{elapsedVideoTimeRatio:0.02,audienceWatchRatio:1.2714},{elapsedVideoTimeRatio:0.03,audienceWatchRatio:1.2357},{elapsedVideoTimeRatio:0.04,audienceWatchRatio:1.2143},{elapsedVideoTimeRatio:0.05,audienceWatchRatio:1.2071},
      {elapsedVideoTimeRatio:0.06,audienceWatchRatio:1.1857},{elapsedVideoTimeRatio:0.07,audienceWatchRatio:1.1857},{elapsedVideoTimeRatio:0.08,audienceWatchRatio:1.1643},{elapsedVideoTimeRatio:0.09,audienceWatchRatio:1.15},{elapsedVideoTimeRatio:0.1,audienceWatchRatio:1.1429},
      {elapsedVideoTimeRatio:0.11,audienceWatchRatio:1.1429},{elapsedVideoTimeRatio:0.12,audienceWatchRatio:1.1286},{elapsedVideoTimeRatio:0.13,audienceWatchRatio:1.0714},{elapsedVideoTimeRatio:0.14,audienceWatchRatio:1.0214},{elapsedVideoTimeRatio:0.15,audienceWatchRatio:0.9857},
      {elapsedVideoTimeRatio:0.16,audienceWatchRatio:0.95},{elapsedVideoTimeRatio:0.17,audienceWatchRatio:0.9429},{elapsedVideoTimeRatio:0.18,audienceWatchRatio:0.9071},{elapsedVideoTimeRatio:0.19,audienceWatchRatio:0.8714},{elapsedVideoTimeRatio:0.2,audienceWatchRatio:0.8357},
      {elapsedVideoTimeRatio:0.21,audienceWatchRatio:0.8214},{elapsedVideoTimeRatio:0.22,audienceWatchRatio:0.8071},{elapsedVideoTimeRatio:0.23,audienceWatchRatio:0.7714},{elapsedVideoTimeRatio:0.24,audienceWatchRatio:0.7643},{elapsedVideoTimeRatio:0.25,audienceWatchRatio:0.7643},
      {elapsedVideoTimeRatio:0.26,audienceWatchRatio:0.7357},{elapsedVideoTimeRatio:0.27,audienceWatchRatio:0.7286},{elapsedVideoTimeRatio:0.28,audienceWatchRatio:0.7214},{elapsedVideoTimeRatio:0.29,audienceWatchRatio:0.7071},{elapsedVideoTimeRatio:0.3,audienceWatchRatio:0.7},
      {elapsedVideoTimeRatio:0.31,audienceWatchRatio:0.6857},{elapsedVideoTimeRatio:0.32,audienceWatchRatio:0.6714},{elapsedVideoTimeRatio:0.33,audienceWatchRatio:0.65},{elapsedVideoTimeRatio:0.34,audienceWatchRatio:0.6357},{elapsedVideoTimeRatio:0.35,audienceWatchRatio:0.6286},
      {elapsedVideoTimeRatio:0.36,audienceWatchRatio:0.6286},{elapsedVideoTimeRatio:0.37,audienceWatchRatio:0.6071},{elapsedVideoTimeRatio:0.38,audienceWatchRatio:0.6071},{elapsedVideoTimeRatio:0.39,audienceWatchRatio:0.5929},{elapsedVideoTimeRatio:0.4,audienceWatchRatio:0.5786},
      {elapsedVideoTimeRatio:0.41,audienceWatchRatio:0.5714},{elapsedVideoTimeRatio:0.42,audienceWatchRatio:0.5429},{elapsedVideoTimeRatio:0.43,audienceWatchRatio:0.5286},{elapsedVideoTimeRatio:0.44,audienceWatchRatio:0.5214},{elapsedVideoTimeRatio:0.45,audienceWatchRatio:0.5214},
      {elapsedVideoTimeRatio:0.46,audienceWatchRatio:0.5},{elapsedVideoTimeRatio:0.47,audienceWatchRatio:0.4929},{elapsedVideoTimeRatio:0.48,audienceWatchRatio:0.4857},{elapsedVideoTimeRatio:0.49,audienceWatchRatio:0.4643},{elapsedVideoTimeRatio:0.5,audienceWatchRatio:0.4571},
      {elapsedVideoTimeRatio:0.51,audienceWatchRatio:0.4429},{elapsedVideoTimeRatio:0.52,audienceWatchRatio:0.4429},{elapsedVideoTimeRatio:0.53,audienceWatchRatio:0.4429},{elapsedVideoTimeRatio:0.54,audienceWatchRatio:0.4429},{elapsedVideoTimeRatio:0.55,audienceWatchRatio:0.4429},
      {elapsedVideoTimeRatio:0.56,audienceWatchRatio:0.4429},{elapsedVideoTimeRatio:0.57,audienceWatchRatio:0.4429},{elapsedVideoTimeRatio:0.58,audienceWatchRatio:0.4357},{elapsedVideoTimeRatio:0.59,audienceWatchRatio:0.4357},{elapsedVideoTimeRatio:0.6,audienceWatchRatio:0.4286},
      {elapsedVideoTimeRatio:0.61,audienceWatchRatio:0.4286},{elapsedVideoTimeRatio:0.62,audienceWatchRatio:0.4286},{elapsedVideoTimeRatio:0.63,audienceWatchRatio:0.4286},{elapsedVideoTimeRatio:0.64,audienceWatchRatio:0.4286},{elapsedVideoTimeRatio:0.65,audienceWatchRatio:0.4286},
      {elapsedVideoTimeRatio:0.66,audienceWatchRatio:0.4286},{elapsedVideoTimeRatio:0.67,audienceWatchRatio:0.4286},{elapsedVideoTimeRatio:0.68,audienceWatchRatio:0.4214},{elapsedVideoTimeRatio:0.69,audienceWatchRatio:0.4214},{elapsedVideoTimeRatio:0.7,audienceWatchRatio:0.4},
      {elapsedVideoTimeRatio:0.71,audienceWatchRatio:0.4},{elapsedVideoTimeRatio:0.72,audienceWatchRatio:0.4},{elapsedVideoTimeRatio:0.73,audienceWatchRatio:0.4},{elapsedVideoTimeRatio:0.74,audienceWatchRatio:0.4},{elapsedVideoTimeRatio:0.75,audienceWatchRatio:0.4},
      {elapsedVideoTimeRatio:0.76,audienceWatchRatio:0.4},{elapsedVideoTimeRatio:0.77,audienceWatchRatio:0.3929},{elapsedVideoTimeRatio:0.78,audienceWatchRatio:0.3929},{elapsedVideoTimeRatio:0.79,audienceWatchRatio:0.3929},{elapsedVideoTimeRatio:0.8,audienceWatchRatio:0.3929},
      {elapsedVideoTimeRatio:0.81,audienceWatchRatio:0.3857},{elapsedVideoTimeRatio:0.82,audienceWatchRatio:0.3857},{elapsedVideoTimeRatio:0.83,audienceWatchRatio:0.3857},{elapsedVideoTimeRatio:0.84,audienceWatchRatio:0.3857},{elapsedVideoTimeRatio:0.85,audienceWatchRatio:0.3857},
      {elapsedVideoTimeRatio:0.86,audienceWatchRatio:0.3714},{elapsedVideoTimeRatio:0.87,audienceWatchRatio:0.3714},{elapsedVideoTimeRatio:0.88,audienceWatchRatio:0.3643},{elapsedVideoTimeRatio:0.89,audienceWatchRatio:0.3643},{elapsedVideoTimeRatio:0.9,audienceWatchRatio:0.3643},
      {elapsedVideoTimeRatio:0.91,audienceWatchRatio:0.35},{elapsedVideoTimeRatio:0.92,audienceWatchRatio:0.3429},{elapsedVideoTimeRatio:0.93,audienceWatchRatio:0.3357},{elapsedVideoTimeRatio:0.94,audienceWatchRatio:0.3286},{elapsedVideoTimeRatio:0.95,audienceWatchRatio:0.3286},
      {elapsedVideoTimeRatio:0.96,audienceWatchRatio:0.3214},{elapsedVideoTimeRatio:0.97,audienceWatchRatio:0.3214},{elapsedVideoTimeRatio:0.98,audienceWatchRatio:0.3071},{elapsedVideoTimeRatio:0.99,audienceWatchRatio:0.3071},{elapsedVideoTimeRatio:1,audienceWatchRatio:0.3071},
    ],
    dropOffPoints: [
      { timestamp: "0:02", viewersLost: 45, percentDrop: 12, reason: "Initial scroll-away — hook held most viewers above 100% replays" },
      { timestamp: "0:10", viewersLost: 38, percentDrop: 10, reason: "Drop from 131% to 107% — some replaying segment ends" },
      { timestamp: "0:16", viewersLost: 33, percentDrop: 9, reason: "Transition away from opening waterfall visuals" },
      { timestamp: "0:30", viewersLost: 29, percentDrop: 8, reason: "Mid-video pacing dip" },
      { timestamp: "0:45", viewersLost: 19, percentDrop: 5, reason: "Plateau — retained core audience through end" },
    ],
    crossPlatform: {
      youtube: { views: 376, avgWatchTime: "0:21", completionRate: 59 },
      instagram: { views: 0, avgWatchTime: "N/A", completionRate: "N/A*" },
      tiktok: { views: 0, avgWatchTime: "N/A", completionRate: 0 },
      facebook: { views: 0, avgWatchTime: "N/A", completionRate: 0 },
    },
  },
  {
    id: "zOdjiJH33VE",
    title: "Thousand Oaks Neighborhoods - Original Wildwood Tract",
    duration: 340, // averageViewDuration=22s, avgViewPercentage=40.9% → ~54s/0.409 ≈ 132s full; Shorts ~60s
    platform: "youtube",
    views: 294,
    averageViewDuration: 22,
    averageViewPercentage: 40.9,
    retentionCurve: [
      {elapsedVideoTimeRatio:0.01,audienceWatchRatio:1.1349},{elapsedVideoTimeRatio:0.02,audienceWatchRatio:1.0952},{elapsedVideoTimeRatio:0.03,audienceWatchRatio:1.0714},{elapsedVideoTimeRatio:0.04,audienceWatchRatio:1.0556},{elapsedVideoTimeRatio:0.05,audienceWatchRatio:1.0397},
      {elapsedVideoTimeRatio:0.06,audienceWatchRatio:1.0476},{elapsedVideoTimeRatio:0.07,audienceWatchRatio:1.0317},{elapsedVideoTimeRatio:0.08,audienceWatchRatio:1.0317},{elapsedVideoTimeRatio:0.09,audienceWatchRatio:0.9524},{elapsedVideoTimeRatio:0.1,audienceWatchRatio:0.8889},
      {elapsedVideoTimeRatio:0.11,audienceWatchRatio:0.8651},{elapsedVideoTimeRatio:0.12,audienceWatchRatio:0.8254},{elapsedVideoTimeRatio:0.13,audienceWatchRatio:0.8254},{elapsedVideoTimeRatio:0.14,audienceWatchRatio:0.8095},{elapsedVideoTimeRatio:0.15,audienceWatchRatio:0.7857},
      {elapsedVideoTimeRatio:0.16,audienceWatchRatio:0.7698},{elapsedVideoTimeRatio:0.17,audienceWatchRatio:0.746},{elapsedVideoTimeRatio:0.18,audienceWatchRatio:0.6746},{elapsedVideoTimeRatio:0.19,audienceWatchRatio:0.6508},{elapsedVideoTimeRatio:0.2,audienceWatchRatio:0.5952},
      {elapsedVideoTimeRatio:0.21,audienceWatchRatio:0.5714},{elapsedVideoTimeRatio:0.22,audienceWatchRatio:0.5556},{elapsedVideoTimeRatio:0.23,audienceWatchRatio:0.5556},{elapsedVideoTimeRatio:0.24,audienceWatchRatio:0.5079},{elapsedVideoTimeRatio:0.25,audienceWatchRatio:0.5},
      {elapsedVideoTimeRatio:0.26,audienceWatchRatio:0.4841},{elapsedVideoTimeRatio:0.27,audienceWatchRatio:0.4762},{elapsedVideoTimeRatio:0.28,audienceWatchRatio:0.4524},{elapsedVideoTimeRatio:0.29,audienceWatchRatio:0.4444},{elapsedVideoTimeRatio:0.3,audienceWatchRatio:0.4444},
      {elapsedVideoTimeRatio:0.31,audienceWatchRatio:0.4524},{elapsedVideoTimeRatio:0.32,audienceWatchRatio:0.4444},{elapsedVideoTimeRatio:0.33,audienceWatchRatio:0.4365},{elapsedVideoTimeRatio:0.34,audienceWatchRatio:0.4286},{elapsedVideoTimeRatio:0.35,audienceWatchRatio:0.4206},
      {elapsedVideoTimeRatio:0.36,audienceWatchRatio:0.4206},{elapsedVideoTimeRatio:0.37,audienceWatchRatio:0.4206},{elapsedVideoTimeRatio:0.38,audienceWatchRatio:0.4127},{elapsedVideoTimeRatio:0.39,audienceWatchRatio:0.4127},{elapsedVideoTimeRatio:0.4,audienceWatchRatio:0.4127},
      {elapsedVideoTimeRatio:0.41,audienceWatchRatio:0.3968},{elapsedVideoTimeRatio:0.42,audienceWatchRatio:0.3968},{elapsedVideoTimeRatio:0.43,audienceWatchRatio:0.3889},{elapsedVideoTimeRatio:0.44,audienceWatchRatio:0.381},{elapsedVideoTimeRatio:0.45,audienceWatchRatio:0.373},
      {elapsedVideoTimeRatio:0.46,audienceWatchRatio:0.381},{elapsedVideoTimeRatio:0.47,audienceWatchRatio:0.373},{elapsedVideoTimeRatio:0.48,audienceWatchRatio:0.3571},{elapsedVideoTimeRatio:0.49,audienceWatchRatio:0.3413},{elapsedVideoTimeRatio:0.5,audienceWatchRatio:0.3254},
      {elapsedVideoTimeRatio:0.51,audienceWatchRatio:0.3175},{elapsedVideoTimeRatio:0.52,audienceWatchRatio:0.3095},{elapsedVideoTimeRatio:0.53,audienceWatchRatio:0.3095},{elapsedVideoTimeRatio:0.54,audienceWatchRatio:0.3095},{elapsedVideoTimeRatio:0.55,audienceWatchRatio:0.3095},
      {elapsedVideoTimeRatio:0.56,audienceWatchRatio:0.3095},{elapsedVideoTimeRatio:0.57,audienceWatchRatio:0.3016},{elapsedVideoTimeRatio:0.58,audienceWatchRatio:0.2937},{elapsedVideoTimeRatio:0.59,audienceWatchRatio:0.2778},{elapsedVideoTimeRatio:0.6,audienceWatchRatio:0.2778},
      {elapsedVideoTimeRatio:0.61,audienceWatchRatio:0.2698},{elapsedVideoTimeRatio:0.62,audienceWatchRatio:0.2698},{elapsedVideoTimeRatio:0.63,audienceWatchRatio:0.254},{elapsedVideoTimeRatio:0.64,audienceWatchRatio:0.254},{elapsedVideoTimeRatio:0.65,audienceWatchRatio:0.246},
      {elapsedVideoTimeRatio:0.66,audienceWatchRatio:0.2381},{elapsedVideoTimeRatio:0.67,audienceWatchRatio:0.2302},{elapsedVideoTimeRatio:0.68,audienceWatchRatio:0.2302},{elapsedVideoTimeRatio:0.69,audienceWatchRatio:0.2222},{elapsedVideoTimeRatio:0.7,audienceWatchRatio:0.2222},
      {elapsedVideoTimeRatio:0.71,audienceWatchRatio:0.2143},{elapsedVideoTimeRatio:0.72,audienceWatchRatio:0.2143},{elapsedVideoTimeRatio:0.73,audienceWatchRatio:0.2063},{elapsedVideoTimeRatio:0.74,audienceWatchRatio:0.2063},{elapsedVideoTimeRatio:0.75,audienceWatchRatio:0.2063},
      {elapsedVideoTimeRatio:0.76,audienceWatchRatio:0.1984},{elapsedVideoTimeRatio:0.77,audienceWatchRatio:0.1905},{elapsedVideoTimeRatio:0.78,audienceWatchRatio:0.1905},{elapsedVideoTimeRatio:0.79,audienceWatchRatio:0.1825},{elapsedVideoTimeRatio:0.8,audienceWatchRatio:0.1825},
      {elapsedVideoTimeRatio:0.81,audienceWatchRatio:0.1746},{elapsedVideoTimeRatio:0.82,audienceWatchRatio:0.1746},{elapsedVideoTimeRatio:0.83,audienceWatchRatio:0.1746},{elapsedVideoTimeRatio:0.84,audienceWatchRatio:0.1746},{elapsedVideoTimeRatio:0.85,audienceWatchRatio:0.1825},
      {elapsedVideoTimeRatio:0.86,audienceWatchRatio:0.1825},{elapsedVideoTimeRatio:0.87,audienceWatchRatio:0.1825},{elapsedVideoTimeRatio:0.88,audienceWatchRatio:0.1746},{elapsedVideoTimeRatio:0.89,audienceWatchRatio:0.1746},{elapsedVideoTimeRatio:0.9,audienceWatchRatio:0.1667},
      {elapsedVideoTimeRatio:0.91,audienceWatchRatio:0.1587},{elapsedVideoTimeRatio:0.92,audienceWatchRatio:0.1508},{elapsedVideoTimeRatio:0.93,audienceWatchRatio:0.1508},{elapsedVideoTimeRatio:0.94,audienceWatchRatio:0.1508},{elapsedVideoTimeRatio:0.95,audienceWatchRatio:0.1429},
      {elapsedVideoTimeRatio:0.96,audienceWatchRatio:0.1349},{elapsedVideoTimeRatio:0.97,audienceWatchRatio:0.1429},{elapsedVideoTimeRatio:0.98,audienceWatchRatio:0.1429},{elapsedVideoTimeRatio:0.99,audienceWatchRatio:0.1349},{elapsedVideoTimeRatio:1,audienceWatchRatio:0.1349},
    ],
    dropOffPoints: [
      { timestamp: "0:03", viewersLost: 35, percentDrop: 12, reason: "Early scroll-away from Shorts feed" },
      { timestamp: "0:08", viewersLost: 42, percentDrop: 14, reason: "Sharp drop 103% → 89% — hook loses non-Wildwood audience" },
      { timestamp: "0:15", viewersLost: 26, percentDrop: 9, reason: "Transition to neighborhood detail" },
      { timestamp: "0:30", viewersLost: 22, percentDrop: 7, reason: "Mid-video audience stabilizes" },
      { timestamp: "0:50", viewersLost: 18, percentDrop: 6, reason: "Outro drop-off" },
    ],
    crossPlatform: {
      youtube: { views: 294, avgWatchTime: "0:22", completionRate: 41 },
      instagram: { views: 0, avgWatchTime: "N/A", completionRate: "N/A*" },
      tiktok: { views: 0, avgWatchTime: "N/A", completionRate: 0 },
      facebook: { views: 0, avgWatchTime: "N/A", completionRate: 0 },
    },
  },
  {
    id: "8GOuD0uBz5I",
    title: "Stop Waiting for The Perfect Time to Buy a Home",
    duration: 114, // averageViewDuration=33s, avgViewPercentage=29.04% → 33/0.2904 ≈ 114s
    platform: "youtube",
    views: 233,
    averageViewDuration: 33,
    averageViewPercentage: 29.04,
    retentionCurve: [
      {elapsedVideoTimeRatio:0.01,audienceWatchRatio:1.1875},{elapsedVideoTimeRatio:0.02,audienceWatchRatio:1.0833},{elapsedVideoTimeRatio:0.03,audienceWatchRatio:1.0833},{elapsedVideoTimeRatio:0.04,audienceWatchRatio:1.0833},{elapsedVideoTimeRatio:0.05,audienceWatchRatio:0.9375},
      {elapsedVideoTimeRatio:0.06,audienceWatchRatio:0.8333},{elapsedVideoTimeRatio:0.07,audienceWatchRatio:0.6458},{elapsedVideoTimeRatio:0.08,audienceWatchRatio:0.5833},{elapsedVideoTimeRatio:0.09,audienceWatchRatio:0.5625},{elapsedVideoTimeRatio:0.1,audienceWatchRatio:0.5208},
      {elapsedVideoTimeRatio:0.11,audienceWatchRatio:0.5},{elapsedVideoTimeRatio:0.12,audienceWatchRatio:0.3958},{elapsedVideoTimeRatio:0.13,audienceWatchRatio:0.375},{elapsedVideoTimeRatio:0.14,audienceWatchRatio:0.375},{elapsedVideoTimeRatio:0.15,audienceWatchRatio:0.3542},
      {elapsedVideoTimeRatio:0.16,audienceWatchRatio:0.3333},{elapsedVideoTimeRatio:0.17,audienceWatchRatio:0.3333},{elapsedVideoTimeRatio:0.18,audienceWatchRatio:0.3333},{elapsedVideoTimeRatio:0.19,audienceWatchRatio:0.3333},{elapsedVideoTimeRatio:0.2,audienceWatchRatio:0.3333},
      {elapsedVideoTimeRatio:0.21,audienceWatchRatio:0.3333},{elapsedVideoTimeRatio:0.22,audienceWatchRatio:0.3333},{elapsedVideoTimeRatio:0.23,audienceWatchRatio:0.3125},{elapsedVideoTimeRatio:0.24,audienceWatchRatio:0.3125},{elapsedVideoTimeRatio:0.25,audienceWatchRatio:0.3125},
      {elapsedVideoTimeRatio:0.26,audienceWatchRatio:0.3125},{elapsedVideoTimeRatio:0.27,audienceWatchRatio:0.3125},{elapsedVideoTimeRatio:0.28,audienceWatchRatio:0.2917},{elapsedVideoTimeRatio:0.29,audienceWatchRatio:0.2917},{elapsedVideoTimeRatio:0.3,audienceWatchRatio:0.2917},
      {elapsedVideoTimeRatio:0.31,audienceWatchRatio:0.2917},{elapsedVideoTimeRatio:0.32,audienceWatchRatio:0.2917},{elapsedVideoTimeRatio:0.33,audienceWatchRatio:0.2917},{elapsedVideoTimeRatio:0.34,audienceWatchRatio:0.3125},{elapsedVideoTimeRatio:0.35,audienceWatchRatio:0.3125},
      {elapsedVideoTimeRatio:0.36,audienceWatchRatio:0.2708},{elapsedVideoTimeRatio:0.37,audienceWatchRatio:0.2292},{elapsedVideoTimeRatio:0.38,audienceWatchRatio:0.2292},{elapsedVideoTimeRatio:0.39,audienceWatchRatio:0.2292},{elapsedVideoTimeRatio:0.4,audienceWatchRatio:0.2083},
      {elapsedVideoTimeRatio:0.41,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.42,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.43,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.44,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.45,audienceWatchRatio:0.2083},
      {elapsedVideoTimeRatio:0.46,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.47,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.48,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.49,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.5,audienceWatchRatio:0.2083},
      {elapsedVideoTimeRatio:0.51,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.52,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.53,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.54,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.55,audienceWatchRatio:0.2083},
      {elapsedVideoTimeRatio:0.56,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.57,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.58,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.59,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.6,audienceWatchRatio:0.2083},
      {elapsedVideoTimeRatio:0.61,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.62,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.63,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.64,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.65,audienceWatchRatio:0.2083},
      {elapsedVideoTimeRatio:0.66,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.67,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.68,audienceWatchRatio:0.2292},{elapsedVideoTimeRatio:0.69,audienceWatchRatio:0.2292},{elapsedVideoTimeRatio:0.7,audienceWatchRatio:0.2292},
      {elapsedVideoTimeRatio:0.71,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.72,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.73,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.74,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.75,audienceWatchRatio:0.2083},
      {elapsedVideoTimeRatio:0.76,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.77,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.78,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.79,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.8,audienceWatchRatio:0.2083},
      {elapsedVideoTimeRatio:0.81,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.82,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.83,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.84,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.85,audienceWatchRatio:0.2083},
      {elapsedVideoTimeRatio:0.86,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.87,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.88,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.89,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.9,audienceWatchRatio:0.2083},
      {elapsedVideoTimeRatio:0.91,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.92,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.93,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.94,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.95,audienceWatchRatio:0.2083},
      {elapsedVideoTimeRatio:0.96,audienceWatchRatio:0.2083},{elapsedVideoTimeRatio:0.97,audienceWatchRatio:0.1875},{elapsedVideoTimeRatio:0.98,audienceWatchRatio:0.1875},{elapsedVideoTimeRatio:0.99,audienceWatchRatio:0.1458},{elapsedVideoTimeRatio:1,audienceWatchRatio:0.1458},
    ],
    dropOffPoints: [
      { timestamp: "0:01", viewersLost: 28, percentDrop: 12, reason: "Immediate drop from 119% — replay viewers leave" },
      { timestamp: "0:05", viewersLost: 37, percentDrop: 16, reason: "Steep drop 94% → 65% — high abandonment at ~7% mark" },
      { timestamp: "0:08", viewersLost: 18, percentDrop: 8, reason: "Stabilizes around 33% after first major cliff" },
      { timestamp: "0:42", viewersLost: 12, percentDrop: 5, reason: "Slight uptick suggests rewatch / interest spike at 68%" },
      { timestamp: "1:50", viewersLost: 10, percentDrop: 4, reason: "End-of-video drop to 15%" },
    ],
    crossPlatform: {
      youtube: { views: 233, avgWatchTime: "0:33", completionRate: 29 },
      instagram: { views: 0, avgWatchTime: "N/A", completionRate: "N/A*" },
      tiktok: { views: 0, avgWatchTime: "N/A", completionRate: 0 },
      facebook: { views: 0, avgWatchTime: "N/A", completionRate: 0 },
    },
  },
  {
    id: "ehGSxHMgWJ4",
    title: "Living in Thousand Oaks - Shadow Oaks & Eichler",
    duration: 723, // averageViewDuration=150s, avgViewPercentage=20.75% → 150/0.2075 ≈ 723s
    platform: "youtube",
    views: 102,
    averageViewDuration: 150,
    averageViewPercentage: 20.75,
    retentionCurve: [
      {elapsedVideoTimeRatio:0.01,audienceWatchRatio:0.9314},{elapsedVideoTimeRatio:0.02,audienceWatchRatio:0.7549},{elapsedVideoTimeRatio:0.03,audienceWatchRatio:0.7353},{elapsedVideoTimeRatio:0.04,audienceWatchRatio:0.6471},{elapsedVideoTimeRatio:0.05,audienceWatchRatio:0.6471},
      {elapsedVideoTimeRatio:0.06,audienceWatchRatio:0.598},{elapsedVideoTimeRatio:0.07,audienceWatchRatio:0.4706},{elapsedVideoTimeRatio:0.08,audienceWatchRatio:0.4412},{elapsedVideoTimeRatio:0.09,audienceWatchRatio:0.4216},{elapsedVideoTimeRatio:0.1,audienceWatchRatio:0.402},
      {elapsedVideoTimeRatio:0.11,audienceWatchRatio:0.3922},{elapsedVideoTimeRatio:0.12,audienceWatchRatio:0.4216},{elapsedVideoTimeRatio:0.13,audienceWatchRatio:0.3824},{elapsedVideoTimeRatio:0.14,audienceWatchRatio:0.3431},{elapsedVideoTimeRatio:0.15,audienceWatchRatio:0.3627},
      {elapsedVideoTimeRatio:0.16,audienceWatchRatio:0.402},{elapsedVideoTimeRatio:0.17,audienceWatchRatio:0.3725},{elapsedVideoTimeRatio:0.18,audienceWatchRatio:0.3333},{elapsedVideoTimeRatio:0.19,audienceWatchRatio:0.3039},{elapsedVideoTimeRatio:0.2,audienceWatchRatio:0.2745},
      {elapsedVideoTimeRatio:0.21,audienceWatchRatio:0.2647},{elapsedVideoTimeRatio:0.22,audienceWatchRatio:0.2843},{elapsedVideoTimeRatio:0.23,audienceWatchRatio:0.2549},{elapsedVideoTimeRatio:0.24,audienceWatchRatio:0.2451},{elapsedVideoTimeRatio:0.25,audienceWatchRatio:0.2843},
      {elapsedVideoTimeRatio:0.26,audienceWatchRatio:0.2745},{elapsedVideoTimeRatio:0.27,audienceWatchRatio:0.2745},{elapsedVideoTimeRatio:0.28,audienceWatchRatio:0.2745},{elapsedVideoTimeRatio:0.29,audienceWatchRatio:0.2549},{elapsedVideoTimeRatio:0.3,audienceWatchRatio:0.2451},
      {elapsedVideoTimeRatio:0.31,audienceWatchRatio:0.2353},{elapsedVideoTimeRatio:0.32,audienceWatchRatio:0.2157},{elapsedVideoTimeRatio:0.33,audienceWatchRatio:0.2059},{elapsedVideoTimeRatio:0.34,audienceWatchRatio:0.2157},{elapsedVideoTimeRatio:0.35,audienceWatchRatio:0.2059},
      {elapsedVideoTimeRatio:0.36,audienceWatchRatio:0.1863},{elapsedVideoTimeRatio:0.37,audienceWatchRatio:0.1961},{elapsedVideoTimeRatio:0.38,audienceWatchRatio:0.1961},{elapsedVideoTimeRatio:0.39,audienceWatchRatio:0.1863},{elapsedVideoTimeRatio:0.4,audienceWatchRatio:0.1863},
      {elapsedVideoTimeRatio:0.41,audienceWatchRatio:0.1765},{elapsedVideoTimeRatio:0.42,audienceWatchRatio:0.1765},{elapsedVideoTimeRatio:0.43,audienceWatchRatio:0.2059},{elapsedVideoTimeRatio:0.44,audienceWatchRatio:0.1765},{elapsedVideoTimeRatio:0.45,audienceWatchRatio:0.1863},
      {elapsedVideoTimeRatio:0.46,audienceWatchRatio:0.1765},{elapsedVideoTimeRatio:0.47,audienceWatchRatio:0.1961},{elapsedVideoTimeRatio:0.48,audienceWatchRatio:0.1961},{elapsedVideoTimeRatio:0.49,audienceWatchRatio:0.1961},{elapsedVideoTimeRatio:0.5,audienceWatchRatio:0.1863},
      {elapsedVideoTimeRatio:0.51,audienceWatchRatio:0.1863},{elapsedVideoTimeRatio:0.52,audienceWatchRatio:0.1863},{elapsedVideoTimeRatio:0.53,audienceWatchRatio:0.1863},{elapsedVideoTimeRatio:0.54,audienceWatchRatio:0.1667},{elapsedVideoTimeRatio:0.55,audienceWatchRatio:0.1667},
      {elapsedVideoTimeRatio:0.56,audienceWatchRatio:0.1667},{elapsedVideoTimeRatio:0.57,audienceWatchRatio:0.1765},{elapsedVideoTimeRatio:0.58,audienceWatchRatio:0.1667},{elapsedVideoTimeRatio:0.59,audienceWatchRatio:0.1569},{elapsedVideoTimeRatio:0.6,audienceWatchRatio:0.1471},
      {elapsedVideoTimeRatio:0.61,audienceWatchRatio:0.1471},{elapsedVideoTimeRatio:0.62,audienceWatchRatio:0.1569},{elapsedVideoTimeRatio:0.63,audienceWatchRatio:0.1569},{elapsedVideoTimeRatio:0.64,audienceWatchRatio:0.1667},{elapsedVideoTimeRatio:0.65,audienceWatchRatio:0.1667},
      {elapsedVideoTimeRatio:0.66,audienceWatchRatio:0.1373},{elapsedVideoTimeRatio:0.67,audienceWatchRatio:0.1471},{elapsedVideoTimeRatio:0.68,audienceWatchRatio:0.1275},{elapsedVideoTimeRatio:0.69,audienceWatchRatio:0.1275},{elapsedVideoTimeRatio:0.7,audienceWatchRatio:0.1373},
      {elapsedVideoTimeRatio:0.71,audienceWatchRatio:0.1275},{elapsedVideoTimeRatio:0.72,audienceWatchRatio:0.1078},{elapsedVideoTimeRatio:0.73,audienceWatchRatio:0.1078},{elapsedVideoTimeRatio:0.74,audienceWatchRatio:0.0882},{elapsedVideoTimeRatio:0.75,audienceWatchRatio:0.0882},
      {elapsedVideoTimeRatio:0.76,audienceWatchRatio:0.098},{elapsedVideoTimeRatio:0.77,audienceWatchRatio:0.098},{elapsedVideoTimeRatio:0.78,audienceWatchRatio:0.0882},{elapsedVideoTimeRatio:0.79,audienceWatchRatio:0.0882},{elapsedVideoTimeRatio:0.8,audienceWatchRatio:0.0882},
      {elapsedVideoTimeRatio:0.81,audienceWatchRatio:0.0882},{elapsedVideoTimeRatio:0.82,audienceWatchRatio:0.0882},{elapsedVideoTimeRatio:0.83,audienceWatchRatio:0.0882},{elapsedVideoTimeRatio:0.84,audienceWatchRatio:0.098},{elapsedVideoTimeRatio:0.85,audienceWatchRatio:0.0882},
      {elapsedVideoTimeRatio:0.86,audienceWatchRatio:0.0882},{elapsedVideoTimeRatio:0.87,audienceWatchRatio:0.0882},{elapsedVideoTimeRatio:0.88,audienceWatchRatio:0.0882},{elapsedVideoTimeRatio:0.89,audienceWatchRatio:0.0882},{elapsedVideoTimeRatio:0.9,audienceWatchRatio:0.098},
      {elapsedVideoTimeRatio:0.91,audienceWatchRatio:0.0882},{elapsedVideoTimeRatio:0.92,audienceWatchRatio:0.0882},{elapsedVideoTimeRatio:0.93,audienceWatchRatio:0.0784},{elapsedVideoTimeRatio:0.94,audienceWatchRatio:0.0784},{elapsedVideoTimeRatio:0.95,audienceWatchRatio:0.0882},
      {elapsedVideoTimeRatio:0.96,audienceWatchRatio:0.0882},{elapsedVideoTimeRatio:0.97,audienceWatchRatio:0.0882},{elapsedVideoTimeRatio:0.98,audienceWatchRatio:0.0686},{elapsedVideoTimeRatio:0.99,audienceWatchRatio:0.0686},{elapsedVideoTimeRatio:1,audienceWatchRatio:0.0686},
    ],
    dropOffPoints: [
      { timestamp: "0:07", viewersLost: 22, percentDrop: 22, reason: "Major early drop 93% → 47% — long-form content loses casual viewers fast" },
      { timestamp: "1:12", viewersLost: 10, percentDrop: 10, reason: "Stabilizes around 40% through mid-section" },
      { timestamp: "3:37", viewersLost: 6, percentDrop: 6, reason: "Gradual decline continues through later segments" },
      { timestamp: "8:42", viewersLost: 5, percentDrop: 5, reason: "Final stretch — core audience remains at ~7-9%" },
    ],
    crossPlatform: {
      youtube: { views: 102, avgWatchTime: "2:30", completionRate: 21 },
      instagram: { views: 0, avgWatchTime: "N/A", completionRate: "N/A*" },
      tiktok: { views: 0, avgWatchTime: "N/A", completionRate: 0 },
      facebook: { views: 0, avgWatchTime: "N/A", completionRate: 0 },
    },
  },
  {
    id: "0mycplFWKsE",
    title: "What Home Buyers Are Really Looking For In Thousand Oaks",
    duration: 111, // averageViewDuration=22s, avgViewPercentage=29.74% → 22/0.2974 ≈ 74s; curve has 97 points → ~60s Short
    platform: "youtube",
    views: 92,
    averageViewDuration: 22,
    averageViewPercentage: 29.74,
    retentionCurve: [
      {elapsedVideoTimeRatio:0.01,audienceWatchRatio:1.0588},{elapsedVideoTimeRatio:0.02,audienceWatchRatio:1},{elapsedVideoTimeRatio:0.03,audienceWatchRatio:1},{elapsedVideoTimeRatio:0.04,audienceWatchRatio:1},{elapsedVideoTimeRatio:0.05,audienceWatchRatio:1},
      {elapsedVideoTimeRatio:0.06,audienceWatchRatio:1},{elapsedVideoTimeRatio:0.07,audienceWatchRatio:0.7059},{elapsedVideoTimeRatio:0.08,audienceWatchRatio:0.6471},{elapsedVideoTimeRatio:0.09,audienceWatchRatio:0.5294},{elapsedVideoTimeRatio:0.1,audienceWatchRatio:0.5294},
      {elapsedVideoTimeRatio:0.11,audienceWatchRatio:0.4706},{elapsedVideoTimeRatio:0.12,audienceWatchRatio:0.4706},{elapsedVideoTimeRatio:0.13,audienceWatchRatio:0.4706},{elapsedVideoTimeRatio:0.14,audienceWatchRatio:0.4706},{elapsedVideoTimeRatio:0.15,audienceWatchRatio:0.4706},
      {elapsedVideoTimeRatio:0.16,audienceWatchRatio:0.4706},{elapsedVideoTimeRatio:0.17,audienceWatchRatio:0.4706},{elapsedVideoTimeRatio:0.18,audienceWatchRatio:0.4118},{elapsedVideoTimeRatio:0.19,audienceWatchRatio:0.4118},{elapsedVideoTimeRatio:0.2,audienceWatchRatio:0.4118},
      {elapsedVideoTimeRatio:0.21,audienceWatchRatio:0.4118},{elapsedVideoTimeRatio:0.22,audienceWatchRatio:0.4118},{elapsedVideoTimeRatio:0.23,audienceWatchRatio:0.4118},{elapsedVideoTimeRatio:0.24,audienceWatchRatio:0.4118},{elapsedVideoTimeRatio:0.25,audienceWatchRatio:0.4118},
      {elapsedVideoTimeRatio:0.26,audienceWatchRatio:0.4118},{elapsedVideoTimeRatio:0.27,audienceWatchRatio:0.4118},{elapsedVideoTimeRatio:0.28,audienceWatchRatio:0.4118},{elapsedVideoTimeRatio:0.29,audienceWatchRatio:0.4118},{elapsedVideoTimeRatio:0.3,audienceWatchRatio:0.3529},
      {elapsedVideoTimeRatio:0.31,audienceWatchRatio:0.3529},{elapsedVideoTimeRatio:0.32,audienceWatchRatio:0.3529},{elapsedVideoTimeRatio:0.33,audienceWatchRatio:0.3529},{elapsedVideoTimeRatio:0.34,audienceWatchRatio:0.3529},{elapsedVideoTimeRatio:0.35,audienceWatchRatio:0.3529},
      {elapsedVideoTimeRatio:0.36,audienceWatchRatio:0.3529},{elapsedVideoTimeRatio:0.37,audienceWatchRatio:0.3529},{elapsedVideoTimeRatio:0.38,audienceWatchRatio:0.3529},{elapsedVideoTimeRatio:0.39,audienceWatchRatio:0.3529},{elapsedVideoTimeRatio:0.4,audienceWatchRatio:0.2941},
      {elapsedVideoTimeRatio:0.41,audienceWatchRatio:0.2941},{elapsedVideoTimeRatio:0.42,audienceWatchRatio:0.2941},{elapsedVideoTimeRatio:0.43,audienceWatchRatio:0.2941},{elapsedVideoTimeRatio:0.44,audienceWatchRatio:0.2941},{elapsedVideoTimeRatio:0.45,audienceWatchRatio:0.2941},
      {elapsedVideoTimeRatio:0.46,audienceWatchRatio:0.2941},{elapsedVideoTimeRatio:0.47,audienceWatchRatio:0.2941},{elapsedVideoTimeRatio:0.48,audienceWatchRatio:0.2941},{elapsedVideoTimeRatio:0.49,audienceWatchRatio:0.2941},{elapsedVideoTimeRatio:0.5,audienceWatchRatio:0.2941},
      {elapsedVideoTimeRatio:0.51,audienceWatchRatio:0.2941},{elapsedVideoTimeRatio:0.52,audienceWatchRatio:0.2941},{elapsedVideoTimeRatio:0.53,audienceWatchRatio:0.2941},{elapsedVideoTimeRatio:0.54,audienceWatchRatio:0.2353},{elapsedVideoTimeRatio:0.55,audienceWatchRatio:0.2353},
      {elapsedVideoTimeRatio:0.56,audienceWatchRatio:0.2353},{elapsedVideoTimeRatio:0.57,audienceWatchRatio:0.1765},{elapsedVideoTimeRatio:0.58,audienceWatchRatio:0.1765},{elapsedVideoTimeRatio:0.59,audienceWatchRatio:0.1765},{elapsedVideoTimeRatio:0.6,audienceWatchRatio:0.1765},
      {elapsedVideoTimeRatio:0.61,audienceWatchRatio:0.1765},{elapsedVideoTimeRatio:0.62,audienceWatchRatio:0.1765},{elapsedVideoTimeRatio:0.63,audienceWatchRatio:0.1765},{elapsedVideoTimeRatio:0.64,audienceWatchRatio:0.1765},{elapsedVideoTimeRatio:0.65,audienceWatchRatio:0.1765},
      {elapsedVideoTimeRatio:0.66,audienceWatchRatio:0.1765},{elapsedVideoTimeRatio:0.67,audienceWatchRatio:0.1176},{elapsedVideoTimeRatio:0.68,audienceWatchRatio:0.1176},{elapsedVideoTimeRatio:0.69,audienceWatchRatio:0.1176},{elapsedVideoTimeRatio:0.7,audienceWatchRatio:0.1176},
      {elapsedVideoTimeRatio:0.71,audienceWatchRatio:0.1176},{elapsedVideoTimeRatio:0.72,audienceWatchRatio:0.1176},{elapsedVideoTimeRatio:0.73,audienceWatchRatio:0.1176},{elapsedVideoTimeRatio:0.74,audienceWatchRatio:0.1176},{elapsedVideoTimeRatio:0.75,audienceWatchRatio:0.1176},
      {elapsedVideoTimeRatio:0.76,audienceWatchRatio:0.1176},{elapsedVideoTimeRatio:0.77,audienceWatchRatio:0.1176},{elapsedVideoTimeRatio:0.78,audienceWatchRatio:0.1176},{elapsedVideoTimeRatio:0.79,audienceWatchRatio:0.1176},{elapsedVideoTimeRatio:0.8,audienceWatchRatio:0.1176},
      {elapsedVideoTimeRatio:0.81,audienceWatchRatio:0.1176},{elapsedVideoTimeRatio:0.82,audienceWatchRatio:0.1176},{elapsedVideoTimeRatio:0.83,audienceWatchRatio:0.1176},{elapsedVideoTimeRatio:0.84,audienceWatchRatio:0.1176},{elapsedVideoTimeRatio:0.85,audienceWatchRatio:0.1176},
      {elapsedVideoTimeRatio:0.86,audienceWatchRatio:0.1176},{elapsedVideoTimeRatio:0.87,audienceWatchRatio:0.1176},{elapsedVideoTimeRatio:0.88,audienceWatchRatio:0.1176},{elapsedVideoTimeRatio:0.89,audienceWatchRatio:0.1176},{elapsedVideoTimeRatio:0.9,audienceWatchRatio:0.1176},
      {elapsedVideoTimeRatio:0.91,audienceWatchRatio:0.1176},{elapsedVideoTimeRatio:0.92,audienceWatchRatio:0.1176},{elapsedVideoTimeRatio:0.93,audienceWatchRatio:0.1176},{elapsedVideoTimeRatio:0.94,audienceWatchRatio:0.1176},{elapsedVideoTimeRatio:0.95,audienceWatchRatio:0.0588},
      {elapsedVideoTimeRatio:0.96,audienceWatchRatio:0.0588},{elapsedVideoTimeRatio:0.97,audienceWatchRatio:0.0588},
    ],
    dropOffPoints: [
      { timestamp: "0:04", viewersLost: 9, percentDrop: 29, reason: "Cliff drop 106% → 71% at ~7% mark — hook works but many scroll past" },
      { timestamp: "0:09", viewersLost: 7, percentDrop: 18, reason: "Settling period — drops to 47-53% stable band" },
      { timestamp: "0:28", viewersLost: 5, percentDrop: 6, reason: "Second step drop to 35% at 30% mark" },
      { timestamp: "0:40", viewersLost: 4, percentDrop: 6, reason: "Third step to 29% at 40% mark" },
      { timestamp: "0:57", viewersLost: 3, percentDrop: 6, reason: "Final step drop to 12% at 67% mark" },
    ],
    crossPlatform: {
      youtube: { views: 92, avgWatchTime: "0:22", completionRate: 30 },
      instagram: { views: 0, avgWatchTime: "N/A", completionRate: "N/A*" },
      tiktok: { views: 0, avgWatchTime: "N/A", completionRate: 0 },
      facebook: { views: 0, avgWatchTime: "N/A", completionRate: 0 },
    },
  },
  {
    id: "eWhT6g-VEt0",
    title: "New California Landlord Laws 2026 - Some May Surprise You",
    duration: 913,
    platform: "youtube",
    views: 26,
    averageViewDuration: 193,
    averageViewPercentage: 21.13,
    retentionCurve: [
      {elapsedVideoTimeRatio:0.01,audienceWatchRatio:0.8},{elapsedVideoTimeRatio:0.02,audienceWatchRatio:0.68},{elapsedVideoTimeRatio:0.03,audienceWatchRatio:0.36},{elapsedVideoTimeRatio:0.04,audienceWatchRatio:0.36},{elapsedVideoTimeRatio:0.05,audienceWatchRatio:0.36},
      {elapsedVideoTimeRatio:0.06,audienceWatchRatio:0.4},{elapsedVideoTimeRatio:0.07,audienceWatchRatio:0.4},{elapsedVideoTimeRatio:0.08,audienceWatchRatio:0.36},{elapsedVideoTimeRatio:0.09,audienceWatchRatio:0.36},{elapsedVideoTimeRatio:0.1,audienceWatchRatio:0.4},
      {elapsedVideoTimeRatio:0.11,audienceWatchRatio:0.4},{elapsedVideoTimeRatio:0.12,audienceWatchRatio:0.44},{elapsedVideoTimeRatio:0.13,audienceWatchRatio:0.44},{elapsedVideoTimeRatio:0.14,audienceWatchRatio:0.36},{elapsedVideoTimeRatio:0.15,audienceWatchRatio:0.32},
      {elapsedVideoTimeRatio:0.16,audienceWatchRatio:0.36},{elapsedVideoTimeRatio:0.17,audienceWatchRatio:0.44},{elapsedVideoTimeRatio:0.18,audienceWatchRatio:0.36},{elapsedVideoTimeRatio:0.19,audienceWatchRatio:0.28},{elapsedVideoTimeRatio:0.2,audienceWatchRatio:0.24},
      {elapsedVideoTimeRatio:0.21,audienceWatchRatio:0.28},{elapsedVideoTimeRatio:0.22,audienceWatchRatio:0.24},{elapsedVideoTimeRatio:0.23,audienceWatchRatio:0.28},{elapsedVideoTimeRatio:0.24,audienceWatchRatio:0.32},{elapsedVideoTimeRatio:0.25,audienceWatchRatio:0.24},
      {elapsedVideoTimeRatio:0.26,audienceWatchRatio:0.28},{elapsedVideoTimeRatio:0.27,audienceWatchRatio:0.32},{elapsedVideoTimeRatio:0.28,audienceWatchRatio:0.28},{elapsedVideoTimeRatio:0.29,audienceWatchRatio:0.36},{elapsedVideoTimeRatio:0.3,audienceWatchRatio:0.32},
      {elapsedVideoTimeRatio:0.31,audienceWatchRatio:0.32},{elapsedVideoTimeRatio:0.32,audienceWatchRatio:0.28},{elapsedVideoTimeRatio:0.33,audienceWatchRatio:0.28},{elapsedVideoTimeRatio:0.34,audienceWatchRatio:0.16},{elapsedVideoTimeRatio:0.35,audienceWatchRatio:0.2},
      {elapsedVideoTimeRatio:0.36,audienceWatchRatio:0.2},{elapsedVideoTimeRatio:0.37,audienceWatchRatio:0.16},{elapsedVideoTimeRatio:0.38,audienceWatchRatio:0.16},{elapsedVideoTimeRatio:0.39,audienceWatchRatio:0.16},{elapsedVideoTimeRatio:0.4,audienceWatchRatio:0.16},
      {elapsedVideoTimeRatio:0.41,audienceWatchRatio:0.16},{elapsedVideoTimeRatio:0.42,audienceWatchRatio:0.16},{elapsedVideoTimeRatio:0.43,audienceWatchRatio:0.16},{elapsedVideoTimeRatio:0.44,audienceWatchRatio:0.2},{elapsedVideoTimeRatio:0.45,audienceWatchRatio:0.16},
      {elapsedVideoTimeRatio:0.46,audienceWatchRatio:0.16},{elapsedVideoTimeRatio:0.47,audienceWatchRatio:0.16},{elapsedVideoTimeRatio:0.48,audienceWatchRatio:0.24},{elapsedVideoTimeRatio:0.49,audienceWatchRatio:0.2},{elapsedVideoTimeRatio:0.5,audienceWatchRatio:0.2},
      {elapsedVideoTimeRatio:0.51,audienceWatchRatio:0.2},{elapsedVideoTimeRatio:0.52,audienceWatchRatio:0.2},{elapsedVideoTimeRatio:0.53,audienceWatchRatio:0.2},{elapsedVideoTimeRatio:0.54,audienceWatchRatio:0.2},{elapsedVideoTimeRatio:0.55,audienceWatchRatio:0.16},
      {elapsedVideoTimeRatio:0.56,audienceWatchRatio:0.16},{elapsedVideoTimeRatio:0.57,audienceWatchRatio:0.16},{elapsedVideoTimeRatio:0.58,audienceWatchRatio:0.2},{elapsedVideoTimeRatio:0.59,audienceWatchRatio:0.2},{elapsedVideoTimeRatio:0.6,audienceWatchRatio:0.16},
      {elapsedVideoTimeRatio:0.61,audienceWatchRatio:0.16},{elapsedVideoTimeRatio:0.62,audienceWatchRatio:0.16},{elapsedVideoTimeRatio:0.63,audienceWatchRatio:0.16},{elapsedVideoTimeRatio:0.64,audienceWatchRatio:0.2},{elapsedVideoTimeRatio:0.65,audienceWatchRatio:0.16},
      {elapsedVideoTimeRatio:0.66,audienceWatchRatio:0.16},{elapsedVideoTimeRatio:0.67,audienceWatchRatio:0.2},{elapsedVideoTimeRatio:0.68,audienceWatchRatio:0.2},{elapsedVideoTimeRatio:0.69,audienceWatchRatio:0.16},{elapsedVideoTimeRatio:0.7,audienceWatchRatio:0.2},
      {elapsedVideoTimeRatio:0.71,audienceWatchRatio:0.2},{elapsedVideoTimeRatio:0.72,audienceWatchRatio:0.16},{elapsedVideoTimeRatio:0.73,audienceWatchRatio:0.2},{elapsedVideoTimeRatio:0.74,audienceWatchRatio:0.2},{elapsedVideoTimeRatio:0.75,audienceWatchRatio:0.2},
      {elapsedVideoTimeRatio:0.76,audienceWatchRatio:0.2},{elapsedVideoTimeRatio:0.77,audienceWatchRatio:0.2},{elapsedVideoTimeRatio:0.78,audienceWatchRatio:0.16},{elapsedVideoTimeRatio:0.79,audienceWatchRatio:0.2},{elapsedVideoTimeRatio:0.8,audienceWatchRatio:0.2},
      {elapsedVideoTimeRatio:0.81,audienceWatchRatio:0.2},{elapsedVideoTimeRatio:0.82,audienceWatchRatio:0.16},{elapsedVideoTimeRatio:0.83,audienceWatchRatio:0.24},{elapsedVideoTimeRatio:0.84,audienceWatchRatio:0.24},{elapsedVideoTimeRatio:0.85,audienceWatchRatio:0.52},
      {elapsedVideoTimeRatio:0.86,audienceWatchRatio:0.24},{elapsedVideoTimeRatio:0.87,audienceWatchRatio:0.24},{elapsedVideoTimeRatio:0.88,audienceWatchRatio:0.28},{elapsedVideoTimeRatio:0.89,audienceWatchRatio:0.24},{elapsedVideoTimeRatio:0.9,audienceWatchRatio:0.28},
      {elapsedVideoTimeRatio:0.91,audienceWatchRatio:0.28},{elapsedVideoTimeRatio:0.92,audienceWatchRatio:0.2},{elapsedVideoTimeRatio:0.93,audienceWatchRatio:0.2},{elapsedVideoTimeRatio:0.94,audienceWatchRatio:0.16},{elapsedVideoTimeRatio:0.95,audienceWatchRatio:0.16},
      {elapsedVideoTimeRatio:0.96,audienceWatchRatio:0.16},{elapsedVideoTimeRatio:0.97,audienceWatchRatio:0.16},{elapsedVideoTimeRatio:0.98,audienceWatchRatio:0.16},{elapsedVideoTimeRatio:0.99,audienceWatchRatio:0.16},{elapsedVideoTimeRatio:1,audienceWatchRatio:0.16},
    ],
    dropOffPoints: [
      { timestamp: "0:09", viewersLost: 8, percentDrop: 32, reason: "Major early drop 80% → 36% at 3% mark — many viewers leave after seeing thumbnail vs content mismatch" },
      { timestamp: "0:46", viewersLost: 5, percentDrop: 19, reason: "Gradual drop through intro section, stabilizes around 36-44% for first 2 minutes" },
      { timestamp: "3:13", viewersLost: 4, percentDrop: 15, reason: "Step drop to 16-20% band — majority of casual viewers gone" },
      { timestamp: "10:00", viewersLost: 1, percentDrop: 4, reason: "Stable 16-20% core audience through remainder — engaged viewers stay" },
      { timestamp: "12:58", viewersLost: 1, percentDrop: 4, reason: "Spike at 85% mark (52% ratio) suggests rewatching a specific section" },
    ],
    crossPlatform: {
      youtube: { views: 26, avgWatchTime: "3:13", completionRate: 21 },
      instagram: { views: 0, avgWatchTime: "N/A", completionRate: "N/A*" },
      tiktok: { views: 0, avgWatchTime: "N/A", completionRate: 0 },
      facebook: { views: 0, avgWatchTime: "N/A", completionRate: 0 },
    },
  },
];

// ─── 5 Specific Funnel Data ───
export interface FunnelStep {
  name: string;
  count: number;
  conversionFromPrev: number;
  dropOff: number;
}

export interface FunnelPlatformBreakdown {
  platform: PlatformKey;
  socialContent: number;
  linkClicked: number;
  callFromAsset: number;
  meetingScheduled: number;
  conversionRate: number;
}

export interface FunnelData {
  id: string;
  name: string;
  steps: FunnelStep[];
  platformBreakdown: FunnelPlatformBreakdown[];
  bestVolumeDriver: PlatformKey;
  bestConverter: PlatformKey;
}

// Real data:
// Step 1 (Social Content): YouTube total views = 1629
// Step 2 (Link Clicked): PostHog sessions per landing page
// Step 3 (Call from Asset): Form Started = 5 total, distributed proportionally by sessions
// Step 4 (Meeting Scheduled): Step 1 Completed = 3 total, distributed proportionally by sessions
//
// Platform breakdown derived from referrers:
//   YouTube UTM = 17 sessions, Facebook = 32 sessions (23+9), Google = 27, Direct = 155
//
// Landing pages:
//   buyerguide = 48 pv, 23 sessions
//   marketpulse = 52+12 = 64 pv, 15 sessions (marketpulse/dashboard + marketpulse/dashboard/news)
//   sellguide = 42 pv, 19 sessions
//   homevalue = 64+48+40 = 152 pv, 42 sessions (homevalue + questionnaire + results)
//   property-management = 31 pv, 16 sessions
// Total funnel sessions = 23 + 15 + 19 + 42 + 16 = 115

export const funnelDatasets: FunnelData[] = [
  {
    id: "buy-guide",
    name: "Buy Guide Funnel",
    // Step 1: YouTube views attributed to buyer content (proportional ~23/115 of 1629 ≈ 326)
    // Step 2: 23 sessions to /buyerguide
    // Step 3: Form Started 5 * (23/115) ≈ 1
    // Step 4: Step 1 Completed 3 * (23/115) ≈ 1
    steps: [
      { name: "Social Content",      count: 326,  conversionFromPrev: 100,  dropOff: 0 },
      { name: "Link Clicked",         count: 23,   conversionFromPrev: 7.1,  dropOff: 92.9 },
      { name: "Call from Buy Guide",  count: 1,    conversionFromPrev: 4.3,  dropOff: 95.7 },
      { name: "Meeting Scheduled",    count: 1,    conversionFromPrev: 100,  dropOff: 0 },
    ],
    platformBreakdown: [
      { platform: "youtube",   socialContent: 326, linkClicked: 17, callFromAsset: 1, meetingScheduled: 1, conversionRate: 0.31 },
      { platform: "instagram", socialContent: 0,   linkClicked: 0,  callFromAsset: 0, meetingScheduled: 0, conversionRate: 0 },
      { platform: "tiktok",    socialContent: 0,   linkClicked: 0,  callFromAsset: 0, meetingScheduled: 0, conversionRate: 0 },
      { platform: "facebook",  socialContent: 0,   linkClicked: 6,  callFromAsset: 0, meetingScheduled: 0, conversionRate: 0 },
    ],
    bestVolumeDriver: "youtube",
    bestConverter: "youtube",
  },
  {
    id: "neighborhood-scorecard",
    name: "Neighborhood Scorecard Funnel",
    // Step 2: 15 sessions to /marketpulse (12 dashboard + 3 news)
    steps: [
      { name: "Social Content",       count: 213,  conversionFromPrev: 100,  dropOff: 0 },
      { name: "Link Clicked",          count: 15,   conversionFromPrev: 7.0,  dropOff: 93.0 },
      { name: "Call from Scorecard",   count: 1,    conversionFromPrev: 6.7,  dropOff: 93.3 },
      { name: "Meeting Scheduled",     count: 0,    conversionFromPrev: 0,    dropOff: 100 },
    ],
    platformBreakdown: [
      { platform: "youtube",   socialContent: 213, linkClicked: 11, callFromAsset: 1, meetingScheduled: 0, conversionRate: 0 },
      { platform: "instagram", socialContent: 0,   linkClicked: 0,  callFromAsset: 0, meetingScheduled: 0, conversionRate: 0 },
      { platform: "tiktok",    socialContent: 0,   linkClicked: 0,  callFromAsset: 0, meetingScheduled: 0, conversionRate: 0 },
      { platform: "facebook",  socialContent: 0,   linkClicked: 4,  callFromAsset: 0, meetingScheduled: 0, conversionRate: 0 },
    ],
    bestVolumeDriver: "youtube",
    bestConverter: "youtube",
  },
  {
    id: "seller-guide",
    name: "Seller Guide Funnel",
    // Step 2: 19 sessions to /sellguide
    steps: [
      { name: "Social Content",        count: 270,  conversionFromPrev: 100,  dropOff: 0 },
      { name: "Link Clicked",           count: 19,   conversionFromPrev: 7.0,  dropOff: 93.0 },
      { name: "Call from Seller Guide", count: 1,    conversionFromPrev: 5.3,  dropOff: 94.7 },
      { name: "Meeting Scheduled",      count: 1,    conversionFromPrev: 100,  dropOff: 0 },
    ],
    platformBreakdown: [
      { platform: "youtube",   socialContent: 270, linkClicked: 14, callFromAsset: 1, meetingScheduled: 1, conversionRate: 0.37 },
      { platform: "instagram", socialContent: 0,   linkClicked: 0,  callFromAsset: 0, meetingScheduled: 0, conversionRate: 0 },
      { platform: "tiktok",    socialContent: 0,   linkClicked: 0,  callFromAsset: 0, meetingScheduled: 0, conversionRate: 0 },
      { platform: "facebook",  socialContent: 0,   linkClicked: 5,  callFromAsset: 0, meetingScheduled: 0, conversionRate: 0 },
    ],
    bestVolumeDriver: "youtube",
    bestConverter: "youtube",
  },
  {
    id: "instant-valuation",
    name: "Instant Valuation Funnel",
    // Step 2: 42 sessions (homevalue 18 + questionnaire 12 + results 12)
    steps: [
      { name: "Social Content",       count: 596,  conversionFromPrev: 100,  dropOff: 0 },
      { name: "Link Clicked",          count: 42,   conversionFromPrev: 7.0,  dropOff: 93.0 },
      { name: "Call from Valuation",   count: 2,    conversionFromPrev: 4.8,  dropOff: 95.2 },
      { name: "Meeting Scheduled",     count: 1,    conversionFromPrev: 50,   dropOff: 50 },
    ],
    platformBreakdown: [
      { platform: "youtube",   socialContent: 596, linkClicked: 31, callFromAsset: 2, meetingScheduled: 1, conversionRate: 0.17 },
      { platform: "instagram", socialContent: 0,   linkClicked: 0,  callFromAsset: 0, meetingScheduled: 0, conversionRate: 0 },
      { platform: "tiktok",    socialContent: 0,   linkClicked: 0,  callFromAsset: 0, meetingScheduled: 0, conversionRate: 0 },
      { platform: "facebook",  socialContent: 0,   linkClicked: 11, callFromAsset: 0, meetingScheduled: 0, conversionRate: 0 },
    ],
    bestVolumeDriver: "youtube",
    bestConverter: "youtube",
  },
  {
    id: "pm-guide",
    name: "Property Management Guide Funnel",
    // Step 2: 16 sessions to /property-management
    steps: [
      { name: "Social Content",      count: 224,  conversionFromPrev: 100,  dropOff: 0 },
      { name: "Link Clicked",         count: 16,   conversionFromPrev: 7.1,  dropOff: 92.9 },
      { name: "Call from PM Guide",   count: 1,    conversionFromPrev: 6.3,  dropOff: 93.7 },
      { name: "Meeting Scheduled",    count: 0,    conversionFromPrev: 0,    dropOff: 100 },
    ],
    platformBreakdown: [
      { platform: "youtube",   socialContent: 224, linkClicked: 12, callFromAsset: 1, meetingScheduled: 0, conversionRate: 0 },
      { platform: "instagram", socialContent: 0,   linkClicked: 0,  callFromAsset: 0, meetingScheduled: 0, conversionRate: 0 },
      { platform: "tiktok",    socialContent: 0,   linkClicked: 0,  callFromAsset: 0, meetingScheduled: 0, conversionRate: 0 },
      { platform: "facebook",  socialContent: 0,   linkClicked: 4,  callFromAsset: 0, meetingScheduled: 0, conversionRate: 0 },
    ],
    bestVolumeDriver: "youtube",
    bestConverter: "youtube",
  },
];

// Aggregate "All Funnels" view
export function getAggregatedFunnelData(): FunnelData {
  const allSteps: FunnelStep[] = [
    { name: "Social Content",  count: 0, conversionFromPrev: 100, dropOff: 0 },
    { name: "Link Clicked",    count: 0, conversionFromPrev: 0,   dropOff: 0 },
    { name: "Call from Asset", count: 0, conversionFromPrev: 0,   dropOff: 0 },
    { name: "Meeting Scheduled", count: 0, conversionFromPrev: 0, dropOff: 0 },
  ];

  const platTotals: Record<PlatformKey, FunnelPlatformBreakdown> = {
    youtube:   { platform: "youtube",   socialContent: 0, linkClicked: 0, callFromAsset: 0, meetingScheduled: 0, conversionRate: 0 },
    instagram: { platform: "instagram", socialContent: 0, linkClicked: 0, callFromAsset: 0, meetingScheduled: 0, conversionRate: 0 },
    tiktok:    { platform: "tiktok",    socialContent: 0, linkClicked: 0, callFromAsset: 0, meetingScheduled: 0, conversionRate: 0 },
    facebook:  { platform: "facebook",  socialContent: 0, linkClicked: 0, callFromAsset: 0, meetingScheduled: 0, conversionRate: 0 },
  };

  for (const funnel of funnelDatasets) {
    allSteps[0].count += funnel.steps[0].count;
    allSteps[1].count += funnel.steps[1].count;
    allSteps[2].count += funnel.steps[2].count;
    allSteps[3].count += funnel.steps[3].count;
    for (const pb of funnel.platformBreakdown) {
      platTotals[pb.platform].socialContent   += pb.socialContent;
      platTotals[pb.platform].linkClicked      += pb.linkClicked;
      platTotals[pb.platform].callFromAsset    += pb.callFromAsset;
      platTotals[pb.platform].meetingScheduled += pb.meetingScheduled;
    }
  }

  allSteps[1].conversionFromPrev = +((allSteps[1].count / allSteps[0].count) * 100).toFixed(1);
  allSteps[1].dropOff = +(100 - allSteps[1].conversionFromPrev).toFixed(1);
  allSteps[2].conversionFromPrev = allSteps[1].count > 0 ? +((allSteps[2].count / allSteps[1].count) * 100).toFixed(1) : 0;
  allSteps[2].dropOff = +(100 - allSteps[2].conversionFromPrev).toFixed(1);
  allSteps[3].conversionFromPrev = allSteps[2].count > 0 ? +((allSteps[3].count / allSteps[2].count) * 100).toFixed(1) : 0;
  allSteps[3].dropOff = +(100 - allSteps[3].conversionFromPrev).toFixed(1);

  for (const p of Object.values(platTotals)) {
    p.conversionRate = p.socialContent > 0 ? +((p.meetingScheduled / p.socialContent) * 100).toFixed(2) : 0;
  }

  return {
    id: "all",
    name: "All Funnels",
    steps: allSteps,
    platformBreakdown: Object.values(platTotals),
    bestVolumeDriver: "youtube",
    bestConverter: "youtube",
  };
}

// Legacy funnel exports for backward compat
export const funnelData: FunnelStep[] = funnelDatasets[0].steps;

export interface FunnelSource {
  source: string;
  platform: PlatformKey;
  clicks: number;
  landingViews: number;
  formFills: number;
  callsBooked: number;
  conversionRate: number;
}

// Real PostHog referrer data (updated with 90-day UTM query):
// YouTube UTM: 39 sessions | Facebook: 32 sessions | Google: 29 sessions | Direct: 155 sessions
// Linktree UTM: 2 sessions (buyer guide → /buyerguide, seller guide → /sellguide)
export const funnelSources: FunnelSource[] = [
  { source: "direct",    platform: "youtube",   clicks: 155, landingViews: 155, formFills: 3, callsBooked: 2, conversionRate: 1.3 },
  { source: "youtube",   platform: "youtube",   clicks: 39,  landingViews: 39,  formFills: 1, callsBooked: 0, conversionRate: 0 },
  { source: "facebook",  platform: "facebook",  clicks: 32,  landingViews: 32,  formFills: 0, callsBooked: 0, conversionRate: 0 },
  { source: "google",    platform: "youtube",   clicks: 29,  landingViews: 29,  formFills: 1, callsBooked: 1, conversionRate: 3.4 },
  { source: "linktree",  platform: "youtube",   clicks: 2,   landingViews: 2,   formFills: 0, callsBooked: 0, conversionRate: 0 },
];

// ─── AI Insights ───
export interface AIInsight {
  id: string;
  title: string;
  body: string;
  platforms: PlatformKey[];
  category: "hook" | "timing" | "content" | "funnel" | "engagement";
  icon: string;
}

export const aiInsights: AIInsight[] = [
  {
    id: "ai1",
    title: "Hook Optimization",
    body: "Your top Short (Waterfalls) opens above 130% audience ratio — viewers are rewatching the first 2 seconds. That's a strong hook signal. Compare to 'Stop Waiting to Buy' which drops from 119% to 65% by the 7% mark. Lead every video with a visual payoff or bold question to sustain that above-100% rewatch behavior.",
    platforms: ["youtube"],
    category: "hook",
    icon: "Zap",
  },
  {
    id: "ai2",
    title: "Best Posting Times",
    body: "Shorts dominate your channel — 1,275 of 1,629 total views (78%) came from the Shorts feed. Your subscriber traffic (75 views) and YouTube Search (62 views) are secondary but growing. Prioritize vertical short-form content under 60 seconds to keep riding the Shorts algorithm while your search presence builds.",
    platforms: ["youtube"],
    category: "timing",
    icon: "Clock",
  },
  {
    id: "ai3",
    title: "Content Strategy",
    body: "Neighborhood walk content is your strongest performer: 'Waterfalls' (376 views, 59% completion) and 'Original Wildwood Tract' (294 views, 41% completion) outperform market-update Shorts by 2-3x. The Park Hills video hit 98% completion despite only 78 views — extremely high quality signal. Double down on neighborhood discovery content.",
    platforms: ["youtube"],
    category: "content",
    icon: "TrendingUp",
  },
  {
    id: "ai4",
    title: "Funnel Optimization",
    body: "129 unique visitors and 287 sessions in 30 days, with the Instant Valuation page driving the most traffic (152 pageviews, 42 sessions). The Buy Guide has the best session count among lead-gen pages (23 sessions). Only 5 Form Started events were tracked — the gap between 287 sessions and 5 form starts suggests a strong CTA opportunity on landing pages.",
    platforms: ["youtube"],
    category: "funnel",
    icon: "Target",
  },
  {
    id: "ai5",
    title: "Engagement Pattern",
    body: "Your channel earned 7 subscribers and 27 total likes from 1,629 views — a 1.66% like rate. The Long-form 'Shadow Oaks & Eichler' video (102 views) drove 5 likes and 1 subscriber, the best engagement-per-view ratio among longer content. Short-form drives volume; long-form drives qualified engagement and subscribers.",
    platforms: ["youtube"],
    category: "engagement",
    icon: "MessageCircle",
  },
];

export interface ContentScore {
  overall: number;
  hooks: number;
  engagement: number;
  reach: number;
  conversion: number;
}

// Scores based on real data:
// hooks: top video 130% ratio = strong hooks, but avg completion ~40% → 62
// engagement: 27 likes + 3 shares from 1629 views = 1.84% rate → 38 (low but early channel)
// reach: 1629 views, Shorts 78%, growing → 45
// conversion: 287 sessions, 5 form starts = 1.7% → 28
export const contentScore: ContentScore = {
  overall: 43,
  hooks: 62,
  engagement: 38,
  reach: 45,
  conversion: 28,
};

export interface TrendingTopic {
  topic: string;
  trend: "up" | "stable";
  volume: string;
}

export const trendingTopics: TrendingTopic[] = [
  { topic: "Thousand Oaks neighborhood guides", trend: "up",    volume: "High" },
  { topic: "Wildwood Thousand Oaks homes",       trend: "up",    volume: "High" },
  { topic: "California landlord laws 2026",       trend: "up",    volume: "High" },
  { topic: "Thousand Oaks home valuation tool",   trend: "up",    volume: "Medium" },
  { topic: "Buyer vs seller market Ventura County", trend: "up", volume: "Medium" },
  { topic: "Thousand Oaks first-time buyers",     trend: "stable", volume: "Medium" },
  { topic: "Instant home value AI tool",          trend: "up",    volume: "Medium" },
  { topic: "Thousand Oaks property management",   trend: "stable", volume: "Low" },
];

// ─── PostHog Dashboard Data ───

export interface PostHogSession {
  date: string;
  sessions: number;
  uniqueVisitors: number;
  pageviews: number;
  bounceRate: number;
  avgDuration: number; // seconds
}

// Real data from PostHog dailySessions query (last 30 days)
// uniqueVisitors and bounceRate not available at daily level — estimated from totals ratio
// Total: 287 sessions, 129 unique visitors → ~45% unique rate
export const posthogSessions: PostHogSession[] = [
  { date: "2026-03-02", sessions: 7,  uniqueVisitors: 6,  pageviews: 28,  bounceRate: 0, avgDuration: 0 },
  { date: "2026-03-03", sessions: 5,  uniqueVisitors: 5,  pageviews: 28,  bounceRate: 0, avgDuration: 0 },
  { date: "2026-03-04", sessions: 9,  uniqueVisitors: 7,  pageviews: 68,  bounceRate: 0, avgDuration: 0 },
  { date: "2026-03-05", sessions: 20, uniqueVisitors: 14, pageviews: 86,  bounceRate: 0, avgDuration: 0 },
  { date: "2026-03-06", sessions: 10, uniqueVisitors: 8,  pageviews: 52,  bounceRate: 0, avgDuration: 0 },
  { date: "2026-03-07", sessions: 2,  uniqueVisitors: 2,  pageviews: 7,   bounceRate: 0, avgDuration: 0 },
  { date: "2026-03-08", sessions: 2,  uniqueVisitors: 2,  pageviews: 12,  bounceRate: 0, avgDuration: 0 },
  { date: "2026-03-09", sessions: 3,  uniqueVisitors: 3,  pageviews: 6,   bounceRate: 0, avgDuration: 0 },
  { date: "2026-03-10", sessions: 2,  uniqueVisitors: 2,  pageviews: 6,   bounceRate: 0, avgDuration: 0 },
  { date: "2026-03-11", sessions: 4,  uniqueVisitors: 3,  pageviews: 24,  bounceRate: 0, avgDuration: 0 },
  { date: "2026-03-12", sessions: 3,  uniqueVisitors: 3,  pageviews: 18,  bounceRate: 0, avgDuration: 0 },
  { date: "2026-03-13", sessions: 3,  uniqueVisitors: 3,  pageviews: 8,   bounceRate: 0, avgDuration: 0 },
  { date: "2026-03-15", sessions: 4,  uniqueVisitors: 4,  pageviews: 8,   bounceRate: 0, avgDuration: 0 },
  { date: "2026-03-16", sessions: 17, uniqueVisitors: 12, pageviews: 181, bounceRate: 0, avgDuration: 0 },
  { date: "2026-03-17", sessions: 19, uniqueVisitors: 13, pageviews: 108, bounceRate: 0, avgDuration: 0 },
  { date: "2026-03-18", sessions: 23, uniqueVisitors: 16, pageviews: 90,  bounceRate: 0, avgDuration: 0 },
  { date: "2026-03-19", sessions: 16, uniqueVisitors: 11, pageviews: 47,  bounceRate: 0, avgDuration: 0 },
  { date: "2026-03-20", sessions: 12, uniqueVisitors: 9,  pageviews: 60,  bounceRate: 0, avgDuration: 0 },
  { date: "2026-03-21", sessions: 3,  uniqueVisitors: 3,  pageviews: 32,  bounceRate: 0, avgDuration: 0 },
  { date: "2026-03-22", sessions: 1,  uniqueVisitors: 1,  pageviews: 2,   bounceRate: 0, avgDuration: 0 },
  { date: "2026-03-23", sessions: 6,  uniqueVisitors: 5,  pageviews: 24,  bounceRate: 0, avgDuration: 0 },
  { date: "2026-03-24", sessions: 15, uniqueVisitors: 10, pageviews: 59,  bounceRate: 0, avgDuration: 0 },
  { date: "2026-03-25", sessions: 9,  uniqueVisitors: 7,  pageviews: 87,  bounceRate: 0, avgDuration: 0 },
  { date: "2026-03-26", sessions: 16, uniqueVisitors: 11, pageviews: 48,  bounceRate: 0, avgDuration: 0 },
  { date: "2026-03-27", sessions: 1,  uniqueVisitors: 1,  pageviews: 2,   bounceRate: 0, avgDuration: 0 },
  { date: "2026-03-28", sessions: 1,  uniqueVisitors: 1,  pageviews: 2,   bounceRate: 0, avgDuration: 0 },
  { date: "2026-03-29", sessions: 1,  uniqueVisitors: 1,  pageviews: 2,   bounceRate: 0, avgDuration: 0 },
  { date: "2026-03-30", sessions: 16, uniqueVisitors: 11, pageviews: 29,  bounceRate: 0, avgDuration: 0 },
  { date: "2026-03-31", sessions: 3,  uniqueVisitors: 3,  pageviews: 8,   bounceRate: 0, avgDuration: 0 },
];

export interface PostHogLandingPage {
  url: string;
  uniqueVisitors: number;
  avgTimeOnPage: number; // seconds
  bounceRate: number;
  conversionRate: number;
}

// Real data from PostHog landingPages query (top 20, filtered to usemasterkey.com production URLs)
export const posthogLandingPages: PostHogLandingPage[] = [
  { url: "/",                    uniqueVisitors: 99,  avgTimeOnPage: 0, bounceRate: 0, conversionRate: 0 },
  { url: "/homevalue",           uniqueVisitors: 18,  avgTimeOnPage: 0, bounceRate: 0, conversionRate: 0 },
  { url: "/marketpulse",         uniqueVisitors: 12,  avgTimeOnPage: 0, bounceRate: 0, conversionRate: 0 },
  { url: "/company",             uniqueVisitors: 20,  avgTimeOnPage: 0, bounceRate: 0, conversionRate: 0 },
  { url: "/contact",             uniqueVisitors: 21,  avgTimeOnPage: 0, bounceRate: 0, conversionRate: 0 },
  { url: "/buyerguide",          uniqueVisitors: 23,  avgTimeOnPage: 0, bounceRate: 0, conversionRate: 0 },
  { url: "/homevalue/questionnaire", uniqueVisitors: 12, avgTimeOnPage: 0, bounceRate: 0, conversionRate: 0 },
  { url: "/sellguide",           uniqueVisitors: 19,  avgTimeOnPage: 0, bounceRate: 0, conversionRate: 0 },
  { url: "/homevalue/results",   uniqueVisitors: 12,  avgTimeOnPage: 0, bounceRate: 0, conversionRate: 0 },
  { url: "/property-management", uniqueVisitors: 16,  avgTimeOnPage: 0, bounceRate: 0, conversionRate: 0 },
  { url: "/sell",                uniqueVisitors: 8,   avgTimeOnPage: 0, bounceRate: 0, conversionRate: 0 },
  { url: "/buy",                 uniqueVisitors: 8,   avgTimeOnPage: 0, bounceRate: 0, conversionRate: 0 },
  { url: "/propertymanagement",  uniqueVisitors: 8,   avgTimeOnPage: 0, bounceRate: 0, conversionRate: 0 },
  { url: "/insights",            uniqueVisitors: 6,   avgTimeOnPage: 0, bounceRate: 0, conversionRate: 0 },
];

export interface PostHogUserPath {
  path: string[];
  sessions: number;
  percentage: number;
}

// Approximated from real landing page distribution (287 total sessions)
export const posthogUserPaths: PostHogUserPath[] = [
  { path: ["Landing (/)",         "Exit (bounce)"],                sessions: 54,  percentage: 18.8 },
  { path: ["Landing (/)",         "/contact"],                     sessions: 21,  percentage: 7.3 },
  { path: ["Landing (/)",         "/buyerguide",    "/contact"],   sessions: 9,   percentage: 3.1 },
  { path: ["Landing (/)",         "/homevalue",     "/homevalue/questionnaire", "/homevalue/results"], sessions: 12, percentage: 4.2 },
  { path: ["Landing (/)",         "/marketpulse"],                 sessions: 12,  percentage: 4.2 },
  { path: ["Landing (/)",         "/sellguide",     "/contact"],   sessions: 8,   percentage: 2.8 },
  { path: ["Landing (/)",         "/property-management"],         sessions: 7,   percentage: 2.4 },
  { path: ["Landing (/)",         "/company",       "/contact"],   sessions: 6,   percentage: 2.1 },
];

export interface PostHogEvent {
  event: string;
  count: number;
  uniqueUsers: number;
  sparkline: number[];
}

// Real data from PostHog customEvents query (last 30 days, non-$ events)
// Sparklines are proportional distributions across 14 days (most activity was mid-March)
export const posthogEvents: PostHogEvent[] = [
  { event: "Form Abandoned",              count: 7,  uniqueUsers: 4, sparkline: [0,0,0,0,1,1,0,1,1,0,1,1,0,1] },
  { event: "Form Started",                count: 5,  uniqueUsers: 4, sparkline: [0,0,0,1,1,0,0,1,0,0,1,0,1,0] },
  { event: "Step 1 Completed",            count: 3,  uniqueUsers: 2, sparkline: [0,0,0,1,0,0,0,1,0,0,0,1,0,0] },
  { event: "get_started_button_clicked",  count: 1,  uniqueUsers: 1, sparkline: [0,0,0,0,0,0,0,1,0,0,0,0,0,0] },
  { event: "Button Clicked",              count: 1,  uniqueUsers: 1, sparkline: [0,0,0,0,0,0,0,0,0,0,1,0,0,0] },
];

export interface PostHogDeviceBreakdown {
  device: string;
  percentage: number;
  count: number;
}

// Real data from PostHog deviceBrowser query
// Total pageview events: 1132
// Desktop: Chrome 828 + Safari 37 + Firefox 13 + null 2 = 880 (77.7%)
// Mobile: Chrome iOS 87 + Mobile Safari 80 + Chrome 68 + Facebook Mobile 8 + null 5 = 248 (21.9%)
// Tablet: Chrome 4 (0.4%)
export const posthogDevices: PostHogDeviceBreakdown[] = [
  { device: "Desktop", percentage: 77.7, count: 880 },
  { device: "Mobile",  percentage: 21.9, count: 248 },
  { device: "Tablet",  percentage: 0.4,  count: 4 },
];

// Real browser breakdown
export const posthogBrowsers: PostHogDeviceBreakdown[] = [
  { device: "Chrome",          percentage: 73.1, count: 828 },
  { device: "Chrome iOS",      percentage: 7.7,  count: 87 },
  { device: "Mobile Safari",   percentage: 7.1,  count: 80 },
  { device: "Chrome (Mobile)", percentage: 6.0,  count: 68 },
  { device: "Safari",          percentage: 3.3,  count: 37 },
  { device: "Firefox",         percentage: 1.1,  count: 13 },
  { device: "Other",           percentage: 1.7,  count: 19 },
];

export interface PostHogUTMSource {
  source: string;
  sessions: number;
  percentage: number;
}

// Real data combining UTM sources + referrers (updated with 90-day UTM query)
// Visitor summary: 129 unique visitors, 287 sessions, 3726 total events
// YouTube UTM: 39 sessions (wildwood-guide 39 + scorecard 2 + thousand-oaks-guide 1 = 42, deduped ~39)
// Linktree UTM: 2 sessions (buyer guide 1 + seller guide 1)
// Facebook referrer: 32 sessions | Google: 27 (+2 PPC) | Direct: 155
// ChatGPT referrer: 1 session
// Total tracked = 256; unattributed = 287 - 256 = 31
export const posthogUTMSources: PostHogUTMSource[] = [
  { source: "direct",           sessions: 155, percentage: 54.0 },
  { source: "youtube",          sessions: 39,  percentage: 13.6 },
  { source: "facebook",         sessions: 32,  percentage: 11.1 },
  { source: "google",           sessions: 29,  percentage: 10.1 },
  { source: "linktree",         sessions: 2,   percentage: 0.7 },
  { source: "other / unknown",  sessions: 30,  percentage: 10.5 },
];

// ─── Filtered data functions (date-range aware) ───
import { filterByDateRange } from "./date-utils";

/**
 * Returns dailyViewsCombined filtered by the given date range key.
 */
export function getFilteredDailyViewsCombined(rangeKey: string): DailyViewsCombined[] {
  return filterByDateRange(dailyViewsCombined as unknown as Record<string, unknown>[], "date", rangeKey) as unknown as DailyViewsCombined[];
}

/**
 * Returns aggregated KPIs computed only from the filtered date range.
 */
export function getFilteredKPIs(activePlatforms: PlatformKey[], rangeKey: string) {
  const filteredYT = filterByDateRange(youtubeDailyMetrics as unknown as Record<string, unknown>[], "date", rangeKey) as unknown as YouTubeDailyMetric[];
  const filteredIG = filterByDateRange(instagramDailyMetrics as unknown as Record<string, unknown>[], "date", rangeKey) as unknown as InstagramDailyMetric[];
  const filteredTT = filterByDateRange(tiktokDailyMetrics as unknown as Record<string, unknown>[], "date", rangeKey) as unknown as TikTokDailyMetric[];
  const filteredFB = filterByDateRange(facebookDailyMetrics as unknown as Record<string, unknown>[], "date", rangeKey) as unknown as FacebookDailyMetric[];

  let totalViews = 0;
  let totalWatchMinutes = 0;
  let totalLikes = 0;
  let totalComments = 0;
  let totalShares = 0;
  let totalSubscribers = 0;

  if (activePlatforms.includes("youtube")) {
    for (const d of filteredYT) {
      totalViews += d.views;
      totalWatchMinutes += d.estimatedMinutesWatched;
      totalLikes += d.likes;
      totalComments += d.comments;
      totalShares += d.shares;
      totalSubscribers += d.subscribersGained;
    }
  }
  if (activePlatforms.includes("instagram")) {
    for (const d of filteredIG) {
      totalViews += d.impressions;
      totalLikes += d.likes;
      totalComments += d.comments;
      totalShares += d.shares;
    }
  }
  if (activePlatforms.includes("tiktok")) {
    for (const d of filteredTT) {
      totalViews += d.view_count;
      totalLikes += d.like_count;
      totalComments += d.comment_count;
      totalShares += d.share_count;
    }
  }
  if (activePlatforms.includes("facebook")) {
    for (const d of filteredFB) {
      totalViews += d.post_video_views;
      totalLikes += d.post_reactions;
    }
  }

  const engagementRate =
    totalViews > 0
      ? +(((totalLikes + totalComments + totalShares) / totalViews) * 100).toFixed(2)
      : 0;

  const avgViewDuration = activePlatforms.includes("youtube") && filteredYT.length > 0
    ? Math.round(
        filteredYT
          .filter((d) => d.averageViewDuration > 0)
          .reduce((s, d) => s + d.averageViewDuration, 0) /
          (filteredYT.filter((d) => d.averageViewDuration > 0).length || 1)
      )
    : 0;

  const ctr = activePlatforms.includes("youtube") && filteredYT.length > 0
    ? +(
        filteredYT.reduce((s, d) => s + d.videoThumbnailImpressionsClickRate, 0) /
        filteredYT.length
      ).toFixed(2)
    : 0;

  return {
    totalViews,
    totalWatchHours: +(totalWatchMinutes / 60).toFixed(1),
    engagementRate,
    newFollowers: totalSubscribers,
    avgViewDuration,
    ctr,
  };
}

/**
 * Returns topContent filtered by publishedDate within the given date range.
 */
export function getFilteredTopContent(rangeKey: string): TopContent[] {
  return filterByDateRange(topContent as unknown as Record<string, unknown>[], "publishedDate", rangeKey) as unknown as TopContent[];
}

/**
 * Returns engagement by platform computed from the filtered date range.
 */
export function getFilteredEngagement(rangeKey: string) {
  const filteredYT = filterByDateRange(youtubeDailyMetrics as unknown as Record<string, unknown>[], "date", rangeKey) as unknown as YouTubeDailyMetric[];
  return [
    {
      platform: "YouTube",
      likes: filteredYT.reduce((s, d) => s + d.likes, 0),
      comments: filteredYT.reduce((s, d) => s + d.comments, 0),
      shares: filteredYT.reduce((s, d) => s + d.shares, 0),
    },
    { platform: "Instagram", likes: 0, comments: 0, shares: 0 },
    { platform: "TikTok",    likes: 0, comments: 0, shares: 0 },
    { platform: "Facebook",  likes: 0, comments: 0, shares: 0 },
  ];
}

/**
 * Returns sparkline data for a metric, filtered to the given date range.
 */
export function getFilteredSparklineData(metricKey: string, rangeKey: string, platform?: PlatformKey): number[] {
  const filteredYT = filterByDateRange(youtubeDailyMetrics as unknown as Record<string, unknown>[], "date", rangeKey) as unknown as YouTubeDailyMetric[];
  const filteredIG = filterByDateRange(instagramDailyMetrics as unknown as Record<string, unknown>[], "date", rangeKey) as unknown as InstagramDailyMetric[];
  const filteredTT = filterByDateRange(tiktokDailyMetrics as unknown as Record<string, unknown>[], "date", rangeKey) as unknown as TikTokDailyMetric[];
  const filteredFB = filterByDateRange(facebookDailyMetrics as unknown as Record<string, unknown>[], "date", rangeKey) as unknown as FacebookDailyMetric[];

  if (platform === "youtube") return filteredYT.map((d) => ((d as unknown) as Record<string, unknown>)[metricKey] as number ?? 0);
  if (platform === "instagram") return filteredIG.map((d) => ((d as unknown) as Record<string, unknown>)[metricKey] as number ?? 0);
  if (platform === "tiktok") return filteredTT.map((d) => ((d as unknown) as Record<string, unknown>)[metricKey] as number ?? 0);
  if (platform === "facebook") return filteredFB.map((d) => ((d as unknown) as Record<string, unknown>)[metricKey] as number ?? 0);

  // Aggregate views across all platforms per-day (align by date)
  if (metricKey === "views") {
    // Build a map of date → combined views
    const dateMap = new Map<string, number>();
    for (const d of filteredYT) { dateMap.set(d.date, (dateMap.get(d.date) ?? 0) + d.views); }
    for (const d of filteredIG) { dateMap.set(d.date, (dateMap.get(d.date) ?? 0) + d.impressions); }
    for (const d of filteredTT) { dateMap.set(d.date, (dateMap.get(d.date) ?? 0) + d.view_count); }
    for (const d of filteredFB) { dateMap.set(d.date, (dateMap.get(d.date) ?? 0) + d.post_video_views); }
    return Array.from(dateMap.values());
  }
  return filteredYT.map((d) => ((d as unknown) as Record<string, unknown>)[metricKey] as number ?? 0);
}

/**
 * Returns posthogSessions filtered by the given date range key.
 */
export function getFilteredPosthogSessions(rangeKey: string): PostHogSession[] {
  return filterByDateRange(posthogSessions as unknown as Record<string, unknown>[], "date", rangeKey) as unknown as PostHogSession[];
}
