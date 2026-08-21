import { m, useReducedMotion } from "framer-motion";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { metrics } from "@/data/metrics";
import { formatFigure } from "@/lib/format";
import { MOTION_EASE, revealViewport } from "@/lib/motion";

export function Metrics() {
  const reducedMotion = useReducedMotion();

  return (
    <section aria-labelledby="metrics-title" className="border-t border-hair bg-void">
      <div className="shell py-16 lg:py-24">
        <h2 id="metrics-title" className="sr-only">
          Résultats en chiffres
        </h2>
        <dl className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => {
            const figure = `${metric.prefix ?? ""}${formatFigure(metric.value, metric.precision ?? 0)}${metric.suffix ?? ""}`;
            const delay = index * 0.12;
            return (
              <Reveal key={metric.id} delay={delay}>
                <dt className="sr-only">{metric.label}</dt>
                <dd>
                  <span
                    className="block font-serif text-[clamp(3rem,6vw,4.75rem)] leading-[0.9] tracking-tightest"
                    aria-label={figure}
                  >
                    <span aria-hidden="true">
                      {metric.prefix}
                      <CountUp value={metric.value} precision={metric.precision} delay={delay} />
                      {metric.suffix}
                    </span>
                  </span>

                  {/* The rule sweeps in behind the figure while it counts. */}
                  <m.span
                    aria-hidden="true"
                    className="mt-5 block h-px origin-left bg-signal"
                    initial={reducedMotion ? false : { scaleX: 0 }}
                    whileInView={reducedMotion ? undefined : { scaleX: 1 }}
                    viewport={revealViewport}
                    transition={{ duration: 1.5, delay, ease: MOTION_EASE }}
                  />

                  <span className="mt-5 block max-w-[15rem] text-sm leading-relaxed text-chalk-dim">
                    {metric.label}
                  </span>
                </dd>
              </Reveal>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
