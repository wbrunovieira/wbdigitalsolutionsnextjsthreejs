import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Card from './Card';
import { useTranslations } from '@/contexts/TranslationContext';
import { CardData } from '@/types/messages';

interface MessageFormat {
  technology: string;
  title: string;
  description: string;

  cards: CardData[];
}

const SectionDaHome: React.FC = () => {
  const currentMessages = useTranslations();
  return (
    <section className='flex gap-3 relative w-full h-screen mx-auto bg-[#190321]'>
      {Array.isArray(currentMessages.cards) &&
        currentMessages.cards.map((card, index) => (
          <Card
            key={index}
            index={index + 1}
            name={card.name}
            description={card.subtitle}
            image={card.image}
          />
        ))}
    </section>
  );
};

export default SectionDaHome;
