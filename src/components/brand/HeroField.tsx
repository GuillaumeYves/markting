import { m, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useId } from "react";
import { MOTION_EASE } from "@/lib/motion";

/** Growth curve, drawn as two cubics so the rise accelerates towards the end. */
const CURVE = "M 40 690 C 300 664, 470 632, 640 556 C 810 480, 950 380, 1116 232";
const CURVE_AREA = `${CURVE} L 1116 760 L 40 760 Z`;
/** Points computed on the curve itself, so the markers sit exactly on the line. */
const MARKERS = [
  { x: 374, y: 642 },
  { x: 640, y: 556 },
  { x: 880, y: 421 },
];
/** Tangent at the end of the curve, in degrees. */
const ARROW_ANGLE = -42;

const GLOW_SPRING = { stiffness: 38, damping: 22, mass: 1.1 };
const GLOW_SIZE = 720;

/**
 * The hero backdrop: a ruled grid, a rising curve that ends on an arrow, and a
 * soft light trailing the cursor. Everything is drawn rather than loaded, so it
 * weighs nothing and stays sharp on any display. Only the glow's transform
 * changes per frame, which keeps the whole thing on the compositor.
 */
export function HeroField() {
  const reducedMotion = useReducedMotion();
  const gradientId = useId();
  const areaId = useId();
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const glowX = useSpring(targetX, GLOW_SPRING);
  const glowY = useSpring(targetY, GLOW_SPRING);

  useEffect(() => {
    // Resting position: off to the right, roughly under the rising curve.
    targetX.jump(window.innerWidth * 0.74);
    targetY.jump(window.innerHeight * 0.38);
    glowX.jump(window.innerWidth * 0.74);
    glowY.jump(window.innerHeight * 0.38);

    if (reducedMotion || !window.matchMedia("(pointer: fine)").matches) return;

    const onPointerMove = (event: PointerEvent) => {
      targetX.set(event.clientX);
      targetY.set(event.clientY);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [glowX, glowY, reducedMotion, targetX, targetY]);

  const draw = (delay: number) => ({
    initial: reducedMotion ? false : { pathLength: 0 },
    animate: reducedMotion ? undefined : { pathLength: 1 },
    transition: { duration: 2, delay, ease: MOTION_EASE },
  });

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, #26262b 1px, transparent 1px), linear-gradient(to bottom, #26262b 1px, transparent 1px)",
          backgroundSize: "clamp(64px, 8vw, 116px) clamp(64px, 8vw, 116px)",
          maskImage: "radial-gradient(125% 95% at 45% 5%, #000 22%, transparent 76%)",
          WebkitMaskImage: "radial-gradient(125% 95% at 45% 5%, #000 22%, transparent 76%)",
        }}
      />

      <m.div
        style={{ x: glowX, y: glowY, width: GLOW_SIZE, height: GLOW_SIZE }}
        className="absolute left-0 top-0 -ml-[360px] -mt-[360px] rounded-full bg-signal/[0.16] blur-[120px] will-change-transform"
      />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 760"
        fill="none"
        preserveAspectRatio="xMaxYMid slice"
      >
        <defs>
          {/* The curve fades out on the left so it never fights the headline. */}
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#3b5bff" stopOpacity="0" />
            <stop offset="0.46" stopColor="#3b5bff" stopOpacity="0.18" />
            <stop offset="1" stopColor="#3b5bff" stopOpacity="0.72" />
          </linearGradient>
          <linearGradient id={areaId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3b5bff" stopOpacity="0.1" />
            <stop offset="1" stopColor="#3b5bff" stopOpacity="0" />
          </linearGradient>
        </defs>

        <line x1="0" y1="700" x2="1200" y2="700" stroke="#26262b" strokeWidth="1" />

        <m.path
          d={CURVE_AREA}
          fill={`url(#${areaId})`}
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={reducedMotion ? undefined : { opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.1, ease: MOTION_EASE }}
        />

        <m.path
          d={CURVE}
          stroke={`url(#${gradientId})`}
          strokeWidth="2"
          strokeLinecap="round"
          {...draw(0.35)}
        />

        {MARKERS.map((marker, index) => (
          <m.rect
            key={marker.x}
            x={marker.x - 5}
            y={marker.y - 5}
            width="10"
            height="10"
            fill="#08080a"
            stroke="#3b5bff"
            strokeWidth="2"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.4 }}
            animate={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 1 + index * 0.16, ease: MOTION_EASE }}
            style={{ transformOrigin: `${marker.x}px ${marker.y}px` }}
          />
        ))}

        <m.g
          transform={`translate(1116 232) rotate(${ARROW_ANGLE})`}
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={reducedMotion ? undefined : { opacity: 1 }}
          transition={{ duration: 0.35, delay: 1.9, ease: MOTION_EASE }}
        >
          <path d="M 6 0 L -26 -15 L -18 0 L -26 15 Z" fill="#3b5bff" fillOpacity="0.72" />
        </m.g>
      </svg>

      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-void" />
    </div>
  );
}
