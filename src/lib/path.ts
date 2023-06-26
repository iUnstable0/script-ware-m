const isNode = (): boolean =>
  Object.prototype.toString.call(
    typeof process !== "undefined" ? process : 0
  ) === "[object process]";

export async function resolveResource(resourcePath: string): Promise<string> {
  if (isNode()) {
    // This shouldn't ever happen when React fully loads
    return Promise.resolve("");
  }

  return await (
    await import("@tauri-apps/api/path")
  ).resolveResource(resourcePath);
}

export async function resourceDir(): Promise<string> {
  if (isNode()) {
    // This shouldn't ever happen when React fully loads
    return Promise.resolve("");
  }

  return await (await import("@tauri-apps/api/path")).resourceDir();
}

export async function join(...paths: string[]): Promise<string> {
  if (isNode()) {
    // This shouldn't ever happen when React fully loads
    return Promise.resolve("");
  }

  return await (await import("@tauri-apps/api/path")).join(...paths);
}
