export type ProcessStep = {
  num: string;
  when: string;
  name: string;
  italic?: boolean;
  sub: string;
  desc: string;
  deliverable: string;
  timing: string;
  visual: "checklist" | "frames" | "terminal" | "browser";
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    num: "01 / 04",
    when: "day 1",
    name: "discover.",
    sub: "the call",
    desc: "A 60-minute call where we figure out what you actually need vs. what you think you need. Walk away with a fixed scope, a fixed price, and a delivery date you can plan around.",
    deliverable: "scope doc + quote",
    timing: "same week",
    visual: "checklist",
  },
  {
    num: "02 / 04",
    when: "week 1",
    name: "design.",
    sub: "the figma",
    desc: "Scope to clickable Figma in 5 days. Mobile-first, motion-aware, design tokens locked. You sign off, we move. No iteration cycles spinning forever.",
    deliverable: "figma + tokens",
    timing: "5 days",
    visual: "frames",
  },
  {
    num: "03 / 04",
    when: "weeks 2–3",
    name: "build.",
    italic: true,
    sub: "the code",
    desc: "Senior execution. Next.js + Supabase + Stripe + whatever your stack actually needs. Daily commits, daily Loom updates. Staging URL from day one.",
    deliverable: "github + staging",
    timing: "14 days",
    visual: "terminal",
  },
  {
    num: "04 / 04",
    when: "week 4",
    name: "ship.",
    sub: "the launch",
    desc: "Production deploy. App Store, Play Store, Vercel — whichever surface your product lives on. We don't leave until you have your first paying user.",
    deliverable: "live url + payments",
    timing: "day 28",
    visual: "browser",
  },
];
