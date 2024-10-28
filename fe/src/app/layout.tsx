import "@/styles/globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "My App",
  description: "This is my Next.js app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
