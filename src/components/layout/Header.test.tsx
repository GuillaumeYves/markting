import { fireEvent, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "@/components/layout/Header";
import { navigation } from "@/data/navigation";
import { renderWithMotion } from "@/test/utils";

describe("Header", () => {
  it("lists every section in the desktop navigation", () => {
    renderWithMotion(<Header />);
    const nav = screen.getByRole("navigation", { name: "Navigation principale" });
    for (const item of navigation) {
      expect(within(nav).getByRole("link", { name: item.label })).toHaveAttribute(
        "href",
        item.href,
      );
    }
  });

  it("opens the mobile panel and closes it on Escape", () => {
    renderWithMotion(<Header />);
    const toggle = screen.getByRole("button", { name: "Ouvrir le menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(toggle);
    expect(screen.getByRole("navigation", { name: "Navigation mobile" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Fermer le menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.getByRole("button", { name: "Ouvrir le menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("closes the mobile panel once a section is picked", () => {
    renderWithMotion(<Header />);
    fireEvent.click(screen.getByRole("button", { name: "Ouvrir le menu" }));

    const mobileNav = screen.getByRole("navigation", { name: "Navigation mobile" });
    fireEvent.click(within(mobileNav).getByRole("link", { name: navigation[0].label }));

    expect(screen.getByRole("button", { name: "Ouvrir le menu" })).toBeInTheDocument();
  });
});
