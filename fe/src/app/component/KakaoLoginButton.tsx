"use client";

import { useEffect } from "react";

export default function KakaoLoginButton() {
  useEffect(() => {
    // 카카오 SDK 초기화 (JavaScript Key는 환경 변수로 관리)
    if (!window.Kakao.isInitialized()) {
      const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID || "";

      window.Kakao.init(clientId);
    }
  }, []);
  const handleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_KAKAO_URI;
    const state = Math.random().toString(36).substring(2, 15);

    if (!clientId || !redirectUri) {
      alert("환경 변수가 제대로 설정되지 않았습니다.");
      return;
    }

    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&state=${state}`;

    window.location.href = kakaoAuthUrl;
  };

  return (
    <button type="button" onClick={handleLogin}>
      Sign in with Kakao
    </button>
  );
}
