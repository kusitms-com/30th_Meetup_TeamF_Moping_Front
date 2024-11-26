import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const uuid = searchParams.get("uuid");

  if (!uuid) {
    return NextResponse.json(
      { error: "UUID parameter is missing" },
      { status: 400 }
    );
  }

  try {
    const externalResponse = await fetch(`/api/nonmembers/pings?uuid=${uuid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!externalResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data from external API" },
        { status: externalResponse.status }
      );
    }

    const data = await externalResponse.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
