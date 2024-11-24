import { fetchLatestMovies } from "@/app/api/(services)/movie.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Fetch the latest movies
    const data = await fetchLatestMovies();

    // Return a success response with the fetched movie details
    return NextResponse.json({
      data,
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching latest movies details:", error);

    // Return an error response if an issue occurs
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
