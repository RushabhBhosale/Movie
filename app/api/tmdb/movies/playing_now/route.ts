import { fetchMoviesPlayingNow } from "@/app/api/(services)/movie.service";
import { errorResponse, successResponse } from "@/utils/response";

export async function GET() {
  try {
    const movies = await fetchMoviesPlayingNow();
    return successResponse({
      status: 200,
      message: "Movies Playing now fetched successfully",
      body: movies,
    });
  } catch (error) {
    console.error("Error fetching movies playing now:", error);
    return errorResponse({
      status: 500,
      message: "Server error",
    });
  }
}
