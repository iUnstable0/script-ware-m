import { AppLinksWindows } from "next/dist/lib/metadata/types/extra-types";

const isNode = (): boolean =>
  Object.prototype.toString.call(
    typeof process !== "undefined" ? process : 0
  ) === "[object process]";

export async function appWindow(): Promise<any> {
  if (isNode()) {
    // This shouldn't ever happen when React fully loads
    return Promise.resolve("");
  }

  const tauriWindow = await import("@tauri-apps/api/window");

  const tauriAppWindow = tauriWindow.appWindow;

  return tauriAppWindow;
}
