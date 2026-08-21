# MarKting

Landing page d'une agence de marketing, en page unique et entièrement statique.

Tout le contenu est fictif : l'agence, son fondateur Mark Keller, les marques citées, les
chiffres, les témoignages et les mentions légales. Aucun lien ne quitte la page. Le projet
est un exercice de direction artistique et d'intégration front, pas un site commercial.

## Stack

| Domaine     | Choix                                                        |
| ----------- | ------------------------------------------------------------ |
| Framework   | React 19, TypeScript strict                                  |
| Build       | Vite 8, sortie statique dans `dist/`                         |
| Styles      | Tailwind CSS 3                                               |
| Animation   | Framer Motion 12, chargé via `LazyMotion` + `domAnimation`   |
| Icônes      | lucide-react                                                 |
| Typographie | Instrument Sans et Instrument Serif, auto-hébergées en woff2 |
| Tests       | Vitest, Testing Library, jsdom                               |
| Qualité     | ESLint, Prettier, `tsc --noEmit`                             |
| CI          | GitHub Actions, validation uniquement                        |

Aucune image bitmap dans la page : les compositions du hero et le grain sont dessinés en SVG
et en CSS.

Le build sort un site statique, sans backend ni base de données. La configuration de mise en
ligne est présente dans le dépôt, pour un déploiement optionnel plus tard.

## Structure

```text
src/
  components/
    brand/      composition animée du hero
    layout/     header, footer
    ui/         reveal, texte animé, compteurs, wordmark
  data/         contenu de toutes les sections
  hooks/        scroll, section active
  lib/          motion, formatage des chiffres
  sections/     hero, métriques, services, à propos, méthode, témoignages, contact
  styles/       global.css, tokens et polices locales
  types/        typage du contenu
  test/         setup Vitest
assets/brand/   sources SVG du favicon et de l'image Open Graph
img/            captures d'écran
public/         polices, favicons, robots.txt, sitemap.xml, config serveur
scripts/        génération des assets de marque, validation du build
```

Le contenu vit dans `src/data/`, typé dans `src/types/`. Les sections ne font que le mettre en
page.

## Scripts

```bash
npm run dev        # serveur de développement
npm run build      # typecheck puis build dans dist/
npm run test       # tests
npm run lint       # ESLint
```
