import {} from "@/app/api/(services)/tv.service";
import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/utils/response";
import { fetchTrendingKeywords } from "../../(services)/trending.service";

export async function GET(req: NextRequest) {
  try {
    const tvDetails = await fetchTrendingKeywords();
    console.log("TV  Details", tvDetails);
    return successResponse({
      status: 200,
      message: "Latest Trending fetched successfully",
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
