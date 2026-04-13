import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Book Sam | Software Engineer",
  description:
    "Book Sam builds AI systems, product interfaces, and resilient backend workflows across Microsoft experience, self-hosted AI infrastructure, and modern web delivery.",
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
