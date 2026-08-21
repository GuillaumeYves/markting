import { Mail } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";

/**
 * The one light section on the page. After seven dark blocks the inversion is
 * what makes the call to action impossible to scroll past. The headline lands
 * in two beats: the visitor's side first, ours second.
 */
export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="scroll-mt-24 bg-chalk text-void"
    >
      <div className="shell py-24 text-center lg:py-32">
        <h2 id="contact-title" className="display mx-auto max-w-4xl">
          <TextReveal
            as="span"
            className="block"
            stagger={0.06}
            segments={[{ text: "Votre projet." }]}
          />
          <TextReveal
            as="span"
            className="block"
            delay={0.75}
            stagger={0.06}
            segments={[{ text: "Notre expertise.", italic: true }]}
          />
        </h2>

        <Reveal delay={0.2}>
          <p className="lead mx-auto mt-10 max-w-prose text-void/70">
            Trente minutes suffisent pour savoir si nous sommes le bon partenaire. Vous repartez
            avec un avis clair, même si la réponse est non.
          </p>
        </Reveal>

        <Reveal delay={0.28}>
          <div className="mt-12">
            <button
              type="button"
              aria-disabled="true"
              className="group inline-flex min-h-[3rem] items-center gap-3 rounded-full bg-void px-8 py-4 text-[0.9375rem] font-medium leading-none text-chalk transition-colors duration-300 ease-brand hover:bg-signal hover:text-white"
            >
              <span>Nous contacter</span>
              <Mail
                aria-hidden="true"
                strokeWidth={1.75}
                className="size-4 transition-transform duration-300 ease-brand group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
              />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
