"use client";

// Packages

import { useEffect } from "react";

import { invoke } from "@tauri-apps/api/tauri";

// Styles

import styles from "@/styles/bootstrapper.module.scss";

export default function Page() {
  useEffect(() => {
    void invoke("my_custom_command");
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Login</div>
    </div>
  );
}
