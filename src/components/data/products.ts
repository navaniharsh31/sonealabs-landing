export type Product = {
  slug: "tijara" | "qdash" | "respawn" | "zoe";
  num: string;
  status: { label: string; muted?: boolean };
  name: string;
  italic?: boolean;
  tag: string;
  stats: { label: string; value: string }[];
  link: { href: string; label: string };
  billboard: {
    meta: { left: string; right: string };
    mark: string;
    foot: { left: string; right: string };
  };
};

export const PRODUCTS: Product[] = [
  {
    slug: "tijara",
    num: "01 / 04",
    status: { label: "live" },
    name: "tijara",
    tag: "Trade management SaaS for global import-export SMEs. Multi-corridor invoicing, FTA compliance, customs documentation.",
    stats: [
      { label: "corridor", value: "India ↔ UAE" },
      { label: "stack", value: "Next.js · Supabase" },
      { label: "status", value: "first paying users" },
    ],
    link: { href: "https://tijara.global", label: "tijara.global" },
    billboard: {
      meta: { left: "Tijara · 2025", right: "v1.0" },
      mark: "tijara.",
      foot: { left: "Trade\nSaaS", right: "Mumbai\n→ Dubai" },
    },
  },
  {
    slug: "qdash",
    num: "02 / 04",
    status: { label: "live" },
    name: "qdash",
    tag: "Cashless ordering for nightlife venues. POS-integrated, RBI-compliant payment splitting, QR ticketing with HMAC tokens.",
    stats: [
      { label: "market", value: "Mumbai bars + clubs" },
      { label: "stack", value: "NestJS · Cloudflare" },
      { label: "status", value: "venues onboarding" },
    ],
    link: { href: "https://qdash.in", label: "qdash.in" },
    billboard: {
      meta: { left: "QDash · 2025", right: "v1.0" },
      mark: "qdash.",
      foot: { left: "Nightlife\nOS", right: "Pay · Order\n· Enter" },
    },
  },
  {
    slug: "respawn",
    num: "03 / 04",
    status: { label: "launching", muted: true },
    name: "respawnirl",
    tag: "Mobile gaming addiction recovery for Gen Z. 90-day program, AI coach, panic button, financial tracker — hard paywall built into the spine.",
    stats: [
      { label: "audience", value: "Gen Z mobile gamers" },
      { label: "stack", value: "Expo · Supabase" },
      { label: "target", value: "$50K MRR / mo 6" },
    ],
    link: { href: "#", label: "launching soon" },
    billboard: {
      meta: { left: "RespawnIRL · 2026", right: "v1.0" },
      mark: "respawn.",
      foot: { left: "Recovery\nApp", right: "90 days\nback to life" },
    },
  },
  {
    slug: "zoe",
    num: "04 / 04",
    status: { label: "app store" },
    name: "zoe.ai",
    italic: true,
    tag: "Relationship therapy chatbot. Phase-based conversation engine — understand, identify, advise, wrap. Live on the App Store with paying subscribers.",
    stats: [
      { label: "platform", value: "iOS · App Store" },
      { label: "stack", value: "Expo · RevenueCat" },
      { label: "status", value: "recurring revenue" },
    ],
    link: { href: "#", label: "app store ↗" },
    billboard: {
      meta: { left: "Zoe · 2024", right: "v1.0" },
      mark: "zoe.",
      foot: { left: "Therapy\nAI", right: "Talk it\nout" },
    },
  },
];
