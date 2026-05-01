"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitChars from "@/components/SplitChars";
import Billboard from "@/components/visuals/Billboard";
import { PRODUCTS } from "@/components/data/products";

export default function Receipts() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const textTrackRef = useRef<HTMLDivElement | null>(null);
  const visualTrackRef = useRef<HTMLDivElement | null>(null);
  const currentRef = useRef<HTMLSpanElement | null>(null);
  const fillRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      // Intro reveal
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

      // Sticky scroll: both tracks translate up
      const text = textTrackRef.current;
      const visual = visualTrackRef.current;
      const scroller = scrollerRef.current;
      const stage = stageRef.current;
      const N = PRODUCTS.length;

      if (text && visual && scroller && stage) {
        const distance = () => (N - 1) * window.innerHeight;

        gsap.to([text, visual], {
          y: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: scroller,
            pin: stage,
            pinSpacing: true,
            start: "top top",
            end: () => "+=" + distance(),
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.min(Math.floor(self.progress * N), N - 1);
              if (currentRef.current) {
                currentRef.current.textContent = String(idx + 1).padStart(2, "0");
              }
              if (fillRef.current) {
                fillRef.current.style.width = `${self.progress * 100}%`;
              }
            },
          },
        });

        // Subtle inner-parallax on each billboard mark
        const marks = visual.querySelectorAll<HTMLElement>(".billboard-mark");
        marks.forEach((mark, i) => {
          gsap.fromTo(
            mark,
            { y: 50 },
            {
              y: -50,
              ease: "none",
              scrollTrigger: {
                trigger: scroller,
                start: () =>
                  "top+=" + Math.max(0, (i - 0.5) * window.innerHeight) + " top",
                end: () => "top+=" + (i + 0.5) * window.innerHeight + " top",
                scrub: 1,
                invalidateOnRefresh: true,
              },
            }
          );
        });
      }

      ScrollTrigger.refresh();
    },
    { scope: sectionRef }
  );

  return (
    <section className="receipts" id="receipts" ref={sectionRef}>
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
          <div className="rs-pane rs-text-pane">
            <div className="rs-track" ref={textTrackRef}>
              {PRODUCTS.map((p) => (
                <div className="rs-panel" key={p.slug}>
                  <div className="rs-meta">
                    <span className="rs-num">{p.num}</span>
                    <span className="rs-status">
                      <span className={`dot${p.status.muted ? " muted" : ""}`} />
                      {p.status.label}
                    </span>
                  </div>
                  <h3
                    className={`product-name${p.italic ? " italic" : ""}`}
                  >
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
          </div>

          <div className="rs-pane rs-visual-pane">
            <div className="rs-track" ref={visualTrackRef}>
              {PRODUCTS.map((p) => (
                <Billboard key={p.slug} product={p} />
              ))}
            </div>
          </div>

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
