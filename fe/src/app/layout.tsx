"use client";

import "../styles/globals.css";
import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* <header>
          <nav>
            <a href="/">Home</a>
            <a href="/dashboard">Dashboard</a>
          </nav>
        </header> */}
        <main>{children}</main>
        {/* <footer>© 2024 My App</footer> */}

        {/* 네이버 지도 API 스크립트 로드 */}
        <Script
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}&submodules=geocoder`}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
