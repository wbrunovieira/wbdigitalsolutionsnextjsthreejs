"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import dynamic from "next/dynamic";
import { FaSearch, FaPencilRuler, FaTools, FaHandHolding } from "react-icons/fa";

import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/contexts/TranslationContext";

gsap.registerPlugin(ScrollTrigger);

const OurApproach: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  const { language } = useLanguage();
  const currentMessages = useTranslations();

  useGSAP(() => {
    if (typeof window === "undefined") return;

    const stepsChildren = stepsRef.current?.children as HTMLCollection;

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

    if (stepsChildren) {
      Array.from(stepsChildren).forEach((child, index) => {
        const nextLine = child.querySelector(".timeline-line") as HTMLDivElement;
        const delay = index * 2;

        gsap.fromTo(
          child,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: stepsRef.current,
              start: "top 80%",
            },
            delay: delay,
          }
        );

        if (nextLine) {
          gsap.fromTo(
            nextLine,
            { scaleX: 0, transformOrigin: "left center" },
            {
              scaleX: 1,
              duration: 0.5,
              ease: "power3.out",
              scrollTrigger: {
                trigger: stepsRef.current,
                start: "top 80%",
              },
              delay: delay + 1,
            }
          );
        }
      });
    }
  }, []);

  const steps = currentMessages.steps || [];

  const icons = [
    <FaSearch className="text-primary text-3xl mb-4" />,
    <FaPencilRuler className="text-yellowcustom text-3xl mb-4" />,
    <FaTools className="text-primary text-3xl mb-4" />,
    <FaHandHolding className="text-yellowcustom text-3xl mb-4" />,
  ];

  return (
    <section ref={sectionRef} className="bg-gray-100 px-6 py-12 lg:px-20 lg:py-24 relative">
      <div className="text-center max-w-3xl mx-auto">
        <h2 ref={titleRef} className="text-3xl lg:text-5xl font-bold text-gray-800 mb-6 mt-8">
          {currentMessages.approachTitle}
        </h2>
        <div className="mt-2 w-96 h-1 bg-gradient-to-r from-yellow-400 to-transparent mx-auto mb-6"></div>
        <p ref={subtitleRef} className="text-lg lg:text-xl text-gray-600 mb-12">
          {currentMessages.approachSubtitle}
        </p>
      </div>
      <div ref={stepsRef} className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-6xl mx-auto relative">
        {steps.map((step: { title: string; description: string }, index: number) => (
          <div key={index} className="flex flex-col items-center text-center bg-white shadow-lg p-6 rounded-lg relative">
            {icons[index]}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
            <p className="text-gray-600 text-sm">{step.description}</p>
            {index < steps.length - 1 && (
              <div className="timeline-line absolute top-1/2 left-full h-1 w-10 bg-gray-300 transform translate-y-1/2"></div>
            )}
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

export default dynamic(() => Promise.resolve(OurApproach), { ssr: false });