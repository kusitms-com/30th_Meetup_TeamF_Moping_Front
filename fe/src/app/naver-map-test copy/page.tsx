import NaverLoginButton from "@/app/components/test/NaverLoginButton";
import Script from "next/script";

export default function Home() {
  return (
    <div>
      <h1>Welcome to My App</h1>
      <p>Please login using Naver:</p>
      <NaverLoginButton />
      <Script
        strategy="afterInteractive"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
      />
    </div>
  );
}
