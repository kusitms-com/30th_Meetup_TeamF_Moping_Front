export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Test App</title>
      </head>
      <body>
        <header>
          <h1>Test App</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
