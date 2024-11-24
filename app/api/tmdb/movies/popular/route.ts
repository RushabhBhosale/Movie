import { fetchPopularMovies } from "@/app/api/(services)/movie.service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await fetchPopularMovies();
    return NextResponse.json({
      data,
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
