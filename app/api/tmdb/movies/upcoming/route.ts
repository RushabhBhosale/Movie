import { fetchUpcomingMovies } from "@/app/services/movie.service";
import { errorResponse, successResponse } from "@/utils/response";

export async function GET() {
  try {
    const movies = await fetchUpcomingMovies();
    return successResponse({
      status: 200,
      message: "Upcoming movies fetched successfully",
      body: movies,
    });
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    return errorResponse({
      status: 500,
      message: "Server error",
    });
  }
}
