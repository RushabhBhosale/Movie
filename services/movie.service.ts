import axiosClient from "@/utils/axiosClient";

export const movieService = {
  getPopularMovies: () => axiosClient.get("/api/movies/popular"),
  getTopRatedMovies: () => axiosClient.get("/api/movies/top_rated"),
};
