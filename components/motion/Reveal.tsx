"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  /** Use for elements that should scale slightly in too (cards, images). */
  scale?: number;
};

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, delay = 0, y = 28, className, scale }: Props) {
  const variants: Variants = {
    hidden: { opacity: 0, y, ...(scale ? { scale } : {}) },
    visible: {
      opacity: 1,
      y: 0,
      ...(scale ? { scale: 1 } : {}),
      transition: { duration: 0.6, delay, ease: EASE },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Wraps a list of children, revealing each one with an incremental delay.
 * Pass a render function so each item gets its own Reveal + index-based delay.
 */
export function RevealGroup<T>({
  items,
  render,
  className,
  itemClassName,
  step = 0.08,
  y,
  scale,
}: {
  items: T[];
  render: (item: T, index: number) => ReactNode;
  className?: string;
  itemClassName?: string;
  step?: number;
  y?: number;
  scale?: number;
}) {
  return (
    <div className={className}>
      {items.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Reveal key={index} delay={index * step} y={y} scale={scale} className={itemClassName}>
          {render(item, index)}
        </Reveal>
      ))}
    </div>
  );
}
