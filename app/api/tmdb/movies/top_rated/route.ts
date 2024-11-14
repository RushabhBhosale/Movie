import { fetchTopRatedMovies } from "@/app/api/(services)/movie.service";
import { errorResponse, successResponse } from "@/utils/response";

export async function GET() {
  try {
    const movies = await fetchTopRatedMovies();
    return successResponse({
      status: 200,
      message: "Top rated movies fetched successfully",
      body: movies,
    });
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    return errorResponse({
      status: 500,
      message: "Server error",
    });
  }
}
