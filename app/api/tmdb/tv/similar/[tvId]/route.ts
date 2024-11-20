import { fetchSimilarTV } from "@/app/api/(services)/tv.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const tvId = req.url.split("/").pop(); // Extracts tvId from the URL path
  if (!tvId) {
    return NextResponse.json({ message: "TV ID is required" }, { status: 400 });
  }

  try {
    const tvDetails = await fetchSimilarTV(Number(tvId));
    return NextResponse.json(
      {
        message: "Similar TV shows fetched successfully",
        data: tvDetails,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching similar TV details:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
