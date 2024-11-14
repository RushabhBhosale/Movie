import { fetchPopularMovies } from "@/app/api/(services)/movie.service";
import { errorResponse, successResponse } from "@/utils/response";

export async function GET() {
  try {
    const movies = await fetchPopularMovies();
    return successResponse({
      status: 200,
      message: "Popular movies fetched successfully",
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
