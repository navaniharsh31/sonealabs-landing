"use client";

import { CSSProperties, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitChars from "@/components/SplitChars";

const SHOWCASES = [
  {
    slug: "qdash",
    url: "https://qdash.in",
    name: "QDash",
    tag: "Nightlife OS · Live",
    year: "2025",
    live: true,
  },
  {
    slug: "devartha",
    url: "https://devartha.in",
    name: "Devartha",
    tag: "Client work · Live",
    year: "2024",
    live: true,
  },
  {
    slug: "newtrace",
    url: "https://newtrace.io",
    name: "NewTrace",
    tag: "Client work",
    year: "2024",
    live: true,
  },
];

const N = SHOWCASES.length;

export default function Showcases() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // progress 0→1 driven by ScrollTrigger.onUpdate, same pattern as Receipts
  const [progress, setProgress] = useState(0);

  // Compute per-slide transform — slide i enters from below when rawProg crosses i-1
  const slideStyle = (i: number): CSSProperties => {
    if (i === 0) return { zIndex: 1 };
    const rawProg = progress * (N - 1); // 0 → N-1
    const delta = rawProg - (i - 1);    // 0→1 as this slide enters
    const yPct = Math.max(0, Math.min(100, 100 - delta * 100));
    return {
      transform: `translateY(${yPct}%)`,
      zIndex: i + 1,
    };
  };

  useGSAP(
    () => {
      // ── intro reveal ─────────────────────────────────────
      gsap.set(".showcases-title .char", { y: "110%" });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".showcases-intro",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        })
        .to(".showcases-intro .eyebrow", {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        })
        .to(
          ".showcases-title .char",
          {
            y: "0%",
            duration: 1.3,
            stagger: { each: 0.022, from: "start" },
            ease: "expo.out",
          },
          "-=0.3"
        )
        .to(
          ".showcases-sub",
          { opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.5"
        );

      // ── sticky slide stack ────────────────────────────────
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
          setProgress(self.progress);
        },
      });

      ScrollTrigger.refresh();
    },
    { scope: sectionRef, revertOnUpdate: true }
  );

  return (
    <section className="showcases" id="showcases" ref={sectionRef}>
      {/* intro */}
      <div className="showcases-intro">
        <div className="eyebrow">/03 — showcase</div>
        <h2 className="showcases-title">
          <span className="line">
            <SplitChars text="Landing pages" />
          </span>
          <span className="line">
            <span className="it">
              <SplitChars text="that speak." />
            </span>
          </span>
        </h2>
        <p className="showcases-sub">
          Live work. Click nothing — watch it breathe.
        </p>
      </div>

      {/* scroller → stage (pinned by GSAP) → slides (abs-pos, React-driven transforms) */}
      <div className="showcases-scroller" ref={scrollerRef}>
        <div className="showcases-stage" ref={stageRef}>
          {SHOWCASES.map((s, i) => (
            <div
              key={s.slug}
              className="showcase-slide"
              style={slideStyle(i)}
            >
              <div className="showcase-frame-wrap">
                <iframe
                  src={s.url}
                  title={s.name}
                  scrolling="no"
                  className="showcase-iframe"
                />
                <div className="showcase-info">
                  <div className="showcase-info-left">
                    <span className="showcase-info-name">{s.name}</span>
                    <span className="showcase-info-tag">{s.tag}</span>
                  </div>
                  <div className="showcase-info-right">
                    <span className="showcase-info-year">{s.year}</span>
                    <span className={`dot${s.live ? "" : " muted"}`} />
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="showcase-info-link"
                    >
                      view live ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
