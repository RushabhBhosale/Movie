import {} from "@/app/services/tv.service";
import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/utils/response";
import { fetchLatestMovies } from "@/app/services/movie.service";

export async function GET(req: NextRequest) {
  try {
    const tvDetails = await fetchLatestMovies();
    return successResponse({
      status: 200,
      message: "Latest movies fetched successfully",
      body: tvDetails,
    });
  } catch (error) {
    console.error("Error fetching latest movies details:", error);
    return errorResponse({
      status: 500,
      message: "Server error",
    });
  }
}
