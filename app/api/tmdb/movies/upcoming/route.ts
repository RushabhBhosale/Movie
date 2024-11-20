import { fetchUpcomingMovies } from "@/app/api/(services)/movie.service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const movies = await fetchUpcomingMovies();
    return NextResponse.json(
      {
        message: "Upcoming movies fetched successfully",
        data: movies,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
