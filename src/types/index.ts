import type { LucideIcon } from "lucide-react";

export type NavItem = {
  id: string;
  label: string;
  href: string;
};

export type Metric = {
  id: string;
  /** Numeric part of the figure, used by the count-up animation. */
  value: number;
  /** Decimal places to keep when formatting, e.g. 1 for 3,2. */
  precision?: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  icon: LucideIcon;
};

export type MethodStep = {
  id: string;
  title: string;
  duration: string;
  description: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  /** Two letters, shown in the portrait slot until a real photo is dropped in. */
  initials: string;
  role: string;
  company: string;
};
