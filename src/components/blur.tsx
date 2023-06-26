// Packages

import { usePathname } from "next/navigation";

import { motion, AnimatePresence } from "framer-motion";

// Styles

import blurStyles from "@/components/styles/blur.module.scss";

export default function Component({
  modals,
  visible,
  preventClose,
  zIndex,
}: {
  modals: any;
  visible: boolean;
  preventClose?: boolean;
  zIndex?: number;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={`blur_${pathname}`}
          className={blurStyles.blur}
          style={{
            zIndex: zIndex || 2,
          }}
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
            duration: 0.15,
          }}
          onClick={() => {
            if (preventClose) return;

            modals.forEach((set: any) => set(false));
          }}
        />
      )}
    </AnimatePresence>
  );
}
