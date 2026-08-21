import { useEffect, useState } from "react";

/**
 * Tracks whether the page has scrolled past a threshold. The header uses it to
 * swap from a transparent bar to an opaque one.
 */
export function useScrolled(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > threshold);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [threshold]);

  return scrolled;
}
