import { LazyMotion, domAnimation } from "framer-motion";
import { render } from "@testing-library/react";
import type { ReactElement } from "react";

/**
 * The app runs inside a strict LazyMotion provider, so components using `m`
 * have to be rendered the same way in tests.
 */
export function renderWithMotion(ui: ReactElement) {
  return render(<LazyMotion features={domAnimation}>{ui}</LazyMotion>);
}
