import { fetchTrendingMovies } from "@/app/services/movie.service";
import { errorResponse, successResponse } from "@/utils/response";

export async function GET() {
  try {
    const movies = await fetchTrendingMovies();
    return successResponse({
      status: 200,
      message: "Trending movies fetched successfully",
      body: movies,
    });
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return errorResponse({
      status: 500,
      message: "Server error",
    });
  }
}
