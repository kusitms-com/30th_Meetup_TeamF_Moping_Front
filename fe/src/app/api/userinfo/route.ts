// 하드코딩으로 테스트 (추후 변경 예정)
import { NextResponse } from "next/server";

export async function GET() {
  const userInfo = {
    name: "John Doe",
    email: "johndoe@example.com",
  };

  return NextResponse.json(userInfo);
}

/*
// app/api/userinfo/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // 실제로는 백엔드 API 또는 세션에서 사용자 정보를 가져옴
  const response = await fetch('http://localhost:8080/api/userinfo', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const userInfo = await response.json();

  if (!userInfo) {
    return NextResponse.json({ error: 'User info not found' }, { status: 404 });
  }

  return NextResponse.json(userInfo);
}
*/
