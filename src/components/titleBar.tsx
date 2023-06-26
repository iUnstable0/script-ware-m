// Packages

// import { appWindow } from "@/lib/window";

// Styles

import titleBarStyles from "@/components/styles/titleBar.module.scss";
import Image from "next/image";

export default function Component() {
  return (
    <>
      {/*<div data-tauri-drag-region className={titleBarStyles.container} />*/}
      <div data-tauri-drag-region className={titleBarStyles.topbar}>
        <Image
          src="logo.svg"
          alt="Script-Ware Logo"
          width={35}
          height={35}
          className={titleBarStyles.logo}
        />

        {/*<div*/}
        {/*  onClick={async () => {*/}
        {/*    void (await appWindow()).minimize();*/}
        {/*  }}*/}
        {/*>*/}
        {/*  Minimize*/}
        {/*</div>*/}
      </div>

      <div data-tauri-drag-region className={titleBarStyles.leftbar_container}>
        <div data-tauri-drag-region className={titleBarStyles.leftbar}></div>
      </div>

      <div data-tauri-drag-region className={titleBarStyles.bottombar}></div>

      <div data-tauri-drag-region className={titleBarStyles.rightbar_container}>
        <div data-tauri-drag-region className={titleBarStyles.rightbar}></div>
      </div>
    </>
  );
}
