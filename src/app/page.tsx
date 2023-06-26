"use client";

// Packages

import { useEffect } from "react";

import { Gradient } from "@/lib/gradient";

// Components

import Editor from "@monaco-editor/react";

import Frame from "@/components/frame";

// Styles

import styles from "@/styles/index.module.scss";

export default function Page() {
  useEffect(() => {
    const gradient: any = new Gradient();

    gradient.initGradient("#gradient-canvas");
  }, []);

  return (
    <div>
      <div className={styles["gradient-blur"]} />
      <canvas className={styles["gradient-canvas"]} id="gradient-canvas" />

      <Frame />

      {/*<div className={styles.container}>*/}
      <Editor
        // height="90vh"
        // height="100vh"
        className={styles.container}
        defaultLanguage="javascript"
        defaultValue="// some comment"
      />
      {/*</div>*/}
    </div>
  );
}
