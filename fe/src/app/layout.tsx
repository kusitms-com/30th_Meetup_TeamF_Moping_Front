import "@/styles/globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Moping!",
  description: "모일 때 맵핀, MOPING",
  keywords:
    "모핑, 맵핀, moping, 공유지도, 모임, 네이버 지도, 북마크, 맛집, 카페, 데이트",
  openGraph: {
    title: "Moping!",
    description: "모일 때 맵핀, MOPING",
    url: "https://www.moping.co.kr",
    images: "/thumbnail.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moping!",
    description: "모일 때 맵핀, MOPING",
    images: "/thumbnail.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
