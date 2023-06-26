const isNode = (): boolean =>
  Object.prototype.toString.call(
    typeof process !== "undefined" ? process : 0
  ) === "[object process]";

export async function resolveResource(resourcePath: string): Promise<string> {
  if (isNode()) {
    // This shouldn't ever happen when React fully loads
    return Promise.resolve("");
  }

  const tauriAppsApiPath = await import("@tauri-apps/api/path");

  const tauriResolveResource = tauriAppsApiPath.resolveResource;

  return await tauriResolveResource(resourcePath);
}

export async function resourceDir(): Promise<string> {
  if (isNode()) {
    // This shouldn't ever happen when React fully loads
    return Promise.resolve("");
  }

  const tauriAppsApiPath = await import("@tauri-apps/api/path");

  const tauriResourceDir = tauriAppsApiPath.resourceDir;

  return await tauriResourceDir();
}

export async function join(...paths: string[]): Promise<string> {
  if (isNode()) {
    // This shouldn't ever happen when React fully loads
    return Promise.resolve("");
  }

  const tauriAppsApiPath = await import("@tauri-apps/api/path");

  const tauriJoin = tauriAppsApiPath.join;

  return await tauriJoin(...paths);
}
