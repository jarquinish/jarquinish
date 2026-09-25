"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image, { type ImageProps } from "next/image";
import { useRef } from "react";

type Props = Omit<ImageProps, "fill" | "style"> & {
  /** Pixels the image drifts as the container crosses the viewport. */
  strength?: number;
  className?: string;
  imageClassName?: string;
};

/**
 * Full-bleed image with a subtle vertical parallax drift as it scrolls
 * through the viewport. The wrapping element must set its own height
 * (aspect ratio, fixed height, etc.) and `overflow-hidden` — this
 * component only handles the drift + object-cover fill.
 */
export function ParallaxImage({ strength = 50, className, imageClassName, ...imageProps }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
      <motion.div style={{ y }} className="absolute inset-0 -top-[8%] -bottom-[8%]">
        <Image {...imageProps} fill className={`object-cover ${imageClassName ?? ""}`} />
      </motion.div>
    </div>
  );
}
