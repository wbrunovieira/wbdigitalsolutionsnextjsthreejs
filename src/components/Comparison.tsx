"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import dynamic from "next/dynamic";
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/contexts/TranslationContext";

gsap.registerPlugin(ScrollTrigger);

const Comparison: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { language } = useLanguage();
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

    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.3,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  const comparisonData = [
    {
      icon: <FaExclamationTriangle className="text-red-500 text-5xl" />,
      title: currentMessages.genericTitle,
      speed: currentMessages.genericSpeed,
      security: currentMessages.genericSecurity,
      experience: currentMessages.genericExperience,
    },
    {
      icon: <FaCheckCircle className="text-green-500 text-5xl" />,
      title: currentMessages.customTitle,
      speed: currentMessages.customSpeed,
      security: currentMessages.customSecurity,
      experience: currentMessages.customExperience,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-gray-100 px-6 py-12 lg:px-20 lg:py-24 relative mt-4"
    >
      <div className="text-center max-w-3xl mx-auto">
        <h2
          ref={titleRef}
          className="text-3xl lg:text-5xl font-bold text-gray-800 mb-6 mt-8"
        >
          {currentMessages.comparisonTitle}
        </h2>
        <p
          ref={subtitleRef}
          className="text-lg lg:text-xl text-yellowcustom mb-12"
        >
          {currentMessages.comparisonSubtitle}
        </p>
      </div>

      <div
        ref={contentRef}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
      >
        {comparisonData.map((data, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-white shadow-lg p-8 rounded-lg"
          >
            {data.icon}
            <h3 className="text-2xl font-semibold text-gray-800 mt-4 mb-6">
              {data.title}
            </h3>
            <div className="space-y-4">
              <p className="text-gray-600">
                <strong>{currentMessages.speedLabel}:</strong> {data.speed}
              </p>
              <p className="text-gray-600">
                <strong>{currentMessages.securityLabel}:</strong> {data.security}
              </p>
              <p className="text-gray-600">
                <strong>{currentMessages.experienceLabel}:</strong> {data.experience}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform rotate-180">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-[calc(149%+1.3px)] h-[60px] transform scale-x-[-1]"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="fill-[#792990]"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default dynamic(() => Promise.resolve(Comparison), { ssr: false });