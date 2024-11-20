import axiosClient from "@/utils/axiosClient";

export const trendingService = {
  getTrendingKeywords: () => axiosClient.get("tmdb/trending"),
};
