import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaRobot,
  FaFileAlt,
  FaChartLine,
  FaBullhorn,
  FaBook,
  FaUsers,
  FaCode,
  FaMoneyBillWave,
  FaShieldAlt,
} from "react-icons/fa";
import { useTranslations } from "@/contexts/TranslationContext";  
import { useLanguage } from "@/contexts/LanguageContext";      

gsap.registerPlugin(ScrollTrigger);

interface ExampleCard {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const AdvancedLLMSection: React.FC = () => {
  const { language } = useLanguage();
  const currentMessages = useTranslations();

  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const examples: ExampleCard[] = currentMessages.advancedLLMExamples.map(
    (item: any, index: number) => ({
      title: item.title,
      description: item.description,
      icon: (() => {
        switch (item.icon) {
          case "FaRobot":
            return <FaRobot className="text-5xl text-blue-500 mb-4" />;
          case "FaFileAlt":
            return <FaFileAlt className="text-5xl text-green-500 mb-4" />;
          case "FaChartLine":
            return <FaChartLine className="text-5xl text-pink-500 mb-4" />;
          case "FaBullhorn":
            return <FaBullhorn className="text-5xl text-yellow-400 mb-4" />;
          case "FaBook":
            return <FaBook className="text-5xl text-red-500 mb-4" />;
          case "FaUsers":
            return <FaUsers className="text-5xl text-blue-400 mb-4" />;
          case "FaCode":
            return <FaCode className="text-5xl text-purple-400 mb-4" />;
          case "FaMoneyBillWave":
            return <FaMoneyBillWave className="text-5xl text-green-400 mb-4" />;
          case "FaShieldAlt":
            return <FaShieldAlt className="text-5xl text-indigo-400 mb-4" />;
          default:
            return <FaRobot className="text-5xl text-blue-500 mb-4" />;
        }
      })(),
    })
  );

  useGSAP(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top bottom",
            end: "top center",
            toggleActions: "play none none reverse",
          },
        }
      );


      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=100",
              end: "top center",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="advanced-llms-heading"
      className="relative z-10 bg-gradient-to-br from-primary via-primary to-custom-purple py-20 px-6 text-white mt-32 min-h-[1200px] sm:min-h-[1000px]"
      role="region"
    >

      <div className="absolute top-0 left-0 w-full z-0 pointer-events-none">
        <svg
          className="block h-16 sm:h-32 w-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path
            d="M321.39,56.68C161.77,83.28,0,110.54,0,110.54V0H1200v48.27
               C1108.74,57.71,905.87,77.73,724,77.73,545.19,77.73,497.75,30.54,321.39,56.68Z"
            className="fill-current text-primary"
          />
        </svg>
      </div>


      <div className="max-w-6xl mx-auto h-full">
        <div className="text-center mb-16">
          <h2
            id="advanced-llms-heading"
            ref={headingRef}
            className="text-4xl sm:text-5xl font-extrabold text-yellow-400 mb-4"
          >
            {currentMessages.advancedLLMTitle}
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            {currentMessages.advancedLLMSubtitle}
          </p>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full h-full">
          {examples.map((example, index) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="group bg-primary rounded-2xl shadow-lg transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl p-8 flex flex-col items-center text-center relative overflow-hidden"
            >

              <div className="transform transition duration-300 group-hover:rotate-3 group-hover:scale-105">
                {example.icon}
              </div>
              <h3 className="text-xl font-semibold mt-4 mb-2 text-white tracking-wide">
                {example.title}
              </h3>
              <p className="text-gray-300 text-sm">{example.description}</p>


              <div className="absolute inset-0 bg-gradient-to-r from-custom-purple to-transparent opacity-0 group-hover:opacity-20 transition duration-300 rounded-2xl" />
            </div>
          ))}
        </div>
      </div>


      <div className="absolute bottom-0 left-0 w-full z-0 pointer-events-none">
        <svg
          className="block h-16 sm:h-32 w-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <defs>
            <linearGradient
              id="shape-divider-gradient"
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <stop offset="0%" stopColor="#350545" />
              <stop offset="70%" stopColor="#350545" />
              <stop offset="100%" stopColor="#792990" />
            </linearGradient>
          </defs>
          <path
            d="M321.39,56.68C161.77,83.28,0,110.54,0,110.54V120H1200V71.73
               C1108.74,57.71,905.87,37.73,724,37.73,545.19,37.73,497.75,84.92,321.39,56.68Z"
            fill="url(#shape-divider-gradient)"
          />
        </svg>
      </div>
    </section>
  );
};

export default AdvancedLLMSection;