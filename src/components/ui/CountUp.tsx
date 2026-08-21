import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { formatFigure } from "@/lib/format";
import { MOTION_EASE } from "@/lib/motion";

type CountUpProps = {
  value: number;
  precision?: number;
  delay?: number;
  className?: string;
};

/**
 * Counts up once, when the figure enters the viewport. The digits are written
 * straight to the DOM node: a metric band re-rendering sixty times a second
 * would be the most expensive thing on the page for no visible gain.
 */
export function CountUp({ value, precision = 0, delay = 0, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;

    if (reducedMotion) {
      node.textContent = formatFigure(value, precision);
      return;
    }

    const controls = animate(0, value, {
      duration: 1.5,
      delay,
      ease: MOTION_EASE,
      onUpdate: (latest) => {
        node.textContent = formatFigure(latest, precision);
      },
    });
    return () => controls.stop();
  }, [delay, inView, precision, reducedMotion, value]);

  return (
    <span ref={ref} className={className}>
      {formatFigure(0, precision)}
    </span>
  );
}
