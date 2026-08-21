import { screen } from "@testing-library/react";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "@/App";
import { navigation } from "@/data/navigation";

describe("App", () => {
  it("states the promise once, as the single h1", () => {
    render(<App />);
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(/Le marketing\s+moderne\./);
  });

  it("anchors a section for every navigation entry", () => {
    const { container } = render(<App />);
    for (const item of navigation) {
      expect(container.querySelector(`#${item.id}`)).not.toBeNull();
    }
  });

  it("keeps every link inside the page, since MarKting is fictional", () => {
    const { container } = render(<App />);
    const links = [...container.querySelectorAll("a[href]")];
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link.getAttribute("href")).toMatch(/^#/);
    }
  });
});
