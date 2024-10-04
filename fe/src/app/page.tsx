// src/app/page.tsx

import LoginButton from "@/component/NaverLoginButton";

export default function Home() {
  // 환경 변수를 사용하여 리디렉션 URL 설정
  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;

  if (!redirectUri) {
    throw new Error(
      "Redirect URI is not defined in the environment variables.",
    );
  }

  return (
    <div>
      <h1>Welcome to the Main Page</h1>
      <p>Please login using Naver:</p>
      {/* 리디렉션 URL을 props로 전달 */}
      <LoginButton redirectUri={redirectUri} />
    </div>
  );
}
