import { gsap } from 'gsap';
import { useTranslations } from 'next-intl'; // Ajustado para usar o hook correto
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Card from './Card';

import { CardData } from '@/types/messages'; // Certifique-se de que o alias está corretamente configurado
import InfiniteScroll from './InfiniteScrollHash';

// A interface parece não ser usada no exemplo dado, então certifique-se de sua necessidade

const SectionDaHome: React.FC = () => {
  // Use o hook useTranslations para acessar as traduções
  const t = useTranslations('Index');

  // Assumindo que você tem uma chave no seu arquivo de traduções que contém os dados dos cartões
  // Por exemplo, Index.json poderia ter uma estrutura que inclui "cards": [{ "name": "Nome", "subtitle": "Descrição", "image": "URL da imagem" }]
  const cards: CardData[] = t.raw('cards'); // useTranslations.raw para acessar diretamente os dados sem tradução

  return (
    <section className='flex gap-3 relative w-full h-screen mx-auto bg-[#190321]'>
      {Array.isArray(cards) &&
        cards.map((card, index) => (
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
