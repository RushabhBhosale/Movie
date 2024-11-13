import { fetchTVReviews } from "@/app/services/tv.service";
import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/utils/response";

export async function GET(req: NextRequest) {
  const tvId = req.url.split("/").pop(); // Extracts tvId from the URL path
  if (!tvId) {
    return errorResponse({
      status: 400,
      message: "TV ID is required",
    });
  }

  try {
    const tvDetails = await fetchTVReviews(Number(tvId));
    return successResponse({
      status: 200,
      message: "Tv shows reviews fetched successfully",
      body: tvDetails,
    });
  } catch (error) {
    console.error("Error fetching tv reviews details:", error);
    return errorResponse({
      status: 500,
      message: "Server error",
    });
  }
}
