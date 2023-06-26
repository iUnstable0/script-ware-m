"use client";

// Components

import TitleBar from "@/components/titleBar";

// Styles

import styles from "@/styles/bootstrapper.module.scss";

export default function Page() {
  return (
    <div>
      <TitleBar />

      <div className={styles.container}>
        <div className={styles.title}>Welcome</div>
      </div>
    </div>
  );
}
