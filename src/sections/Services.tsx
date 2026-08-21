import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";
import { MOTION_DURATION, MOTION_EASE } from "@/lib/motion";

export function Services() {
  const [hovered, setHovered] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();
  const hoveredService = services.find((service) => service.id === hovered);

  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-24">
      <div className="shell py-24 lg:py-36">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-4">
            <SectionHeading
              headingId="services-title"
              segments={[
                { text: "Six disciplines," },
                { text: "une seule direction.", italic: true, newLine: true },
              ]}
              intro="Nous ne vendons pas des prestations séparées. Chaque volet renforce les autres, sinon il ne sert à rien."
            />
          </div>

          <div className="relative lg:col-span-7 lg:col-start-6">
            {/* The hovered discipline echoes behind the list, barely visible. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 hidden items-center justify-center overflow-hidden lg:flex"
            >
              <AnimatePresence mode="wait">
                {hoveredService && !reducedMotion ? (
                  <m.span
                    key={hoveredService.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: MOTION_DURATION.standard, ease: MOTION_EASE }}
                    className="whitespace-nowrap text-[9rem] font-medium tracking-tightest text-chalk/[0.045]"
                  >
                    {hoveredService.title}
                  </m.span>
                ) : null}
              </AnimatePresence>
            </div>

            <ul className="relative">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Reveal as="li" key={service.id} delay={index * 0.04}>
                    <div
                      onMouseEnter={() => setHovered(service.id)}
                      onMouseLeave={() => setHovered(null)}
                      className="group relative border-t border-hair py-8 transition-colors duration-500 ease-brand last:border-b hover:bg-surface/60"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-signal transition-transform duration-700 ease-brand group-hover:scale-x-100 motion-reduce:transition-none"
                      />
                      <div className="flex items-start gap-5 transition-transform duration-500 ease-brand group-hover:translate-x-2 motion-reduce:transform-none sm:gap-7">
                        <Icon
                          aria-hidden="true"
                          strokeWidth={1.4}
                          className="mt-1.5 size-6 shrink-0 text-chalk-faint transition-colors duration-300 group-hover:text-signal-soft"
                        />
                        <div className="min-w-0 flex-1">
                          <h3 className="subhead">{service.title}</h3>
                          <p className="mt-3 max-w-prose leading-relaxed text-chalk-dim">
                            {service.description}
                          </p>
                          <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                            {service.deliverables.map((deliverable) => (
                              <li key={deliverable} className="label">
                                {deliverable}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
