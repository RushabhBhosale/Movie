import { fetchPopularTV } from "@/app/api/(services)/tv.service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await fetchPopularTV();
    return NextResponse.json(
      {
        message: "Popular TV shows fetched successfully",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching popular TV:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
