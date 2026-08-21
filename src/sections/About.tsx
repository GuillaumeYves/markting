import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextReveal } from "@/components/ui/TextReveal";
import { Wordmark } from "@/components/ui/Wordmark";
import { site } from "@/data/site";

export function About() {
  return (
    <section
      id="a-propos"
      aria-labelledby="about-title"
      className="scroll-mt-24 border-t border-hair bg-surface"
    >
      <div className="shell py-24 lg:py-36">
        <SectionHeading
          headingId="about-title"
          segments={[{ text: "Une agence née d'un" }, { text: "constat simple.", italic: true }]}
        />

        <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="lead text-chalk">
                Avant {site.name}, {site.founder} a passé huit ans auprès de marques qui ne
                manquaient pas de moyens. Elles manquaient de direction. Un studio pour l'identité,
                une agence pour les campagnes, un prestataire pour le contenu, et personne pour
                relier l'ensemble.
              </p>
            </Reveal>

            <figure className="my-12 border-l border-signal pl-6 lg:my-16 lg:pl-8">
              <blockquote>
                <TextReveal
                  as="p"
                  className="font-serif text-[clamp(1.75rem,3.6vw,3rem)] leading-[1.08] tracking-tightest"
                  stagger={0.03}
                  segments={[
                    { text: "« Le problème n'est presque jamais le budget." },
                    { text: "C'est la dispersion. »", italic: true },
                  ]}
                />
              </blockquote>
              <figcaption className="label mt-6">{site.founder}, fondateur</figcaption>
            </figure>

            <Reveal delay={0.06}>
              <p className="leading-relaxed text-chalk-dim">
                Il crée {site.name} en {site.foundedIn} avec une contrainte de départ : une seule
                équipe, un seul document de référence, une seule manière de mesurer. Le nom vient de
                son prénom, glissé dans le mot marketing. Une façon discrète de rappeler qu'il y a
                quelqu'un derrière le travail.
              </p>
              <p className="mt-5 leading-relaxed text-chalk-dim">
                L'objectif n'a jamais été de produire plus de marketing. Il est d'en produire un
                plus cohérent, que les équipes internes peuvent reprendre et défendre sans nous.
              </p>
            </Reveal>
          </div>

          <Reveal className="lg:sticky lg:top-28 lg:col-span-4 lg:col-start-9 lg:self-start">
            <div className="border border-hair bg-void p-8">
              <Wordmark className="block text-4xl" />

              {/* Portrait slot: the border stays, the photo replaces the initials. */}
              <div
                aria-hidden="true"
                className="mt-8 flex aspect-square w-full items-center justify-center border border-hair bg-surface text-2xl tracking-[0.08em] text-chalk-faint"
              >
                MK
              </div>

              <p className="mt-8 text-2xl tracking-tighter">{site.founder}</p>
              <p className="label mt-2">Fondateur</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
