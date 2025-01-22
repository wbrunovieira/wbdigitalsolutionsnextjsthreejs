import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { FaCopy, FaRocket, FaStar } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/contexts/TranslationContext";

const CustomVsGeneric: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);

  const { language } = useLanguage();
  const currentMessages = useTranslations();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ScrollTrigger = require("gsap/ScrollTrigger").default;
      gsap.registerPlugin(ScrollTrigger);

      // Title animation
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

      // Subtitle animation
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

      // Comparison section animation
      gsap.from(comparisonRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: comparisonRef.current,
          start: "top 75%",
        },
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="bg-primary relative flex flex-col items-center px-6 py-12 lg:px-20 lg:py-24 ">
       <div className="relative w-full max-w-3xl mb-12 text-center">
        <FaStar className="text-yellow-400 text-4xl mx-auto mb-4" />
        <h2
          ref={titleRef}
          className="text-3xl lg:text-5xl font-bold text-center text-white mb-6"
        >
          {currentMessages.experienceTitleWebsite}
        </h2>
        <span className="text-3xl lg:text-5xl text-yellowcustom font-bold">   {currentMessages.experienceTitleWebsite2}</span>
        <div className="mt-2 w-96 h-1 bg-gradient-to-r from-yellow-400 to-transparent mx-auto mb-6"></div>
        <p
          ref={subtitleRef}
          className="text-lg lg:text-xl text-center text-white max-w-3xl mx-auto"
        >
          {currentMessages.experienceSubtitle}
        </p>
        <p ref={subtitleRef} className="bg-white w-1/2 mt-2 px-2 py-2 rounded text-lg lg:text-xl text-center text-primary max-w-3xl mx-auto">
          {currentMessages.experienceSubtitle2}
        </p>
      </div>

      <div
        ref={comparisonRef}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl relative"
      >
        {/* Modern Divider */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full lg:w-1 lg:h-full bg-gradient-to-b from-gray-300 to-transparent lg:mx-4"></div>
        </div>

        {/* Generic Example */}
        <div className="flex flex-col items-center text-center bg-custom-purple shadow-md p-6 rounded-lg relative">
          <FaCopy className="text-yellowcustom text-4xl mb-4" />
          <h3 className="text-xl font-semibold text-white mb-4">
            {currentMessages.genericSolution}
          </h3>
          <p className="text-white mb-6">
            {currentMessages.genericDescription }
          </p>
          <div className="absolute top-0 left-0 w-1 h-full bg-white"></div>
        </div>

        {/* Custom Example */}
        <div className="flex flex-col items-center text-center bg-custom-purple shadow-md p-6 rounded-lg relative">
          <FaRocket className="text-yellowcustom text-4xl mb-4" />
          <h3 className="text-xl font-semibold text-white mb-4">
            {currentMessages.customSolution}
          </h3>
          <p className="text-white mb-6">
            {currentMessages.customDescription}
          </p>
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-custom-purple to-yellowcustom"></div>
        </div>
      </div>
    </section>
  );
};

export default CustomVsGeneric;
