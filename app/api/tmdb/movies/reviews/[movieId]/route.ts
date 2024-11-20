import {
  fetchReviews,
  fetchSimilarMovies,
} from "@/app/api/(services)/movie.service";
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
    const reviews = await fetchReviews(Number(movieId));
    return NextResponse.json(
      {
        message: "Movie Reviews fetched successfully",
        data: reviews,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching movie reviews:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
