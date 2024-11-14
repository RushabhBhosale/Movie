import { fetchAiringNowTV } from "@/app/api/(services)/tv.service";
import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/utils/response";

export async function GET(req: NextRequest) {
  try {
    const tvDetails = await fetchAiringNowTV();
    return successResponse({
      status: 200,
      message: "Tv shows airing now fetched successfully",
      body: tvDetails,
    });
  } catch (error) {
    console.error("Error fetching airing now shows details:", error);
    return errorResponse({
      status: 500,
      message: "Server error",
    });
  }
}
