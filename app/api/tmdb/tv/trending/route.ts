import { fetchTrendingTV } from "@/app/api/(services)/tv.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const data = await fetchTrendingTV();
    return NextResponse.json(
      {
        message: "Trending TV shows fetched successfully",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching trending shows details:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
