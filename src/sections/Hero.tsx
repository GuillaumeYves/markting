import { m, useReducedMotion } from "framer-motion";
import { useId } from "react";
import { HeroField } from "@/components/brand/HeroField";
import { TextReveal } from "@/components/ui/TextReveal";
import { site } from "@/data/site";
import { MOTION_DURATION, MOTION_EASE } from "@/lib/motion";

/**
 * A quieter series behind the headline: the same climb as the curve, with the
 * noise a real one carries. Values are fractions of the band's height, so the
 * shape stretches to whatever room is left above the copy.
 */
const GHOST_SERIES = [
  0.14, 0.26, 0.21, 0.33, 0.29, 0.42, 0.36, 0.34, 0.45, 0.52, 0.44, 0.57, 0.61, 0.53, 0.66, 0.6,
  0.72, 0.68, 0.79, 0.7, 0.83, 0.77, 0.88, 0.8, 0.86, 0.93, 0.85, 0.95, 0.9, 0.98, 0.92, 1, 0.94,
  0.97, 0.99, 0.93, 1,
];

/** Column geometry inside the band's own 1200x200 space. */
const GHOST_STEP = 1200 / GHOST_SERIES.length;
const GHOST_BAR = GHOST_STEP * 0.56;

const SIGNALS = [
  { id: "clients", value: "18 marques", detail: "Accompagnées" },
  { id: "team", value: "9 personnes", detail: "Une seule équipe" },
  { id: "since", value: `Depuis ${site.foundedIn}`, detail: site.reach },
];

export function Hero() {
  const reducedMotion = useReducedMotion();
  const ghostFillId = useId();
  const ghostMaskId = useId();
  const ghostMaskWrapId = useId();

  const rise = (delay: number) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: MOTION_DURATION.section, delay, ease: MOTION_EASE },
        };

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-14 pt-28 lg:pb-16 lg:pt-32"
    >
      <HeroField />

      {/* Whatever room is left above the copy, which on a large display is most
          of the section. A second, noisier series fills it as columns: the same
          climb the curve makes, drawn faint and stretched to the band. The band
          is a flex child rather than an overlay, so it measures the free space
          itself and the graph flattens away when there is none. */}
      <div aria-hidden="true" className="relative min-h-0 flex-1 overflow-hidden">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            {/* Per column, so every bar top reads at the same weight while the
                bottoms dissolve before they reach the headline. */}
            <linearGradient id={ghostFillId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#3b5bff" stopOpacity="0.19" />
              <stop offset="1" stopColor="#3b5bff" stopOpacity="0" />
            </linearGradient>
            {/* The columns fade in off the left edge and out well before the
                curve, so the two never read as one chart. */}
            <linearGradient id={ghostMaskId} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#fff" stopOpacity="0" />
              <stop offset="0.1" stopColor="#fff" stopOpacity="1" />
              <stop offset="0.44" stopColor="#fff" stopOpacity="1" />
              <stop offset="0.78" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <mask id={ghostMaskWrapId}>
              <rect width="1200" height="200" fill={`url(#${ghostMaskId})`} />
            </mask>
          </defs>

          <g mask={`url(#${ghostMaskWrapId})`}>
            {GHOST_SERIES.map((value, index) => (
              <rect
                key={index}
                x={index * GHOST_STEP + (GHOST_STEP - GHOST_BAR) / 2}
                y={200 - value * 190}
                width={GHOST_BAR}
                height={value * 190}
                fill={`url(#${ghostFillId})`}
              />
            ))}
          </g>
        </svg>
      </div>

      {/* The ground the curve rises from. It tracks the bottom padding above so
          it stays level with the last line of copy, and it spans the full width
          rather than the drawing's, which stops widening on a large display. */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-14 h-px bg-hair lg:bottom-16" />

      <div className="shell relative">
        <TextReveal
          as="h1"
          id="hero-title"
          className="display"
          delay={0.1}
          stagger={0.07}
          segments={[{ text: "Le marketing" }, { text: "moderne.", italic: true, newLine: true }]}
        />

        <div className="mt-10 grid gap-10 border-t border-hair pt-10 lg:mt-12 lg:grid-cols-12 lg:gap-x-10">
          <m.p {...rise(0.45)} className="lead max-w-copy text-chalk-dim lg:col-span-6">
            {site.name} réunit stratégie, image et acquisition sous une même direction. Une marque
            claire, des campagnes qui servent à quelque chose, une croissance que vous pouvez
            mesurer.
          </m.p>

          <m.dl {...rise(0.55)} className="grid gap-6 sm:grid-cols-3 lg:col-span-4 lg:col-start-9">
            {SIGNALS.map((signal) => (
              <div key={signal.id} className="border-t border-hair pt-4">
                <dt className="text-base tracking-tighter text-chalk">{signal.value}</dt>
                <dd className="mt-1 text-sm text-chalk-faint">{signal.detail}</dd>
              </div>
            ))}
          </m.dl>
        </div>
      </div>
    </section>
  );
}
