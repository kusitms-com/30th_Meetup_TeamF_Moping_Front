// app/api/places/route.ts

import { NextResponse } from "next/server";

// 예시 장소 데이터 (실제 서비스에서는 DB에서 가져오는 로직 필요)
const mockPlaces = [
  { name: "홍대입구역 2호선", address: "서울 마포구 양화로 123" },
  { name: "강남역 2호선", address: "서울 서초구 강남대로 456" },
  { name: "역삼역 2호선", address: "서울 강남구 테헤란로 789" },
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("search");

  if (!query) {
    return NextResponse.json({ places: [] });
  }

  // 검색어에 맞는 장소 필터링
  const filteredPlaces = mockPlaces.filter((place) =>
    place.name.toLowerCase().includes(query.toLowerCase())
  );

  return NextResponse.json({ places: filteredPlaces });
}
