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
    name: "scoping.",
    sub: "the lockdown",
    desc: "A 60-minute call to strip your idea down to its most valuable version. We define what you actually need to launch. Walk away with a fixed scope, a fixed price, and a guaranteed delivery date.",
    deliverable: "scope + fixed quote",
    timing: "same week",
    visual: "checklist",
  },
  {
    num: "02 / 04",
    when: "week 1",
    name: "blueprint.",
    sub: "the prototype",
    desc: "We turn that scope into a high-fidelity, clickable Figma prototype in 5 days. Mobile-first, motion-aware, and ready for development. You sign off on the UX, and we hit the ground running.",
    deliverable: "figma + design system",
    timing: "5 days",
    visual: "frames",
  },
  {
    num: "03 / 04",
    when: "weeks 2–3",
    name: "execution.",
    italic: true,
    sub: "the build",
    desc: "Senior engineering only. Next.js, Supabase, and Stripe integrated with precision. Daily commits, daily Loom updates, and a staging URL where you can watch your product come to life every 24 hours.",
    deliverable: "github + staging url",
    timing: "14 days",
    visual: "terminal",
  },
  {
    num: "04 / 04",
    when: "week 4",
    name: "launch.",
    sub: "the revenue",
    desc: "We deploy to production and handle the App Store/Vercel handoff. We don't consider the job done until your first paying user has successfully checked out. Launch is day 28.",
    deliverable: "live app + first user",
    timing: "day 28",
    visual: "browser",
  },
];
