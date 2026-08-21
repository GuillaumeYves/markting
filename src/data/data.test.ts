import { describe, expect, it } from "vitest";
import { metrics } from "@/data/metrics";
import { methodSteps } from "@/data/method";
import { navigation } from "@/data/navigation";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { testimonials } from "@/data/testimonials";

function ids(collection: { id: string }[]) {
  return collection.map((entry) => entry.id);
}

describe("content collections", () => {
  it.each([
    ["navigation", navigation],
    ["metrics", metrics],
    ["services", services],
    ["method steps", methodSteps],
    ["testimonials", testimonials],
  ])("keeps %s ids unique", (_name, collection) => {
    const collected = ids(collection);
    expect(new Set(collected).size).toBe(collected.length);
  });

  it("points every navigation entry at its own section anchor", () => {
    for (const item of navigation) {
      expect(item.href).toBe(`#${item.id}`);
      expect(item.label.length).toBeGreaterThan(0);
    }
  });

  it("covers the six disciplines announced in the copy", () => {
    expect(services).toHaveLength(6);
    for (const service of services) {
      expect(service.description.length).toBeGreaterThan(40);
      expect(service.deliverables.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("keeps the four method steps short and dated", () => {
    expect(methodSteps).toHaveLength(4);
    for (const step of methodSteps) {
      expect(step.duration.length).toBeGreaterThan(0);
      expect(step.description.length).toBeGreaterThan(40);
    }
  });

  it("attributes every testimonial and gives it a portrait slot", () => {
    for (const testimonial of testimonials) {
      expect(testimonial.name).toMatch(/\s/);
      expect(testimonial.initials).toMatch(/^[A-Z]{2}$/);
      expect(testimonial.role.length).toBeGreaterThan(0);
      expect(testimonial.company.length).toBeGreaterThan(0);
      expect(testimonial.quote.length).toBeLessThan(140);
    }
  });

  it("exposes contact details without linking anywhere", () => {
    expect(site.email).toMatch(/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/);
    for (const social of site.socials) {
      expect(social).not.toHaveProperty("href");
      expect(social).not.toHaveProperty("handle");
    }
  });
});
