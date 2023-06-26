"use client";

// Packages

import { useState } from "react";

import { Command, open } from "@tauri-apps/api/shell";
import { invoke } from "@tauri-apps/api/tauri";
// import { exit } from "@tauri-apps/api/process";
// import { appWindow } from "@tauri-apps/api/window";
import { fetch } from "@tauri-apps/api/http";

import * as fs from "@tauri-apps/api/fs";

import { resolveResource, resourceDir } from "@/lib/path";

import lib_config from "@/lib/config";

// Components

import { motion, AnimatePresence } from "framer-motion";

import Image from "next/image";

import { LoaderIcon } from "@/components/loader";

// Styles

import styles from "@/styles/bootstrapper.module.scss";

export default function Page() {
  const [debug, setDebug] = useState<string>("");

  const [loaded, setLoaded] = useState<boolean>(false),
    [ran, setRan] = useState<boolean>(false);

  const download = async (url: string, path: string) => {
    console.log(` - Downloading file from ${url} to ${path}`);

    await invoke("download", {
      url: url,
      path: path,
    });

    console.log(` - Downloaded file from ${url} to ${path}`);
  };

  const init = () => {
    return new Promise(async (resolve, reject) => {
      try {
        // -------------------- libScriptWare.dylib -------------------- //

        console.log("Checking for libScriptWare.dylib");

        const libScriptWareDylibPath = await resolveResource(
          "libScriptWare.dylib"
        );

        console.log(` - libScriptWare.dylib path: ${libScriptWareDylibPath}`);

        // const libScriptWareDylibExists = await fs.exists(
        //   libScriptWareDylibPath
        // );
        //
        // console.log(
        //   ` - libScriptWare.dylib exists: ${libScriptWareDylibExists}`
        // );

        // if (!libScriptWareDylibExists) {
        await download(
          lib_config.api.libScriptWare_dylib,
          libScriptWareDylibPath
        );

        console.log(` - Running \`chmod 777 ${libScriptWareDylibPath}\``);

        await (
          await new Command("chmod", ["777", libScriptWareDylibPath])
        ).spawn();
        // }

        // -------------------- lib2proc -------------------- //

        console.log("Checking for lib2proc");

        const lib2procPath = await resolveResource("lib2proc");

        console.log(` - lib2proc path: ${lib2procPath}`);

        const lib2procExists = await fs.exists(lib2procPath);

        console.log(` - lib2proc exists: ${lib2procExists}`);

        if (!lib2procExists) {
          await download(lib_config.api.lib2proc, lib2procPath);

          console.log(` - Running \`chmod 777 ${lib2procPath}\``);

          await (await new Command("chmod", ["777", lib2procPath])).spawn();
        }

        // -------------------- lib2proc.dylib -------------------- //

        console.log("Checking for lib2proc.dylib");

        const lib2procDylibPath = await resolveResource("lib2proc.dylib");

        console.log(` - lib2proc.dylib path: ${lib2procDylibPath}`);

        const lib2procDylibExists = await fs.exists(lib2procDylibPath);

        console.log(` - lib2proc.dylib exists: ${lib2procDylibExists}`);

        if (!lib2procDylibExists) {
          await download(lib_config.api.lib2proc_dylib, lib2procDylibPath);

          console.log(` - Running \`chmod 777 ${lib2procDylibPath}\``);

          await (
            await new Command("chmod", ["777", lib2procDylibPath])
          ).spawn();
        }

        // -------------------- libchilkat_x86_64.dylib -------------------- //

        console.log("Checking for libchilkat_x86_64.dylib");

        const libChilkatExists = await fs.exists(
          "/usr/local/lib/libchilkat_x86_64.dylib"
        );

        console.log(` - libchilkat_x86_64.dylib exists: ${libChilkatExists}`);

        let latestLibChilkat;
        let currentLibChilkatSize;

        if (libChilkatExists) {
          console.log(` - Fetching latest libchilkat_x86_64.dylib size`);

          latestLibChilkat = await fetch(lib_config.api.libChilkat_dylib, {
            method: "HEAD",
          });

          console.log(` - Getting current libchilkat_x86_64.dylib size`);

          currentLibChilkatSize = await invoke("get_file_size", {
            path: "/usr/local/lib/libchilkat_x86_64.dylib",
          });

          console.log(
            ` - Latest libchilkat_x86_64.dylib size: ${latestLibChilkat?.headers["content-length"]}`
          );
          console.log(
            ` - Current libchilkat_x86_64.dylib size: ${currentLibChilkatSize}`
          );
        }

        if (
          !libChilkatExists ||
          (latestLibChilkat?.status == 200 &&
            latestLibChilkat?.headers["content-length"] !=
              currentLibChilkatSize)
        ) {
          console.log(` - libchilkat_x86_64.dylib needs to be downloaded`);

          const dirWritable = await invoke("is_writable", {
            path: "/usr/local/lib",
          });

          console.log(` - /usr/local/lib writable: ${dirWritable}`);

          if (!dirWritable) {
            const random = Math.random().toString(36).substring(7);

            console.log(` - Random: ${random}`);

            await fs.writeTextFile(
              `/tmp/${random}.command`,
              `#!/bin/bash
              clear
              
              printf "To finish your \\\\e[1;37m\\\\e[3mScript\\\\e[1;34m-\\\\e[0m\\\\e[3m\\\\e[1;37mWare\\\\e[0m installation process, please enter your macOS password. (You will not be able to see your password being entered, it is hidden for security!)\\n"
              printf "\\\\e[1;33m\\\\e[5mNote: that this needs to be done as an administrator account.\\\\e[0m\\n"
              
              if [ ! -d /usr/local/lib ]; then
                sudo mkdir -p /usr/local/lib
                sudo chmod 777 /usr/local/lib
              fi
              
              printf "Thank you! You can now inject with \\\\e[1;37m\\\\e[3mScript\\\\e[1;34m-\\\\e[0m\\\\e[3m\\\\e[1;37mWare\\\\e[0m. \\nIf you're still having issues (or see this installer again) Please contact support.\\n"
              rm -rf /tmp/${random}.command
              `
            );

            console.log(` - Running \`chmod 777 /tmp/${random}.command\``);

            await (
              await new Command("chmod", ["777", `/tmp/${random}.command`])
            ).spawn();

            console.log(` - Running \`/tmp/${random}.command\``);

            await (
              await new Command("open", [`/tmp/${random}.command`])
            ).spawn();

            let writable = false;

            while (!writable) {
              await new Promise((resolve) => setTimeout(resolve, 1000));

              writable = await invoke("is_writable", {
                path: "/usr/local/lib",
              });
            }
          }

          await download(
            lib_config.api.libChilkat_dylib,
            "/usr/local/lib/libchilkat_x86_64.dylib"
          );

          console.log(
            ` - Running \`chmod 777 /usr/local/lib/libchilkat_x86_64.dylib\``
          );

          await (
            await new Command("chmod", [
              "777",
              "/usr/local/lib/libchilkat_x86_64.dylib",
            ])
          ).spawn();
        }

        // ------------------------------------------------------------------------ //

        console.log("Checking version");

        const latestVersion = (await (
          await fetch(lib_config.api.version)
        ).data) as any;

        console.log(` - Latest version: ${latestVersion.ui_version}`);

        const originalSWVersionPath = await resolveResource(
          "ORIGINAL_SW_VERSION.txt"
        );

        console.log(
          ` - ORIGINAL_SW_VERSION.txt path: ${originalSWVersionPath}`
        );

        const originalSWVersionExists = await fs.exists(originalSWVersionPath);

        console.log(
          ` - ORIGINAL_SW_VERSION.txt exists: ${originalSWVersionExists}`
        );

        let currentVersion;

        if (originalSWVersionExists) {
          currentVersion = (
            await fs.readTextFile(originalSWVersionPath)
          ).trim();
        }

        console.log(`Current version: ${currentVersion}`);

        const SWMAuth2Path = await resolveResource("SWMAuth2");

        console.log(` - SWMAuth2 path: ${SWMAuth2Path}`);

        const SWMAuth2Exists = await fs.exists(SWMAuth2Path);

        console.log(` - SWMAuth2 exists: ${SWMAuth2Exists}`);

        const unsignPath = await resolveResource("unsign");

        console.log(` - unsign path: ${unsignPath}`);

        const unsignExists = await fs.exists(unsignPath);

        console.log(` - unsign exists: ${unsignExists}`);

        if (
          currentVersion != latestVersion.ui_version ||
          !SWMAuth2Exists ||
          !unsignExists
        ) {
          console.log("Downloading latest version");

          const updateAsarPath = await resolveResource("update.asar");

          console.log(` - update.asar path: ${updateAsarPath}`);

          await download(
            `${lib_config.api.asar[0]}${latestVersion.ui_version}${lib_config.api.asar[1]}`,
            updateAsarPath
          );

          console.log(" - Extracting binaries");

          await invoke("extract_dir_from_asar", {
            asarPath: updateAsarPath,
            dirPath: "build",
            outputPath: await resourceDir(),
          });

          if (currentVersion != latestVersion.ui_version) {
            console.log(" - Writing ORIGINAL_SW_VERSION.txt");

            await fs.writeTextFile(
              originalSWVersionPath,
              latestVersion.ui_version
            );
          }

          console.log(` - Cleaning up`);

          await fs.removeFile(updateAsarPath);
        }

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.logo}
        initial={{
          top: "50%",
        }}
        animate={{
          top: loaded ? "50%" : "45%",
        }}
        transition={{
          duration: 0.25,
          delay: 2,
        }}
        onAnimationComplete={() => {
          if (ran) return;

          setRan(true);

          init()
            .then(() => {
              // setLoaded(true);
              setTimeout(() => void invoke("close_bootstrapper"), 1000);
            })
            .catch(async (error) => {
              console.error(error);
              // await exit(1);
            });
        }}
      >
        <Image
          src="/logo.svg"
          // width={150}
          // height={150}
          fill
          alt="Script-Ware logo"
        />
      </motion.div>

      <AnimatePresence>
        {!loaded && (
          <motion.div
            className={styles.status}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
              delay: 2,
            }}
          >
            <LoaderIcon size={28} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
