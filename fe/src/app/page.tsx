import NaverLoginButton from "@/app/component/NaverLoginButton";
import KakaoLoginButton from "@/app/component/KakaoLoginButton";

export default function Home() {
  return (
    <div>
      <h1>Welcome to My App</h1>
      <p>Please login using Naver:</p>
      <NaverLoginButton />
      <KakaoLoginButton />
    </div>
  );
}
