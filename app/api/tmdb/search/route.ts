import { tmdbClient } from "@/lib/tmdb";
import { MoviesListResponse } from "@/types/tmdb";
import { errorResponse, successResponse } from "@/utils/response";
import axios from "axios";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const query = new URL(req.url).searchParams.get("query");

  if (!query) {
    return successResponse({
      status: 400,
      message: 'Query parameter "query" is required',
    });
  }

  try {
    // Fetch both movie and TV results simultaneously
    const [movieResults, TVResults] = await Promise.all([
      fetchSearchResults("movie", query),
      fetchSearchResults("tv", query),
    ]);

    const combinedResults = {
      movies: movieResults.results,
      tvShows: TVResults.results,
    };

    return successResponse({
      status: 200,
      message: "Search results fetched successfully",
      body: combinedResults,
    });
  } catch (error) {
    return errorResponse({
      status: 500,
      message: "Server error",
    });
  }
}

const fetchSearchResults = async (
  mediaType: "movie" | "tv",
  query: string
): Promise<MoviesListResponse> => {
  const { data } = await tmdbClient.get(`search/${mediaType}`, {
    params: {
      api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
      query,
    },
  });
  return data;
};
