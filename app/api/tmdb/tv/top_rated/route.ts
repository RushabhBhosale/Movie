import { fetchTopRatedTV } from "@/app/api/(services)/tv.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const data = await fetchTopRatedTV();
    return NextResponse.json(
      {
        message: "Top rated TV shows fetched successfully",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching top rated shows details:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
