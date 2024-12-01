import { tmdbClient } from "@/lib/tmdb";
import { MoviesListResponse } from "@/types/tmdb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = new URL(req.url).searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { message: 'Query parameter "query" is required' },
      { status: 400 }
    );
  }

  try {
    // Fetch both movie and TV results simultaneously
    const [movieResults, TVResults] = await Promise.all([
      fetchSearchResults("movie", query),
      fetchSearchResults("tv", query),
    ]);

    const data = {
      movies: movieResults.results,
      tv: TVResults.results,
    };

    return NextResponse.json({
      data,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
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
