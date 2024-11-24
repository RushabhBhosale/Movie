import { fetchRecommendedTV } from "@/app/api/(services)/tv.service";
import { NextRequest, NextResponse } from "next/server";

interface ParamProps {
  params: {
    id: number;
  };
}

export async function GET(req: NextRequest, { params }: ParamProps) {
  const { id } = await params; // Extracts tvShowId from the URL path
  if (!id) {
    return NextResponse.json({ message: "TV ID is required" }, { status: 400 });
  }

  try {
    const data = await fetchRecommendedTV(Number(id));
    return NextResponse.json({
      data,
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching recommended TV details:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
