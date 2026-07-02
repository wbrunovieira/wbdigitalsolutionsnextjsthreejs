/**
 * "About me" content for the sales CV page. WIP in pt-BR, localize with the
 * rest of the sales content once finalized.
 */

export interface AboutInterest {
  icon: "book" | "film" | "mountain";
  title: string;
  text: string;
}

export const salesAbout: { lead: string[]; interests: AboutInterest[] } = {
  lead: [
    "Divorciado, fui casado por 17 anos, dessa história vieram meus filhos: Gabriel, em Hamburgo (Alemanha), e Stephanie, em Lisboa (Portugal). Falo com eles todos os dias.",
    "Hoje estou em Petrópolis (RJ), levando uma vida nômade por Airbnb. No último ano morei em cidades do litoral norte de SP, no sul de MG e agora no Rio de Janeiro.",
  ],
  interests: [
    {
      icon: "book",
      title: "Leitura",
      text: "Leio uns 3 livros por mês, estoicismo, clássicos russos, desenvolvimento pessoal, saúde e muito mais.",
    },
    {
      icon: "film",
      title: "Cultura",
      text: "Devorador de filmes e séries. Amo teatro e shows ao vivo.",
    },
    {
      icon: "mountain",
      title: "Esporte & aventura",
      text: "Jiu-jitsu, natação (piscina e águas abertas), parapente (piloto), trilhas, musculação e bicicleta.",
    },
  ],
};
