export const site = {
  name: "MarKting",
  tagline: "Le marketing moderne.",
  founder: "Mark Keller",
  email: "contact@markting.fr",
  phone: "+33 1 84 80 12 40",
  reach: "Dans le monde entier",
  foundedIn: 2019,
  /** MarKting is fictional, so the networks are named but never linked. */
  socials: [
    { id: "linkedin", label: "LinkedIn" },
    { id: "instagram", label: "Instagram" },
  ],
} as const;

export const legal = {
  publisher: "MarKting SAS, société fictive au capital de 15 000 €",
  registration: "RCS Paris 892 431 006, TVA FR 42 892431006",
  address: "14 rue des Panoyaux, 75020 Paris",
  director: "Mark Keller, directeur de la publication",
  host: "Infomaniak Network SA, Rue Eugène-Marziano 25, 1227 Genève, Suisse",
  notice:
    "Ce site est une démonstration. MarKting, ses clients, ses chiffres et ses témoignages sont fictifs, et aucun lien ne sort de la page.",
} as const;
