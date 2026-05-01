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
    function raf(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const lenis = lenisRef.current?.lenis;
    const onScroll = () => ScrollTrigger.update();
    lenis?.on("scroll", onScroll);

    return () => {
      gsap.ticker.remove(raf);
      lenis?.off("scroll", onScroll);
    };
  }, []);

  return (
    <JotaiProvider>
      <ReactLenis
        root
        ref={lenisRef}
        options={{ autoRaf: false, lerp: 0.1 }}
      >
        {children}
      </ReactLenis>
    </JotaiProvider>
  );
}
