/**
 * "About me" content for the sales CV page, localized in 4 languages.
 */

import type { CVLang } from '@/content/cv';

export interface AboutInterest {
  icon: 'book' | 'film' | 'mountain';
  title: string;
  text: string;
}

export const salesAbout: Record<
  CVLang,
  { lead: string[]; interests: AboutInterest[] }
> = {
  'pt-BR': {
    lead: [
      'Divorciado, fui casado por 17 anos, dessa história vieram meus filhos: Gabriel, em Hamburgo (Alemanha), e Stephanie, em Lisboa (Portugal). Falo com eles todos os dias.',
      'Hoje estou em Petrópolis (RJ), levando uma vida nômade por Airbnb. No último ano morei em cidades do litoral norte de SP, no sul de MG e agora no Rio de Janeiro.',
    ],
    interests: [
      {
        icon: 'book',
        title: 'Leitura',
        text: 'Leio uns 3 livros por mês, estoicismo, clássicos russos, desenvolvimento pessoal, saúde e muito mais.',
      },
      {
        icon: 'film',
        title: 'Cultura',
        text: 'Devorador de filmes e séries. Amo teatro e shows ao vivo.',
      },
      {
        icon: 'mountain',
        title: 'Esporte & aventura',
        text: 'Jiu-jitsu, natação (piscina e águas abertas), parapente (piloto), trilhas, musculação e bicicleta.',
      },
    ],
  },
  en: {
    lead: [
      'Divorced, I was married for 17 years, and from that story came my children: Gabriel, in Hamburg (Germany), and Stephanie, in Lisbon (Portugal). I talk to them every day.',
      "Today I'm in Petrópolis (RJ), living a nomadic life through Airbnb. Over the past year I lived in towns on the northern coast of SP, in the south of MG, and now in Rio de Janeiro.",
    ],
    interests: [
      {
        icon: 'book',
        title: 'Reading',
        text: 'I read about 3 books a month, stoicism, Russian classics, personal development, health and much more.',
      },
      {
        icon: 'film',
        title: 'Culture',
        text: 'A devourer of films and series. I love theater and live shows.',
      },
      {
        icon: 'mountain',
        title: 'Sport & adventure',
        text: 'Jiu-jitsu, swimming (pool and open water), paragliding (pilot), hiking, weight training and cycling.',
      },
    ],
  },
  it: {
    lead: [
      'Divorziato, sono stato sposato per 17 anni, e da quella storia sono nati i miei figli: Gabriel, ad Amburgo (Germania), e Stephanie, a Lisbona (Portogallo). Parlo con loro tutti i giorni.',
      "Oggi sono a Petrópolis (RJ), conducendo una vita nomade tramite Airbnb. Nell'ultimo anno ho vissuto in città della costa nord di SP, nel sud del MG e ora a Rio de Janeiro.",
    ],
    interests: [
      {
        icon: 'book',
        title: 'Lettura',
        text: 'Leggo circa 3 libri al mese, stoicismo, classici russi, sviluppo personale, salute e molto altro.',
      },
      {
        icon: 'film',
        title: 'Cultura',
        text: 'Divoratore di film e serie. Amo il teatro e i concerti dal vivo.',
      },
      {
        icon: 'mountain',
        title: 'Sport & avventura',
        text: 'Jiu-jitsu, nuoto (piscina e acque libere), parapendio (pilota), sentieri, palestra e bicicletta.',
      },
    ],
  },
  es: {
    lead: [
      'Divorciado, estuve casado durante 17 años, y de esa historia vinieron mis hijos: Gabriel, en Hamburgo (Alemania), y Stephanie, en Lisboa (Portugal). Hablo con ellos todos los días.',
      'Hoy estoy en Petrópolis (RJ), llevando una vida nómada por Airbnb. En el último año viví en ciudades del litoral norte de SP, en el sur de MG y ahora en Río de Janeiro.',
    ],
    interests: [
      {
        icon: 'book',
        title: 'Lectura',
        text: 'Leo unos 3 libros al mes, estoicismo, clásicos rusos, desarrollo personal, salud y mucho más.',
      },
      {
        icon: 'film',
        title: 'Cultura',
        text: 'Devorador de películas y series. Amo el teatro y los conciertos en vivo.',
      },
      {
        icon: 'mountain',
        title: 'Deporte & aventura',
        text: 'Jiu-jitsu, natación (piscina y aguas abiertas), parapente (piloto), senderismo, gimnasio y bicicleta.',
      },
    ],
  },
};
