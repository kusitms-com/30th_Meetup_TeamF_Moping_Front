import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://developers.kakao.com/sdk/js/kakao.min.js"
          strategy="beforeInteractive" // 페이지 로드 전에 실행
        />
      </head>
      <body>
        <header>
          <nav>
            <a href="/">Home</a>
            <a href="/dashboard">Dashboard</a>
          </nav>
        </header>
        <main>{children}</main>
        <footer>© 2024 My App</footer>
      </body>
    </html>
  );
}
