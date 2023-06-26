// Packages

// import { appWindow } from "@/lib/window";

import clsx from "clsx";

// Components

import Image from "next/image";

// Styles

import frameStyles from "@/components/styles/frame.module.scss";

export default function Component() {
  return (
    <>
      <div
        data-tauri-drag-region
        className={clsx(frameStyles.bar, frameStyles.topbar)}
      >
        <div>
          <Image
            src="logo.svg"
            alt="Script-Ware Logo"
            width={35}
            height={35}
            className={frameStyles.logo}
          />
        </div>
        <div
          style={{
            color: "#e2e2e2",
            fontSize: "14px",
          }}
        >
          Script-Ware M
        </div>
        <div>
          <Image
            src="settings.svg"
            alt="Files"
            width={24}
            height={24}
            className={frameStyles.topbar_item}
          />
        </div>
      </div>

      <div data-tauri-drag-region className={frameStyles.leftbar_container}>
        <div
          data-tauri-drag-region
          className={clsx(frameStyles.bar, frameStyles.leftbar)}
        >
          <div>
            <Image
              src="project.svg"
              alt="Files"
              width={24}
              height={24}
              className={clsx(
                frameStyles.leftbar_item,
                frameStyles.leftbar_item_top
              )}
            />
          </div>
          <div>
            <Image
              src="terminal.svg"
              alt="Files"
              width={24}
              height={24}
              className={clsx(
                frameStyles.leftbar_item,
                frameStyles.leftbar_item_bottom
              )}
            />
          </div>
        </div>
      </div>

      <div
        data-tauri-drag-region
        className={clsx(frameStyles.bar, frameStyles.bottombar)}
      >
        <div></div>
        <div>
          <div
            style={{
              color: "#e2e2e2",
              fontSize: "12px",
              marginRight: "10px",
            }}
          >
            Not Injected
          </div>
        </div>
      </div>

      {/*<div data-tauri-drag-region className={frameStyles.rightbar_container}>*/}
      {/*  <div*/}
      {/*    data-tauri-drag-region*/}
      {/*    className={clsx(frameStyles.bar, frameStyles.rightbar)}*/}
      {/*  ></div>*/}
      {/*</div>*/}
    </>
  );
}
