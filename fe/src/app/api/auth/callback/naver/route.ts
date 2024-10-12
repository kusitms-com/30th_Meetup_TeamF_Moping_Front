// 백엔드와 연동 전 테스트 코드
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const clientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET;
  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;

  if (!code || !clientId || !clientSecret || !redirectUri) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  }

  // 네이버에 액세스 토큰 요청
  const tokenResponse = await fetch(
    `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${clientId}&client_secret=${clientSecret}&code=${code}&state=${state}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );

  const tokenData = await tokenResponse.json();

  if (tokenData.error) {
    return NextResponse.json(
      { error: tokenData.error_description },
      { status: 400 }
    );
  }

  const accessToken = tokenData.access_token;

  // 액세스 토큰을 콘솔에 출력해 테스트
  console.log("Access Token:", accessToken); // eslint-disable-line no-console

  // 프론트엔드에서 액세스 토큰을 확인할 수 있도록 응답
  return NextResponse.json({ accessToken });
}
