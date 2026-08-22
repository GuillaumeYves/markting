import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { methodSteps } from "@/data/method";

export function Method() {
  return (
    <section
      id="methode"
      aria-labelledby="method-title"
      className="scroll-mt-24 border-t border-hair"
    >
      <div className="shell py-24 lg:py-36">
        <SectionHeading
          headingId="method-title"
          align="center"
          segments={[{ text: "Quatre étapes," }, { text: "rien de plus.", italic: true }]}
          intro="Un cadre court, tenu du premier échange jusqu'à la diffusion. Vous savez toujours où nous en sommes et ce qui vient ensuite."
        />

        <div className="mt-16 lg:mt-24">
          <div aria-hidden="true" className="hidden h-px bg-hair lg:block" />

          <div className="relative">
            {/* Mobile keeps the same rule, turned on its side. */}
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-[0.4375rem] w-px bg-hair lg:hidden"
            />

            <ol className="grid gap-y-14 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-0">
              {methodSteps.map((step, index) => (
                <Reveal
                  as="li"
                  key={step.id}
                  delay={index * 0.07}
                  className="group relative pl-10 lg:pl-0 lg:pr-8 lg:pt-10"
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1.5 size-3.5 rounded-full border border-signal bg-void transition duration-300 ease-brand group-hover:scale-125 group-hover:bg-signal motion-reduce:transition-none motion-reduce:group-hover:scale-100 lg:left-0 lg:top-[-0.4375rem]"
                  />
                  <h3 className="text-2xl tracking-tighter lg:text-3xl">{step.title}</h3>
                  <p className="label mt-3">{step.duration}</p>
                  <p className="mt-5 max-w-copy text-sm leading-relaxed text-chalk-dim">
                    {step.description}
                  </p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
