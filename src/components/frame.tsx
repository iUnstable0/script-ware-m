// Packages

// import { appWindow } from "@/lib/window";

import clsx from "clsx";

// Components

import Image from "next/image";

// Styles

import frameStyles from "@/components/styles/frame.module.scss";

// Fonts

import { Mulish } from "next/font/google";

const mulish = Mulish({ subsets: ["latin"] });

export default function Component() {
  return (
    <>
      <div
        data-tauri-drag-region
        className={clsx(frameStyles.bar, frameStyles.topbar)}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginLeft: "10px",
            marginBottom: "6px",
          }}
        >
          {/*<Image*/}
          {/*  src="logo.svg"*/}
          {/*  alt="Script-Ware Logo"*/}
          {/*  width={35}*/}
          {/*  height={35}*/}
          {/*  className={frameStyles.logo}*/}
          {/*/>*/}
          <p
            className={mulish.className}
            style={{
              color: "#e2e2e2",
              fontSize: "16px",
              fontWeight: 700,
              fontStyle: "italic",
            }}
          >
            Script
          </p>
          <p
            className={mulish.className}
            style={{
              color: "#2b72e0",
              fontSize: "16px",
              fontWeight: 700,
              fontStyle: "italic",
            }}
          >
            -
          </p>
          <p
            className={mulish.className}
            style={{
              color: "#e2e2e2",
              fontSize: "16px",
              fontWeight: 700,
              fontStyle: "italic",
              marginLeft: "-2px",
            }}
          >
            Ware
          </p>
        </div>
        <div></div>
        <div>
          <Image
            src="assets/frame/notifications.svg"
            alt="Files"
            width={24}
            height={24}
            className={frameStyles.topbar_item}
            // style={{
            //   marginRight: "6px",
            // }}
          />
          <Image
            src="assets/frame/settings.svg"
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
          <div
            style={{
              paddingLeft: "2px",
              // marginLeft: "2px",
            }}
          >
            <Image
              src="assets/frame/home.svg"
              alt="Home"
              width={24}
              height={24}
              className={clsx(
                frameStyles.leftbar_item,
                frameStyles.leftbar_item_top
              )}
            />
            <Image
              src="assets/frame/folder.svg"
              alt="Files"
              width={24}
              height={24}
              className={clsx(
                frameStyles.leftbar_item,
                frameStyles.leftbar_item_top
              )}
            />
            <Image
              src="assets/frame/library.svg"
              alt="Script Library"
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
              src="assets/frame/terminal.svg"
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
