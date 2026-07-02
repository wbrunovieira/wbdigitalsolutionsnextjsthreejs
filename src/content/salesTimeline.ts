/**
 * Career timeline for the sales CV page (/vendas → brunov.wbdigitalsolutions.com).
 *
 * WIP: authored in pt-BR while the content is being assembled. Once the full
 * timeline is finalized it should be localized to en / it / es like cv.ts.
 * Bruno was born in 1974 — ages and years are derived from that.
 */

export interface TimelineEntry {
  /** Year or year range, e.g. "1987" or "1989–1993". */
  year: string;
  /** Age or age range at the time, e.g. "13 anos". */
  age: string;
  /** Company or venture name. */
  company: string;
  /** Role (may show a progression with →). */
  role: string;
  /** Location. */
  location?: string;
  /** What he did there. */
  bullets: string[];
}

export const salesTimeline: TimelineEntry[] = [
  {
    year: "1987",
    age: "13 anos",
    company: "Spotlux",
    role: "Balconista",
    location: "São Paulo",
    bullets: [
      "Primeiro emprego: no balcão de uma loja de materiais elétricos.",
      "Atendimento e vendas desde cedo — o começo de tudo.",
    ],
  },
  {
    year: "1989–1993",
    age: "15 – 19 anos",
    company: "Vaz Atacadista",
    role: "Balconista → Gerente de depósito → Vendedor externo",
    location: "São Paulo",
    bullets: [
      "Entrei aos 15 no atacado de materiais elétricos, ferragens e hidráulica.",
      "Aos 15 e meio, gerente de um depósito de materiais de construção do grupo.",
      "Aos 16, promovido a vendedor externo: abri e geri a carteira de uma região de São Paulo, com visitas semanais, quinzenais ou mensais às lojas.",
      "O dono financiou meu carro; até os 18, eu pagava um motorista para me levar aos clientes.",
    ],
  },
  {
    year: "1993",
    age: "19 anos",
    company: "Atacadista próprio",
    role: "Fundador",
    location: "São Paulo",
    bullets: [
      "Abri meu próprio atacadista de materiais elétricos, ferragens, hidráulica e tintas.",
    ],
  },
  {
    year: "1994",
    age: "20 anos",
    company: "Caixeiro-viajante",
    role: "Vendedor viajante",
    location: "SP · MG · RJ",
    bullets: [
      "Vendas para uma fabricante de cartões de aniversário e natal.",
      "A empresa fornecia o carro e os kits de pronta-entrega; eu saía de São Paulo na segunda e rodava o interior de SP, MG e RJ.",
      "Eu escolhia os destinos e bancava os custos da viagem.",
    ],
  },
  {
    year: "1995",
    age: "21 anos",
    company: "Escola de Informática",
    role: "Sócio-fundador",
    location: "Interior de SP",
    bullets: [
      "Com dois sócios, abri uma escola de montagem e manutenção de computadores.",
      "Parcerias com clubes locais de cidades pequenas; divulgação via mídia local e palestras em escolas.",
    ],
  },
  {
    year: "1997",
    age: "23 anos",
    company: "Estados Unidos",
    role: "Auxiliar de jardinagem",
    location: "EUA",
    bullets: [
      "Morei um ano nos EUA trabalhando como auxiliar de jardinagem.",
      "Foi onde aprendi inglês — na prática, imerso no dia a dia.",
    ],
  },
  {
    year: "1998–2002",
    age: "24 – 28 anos",
    company: "Aerodinâmica Equipamentos Industriais",
    role: "Vendedor técnico",
    location: "São Paulo",
    bullets: [
      "Venda técnica de tubos termoplásticos (PVC, PP, PVDF) para indústrias que conduziam líquidos corrosivos.",
      "Visitava as fábricas, especificava o material conforme o ácido e a temperatura, vendia e negociava.",
      "Abri mercado para o PVDF em águas injetáveis na indústria farmacêutica — um setor que até então usava só aço inoxidável.",
    ],
  },
  {
    year: "2002–2005",
    age: "28 – 31 anos",
    company: "JN Moura",
    role: "Representante de software ERP",
    location: "São Paulo",
    bullets: [
      "Representante de um software ERP para lojas e farmácias.",
      "Atendia o mercado de São Paulo — prospecção, venda, implementação, treinamento e suporte.",
    ],
  },
  {
    year: "2005–2006",
    age: "31 anos",
    company: "Adobe Systems",
    role: "Especialista Comercial",
    location: "São Paulo",
    bullets: [
      "Atendia grandes contas. A Adobe não vendia direto às empresas — apenas via distribuidores e revendedores.",
      "Eu acompanhava o distribuidor e o revendedor local nas grandes contas, em nome da Adobe, apoiando a negociação.",
      "Oferecia benefícios como treinamentos com os principais especialistas de cada software — Photoshop, Acrobat, entre outros.",
    ],
  },
  {
    year: "2006–2007",
    age: "32 anos",
    company: "Softcorp",
    role: "Gerente de Produto · Especialista Adobe",
    location: "São Paulo",
    bullets: [
      "Gerente de produto, atuando como especialista Adobe.",
      "Ajudei a desbravar o mercado educacional, atendendo grandes universidades e redes de escolas.",
    ],
  },
  {
    year: "2007–2009",
    age: "33 anos",
    company: "SmartBoard",
    role: "Vendas técnicas",
    location: "São Paulo",
    bullets: [
      "Venda técnica de lousas digitais (quadros interativos) para escritórios, indústrias e escolas.",
      "Fazia o levantamento de necessidade, a demonstração e o fechamento.",
    ],
  },
  {
    year: "2009–2017",
    age: "35 – 43 anos",
    company: "Retrak Empilhadeiras",
    role: "Especialista em Vendas Técnicas",
    location: "São Paulo",
    bullets: [
      "Vendas técnicas B2B para uma marca líder de empilhadeiras na Grande São Paulo — o principal mercado da empresa.",
      "Vendi equipamentos novos e fechei contratos de locação de longo prazo em alto volume.",
      "Gerenciei contas de PME a enterprise: Reckitt Benckiser, Carrefour, Colgate e Droga Raia.",
      "Venda consultiva e orientada a solução — dimensionamento técnico para centros de distribuição e redes de varejo.",
      "Bati e superei metas de forma consistente.",
    ],
  },
  {
    year: "2017–2018",
    age: "43 anos",
    company: "Itália — Cozinha profissional",
    role: "Cozinheiro",
    location: "Itália",
    bullets: [
      "Depois da Retrak, mudei para a Itália, me formei cozinheiro e aprendi italiano imerso na cultura.",
      "A cozinha profissional é escola de trabalho em equipe: numa brigada, cada estação depende da outra — comunicação clara, rápida e sem ego.",
      "Mise en place, consistência e calma no auge do serviço — entregar experiência ao cliente sob pressão são as mesmas bases de um bom vendedor.",
      "Uma reinvenção completa: aprender um ofício e uma língua do zero, começando de baixo.",
    ],
  },
  {
    year: "2018–2023",
    age: "44 – 49 anos",
    company: "Portugal — Transporte & Turismo",
    role: "Motorista Uber → Empreendedor (frota própria)",
    location: "Portugal",
    bullets: [
      "Morei 5 anos em Portugal.",
      "Comecei como motorista de app e montei minha própria operação — 4 carros e motoristas trabalhando comigo.",
      "Atuei bastante com turismo de passageiros.",
    ],
  },
  {
    year: "2023 – hoje",
    age: "49 anos",
    company: "WB Digital Solutions",
    role: "Fundador · Full-Stack & Comercial",
    location: "São Paulo · Remoto",
    bullets: [
      "De volta ao Brasil, aprendi a programar e fundei meu estúdio — virei engenheiro full-stack e de IA.",
      "Conduzo o ciclo comercial completo: prospecção, escopo, proposta, precificação, negociação e fechamento — clientes no Brasil, Itália e EUA.",
      "Construí um CRM com IA que automatiza o meu próprio processo de vendas.",
      "O ápice da jornada: vendo o que construo e construo o que vendo.",
    ],
  },
];
