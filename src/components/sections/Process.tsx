"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import SplitChars from "@/components/SplitChars";
import ChecklistVisual from "@/components/visuals/ChecklistVisual";
import FramesVisual from "@/components/visuals/FramesVisual";
import TerminalVisual from "@/components/visuals/TerminalVisual";
import BrowserVisual from "@/components/visuals/BrowserVisual";
import { PROCESS_STEPS } from "@/components/data/process";

const VISUALS = {
  checklist: ChecklistVisual,
  frames: FramesVisual,
  terminal: TerminalVisual,
  browser: BrowserVisual,
};

export default function Process() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      // Intro reveal
      gsap.set(".process-title .char", { y: "110%" });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".process-intro",
            start: "top 75%",
            end: "top 25%",
            toggleActions: "play none none reverse",
          },
        })
        .to(".process-intro .eyebrow", {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        })
        .to(
          ".process-title .char",
          {
            y: "0%",
            duration: 1.3,
            stagger: { each: 0.022, from: "start" },
            ease: "expo.out",
          },
          "-=0.3"
        )
        .to(
          ".process-sub",
          { opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.5"
        );

      // Horizontal pin
      const pin = pinRef.current;
      const track = trackRef.current;
      if (!pin || !track) return;

      const dots = pin.querySelectorAll<HTMLElement>(".proc-progress .pd");
      const distance = () => track.scrollWidth - window.innerWidth;
      const panels = PROCESS_STEPS.length;

      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          pin: true,
          pinSpacing: true,
          pinReparent: true,
          start: "top top",
          end: () => "+=" + distance(),
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(Math.floor(self.progress * panels), panels - 1);
            dots.forEach((d, i) => {
              d.classList.toggle("active", i === idx);
            });
          },
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section className="process" id="process" ref={sectionRef}>
      <div className="process-intro">
        <div className="eyebrow">/03 — process</div>
        <h2 className="process-title">
          <span className="line">
            <SplitChars text="From call" />
          </span>
          <span className="line">
            <span className="it">
              <SplitChars text="to commit." />
            </span>
          </span>
        </h2>
        <p className="process-sub">
          Four steps. Four weeks. One developer. Live in production.
        </p>
      </div>

      <div className="process-pin" ref={pinRef}>
        <div className="proc-progress" aria-hidden="true">
          {PROCESS_STEPS.map((_, i) => (
            <span className="pd" data-i={i} key={i} />
          ))}
        </div>

        <div className="process-track" ref={trackRef}>
          {PROCESS_STEPS.map((step, i) => {
            const Visual = VISUALS[step.visual];
            return (
              <div className="process-panel" data-step={i} key={i}>
                <div className="proc-text">
                  <div className="proc-meta">
                    <span className="proc-num">{step.num}</span>
                    <span>{step.when}</span>
                  </div>
                  <h3 className="proc-name">
                    {step.italic ? (
                      <span className="it">{step.name}</span>
                    ) : (
                      step.name
                    )}
                  </h3>
                  <p className="proc-sub">{step.sub}</p>
                  <p className="proc-desc">{step.desc}</p>
                  <div className="proc-deliv">
                    <div>
                      <span className="lbl">deliverable</span>
                      <span className="val">{step.deliverable}</span>
                    </div>
                    <div>
                      <span className="lbl">timing</span>
                      <span className="val">{step.timing}</span>
                    </div>
                  </div>
                </div>
                <div className="proc-visual">
                  <Visual />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
