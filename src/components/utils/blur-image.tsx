"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function BlurImage({
  src,
  alt,
  className,
  blurClassName,
  imageClassName,
  style,
}: {
  src: string;
  alt: string;
  className?: string;
  blurClassName?: string;
  imageClassName?: string;
  style?: React.CSSProperties;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  motion;
  return (
    <div
      style={style}
      className={twMerge(
        "relative mx-auto h-96 w-full overflow-hidden rounded border border-zinc-950/10 dark:border-zinc-50/10",
        className,
      )}
    >
      <Image
        src={src + "?blur=yes"}
        alt={alt + "(blur placeholder)"}
        priority
        width={0}
        height={0}
        sizes="100vw"
        style={{ position: "absolute", width: "100%", height: "auto" }}
        unoptimized
        fetchPriority="high"
        className={twMerge(
          "object-cover transition-opacity duration-300",
          isLoaded ? "opacity-0" : "opacity-100",
          blurClassName,
        )}
      />
      <Image
        src={src}
        alt={alt}
        priority
        width={0}
        height={0}
        sizes="100vw"
        style={{ position: "absolute", width: "100%", height: "auto" }}
        fetchPriority="low"
        unoptimized
        className={twMerge(
          "object-cover transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          imageClassName,
        )}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}
