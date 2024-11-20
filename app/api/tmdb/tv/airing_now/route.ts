import { fetchAiringNowTV } from "@/app/api/(services)/tv.service";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const tvDetails = await fetchAiringNowTV();
    return NextResponse.json(
      {
        message: "TV shows airing now fetched successfully",
        data: tvDetails,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching airing now shows details:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
