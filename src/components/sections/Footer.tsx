"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function Footer() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(() => {
    if (!ref.current) return;
    gsap.from(
      ref.current.querySelectorAll(".foot-grid > *, .foot-bottom > *"),
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <footer className="footer" ref={ref}>
      <div className="foot-grid">
        <div className="foot-brand">
          <div className="logo">
            Sonea<span className="it">L</span>abs
          </div>
          <p className="foot-tag">
            An engineering studio shipping its own products and building yours.
            Open to wherever the founders are.
          </p>
        </div>
        <div>
          <span className="foot-col-label">Site</span>
          <div className="foot-nav">
            <a href="#receipts">work</a>
            <a href="#showcases">showcase</a>
            <a href="#process">process</a>
            <a href="#services">services</a>
            <a href="#about">about</a>
            <a href="#book">book</a>
          </div>
        </div>
        <div>
          <span className="foot-col-label">Elsewhere</span>
          <div className="foot-social">
            <a href="https://x.com/navaniharsh31" target="_blank" rel="noopener noreferrer">x</a>
            <a href="https://www.linkedin.com/in/harshnavani/" target="_blank" rel="noopener noreferrer">linkedin</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">github</a>
            <a href="mailto:harsh@sonealabs.com">email ↗</a>
          </div>
        </div>
      </div>
      <div className="foot-bottom">
        <span className="left">
          <span>© 2026 SoneaLabs</span>
          <span>we ship, of course</span>
        </span>
        <span className="right">
          <span>engineering studio</span>
          <span>v1.0</span>
        </span>
      </div>
    </footer>
  );
}
