import { fetchMovieDetails } from "@/app/api/(services)/movie.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const movieId = req.url.split("/").pop(); // Extracts movieId from the URL path

  if (!movieId) {
    return NextResponse.json(
      { message: "Movie ID is required" },
      { status: 400 }
    );
  }

  try {
    const movies = await fetchMovieDetails(Number(movieId));

    // Return a successful response with movie details
    return NextResponse.json(
      {
        message: "Movie Details fetched successfully",
        data: movies,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching movie details:", error);

    // Return an error response
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
