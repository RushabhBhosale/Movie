import { fetchRecommendedMovies } from "@/app/api/(services)/movie.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const movieId = req.url.split("/").pop(); // Extracts movieId from the URL path
    if (!movieId) {
      return NextResponse.json(
        { message: "Movie ID is required" },
        { status: 400 }
      );
    }
    const movies = await fetchRecommendedMovies(Number(movieId));
    return NextResponse.json(
      {
        message: "Recommended movies fetched successfully",
        data: movies,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching recommended movies:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
