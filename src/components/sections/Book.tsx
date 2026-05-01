"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import SplitChars from "@/components/SplitChars";

export default function Book() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const ctaRef = useRef<HTMLAnchorElement | null>(null);

  useGSAP(
    () => {
      gsap.set(".book-title .char", { y: "110%" });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".book-stage",
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        })
        .to(".book-section .eyebrow", {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        })
        .to(
          ".book-title .char",
          {
            y: "0%",
            duration: 1.3,
            stagger: { each: 0.025, from: "start" },
            ease: "expo.out",
          },
          "-=0.3"
        )
        .to(
          ".book-sub",
          { opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.5"
        )
        .to(
          ".book-cta-wrap",
          { opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.5"
        )
        .to(
          ".book-alt",
          { opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        );
    },
    { scope: sectionRef }
  );

  // Magnetic big CTA
  useEffect(() => {
    const cta = ctaRef.current;
    if (!cta) return;

    const onMove = (e: MouseEvent) => {
      const r = cta.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      gsap.to(cta, {
        x: x * 0.18,
        y: y * 0.18,
        duration: 0.4,
        ease: "power3.out",
      });
    };
    const onLeave = () => {
      gsap.to(cta, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.4)",
      });
    };

    cta.addEventListener("mousemove", onMove);
    cta.addEventListener("mouseleave", onLeave);

    return () => {
      cta.removeEventListener("mousemove", onMove);
      cta.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section className="book-section" id="book" ref={sectionRef}>
      <div className="book-stage">
        <div className="eyebrow">/06 — book</div>
        <h2 className="book-title">
          <span className="line">
            <SplitChars text="Let's" />
          </span>
          <span className="line">
            <span className="it">
              <SplitChars text="build something." />
            </span>
          </span>
        </h2>
        <p className="book-sub">
          60 minutes on Cal.com. No deck required, no pitch needed — just bring
          the problem and we&apos;ll figure out if it&apos;s a fit.
        </p>
        <div className="book-cta-wrap">
          <a
            href="https://cal.com/sonealabs"
            className="book-cta-big"
            ref={ctaRef}
          >
            Book on Cal.com <span className="arrow">↗</span>
          </a>
        </div>
        <p className="book-alt">
          Or email <a href="mailto:hi@sonealabs.com">hi@sonealabs.com</a> ·
          response within 24h
        </p>
      </div>
    </section>
  );
}
