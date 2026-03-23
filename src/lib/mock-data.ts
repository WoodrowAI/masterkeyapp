import type { PlatformKey } from "./platforms";

// Seed-based pseudo-random for deterministic data
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = seededRandom(42);

function randBetween(min: number, max: number) {
  return Math.round(min + rand() * (max - min));
}

function randFloat(min: number, max: number) {
  return +(min + rand() * (max - min)).toFixed(2);
}

// Generate 30 days of dates
function generateDates(days: number = 30): string[] {
  const dates: string[] = [];
  const start = new Date("2026-02-21");
  for (let i = 0; i < days; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    dates.push(d.toISOString().slice(0, 10));
  }
  return dates;
}

export const dates = generateDates(30);

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

export const youtubeDailyMetrics: YouTubeDailyMetric[] = dates.map((date) => {
  const views = randBetween(5000, 15000);
  return {
    date,
    views,
    estimatedMinutesWatched: randBetween(views * 1.5, views * 3),
    averageViewDuration: randBetween(90, 210),
    averageViewPercentage: randFloat(35, 55),
    likes: randBetween(views * 0.03, views * 0.08),
    comments: randBetween(views * 0.005, views * 0.02),
    shares: randBetween(views * 0.002, views * 0.01),
    subscribersGained: randBetween(10, 65),
    videoThumbnailImpressionsClickRate: randFloat(3.5, 8.5),
  };
});

// ─── Instagram daily metrics ───
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

let igFollowers = 12400;
export const instagramDailyMetrics: InstagramDailyMetric[] = dates.map(
  (date) => {
    const impressions = randBetween(1000, 5000);
    igFollowers += randBetween(-5, 25);
    return {
      date,
      impressions,
      reach: randBetween(impressions * 0.6, impressions * 0.9),
      likes: randBetween(impressions * 0.04, impressions * 0.12),
      comments: randBetween(impressions * 0.005, impressions * 0.02),
      shares: randBetween(impressions * 0.003, impressions * 0.015),
      saves: randBetween(impressions * 0.01, impressions * 0.04),
      profile_views: randBetween(50, 200),
      follower_count: igFollowers,
    };
  }
);

// ─── TikTok daily metrics ───
export interface TikTokDailyMetric {
  date: string;
  view_count: number;
  like_count: number;
  comment_count: number;
  share_count: number;
}

export const tiktokDailyMetrics: TikTokDailyMetric[] = dates.map((date) => {
  const view_count = randBetween(2000, 8000);
  return {
    date,
    view_count,
    like_count: randBetween(view_count * 0.06, view_count * 0.15),
    comment_count: randBetween(view_count * 0.008, view_count * 0.03),
    share_count: randBetween(view_count * 0.004, view_count * 0.02),
  };
});

// ─── Facebook daily metrics ───
export interface FacebookDailyMetric {
  date: string;
  post_impressions: number;
  post_reach: number;
  post_reactions: number;
  post_video_views: number;
}

export const facebookDailyMetrics: FacebookDailyMetric[] = dates.map(
  (date) => {
    const post_impressions = randBetween(500, 2000);
    return {
      date,
      post_impressions,
      post_reach: randBetween(post_impressions * 0.5, post_impressions * 0.85),
      post_reactions: randBetween(
        post_impressions * 0.02,
        post_impressions * 0.07
      ),
      post_video_views: randBetween(
        post_impressions * 0.3,
        post_impressions * 0.7
      ),
    };
  }
);

// ─── Combined daily views for stacked area chart ───
export interface DailyViewsCombined {
  date: string;
  youtube: number;
  instagram: number;
  tiktok: number;
  facebook: number;
}

export const dailyViewsCombined: DailyViewsCombined[] = dates.map(
  (date, i) => ({
    date,
    youtube: youtubeDailyMetrics[i].views,
    instagram: instagramDailyMetrics[i].impressions,
    tiktok: tiktokDailyMetrics[i].view_count,
    facebook: facebookDailyMetrics[i].post_video_views,
  })
);

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
        youtubeDailyMetrics.reduce((s, d) => s + d.averageViewDuration, 0) /
          youtubeDailyMetrics.length
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
      likes: facebookDailyMetrics.reduce((s, d) => s + d.post_reactions, 0),
      comments: randBetween(800, 1500),
      shares: randBetween(300, 800),
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

export const topContent: TopContent[] = [
  { id: "v1", title: "5 Things to Know Before Buying in Thousand Oaks", platform: "youtube", views: 45200, engagementRate: 8.4, avgWatchPercent: 52, publishedDate: "2026-03-01" },
  { id: "v2", title: "Property Tour: 4BR in Westlake Village", platform: "youtube", views: 38700, engagementRate: 7.2, avgWatchPercent: 48, publishedDate: "2026-02-28" },
  { id: "v3", title: "Why Ventura County Market is HOT Right Now", platform: "tiktok", views: 32100, engagementRate: 12.1, avgWatchPercent: 31, publishedDate: "2026-03-05" },
  { id: "v4", title: "First-Time Buyer Mistakes in 2026", platform: "youtube", views: 28900, engagementRate: 9.3, avgWatchPercent: 55, publishedDate: "2026-03-08" },
  { id: "v5", title: "Luxury Kitchen Reveal - $2.8M Listing", platform: "instagram", views: 24500, engagementRate: 11.8, avgWatchPercent: 0, publishedDate: "2026-03-10" },
  { id: "v6", title: "Mortgage Rates Update March 2026", platform: "youtube", views: 21300, engagementRate: 6.5, avgWatchPercent: 44, publishedDate: "2026-03-12" },
  { id: "v7", title: "Day in the Life: Real Estate Agent", platform: "tiktok", views: 19800, engagementRate: 14.2, avgWatchPercent: 28, publishedDate: "2026-03-14" },
  { id: "v8", title: "Open House Tips That Actually Work", platform: "facebook", views: 15600, engagementRate: 5.8, avgWatchPercent: 38, publishedDate: "2026-03-02" },
  { id: "v9", title: "Hidden Gems: Camarillo Neighborhoods", platform: "youtube", views: 13200, engagementRate: 7.9, avgWatchPercent: 50, publishedDate: "2026-03-16" },
  { id: "v10", title: "How to Stage Your Home for Maximum Value", platform: "instagram", views: 11800, engagementRate: 10.5, avgWatchPercent: 0, publishedDate: "2026-03-18" },
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

function generateRetentionCurve(hookStrength: number, midRetention: number, endRetention: number) {
  const points: { elapsedVideoTimeRatio: number; audienceWatchRatio: number }[] = [];
  for (let i = 0; i <= 100; i++) {
    const ratio = i / 100;
    let retention: number;
    if (ratio <= 0.05) {
      retention = 1.0 - (1.0 - hookStrength) * (ratio / 0.05);
    } else if (ratio <= 0.5) {
      const t = (ratio - 0.05) / 0.45;
      retention = hookStrength - (hookStrength - midRetention) * t;
    } else {
      const t = (ratio - 0.5) / 0.5;
      retention = midRetention - (midRetention - endRetention) * t;
    }
    const noise = (rand() - 0.5) * 0.03;
    retention = Math.max(0.05, Math.min(1.0, retention + noise));
    points.push({
      elapsedVideoTimeRatio: ratio,
      audienceWatchRatio: +retention.toFixed(4),
    });
  }
  return points;
}

export const videoRetentionData: VideoRetention[] = [
  {
    id: "v1",
    title: "5 Things to Know Before Buying in Thousand Oaks",
    duration: 482,
    platform: "youtube",
    views: 45200,
    averageViewDuration: 154,
    averageViewPercentage: 42,
    retentionCurve: generateRetentionCurve(0.78, 0.48, 0.32),
    dropOffPoints: [
      { timestamp: "0:15", viewersLost: 8140, percentDrop: 18, reason: "Intro too long — viewers expecting immediate value" },
      { timestamp: "1:42", viewersLost: 5424, percentDrop: 12, reason: "Transition between points — pacing dip" },
      { timestamp: "3:18", viewersLost: 4068, percentDrop: 9, reason: "Complex market data section" },
      { timestamp: "5:45", viewersLost: 3616, percentDrop: 8, reason: "Call-to-action mid-roll" },
      { timestamp: "7:22", viewersLost: 2712, percentDrop: 6, reason: "Natural end of main content" },
    ],
    crossPlatform: {
      youtube: { views: 45200, avgWatchTime: "2:34", completionRate: 42 },
      instagram: { views: 12800, avgWatchTime: "0:18", completionRate: "N/A*" },
      tiktok: { views: 28900, avgWatchTime: "0:22", completionRate: 31 },
      facebook: { views: 8100, avgWatchTime: "0:45", completionRate: 38 },
    },
  },
  {
    id: "v2",
    title: "Property Tour: 4BR in Westlake Village",
    duration: 396,
    platform: "youtube",
    views: 38700,
    averageViewDuration: 178,
    averageViewPercentage: 48,
    retentionCurve: generateRetentionCurve(0.82, 0.52, 0.35),
    dropOffPoints: [
      { timestamp: "0:08", viewersLost: 5805, percentDrop: 15, reason: "No hook — started with exterior shot" },
      { timestamp: "2:10", viewersLost: 4257, percentDrop: 11, reason: "Garage tour — low interest section" },
      { timestamp: "3:50", viewersLost: 3483, percentDrop: 9, reason: "Neighborhood overview felt repetitive" },
      { timestamp: "5:15", viewersLost: 2709, percentDrop: 7, reason: "Pricing discussion" },
      { timestamp: "6:00", viewersLost: 1935, percentDrop: 5, reason: "End card / outro" },
    ],
    crossPlatform: {
      youtube: { views: 38700, avgWatchTime: "2:58", completionRate: 48 },
      instagram: { views: 9200, avgWatchTime: "0:22", completionRate: "N/A*" },
      tiktok: { views: 15400, avgWatchTime: "0:19", completionRate: 27 },
      facebook: { views: 5600, avgWatchTime: "0:52", completionRate: 41 },
    },
  },
  {
    id: "v3",
    title: "Why Ventura County Market is HOT Right Now",
    duration: 58,
    platform: "tiktok",
    views: 32100,
    averageViewDuration: 22,
    averageViewPercentage: 38,
    retentionCurve: generateRetentionCurve(0.72, 0.42, 0.25),
    dropOffPoints: [
      { timestamp: "0:03", viewersLost: 9630, percentDrop: 30, reason: "Weak hook — didn't grab attention" },
      { timestamp: "0:12", viewersLost: 4815, percentDrop: 15, reason: "Data slide felt too educational" },
      { timestamp: "0:28", viewersLost: 3531, percentDrop: 11, reason: "Mid-video lull" },
      { timestamp: "0:42", viewersLost: 2568, percentDrop: 8, reason: "Repetitive messaging" },
      { timestamp: "0:52", viewersLost: 1926, percentDrop: 6, reason: "CTA at end" },
    ],
    crossPlatform: {
      youtube: { views: 12400, avgWatchTime: "0:38", completionRate: 65 },
      instagram: { views: 18200, avgWatchTime: "0:15", completionRate: "N/A*" },
      tiktok: { views: 32100, avgWatchTime: "0:22", completionRate: 38 },
      facebook: { views: 4200, avgWatchTime: "0:31", completionRate: 53 },
    },
  },
  {
    id: "v4",
    title: "First-Time Buyer Mistakes in 2026",
    duration: 540,
    platform: "youtube",
    views: 28900,
    averageViewDuration: 198,
    averageViewPercentage: 55,
    retentionCurve: generateRetentionCurve(0.85, 0.55, 0.38),
    dropOffPoints: [
      { timestamp: "0:12", viewersLost: 4335, percentDrop: 15, reason: "Standard intro drop-off" },
      { timestamp: "2:30", viewersLost: 3179, percentDrop: 11, reason: "Complex financing discussion" },
      { timestamp: "4:15", viewersLost: 2601, percentDrop: 9, reason: "Inspection checklist section" },
      { timestamp: "6:40", viewersLost: 2023, percentDrop: 7, reason: "Negotiation tips overlap" },
      { timestamp: "8:20", viewersLost: 1445, percentDrop: 5, reason: "Outro and CTA" },
    ],
    crossPlatform: {
      youtube: { views: 28900, avgWatchTime: "3:18", completionRate: 55 },
      instagram: { views: 7600, avgWatchTime: "0:20", completionRate: "N/A*" },
      tiktok: { views: 19200, avgWatchTime: "0:24", completionRate: 33 },
      facebook: { views: 6800, avgWatchTime: "0:58", completionRate: 42 },
    },
  },
  {
    id: "v5",
    title: "Luxury Kitchen Reveal - $2.8M Listing",
    duration: 45,
    platform: "instagram",
    views: 24500,
    averageViewDuration: 18,
    averageViewPercentage: 40,
    retentionCurve: generateRetentionCurve(0.75, 0.44, 0.28),
    dropOffPoints: [
      { timestamp: "0:03", viewersLost: 6125, percentDrop: 25, reason: "Reel didn't stop the scroll" },
      { timestamp: "0:10", viewersLost: 3675, percentDrop: 15, reason: "Transition to details" },
      { timestamp: "0:20", viewersLost: 2695, percentDrop: 11, reason: "Mid-reel pacing" },
      { timestamp: "0:32", viewersLost: 1960, percentDrop: 8, reason: "Feature list felt long" },
      { timestamp: "0:40", viewersLost: 1470, percentDrop: 6, reason: "End of reel" },
    ],
    crossPlatform: {
      youtube: { views: 8900, avgWatchTime: "0:32", completionRate: 71 },
      instagram: { views: 24500, avgWatchTime: "0:18", completionRate: "N/A*" },
      tiktok: { views: 16800, avgWatchTime: "0:20", completionRate: 44 },
      facebook: { views: 3200, avgWatchTime: "0:28", completionRate: 62 },
    },
  },
  {
    id: "v6",
    title: "Mortgage Rates Update March 2026",
    duration: 420,
    platform: "youtube",
    views: 21300,
    averageViewDuration: 132,
    averageViewPercentage: 35,
    retentionCurve: generateRetentionCurve(0.68, 0.38, 0.22),
    dropOffPoints: [
      { timestamp: "0:20", viewersLost: 6390, percentDrop: 30, reason: "Slow start — no hook question" },
      { timestamp: "1:35", viewersLost: 3408, percentDrop: 16, reason: "Rate comparison table too dense" },
      { timestamp: "3:00", viewersLost: 2556, percentDrop: 12, reason: "Fed policy discussion" },
      { timestamp: "4:45", viewersLost: 1917, percentDrop: 9, reason: "Lender recommendations" },
      { timestamp: "6:10", viewersLost: 1278, percentDrop: 6, reason: "Outro" },
    ],
    crossPlatform: {
      youtube: { views: 21300, avgWatchTime: "2:12", completionRate: 35 },
      instagram: { views: 5100, avgWatchTime: "0:14", completionRate: "N/A*" },
      tiktok: { views: 8900, avgWatchTime: "0:18", completionRate: 24 },
      facebook: { views: 4500, avgWatchTime: "0:42", completionRate: 32 },
    },
  },
  {
    id: "v7",
    title: "Day in the Life: Real Estate Agent",
    duration: 62,
    platform: "tiktok",
    views: 19800,
    averageViewDuration: 24,
    averageViewPercentage: 39,
    retentionCurve: generateRetentionCurve(0.74, 0.43, 0.26),
    dropOffPoints: [
      { timestamp: "0:02", viewersLost: 3960, percentDrop: 20, reason: "First impression didn't hook" },
      { timestamp: "0:15", viewersLost: 2970, percentDrop: 15, reason: "Car scene transition" },
      { timestamp: "0:30", viewersLost: 2178, percentDrop: 11, reason: "Office work montage" },
      { timestamp: "0:45", viewersLost: 1584, percentDrop: 8, reason: "Talking head section" },
      { timestamp: "0:55", viewersLost: 990, percentDrop: 5, reason: "End of video" },
    ],
    crossPlatform: {
      youtube: { views: 6200, avgWatchTime: "0:48", completionRate: 77 },
      instagram: { views: 14300, avgWatchTime: "0:16", completionRate: "N/A*" },
      tiktok: { views: 19800, avgWatchTime: "0:24", completionRate: 39 },
      facebook: { views: 2800, avgWatchTime: "0:35", completionRate: 56 },
    },
  },
  {
    id: "v8",
    title: "Open House Tips That Actually Work",
    duration: 360,
    platform: "facebook",
    views: 15600,
    averageViewDuration: 145,
    averageViewPercentage: 40,
    retentionCurve: generateRetentionCurve(0.76, 0.45, 0.30),
    dropOffPoints: [
      { timestamp: "0:10", viewersLost: 3120, percentDrop: 20, reason: "Autoplay drop-off on Facebook" },
      { timestamp: "1:20", viewersLost: 2340, percentDrop: 15, reason: "Staging section felt generic" },
      { timestamp: "2:45", viewersLost: 1716, percentDrop: 11, reason: "Lighting tips overlap" },
      { timestamp: "4:00", viewersLost: 1248, percentDrop: 8, reason: "Pricing strategy discussion" },
      { timestamp: "5:30", viewersLost: 780, percentDrop: 5, reason: "Recap and CTA" },
    ],
    crossPlatform: {
      youtube: { views: 11200, avgWatchTime: "2:42", completionRate: 45 },
      instagram: { views: 6400, avgWatchTime: "0:19", completionRate: "N/A*" },
      tiktok: { views: 10500, avgWatchTime: "0:21", completionRate: 29 },
      facebook: { views: 15600, avgWatchTime: "2:25", completionRate: 40 },
    },
  },
  {
    id: "v9",
    title: "Hidden Gems: Camarillo Neighborhoods",
    duration: 510,
    platform: "youtube",
    views: 13200,
    averageViewDuration: 168,
    averageViewPercentage: 50,
    retentionCurve: generateRetentionCurve(0.80, 0.50, 0.34),
    dropOffPoints: [
      { timestamp: "0:18", viewersLost: 2640, percentDrop: 20, reason: "Intro music too long" },
      { timestamp: "2:00", viewersLost: 1848, percentDrop: 14, reason: "First neighborhood transition" },
      { timestamp: "4:10", viewersLost: 1320, percentDrop: 10, reason: "School district data" },
      { timestamp: "6:20", viewersLost: 924, percentDrop: 7, reason: "Commute time discussion" },
      { timestamp: "7:50", viewersLost: 660, percentDrop: 5, reason: "Outro" },
    ],
    crossPlatform: {
      youtube: { views: 13200, avgWatchTime: "2:48", completionRate: 50 },
      instagram: { views: 4100, avgWatchTime: "0:17", completionRate: "N/A*" },
      tiktok: { views: 7800, avgWatchTime: "0:20", completionRate: 26 },
      facebook: { views: 3400, avgWatchTime: "0:48", completionRate: 36 },
    },
  },
  {
    id: "v10",
    title: "How to Stage Your Home for Maximum Value",
    duration: 38,
    platform: "instagram",
    views: 11800,
    averageViewDuration: 15,
    averageViewPercentage: 39,
    retentionCurve: generateRetentionCurve(0.71, 0.41, 0.24),
    dropOffPoints: [
      { timestamp: "0:03", viewersLost: 3540, percentDrop: 30, reason: "Didn't stop the scroll" },
      { timestamp: "0:08", viewersLost: 1770, percentDrop: 15, reason: "Text overlay too fast" },
      { timestamp: "0:18", viewersLost: 1298, percentDrop: 11, reason: "Furniture rearrangement clip" },
      { timestamp: "0:28", viewersLost: 944, percentDrop: 8, reason: "Before/after reveal pacing" },
      { timestamp: "0:35", viewersLost: 590, percentDrop: 5, reason: "End of reel" },
    ],
    crossPlatform: {
      youtube: { views: 5400, avgWatchTime: "0:28", completionRate: 74 },
      instagram: { views: 11800, avgWatchTime: "0:15", completionRate: "N/A*" },
      tiktok: { views: 9200, avgWatchTime: "0:17", completionRate: 45 },
      facebook: { views: 2100, avgWatchTime: "0:24", completionRate: 63 },
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

export const funnelDatasets: FunnelData[] = [
  {
    id: "buy-guide",
    name: "Buy Guide Funnel",
    steps: [
      { name: "Social Content", count: 8420, conversionFromPrev: 100, dropOff: 0 },
      { name: "Link Clicked", count: 3180, conversionFromPrev: 37.8, dropOff: 62.2 },
      { name: "Call from Buy Guide", count: 412, conversionFromPrev: 13.0, dropOff: 87.0 },
      { name: "Meeting Scheduled", count: 89, conversionFromPrev: 21.6, dropOff: 78.4 },
    ],
    platformBreakdown: [
      { platform: "youtube", socialContent: 3200, linkClicked: 1340, callFromAsset: 178, meetingScheduled: 34, conversionRate: 1.06 },
      { platform: "instagram", socialContent: 1800, linkClicked: 720, callFromAsset: 112, meetingScheduled: 28, conversionRate: 1.56 },
      { platform: "tiktok", socialContent: 2400, linkClicked: 780, callFromAsset: 72, meetingScheduled: 15, conversionRate: 0.63 },
      { platform: "facebook", socialContent: 1020, linkClicked: 340, callFromAsset: 50, meetingScheduled: 12, conversionRate: 1.18 },
    ],
    bestVolumeDriver: "youtube",
    bestConverter: "instagram",
  },
  {
    id: "neighborhood-scorecard",
    name: "Neighborhood Scorecard Funnel",
    steps: [
      { name: "Social Content", count: 11200, conversionFromPrev: 100, dropOff: 0 },
      { name: "Link Clicked", count: 4650, conversionFromPrev: 41.5, dropOff: 58.5 },
      { name: "Call from Scorecard", count: 523, conversionFromPrev: 11.2, dropOff: 88.8 },
      { name: "Meeting Scheduled", count: 108, conversionFromPrev: 20.7, dropOff: 79.3 },
    ],
    platformBreakdown: [
      { platform: "youtube", socialContent: 2800, linkClicked: 1180, callFromAsset: 142, meetingScheduled: 28, conversionRate: 1.00 },
      { platform: "instagram", socialContent: 2200, linkClicked: 940, callFromAsset: 118, meetingScheduled: 22, conversionRate: 1.00 },
      { platform: "tiktok", socialContent: 4500, linkClicked: 1800, callFromAsset: 168, meetingScheduled: 32, conversionRate: 0.71 },
      { platform: "facebook", socialContent: 1700, linkClicked: 730, callFromAsset: 95, meetingScheduled: 26, conversionRate: 1.53 },
    ],
    bestVolumeDriver: "tiktok",
    bestConverter: "facebook",
  },
  {
    id: "seller-guide",
    name: "Seller Guide Funnel",
    steps: [
      { name: "Social Content", count: 6800, conversionFromPrev: 100, dropOff: 0 },
      { name: "Link Clicked", count: 2720, conversionFromPrev: 40.0, dropOff: 60.0 },
      { name: "Call from Seller Guide", count: 380, conversionFromPrev: 14.0, dropOff: 86.0 },
      { name: "Meeting Scheduled", count: 76, conversionFromPrev: 20.0, dropOff: 80.0 },
    ],
    platformBreakdown: [
      { platform: "youtube", socialContent: 2600, linkClicked: 1200, callFromAsset: 185, meetingScheduled: 38, conversionRate: 1.46 },
      { platform: "instagram", socialContent: 1600, linkClicked: 620, callFromAsset: 82, meetingScheduled: 16, conversionRate: 1.00 },
      { platform: "tiktok", socialContent: 1800, linkClicked: 580, callFromAsset: 68, meetingScheduled: 12, conversionRate: 0.67 },
      { platform: "facebook", socialContent: 800, linkClicked: 320, callFromAsset: 45, meetingScheduled: 10, conversionRate: 1.25 },
    ],
    bestVolumeDriver: "youtube",
    bestConverter: "youtube",
  },
  {
    id: "instant-valuation",
    name: "Instant Valuation Funnel",
    steps: [
      { name: "Social Content", count: 9600, conversionFromPrev: 100, dropOff: 0 },
      { name: "Link Clicked", count: 4100, conversionFromPrev: 42.7, dropOff: 57.3 },
      { name: "Call from Valuation", count: 490, conversionFromPrev: 12.0, dropOff: 88.0 },
      { name: "Meeting Scheduled", count: 95, conversionFromPrev: 19.4, dropOff: 80.6 },
    ],
    platformBreakdown: [
      { platform: "youtube", socialContent: 2200, linkClicked: 920, callFromAsset: 118, meetingScheduled: 22, conversionRate: 1.00 },
      { platform: "instagram", socialContent: 2800, linkClicked: 1260, callFromAsset: 172, meetingScheduled: 38, conversionRate: 1.36 },
      { platform: "tiktok", socialContent: 3400, linkClicked: 1380, callFromAsset: 128, meetingScheduled: 20, conversionRate: 0.59 },
      { platform: "facebook", socialContent: 1200, linkClicked: 540, callFromAsset: 72, meetingScheduled: 15, conversionRate: 1.25 },
    ],
    bestVolumeDriver: "tiktok",
    bestConverter: "instagram",
  },
  {
    id: "pm-guide",
    name: "Property Management Guide Funnel",
    steps: [
      { name: "Social Content", count: 5400, conversionFromPrev: 100, dropOff: 0 },
      { name: "Link Clicked", count: 2100, conversionFromPrev: 38.9, dropOff: 61.1 },
      { name: "Call from PM Guide", count: 298, conversionFromPrev: 14.2, dropOff: 85.8 },
      { name: "Meeting Scheduled", count: 62, conversionFromPrev: 20.8, dropOff: 79.2 },
    ],
    platformBreakdown: [
      { platform: "youtube", socialContent: 1400, linkClicked: 620, callFromAsset: 98, meetingScheduled: 22, conversionRate: 1.57 },
      { platform: "instagram", socialContent: 900, linkClicked: 340, callFromAsset: 42, meetingScheduled: 8, conversionRate: 0.89 },
      { platform: "tiktok", socialContent: 1200, linkClicked: 420, callFromAsset: 52, meetingScheduled: 10, conversionRate: 0.83 },
      { platform: "facebook", socialContent: 1900, linkClicked: 720, callFromAsset: 106, meetingScheduled: 22, conversionRate: 1.16 },
    ],
    bestVolumeDriver: "facebook",
    bestConverter: "youtube",
  },
];

// Aggregate "All Funnels" view
export function getAggregatedFunnelData(): FunnelData {
  const allSteps: FunnelStep[] = [
    { name: "Social Content", count: 0, conversionFromPrev: 100, dropOff: 0 },
    { name: "Link Clicked", count: 0, conversionFromPrev: 0, dropOff: 0 },
    { name: "Call from Asset", count: 0, conversionFromPrev: 0, dropOff: 0 },
    { name: "Meeting Scheduled", count: 0, conversionFromPrev: 0, dropOff: 0 },
  ];

  const platTotals: Record<PlatformKey, FunnelPlatformBreakdown> = {
    youtube: { platform: "youtube", socialContent: 0, linkClicked: 0, callFromAsset: 0, meetingScheduled: 0, conversionRate: 0 },
    instagram: { platform: "instagram", socialContent: 0, linkClicked: 0, callFromAsset: 0, meetingScheduled: 0, conversionRate: 0 },
    tiktok: { platform: "tiktok", socialContent: 0, linkClicked: 0, callFromAsset: 0, meetingScheduled: 0, conversionRate: 0 },
    facebook: { platform: "facebook", socialContent: 0, linkClicked: 0, callFromAsset: 0, meetingScheduled: 0, conversionRate: 0 },
  };

  for (const funnel of funnelDatasets) {
    allSteps[0].count += funnel.steps[0].count;
    allSteps[1].count += funnel.steps[1].count;
    allSteps[2].count += funnel.steps[2].count;
    allSteps[3].count += funnel.steps[3].count;
    for (const pb of funnel.platformBreakdown) {
      platTotals[pb.platform].socialContent += pb.socialContent;
      platTotals[pb.platform].linkClicked += pb.linkClicked;
      platTotals[pb.platform].callFromAsset += pb.callFromAsset;
      platTotals[pb.platform].meetingScheduled += pb.meetingScheduled;
    }
  }

  // Calculate conversion rates
  allSteps[1].conversionFromPrev = +((allSteps[1].count / allSteps[0].count) * 100).toFixed(1);
  allSteps[1].dropOff = +(100 - allSteps[1].conversionFromPrev).toFixed(1);
  allSteps[2].conversionFromPrev = +((allSteps[2].count / allSteps[1].count) * 100).toFixed(1);
  allSteps[2].dropOff = +(100 - allSteps[2].conversionFromPrev).toFixed(1);
  allSteps[3].conversionFromPrev = +((allSteps[3].count / allSteps[2].count) * 100).toFixed(1);
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
    bestConverter: "instagram",
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

export const funnelSources: FunnelSource[] = [
  { source: "youtube", platform: "youtube", clicks: 2340, landingViews: 1890, formFills: 234, callsBooked: 47, conversionRate: 2.0 },
  { source: "instagram", platform: "instagram", clicks: 1120, landingViews: 890, formFills: 156, callsBooked: 38, conversionRate: 3.4 },
  { source: "tiktok", platform: "tiktok", clicks: 3450, landingViews: 2100, formFills: 189, callsBooked: 28, conversionRate: 0.8 },
  { source: "facebook", platform: "facebook", clicks: 780, landingViews: 620, formFills: 98, callsBooked: 22, conversionRate: 2.8 },
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
    body: "Your average 3-second retention is 72%. Videos that open with a question retain 85% at 3 seconds. Try opening with 'Did you know...' or 'The #1 mistake buyers make in Thousand Oaks...' to improve hooks.",
    platforms: ["youtube", "tiktok", "instagram"],
    category: "hook",
    icon: "Zap",
  },
  {
    id: "ai2",
    title: "Best Posting Times",
    body: "Your TikTok videos posted between 7-9 AM PST get 34% more views than afternoon posts. Instagram performs best on Tuesdays and Thursdays at 12 PM.",
    platforms: ["tiktok", "instagram"],
    category: "timing",
    icon: "Clock",
  },
  {
    id: "ai3",
    title: "Content Strategy",
    body: "Property tour videos averaging 2:34 watch time outperform market update videos (1:12). Consider creating more tour-style content with personal narration.",
    platforms: ["youtube"],
    category: "content",
    icon: "TrendingUp",
  },
  {
    id: "ai4",
    title: "Funnel Optimization",
    body: "Instagram has the highest conversion rate (3.4%) despite lower traffic volume. Consider increasing Instagram ad spend. TikTok drives volume but converts at only 0.8% — the landing page may need mobile optimization.",
    platforms: ["instagram", "tiktok"],
    category: "funnel",
    icon: "Target",
  },
  {
    id: "ai5",
    title: "Engagement Pattern",
    body: "Videos with captions/subtitles see 28% higher completion rates. 67% of your TikTok viewers watch with sound off.",
    platforms: ["tiktok", "youtube"],
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

export const contentScore: ContentScore = {
  overall: 78,
  hooks: 72,
  engagement: 85,
  reach: 74,
  conversion: 81,
};

export interface TrendingTopic {
  topic: string;
  trend: "up" | "stable";
  volume: string;
}

export const trendingTopics: TrendingTopic[] = [
  { topic: "Thousand Oaks new construction 2026", trend: "up", volume: "High" },
  { topic: "Ventura County first-time buyer programs", trend: "up", volume: "High" },
  { topic: "Westlake Village luxury homes", trend: "stable", volume: "Medium" },
  { topic: "Camarillo school district ratings", trend: "up", volume: "Medium" },
  { topic: "Moorpark vs Simi Valley housing", trend: "up", volume: "Medium" },
  { topic: "California ADU laws 2026", trend: "up", volume: "High" },
  { topic: "Oxnard beachfront property investment", trend: "stable", volume: "Low" },
  { topic: "Home staging tips seller's market", trend: "up", volume: "Medium" },
];

// ─── PostHog Dashboard Mock Data ───

export interface PostHogSession {
  date: string;
  sessions: number;
  uniqueVisitors: number;
  pageviews: number;
  bounceRate: number;
  avgDuration: number; // seconds
}

export const posthogSessions: PostHogSession[] = dates.map((date) => {
  const sessions = randBetween(280, 520);
  return {
    date,
    sessions,
    uniqueVisitors: randBetween(Math.round(sessions * 0.65), Math.round(sessions * 0.85)),
    pageviews: randBetween(sessions * 2, sessions * 4),
    bounceRate: randFloat(38, 58),
    avgDuration: randBetween(85, 210),
  };
});

export interface PostHogLandingPage {
  url: string;
  uniqueVisitors: number;
  avgTimeOnPage: number; // seconds
  bounceRate: number;
  conversionRate: number;
}

export const posthogLandingPages: PostHogLandingPage[] = [
  { url: "/", uniqueVisitors: 4200, avgTimeOnPage: 42, bounceRate: 45.2, conversionRate: 3.8 },
  { url: "/buy-guide", uniqueVisitors: 1890, avgTimeOnPage: 128, bounceRate: 32.1, conversionRate: 8.2 },
  { url: "/neighborhood-scorecard", uniqueVisitors: 1620, avgTimeOnPage: 95, bounceRate: 36.4, conversionRate: 7.1 },
  { url: "/seller-guide", uniqueVisitors: 1340, avgTimeOnPage: 110, bounceRate: 34.8, conversionRate: 6.5 },
  { url: "/instant-valuation", uniqueVisitors: 2100, avgTimeOnPage: 68, bounceRate: 41.3, conversionRate: 5.4 },
  { url: "/property-management", uniqueVisitors: 820, avgTimeOnPage: 142, bounceRate: 28.7, conversionRate: 9.1 },
  { url: "/about", uniqueVisitors: 950, avgTimeOnPage: 55, bounceRate: 52.3, conversionRate: 2.1 },
  { url: "/listings", uniqueVisitors: 1450, avgTimeOnPage: 88, bounceRate: 38.9, conversionRate: 4.6 },
  { url: "/blog", uniqueVisitors: 680, avgTimeOnPage: 195, bounceRate: 44.1, conversionRate: 1.8 },
  { url: "/contact", uniqueVisitors: 540, avgTimeOnPage: 72, bounceRate: 22.6, conversionRate: 18.4 },
];

export interface PostHogUserPath {
  path: string[];
  sessions: number;
  percentage: number;
}

export const posthogUserPaths: PostHogUserPath[] = [
  { path: ["Landing", "Exit (bounce)"], sessions: 4820, percentage: 38.4 },
  { path: ["Landing", "About", "Contact"], sessions: 1240, percentage: 9.9 },
  { path: ["Landing", "Buy Guide", "Contact", "Thank You"], sessions: 890, percentage: 7.1 },
  { path: ["Landing", "Listings", "Listing Detail", "Contact"], sessions: 780, percentage: 6.2 },
  { path: ["Landing", "Neighborhood Scorecard", "Contact"], sessions: 650, percentage: 5.2 },
  { path: ["Landing", "Instant Valuation", "Results", "Contact"], sessions: 540, percentage: 4.3 },
  { path: ["Landing", "Seller Guide", "Contact"], sessions: 480, percentage: 3.8 },
  { path: ["Landing", "Blog", "Article", "Exit"], sessions: 420, percentage: 3.3 },
];

export interface PostHogEvent {
  event: string;
  count: number;
  uniqueUsers: number;
  sparkline: number[];
}

export const posthogEvents: PostHogEvent[] = [
  { event: "$pageview", count: 12450, uniqueUsers: 3200, sparkline: [380, 420, 395, 445, 410, 460, 435, 480, 415, 390, 450, 425, 405, 440] },
  { event: "form_submitted", count: 677, uniqueUsers: 612, sparkline: [18, 22, 25, 20, 28, 24, 26, 22, 30, 21, 19, 27, 23, 25] },
  { event: "call_booked", count: 135, uniqueUsers: 128, sparkline: [3, 5, 4, 6, 5, 7, 4, 5, 6, 3, 5, 4, 6, 5] },
  { event: "cta_clicked", count: 2340, uniqueUsers: 1890, sparkline: [72, 85, 78, 92, 88, 95, 82, 90, 86, 78, 94, 80, 88, 85] },
  { event: "video_played", count: 890, uniqueUsers: 654, sparkline: [28, 32, 30, 35, 33, 38, 29, 34, 31, 27, 36, 33, 30, 35] },
];

export interface PostHogDeviceBreakdown {
  device: string;
  percentage: number;
  count: number;
}

export const posthogDevices: PostHogDeviceBreakdown[] = [
  { device: "Desktop", percentage: 62, count: 7780 },
  { device: "Mobile", percentage: 34, count: 4270 },
  { device: "Tablet", percentage: 4, count: 500 },
];

export const posthogBrowsers: PostHogDeviceBreakdown[] = [
  { device: "Chrome", percentage: 58, count: 7280 },
  { device: "Safari", percentage: 24, count: 3012 },
  { device: "Firefox", percentage: 8, count: 1004 },
  { device: "Edge", percentage: 7, count: 879 },
  { device: "Other", percentage: 3, count: 376 },
];

export interface PostHogUTMSource {
  source: string;
  sessions: number;
  percentage: number;
}

export const posthogUTMSources: PostHogUTMSource[] = [
  { source: "youtube", sessions: 3840, percentage: 30.6 },
  { source: "instagram", sessions: 2120, percentage: 16.9 },
  { source: "tiktok", sessions: 2890, percentage: 23.0 },
  { source: "facebook", sessions: 1450, percentage: 11.6 },
  { source: "google (organic)", sessions: 1240, percentage: 9.9 },
  { source: "direct", sessions: 720, percentage: 5.7 },
  { source: "other", sessions: 290, percentage: 2.3 },
];
