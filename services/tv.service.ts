import axiosClient from "@/utils/axiosClient";

export const tvService = {
  getPopularTv: () => axiosClient.get("tmdb/tv/popular"),
  getTopRatedTv: () => axiosClient.get("tmdb/tv/top_rated"),
  getAiringNowTv: () => axiosClient.get("tmdb/tv/airing_today"),
  getOnTheAirTv: () => axiosClient.get("tmdb/tv/on_the_air"),
  getTrendingTv: () => axiosClient.get("tmdb/tv/trending"),
  getLatestTv: () => axiosClient.get("tmdb/tv/latest"),
  getRecommendedTv: (tvId: number) =>
    axiosClient.get(`tmdb/tv/${tvId}/recommendations`),
  getSimilarTv: (tvId: number) => axiosClient.get(`tmdb/tv/${tvId}/similar`),
  getTvDetails: (tvId: number) => axiosClient.get(`tmdb/tv/${tvId}`),
  getTvReviews: (tvId: number) => axiosClient.get(`tmdb/tv/${tvId}/reviews`),
};
