import type { Metric } from "@/types";

export const metrics: Metric[] = [
  {
    id: "conversion",
    value: 42,
    prefix: "+",
    suffix: " %",
    label: "de conversion moyenne après refonte",
  },
  { id: "brands", value: 18, label: "marques accompagnées depuis 2019" },
  { id: "impressions", value: 3.2, precision: 1, suffix: " M", label: "d'impressions générées" },
  { id: "satisfaction", value: 4.9, precision: 1, suffix: "/5", label: "de satisfaction client" },
];
