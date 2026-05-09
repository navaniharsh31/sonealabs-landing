"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import SplitChars from "@/components/SplitChars";

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.set(".man-line .char", { y: "110%" });

      const manTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".manifesto",
          start: "top 65%",
          end: "top 10%",
          toggleActions: "play none none reverse",
        },
      });
      manTl.to(".manifesto .eyebrow", {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.utils.toArray<HTMLElement>(".man-line").forEach((line, i) => {
        const chars = line.querySelectorAll(".char");
        manTl.to(
          chars,
          {
            y: "0%",
            duration: 0.95,
            stagger: 0.022,
            ease: "expo.out",
          },
          i === 0 ? "-=0.1" : "-=0.55"
        );
      });

      gsap.from(".founder-grid > *", {
        y: 60,
        opacity: 0,
        duration: 0.95,
        stagger: 0.18,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".founder",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef, revertOnUpdate: true }
  );

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="manifesto" id="manifesto">
        <div className="eyebrow">/05 — manifesto</div>
        <div className="man-stack">
          <div className="man-line">
            <span className="line">
              <SplitChars text="Most agencies bill for 'discovery'." />
            </span>
          </div>
          <div className="man-line">
            <span className="line">
              <SplitChars text="We bill for delivery." />
            </span>
          </div>
        </div>
      </div>

      <div className="founder" id="founder">
        <div className="founder-grid">
          <div className="founder-photo" aria-label="Founder portrait placeholder">
            <span className="photo-meta tl">/founder · 2026</span>
            <span className="monogram">H</span>
            <span className="photo-meta br">engineering studio</span>
          </div>
          <div className="founder-bio">
            <span className="eyebrow">/the founder</span>
            <h2 className="founder-name">Harsh.</h2>
            <p className="founder-role">
              Founder, SoneaLabs.
            </p>
            <p className="founder-text">
              
            </p>
            <p className="founder-text">
              Now leads the engineering team behind Tijara, QDash, RespawnIRL,
              and Zoe — and takes on a couple of client builds at a time when
              the work is interesting and the founders are serious.
            </p>
            <div className="founder-meta">
              <div>
                <span className="lbl">based</span>
                <span className="val">available worldwide</span>
              </div>
              <div>
                <span className="lbl">stack</span>
                <span className="val">Next · Expo · Supabase</span>
              </div>
              <div>
                <span className="lbl">built</span>
                <span className="val">4 products · 2 years</span>
              </div>
              <div>
                <span className="lbl">find me</span>
                <span className="val">
                  <a href="https://www.linkedin.com/in/harshnavani/" target="_blank" rel="noopener noreferrer">linkedin</a> · <a href="https://x.com/navaniharsh31" target="_blank" rel="noopener noreferrer">x</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
