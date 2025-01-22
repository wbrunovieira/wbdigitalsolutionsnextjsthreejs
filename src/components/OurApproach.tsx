"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import dynamic from "next/dynamic"; // Importa o método dynamic
import { FaSearch, FaPencilRuler, FaTools, FaHandHolding } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const OurApproach: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (typeof window === "undefined") return; // Verifica se estamos no cliente

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
              duration: 1,
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

  const steps = [
    { icon: <FaSearch className="text-primary text-3xl mb-4" />, title: "Discovery", description: "Understanding your audience." },
    { icon: <FaPencilRuler className="text-yellowcustom text-3xl mb-4" />, title: "Exclusive Design", description: "Customized UI/UX." },
    { icon: <FaTools className="text-primary text-3xl mb-4" />, title: "Cutting-Edge Tech", description: "Modern, secure solutions." },
    { icon: <FaHandHolding className="text-yellowcustom text-3xl mb-4" />, title: "Support", description: "Ongoing assistance." },
  ];

  return (
    <section ref={sectionRef} className="bg-gray-100 px-6 py-12 lg:px-20 lg:py-24 relative">
      <div className="text-center max-w-3xl mx-auto">
        <h2 ref={titleRef} className="text-3xl lg:text-5xl font-bold text-gray-800 mb-6">
          Each detail tailored for your business.
        </h2>
        <div className="mt-2 w-96 h-1 bg-gradient-to-r from-yellow-400 to-transparent mx-auto mb-6"></div>
        <p ref={subtitleRef} className="text-lg lg:text-xl text-gray-600 mb-12">
          We combine creativity and cutting-edge technology to create websites that impress.
        </p>
      </div>
      <div ref={stepsRef} className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-6xl mx-auto relative">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center bg-white shadow-lg p-6 rounded-lg relative">
            {step.icon}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
            <p className="text-gray-600 text-sm">{step.description}</p>
               {index < steps.length - 1 && (
              <div className="timeline-line absolute top-1/2 left-full h-1 w-10 bg-gray-300 transform translate-y-1/2"></div>
          )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default dynamic(() => Promise.resolve(OurApproach), { ssr: false });