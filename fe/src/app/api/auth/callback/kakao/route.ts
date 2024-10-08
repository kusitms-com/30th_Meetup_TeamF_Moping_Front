import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET;
  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_KAKAO_URI;

  // 필수 매개변수가 없을 경우 처리
  if (!code || !clientId || !clientSecret || !redirectUri) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  }

  try {
    // 카카오에 액세스 토큰 요청
    const tokenResponse = await fetch(`https://kauth.kakao.com/oauth/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        code,
      }).toString(),
    });

    // 액세스 토큰 데이터를 받아 처리
    const tokenData = await tokenResponse.json();
    if (tokenData.error) {
      return NextResponse.json(
        { error: tokenData.error_description },
        { status: 400 }
      );
    }

    const accessToken = tokenData.access_token;

    // 액세스 토큰 출력 (테스트 용도)
    // console.log('Access Token:', accessToken); // eslint-disable-line no-console

    // 클라이언트에 액세스 토큰 전달
    return NextResponse.json({ accessToken });
  } catch (error) {
    console.error("Error during OAuth process:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
