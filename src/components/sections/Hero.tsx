"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import SplitChars from "@/components/SplitChars";

// 4 visually distinct images, one per horizontal stripe of the headline.
const HERO_IMAGES = [
  "https://images.pexels.com/photos/18541712/pexels-photo-18541712.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/6985045/pexels-photo-6985045.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/7130548/pexels-photo-7130548.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/18541707/pexels-photo-18541707.jpeg?auto=compress&cs=tinysrgb&w=1600",
];

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLHeadingElement | null>(null);
  const overlayMaskRef = useRef<HTMLDivElement | null>(null);
  const tickerRef = useRef<HTMLDivElement | null>(null);
  const bookRef = useRef<HTMLAnchorElement | null>(null);

  // Preload all images, then apply as a 4-stripe multi-background.
  useEffect(() => {
    HERO_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
    if (overlayRef.current) {
      overlayRef.current.style.backgroundImage = HERO_IMAGES.map(
        (u) => `url('${u}')`
      ).join(", ");
    }
  }, []);

  // Mouse-tracked headline mask. Set vars on documentElement so they
  // resolve regardless of where var() is read from, and use rAF batching
  // so we don't write the same property multiple times per frame.
  useEffect(() => {
    const mask = overlayMaskRef.current;
    if (!mask) return;

    const setX = gsap.quickSetter(mask, "--mx", "px") as (v: number) => void;
    const setY = gsap.quickSetter(mask, "--my", "px") as (v: number) => void;

    let rafId = 0;
    let pendingX = 0;
    let pendingY = 0;
    const flush = () => {
      setX(pendingX);
      setY(pendingY);
      rafId = 0;
    };

    const onMove = (e: MouseEvent) => {
      const rect = mask.getBoundingClientRect();
      pendingX = e.clientX - rect.left;
      pendingY = e.clientY - rect.top;
      if (!rafId) rafId = requestAnimationFrame(flush);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

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
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.to(".hero .nav", { opacity: 1, duration: 0.6, ease: "power2.out" }, 0)
          .to(
            ".hero .headline.base .char",
            { y: "0%", duration: 1.4, stagger: 0.025 },
            0.25
          )
          .to(
            ".hero .headline.overlay .char",
            { y: "0%", duration: 1.4, stagger: 0.025 },
            0.25
          )
          .to(
            ".hero .headline.base .reveal",
            { y: "0%", duration: 1.1, ease: "power4.out" },
            "-=0.85"
          )
          .to(
            ".hero .headline.overlay .reveal",
            { y: "0%", duration: 1.1, ease: "power4.out" },
            "<"
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
          <a href="#book" className="book" ref={bookRef}>
            book ↗
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
        <div className="overlay-mask" ref={overlayMaskRef} aria-hidden="true">
          <h1 className="headline overlay" ref={overlayRef}>
            <span className="line">
              <SplitChars text="We build products" />
            </span>
            <span className="italic-line">
              <span className="reveal">people actually use.</span>
            </span>
          </h1>
        </div>
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
