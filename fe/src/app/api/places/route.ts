import { NextResponse } from "next/server";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const searchQuery = searchParams.get("search");
  const latitude = searchParams.get("lat");
  const longitude = searchParams.get("lon");

  if (searchQuery) {
    try {
      const response = await fetch(
        `${BASE_API_URL}/places?search=${encodeURIComponent(searchQuery)}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (!data || data.length === 0) {
        return NextResponse.json({
          places: [],
          message: "No places found",
        });
      }

      return NextResponse.json({ places: data });
    } catch (error) {
      const err = error as Error;
      return NextResponse.json({
        places: [],
        message: err.message || "Error fetching places",
      });
    }
  }

  if (!latitude || !longitude) {
    return NextResponse.json({
      places: [],
      message: "Location parameters missing",
    });
  }

  try {
    const response = await fetch(
      `${BASE_API_URL}/places?lat=${latitude}&lon=${longitude}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (!data || data.length === 0) {
      return NextResponse.json({
        places: [],
        message: "No places found for the given location",
      });
    }

    return NextResponse.json({ places: data });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({
      places: [],
      message: err.message || "Error fetching places by location",
    });
  }
}

export async function POST(req: Request) {
  const { eventName, nonMembers, pings } = await req.json();

  try {
    const response = await fetch(`${BASE_API_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventName,
        nonMembers,
        pings,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({
      message: err.message || "Error creating event",
    });
  }
}
