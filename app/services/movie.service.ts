import axiosClient from "@/utils/axiosClient";
import { errorResponse } from "@/utils/response";

// Fetch popular movies
export const fetchPopularMovies = async (): Promise<any | null> => {
  return await axiosClient.get("/tmdb/movies/popular");
};

// Fetch top-rated movies
export const fetchTopRatedMovies = async (): Promise<any | null> => {
  return await axiosClient.get("/tmdb/movies/top_rated");
};

// Fetch movie details by ID
export const fetchMovieDetails = async (
  movieId: string
): Promise<any | null> => {
  return await axiosClient.get(`/tmdb/movies/${movieId}`);
};

// Fetch movie recommendations by movie ID
export const fetchMovieRecommendations = async (
  movieId: string
): Promise<any | null> => {
  return await axiosClient.get(`/tmdb/movies/recommended/${movieId}`);
};
