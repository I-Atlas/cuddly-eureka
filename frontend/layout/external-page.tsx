import type { PropsWithChildren } from "react";

import { motion } from "framer-motion";
import Meta from "layout/meta";

interface ExternalPageLayoutProps {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
}

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

export default function ExternalPageLayout({
  children,
  title,
  description,
  keywords,
  image,
}: PropsWithChildren<ExternalPageLayoutProps>) {
  return (
    <>
      <Meta
        title={title}
        description={description}
        keywords={keywords}
        image={image}
      />
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
