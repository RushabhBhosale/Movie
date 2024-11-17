import axiosClient from "@/utils/axiosClient";

export const movieService = {
  getPopularMovies: () => axiosClient.get("tmdb/movies/popular"),
  getTopRatedMovies: () => axiosClient.get("tmdb/movies/top_rated"),
};
