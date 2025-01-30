"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaRocket, FaChartLine, FaBolt, FaExpand } from "react-icons/fa";
import dynamic from "next/dynamic";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/contexts/TranslationContext";

gsap.registerPlugin(ScrollTrigger);

const Differentiators: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);

  const currentMessages = useTranslations();

  useGSAP(() => {
    if (typeof window === "undefined") return;

    gsap.from(titleRef.current, {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 80%",
      },
    });

    gsap.from(subtitleRef.current, {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: subtitleRef.current,
        start: "top 80%",
      },
    });

    if (highlightsRef.current) {
      gsap.fromTo(
        highlightsRef.current.children,
        { opacity: 0, x: (i) => (i % 2 === 0 ? -100 : 100), rotate: -10 },
        {
          opacity: 1,
          x: 0,
          rotate: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.3,
          scrollTrigger: {
            trigger: highlightsRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  const highlights = [
    {
      icon: <FaBolt className="text-yellowcustom text-5xl" />,
      title: currentMessages.differentiatorsSpeedTitle,
      description: currentMessages.differentiatorsSpeedDesc,
    },
    {
      icon: <FaRocket className="text-yellowcustom text-5xl" />,
      title: currentMessages.differentiatorsInteractivityTitle,
      description: currentMessages.differentiatorsInteractivityDesc,
    },
    {
      icon: <FaChartLine className="text-yellowcustom text-5xl" />,
      title: currentMessages.differentiatorsSEOTitle,
      description: currentMessages.differentiatorsSEODesc,
    },
    {
      icon: <FaExpand className="text-yellowcustom text-5xl" />,
      title: currentMessages.differentiatorsScalabilityTitle,
      description: currentMessages.differentiatorsScalabilityDesc,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-r from-primary via-custom-purple to-primary px-6 py-16 lg:px-20 lg:py-24"
    >
      <div className="text-center max-w-3xl mx-auto">
        <h2
          ref={titleRef}
          className="text-4xl lg:text-5xl font-bold text-white mb-6 p-2"
        >
          {currentMessages.differentiatorsTitle }
        </h2>
        <div className="mt-2 w-96 h-1 bg-gradient-to-r from-yellow-400 to-transparent mx-auto mb-6"></div>
        <p
          ref={subtitleRef}
          className="text-lg lg:text-xl text-y mb-12 text-yellowcustom"
        >
          {currentMessages.differentiatorsSubtitle}
        </p>
      </div>

      <div
        ref={highlightsRef}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto relative p-4"
      >
        {highlights.map((highlight, index) => (
          <div
            key={index}
            className={`relative flex flex-col items-center text-center bg-white shadow-lg p-8 rounded-lg ${
              index % 2 === 0 ? "lg:ml-auto" : "lg:mr-auto"
            }`}
            style={{ transform: `rotate(${index % 2 === 0 ? -5 : 5}deg)` }}
          >
            <div className="absolute -top-4">{highlight.icon}</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              {highlight.title}
            </h3>
            <p className="text-gray-600">{highlight.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default dynamic(() => Promise.resolve(Differentiators), { ssr: false });