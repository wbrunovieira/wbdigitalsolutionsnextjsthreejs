import { useGSAP } from "@gsap/react";
import React, { useRef, useEffect } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

const ParallaxSolutions: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {


      if (containerRef.current) {
        gsap.fromTo(
          containerRef.current,
          { backgroundPosition: "50% 0%" },
          {
            backgroundPosition: "50% 50%",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // Animação do título
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
              end: "top 50%",
            },
          }
        );
      }

      // Animação dos itens
      if (itemsRef.current) {
        gsap.fromTo(
          itemsRef.current.filter(Boolean),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 90%",
            },
          }
        );
      }
    

    
  }, []);

  return (
    <div
      ref={containerRef}
      className="py-16 px-6 bg-cover bg-fixed bg-gradient-to-br from-[#123456] via-[#456789] to-[#123456] text-white"
    >
      <div className="max-w-5xl mx-auto text-center">
        {/* Título da seção */}
        <h2 ref={titleRef} className="text-4xl sm:text-5xl font-bold mb-12">
          Soluções de Automação
        </h2>

        {/* Lista de itens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {["Item 1", "Item 2", "Item 3", "Item 4"].map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-gray-800"
            >
              <h3 className="text-xl font-semibold mb-4">{item}</h3>
              <p>Descrição do item</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParallaxSolutions;