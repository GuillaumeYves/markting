type WordmarkProps = {
  className?: string;
  /** On the one light section the accent has to darken to stay readable. */
  tone?: "dark" | "light";
};

/**
 * MarKting is written as one word with a single accented K: the founder's first
 * name sits inside "marketing" and the colour is the only thing that says so.
 */
export function Wordmark({ className = "", tone = "dark" }: WordmarkProps) {
  return (
    <span className={`font-sans font-semibold tracking-tighter ${className}`}>
      <span aria-hidden="true">Mar</span>
      <span
        aria-hidden="true"
        className={tone === "light" ? "text-signal-deep" : "text-signal-soft"}
      >
        K
      </span>
      <span aria-hidden="true">ting</span>
      <span className="sr-only">MarKting</span>
    </span>
  );
}
