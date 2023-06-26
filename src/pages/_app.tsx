// Packages

import { useEffect } from "react";

import { Gradient } from "@/components/gradient";

// Styles

import "@/styles/globals.scss";

import styles from "@/styles/index.module.scss";

// Fonts

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// Types

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
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
      }}
    >
      <body className={inter.className}>
        <div className={styles["gradient-blur"]} />
        <canvas className={styles["gradient-canvas"]} id="gradient-canvas" />

        <Component {...pageProps} />
      </body>
    </html>
  );
}
