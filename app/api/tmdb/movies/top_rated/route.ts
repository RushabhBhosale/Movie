import { fetchTopRatedMovies } from "@/app/api/(services)/movie.service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await fetchTopRatedMovies();
    return NextResponse.json({
      data,
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
