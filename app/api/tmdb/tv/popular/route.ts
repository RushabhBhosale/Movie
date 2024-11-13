import {} from "@/app/services/movie.service";
import { fetchPopularTV } from "@/app/services/tv.service";
import { errorResponse, successResponse } from "@/utils/response";

export async function GET() {
  try {
    const tvShows = await fetchPopularTV();
    return successResponse({
      status: 200,
      message: "Popular tv shows fetched successfully",
      body: tvShows,
    });
  } catch (error) {
    console.error("Error fetching popular tv:", error);
    return errorResponse({
      status: 500,
      message: "Server error",
    });
  }
}
