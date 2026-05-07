"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import SplitChars from "@/components/SplitChars";

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const tickerRef = useRef<HTMLDivElement | null>(null);
  const bookRef = useRef<HTMLAnchorElement | null>(null);

  // Magnetic book CTA
  useEffect(() => {
    const cta = bookRef.current;
    if (!cta) return;
    const onMove = (e: MouseEvent) => {
      const r = cta.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      gsap.to(cta, {
        x: x * 0.45,
        y: y * 0.45,
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

  // Hero intro timeline + infinite ticker
  useGSAP(
    () => {
      const ready =
        document.fonts && document.fonts.ready
          ? Promise.race([
              document.fonts.ready,
              new Promise((r) => setTimeout(r, 1500)),
            ])
          : Promise.resolve();

      ready.then(() => {
        gsap.set(".hero .headline.base .char, .hero .headline.base .reveal", {
          y: "138%",
        });

        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.to(".hero .nav", { opacity: 1, duration: 0.6, ease: "power2.out" }, 0)
          .to(
            ".hero .headline.base .char",
            { y: "0%", duration: 1.4, stagger: 0.025 },
            0.25
          )
          .to(
            ".hero .headline.base .reveal",
            { y: "0%", duration: 1.1, ease: "power4.out" },
            "-=0.85"
          )
          .to(
            ".hero-sub",
            { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" },
            "-=0.6"
          )
          .to(
            ".ticker-wrap",
            { opacity: 1, duration: 0.6, ease: "power2.out" },
            "-=0.6"
          );

        // Infinite ticker
        const ticker = tickerRef.current;
        if (ticker) {
          const half = ticker.scrollWidth / 2;
          ticker.innerHTML += ticker.innerHTML;
          gsap.set(ticker, { x: 0 });
          const tween = gsap.to(ticker, {
            x: -half,
            duration: 40,
            ease: "none",
            repeat: -1,
          });
          const wrap = ticker.parentElement;
          const slow = () => tween.timeScale(0.15);
          const fast = () => tween.timeScale(1);
          wrap?.addEventListener("mouseenter", slow);
          wrap?.addEventListener("mouseleave", fast);
        }
      });
    },
    { scope: heroRef }
  );

  return (
    <section className="hero" ref={heroRef}>
      <nav className="nav">
        <div className="logo">
          Sonea<span className="it">L</span>abs
        </div>
        <div className="nav-links">
          <a href="#receipts">work</a>
          <a href="#process">process</a>
          <a href="#services">services</a>
          <a href="#book" className="book" ref={bookRef}>
            start your build ↗
          </a>
        </div>
      </nav>

      <div className="hero-text" id="heroText">
        <h1 className="headline base">
          <span className="line">
            <SplitChars text="We build products" />
          </span>
          <span className="italic-line">
            <span className="reveal">people actually use.</span>
          </span>
        </h1>
        <p className="hero-sub">
          We take your idea to a live MVP with paying users in 28 days. Fixed
          scope, senior execution, and a guarantee that actually means
          something.
        </p>
      </div>

      <div className="ticker-wrap">
        <div className="ticker" ref={tickerRef}>
          <span className="ticker-item">
            <span className="dot" />
            tijara — live · gcc trade saas
          </span>
          <span className="sep" />
          <span className="ticker-item">
            <span className="dot" />
            qdash — live · mumbai nightlife
          </span>
          <span className="sep" />
          <span className="ticker-item muted">
            <span className="dot muted" />
            respawnirl — soon · gaming recovery
          </span>
          <span className="sep" />
          <span className="ticker-item">
            <span className="dot" />
            zoe ai — app store · therapy ai
          </span>
          <span className="sep" />
          <span className="ticker-item muted">
            <span className="dot muted" />
            newtrace · devartha · onterra — client work shipped
          </span>
          <span className="sep" />
        </div>
      </div>
    </section>
  );
}
