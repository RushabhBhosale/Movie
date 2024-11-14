import { fetchLatestTV } from "@/app/api/(services)/tv.service";
import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/utils/response";

export async function GET(req: NextRequest) {
  try {
    const tvDetails = await fetchLatestTV();
    return successResponse({
      status: 200,
      message: "Latest Tv shows fetched successfully",
      body: tvDetails,
    });
  } catch (error) {
    console.error("Error fetching latest shows details:", error);
    return errorResponse({
      status: 500,
      message: "Server error",
    });
  }
}
