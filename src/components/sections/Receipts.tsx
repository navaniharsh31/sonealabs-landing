"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitChars from "@/components/SplitChars";
import Billboard from "@/components/visuals/Billboard";
import { PRODUCTS } from "@/components/data/products";

const N = PRODUCTS.length;

export default function Receipts() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const currentRef = useRef<HTMLSpanElement | null>(null);
  const fillRef = useRef<HTMLSpanElement | null>(null);

  // 0 → N-1 as user scrolls through the pinned range
  const [rawProgress, setRawProgress] = useState(0);

  // Each panel fades in when it's the active one and out when it's not.
  // dist = 0 → opacity 1, dist = 0.5 → opacity 0 (smooth crossfade)
  const opacity = (i: number) =>
    Math.max(0, 1 - Math.abs(rawProgress - i) * 2.4);

  useGSAP(
    () => {
      // ── intro reveal ────────────────────────────────────
      gsap.set(".receipts-title .char", { y: "110%" });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".receipts-intro",
            start: "top 75%",
            end: "top 25%",
            toggleActions: "play none none reverse",
          },
        })
        .to(".receipts-intro .eyebrow", {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        })
        .to(
          ".receipts-title .char",
          {
            y: "0%",
            duration: 1.3,
            stagger: { each: 0.022, from: "start" },
            ease: "expo.out",
          },
          "-=0.3"
        )
        .to(
          ".receipts-sub",
          { opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.5"
        );

      // ── pin + scrub ──────────────────────────────────────
      const scroller = scrollerRef.current;
      const stage = stageRef.current;
      if (!scroller || !stage) return;

      ScrollTrigger.create({
        trigger: scroller,
        pin: stage,
        pinSpacing: true,
        start: "top top",
        end: () => `+=${(N - 1) * window.innerHeight}`,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate(self) {
          const raw = self.progress * (N - 1);
          setRawProgress(raw);

          const idx = Math.min(Math.round(raw), N - 1);
          if (currentRef.current)
            currentRef.current.textContent = String(idx + 1).padStart(2, "0");
          if (fillRef.current)
            fillRef.current.style.width = `${self.progress * 100}%`;
        },
      });

      ScrollTrigger.refresh();
    },
    { scope: sectionRef }
  );

  return (
    <section className="receipts" id="receipts" ref={sectionRef}>
      {/* intro */}
      <div className="receipts-intro">
        <div className="eyebrow">/02 — recently shipped</div>
        <h2 className="receipts-title">
          <span className="line">
            <SplitChars text="Four products." />
          </span>
          <span className="line">
            <span className="it">
              <SplitChars text="Already in the world." />
            </span>
          </span>
        </h2>
        <p className="receipts-sub">
          Real users. Real revenue. No demos, no decks — link out and try them
          yourself.
        </p>
      </div>

      <div className="rs-scroller" ref={scrollerRef}>
        <div className="rs-stage" ref={stageRef}>

          {/* ── text pane: all panels stacked, crossfade via opacity ── */}
          <div className="rs-pane rs-text-pane">
            {PRODUCTS.map((p, i) => (
              <div
                className="rs-panel"
                key={p.slug}
                style={{
                  opacity: opacity(i),
                  pointerEvents: Math.round(rawProgress) === i ? "auto" : "none",
                }}
              >
                <div className="rs-meta">
                  <span className="rs-num">{p.num}</span>
                  <span className="rs-status">
                    <span className={`dot${p.status.muted ? " muted" : ""}`} />
                    {p.status.label}
                  </span>
                </div>
                <h3 className={`product-name${p.italic ? " italic" : ""}`}>
                  <span className="line">{p.name}</span>
                </h3>
                <p className="product-tag">{p.tag}</p>
                <div className="product-stats">
                  {p.stats.map((s) => (
                    <div key={s.label}>
                      <span className="stat-label">{s.label}</span>
                      <span className="stat-value">{s.value}</span>
                    </div>
                  ))}
                </div>
                <a href={p.link.href} className="product-link">
                  {p.link.label}
                </a>
              </div>
            ))}
          </div>

          {/* ── visual pane: billboards stacked, crossfade via opacity ── */}
          <div className="rs-pane rs-visual-pane">
            {PRODUCTS.map((p, i) => (
              <div
                className="rs-panel"
                key={p.slug}
                style={{
                  opacity: opacity(i),
                  pointerEvents: "none",
                }}
              >
                <Billboard product={p} isActive={Math.round(rawProgress) === i} />
              </div>
            ))}
          </div>

          {/* counter */}
          <div className="rs-counter">
            <span className="rs-counter-num">
              <span ref={currentRef}>01</span> / 04
            </span>
            <span className="rs-progress">
              <span className="rs-progress-fill" ref={fillRef} />
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
