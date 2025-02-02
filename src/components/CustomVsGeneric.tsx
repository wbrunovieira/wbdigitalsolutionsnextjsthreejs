import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { FaBalanceScale, FaChartLine, FaCopy, FaPaintBrush, FaRocket, FaStar } from "react-icons/fa";
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


      gsap.from(comparisonRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: comparisonRef.current,
          start: "top 90%",
        },
      });
    }
  }, []);

  return (
    <section
        ref={sectionRef}
        className="bg-primary relative flex flex-col items-center px-6 sm:px-8 md:px-12 lg:px-20 py-12 lg:py-24 mt-32"
      >
       <div className="container mx-auto px-4 sm:px-8">

          <div className="relative w-full max-w-3xl mb-12 text-center mx-auto">
            <FaStar className="text-yellow-400 text-4xl mx-auto mb-4" />
            <h2
              ref={titleRef}
              className="text-3xl lg:text-5xl font-bold text-center text-white mb-6"
            >
              {currentMessages.experienceTitleWebsite}
            </h2>
            <span className="text-3xl lg:text-5xl text-yellowcustom font-bold mb-6">   {currentMessages.experienceTitleWebsite2}</span>


            <p
              ref={subtitleRef}
              className="flex text-lg lg:text-xl text-left text-white max-w-3xl mx-auto mt-4 mb-4"
            >
              <FaCopy className="text-yellow-400 text-4xl mr-4 p-2" />
              {currentMessages.experienceSubtitle}
            </p>
            <p
              ref={subtitleRef}
              className="flex text-lg lg:text-xl text-left text-white max-w-3xl mx-auto mt-2"
            >
              <FaPaintBrush className=" text-yellow-400 text-4xl mr-4 p-2" />
              {currentMessages.experienceSubtitle1_1}
            </p>
            <p ref={subtitleRef}  className="flex text-lg lg:text-xl text-left text-white max-w-3xl mx-auto mt-2">
              <FaChartLine className="text-yellow-400 text-4xl mr-4 p-2" />
              {currentMessages.experienceSubtitle1_2} s 
            </p> 
            <p ref={subtitleRef}  className="flex text-lg lg:text-xl text-left text-white max-w-3xl mx-auto mt-2 no-whitespace">
            <FaRocket className="text-yellow-400 text-4xl mr-4 p-2" />
              {currentMessages.experienceSubtitle1_3}
            </p>
            <p ref={subtitleRef}  className="flex text-2xl lg:text-3xl text-left text-yellowcustom max-w-3xl mx-auto mt-4 font-light p-2">
            
              {currentMessages.experienceSubtitle1_4}
            </p>
            <p ref={subtitleRef} className="bg-white w-1/2 mt-4 px-2 py-2 rounded text-lg lg:text-xl text-center text-primary max-w-3xl mx-auto p-2">
              {currentMessages.experienceSubtitle2}
            </p>

          </div>

          <div
            ref={comparisonRef}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl relative"
          >




            {/* Custom Example */}
            <div className="flex flex-col items-center text-left bg-custom-purple shadow-md p-6 rounded-lg relative">
              <FaCopy className="text-yellowcustom text-4xl mb-4" />
              <h3 className="text-xl font-semibold text-white mb-4">
                {currentMessages.genericSolution}
              </h3>
              <p className="text-white mb-6 " dangerouslySetInnerHTML={{ __html: currentMessages.genericDescription }}></p>
              <div className="absolute top-0 left-0 w-1 h-full bg-white"></div>
            </div>

            <div className="flex flex-col items-center text-left bg-custom-purple shadow-md p-6 rounded-lg relative">
              <FaRocket className="text-yellowcustom text-4xl mb-4" />
              <h3 className="text-xl font-semibold text-white mb-4">
                {currentMessages.customSolution}
              </h3>
              <p className="text-white mb-6" dangerouslySetInnerHTML={{ __html: currentMessages.customDescription }}></p>
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-custom-purple to-yellowcustom"></div>
            </div>
          </div>

    </div>
    </section>
  );
};

export default CustomVsGeneric;
