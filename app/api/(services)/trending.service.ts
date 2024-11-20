import { tmdbClient } from "@/lib/tmdb";
import { TMDBListResponse } from "@/types/tmdb";

export const fetchTrendingKeywords = async (
  timeWindow: "day" | "week" = "day"
): Promise<TMDBListResponse> => {
  const { data } = await tmdbClient.get(`trending/all/${timeWindow}`);
  return data;
};
