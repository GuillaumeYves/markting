import { m, useReducedMotion } from "framer-motion";
import type { ElementType } from "react";
import { MOTION_EASE, revealViewport } from "@/lib/motion";

export type TextSegment = { text: string; italic?: boolean; newLine?: boolean };

type TextRevealProps = {
  segments: TextSegment[];
  className?: string;
  as?: ElementType;
  id?: string;
  delay?: number;
  /** Seconds between two words. Lower it on long headlines. */
  stagger?: number;
};

/**
 * 150% rather than 100%: the display line-height is tighter than the font's em
 * box, so a word only clears the mask once it has travelled past its own
 * ascender too.
 */
const wordVariants = {
  hidden: { y: "150%" },
  visible: { y: "0%", transition: { duration: 0.72, ease: MOTION_EASE } },
};

/**
 * Reveals a headline word by word from behind a mask. Words are wrapped
 * individually so a headline can still wrap naturally at any width.
 *
 * The mask needs to clip below the word, but nowhere else: an italic serif
 * leans past its own advance width, and an accent reaches above the tight
 * display line-height. Both would land outside the box and be shaved off. The
 * padding gives the ink somewhere to go and the matching negative margins take
 * it straight back out of the layout, so spacing and line breaks are untouched.
 */
export function TextReveal({
  segments,
  className,
  as: Tag = "h2",
  id,
  delay = 0,
  stagger = 0.045,
}: TextRevealProps) {
  const reducedMotion = useReducedMotion();

  const content = segments.flatMap((segment, segmentIndex) =>
    segment.text.split(" ").map((word, wordIndex) => ({
      key: `${segmentIndex}-${wordIndex}`,
      word,
      italic: segment.italic ?? false,
      breakBefore: (segment.newLine ?? false) && wordIndex === 0,
    })),
  );

  if (reducedMotion) {
    return (
      <Tag id={id} className={className}>
        {content.map(({ key, word, italic, breakBefore }) => (
          <span key={key}>
            {breakBefore ? <br aria-hidden="true" /> : null}
            <span className={italic ? "accent-italic" : undefined}>{word} </span>
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag id={id} className={className}>
      <m.span
        className="inline"
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={{ visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      >
        {content.map(({ key, word, italic, breakBefore }) => (
          <span key={key}>
            {breakBefore ? <br aria-hidden="true" /> : null}
            <span className="-mt-[0.2em] -mr-[0.16em] inline-block overflow-hidden pt-[0.2em] pr-[0.16em] pb-[0.14em] align-bottom">
              <m.span
                variants={wordVariants}
                className={`inline-block ${italic ? "accent-italic" : ""}`}
              >
                {word}
              </m.span>
            </span>{" "}
          </span>
        ))}
      </m.span>
    </Tag>
  );
}
