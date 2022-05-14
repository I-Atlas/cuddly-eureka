import type { PropsWithChildren } from "react";

import { motion } from "framer-motion";
import Navigation from "components/navigation/navigation";

interface InnerPageLayoutProps {
}

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

export default function InnerPageLayout({
  children,
}: PropsWithChildren<InnerPageLayoutProps>) {
  return (
    <>
      <Navigation />
      <motion.main
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ type: "linear" }}
      >
        {children}
      </motion.main>
    </>
  );
}
