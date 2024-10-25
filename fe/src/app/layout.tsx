import "@/styles/globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "My App",
  description: "This is my Next.js app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* 페이지별로 다른 레이아웃을 여기서 렌더링 */}
        {children}
      </body>
    </html>
  );
}
