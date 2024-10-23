import NaverLoginButton from "@/app/components/NaverLoginButton";
import Script from "next/script";

export default function Home() {
  return (
    <div>
      <h1>Welcome to My App</h1>
      <p>Please login using Naver:</p>
      <NaverLoginButton />
    </div>
  );
}
