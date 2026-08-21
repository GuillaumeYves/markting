import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="border-t border-hair">
      <div className="shell py-24 lg:py-32">
        <SectionHeading
          headingId="testimonials-title"
          align="center"
          segments={[
            { text: "Ce que disent les équipes" },
            { text: "avec qui nous travaillons.", italic: true, newLine: true },
          ]}
        />

        <ul className="mt-14 grid lg:mt-20 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal
              as="li"
              key={testimonial.id}
              delay={index * 0.07}
              className="border-t border-hair py-10 lg:border-l lg:border-t-0 lg:px-8 lg:py-0 lg:first:border-l-0 lg:first:pl-0"
            >
              <figure className="flex h-full flex-col justify-between gap-8">
                <blockquote>
                  <p className="font-serif text-[clamp(1.5rem,2.2vw,1.875rem)] leading-snug tracking-tight">
                    « {testimonial.quote} »
                  </p>
                </blockquote>

                <figcaption className="flex items-center gap-4">
                  {/* Portrait slot. It carries the initials until a real photo is
                      dropped in, so the layout never has to change. */}
                  <span
                    aria-hidden="true"
                    className="flex size-12 shrink-0 items-center justify-center border border-hair bg-surface text-sm font-medium tracking-[0.04em] text-chalk-dim"
                  >
                    {testimonial.initials}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium tracking-[-0.012em]">
                      {testimonial.name}
                    </span>
                    <span className="mt-1 block text-sm text-chalk-faint">
                      {testimonial.role}, {testimonial.company}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
