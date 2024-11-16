import axiosClient from "@/utils/axiosClient";
import { errorResponse } from "@/utils/response";

// get popular TV shows
export const getPopularTVShows = async (): Promise<any | null> => {
  return await axiosClient.get("/tmdb/tv/popular");
};

// get top-rated TV shows
export const getTopRatedTVShows = async (): Promise<any> => {
  return await axiosClient.get("/tmdb/tv/top_rated");
};

// get TV show details by ID
export const getTVShowDetails = async (
  tvShowId: string
): Promise<any | null> => {
  return await axiosClient.get(`/tmdb/tv/${tvShowId}`);
};

// get TV show recommendations by TV show ID
export const getTVShowRecommendations = async (
  tvShowId: string
): Promise<any | null> => {
  return await axiosClient.get(`/tmdb/tv/recommended/${tvShowId}`);
};
