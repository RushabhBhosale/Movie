import { tmdbClient } from "@/lib/tmdb";
import { ReviewListResponse, TVListResponse } from "@/types/tmdb";

// Fetch popular TV shows
export const fetchPopularTV = async (): Promise<TVListResponse> => {
  const { data } = await tmdbClient.get("tv/popular");
  return data;
};

// Fetch trending TV shows (can be filtered by day or week)
export const fetchTrendingTV = async (
  timeWindow: "day" | "week" = "day"
): Promise<TVListResponse> => {
  const { data } = await tmdbClient.get(`trending/tv/${timeWindow}`);
  return data;
};

// Fetch details of a specific TV show by ID
export const fetchTVDetails = async (tvId: number): Promise<TVListResponse> => {
  const { data } = await tmdbClient.get(`tv/${tvId}`);
  return data;
};

// Fetch top-rated TV shows
export const fetchTopRatedTV = async (): Promise<TVListResponse> => {
  const { data } = await tmdbClient.get(`tv/top_rated`);
  return data;
};

// Fetch On the air TV shows (if available)
export const fetchOnTheAir = async (): Promise<TVListResponse> => {
  const { data } = await tmdbClient.get("tv/on_the_air");
  return data;
};

// Fetch airing today TV shows
export const fetchAiringToday = async (): Promise<TVListResponse> => {
  const { data } = await tmdbClient.get("tv/airing_today");
  return data;
};

// Fetch TV shows that are currently airing
export const fetchAiringNowTV = async (): Promise<TVListResponse> => {
  const { data } = await tmdbClient.get("tv/airing_today");
  return data;
};

// Fetch TV shows that are currently latest
export const fetchLatestTV = async (): Promise<TVListResponse> => {
  const { data } = await tmdbClient.get("tv/latest");
  return data;
};

// Fetch similar TV shows to a specific TV show by ID
export const fetchSimilarTV = async (tvId: number): Promise<TVListResponse> => {
  const { data } = await tmdbClient.get(`tv/${tvId}/similar`);
  return data;
};

// Fetch recommendations for a specific TV show by ID
export const fetchRecommendedTV = async (
  tvId: number
): Promise<TVListResponse> => {
  const { data } = await tmdbClient.get(`tv/${tvId}/recommendations`);
  return data;
};

// Fetch reviews for a specific TV show by ID
export const fetchTVReviews = async (
  tvId: number
): Promise<ReviewListResponse> => {
  const { data } = await tmdbClient.get(`tv/${tvId}/reviews`);
  return data;
};

// Fetch credits for a specific TV show by ID
export const fetchTVCredits = async (
  tvId: number
): Promise<ReviewListResponse> => {
  const { data } = await tmdbClient.get(`tv/${tvId}/credits`);
  return data;
};

// Fetch videos for a specific TV show by ID
export const fetchTVVideos = async (
  tvId: number
): Promise<ReviewListResponse> => {
  const { data } = await tmdbClient.get(`tv/${tvId}/videos`);
  return data;
};

// Fetch images for a specific TV show by ID
export const fetchTVImages = async (
  tvId: number
): Promise<ReviewListResponse> => {
  const { data } = await tmdbClient.get(`tv/${tvId}/images`);
  return data;
};
