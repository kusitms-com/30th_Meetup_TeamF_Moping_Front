// src/component/NaverLoginButton.tsx

"use client";

interface LoginButtonProps {
  redirectUri: string;
}

export default function LoginButton({ redirectUri }: LoginButtonProps) {
  const handleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
    const state = Math.random().toString(36).substring(2, 15); // CSRF 보호를 위한 임의의 state 값

    if (!clientId) {
      alert(
        "Naver Client ID is missing. Please check the environment variables.",
      );
      return;
    }

    // 네이버 로그인 페이지로 리디렉션
    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${encodeURIComponent(state)}`;
    window.location.href = naverAuthUrl;
  };

  // 버튼의 type을 명시적으로 설정
  return (
    <button type="button" onClick={handleLogin}>
      Sign in with Naver
    </button>
  );
}
