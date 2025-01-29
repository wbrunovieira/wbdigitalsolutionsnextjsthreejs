import React from "react";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/contexts/TranslationContext";

const CTAInvitationTranslated: React.FC = () => {
  const { language } = useLanguage();
  const currentMessages = useTranslations();

  return (
    <section className="py-16 px-6 bg-gradient-to-r from-primary to-custom-purple text-white text-center rounded shadow-xl mt-32">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
        <h2 className="text-3xl sm:text-4xl font-bold">
          {currentMessages.ctaHeading}
        </h2>
        <div className="mt-2 w-1/2 h-[2px] bg-gradient-to-r from-yellow-400 to-transparent mx-auto mb-6" />
        <p className="text-base sm:text-lg text-gray-100 max-w-2xl leading-relaxed text-left">
          {currentMessages.ctaMessage}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <a
            href="https://wa.me/seunumerodetelefone"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 bg-green-500 text-lg font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-green-600 transform hover:scale-105 transition-transform duration-300"
          >
            <FaWhatsapp className="text-2xl" /> {currentMessages.ctaWhatsapp}
          </a>
          <a
            href="mailto:email@seudominio.com"
            className="flex items-center gap-3 px-6 py-3 bg-gray-100 text-gray-800 text-lg font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-gray-200 transform hover:scale-105 transition-transform duration-300"
          >
            <FaEnvelope className="text-2xl text-gray-800" /> {currentMessages.ctaEmail}
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTAInvitationTranslated;
