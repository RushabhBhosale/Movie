import { fetchSimilarMovies } from "@/app/api/(services)/movie.service";
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
    const movies = await fetchSimilarMovies(Number(movieId));
    return successResponse({
      status: 200,
      message: "Similar movies fetched successfully",
      body: movies,
    });
  } catch (error) {
    console.error("Error fetching similar movies:", error);
    return errorResponse({
      status: 500,
      message: "Server error",
    });
  }
}
