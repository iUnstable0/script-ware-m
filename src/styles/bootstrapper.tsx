// Packages

import { fetch, ResponseType } from "@tauri-apps/api/http";
import { resourceDir, resolveResource } from "@tauri-apps/api/path";

import * as fs from "@tauri-apps/api/fs";

// Components

import { motion, AnimatePresence } from "framer-motion";

import Image from "next/image";

import { LoaderIcon } from "@/components/loader";

// Styles

import styles from "@/styles/bootstrapper.module.scss";

export default function Page() {
  const init = async () => {
    const libScriptWarePath = await resolveResource("libScriptWare.dylib");
    // console.log(libScriptWarePath);
    // const libScriptWareExists = await fs.exists(libScriptWarePath);
    // if (!libScriptWareExists) {
    // const libScriptWare = (
    //   await fetch(
    //     "https://script-ware.com/api/serve/beta/libScriptWare.dylib",
    //     {
    //       method: "GET",
    //       responseType: ResponseType.Binary,
    //     }
    //   )
    // ).data as any;
    //
    // await fs.writeBinaryFile("libScriptWare.dylib", libScriptWare, {
    //   dir: fs.BaseDirectory.Resource,
    // });
    // }
    // const SWMAuth2Path = await resolveResource("SWMAuth2");
    // const SWMAuth2Exists = await fs.exists(SWMAuth2Path);
    // console.log(SWMAuth2Path);
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.logo}
        initial={{
          top: "50%",
        }}
        animate={{
          top: "45%",
        }}
        transition={{
          duration: 0.25,
          delay: 2,
        }}
        onAnimationComplete={init}
      >
        <Image
          src="/logo.svg"
          // width={150}
          // height={150}
          fill
          alt="Picture of the author"
        />
      </motion.div>

      <motion.div
        className={styles.status}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.25,
          delay: 2,
        }}
      >
        <LoaderIcon size={28} />
      </motion.div>
    </div>
  );
}
