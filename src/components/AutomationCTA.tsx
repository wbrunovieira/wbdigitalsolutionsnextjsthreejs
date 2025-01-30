import React from "react";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
const Player = dynamic(
  () =>
    import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  {
    ssr: false,
  }
);

import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslations } from '@/contexts/TranslationContext';
import dynamic from "next/dynamic";

const CallToAction = () => {
  const { language } = useLanguage();
  const currentMessages = useTranslations();

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-custom-purple to-primary text-white text-center rounded-lg shadow-lg overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Player
            src="/icons/automacao.json"
            className="w-40 h-40 mx-auto"
            background="transparent"
            speed={1}
            loop
            autoplay
          />
        </div>

        <h2 className="text-4xl font-bold mb-6">
          {currentMessages.ctaTitleAutomation}
        </h2>
        <p className="text-lg mb-8">
          {currentMessages.ctaDescription}
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <a
            href="https://wa.me/5511982864581"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 bg-green-500 text-lg font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-green-600 transform hover:scale-105 transition-transform duration-300"
          >
            <FaWhatsapp className="text-2xl" /> {currentMessages.ctaWhatsapp}
          </a>
          <a
            href="mailto:bruno@wbdigitalsolutions.com"
            className="flex items-center gap-3 px-6 py-3 bg-gray-100 text-gray-800 text-lg font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-gray-200 transform hover:scale-105 transition-transform duration-300"
          >
            <FaEnvelope className="text-2xl text-gray-800" /> {currentMessages.ctaEmail}
          </a>
        </div>

        <div className="mt-8">
          <p className="text-sm italic">
            {currentMessages.ctaFooter}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
