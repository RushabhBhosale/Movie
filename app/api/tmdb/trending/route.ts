import { NextRequest } from "next/server";
import { fetchTrendingKeywords } from "../../(services)/trending.service";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const tvDetails = await fetchTrendingKeywords();
    console.log("TV Details", tvDetails);

    return NextResponse.json(
      {
        message: "Latest Trending fetched successfully",
        data: tvDetails,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching latest trending details:", error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
