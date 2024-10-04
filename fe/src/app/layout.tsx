// src/app/layout.tsx

"use client";

import { SessionProvider } from "next-auth/react"; // 세션 관리

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>My App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <SessionProvider>{children}</SessionProvider> {/* 세션 관리 */}
      </body>
    </html>
  );
}
