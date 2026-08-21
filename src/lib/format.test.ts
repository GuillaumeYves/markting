import { describe, expect, it } from "vitest";
import { currentYear, formatFigure } from "@/lib/format";

describe("formatFigure", () => {
  it("uses a comma for decimals, the way the metrics are written", () => {
    expect(formatFigure(3.2, 1)).toBe("3,2");
    expect(formatFigure(4.9, 1)).toBe("4,9");
  });

  it("drops decimals when none are asked for", () => {
    expect(formatFigure(42)).toBe("42");
    expect(formatFigure(17.6)).toBe("18");
  });

  it("keeps the requested precision while counting up", () => {
    expect(formatFigure(1.04, 1)).toBe("1,0");
  });
});

describe("currentYear", () => {
  it("returns the running year for the footer notice", () => {
    expect(currentYear()).toBe(new Date().getFullYear());
  });
});
