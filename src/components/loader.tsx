// Styles

import loaderStyles from "@/components/styles/loader.module.scss";

export function LoaderIcon({ size }: { size: number }) {
  return (
    <div
      className={loaderStyles.icon}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
}
