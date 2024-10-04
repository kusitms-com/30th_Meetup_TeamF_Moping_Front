// src/app/api/auth/callback/naver/route.ts

import { NextResponse } from "next/server";

async function getUserInfo(accessToken: string) {
  const response = await fetch("https://openapi.naver.com/v1/nid/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`, // 엑세스 토큰을 사용하여 요청
    },
  });

  const data = await response.json();
  return data.response; // 네이버 API에서 받은 사용자 정보
}

// GET 요청 처리
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code"); // 네이버에서 받은 인증 코드
  const state = searchParams.get("state") || ""; // CSRF 보호용 state 값 (기본값으로 빈 문자열 사용)

  if (!code) {
    return NextResponse.json(
      { error: "Authorization code is missing" },
      { status: 400 },
    );
  }

  try {
    // 네이버에 엑세스 토큰 요청
    const tokenResponse = await fetch("https://nid.naver.com/oauth2.0/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID!, // 환경 변수로 관리
        client_secret: process.env.NAVER_CLIENT_SECRET!, // 환경 변수로 관리
        code,
        state, // 여기서 state는 이제 항상 string 타입입니다.
        redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI!, // 환경 변수로 관리
      }),
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      return NextResponse.json(
        { error: "Failed to retrieve access token" },
        { status: 500 },
      );
    }

    // 엑세스 토큰으로 사용자 정보 요청
    const userInfo = await getUserInfo(accessToken);

    // 사용자 정보 반환
    return NextResponse.json(userInfo);
  } catch (error) {
    // 콘솔 로그를 제거하고 다른 방식으로 오류 처리
    return NextResponse.json(
      { error: "Failed to authenticate user" },
      { status: 500 },
    );
  }
}
