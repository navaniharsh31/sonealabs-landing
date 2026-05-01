export type Service = {
  num: string;
  tag?: { label: string; lime?: boolean };
  name: string;
  italic?: boolean;
  sub: string;
  desc: string;
  price: string;
  priceFrom?: string;
  priceUnit?: string;
  cta: string;
  cls: "svc-mvp" | "svc-mobile" | "svc-ai" | "svc-advisory";
};

export const SERVICES: Service[] = [
  {
    num: "01",
    tag: { label: "most popular", lime: true },
    name: "The 4-week MVP.",
    sub: "Idea → live → first paying user.",
    desc: "Full-stack build. Next.js or Expo, Supabase, Stripe, deploy. Fixed scope, fixed price, fixed date — written into the contract. You ship in 28 days or it's free.",
    priceFrom: "starts at",
    price: "$3,000",
    cta: "book a scoping call ↗",
    cls: "svc-mvp",
  },
  {
    num: "02",
    name: "Mobile.",
    sub: "iOS + Android, App Store ready.",
    desc: "Expo, RevenueCat, OTA updates. Same stack as Zoe and RespawnIRL.",
    priceFrom: "starts at",
    price: "$5,000",
    cta: "talk ↗",
    cls: "svc-mobile",
  },
  {
    num: "03",
    tag: { label: "retainer" },
    name: "AI features.",
    italic: true,
    sub: "Plugged into what you've built.",
    desc: "Claude, OpenAI, evals, agents, structured output. Streaming chat to background workflows.",
    price: "$1,500",
    priceUnit: " / month",
    cta: "talk ↗",
    cls: "svc-ai",
  },
  {
    num: "04",
    tag: { label: "unsure?" },
    name: "Advisory.",
    sub: "90 minutes, founder-to-founder.",
    desc: "Architecture review, GTM sanity check, technical co-founder thinking. Same engineers who'd build it for you, just talking.",
    price: "$500",
    priceUnit: " / session",
    cta: "book a slot ↗",
    cls: "svc-advisory",
  },
];
