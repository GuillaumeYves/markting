import { m, useReducedMotion } from "framer-motion";
import { HeroField } from "@/components/brand/HeroField";
import { TextReveal } from "@/components/ui/TextReveal";
import { site } from "@/data/site";
import { MOTION_DURATION, MOTION_EASE } from "@/lib/motion";

const SIGNALS = [
  { id: "clients", value: "18 marques", detail: "Accompagnées" },
  { id: "team", value: "9 personnes", detail: "Une seule équipe" },
  { id: "since", value: `Depuis ${site.foundedIn}`, detail: site.reach },
];

export function Hero() {
  const reducedMotion = useReducedMotion();

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
