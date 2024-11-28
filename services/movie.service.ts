import axiosClient from "@/utils/axiosClient";

export const movieService = {
  getPopularMovies: () => axiosClient.get("tmdb/movies/popular"),
  getTopRatedMovies: () => axiosClient.get("tmdb/movies/top_rated"),
  getTrendingMovies: () => axiosClient.get("tmdb/movies/trending"),
  getUpcomingMovies: () => axiosClient.get("tmdb/movies/upcoming"),
  getPlayingNowMovies: () => axiosClient.get("tmdb/movies/now_playing"),
  getRecommendedMovies: (movieId: number) =>
    axiosClient.get(`tmdb/movies/${movieId}/recommendations`),
  getSimilarMovies: (movieId: number) =>
    axiosClient.get(`tmdb/movies/${movieId}/similar`),
  getMovieDetails: (movieId: number) =>
    axiosClient.get(`tmdb/movies/${movieId}`),
  getMovieReviews: (movieId: number) =>
    axiosClient.get(`tmdb/movies/${movieId}/reviews`),
  getSearchResults: (query: string) =>
    axiosClient.get(`tmdb/search/movie`, {
      params: { query },
    }),
  getMovieCredits: (movieId: number) =>
    axiosClient.get(`tmdb/movies/${movieId}/credits`),
  getMovieVideos: (movieId: number) =>
    axiosClient.get(`tmdb/movies/${movieId}/videos`),
  getMovieImages: (movieId: number) =>
    axiosClient.get(`tmdb/movies/${movieId}/images`),
};
