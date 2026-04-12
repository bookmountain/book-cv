import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Book Sam",
  description: "Portfolio site for Book Sam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
