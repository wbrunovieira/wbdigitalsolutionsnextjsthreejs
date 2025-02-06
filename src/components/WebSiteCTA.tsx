"use client";

import React, { useRef } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FaRocket, FaArrowRight, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/contexts/TranslationContext";

const CTAWebsite = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const currentMessages = useTranslations();

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      }
    });

    tl.from(".cta-content", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out"
    })
    .from(".cta-button", {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      ease: "back.out(1.7)"
    }, "-=0.4")
    .from(".floating-icon", {
      x: -30,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.3");
  }, []);

  return (
    <section ref={containerRef} className="relative bg-gradient-to-br from-[#350545] via-[#792990] to-[#350545] py-20 px-12 mt-20 rounded mb-20">
      <div className="max-w-5xl mx-auto relative">
        <div className="floating-icon absolute -top-10 right-10 animate-float">
          <FaRocket className="text-yellowcustom text-5xl transform -rotate-45" />
        </div>

        <div className="text-center cta-content">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {currentMessages.ctaTitle} <br />
            <span className="text-yellowcustom">{currentMessages.ctaHighlight}</span>
          </h2>

          <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-12">
            {currentMessages.ctaDesc1}
          </p>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-12">
            {currentMessages.ctaDesc2}
          </p>

          <div className="inline-flex items-center text-yellowcustom border border-yellowcustom px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 gap-3 mb-6">
            {currentMessages.ctaButton}
            <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300 rotate-90" />
          </div>

          <p className="text-yellowcustom text-lg mb-6">
            {currentMessages.ctaContactTitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="https://wa.me/seunumero"
              className="flex items-center gap-2 text-white hover:scale-105 transition duration-300 text-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className="text-2xl text-green-500" />
              {currentMessages.whatsappLabel}
            </a>

            <a
              href="mailto:seu@email.com"
              className="flex items-center gap-2 text-white hover:scale-105 transition duration-300 text-lg"
            >
              <FaEnvelope className="text-2xl" />
              {currentMessages.emailLabel}
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(45deg); }
          50% { transform: translateY(-20px) rotate(45deg); }
          100% { transform: translateY(0px) rotate(45deg); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default CTAWebsite;