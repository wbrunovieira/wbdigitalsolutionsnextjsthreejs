import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaNetworkWired, FaPeopleCarry, FaBrain, FaHandHoldingUsd } from "react-icons/fa";
import { useTranslations } from "@/contexts/TranslationContext";
import { useLanguage } from "@/contexts/LanguageContext";


const Player = dynamic(
  () =>
    import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  {
    ssr: false,
  }
);

gsap.registerPlugin(ScrollTrigger);

type IconKey = "FaNetworkWired" | "FaPeopleCarry" | "FaBrain" | "FaHandHoldingUsd";

const iconMapper: Record<IconKey, JSX.Element> = {
  FaNetworkWired: <FaNetworkWired className="text-4xl text-blue-400" />,
  FaPeopleCarry: <FaPeopleCarry className="text-4xl text-green-400" />,
  FaBrain: <FaBrain className="text-4xl text-purple-400" />,
  FaHandHoldingUsd: <FaHandHoldingUsd className="text-4xl text-yellow-400" />,
};

const AIAgentFlowSection: React.FC = () => {
  const { language } = useLanguage();
  const currentMessages = useTranslations();

  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const agentCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 90%",
          },
        }
      );

      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 90%",
          },
        }
      );

      // Animação dos cards
      agentCardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 95%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const agentFlowItems = (currentMessages.agentFlowItems || []).map((item: any) => {
    const iconKey = item.icon as IconKey;
    return {
      icon: iconMapper[iconKey] || <FaNetworkWired className="text-4xl text-blue-400" />,
      title: item.title,
      description: item.description,
    };
  });

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 bg-white overflow-hidden rounded"
      aria-labelledby="ai-agent-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            id="ai-agent-heading"
            ref={titleRef}
            className="text-4xl sm:text-5xl font-extrabold mb-4 text-primary"
          >
            {currentMessages.agentTitle}
          </h2>
          <div className="mt-2 w-1/2 h-[2px] bg-gradient-to-r from-yellow-400 to-transparent mx-auto mb-6" />
          <div className="flex justify-center mt-4 mb-8">
            {/* Aqui usamos o Player importado dinamicamente */}
            <Player
              src="/icons/ai-brain.json"
              className="w-40 h-40"
              background="transparent"
              speed={1}
              loop
              autoplay
            />
          </div>
          <div ref={textRef}>
            <p className="text-primary text-lg max-w-3xl mx-auto leading-relaxed">
              {currentMessages.agentSubtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {agentFlowItems.map((item: any, index: number) => (
            <div
              key={index}
              ref={(el) => {
                agentCardsRef.current[index] = el;
              }}
              className="bg-primary p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-4 transform group-hover:scale-110 transition duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                {item.title}
              </h3>
              <p className="text-sm text-white leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIAgentFlowSection;