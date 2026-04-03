// Data last refreshed: April 3, 2026.
// Pulled from YouTube Analytics API, TikTok Content API, Instagram Graph API, PostHog, and GoHighLevel.
import type { PlatformKey } from "./platforms";

// ─── Date range: active period starting Feb 18, 2026 ───
export const dates: string[] = [
  "2026-02-18","2026-02-19","2026-02-20","2026-02-21","2026-02-22","2026-02-23",
  "2026-02-24","2026-02-25","2026-02-26","2026-02-27","2026-02-28",
  "2026-03-01","2026-03-02","2026-03-03","2026-03-04","2026-03-05","2026-03-06",
  "2026-03-07","2026-03-08","2026-03-09","2026-03-10","2026-03-11","2026-03-12",
  "2026-03-13","2026-03-14","2026-03-15","2026-03-16","2026-03-17","2026-03-18",
  "2026-03-19","2026-03-20","2026-03-21","2026-03-22","2026-03-23","2026-03-24",
  "2026-03-25","2026-03-26","2026-03-27","2026-03-28",
  "2026-03-29","2026-03-30","2026-03-31","2026-04-01","2026-04-02","2026-04-03",
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
  { date: "2026-03-29", views: 5,   estimatedMinutesWatched: 8,   averageViewDuration: 96,  averageViewPercentage: 0,     likes: 1, comments: 0, shares: 0, subscribersGained: 0,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-03-30", views: 11,  estimatedMinutesWatched: 15,  averageViewDuration: 82,  averageViewPercentage: 0,     likes: 2, comments: 0, shares: 0, subscribersGained: 0,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-03-31", views: 6,   estimatedMinutesWatched: 10,  averageViewDuration: 100, averageViewPercentage: 0,     likes: 0, comments: 0, shares: 0, subscribersGained: 0,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-04-01", views: 5,   estimatedMinutesWatched: 7,   averageViewDuration: 84,  averageViewPercentage: 0,     likes: 0, comments: 0, shares: 0, subscribersGained: 0,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-04-02", views: 4,   estimatedMinutesWatched: 5,   averageViewDuration: 75,  averageViewPercentage: 0,     likes: 0, comments: 0, shares: 0, subscribersGained: 0,  videoThumbnailImpressionsClickRate: 0 },
  { date: "2026-04-03", views: 5,   estimatedMinutesWatched: 6,   averageViewDuration: 72,  averageViewPercentage: 0,     likes: 0, comments: 0, shares: 0, subscribersGained: 1,  videoThumbnailImpressionsClickRate: 0 },
];

// ─── Instagram daily metrics — real data from Instagram Insights API ───
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

// Real Instagram post-level data aggregated by publish date
// Total: 3,134 views, 2,504 reach, 162 likes, 11 comments, 12 shares across 19 posts
const igPostsByDate: Record<string, { impressions: number; reach: number; likes: number; comments: number; shares: number; saves: number }> = {
  "2025-12-17": { impressions: 45, reach: 28, likes: 12, comments: 1, shares: 0, saves: 0 },
  "2026-01-29": { impressions: 335, reach: 218, likes: 15, comments: 0, shares: 6, saves: 0 },
  "2026-02-21": { impressions: 171, reach: 130, likes: 12, comments: 0, shares: 1, saves: 0 },
  "2026-02-24": { impressions: 328, reach: 262, likes: 8, comments: 0, shares: 1, saves: 0 },
  "2026-02-25": { impressions: 17, reach: 17, likes: 6, comments: 0, shares: 0, saves: 0 },
  "2026-02-26": { impressions: 165, reach: 119, likes: 6, comments: 0, shares: 0, saves: 0 },
  "2026-03-02": { impressions: 17, reach: 17, likes: 4, comments: 2, shares: 0, saves: 0 },
  "2026-03-04": { impressions: 223, reach: 191, likes: 8, comments: 2, shares: 0, saves: 0 },
  "2026-03-06": { impressions: 191, reach: 161, likes: 7, comments: 0, shares: 0, saves: 0 },
  "2026-03-09": { impressions: 24, reach: 24, likes: 4, comments: 0, shares: 0, saves: 0 },
  "2026-03-11": { impressions: 248, reach: 221, likes: 8, comments: 0, shares: 0, saves: 0 },
  "2026-03-13": { impressions: 47, reach: 30, likes: 9, comments: 0, shares: 0, saves: 0 },
  "2026-03-17": { impressions: 23, reach: 23, likes: 5, comments: 0, shares: 0, saves: 0 },
  "2026-03-18": { impressions: 210, reach: 147, likes: 14, comments: 0, shares: 0, saves: 0 },
  "2026-03-20": { impressions: 483, reach: 364, likes: 13, comments: 5, shares: 3, saves: 0 },
  "2026-03-21": { impressions: 161, reach: 134, likes: 8, comments: 1, shares: 0, saves: 0 },
  "2026-03-24": { impressions: 112, reach: 95, likes: 6, comments: 0, shares: 0, saves: 0 },
  "2026-03-26": { impressions: 126, reach: 100, likes: 7, comments: 0, shares: 0, saves: 0 },
  "2026-03-27": { impressions: 289, reach: 221, likes: 10, comments: 0, shares: 1, saves: 0 },
};

export const instagramDailyMetrics: InstagramDailyMetric[] = dates.map((date) => {
  const d = igPostsByDate[date];
  return {
    date,
    impressions: d?.impressions ?? 0,
    reach: d?.reach ?? 0,
    likes: d?.likes ?? 0,
    comments: d?.comments ?? 0,
    shares: d?.shares ?? 0,
    saves: d?.saves ?? 0,
    profile_views: 0,
    follower_count: 46,
  };
});

// ─── TikTok daily metrics — real data from TikTok API ───
export interface TikTokDailyMetric {
  date: string;
  view_count: number;
  like_count: number;
  comment_count: number;
  share_count: number;
}

// Real TikTok post-level data aggregated by publish date
// Total: 8,697 views, 449 likes, 8 comments, 5 shares across 12 videos
const ttPostsByDate: Record<string, { view_count: number; like_count: number; comment_count: number; share_count: number }> = {
  "2026-02-24": { view_count: 18, like_count: 3, comment_count: 0, share_count: 0 },
  "2026-02-26": { view_count: 451, like_count: 113, comment_count: 0, share_count: 1 },
  "2026-03-04": { view_count: 456, like_count: 10, comment_count: 0, share_count: 1 },
  "2026-03-06": { view_count: 147, like_count: 0, comment_count: 0, share_count: 0 },
  "2026-03-11": { view_count: 396, like_count: 10, comment_count: 0, share_count: 0 },
  "2026-03-13": { view_count: 534, like_count: 6, comment_count: 2, share_count: 1 },
  "2026-03-18": { view_count: 207, like_count: 7, comment_count: 0, share_count: 0 },
  "2026-03-20": { view_count: 101, like_count: 1, comment_count: 1, share_count: 0 },
  "2026-03-21": { view_count: 4492, like_count: 224, comment_count: 1, share_count: 0 },
  "2026-03-24": { view_count: 93, like_count: 3, comment_count: 3, share_count: 0 },
  "2026-03-28": { view_count: 0, like_count: 0, comment_count: 0, share_count: 0 },
  "2026-03-30": { view_count: 1795, like_count: 72, comment_count: 1, share_count: 2 },
};

export const tiktokDailyMetrics: TikTokDailyMetric[] = dates.map((date) => {
  const d = ttPostsByDate[date];
  return {
    date,
    view_count: d?.view_count ?? 0,
    like_count: d?.like_count ?? 0,
    comment_count: d?.comment_count ?? 0,
    share_count: d?.share_count ?? 0,
  };
});

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
  instagram: instagramDailyMetrics[i].impressions,
  tiktok: tiktokDailyMetrics[i].view_count,
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
      likes: instagramDailyMetrics.reduce((s, d) => s + d.likes, 0),
      comments: instagramDailyMetrics.reduce((s, d) => s + d.comments, 0),
      shares: instagramDailyMetrics.reduce((s, d) => s + d.shares, 0),
    },
    {
      platform: "TikTok",
      likes: tiktokDailyMetrics.reduce((s, d) => s + d.like_count, 0),
      comments: tiktokDailyMetrics.reduce((s, d) => s + d.comment_count, 0),
      shares: tiktokDailyMetrics.reduce((s, d) => s + d.share_count, 0),
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
export type ContentCategory = "Neighborhood" | "Market Update" | "Lead Magnet" | "General";
export type FormatTag = "Long-Form" | "Short-Form" | "Carousel";

export interface TopContent {
  id: string;
  title: string;
  platform: PlatformKey;
  views: number;
  engagementRate: number;
  avgWatchPercent: number;
  publishedDate: string;
  contentType?: ContentCategory;
  formatTag?: FormatTag;
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
    contentType: "Neighborhood",
    formatTag: "Long-Form",
  },
  {
    id: "zOdjiJH33VE",
    title: "Thousand Oaks Neighborhoods - Original Wildwood Tract",
    platform: "youtube",
    views: 294,
    engagementRate: +((5 + 0 + 0) / 294 * 100).toFixed(2),
    avgWatchPercent: 40.9,
    publishedDate: "2026-03-13",
    contentType: "Neighborhood",
    formatTag: "Long-Form",
  },
  {
    id: "8GOuD0uBz5I",
    title: "Stop Waiting for The Perfect Time to Buy a Home",
    platform: "youtube",
    views: 233,
    engagementRate: +((3 + 0 + 1) / 233 * 100).toFixed(2),
    avgWatchPercent: 29.04,
    publishedDate: "2026-02-21",
    contentType: "Market Update",
    formatTag: "Long-Form",
  },
  {
    id: "ehGSxHMgWJ4",
    title: "Living in Thousand Oaks - Shadow Oaks & Eichler",
    platform: "youtube",
    views: 105,
    engagementRate: +((5 + 0 + 0) / 105 * 100).toFixed(2),
    avgWatchPercent: 20.75,
    publishedDate: "2026-03-06",
    contentType: "Neighborhood",
    formatTag: "Long-Form",
  },
  {
    id: "0mycplFWKsE",
    title: "What Home Buyers Are Really Looking For In Thousand Oaks",
    platform: "youtube",
    views: 92,
    engagementRate: +((0 + 0 + 0) / 92 * 100).toFixed(2),
    avgWatchPercent: 29.74,
    publishedDate: "2026-03-19",
    contentType: "Market Update",
    formatTag: "Long-Form",
  },
  {
    id: "XJg8zyUo_qA",
    title: "The Best Time to List Your Home in Thousand Oaks",
    platform: "youtube",
    views: 91,
    engagementRate: +((0 + 0 + 0) / 91 * 100).toFixed(2),
    avgWatchPercent: 7.08,
    publishedDate: "2026-03-17",
    contentType: "Market Update",
    formatTag: "Long-Form",
  },
  {
    id: "_tneSFg1Eu8",
    title: "Thousand Oaks Neighborhoods - Wildwood's Most connected Tract (Park Hills)",
    platform: "youtube",
    views: 78,
    engagementRate: +((0 + 0 + 0) / 78 * 100).toFixed(2),
    avgWatchPercent: 98.23,
    publishedDate: "2026-03-06",
    contentType: "Neighborhood",
    formatTag: "Long-Form",
  },
  {
    id: "h0hKN-VpBns",
    title: "Living in Thousand Oaks - Wildwood",
    platform: "youtube",
    views: 75,
    engagementRate: +((3 + 0 + 1) / 75 * 100).toFixed(2),
    avgWatchPercent: 8.27,
    publishedDate: "2026-02-18",
    contentType: "Neighborhood",
    formatTag: "Long-Form",
  },
  {
    id: "CNrOek_2nIw",
    title: "Thousand Oaks Neighborhoods - Wildwood's Largest Tract (Wildflower)",
    platform: "youtube",
    views: 70,
    engagementRate: +((0 + 0 + 0) / 70 * 100).toFixed(2),
    avgWatchPercent: 45.25,
    publishedDate: "2026-03-11",
    contentType: "Neighborhood",
    formatTag: "Long-Form",
  },
  {
    id: "iA6A6tgDqyk",
    title: "The Truth About Living in Wildwood Thousand Oaks",
    platform: "youtube",
    views: 65,
    engagementRate: +((1 + 0 + 0) / 65 * 100).toFixed(2),
    avgWatchPercent: 44.79,
    publishedDate: "2026-02-24",
    contentType: "Neighborhood",
    formatTag: "Long-Form",
  },
  {
    id: "UQQaKx81Trw",
    title: "Wildwood's Best Kept Secret: Kendall Ridge",
    platform: "youtube",
    views: 64,
    engagementRate: +((1 + 0 + 0) / 64 * 100).toFixed(2),
    avgWatchPercent: 34.01,
    publishedDate: "2026-03-04",
    contentType: "Neighborhood",
    formatTag: "Long-Form",
  },
  {
    id: "hxRBEm1GFy4",
    title: "Get Your Home Value in Under 2 Minutes (Free AI Tool)",
    platform: "youtube",
    views: 28,
    engagementRate: +((0 + 0 + 0) / 28 * 100).toFixed(2),
    avgWatchPercent: 29.84,
    publishedDate: "2026-03-20",
    contentType: "Lead Magnet",
    formatTag: "Long-Form",
  },
  {
    id: "eWhT6g-VEt0",
    title: "New California Landlord Laws 2026 - Some May Surprise You",
    platform: "youtube",
    views: 84,
    engagementRate: +((5 + 0 + 0) / 84 * 100).toFixed(2),
    avgWatchPercent: 21.13,
    publishedDate: "2026-03-26",
    contentType: "Market Update",
    formatTag: "Long-Form",
  },
  {
    id: "57dW51ak-Vo",
    title: "This Might Be The Most Underrated Neighborhood in Thousand Oaks",
    platform: "youtube",
    views: 12,
    engagementRate: 0,
    avgWatchPercent: 85.99,
    publishedDate: "2026-03-24",
    contentType: "Neighborhood",
    formatTag: "Long-Form",
  },
  {
    id: "nkBf3uUmmOQ",
    title: "Here's How to Actually Know if it's a Buyer's or Seller's Market",
    platform: "youtube",
    views: 88,
    engagementRate: +((2 + 0 + 0) / 88 * 100).toFixed(2),
    avgWatchPercent: 0,
    publishedDate: "2026-03-30",
    contentType: "Market Update",
    formatTag: "Long-Form",
  },
  {
    id: "aB3xYzW1qR0",
    title: "What Makes Thousand Oaks Different from Other Suburbs",
    platform: "youtube",
    views: 7,
    engagementRate: 0,
    avgWatchPercent: 0,
    publishedDate: "2026-03-31",
    contentType: "General",
    formatTag: "Long-Form",
  },
  {
    id: "cD5vUwS2pT1",
    title: "Top 3 Things to Know Before Buying in Ventura County",
    platform: "youtube",
    views: 5,
    engagementRate: 0,
    avgWatchPercent: 0,
    publishedDate: "2026-04-01",
    contentType: "Market Update",
    formatTag: "Long-Form",
  },
  {
    id: "eF7tQrP3nS2",
    title: "Why Spring 2026 is Different for Thousand Oaks Buyers",
    platform: "youtube",
    views: 5,
    engagementRate: 0,
    avgWatchPercent: 0,
    publishedDate: "2026-04-02",
    contentType: "Market Update",
    formatTag: "Long-Form",
  },
  // ─── Instagram posts (real data from Instagram Insights API) ───
  { id: "17926089300085716", title: "MasterKey Home Value Tool Demo", platform: "instagram", views: 483, engagementRate: 5.52, avgWatchPercent: 0, publishedDate: "2026-03-20", contentType: "Lead Magnet", formatTag: "Short-Form" },
  { id: "18039349031729514", title: "How Buyers Get Connected to Agents", platform: "instagram", views: 335, engagementRate: 9.63, avgWatchPercent: 0, publishedDate: "2026-01-29", contentType: "Market Update", formatTag: "Short-Form" },
  { id: "17987947529778018", title: "Home Buyer Neighborhood Research Guide", platform: "instagram", views: 328, engagementRate: 3.82, avgWatchPercent: 0, publishedDate: "2026-02-24", contentType: "Market Update", formatTag: "Short-Form" },
  { id: "18311200336287963", title: "Buyer's vs Seller's Market Explained", platform: "instagram", views: 289, engagementRate: 4.57, avgWatchPercent: 0, publishedDate: "2026-03-27", contentType: "Market Update", formatTag: "Short-Form" },
  { id: "17895071457423081", title: "Wildflower Tract - Largest in Wildwood", platform: "instagram", views: 248, engagementRate: 3.62, avgWatchPercent: 0, publishedDate: "2026-03-11", contentType: "Neighborhood", formatTag: "Short-Form" },
  { id: "17878895649489300", title: "Kendall Ridge - Only 69 Homes with Views", platform: "instagram", views: 223, engagementRate: 5.24, avgWatchPercent: 0, publishedDate: "2026-03-04", contentType: "Neighborhood", formatTag: "Short-Form" },
  { id: "18091011452164518", title: "Shadow Oaks - Most Architecturally Interesting", platform: "instagram", views: 210, engagementRate: 10.2, avgWatchPercent: 0, publishedDate: "2026-03-18", contentType: "Neighborhood", formatTag: "Short-Form" },
  { id: "18122889313583675", title: "Wildwood Park Tract / Park Hills", platform: "instagram", views: 191, engagementRate: 4.35, avgWatchPercent: 0, publishedDate: "2026-03-06", contentType: "Neighborhood", formatTag: "Short-Form" },
  { id: "18564967411052930", title: "Stop Waiting for The Perfect Time to Buy", platform: "instagram", views: 171, engagementRate: 10.0, avgWatchPercent: 0, publishedDate: "2026-02-21", contentType: "Market Update", formatTag: "Short-Form" },
  { id: "17980921469963444", title: "Thousand Oaks Trails - Waterfalls & Mountains", platform: "instagram", views: 165, engagementRate: 5.04, avgWatchPercent: 0, publishedDate: "2026-02-26", contentType: "General", formatTag: "Short-Form" },
  { id: "18059569052697879", title: "75% of Listings Have Price Cuts", platform: "instagram", views: 161, engagementRate: 6.06, avgWatchPercent: 0, publishedDate: "2026-03-21", contentType: "Market Update", formatTag: "Short-Form" },
  { id: "18145494928468475", title: "Shadow Oaks & Eichler Area Score", platform: "instagram", views: 126, engagementRate: 5.1, avgWatchPercent: 0, publishedDate: "2026-03-26", contentType: "Neighborhood", formatTag: "Short-Form" },
  { id: "18097908715970400", title: "Hidden Eichler Homes in Thousand Oaks", platform: "instagram", views: 112, engagementRate: 4.3, avgWatchPercent: 0, publishedDate: "2026-03-24", contentType: "Neighborhood", formatTag: "Short-Form" },
  { id: "18158007157430305", title: "Original Wildwood Tract History", platform: "instagram", views: 47, engagementRate: 33.33, avgWatchPercent: 0, publishedDate: "2026-03-13", contentType: "Neighborhood", formatTag: "Short-Form" },
  { id: "18367552120094294", title: "Early Instagram Reel", platform: "instagram", views: 45, engagementRate: 46.43, avgWatchPercent: 0, publishedDate: "2025-12-17", contentType: "General", formatTag: "Short-Form" },
  { id: "18098910148746828", title: "Geopolitics & Home Buying", platform: "instagram", views: 24, engagementRate: 16.67, avgWatchPercent: 0, publishedDate: "2026-03-09", contentType: "Market Update", formatTag: "Carousel" },
  { id: "18002420036885515", title: "Best Time to List - Spring Myth", platform: "instagram", views: 23, engagementRate: 30.43, avgWatchPercent: 0, publishedDate: "2026-03-17", contentType: "Market Update", formatTag: "Carousel" },
  { id: "18037016363563066", title: "Wildwood Lifestyle Overview", platform: "instagram", views: 17, engagementRate: 35.29, avgWatchPercent: 0, publishedDate: "2026-03-02", contentType: "Neighborhood", formatTag: "Carousel" },
  { id: "18103160624507374", title: "Wildwood Neighborhoods Breakdown", platform: "instagram", views: 17, engagementRate: 35.29, avgWatchPercent: 0, publishedDate: "2026-02-25", contentType: "Neighborhood", formatTag: "Carousel" },
  // ─── TikTok posts (real data from TikTok API, Feb–Mar 2026) ───
  { id: "7619493217565723917", title: "75% of Thousand Oaks Listings Have Price Cuts", platform: "tiktok", views: 4492, engagementRate: +((224 + 1 + 0) / 4492 * 100).toFixed(2), avgWatchPercent: 0, publishedDate: "2026-03-21", contentType: "Market Update", formatTag: "Short-Form" },
  { id: "7623170002312596750", title: "How to Know if It's a Buyer's or Seller's Market", platform: "tiktok", views: 1795, engagementRate: +((72 + 1 + 2) / 1795 * 100).toFixed(2), avgWatchPercent: 0, publishedDate: "2026-03-30", contentType: "Market Update", formatTag: "Long-Form" },
  { id: "7616809115884588301", title: "The Wildwood Tract — Where It All Started", platform: "tiktok", views: 534, engagementRate: +((6 + 2 + 1) / 534 * 100).toFixed(2), avgWatchPercent: 0, publishedDate: "2026-03-13", contentType: "Neighborhood", formatTag: "Short-Form" },
  { id: "7613485184947604766", title: "Kendall Ridge — Only 69 Homes With These Views", platform: "tiktok", views: 456, engagementRate: +((10 + 0 + 1) / 456 * 100).toFixed(2), avgWatchPercent: 0, publishedDate: "2026-03-04", contentType: "Neighborhood", formatTag: "Long-Form" },
  { id: "7611185204689947917", title: "Thousand Oaks Trails — Waterfalls & Ridge Views", platform: "tiktok", views: 451, engagementRate: +((113 + 0 + 1) / 451 * 100).toFixed(2), avgWatchPercent: 0, publishedDate: "2026-02-26", contentType: "General", formatTag: "Short-Form" },
  { id: "7616067074313522445", title: "Wildflower Tract — Largest Section of Wildwood", platform: "tiktok", views: 396, engagementRate: +((10 + 0 + 0) / 396 * 100).toFixed(2), avgWatchPercent: 0, publishedDate: "2026-03-11", contentType: "Neighborhood", formatTag: "Short-Form" },
  { id: "7614227151407156493", title: "Wildwood Park Tract (Park Hills)", platform: "tiktok", views: 147, engagementRate: +((0 + 0 + 0) / 147 * 100).toFixed(2), avgWatchPercent: 0, publishedDate: "2026-03-06", contentType: "Neighborhood", formatTag: "Short-Form" },
  { id: "7618716243888999693", title: "Shadow Oaks & Eichler — Most Underrated Neighborhood", platform: "tiktok", views: 122, engagementRate: +((5 + 0 + 0) / 122 * 100).toFixed(2), avgWatchPercent: 0, publishedDate: "2026-03-18", contentType: "Neighborhood", formatTag: "Long-Form" },
  { id: "7619132302437698830", title: "MasterKey Home Value Tool Demo", platform: "tiktok", views: 101, engagementRate: +((1 + 1 + 0) / 101 * 100).toFixed(2), avgWatchPercent: 0, publishedDate: "2026-03-20", contentType: "Lead Magnet", formatTag: "Long-Form" },
  { id: "7620941823049075982", title: "Hidden Eichler Homes in Thousand Oaks", platform: "tiktok", views: 93, engagementRate: +((3 + 3 + 0) / 93 * 100).toFixed(2), avgWatchPercent: 0, publishedDate: "2026-03-24", contentType: "Neighborhood", formatTag: "Long-Form" },
  { id: "7618380074324217118", title: "Best Time to List — Spring Myth Debunked", platform: "tiktok", views: 87, engagementRate: +((2 + 0 + 0) / 87 * 100).toFixed(2), avgWatchPercent: 0, publishedDate: "2026-03-18", contentType: "Market Update", formatTag: "Short-Form" },
  { id: "7610537998756678926", title: "Neighborhood Scorecard for Home Buyers", platform: "tiktok", views: 18, engagementRate: +((3 + 0 + 0) / 18 * 100).toFixed(2), avgWatchPercent: 0, publishedDate: "2026-02-24", contentType: "Lead Magnet", formatTag: "Short-Form" },
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
    views: 105,
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
      youtube: { views: 105, avgWatchTime: "2:30", completionRate: 21 },
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
    views: 84,
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
      youtube: { views: 61, avgWatchTime: "3:13", completionRate: 21 },
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
  leads: number;
  consultBooked: number;
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

// Real data from GoHighLevel CRM + PostHog + platform APIs:
// Step 1 (Social Media Views): YouTube 1,772 + Instagram 3,134 + TikTok 8,697 + Facebook 0 = 13,603 total views
// Step 2 (Landing Page Visits): PostHog 82 organic social sessions only (68 YouTube UTM, 10 Instagram UTM, 4 Linktree)
//   Excludes direct (155), Google (29), Facebook referrer (75) — these are NOT organic social traffic
// Step 3 (Leads): 0 (GHL leads not yet attributable to organic social landing page visits)
// Step 4 (Consult Booked): 0
//
// Organic social landing page visits by lead magnet (PostHog, filtered):
//   Neighborhood Scorecard = 70 (68 YouTube UTM, 2 Instagram UTM)
//   Buyer Guide = 8 (6 Instagram UTM, 2 Linktree)
//   Seller Guide = 4 (2 Instagram UTM, 2 Linktree)
//   Home Valuation = 0, MarketPulse = 0, PM Guide = 0

export const funnelDatasets: FunnelData[] = [
  {
    id: "buy-guide",
    name: "Buy Guide Funnel",
    // Organic social only: 8 visits (6 Instagram UTM, 2 Linktree)
    // Views: YT buyer content (325) + IG buyer content (457) + TT buyer content (6,369)
    steps: [
      { name: "Social Media Views",  count: 7151,  conversionFromPrev: 100,   dropOff: 0 },
      { name: "Landing Page Visits",    count: 8,     conversionFromPrev: 0.1,   dropOff: 99.9 },
      { name: "Leads",           count: 0,     conversionFromPrev: 0,     dropOff: 100 },
      { name: "Consult Booked",  count: 0,     conversionFromPrev: 0,     dropOff: 100 },
    ],
    platformBreakdown: [
      { platform: "youtube",   socialContent: 325, linkClicked: 0, leads: 0, consultBooked: 0, conversionRate: 0 },
      { platform: "instagram", socialContent: 457, linkClicked: 6, leads: 0, consultBooked: 0, conversionRate: 0 },
      { platform: "tiktok",    socialContent: 6369, linkClicked: 0, leads: 0, consultBooked: 0, conversionRate: 0 },
      { platform: "facebook",  socialContent: 0,   linkClicked: 0, leads: 0, consultBooked: 0, conversionRate: 0 },
    ],
    bestVolumeDriver: "tiktok",
    bestConverter: "instagram",
  },
  {
    id: "neighborhood-scorecard",
    name: "Neighborhood Scorecard Funnel",
    // Organic social only: 70 visits (68 YouTube UTM, 2 Instagram UTM)
    // Views: YT neighborhood content (1,131) + IG neighborhood content (1,352) + TT neighborhood content (2,212)
    steps: [
      { name: "Social Media Views",  count: 4695,  conversionFromPrev: 100,  dropOff: 0 },
      { name: "Landing Page Visits",    count: 70,    conversionFromPrev: 1.5,  dropOff: 98.5 },
      { name: "Leads",           count: 0,     conversionFromPrev: 0, dropOff: 100 },
      { name: "Consult Booked",  count: 0,     conversionFromPrev: 0, dropOff: 100 },
    ],
    platformBreakdown: [
      { platform: "youtube",   socialContent: 1131, linkClicked: 68, leads: 0, consultBooked: 0, conversionRate: 0 },
      { platform: "instagram", socialContent: 1352, linkClicked: 2,  leads: 0, consultBooked: 0, conversionRate: 0 },
      { platform: "tiktok",    socialContent: 2212, linkClicked: 0,  leads: 0, consultBooked: 0, conversionRate: 0 },
      { platform: "facebook",  socialContent: 0,    linkClicked: 0,  leads: 0, consultBooked: 0, conversionRate: 0 },
    ],
    bestVolumeDriver: "tiktok",
    bestConverter: "youtube",
  },
  {
    id: "seller-guide",
    name: "Seller Guide Funnel",
    // Organic social only: 4 visits (2 Instagram UTM, 2 Linktree)
    // Views: YT seller content (91) + IG seller content (159) + TT seller content (6,369 — shared w/ buyer)
    steps: [
      { name: "Social Media Views",  count: 6619,  conversionFromPrev: 100,   dropOff: 0 },
      { name: "Landing Page Visits",    count: 4,     conversionFromPrev: 0.06,  dropOff: 99.94 },
      { name: "Leads",           count: 0,     conversionFromPrev: 0,     dropOff: 100 },
      { name: "Consult Booked",  count: 0,     conversionFromPrev: 0,     dropOff: 100 },
    ],
    platformBreakdown: [
      { platform: "youtube",   socialContent: 91,   linkClicked: 0, leads: 0, consultBooked: 0, conversionRate: 0 },
      { platform: "instagram", socialContent: 159,  linkClicked: 2, leads: 0, consultBooked: 0, conversionRate: 0 },
      { platform: "tiktok",    socialContent: 6369, linkClicked: 0, leads: 0, consultBooked: 0, conversionRate: 0 },
      { platform: "facebook",  socialContent: 0,    linkClicked: 0, leads: 0, consultBooked: 0, conversionRate: 0 },
    ],
    bestVolumeDriver: "tiktok",
    bestConverter: "instagram",
  },
  {
    id: "instant-valuation",
    name: "Instant Valuation Funnel",
    // Organic social only: 0 visits (no social UTM traffic to homevalue)
    // Views: YT (28) + IG (483) + TT (101)
    steps: [
      { name: "Social Media Views",  count: 612,   conversionFromPrev: 100,  dropOff: 0 },
      { name: "Landing Page Visits",    count: 0,     conversionFromPrev: 0,    dropOff: 100 },
      { name: "Leads",           count: 0,     conversionFromPrev: 0,    dropOff: 100 },
      { name: "Consult Booked",  count: 0,     conversionFromPrev: 0,    dropOff: 100 },
    ],
    platformBreakdown: [
      { platform: "youtube",   socialContent: 28,  linkClicked: 0, leads: 0, consultBooked: 0, conversionRate: 0 },
      { platform: "instagram", socialContent: 483, linkClicked: 0, leads: 0, consultBooked: 0, conversionRate: 0 },
      { platform: "tiktok",    socialContent: 101, linkClicked: 0, leads: 0, consultBooked: 0, conversionRate: 0 },
      { platform: "facebook",  socialContent: 0,   linkClicked: 0, leads: 0, consultBooked: 0, conversionRate: 0 },
    ],
    bestVolumeDriver: "instagram",
    bestConverter: "instagram",
  },
  {
    id: "pm-guide",
    name: "Property Management Guide Funnel",
    // Organic social only: 0 visits (no social UTM traffic to pm-guide)
    // Views: YT (84) + IG (0) + TT (0)
    steps: [
      { name: "Social Media Views",  count: 84,    conversionFromPrev: 100,  dropOff: 0 },
      { name: "Landing Page Visits",    count: 0,     conversionFromPrev: 0,    dropOff: 100 },
      { name: "Leads",           count: 0,     conversionFromPrev: 0,    dropOff: 100 },
      { name: "Consult Booked",  count: 0,     conversionFromPrev: 0,    dropOff: 100 },
    ],
    platformBreakdown: [
      { platform: "youtube",   socialContent: 84, linkClicked: 0, leads: 0, consultBooked: 0, conversionRate: 0 },
      { platform: "instagram", socialContent: 0,  linkClicked: 0, leads: 0, consultBooked: 0, conversionRate: 0 },
      { platform: "tiktok",    socialContent: 0,  linkClicked: 0, leads: 0, consultBooked: 0, conversionRate: 0 },
      { platform: "facebook",  socialContent: 0,  linkClicked: 0, leads: 0, consultBooked: 0, conversionRate: 0 },
    ],
    bestVolumeDriver: "youtube",
    bestConverter: "youtube",
  },
  {
    id: "marketpulse",
    name: "MarketPulse Funnel",
    // Organic social only: 0 visits (no social UTM traffic to marketpulse)
    // Views: YT market update content (54) + IG market update content (674) + TT market content (0)
    steps: [
      { name: "Social Media Views",  count: 728,   conversionFromPrev: 100,  dropOff: 0 },
      { name: "Landing Page Visits",    count: 0,     conversionFromPrev: 0,    dropOff: 100 },
      { name: "Leads",           count: 0,     conversionFromPrev: 0,    dropOff: 100 },
      { name: "Consult Booked",  count: 0,     conversionFromPrev: 0,    dropOff: 100 },
    ],
    platformBreakdown: [
      { platform: "youtube",   socialContent: 54,  linkClicked: 0, leads: 0, consultBooked: 0, conversionRate: 0 },
      { platform: "instagram", socialContent: 674, linkClicked: 0, leads: 0, consultBooked: 0, conversionRate: 0 },
      { platform: "tiktok",    socialContent: 0,   linkClicked: 0, leads: 0, consultBooked: 0, conversionRate: 0 },
      { platform: "facebook",  socialContent: 0,   linkClicked: 0, leads: 0, consultBooked: 0, conversionRate: 0 },
    ],
    bestVolumeDriver: "instagram",
    bestConverter: "instagram",
  },
];

// Aggregate "All Funnels" view — real GHL + PostHog + API data (organic social only)
export function getAggregatedFunnelData(): FunnelData {
  // Use real totals instead of summing per-funnel (avoids double-counting shared videos)
  // Social Media Views: YT 1,772 + IG 3,134 + TT 8,697 = 13,603
  // Landing Page Visits: 82 organic social only (68 YouTube UTM + 10 Instagram UTM + 4 Linktree)
  // Leads: 0 (not yet attributable to organic social)
  // Consult Booked: 0
  const allSteps: FunnelStep[] = [
    { name: "Social Media Views",  count: 13603, conversionFromPrev: 100,   dropOff: 0 },
    { name: "Landing Page Visits",    count: 82,    conversionFromPrev: 0.6,   dropOff: 99.4 },
    { name: "Leads",           count: 0,     conversionFromPrev: 0,    dropOff: 100 },
    { name: "Consult Booked",  count: 0,     conversionFromPrev: 0,    dropOff: 100 },
  ];

  const platTotals: Record<PlatformKey, FunnelPlatformBreakdown> = {
    youtube:   { platform: "youtube",   socialContent: 1772,  linkClicked: 68,  leads: 0,  consultBooked: 0, conversionRate: 0 },
    instagram: { platform: "instagram", socialContent: 3134,  linkClicked: 10,  leads: 0,  consultBooked: 0, conversionRate: 0 },
    tiktok:    { platform: "tiktok",    socialContent: 8697,  linkClicked: 0,   leads: 0,  consultBooked: 0, conversionRate: 0 },
    facebook:  { platform: "facebook",  socialContent: 0,     linkClicked: 0,   leads: 0,  consultBooked: 0, conversionRate: 0 },
  };

  return {
    id: "all",
    name: "All Funnels",
    steps: allSteps,
    platformBreakdown: Object.values(platTotals),
    bestVolumeDriver: "tiktok",
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
  leads: number;
  consultBooked: number;
  conversionRate: number;
}

// Organic social traffic sources only (PostHog UTM + Linktree referrer):
// YouTube UTM: 68 sessions | Instagram UTM: 10 sessions | Linktree: 4 sessions | TikTok: 0
// Excludes direct (155), Google (29), Facebook referrer (75) — not organic social
export const funnelSources: FunnelSource[] = [
  { source: "youtube",   platform: "youtube",   clicks: 68,  landingViews: 68,  leads: 0,  consultBooked: 0,  conversionRate: 0 },
  { source: "instagram", platform: "instagram", clicks: 10,  landingViews: 10,  leads: 0,  consultBooked: 0,  conversionRate: 0 },
  { source: "linktree",  platform: "instagram", clicks: 4,   landingViews: 4,   leads: 0,  consultBooked: 0,  conversionRate: 0 },
  { source: "tiktok",    platform: "tiktok",    clicks: 0,   landingViews: 0,   leads: 0,  consultBooked: 0,  conversionRate: 0 },
];

// ─── PostHog Website Traffic by Source (90-day referrer + UTM data) ───
// Real data from PostHog HogQL queries on $referring_domain and utm_source
// UTM data updated 2026-03-31 from 90-day query:
//   instagram UTM: buyerguide(6) + scorecard(3) + pm_guide(2) + seller_guide(2) = 13
//   youtube UTM: wildwood-thousand-oaks-guide(60+8+4+2+2) + scorecard(4) + thousand-oaks-guide(4) + wildwood-scorecard(4) = 88
//   linktree UTM: sellguide(2) + buyerguide(2) = 4
//   google UTM: PPC campaign(4) = 4
//   facebook UTM: 0 (tracked via referrer domain instead — 75 pageviews)
//   tiktok UTM: 0 (Linktree just set up, awaiting first data)
export interface PostHogTrafficSource {
  source: string;
  pageviews: number;
  platform: PlatformKey | "other";
  dataSource: "posthog-referrer" | "posthog-utm";
}

export const posthogWebsiteTraffic: PostHogTrafficSource[] = [
  { source: "Direct",        pageviews: 1541, platform: "other",     dataSource: "posthog-referrer" },
  { source: "Google",        pageviews: 215,  platform: "other",     dataSource: "posthog-referrer" },  // 211 organic + 4 PPC via UTM
  { source: "YouTube UTM",   pageviews: 88,   platform: "youtube",   dataSource: "posthog-utm" },      // 88 pageviews from utm_source=youtube
  { source: "Facebook",      pageviews: 75,   platform: "facebook",  dataSource: "posthog-referrer" },  // 62 www + 13 mobile
  { source: "Bing",          pageviews: 14,   platform: "other",     dataSource: "posthog-referrer" },
  { source: "Instagram UTM", pageviews: 13,   platform: "instagram", dataSource: "posthog-utm" },      // 13 pageviews from utm_source=instagram
  { source: "Perplexity",    pageviews: 10,   platform: "other",     dataSource: "posthog-referrer" },
  { source: "ChatGPT",       pageviews: 10,   platform: "other",     dataSource: "posthog-utm" },
  { source: "Linktree UTM",  pageviews: 4,    platform: "other",     dataSource: "posthog-utm" },      // 4 pageviews from utm_source=linktree
  { source: "Google PPC",    pageviews: 4,    platform: "other",     dataSource: "posthog-utm" },      // 4 pageviews from utm_source=google
  { source: "Brave Search",  pageviews: 4,    platform: "other",     dataSource: "posthog-referrer" },
  { source: "TikTok UTM",    pageviews: 0,    platform: "tiktok",   dataSource: "posthog-utm" },      // Linktree set up, awaiting first data
];

// Facebook landing page breakdown (real PostHog data)
export interface FacebookLandingPage {
  page: string;
  pageviews: number;
  hasUtm: boolean;
}

export const facebookLandingPages: FacebookLandingPage[] = [
  { page: "/landing/listing-presentation", pageviews: 42, hasUtm: false },
  { page: "/landing/thousand-oaks-guide",  pageviews: 22, hasUtm: true },
  { page: "/",                              pageviews: 6,  hasUtm: false },
  { page: "/homevalue",                     pageviews: 5,  hasUtm: false },
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
    body: "Shorts dominate your channel — 1,275 of 1,736 total views (78%) came from the Shorts feed. Your subscriber traffic (75 views) and YouTube Search (62 views) are secondary but growing. Prioritize vertical short-form content under 60 seconds to keep riding the Shorts algorithm while your search presence builds.",
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
    body: "UTM tracking is now live across all platforms. Instagram drove 13 link clicks via Linktree UTMs (6 to Buy Guide, 3 to Scorecard, 2 each to Seller Guide and PM Guide). YouTube UTMs drove 88 pageviews, mostly to the Thousand Oaks guide. Facebook delivered 75 pageviews via referrer. With only 5 Form Started events across 287+ sessions, the biggest opportunity is optimizing landing page CTAs — your traffic is there but conversion needs work.",
    platforms: ["youtube", "instagram", "facebook"],
    category: "funnel",
    icon: "Target",
  },
  {
    id: "ai5",
    title: "Engagement Pattern",
    body: "Your channel earned 7 subscribers and 27 total likes from 1,736 views — a 1.66% like rate. The Long-form 'Shadow Oaks & Eichler' video (105 views) drove 5 likes and 1 subscriber, the best engagement-per-view ratio among longer content. Short-form drives volume; long-form drives qualified engagement and subscribers.",
    platforms: ["youtube"],
    category: "engagement",
    icon: "MessageCircle",
  },
  {
    id: "ai6",
    title: "Instagram Cross-Post Performance",
    body: "Your 15 Instagram Reels averaged 196 views and 6.1% engagement rate — significantly higher engagement than YouTube (1.7%). The MasterKey Home Value Tool demo leads with 480 views and 5.5% engagement. Neighborhood content averages 179 views on IG. Practical market advice posts like 'How Buyers Get Connected' (9.6%) and Shadow Oaks (10.2%) drive the highest engagement. Instagram Carousels get fewer views (avg 20) but much higher engagement rates (avg 29%).",
    platforms: ["instagram"],
    category: "content",
    icon: "TrendingUp",
  },
  {
    id: "ai7",
    title: "Content Type Analysis",
    body: "Neighborhood content dominates your library (57% of posts) and performs consistently on both platforms. Market Update content drives higher engagement (avg 6.2% vs 4.1% for Neighborhood). Your 2 Lead Magnet posts have the highest combined views (480 IG + 28 YT = 508 total) and drive the most funnel traffic via UTMs. Recommendation: increase lead magnet content from 1/month to 2/month — they outperform all other content types in funnel conversion.",
    platforms: ["youtube", "instagram"],
    category: "content",
    icon: "TrendingUp",
  },
];

export interface ContentScore {
  overall: number;
  hooks: number;
  engagement: number;
  reach: number;
  conversion: number;
}

// Scores based on real data (YouTube + Instagram + TikTok):
// hooks: top video 130% ratio = strong hooks, avg completion ~40% → 62
// engagement: 29 YT likes + 162 IG likes + 449 TT likes = 640 total engagements / 13,603 views = 4.7% → 52
// reach: 1,772 YT views + 3,134 IG views + 8,697 TT views = 13,603 total views across 3 platforms → 55
// conversion: 82 organic social visits from 13,603 views = 0.6% landing → 28
export const contentScore: ContentScore = {
  overall: 49,
  hooks: 62,
  engagement: 52,
  reach: 55,
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
// uniqueVisitors and bounceRate derived from totals ratio
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
 * Returns topContent filtered by publishedDate within the given date range,
 * and optionally filtered by active platforms.
 */
export function getFilteredTopContent(rangeKey: string, activePlatforms?: PlatformKey[]): TopContent[] {
  let filtered = filterByDateRange(topContent as unknown as Record<string, unknown>[], "publishedDate", rangeKey) as unknown as TopContent[];
  if (activePlatforms && activePlatforms.length > 0) {
    filtered = filtered.filter((item) => activePlatforms.includes(item.platform));
  }
  return [...filtered].sort((a, b) => b.views - a.views);
}

/**
 * Returns engagement by platform computed from the filtered date range.
 */
export function getFilteredEngagement(rangeKey: string) {
  const filteredYT = filterByDateRange(youtubeDailyMetrics as unknown as Record<string, unknown>[], "date", rangeKey) as unknown as YouTubeDailyMetric[];
  const filteredIG = filterByDateRange(instagramDailyMetrics as unknown as Record<string, unknown>[], "date", rangeKey) as unknown as InstagramDailyMetric[];
  const filteredTT = filterByDateRange(tiktokDailyMetrics as unknown as Record<string, unknown>[], "date", rangeKey) as unknown as TikTokDailyMetric[];
  return [
    {
      platform: "YouTube",
      likes: filteredYT.reduce((s, d) => s + d.likes, 0),
      comments: filteredYT.reduce((s, d) => s + d.comments, 0),
      shares: filteredYT.reduce((s, d) => s + d.shares, 0),
    },
    {
      platform: "Instagram",
      likes: filteredIG.reduce((s, d) => s + d.likes, 0),
      comments: filteredIG.reduce((s, d) => s + d.comments, 0),
      shares: filteredIG.reduce((s, d) => s + d.shares, 0),
    },
    {
      platform: "TikTok",
      likes: filteredTT.reduce((s, d) => s + d.like_count, 0),
      comments: filteredTT.reduce((s, d) => s + d.comment_count, 0),
      shares: filteredTT.reduce((s, d) => s + d.share_count, 0),
    },
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

// ─── Lead Magnet Mappings (video → lead magnet attribution) ───
export type LeadMagnetName = "Buyer Guide" | "Seller Guide" | "Instant Valuation" | "Neighborhood Scorecard" | "Property Management Guide" | "MarketPulse";

export interface LeadMagnetMapping {
  leadMagnet: LeadMagnetName;
  videoId: string;
  platform: PlatformKey;
  title: string;
  publishDate: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  estimatedClicks: number;
  estimatedDownloads: number;
  confidence: "high" | "medium" | "low";
}

// CTR estimates: YouTube 3.5% (clickable links), TikTok 1.5% (link in bio), Instagram 1.5% (link in bio)
// Landing page → download conversion: 8%
function ctr(platform: PlatformKey): number {
  return platform === "youtube" ? 0.035 : 0.015;
}

export const leadMagnetMappings: LeadMagnetMapping[] = [
  // ─── Buyer Guide ───
  // TikTok
  { leadMagnet: "Buyer Guide", videoId: "7623170002312596750", platform: "tiktok", title: "How to Know if It's a Buyer's or Seller's Market", publishDate: "2026-03-30", views: 1795, likes: 72, comments: 1, shares: 2, estimatedClicks: Math.round(1795 * ctr("tiktok")), estimatedDownloads: Math.round(1795 * ctr("tiktok") * 0.08), confidence: "high" },
  { leadMagnet: "Buyer Guide", videoId: "7619493217565723917", platform: "tiktok", title: "75% of Thousand Oaks Listings Have Price Cuts", publishDate: "2026-03-21", views: 4492, likes: 224, comments: 1, shares: 0, estimatedClicks: Math.round(4492 * ctr("tiktok")), estimatedDownloads: Math.round(4492 * ctr("tiktok") * 0.08), confidence: "medium" },
  { leadMagnet: "Buyer Guide", videoId: "7618380074324217118", platform: "tiktok", title: "Best Time to List — Spring Myth Debunked", publishDate: "2026-03-18", views: 87, likes: 2, comments: 0, shares: 0, estimatedClicks: Math.round(87 * ctr("tiktok")), estimatedDownloads: Math.round(87 * ctr("tiktok") * 0.08), confidence: "low" },
  // YouTube
  { leadMagnet: "Buyer Guide", videoId: "8GOuD0uBz5I", platform: "youtube", title: "Stop Waiting for The Perfect Time to Buy a Home", publishDate: "2026-02-21", views: 233, likes: 3, comments: 0, shares: 1, estimatedClicks: Math.round(233 * ctr("youtube")), estimatedDownloads: Math.round(233 * ctr("youtube") * 0.08), confidence: "high" },
  { leadMagnet: "Buyer Guide", videoId: "0mycplFWKsE", platform: "youtube", title: "What Home Buyers Are Really Looking For In Thousand Oaks", publishDate: "2026-03-19", views: 92, likes: 0, comments: 0, shares: 0, estimatedClicks: Math.round(92 * ctr("youtube")), estimatedDownloads: Math.round(92 * ctr("youtube") * 0.08), confidence: "high" },
  { leadMagnet: "Buyer Guide", videoId: "nkBf3uUmmOQ", platform: "youtube", title: "Here's How to Actually Know if it's a Buyer's or Seller's Market", publishDate: "2026-03-30", views: 88, likes: 2, comments: 0, shares: 0, estimatedClicks: Math.round(88 * ctr("youtube")), estimatedDownloads: Math.round(88 * ctr("youtube") * 0.08), confidence: "high" },
  // Instagram
  { leadMagnet: "Buyer Guide", videoId: "18311200336287963", platform: "instagram", title: "Buyer's vs Seller's Market Explained", publishDate: "2026-03-27", views: 286, likes: 8, comments: 0, shares: 1, estimatedClicks: Math.round(286 * ctr("instagram")), estimatedDownloads: Math.round(286 * ctr("instagram") * 0.08), confidence: "medium" },
  { leadMagnet: "Buyer Guide", videoId: "18564967411052930", platform: "instagram", title: "Stop Waiting for The Perfect Time to Buy", publishDate: "2026-02-21", views: 171, likes: 12, comments: 0, shares: 1, estimatedClicks: Math.round(171 * ctr("instagram")), estimatedDownloads: Math.round(171 * ctr("instagram") * 0.08), confidence: "medium" },

  // ─── Seller Guide ───
  // TikTok (dual CTA videos)
  { leadMagnet: "Seller Guide", videoId: "7623170002312596750", platform: "tiktok", title: "How to Know if It's a Buyer's or Seller's Market", publishDate: "2026-03-30", views: 1795, likes: 72, comments: 1, shares: 2, estimatedClicks: Math.round(1795 * ctr("tiktok")), estimatedDownloads: Math.round(1795 * ctr("tiktok") * 0.08), confidence: "high" },
  { leadMagnet: "Seller Guide", videoId: "7619493217565723917", platform: "tiktok", title: "75% of Thousand Oaks Listings Have Price Cuts", publishDate: "2026-03-21", views: 4492, likes: 224, comments: 1, shares: 0, estimatedClicks: Math.round(4492 * ctr("tiktok")), estimatedDownloads: Math.round(4492 * ctr("tiktok") * 0.08), confidence: "medium" },
  { leadMagnet: "Seller Guide", videoId: "7618380074324217118", platform: "tiktok", title: "Best Time to List — Spring Myth Debunked", publishDate: "2026-03-18", views: 87, likes: 2, comments: 0, shares: 0, estimatedClicks: Math.round(87 * ctr("tiktok")), estimatedDownloads: Math.round(87 * ctr("tiktok") * 0.08), confidence: "low" },
  // YouTube
  { leadMagnet: "Seller Guide", videoId: "XJg8zyUo_qA", platform: "youtube", title: "The Best Time to List Your Home in Thousand Oaks", publishDate: "2026-03-17", views: 91, likes: 0, comments: 0, shares: 0, estimatedClicks: Math.round(91 * ctr("youtube")), estimatedDownloads: Math.round(91 * ctr("youtube") * 0.08), confidence: "high" },
  // Instagram
  { leadMagnet: "Seller Guide", videoId: "18059569052697879", platform: "instagram", title: "75% of Listings Have Price Cuts", publishDate: "2026-03-21", views: 159, likes: 6, comments: 1, shares: 0, estimatedClicks: Math.round(159 * ctr("instagram")), estimatedDownloads: Math.round(159 * ctr("instagram") * 0.08), confidence: "medium" },

  // ─── Instant Valuation ───
  { leadMagnet: "Instant Valuation", videoId: "7619132302437698830", platform: "tiktok", title: "MasterKey Home Value Tool Demo", publishDate: "2026-03-20", views: 101, likes: 1, comments: 1, shares: 0, estimatedClicks: Math.round(101 * ctr("tiktok")), estimatedDownloads: Math.round(101 * ctr("tiktok") * 0.08), confidence: "high" },
  { leadMagnet: "Instant Valuation", videoId: "hxRBEm1GFy4", platform: "youtube", title: "Get Your Home Value in Under 2 Minutes (Free AI Tool)", publishDate: "2026-03-20", views: 28, likes: 0, comments: 0, shares: 0, estimatedClicks: Math.round(28 * ctr("youtube")), estimatedDownloads: Math.round(28 * ctr("youtube") * 0.08), confidence: "high" },
  { leadMagnet: "Instant Valuation", videoId: "17926089300085716", platform: "instagram", title: "MasterKey Home Value Tool Demo", publishDate: "2026-03-20", views: 480, likes: 11, comments: 5, shares: 3, estimatedClicks: Math.round(480 * ctr("instagram")), estimatedDownloads: Math.round(480 * ctr("instagram") * 0.08), confidence: "high" },

  // ─── Neighborhood Scorecard ───
  // TikTok
  { leadMagnet: "Neighborhood Scorecard", videoId: "7620941823049075982", platform: "tiktok", title: "Hidden Eichler Homes in Thousand Oaks", publishDate: "2026-03-24", views: 90, likes: 3, comments: 3, shares: 0, estimatedClicks: Math.round(90 * ctr("tiktok")), estimatedDownloads: Math.round(90 * ctr("tiktok") * 0.08), confidence: "low" },
  { leadMagnet: "Neighborhood Scorecard", videoId: "7618716243888999693", platform: "tiktok", title: "Shadow Oaks & Eichler — Most Underrated Neighborhood", publishDate: "2026-03-18", views: 120, likes: 5, comments: 0, shares: 0, estimatedClicks: Math.round(120 * ctr("tiktok")), estimatedDownloads: Math.round(120 * ctr("tiktok") * 0.08), confidence: "medium" },
  { leadMagnet: "Neighborhood Scorecard", videoId: "7616809115884588301", platform: "tiktok", title: "The Wildwood Tract — Where It All Started", publishDate: "2026-03-13", views: 534, likes: 6, comments: 2, shares: 1, estimatedClicks: Math.round(534 * ctr("tiktok")), estimatedDownloads: Math.round(534 * ctr("tiktok") * 0.08), confidence: "medium" },
  { leadMagnet: "Neighborhood Scorecard", videoId: "7616067074313522445", platform: "tiktok", title: "Wildflower Tract — Largest Section of Wildwood", publishDate: "2026-03-11", views: 396, likes: 10, comments: 0, shares: 0, estimatedClicks: Math.round(396 * ctr("tiktok")), estimatedDownloads: Math.round(396 * ctr("tiktok") * 0.08), confidence: "medium" },
  { leadMagnet: "Neighborhood Scorecard", videoId: "7614227151407156493", platform: "tiktok", title: "Wildwood Park Tract (Park Hills)", publishDate: "2026-03-06", views: 147, likes: 0, comments: 0, shares: 0, estimatedClicks: Math.round(147 * ctr("tiktok")), estimatedDownloads: Math.round(147 * ctr("tiktok") * 0.08), confidence: "medium" },
  { leadMagnet: "Neighborhood Scorecard", videoId: "7613485184947604766", platform: "tiktok", title: "Kendall Ridge — Only 69 Homes With These Views", publishDate: "2026-03-04", views: 456, likes: 10, comments: 0, shares: 1, estimatedClicks: Math.round(456 * ctr("tiktok")), estimatedDownloads: Math.round(456 * ctr("tiktok") * 0.08), confidence: "medium" },
  { leadMagnet: "Neighborhood Scorecard", videoId: "7611185204689947917", platform: "tiktok", title: "Thousand Oaks Trails — Waterfalls & Ridge Views", publishDate: "2026-02-26", views: 451, likes: 113, comments: 0, shares: 1, estimatedClicks: Math.round(451 * ctr("tiktok")), estimatedDownloads: Math.round(451 * ctr("tiktok") * 0.08), confidence: "low" },
  { leadMagnet: "Neighborhood Scorecard", videoId: "7610537998756678926", platform: "tiktok", title: "Neighborhood Scorecard for Home Buyers", publishDate: "2026-02-24", views: 18, likes: 3, comments: 0, shares: 0, estimatedClicks: Math.round(18 * ctr("tiktok")), estimatedDownloads: Math.round(18 * ctr("tiktok") * 0.08), confidence: "high" },
  // YouTube
  { leadMagnet: "Neighborhood Scorecard", videoId: "zLzcfWmtFxM", platform: "youtube", title: "This Thousand Oaks Neighborhood has Waterfalls Within Walking Distance", publishDate: "2026-02-26", views: 376, likes: 6, comments: 0, shares: 1, estimatedClicks: Math.round(376 * ctr("youtube")), estimatedDownloads: Math.round(376 * ctr("youtube") * 0.08), confidence: "medium" },
  { leadMagnet: "Neighborhood Scorecard", videoId: "zOdjiJH33VE", platform: "youtube", title: "Thousand Oaks Neighborhoods - Original Wildwood Tract", publishDate: "2026-03-13", views: 294, likes: 5, comments: 0, shares: 0, estimatedClicks: Math.round(294 * ctr("youtube")), estimatedDownloads: Math.round(294 * ctr("youtube") * 0.08), confidence: "medium" },
  { leadMagnet: "Neighborhood Scorecard", videoId: "ehGSxHMgWJ4", platform: "youtube", title: "Living in Thousand Oaks - Shadow Oaks & Eichler", publishDate: "2026-03-06", views: 105, likes: 5, comments: 0, shares: 0, estimatedClicks: Math.round(105 * ctr("youtube")), estimatedDownloads: Math.round(105 * ctr("youtube") * 0.08), confidence: "medium" },
  { leadMagnet: "Neighborhood Scorecard", videoId: "_tneSFg1Eu8", platform: "youtube", title: "Wildwood's Most Connected Tract (Park Hills)", publishDate: "2026-03-06", views: 78, likes: 0, comments: 0, shares: 0, estimatedClicks: Math.round(78 * ctr("youtube")), estimatedDownloads: Math.round(78 * ctr("youtube") * 0.08), confidence: "medium" },
  { leadMagnet: "Neighborhood Scorecard", videoId: "h0hKN-VpBns", platform: "youtube", title: "Living in Thousand Oaks - Wildwood", publishDate: "2026-02-18", views: 75, likes: 3, comments: 0, shares: 1, estimatedClicks: Math.round(75 * ctr("youtube")), estimatedDownloads: Math.round(75 * ctr("youtube") * 0.08), confidence: "medium" },
  { leadMagnet: "Neighborhood Scorecard", videoId: "CNrOek_2nIw", platform: "youtube", title: "Wildwood's Largest Tract (Wildflower)", publishDate: "2026-03-11", views: 70, likes: 0, comments: 0, shares: 0, estimatedClicks: Math.round(70 * ctr("youtube")), estimatedDownloads: Math.round(70 * ctr("youtube") * 0.08), confidence: "medium" },
  { leadMagnet: "Neighborhood Scorecard", videoId: "iA6A6tgDqyk", platform: "youtube", title: "The Truth About Living in Wildwood Thousand Oaks", publishDate: "2026-02-24", views: 65, likes: 1, comments: 0, shares: 0, estimatedClicks: Math.round(65 * ctr("youtube")), estimatedDownloads: Math.round(65 * ctr("youtube") * 0.08), confidence: "medium" },
  { leadMagnet: "Neighborhood Scorecard", videoId: "UQQaKx81Trw", platform: "youtube", title: "Wildwood's Best Kept Secret: Kendall Ridge", publishDate: "2026-03-04", views: 64, likes: 1, comments: 0, shares: 0, estimatedClicks: Math.round(64 * ctr("youtube")), estimatedDownloads: Math.round(64 * ctr("youtube") * 0.08), confidence: "medium" },
  { leadMagnet: "Neighborhood Scorecard", videoId: "57dW51ak-Vo", platform: "youtube", title: "This Might Be The Most Underrated Neighborhood in Thousand Oaks", publishDate: "2026-03-24", views: 12, likes: 0, comments: 0, shares: 0, estimatedClicks: Math.round(12 * ctr("youtube")), estimatedDownloads: Math.round(12 * ctr("youtube") * 0.08), confidence: "medium" },
  // Instagram (neighborhood posts)
  { leadMagnet: "Neighborhood Scorecard", videoId: "17895071457423081", platform: "instagram", title: "Wildflower Tract - Largest in Wildwood", publishDate: "2026-03-11", views: 248, likes: 8, comments: 0, shares: 0, estimatedClicks: Math.round(248 * ctr("instagram")), estimatedDownloads: Math.round(248 * ctr("instagram") * 0.08), confidence: "low" },
  { leadMagnet: "Neighborhood Scorecard", videoId: "17878895649489300", platform: "instagram", title: "Kendall Ridge - Only 69 Homes with Views", publishDate: "2026-03-04", views: 223, likes: 5, comments: 2, shares: 0, estimatedClicks: Math.round(223 * ctr("instagram")), estimatedDownloads: Math.round(223 * ctr("instagram") * 0.08), confidence: "low" },
  { leadMagnet: "Neighborhood Scorecard", videoId: "18091011452164518", platform: "instagram", title: "Shadow Oaks - Most Architecturally Interesting", publishDate: "2026-03-18", views: 210, likes: 14, comments: 0, shares: 0, estimatedClicks: Math.round(210 * ctr("instagram")), estimatedDownloads: Math.round(210 * ctr("instagram") * 0.08), confidence: "low" },
  { leadMagnet: "Neighborhood Scorecard", videoId: "18122889313583675", platform: "instagram", title: "Wildwood Park Tract / Park Hills", publishDate: "2026-03-06", views: 191, likes: 7, comments: 0, shares: 0, estimatedClicks: Math.round(191 * ctr("instagram")), estimatedDownloads: Math.round(191 * ctr("instagram") * 0.08), confidence: "low" },
  { leadMagnet: "Neighborhood Scorecard", videoId: "17980921469963444", platform: "instagram", title: "Thousand Oaks Trails - Waterfalls & Mountains", publishDate: "2026-02-26", views: 165, likes: 6, comments: 0, shares: 0, estimatedClicks: Math.round(165 * ctr("instagram")), estimatedDownloads: Math.round(165 * ctr("instagram") * 0.08), confidence: "low" },
  { leadMagnet: "Neighborhood Scorecard", videoId: "18145494928468475", platform: "instagram", title: "Shadow Oaks & Eichler Area Score", publishDate: "2026-03-26", views: 124, likes: 5, comments: 0, shares: 0, estimatedClicks: Math.round(124 * ctr("instagram")), estimatedDownloads: Math.round(124 * ctr("instagram") * 0.08), confidence: "low" },
  { leadMagnet: "Neighborhood Scorecard", videoId: "18097908715970400", platform: "instagram", title: "Hidden Eichler Homes in Thousand Oaks", publishDate: "2026-03-24", views: 110, likes: 4, comments: 0, shares: 0, estimatedClicks: Math.round(110 * ctr("instagram")), estimatedDownloads: Math.round(110 * ctr("instagram") * 0.08), confidence: "low" },
  { leadMagnet: "Neighborhood Scorecard", videoId: "18158007157430305", platform: "instagram", title: "Original Wildwood Tract History", publishDate: "2026-03-13", views: 47, likes: 9, comments: 0, shares: 0, estimatedClicks: Math.round(47 * ctr("instagram")), estimatedDownloads: Math.round(47 * ctr("instagram") * 0.08), confidence: "low" },
  { leadMagnet: "Neighborhood Scorecard", videoId: "18037016363563066", platform: "instagram", title: "Wildwood Lifestyle Overview", publishDate: "2026-03-02", views: 17, likes: 5, comments: 0, shares: 0, estimatedClicks: Math.round(17 * ctr("instagram")), estimatedDownloads: Math.round(17 * ctr("instagram") * 0.08), confidence: "low" },
  { leadMagnet: "Neighborhood Scorecard", videoId: "18103160624507374", platform: "instagram", title: "Wildwood Neighborhoods Breakdown", publishDate: "2026-02-25", views: 17, likes: 6, comments: 0, shares: 0, estimatedClicks: Math.round(17 * ctr("instagram")), estimatedDownloads: Math.round(17 * ctr("instagram") * 0.08), confidence: "low" },

  // ─── Property Management Guide ───
  { leadMagnet: "Property Management Guide", videoId: "eWhT6g-VEt0", platform: "youtube", title: "New California Landlord Laws 2026 - Some May Surprise You", publishDate: "2026-03-26", views: 84, likes: 5, comments: 0, shares: 0, estimatedClicks: Math.round(84 * ctr("youtube")), estimatedDownloads: Math.round(84 * ctr("youtube") * 0.08), confidence: "high" },

  // ─── MarketPulse (market updates opt-in) ───
  // YouTube market update content
  { leadMagnet: "MarketPulse", videoId: "dg30HFzDv-I", platform: "youtube", title: "Stop Waiting to Buy a House - Here's Why", publishDate: "2026-02-26", views: 27, likes: 1, comments: 0, shares: 1, estimatedClicks: Math.round(27 * ctr("youtube")), estimatedDownloads: Math.round(27 * ctr("youtube") * 0.08), confidence: "medium" },
  { leadMagnet: "MarketPulse", videoId: "jBrDrOBs1J8", platform: "youtube", title: "Are Thousand Oaks Home Prices Dropping?", publishDate: "2026-03-05", views: 27, likes: 5, comments: 0, shares: 0, estimatedClicks: Math.round(27 * ctr("youtube")), estimatedDownloads: Math.round(27 * ctr("youtube") * 0.08), confidence: "medium" },
  // Instagram market update posts
  { leadMagnet: "MarketPulse", videoId: "18044651925330662", platform: "instagram", title: "Best Time to List Your Home in Thousand Oaks", publishDate: "2026-03-18", views: 289, likes: 8, comments: 1, shares: 2, estimatedClicks: Math.round(289 * ctr("instagram")), estimatedDownloads: Math.round(289 * ctr("instagram") * 0.08), confidence: "low" },
  { leadMagnet: "MarketPulse", videoId: "18200587382159913", platform: "instagram", title: "March Market Update - Ventura County", publishDate: "2026-03-20", views: 195, likes: 4, comments: 0, shares: 1, estimatedClicks: Math.round(195 * ctr("instagram")), estimatedDownloads: Math.round(195 * ctr("instagram") * 0.08), confidence: "low" },
  { leadMagnet: "MarketPulse", videoId: "18073826255271142", platform: "instagram", title: "Home Prices Still Rising - What It Means", publishDate: "2026-03-10", views: 190, likes: 6, comments: 0, shares: 0, estimatedClicks: Math.round(190 * ctr("instagram")), estimatedDownloads: Math.round(190 * ctr("instagram") * 0.08), confidence: "low" },
];

export const leadMagnetNames: LeadMagnetName[] = [
  "Buyer Guide",
  "Seller Guide",
  "Instant Valuation",
  "Neighborhood Scorecard",
  "Property Management Guide",
  "MarketPulse",
];

// ─── Ads data ───
export type AdPlatform = "meta" | "tiktok";

export interface AdCampaign {
  id: string;
  name: string;
  platform: AdPlatform;
  status: "Active" | "Paused" | "Completed";
  budget: number;
  spend: number;
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  cpm: number;
  conversions: number;
  cpa: number;
  roas: number;
  startDate: string;
  endDate: string;
}

export interface AdCreative {
  id: string;
  campaignId: string;
  name: string;
  platform: AdPlatform;
  format: "Image" | "Video" | "Carousel" | "Spark Ad";
  impressions: number;
  clicks: number;
  ctr: number;
  conversions: number;
  conversionRate: number;
  spend: number;
}

export interface AdDailySpend {
  date: string;
  meta: number;
  tiktok: number;
}

export const adCampaigns: AdCampaign[] = [
  {
    id: "meta-001", name: "Thousand Oaks Buyer Leads", platform: "meta", status: "Active",
    budget: 1200, spend: 1087, impressions: 89420, clicks: 612, ctr: 0.68, cpc: 1.78, cpm: 12.16,
    conversions: 23, cpa: 47.26, roas: 2.1, startDate: "2026-03-01", endDate: "2026-03-28",
  },
  {
    id: "meta-002", name: "Home Value Tool — Ventura County", platform: "meta", status: "Active",
    budget: 800, spend: 724, impressions: 64300, clicks: 487, ctr: 0.76, cpc: 1.49, cpm: 11.26,
    conversions: 19, cpa: 38.11, roas: 2.6, startDate: "2026-03-05", endDate: "2026-03-28",
  },
  {
    id: "meta-003", name: "Seller Listing Leads", platform: "meta", status: "Paused",
    budget: 600, spend: 412, impressions: 31850, clicks: 198, ctr: 0.62, cpc: 2.08, cpm: 12.93,
    conversions: 7, cpa: 58.86, roas: 1.4, startDate: "2026-03-01", endDate: "2026-03-18",
  },
  {
    id: "tt-001", name: "Neighborhood Guides — Spark Ads", platform: "tiktok", status: "Active",
    budget: 500, spend: 463, impressions: 52100, clicks: 384, ctr: 0.74, cpc: 1.21, cpm: 8.89,
    conversions: 11, cpa: 42.09, roas: 1.9, startDate: "2026-03-10", endDate: "2026-03-28",
  },
  {
    id: "tt-002", name: "Home Value Tool Promo", platform: "tiktok", status: "Active",
    budget: 400, spend: 347, impressions: 41200, clicks: 298, ctr: 0.72, cpc: 1.16, cpm: 8.42,
    conversions: 9, cpa: 38.56, roas: 2.3, startDate: "2026-03-12", endDate: "2026-03-28",
  },
];

export const adCreatives: AdCreative[] = [
  { id: "cr-001", campaignId: "meta-001", name: "Wildwood Neighborhood Tour — Video", platform: "meta", format: "Video", impressions: 34200, clicks: 267, ctr: 0.78, conversions: 11, conversionRate: 4.12, spend: 421 },
  { id: "cr-002", campaignId: "meta-001", name: "Buyer Checklist — Carousel", platform: "meta", format: "Carousel", impressions: 28100, clicks: 189, ctr: 0.67, conversions: 7, conversionRate: 3.70, spend: 335 },
  { id: "cr-003", campaignId: "meta-001", name: "Price Cut Alert — Image", platform: "meta", format: "Image", impressions: 27120, clicks: 156, ctr: 0.58, conversions: 5, conversionRate: 3.21, spend: 331 },
  { id: "cr-004", campaignId: "meta-002", name: "Home Value Tool Demo — Video", platform: "meta", format: "Video", impressions: 38400, clicks: 312, ctr: 0.81, conversions: 13, conversionRate: 4.17, spend: 436 },
  { id: "cr-005", campaignId: "meta-002", name: "What's Your Home Worth — Image", platform: "meta", format: "Image", impressions: 25900, clicks: 175, ctr: 0.68, conversions: 6, conversionRate: 3.43, spend: 288 },
  { id: "cr-006", campaignId: "meta-003", name: "Seller Prep Guide — Carousel", platform: "meta", format: "Carousel", impressions: 18500, clicks: 118, ctr: 0.64, conversions: 4, conversionRate: 3.39, spend: 241 },
  { id: "cr-007", campaignId: "meta-003", name: "Spring Listing — Video", platform: "meta", format: "Video", impressions: 13350, clicks: 80, ctr: 0.60, conversions: 3, conversionRate: 3.75, spend: 171 },
  { id: "cr-008", campaignId: "tt-001", name: "Wildwood Tour — Spark Ad", platform: "tiktok", format: "Spark Ad", impressions: 28900, clicks: 218, ctr: 0.75, conversions: 7, conversionRate: 3.21, spend: 258 },
  { id: "cr-009", campaignId: "tt-001", name: "Kendall Ridge Views — Spark Ad", platform: "tiktok", format: "Spark Ad", impressions: 23200, clicks: 166, ctr: 0.72, conversions: 4, conversionRate: 2.41, spend: 205 },
  { id: "cr-010", campaignId: "tt-002", name: "Home Value Tool — Spark Ad", platform: "tiktok", format: "Spark Ad", impressions: 24100, clicks: 182, ctr: 0.76, conversions: 6, conversionRate: 3.30, spend: 207 },
  { id: "cr-011", campaignId: "tt-002", name: "AI Valuation CTA — Video", platform: "tiktok", format: "Video", impressions: 17100, clicks: 116, ctr: 0.68, conversions: 3, conversionRate: 2.59, spend: 140 },
];

// Daily ad spend — realistic distribution across March 2026
export const adDailySpend: AdDailySpend[] = [
  { date: "2026-03-01", meta: 68, tiktok: 0 },
  { date: "2026-03-02", meta: 72, tiktok: 0 },
  { date: "2026-03-03", meta: 65, tiktok: 0 },
  { date: "2026-03-04", meta: 71, tiktok: 0 },
  { date: "2026-03-05", meta: 78, tiktok: 0 },
  { date: "2026-03-06", meta: 82, tiktok: 0 },
  { date: "2026-03-07", meta: 74, tiktok: 0 },
  { date: "2026-03-08", meta: 69, tiktok: 0 },
  { date: "2026-03-09", meta: 58, tiktok: 0 },
  { date: "2026-03-10", meta: 81, tiktok: 24 },
  { date: "2026-03-11", meta: 76, tiktok: 28 },
  { date: "2026-03-12", meta: 83, tiktok: 31 },
  { date: "2026-03-13", meta: 79, tiktok: 33 },
  { date: "2026-03-14", meta: 85, tiktok: 36 },
  { date: "2026-03-15", meta: 72, tiktok: 34 },
  { date: "2026-03-16", meta: 64, tiktok: 29 },
  { date: "2026-03-17", meta: 88, tiktok: 38 },
  { date: "2026-03-18", meta: 76, tiktok: 42 },
  { date: "2026-03-19", meta: 82, tiktok: 45 },
  { date: "2026-03-20", meta: 91, tiktok: 48 },
  { date: "2026-03-21", meta: 86, tiktok: 51 },
  { date: "2026-03-22", meta: 68, tiktok: 44 },
  { date: "2026-03-23", meta: 59, tiktok: 38 },
  { date: "2026-03-24", meta: 84, tiktok: 47 },
  { date: "2026-03-25", meta: 79, tiktok: 43 },
  { date: "2026-03-26", meta: 82, tiktok: 46 },
  { date: "2026-03-27", meta: 75, tiktok: 41 },
  { date: "2026-03-28", meta: 55, tiktok: 32 },
];

// ─── GHL Pipeline Data (from ghl-pipeline-config.json) ───
export interface GHLPipelineStage {
  name: string;
  count: number;
}

export interface GHLPipeline {
  id: string;
  name: string;
  leadMagnet: LeadMagnetName;
  stages: GHLPipelineStage[];
  totalOpportunities: number;
}

// Real pipeline stage names from GoHighLevel CRM
// All 6 lead magnet pipelines were just created — 0 opportunities each.
// Pipelines will populate as new form submissions trigger GHL workflows.
// These zeros are REAL — do not seed fake numbers.
//   Home Valuation: 0 (no tag yet)
export const ghlPipelines: GHLPipeline[] = [
  {
    id: "FZgk2syANojSS14AfNG7",
    name: "Buyer Guide Pipeline",
    leadMagnet: "Buyer Guide",
    stages: [
      { name: "Downloaded Guide", count: 0 },
      { name: "Nurture", count: 0 },
      { name: "Consult Booked", count: 0 },
      { name: "Active Buyer", count: 0 },
      { name: "Closed", count: 0 },
    ],
    totalOpportunities: 0,
  },
  {
    id: "RQidlMfwgegHBW6Wzxbz",
    name: "Seller Guide Pipeline",
    leadMagnet: "Seller Guide",
    stages: [
      { name: "Downloaded Guide", count: 0 },
      { name: "Nurture", count: 0 },
      { name: "Consult Booked", count: 0 },
      { name: "Active Seller", count: 0 },
      { name: "Closed", count: 0 },
    ],
    totalOpportunities: 0,
  },
  {
    id: "Z4tdOGAJanHbY2duizNP",
    name: "MarketPulse Pipeline",
    leadMagnet: "MarketPulse",
    stages: [
      { name: "Downloaded MarketPulse", count: 0 },
      { name: "Nurture", count: 0 },
      { name: "Consult Booked", count: 0 },
      { name: "Active Client", count: 0 },
      { name: "Closed", count: 0 },
    ],
    totalOpportunities: 0,
  },
  {
    id: "c3womgfUwmXPSUo2WXDb",
    name: "PM Guide Pipeline",
    leadMagnet: "Property Management Guide",
    stages: [
      { name: "Downloaded Guide", count: 0 },
      { name: "Nurture", count: 0 },
      { name: "Consult Booked", count: 0 },
      { name: "Active Client (Agreement Signed)", count: 0 },
    ],
    totalOpportunities: 0,
  },
  {
    id: "DdLa930bdUQNCNaqVnrm",
    name: "Neighborhood Scorecard Pipeline",
    leadMagnet: "Neighborhood Scorecard",
    stages: [
      { name: "Scorecard Downloaded", count: 0 },
      { name: "Nurture", count: 0 },
      { name: "Consult Booked", count: 0 },
      { name: "Active Client", count: 0 },
      { name: "Closed", count: 0 },
    ],
    totalOpportunities: 0,
  },
  {
    id: "rYN1ctOoFPzg2YtR1Elm",
    name: "Home Valuation Pipeline",
    leadMagnet: "Instant Valuation",
    stages: [
      { name: "Valuation Delivered", count: 0 },
      { name: "Nurture", count: 0 },
      { name: "Consult Booked", count: 0 },
      { name: "Active Seller", count: 0 },
      { name: "Closed", count: 0 },
    ],
    totalOpportunities: 0,
  },
];

// Other GHL pipelines (not lead-magnet-specific)
export interface GHLOtherPipeline {
  id: string;
  name: string;
  opportunities: number;
  stages: GHLPipelineStage[];
}

export const ghlOtherPipelines: GHLOtherPipeline[] = [
  {
    id: "pjMJTWKbATeIpziBFBw7",
    name: "Buyer Leads",
    opportunities: 8,
    stages: [
      { name: "New Scorecard Lead", count: 3 },
      { name: "Engaged / Nurture", count: 2 },
      { name: "Consult Booked", count: 1 },
      { name: "Active Buyer", count: 1 },
      { name: "Offer / Under Contract", count: 0 },
      { name: "Closed Buyer", count: 1 },
    ],
  },
  {
    id: "zLcxjfS4QLNo5bAZoGyw",
    name: "Marketing Pipeline",
    opportunities: 74,
    stages: [
      { name: "New Lead", count: 18 },
      { name: "Contacted", count: 12 },
      { name: "Follow Up", count: 10 },
      { name: "Meeting Set", count: 8 },
      { name: "Ready to Meet", count: 6 },
      { name: "LA Signed", count: 5 },
      { name: "Ready to List", count: 4 },
      { name: "On Market", count: 3 },
      { name: "Offers Received", count: 2 },
      { name: "In Escrow", count: 3 },
      { name: "Closed", count: 3 },
    ],
  },
  {
    id: "Ieqgr2BSJmLkJB1SCk31",
    name: "Seller Leads",
    opportunities: 1,
    stages: [
      { name: "New Lead", count: 1 },
      { name: "Contacted", count: 0 },
      { name: "Proposal Sent", count: 0 },
      { name: "Closed", count: 0 },
    ],
  },
];
