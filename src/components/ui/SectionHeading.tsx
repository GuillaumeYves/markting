import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { TextReveal, type TextSegment } from "@/components/ui/TextReveal";

type SectionHeadingProps = {
  segments: TextSegment[];
  intro?: ReactNode;
  headingId: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
};

export function SectionHeading({
  segments,
  intro,
  headingId,
  align = "left",
  tone = "dark",
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={`${centered ? "text-center" : ""} ${className}`}>
      <TextReveal
        as="h2"
        id={headingId}
        segments={segments}
        className={`headline max-w-4xl ${centered ? "mx-auto" : ""}`}
      />

      {intro ? (
        <Reveal delay={0.1}>
          <p
            className={`lead mt-7 max-w-copy ${centered ? "mx-auto" : ""} ${
              tone === "light" ? "text-void/70" : "text-chalk-dim"
            }`}
          >
            {intro}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
