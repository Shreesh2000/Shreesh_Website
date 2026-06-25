'use client';

import { motion, type Variants } from 'framer-motion';
import { ReactNode } from 'react';

const reveal: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export function ScrollReveal({
  children,
  className = '',
  staggerChildren = false,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  staggerChildren?: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={staggerChildren ? stagger : reveal}
      transition={delay ? { delayChildren: delay } : undefined}
    >
      {staggerChildren
        ? Array.isArray(children)
          ? children
          : children
        : children}
    </motion.div>
  );
}

export function ScrollItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}

export { reveal, stagger, item };
