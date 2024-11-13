import { tmdbClient } from "@/lib/tmdb";
import { MoviesListResponse } from "@/types/tmdb";

export const fetchPopularMovies = async (): Promise<MoviesListResponse> => {
  const { data } = await tmdbClient.get("movie/popular");
  return data;
};

export const fetchTrendingMovies = async (
  timeWindow: "day" | "week" = "day"
): Promise<MoviesListResponse> => {
  const { data } = await tmdbClient.get(`trending/movie/${timeWindow}`);
  return data;
};

export const fetchMovieDetails = async (
  movieId: number
): Promise<MoviesListResponse> => {
  const { data } = await tmdbClient.get(`movie/${movieId}`);
  return data;
};

export const fetchTopRatedMovies = async (): Promise<MoviesListResponse> => {
  const { data } = await tmdbClient.get(`movie/top_rated`);
  return data;
};

export const fetchLatestMovies = async () => {
  const { data } = await tmdbClient.get("movie/latest");
  return data;
};

export const fetchUpcomingMovies = async () => {
  const { data } = await tmdbClient.get("movie/upcoming");
  return data;
};

export const fetchMoviesPlayingNow = async () => {
  const { data } = await tmdbClient.get("movie/now_playing");
  return data;
};

export const fetchSimilarMovies = async (movieId: number) => {
  const { data } = await tmdbClient.get(`movie/${movieId}/similar`);
  return data;
};

export const fetchRecommendedMovies = async (movieId: number) => {
  const { data } = await tmdbClient.get(`movie/${movieId}/recommendations`);
  return data;
};

export const fetchReviews = async (movieId: number) => {
  const { data } = await tmdbClient.get(`movie/${movieId}/reviews`);
  return data;
};
