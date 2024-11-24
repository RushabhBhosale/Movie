import { fetchUpcomingMovies } from "@/app/api/(services)/movie.service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await fetchUpcomingMovies();
    return NextResponse.json({
      data,
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
