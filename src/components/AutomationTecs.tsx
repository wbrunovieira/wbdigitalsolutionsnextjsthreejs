import React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SiNextdotjs, SiGoland, SiRust, SiN8N, SiTypescript, SiPython, SiDocker, SiNodedotjs, SiRedis, SiPostgresql } from 'react-icons/si';
import { useTranslations } from '@/contexts/TranslationContext';

gsap.registerPlugin(ScrollTrigger);

const Technologies = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLHeadingElement>(null);
  const descriptionRef = React.useRef<HTMLParagraphElement>(null);

  const currentMessages = useTranslations();

  useGSAP(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        },
      },
    );

    gsap.fromTo(
      descriptionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: descriptionRef.current,
          start: 'top 85%',
        },
      },
    );

    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 90%',
          },
        },
      );
    }
  });

  const technologies = [
    {
      name: 'Next.js',
      icon: <SiNextdotjs aria-hidden="true" className="text-6xl text-gray-800" />, 
    },
    {
      name: 'Go',
      icon: <SiGoland aria-hidden="true" className="text-6xl text-blue-500" />, 
    },
    {
      name: 'Rust',
      icon: <SiRust aria-hidden="true" className="text-6xl text-orange-500" />, 
    },
    {
      name: 'n8n',
      icon: <SiN8N aria-hidden="true" className="text-6xl text-green-500" />, 
    },
    {
      name: 'TypeScript',
      icon: <SiTypescript aria-hidden="true" className="text-6xl text-blue-600" />, 
    },
    {
      name: 'Python',
      icon: <SiPython aria-hidden="true" className="text-6xl text-yellow-500" />, 
    },
    {
      name: 'Docker',
      icon: <SiDocker aria-hidden="true" className="text-6xl text-blue-400" />, 
    },
    {
      name: 'Node.js',
      icon: <SiNodedotjs aria-hidden="true" className="text-6xl text-green-500" />, 
    },
    {
      name: 'Redis',
      icon: <SiRedis aria-hidden="true" className="text-6xl text-red-500" />, 
    },
    {
      name: 'PostgreSQL',
      icon: <SiPostgresql aria-hidden="true" className="text-6xl text-blue-500" />, 
    },
  ];

  return (
    <section className="py-20 px-6 bg-gray-100/80 backdrop-blur-sm text-gray-800">
      <div className="max-w-7xl mx-auto text-center">
        <h2 ref={titleRef} className="text-4xl font-bold mb-6 text-gray-900">
          {currentMessages.technologiesTitle}
        </h2>
        <p ref={descriptionRef} className="text-lg text-gray-600 mb-12">
          {currentMessages.technologiesDescription}
        </p>

        <div
          ref={containerRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8"
        >
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {tech.icon}
              <p className="text-md font-semibold mt-4 text-gray-800">
                {tech.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;