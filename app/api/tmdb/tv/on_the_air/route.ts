import { fetchOnTheAir } from "@/app/api/(services)/tv.service";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const data = await fetchOnTheAir();
    return NextResponse.json(
      {
        message: "Upcoming week TV shows fetched successfully",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching upcoming week shows details:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
