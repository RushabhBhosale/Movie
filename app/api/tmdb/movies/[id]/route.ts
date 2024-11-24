import { fetchMovieDetails } from "@/app/api/(services)/movie.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const id = req.url.split("/").pop(); // Extracts id from the URL path

  if (!id) {
    return NextResponse.json(
      { message: "Movie ID is required" },
      { status: 400 }
    );
  }

  try {
    const movies = await fetchMovieDetails(Number(id));

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
