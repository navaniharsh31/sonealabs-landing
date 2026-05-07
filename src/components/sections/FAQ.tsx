"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import SplitChars from "@/components/SplitChars";

const faqs = [
  {
    q: "Who builds the products at SoneaLabs?",
    a: "SoneaLabs is a senior engineering studio. We build production-ready MVPs in 28 days using Next.js, React Native (Expo), and Supabase. We act as your technical co-founders.",
  },
  {
    q: "What does the 28-Day MVP include?",
    a: "A fully functional, live product with your first paying users. We handle the architecture, frontend, backend, and Stripe integration. If we don't ship by day 28, you don't pay.",
  },
  {
    q: "What are AI Agents?",
    a: "Custom autonomous workflows designed to replace manual back-office tasks. We integrate Claude and OpenAI directly into your stack to handle repetitive operations.",
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.set(".faq-title .char", { y: "110%" });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".faq-intro",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        })
        .to(".faq-intro .eyebrow", {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        })
        .to(
          ".faq-title .char",
          {
            y: "0%",
            duration: 1.3,
            stagger: { each: 0.022, from: "start" },
            ease: "expo.out",
          },
          "-=0.3"
        );

      gsap.from(".faq-item", {
        y: 60,
        opacity: 0,
        duration: 1.0,
        stagger: 0.15,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".faq-list",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef }
  );

  // Generate Schema Markup
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://sonealabs.com/#organization",
        name: "SoneaLabs",
        url: "https://sonealabs.com",
        logo: "https://sonealabs.com/icon.png",
        sameAs: [
          "https://x.com/navaniharsh31",
          "https://www.linkedin.com/in/harshnavani/",
        ],
      },
      {
        "@type": "Service",
        name: "28-Day MVP Development",
        provider: { "@id": "https://sonealabs.com/#organization" },
        description: "We build production-ready MVPs in 28 days using Next.js and Supabase.",
        offers: {
          "@type": "Offer",
          price: "3000",
          priceCurrency: "USD",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      },
    ],
  };

  return (
    <section className="faq-section" id="faq" ref={sectionRef}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="faq-container">
        <div className="faq-intro">
          <div className="eyebrow">/07 — FAQ</div>
          <h2 className="faq-title">
            <span className="line">
              <SplitChars text="Clear" />
            </span>
            <span className="line">
              <span className="it">
                <SplitChars text="answers." />
              </span>
            </span>
          </h2>
        </div>
        
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div className="faq-item" key={i}>
              <div className="faq-q-wrap">
                <span className="faq-num">0{i + 1}</span>
                <h3 className="faq-q">{faq.q}</h3>
              </div>
              <div className="faq-a-wrap">
                <p className="faq-a">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
