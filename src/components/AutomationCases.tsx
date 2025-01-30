import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaWarehouse, FaRobot, FaChartLine, FaNetworkWired, FaCheckCircle, FaBullhorn, FaTasks, FaUserTie } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/contexts/TranslationContext";

gsap.registerPlugin(ScrollTrigger);

const SuccessCases: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const { language } = useLanguage();
  const currentMessages = useTranslations();

  useGSAP(() => {
    gsap.fromTo(
      titleRef.current,
      { x: -50, y: 0 },
      {
        x: 0,
        y: 0,
        ease: "power1.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
          end: "bottom 50%",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      subtitleRef.current,
      { x: 25, y: 0 },
      {
        x: 0,
        y: 0,
        ease: "power1.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 100%",
          end: "bottom 55%",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 100%",
          end: "bottom 20%",
          scrub: true,
        },
      }
    );

    if (cardsRef.current) {
      cardsRef.current.forEach((card, index) => {
        if (card) {
          const directions = ["-100%", "100%", "-50%", "50%"];
          const xOffset = directions[index % directions.length];
          const zOffset = (index % 2 === 0 ? -150 : -50) + index * 10;
          const duration = 1.5 + index * 0.2;
          const scale = 0.1 + index * 0.1;

          gsap.fromTo(
            card,
            { opacity: 0, scale: scale, z: zOffset, x: xOffset },
            {
              opacity: 1,
              z: 0,
              x: "0%",
              scale: 1,
              duration: duration,
              ease: "power3.out",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 100%",
                end: "bottom 20%",
                scrub: true,
                toggleActions: "play reverse play reverse",
              },
            }
          );
        }
      });
    }
  }, []);

  const cases = [
    {
      title: currentMessages.stockManagementTitle,
      description: currentMessages.stockManagementDesc,
      icon: <FaWarehouse className="text-4xl text-custom-purple mb-4 mx-auto" />,
    },
    {
      title: currentMessages.chatbotSupportTitle,
      description: currentMessages.chatbotSupportDesc,
      icon: <FaRobot className="text-4xl text-custom-purple mb-4 mx-auto" />,
    },
    {
      title: currentMessages.financialAutomationTitle,
      description: currentMessages.financialAutomationDesc,
      icon: <FaChartLine className="text-4xl text-custom-purple mb-4 mx-auto" />,
    },
    {
      title: currentMessages.systemIntegrationTitle,
      description: currentMessages.systemIntegrationDesc,
      icon: <FaNetworkWired className="text-4xl text-custom-purple mb-4 mx-auto" />,
    },
    {
      title: currentMessages.qualityControlTitle,
      description: currentMessages.qualityControlDesc,
      icon: <FaCheckCircle className="text-4xl text-custom-purple mb-4 mx-auto" />,
    },
    {
      title: currentMessages.marketingAutomationTitle,
      description: currentMessages.marketingAutomationDesc,
      icon: <FaBullhorn className="text-4xl text-custom-purple mb-4 mx-auto" />,
    },
    {
      title: currentMessages.projectManagementTitle,
      description: currentMessages.projectManagementDesc,
      icon: <FaTasks className="text-4xl text-custom-purple mb-4 mx-auto" />,
    },
    {
      title: currentMessages.hrAutomationTitle,
      description: currentMessages.hrAutomationDesc,
      icon: <FaUserTie className="text-4xl text-custom-purple mb-4 mx-auto" />,
    },
  ];

  return (
    <div
      ref={containerRef}
      className="py-20 px-6 bg-gradient-to-br from-primary via-primary to-custom-purple text-white overflow-hidden mt-32"
    >
      <div className="text-center mb-12">
        <h2
          ref={titleRef}
          className="text-4xl sm:text-5xl font-bold text-center mb-4"
        >
          {currentMessages.successCasesTitle}
        </h2>
        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl text-gray-300"
        >
          {currentMessages.successCasesSubtitle}
        </p>
        <div ref={lineRef} className="mt-2 w-full h-1 bg-gradient-to-r from-yellow-400 to-transparent mx-auto mb-6"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mt-8">
        {cases.map((caseItem, index) => (
          <div
            key={index}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-gray-800"
          >
            {caseItem.icon}
            <h3 className="text-xl font-semibold mb-4 text-primary">
              {caseItem.title}
            </h3>
            <p className="text-gray-600 text-sm">{caseItem.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuccessCases;