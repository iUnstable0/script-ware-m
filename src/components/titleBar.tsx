// Packages

import { appWindow } from "@tauri-apps/api/window";

// Styles

import titleBarStyles from "@/components/styles/titleBar.module.scss";

export default function Component() {
  return (
    <div
      className={titleBarStyles.container}
      // onMouseDown={async (event) => {
      //   const target = event.target as HTMLElement;
      //
      //   if (target instanceof Element) {
      //     if (target.closest("input, a, button")) return; // a non-draggable element either in target or its ancestors
      //
      //     await appWindow.startDragging();
      //   }
      // }}
    />
  );
}
