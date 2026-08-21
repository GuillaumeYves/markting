/**
 * Figures are displayed the French way: comma decimals and a narrow space
 * before units. Formatting lives here so the count-up animation and the
 * static fallback can never drift apart.
 */
export function formatFigure(value: number, precision = 0): string {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  }).format(value);
}

export function currentYear(): number {
  return new Date().getFullYear();
}
