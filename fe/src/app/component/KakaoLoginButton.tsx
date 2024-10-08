"use client";

import { useEffect } from "react";

export default function KakaoLoginButton() {
  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID || ""; // 기본값 처리
    const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI || ""; // 기본값 처리

    if (!clientId || !redirectUri) {
      // eslint-disable-next-line no-console
      console.error("환경 변수가 설정되지 않았습니다.");
      return;
    }

    if (typeof window !== "undefined" && !window.Kakao.isInitialized()) {
      window.Kakao.init(clientId);
    }
  }, []);

  const handleKakaoLogin = () => {
    const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI || "";
    window.Kakao.Auth.authorize({
      redirectUri,
    });
  };

  return (
    <div>
      <button type="button" onClick={handleKakaoLogin}>
        카카오 로그인하기
      </button>
    </div>
  );
}
