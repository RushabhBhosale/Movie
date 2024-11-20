import { fetchTopRatedMovies } from "@/app/api/(services)/movie.service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const movies = await fetchTopRatedMovies();
    return NextResponse.json(
      {
        message: "Top rated movies fetched successfully",
        data: movies,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
