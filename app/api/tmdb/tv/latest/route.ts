import { fetchLatestTV } from "@/app/api/(services)/tv.service";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const data = await fetchLatestTV();
    return NextResponse.json(
      {
        message: "Latest TV shows fetched successfully",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching latest shows details:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
