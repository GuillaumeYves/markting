import { Wordmark } from "@/components/ui/Wordmark";
import { navigation } from "@/data/navigation";
import { legal, site } from "@/data/site";
import { currentYear } from "@/lib/format";

export function Footer() {
  return (
    <footer className="border-t border-hair bg-void-deep">
      <div className="shell py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Wordmark className="text-4xl" />
            <p className="accent-italic mt-4 text-2xl text-chalk-dim">{site.tagline}</p>
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-chalk-faint">
              Agence indépendante fondée par {site.founder}. Stratégie, création et performance
              réunies sous une même direction. {site.reach}.
            </p>
          </div>

          <nav aria-label="Navigation de pied de page" className="lg:col-span-3">
            <h2 className="label">Navigation</h2>
            <ul className="mt-5 space-y-3">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="link-underline text-sm text-chalk-dim transition-colors hover:text-chalk"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="label">Contact</h2>
            <ul className="mt-5 space-y-3 text-sm text-chalk-dim">
              <li>{site.email}</li>
              <li>{site.phone}</li>
            </ul>

            <h2 className="label mt-8">Réseaux</h2>
            <ul className="mt-5 space-y-3 text-sm text-chalk-dim">
              {site.socials.map((social) => (
                <li key={social.id}>{social.label}</li>
              ))}
            </ul>
          </div>
        </div>

        <details id="mentions-legales" className="group mt-16 border-t border-hair pt-8">
          <summary className="label cursor-pointer list-none transition-colors hover:text-chalk">
            Mentions légales
            <span aria-hidden="true" className="ml-2 inline-block group-open:hidden">
              +
            </span>
            <span aria-hidden="true" className="ml-2 hidden group-open:inline-block">
              −
            </span>
          </summary>
          <div className="mt-5 grid gap-2 text-sm leading-relaxed text-chalk-faint sm:max-w-2xl">
            <p>Éditeur : {legal.publisher}.</p>
            <p>{legal.registration}.</p>
            <p>Siège social : {legal.address}.</p>
            <p>{legal.director}.</p>
            <p>Hébergeur : {legal.host}.</p>
            <p>{legal.notice}</p>
          </div>
        </details>

        <div className="mt-12 flex flex-col gap-3 border-t border-hair pt-8 text-xs text-chalk-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear()} {site.name}. Tous droits réservés.
          </p>
          <p>Site de démonstration. Marques, chiffres et témoignages fictifs.</p>
        </div>
      </div>
    </footer>
  );
}
