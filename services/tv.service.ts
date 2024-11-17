import axiosClient from "@/utils/axiosClient";

export const tvService = {
  getPopularTv: () => axiosClient.get("tmdb/tv/popular"),
  getTopRatedTv: () => axiosClient.get("tmdb/tv/top_rated"),
};
