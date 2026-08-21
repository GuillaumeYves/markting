import { Aperture, Compass, MessageSquare, MousePointerClick, PenTool, Target } from "lucide-react";
import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "strategie",
    title: "Stratégie",
    description:
      "Un positionnement clair, des priorités assumées, un plan que vos équipes peuvent réellement suivre.",
    deliverables: ["Audit", "Positionnement", "Feuille de route"],
    icon: Compass,
  },
  {
    id: "branding",
    title: "Branding",
    description:
      "Une identité qui tient sur un site, une affiche et un post, sans se renier au passage.",
    deliverables: ["Plateforme de marque", "Identité", "Design system"],
    icon: Aperture,
  },
  {
    id: "acquisition",
    title: "Acquisition",
    description:
      "SEO, SEA, paid social. Nous investissons là où le retour se démontre, pas là où c'est confortable.",
    deliverables: ["SEO", "Campagnes payantes", "Reporting"],
    icon: Target,
  },
  {
    id: "social",
    title: "Réseaux",
    description:
      "Une ligne éditoriale tenue dans la durée, plutôt qu'une succession de publications isolées.",
    deliverables: ["Ligne éditoriale", "Calendrier", "Community"],
    icon: MessageSquare,
  },
  {
    id: "contenu",
    title: "Création de contenu",
    description:
      "Photo, vidéo, texte. Produit pour durer plusieurs mois, pas pour remplir un calendrier.",
    deliverables: ["Direction artistique", "Production", "Copywriting"],
    icon: PenTool,
  },
  {
    id: "conversion",
    title: "Conversion",
    description:
      "Parcours, pages et messages retravaillés jusqu'à ce que les chiffres bougent vraiment.",
    deliverables: ["Analyse", "Tests", "Optimisation continue"],
    icon: MousePointerClick,
  },
];
