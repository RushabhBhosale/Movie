import { fetchTVDetails } from "@/app/api/(services)/tv.service";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const tvId = req.url.split("/").pop(); // Extracts tvId from the URL path
  if (!tvId) {
    return NextResponse.json({ message: "TV ID is required" }, { status: 400 });
  }

  try {
    const data = await fetchTVDetails(Number(tvId));
    return NextResponse.json({
      data,
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching TV details:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
