"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import SplitChars from "@/components/SplitChars";
import { SERVICES } from "@/components/data/services";

export default function Services() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.set(".services-title .char", { y: "110%" });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".services-intro",
            start: "top 75%",
            end: "top 25%",
            toggleActions: "play none none reverse",
          },
        })
        .to(".services-intro .eyebrow", {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        })
        .to(
          ".services-title .char",
          {
            y: "0%",
            duration: 1.3,
            stagger: { each: 0.022, from: "start" },
            ease: "expo.out",
          },
          "-=0.3"
        )
        .to(
          ".services-sub",
          { opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.5"
        );

      gsap.from(".svc-card", {
        y: 80,
        opacity: 0,
        duration: 1.0,
        stagger: { each: 0.1, from: "start" },
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef, revertOnUpdate: true }
  );

  return (
    <section className="services" id="services" ref={sectionRef}>
      <div className="services-intro">
        <div className="eyebrow">/04 — services</div>
        <h2 className="services-title">
          <span className="line">
            <SplitChars text="Same team who" />
          </span>
          <span className="line">
            <span className="it">
              <SplitChars text="shipped these." />
            </span>
          </span>
        </h2>
        <p className="services-sub">
          Now for hire. Fixed scope, transparent prices, four-week MVPs — same
          stack we built our own products with.
        </p>
      </div>

      <div className="services-grid-wrap">
        <div className="services-grid">
          {SERVICES.map((s) => (
            <article className={`svc-card ${s.cls}`} key={s.num}>
              <div className="svc-meta">
                <span className="svc-num">{s.num}</span>
                {s.tag && (
                  <span className={`svc-tag${s.tag.lime ? " lime" : ""}`}>
                    {s.tag.label}
                  </span>
                )}
              </div>
              <h3 className="svc-name">
                {s.italic ? <span className="it">{s.name}</span> : s.name}
              </h3>
              <p className="svc-sub">{s.sub}</p>
              <p className="svc-desc">{s.desc}</p>
              <div className="svc-foot">
                <span className="svc-price">
                  {s.priceFrom && <span className="from">{s.priceFrom}</span>}
                  {s.price}
                  {s.priceUnit && <span className="from">{s.priceUnit}</span>}
                </span>
                <a href="#book" className="svc-cta">
                  {s.cta}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
