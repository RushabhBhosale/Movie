import { fetchSimilarTV } from "@/app/api/(services)/tv.service";
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
    const tvDetails = await fetchSimilarTV(Number(tvId));
    return successResponse({
      status: 200,
      message: "Similar tv shows fetched successfully",
      body: tvDetails,
    });
  } catch (error) {
    console.error("Error fetching similar tv details:", error);
    return errorResponse({
      status: 500,
      message: "Server error",
    });
  }
}
