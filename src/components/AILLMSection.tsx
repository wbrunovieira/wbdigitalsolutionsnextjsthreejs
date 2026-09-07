import React, { useRef } from 'react';
import { useTranslations } from '@/contexts/TranslationContext';
import { getExampleIcon } from './ai-llm/exampleIcons';
import { BottomDivider, TopDivider } from './ai-llm/ShapeDividers';
import { useLLMCardAnimations } from './ai-llm/useLLMCardAnimations';

interface ExampleMessage {
  title: string;
  description: string;
  icon: string;
}

const AdvancedLLMSection: React.FC = () => {
  const currentMessages = useTranslations();

  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const examples: ExampleMessage[] = currentMessages.advancedLLMExamples;

  useLLMCardAnimations({ sectionRef, headingRef, cardRefs });

  return (
    <section
      ref={sectionRef}
      aria-labelledby="advanced-llms-heading"
      className="relative z-10 bg-gradient-to-br from-primary/80 via-primary/80 to-custom-purple/80 backdrop-blur-sm py-20 px-6 text-white mt-32 min-h-[1200px] sm:min-h-[1000px]"
      role="region"
    >
      <TopDivider />

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
              key={example.title}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="group bg-primary rounded-2xl shadow-lg transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl p-8 flex flex-col items-center text-center relative overflow-hidden"
            >
              <div className="transform transition duration-300 group-hover:rotate-3 group-hover:scale-105">
                {getExampleIcon(example.icon)}
              </div>
              <h3 className="text-xl font-semibold mt-4 mb-2 text-white tracking-wide">
                {example.title}
              </h3>
              <p className="text-gray-300 text-sm">{example.description}</p>

              <div className="absolute inset-0 bg-gradient-to-r from-custom-purple to-transparent opacity-0 group-hover:opacity-20 transition duration-300 rounded-2xl" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>

      <BottomDivider />
    </section>
  );
};

export default AdvancedLLMSection;
