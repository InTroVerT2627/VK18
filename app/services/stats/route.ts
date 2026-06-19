import { NextResponse } from "next/server";
import statsSnapshot from "@/data/stats.json";

export async function GET() {
  return NextResponse.json(statsSnapshot, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
    },
  });
}
