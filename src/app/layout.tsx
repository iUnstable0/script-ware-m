"use client";

// Packages

import { useEffect } from "react";

import { Gradient } from "@/components/gradient";

// Styles

import "@/styles/globals.scss";

import styles from "@/styles/index.module.scss";

// Fonts

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const gradient: any = new Gradient();

    gradient.initGradient("#gradient-canvas");
  }, []);

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
      <body className={inter.className}>
        <div className={styles["gradient-blur"]} />
        <canvas className={styles["gradient-canvas"]} id="gradient-canvas" />

        {children}
      </body>
    </html>
  );
}
