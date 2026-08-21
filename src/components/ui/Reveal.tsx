import { m, useReducedMotion } from "framer-motion";
import type { CSSProperties, PropsWithChildren } from "react";
import { MOTION_DURATION, MOTION_EASE, revealViewport } from "@/lib/motion";

type RevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  /** Distance travelled on the way in, in pixels. */
  distance?: number;
  as?: "div" | "li" | "article" | "figure";
  id?: string;
  style?: CSSProperties;
  "aria-labelledby"?: string;
}>;

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 22,
  as = "div",
  id,
  style,
  "aria-labelledby": ariaLabelledBy,
}: RevealProps) {
  const reducedMotion = useReducedMotion();
  const Component = m[as];

  return (
    <Component
      id={id}
      style={style}
      aria-labelledby={ariaLabelledBy}
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: distance }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={{
        duration: reducedMotion ? 0 : MOTION_DURATION.section,
        delay: reducedMotion ? 0 : delay,
        ease: MOTION_EASE,
      }}
    >
      {children}
    </Component>
  );
}
