import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const Player = dynamic(
  () =>
    import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  {
    ssr: false,
  }
);

import {
  FaSearch,
  FaEye,
  FaFileAlt,
  FaLock,
  FaCar,
  FaQrcode,
  FaCogs,
  FaUsers,
  FaStore,
  FaRobot,
} from "react-icons/fa";
import { useTranslations } from "@/contexts/TranslationContext";
import { useLanguage } from "@/contexts/LanguageContext";
import dynamic from "next/dynamic";

gsap.registerPlugin(ScrollTrigger);

interface VisionOption {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const iconMapper: Record<string, React.ReactNode> = {
  FaSearch: <FaSearch className="text-4xl text-blue-400" />,
  FaEye: <FaEye className="text-4xl text-green-400" />,
  FaFileAlt: <FaFileAlt className="text-4xl text-yellow-400" />,
  FaLock: <FaLock className="text-4xl text-red-400" />,
  FaCar: <FaCar className="text-4xl text-indigo-400" />,
  FaQrcode: <FaQrcode className="text-4xl text-gray-300" />,
  FaCogs: <FaCogs className="text-4xl text-green-500" />,
  FaUsers: <FaUsers className="text-4xl text-blue-300" />,
  FaStore: <FaStore className="text-4xl text-pink-400" />,
  FaRobot: <FaRobot className="text-4xl text-purple-400" />,
};

const VisionComputationalSection: React.FC = () => {
  const { language } = useLanguage();
  const currentMessages = useTranslations();

  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: -40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 90%",
          },
        }
      );


      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
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


  const visionOptions: VisionOption[] = currentMessages.visionOptions.map((option: any) => {
    return {
      title: option.title,
      description: option.description,
      icon: iconMapper[option.icon] || <FaSearch className="text-4xl text-blue-400" />,
    };
  });

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-6 bg-custom-purple text-white"
      aria-labelledby="vision-computational-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 flex justify-center">
          <Player
            src="/icons/vision.json"
            className="inset-0 w-32 h-32"
            background="transparent"
            speed={1}
            loop
            autoplay
          />
        </div>

        <h2
          id="vision-computational-heading"
          ref={headingRef}
          className="text-4xl sm:text-5xl font-extrabold mb-8 text-center text-white"
        >
          {currentMessages.visionTitle}
        </h2>
        <div className="mt-2 w-1/2 h-[2px] bg-gradient-to-r from-yellow-400 to-transparent mx-auto mb-6" />
        <p className="text-white text-center max-w-2xl mx-auto mb-12">
          {currentMessages.visionSubtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visionOptions.map((option, index) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="rounded-2xl shadow-md bg-primary hover:bg-primary/80 transition-colors duration-300 p-6 flex flex-col items-center text-center"
            >
              <div className="mb-4 transform group-hover:scale-110 transition duration-300">
                {option.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{option.title}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                {option.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionComputationalSection;