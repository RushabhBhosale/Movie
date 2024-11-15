import axiosClient from "@/utils/axiosClient";
import { errorResponse } from "@/utils/response";

// Fetch popular movies
export const fetchPopularMovies = async (): Promise<any | null> => {
  try {
    const res = await axiosClient.get("/tmdb/movies/popular");

    if (res.data && res.data.results) {
      return res.data.results;
    }

    return null;
  } catch (error: any) {
    errorResponse({
      status: error.response?.status || 500,
      message: error.response?.data?.message || "Server error",
    });
  }
};

// Fetch top-rated movies
export const fetchTopRatedMovies = async (): Promise<any | null> => {
  try {
    const res = await axiosClient.get("/tmdb/movies/top_rated");

    if (res.data && res.data.results) {
      return res.data.results;
    }

    return null;
  } catch (error: any) {
    errorResponse({
      status: error.response?.status || 500,
      message: error.response?.data?.message || "Server error",
    });
  }
};

// Fetch movie details by ID
export const fetchMovieDetails = async (
  movieId: string
): Promise<any | null> => {
  try {
    const res = await axiosClient.get(`/tmdb/movies/${movieId}`);

    if (res.data) {
      return res.data;
    }

    return null;
  } catch (error: any) {
    errorResponse({
      status: error.response?.status || 500,
      message: error.response?.data?.message || "Server error",
    });
  }
};

// Fetch movie recommendations by movie ID
export const fetchMovieRecommendations = async (
  movieId: string
): Promise<any | null> => {
  try {
    const res = await axiosClient.get(`/tmdb/movies/recommended/${movieId}`);

    if (res.data && res.data.results) {
      return res.data.results;
    }

    return null;
  } catch (error: any) {
    errorResponse({
      status: error.response?.status || 500,
      message: error.response?.data?.message || "Server error",
    });
  }
};
