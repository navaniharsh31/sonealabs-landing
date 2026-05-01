"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let firstMove = true;
    const onMove = (e: MouseEvent) => {
      if (firstMove) {
        gsap.to([dot, ring], { opacity: 1, duration: 0.4 });
        firstMove = false;
      }
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power3.out",
      });
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.55,
        ease: "power3.out",
      });
    };

    const expand = (size: number) => () =>
      gsap.to(ring, {
        width: size,
        height: size,
        duration: 0.3,
        ease: "power3.out",
      });

    const enterLink = expand(56);
    const leaveLink = expand(32);
    const enterHero = expand(80);
    const enterCta = expand(96);

    document.addEventListener("mousemove", onMove);

    const links = document.querySelectorAll<HTMLElement>(
      "a, .book, .product-link"
    );
    links.forEach((el) => {
      el.addEventListener("mouseenter", enterLink);
      el.addEventListener("mouseleave", leaveLink);
    });

    const heroText = document.getElementById("heroText");
    heroText?.addEventListener("mouseenter", enterHero);
    heroText?.addEventListener("mouseleave", leaveLink);

    const bigCta = document.querySelector<HTMLElement>(".book-cta-big");
    bigCta?.addEventListener("mouseenter", enterCta);
    bigCta?.addEventListener("mouseleave", leaveLink);

    return () => {
      document.removeEventListener("mousemove", onMove);
      links.forEach((el) => {
        el.removeEventListener("mouseenter", enterLink);
        el.removeEventListener("mouseleave", leaveLink);
      });
      heroText?.removeEventListener("mouseenter", enterHero);
      heroText?.removeEventListener("mouseleave", leaveLink);
      bigCta?.removeEventListener("mouseenter", enterCta);
      bigCta?.removeEventListener("mouseleave", leaveLink);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor" id="cursor" />
      <div ref={ringRef} className="cursor-ring" id="ring" />
    </>
  );
}
