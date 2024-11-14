import { fetchRecommendedMovies } from "@/app/api/(services)/movie.service";
import { errorResponse, successResponse } from "@/utils/response";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const movieId = req.url.split("/").pop(); // Extracts movieId from the URL path
    if (!movieId) {
      return errorResponse({
        status: 400,
        message: "Movie ID is required",
      });
    }
    const movies = await fetchRecommendedMovies(Number(movieId));
    return successResponse({
      status: 200,
      message: "Recommended movies fetched successfully",
      body: movies,
    });
  } catch (error) {
    console.error("Error fetching recommended movies:", error);
    return errorResponse({
      status: 500,
      message: "Server error",
    });
  }
}
