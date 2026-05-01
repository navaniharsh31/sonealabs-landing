"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function Footer() {
  const ref = useRef<HTMLElement | null>(null);
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const ist = new Date(
        now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
      );
      const h = String(ist.getHours()).padStart(2, "0");
      const m = String(ist.getMinutes()).padStart(2, "0");
      setTime(`${h}:${m}`);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

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
            Mumbai · Dubai · open to wherever the founders are.
          </p>
        </div>
        <div>
          <span className="foot-col-label">Site</span>
          <div className="foot-nav">
            <a href="#receipts">work</a>
            <a href="#process">process</a>
            <a href="#services">services</a>
            <a href="#about">about</a>
            <a href="#book">book</a>
          </div>
        </div>
        <div>
          <span className="foot-col-label">Elsewhere</span>
          <div className="foot-social">
            <a href="https://x.com">x</a>
            <a href="https://linkedin.com">linkedin</a>
            <a href="https://github.com">github</a>
            <a href="mailto:hi@sonealabs.com">email ↗</a>
          </div>
        </div>
      </div>
      <div className="foot-bottom">
        <span className="left">
          <span>© 2026 SoneaLabs</span>
          <span>we ship, of course</span>
        </span>
        <span className="right">
          <span>mumbai · {time} ist</span>
          <span>v1.0</span>
        </span>
      </div>
    </footer>
  );
}
