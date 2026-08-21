import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useId, useState } from "react";
import { Wordmark } from "@/components/ui/Wordmark";
import { navigation } from "@/data/navigation";
import { site } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrolled } from "@/hooks/useScrolled";
import { MOTION_DURATION, MOTION_EASE } from "@/lib/motion";

const SECTION_IDS = navigation.map((item) => item.id);

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(24);
  const activeSection = useActiveSection(SECTION_IDS);
  const reducedMotion = useReducedMotion();
  const menuId = useId();

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // The panel covers the page, so the document behind it must not scroll and
  // Escape must always get the visitor out.
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onBreakpointChange = () => {
      if (desktop.matches) closeMenu();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpointChange);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpointChange);
    };
  }, [closeMenu, menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-brand ${
        scrolled || menuOpen
          ? "border-b border-hair bg-void/85 backdrop-blur-xl supports-[backdrop-filter]:bg-void/70"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        <a
          href="#top"
          className="rounded-sm text-lg leading-none lg:text-xl"
          aria-label={`${site.name}, retour en haut de page`}
        >
          <Wordmark />
        </a>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {navigation.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`group flex items-center gap-2 py-2 text-sm tracking-[-0.012em] transition-colors duration-200 ${
                      isActive ? "text-chalk" : "text-chalk-dim hover:text-chalk"
                    }`}
                  >
                    {/* The dot is always in the layout and only scales in, so
                        becoming the active section never nudges the labels. */}
                    <span
                      aria-hidden="true"
                      className={`block size-1.5 shrink-0 rounded-full bg-signal transition duration-200 ease-brand ${
                        isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
                      }`}
                    />
                    <span className="link-underline">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-full text-chalk transition-colors duration-200 hover:bg-chalk/10 lg:hidden"
        >
          {menuOpen ? (
            <X aria-hidden="true" strokeWidth={1.5} className="size-5" />
          ) : (
            <Menu aria-hidden="true" strokeWidth={1.5} className="size-5" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <m.div
            id={menuId}
            key="mobile-menu"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: MOTION_DURATION.fast, ease: MOTION_EASE }}
            className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-hair bg-void lg:hidden"
          >
            <nav aria-label="Navigation mobile" className="shell flex h-full flex-col py-10">
              <ul className="flex flex-col">
                {navigation.map((item, index) => (
                  <m.li
                    key={item.id}
                    initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reducedMotion ? 0 : MOTION_DURATION.standard,
                      delay: reducedMotion ? 0 : 0.04 * index,
                      ease: MOTION_EASE,
                    }}
                    className="border-b border-hair"
                  >
                    <a
                      href={item.href}
                      onClick={closeMenu}
                      className="flex items-center gap-4 py-5 text-3xl tracking-tighter"
                    >
                      <span aria-hidden="true" className="size-1.5 rounded-full bg-signal" />
                      {item.label}
                    </a>
                  </m.li>
                ))}
              </ul>

              <p className="mt-10 text-sm text-chalk-dim">{site.email}</p>
            </nav>
          </m.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
