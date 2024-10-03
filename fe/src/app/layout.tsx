"use client";

import { SessionProvider } from 'next-auth/react';
import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Test App</title>
      </head>
      <body>
        <SessionProvider>
          <header>
            <h1>Test App</h1>
          </header>
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
