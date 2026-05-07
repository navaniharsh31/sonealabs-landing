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
    tag: { label: "guaranteed", lime: true },
    name: "The 28-Day MVP.",
    sub: "Figma → Live → Paying Users.",
    desc: "We build your entire MVP in 4 weeks. Next.js, Supabase, Stripe, and a production-ready UI. If we don't ship by day 28, you don't pay. Fixed scope, zero fluff.",
    priceFrom: "starts at",
    price: "$3,000",
    cta: "book a scoping call ↗",
    cls: "svc-mvp",
  },
  {
    num: "02",
    name: "Mobile Apps.",
    sub: "iOS + Android, App Store ready.",
    desc: "High-performance React Native (Expo) builds with RevenueCat and OTA updates. The same stack used for Zoe and RespawnIRL. Shipped in 6 weeks.",
    priceFrom: "starts at",
    price: "$5,000",
    cta: "talk to us ↗",
    cls: "svc-mobile",
  },
  {
    num: "03",
    name: "AI Agents.",
    italic: true,
    sub: "Replace manual work.",
    desc: "Custom autonomous agents designed to handle repetitive tasks and replace human overhead. We build LLM-powered workflows that integrate directly into your stack to automate your back-office.",
    priceFrom: "starts at",
    price: "$5,000",
    cta: "get an audit ↗",
    cls: "svc-ai",
  },
  {
    num: "04",
    tag: { label: "unsure?" },
    name: "Founder Advisory.",
    sub: "90 minutes, founder-to-founder.",
    desc: "Architecture review, GTM sanity check, or technical co-founder thinking. Talk to the senior engineers who actually build the products.",
    price: "$200",
    priceUnit: " / session",
    cta: "book a slot ↗",
    cls: "svc-advisory",
  },
];
