import { fetchMovieDetails } from "@/app/services/movie.service";
import { NextRequest, NextResponse } from "next/server";
import { errorResponse, successResponse } from "@/utils/response";

export async function GET(req: NextRequest) {
  const movieId = req.url.split("/").pop(); // Extracts movieId from the URL path
  if (!movieId) {
    return errorResponse({
      status: 400,
      message: "Movie ID is required",
    });
  }
  try {
    const movies = await fetchMovieDetails(Number(movieId));
    return successResponse({
      status: 200,
      message: "Movie Details fetched successfully",
      body: movies,
    });
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return errorResponse({
      status: 500,
      message: "Server error",
    });
  }
}
