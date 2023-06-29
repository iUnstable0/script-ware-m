"use client";

// Styles

import "@/styles/globals.scss";

// Fonts

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      style={{
        overscrollBehavior: "none",
        overflow: "hidden",
        overflowY: "hidden",
        border: "none",
      }}
    >
      <body
        className={inter.className}
        style={{
          border: "none",
        }}
      >
        {children}
      </body>
    </html>
  );
}
