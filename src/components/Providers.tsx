"use client";

import { ReactNode, useEffect, useRef } from "react";
import { Provider as JotaiProvider } from "jotai";
import { ReactLenis, type LenisRef } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Providers({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;

    // Drive Lenis from GSAP's single RAF loop
    function raf(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Keep ScrollTrigger in sync with Lenis scroll position
    lenis?.on("scroll", ScrollTrigger.update);

    // BFCache: re-init on back/forward nav
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        setTimeout(() => {
          lenisRef.current?.lenis?.start();
          ScrollTrigger.refresh();
        }, 100);
      }
    };
    window.addEventListener("pageshow", onPageShow);

    return () => {
      gsap.ticker.remove(raf);
      lenis?.off("scroll", ScrollTrigger.update);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, []);

  return (
    <JotaiProvider>
      <ReactLenis root ref={lenisRef} options={{ autoRaf: false, lerp: 0.1 }}>
        {children}
      </ReactLenis>
    </JotaiProvider>
  );
}
