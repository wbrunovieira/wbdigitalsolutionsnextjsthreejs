import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
const Player = dynamic(
  () =>
    import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  {
    ssr: false,
  }
);

import { FaCogs, FaClock, FaChartLine, FaSmile } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslations } from '@/contexts/TranslationContext';
import dynamic from 'next/dynamic';

gsap.registerPlugin(ScrollTrigger);

const AnimatedBenefits: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { language } = useLanguage();
  const currentMessages = useTranslations();

  useGSAP(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          },
        }
      );
    }

    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.3,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 90%',
            end: 'bottom 60%',
            scrub: 1,
          },
        }
      );
    }
  }, []);

  const benefits = [
    {
      title: currentMessages.benefit1Title,
      description: currentMessages.benefit1Desc,
      icon: <FaCogs className="text-4xl text-custom-purple mb-4 mx-auto" />,
    },
    {
      title: currentMessages.benefit2Title,
      description: currentMessages.benefit2Desc,
      icon: <FaClock className="text-4xl text-custom-purple mb-4 mx-auto" />,
    },
    {
      title: currentMessages.benefit3Title,
      description: currentMessages.benefit3Desc,
      icon: <FaChartLine className="text-4xl text-custom-purple mb-4 mx-auto" />,
    },
    {
      title: currentMessages.benefit4Title,
      description: currentMessages.benefit4Desc,
      icon: <FaSmile className="text-4xl text-custom-purple mb-4 mx-auto" />,
    },
  ];

  return (
    <div
      ref={containerRef}
      className="py-16 px-6 bg-primary text-white overflow-hidden"
    >
    

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className='flex justify-center bg-white  mx-auto rounded '>
                  <Player
                    src="/icons/automation_smart.json"
                    className="inset-0 w-32 h-32"
                    background="transparent"
                    speed={1}
                    loop
                    autoplay
                  />

                 <h2
          ref={titleRef}
          className="text-3xl sm:text-4xl font-bold mb-16 text-primary mt-16"
        >
          {currentMessages.benefitsTitle}
        </h2>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {benefit.icon}
              <h3 className="text-xl font-semibold mb-4 text-custom-purple">
                {benefit.title}
              </h3>
              <div className="mt-2 w-1/2 h-[2px] bg-gradient-to-r from-yellow-400 to-transparent mx-auto mb-6"></div>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedBenefits;