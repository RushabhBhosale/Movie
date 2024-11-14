import { fetchTopRatedTV } from "@/app/api/(services)/tv.service";
import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/utils/response";

export async function GET(req: NextRequest) {
  try {
    const tvDetails = await fetchTopRatedTV();
    return successResponse({
      status: 200,
      message: "Top rated tv shows fetched successfully",
      body: tvDetails,
    });
  } catch (error) {
    console.error("Error fetching top rated shows details:", error);
    return errorResponse({
      status: 500,
      message: "Server error",
    });
  }
}
