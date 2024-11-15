import axiosClient from "@/utils/axiosClient";
import { errorResponse } from "@/utils/response";

// get popular TV shows
export const getPopularTVShows = async (): Promise<any | null> => {
  try {
    const res = await axiosClient.get("/tmdb/tv/popular");

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

// get top-rated TV shows
export const getTopRatedTVShows = async (): Promise<any> => {
  try {
    const res = await axiosClient.get("/tmdb/tv/top_rated");

    if (res.data && res.data.data.results) {
      return res.data.data.results.slice(0, 10);
    }

    return null;
  } catch (error: any) {
    errorResponse({
      status: error.response?.status || 500,
      message: error.response?.data?.message || "Server error",
    });
  }
};

// get TV show details by ID
export const getTVShowDetails = async (
  tvShowId: string
): Promise<any | null> => {
  try {
    const res = await axiosClient.get(`/tmdb/tv/${tvShowId}`);

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

// get TV show recommendations by TV show ID
export const getTVShowRecommendations = async (
  tvShowId: string
): Promise<any | null> => {
  try {
    const res = await axiosClient.get(`/tmdb/tv/recommended/${tvShowId}`);

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
