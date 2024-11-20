import { fetchTrendingMovies } from "@/app/api/(services)/movie.service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const movies = await fetchTrendingMovies();
    return NextResponse.json(
      {
        message: "Trending movies fetched successfully",
        data: movies,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
