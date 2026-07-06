/**
 * Career timeline for the sales CV page (/vendas → brunov.wbdigitalsolutions.com).
 *
 * WIP: authored in pt-BR while the content is being assembled. Once the full
 * timeline is finalized it should be localized to en / it / es like cv.ts.
 * Bruno was born in 1974, ages and years are derived from that.
 */

import type { CVLang } from '@/content/cv';

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

export const salesTimeline: Record<CVLang, TimelineEntry[]> = {
  'pt-BR': [
    {
      year: '1987',
      age: '13 anos',
      company: 'Spotlux',
      role: 'Balconista',
      location: 'São Paulo',
      bullets: [
        'Primeiro emprego: no balcão de uma loja de materiais elétricos.',
        'Atendimento e vendas desde cedo, o começo de tudo.',
      ],
    },
    {
      year: '1989–1993',
      age: '15 – 19 anos',
      company: 'Vaz Atacadista',
      role: 'Balconista → Gerente de depósito → Vendedor externo',
      location: 'São Paulo',
      bullets: [
        'Entrei aos 15 no atacado de materiais elétricos, ferragens e hidráulica.',
        'Aos 15 e meio, gerente de um depósito de materiais de construção do grupo.',
        'Aos 16, promovido a vendedor externo: abri e geri a carteira de uma região de São Paulo, com visitas semanais, quinzenais ou mensais às lojas.',
        'O dono financiou meu carro; até os 18, eu pagava um motorista para me levar aos clientes.',
      ],
    },
    {
      year: '1993',
      age: '19 anos',
      company: 'Atacadista próprio',
      role: 'Fundador',
      location: 'São Paulo',
      bullets: [
        'Abri meu próprio atacadista de materiais elétricos, ferragens, hidráulica e tintas.',
      ],
    },
    {
      year: '1994',
      age: '20 anos',
      company: 'Caixeiro-viajante',
      role: 'Vendedor viajante',
      location: 'SP · MG · RJ',
      bullets: [
        'Vendas para uma fabricante de cartões de aniversário e natal.',
        'A empresa fornecia o carro e os kits de pronta-entrega; eu saía de São Paulo na segunda e rodava o interior de SP, MG e RJ.',
        'Eu escolhia os destinos e bancava os custos da viagem.',
      ],
    },
    {
      year: '1995',
      age: '21 anos',
      company: 'Escola de Informática',
      role: 'Sócio-fundador',
      location: 'Interior de SP',
      bullets: [
        'Com dois sócios, abri uma escola de montagem e manutenção de computadores.',
        'Parcerias com clubes locais de cidades pequenas; divulgação via mídia local e palestras em escolas.',
      ],
    },
    {
      year: '1999–2000',
      age: '25 anos',
      company: 'Estados Unidos',
      role: 'Auxiliar de jardinagem',
      location: 'Flórida, EUA',
      bullets: [
        'Morei um ano na Flórida trabalhando como auxiliar de jardinagem.',
        'Primeira vez que saí do Brasil: mergulhei numa cultura nova, longe de tudo que conhecia.',
        'Meu primeiro trabalho braçal, sob o calor da Flórida: aprendi na pele a disciplina do esforço físico e o valor de começar de baixo.',
        'Foi onde aprendi inglês, na prática, imerso no dia a dia.',
        'Me adaptar a um país, uma língua e um ofício totalmente novos me deu a resiliência e a abertura que uso até hoje com qualquer cliente ou mercado.',
      ],
    },
    {
      year: '2000–2004',
      age: '26 – 30 anos',
      company: 'Aerodinâmica Equipamentos Industriais',
      role: 'Vendedor técnico',
      location: 'São Paulo',
      bullets: [
        'Venda técnica de tubos termoplásticos (PVC, PP, PVDF) para indústrias que conduziam líquidos corrosivos.',
        'Visitava as fábricas, especificava o material conforme o ácido e a temperatura, vendia e negociava.',
        'Abri mercado para o PVDF em águas injetáveis na indústria farmacêutica, um setor que até então usava só aço inoxidável.',
      ],
    },
    {
      year: '2004–2005',
      age: '30 anos',
      company: 'JN Moura',
      role: 'Representante de software ERP',
      location: 'São Paulo',
      bullets: [
        'Representante de um software ERP para lojas e farmácias.',
        'Atendia o mercado de São Paulo, prospecção, venda, implementação, treinamento e suporte.',
      ],
    },
    {
      year: '2005–2006',
      age: '31 anos',
      company: 'Adobe Systems',
      role: 'Especialista Comercial',
      location: 'São Paulo',
      bullets: [
        'Atendia grandes contas. A Adobe não vendia direto às empresas, apenas via distribuidores e revendedores.',
        'Representava a Adobe nas grandes contas, conduzindo o relacionamento e a negociação; o distribuidor e o revendedor executavam a venda pelo canal.',
        'Oferecia benefícios como treinamentos com os principais especialistas de cada software, Photoshop, Acrobat, entre outros.',
      ],
    },
    {
      year: '2006–2007',
      age: '32 anos',
      company: 'Softcorp',
      role: 'Gerente de Produto · Especialista Adobe',
      location: 'São Paulo',
      bullets: [
        'Gerente de produto, atuando como especialista Adobe.',
        'Ajudei a desbravar o mercado educacional, atendendo grandes universidades e redes de escolas.',
      ],
    },
    {
      year: '2007–2008',
      age: '33 anos',
      company: 'SmartBoard',
      role: 'Vendas técnicas',
      location: 'São Paulo',
      bullets: [
        'Venda técnica de lousas digitais (quadros interativos) para escritórios, indústrias e escolas.',
        'Fazia o levantamento de necessidade, a demonstração e o fechamento.',
      ],
    },
    {
      year: '2009–2017',
      age: '35 – 43 anos',
      company: 'Retrak Empilhadeiras',
      role: 'Especialista em Vendas Técnicas',
      location: 'São Paulo',
      bullets: [
        'Vendas técnicas B2B para uma marca líder de empilhadeiras na Grande São Paulo, o principal mercado da empresa.',
        'Vendi equipamentos novos e fechei contratos de locação de longo prazo em alto volume.',
        'Gerenciei contas de PME a enterprise: Reckitt Benckiser, Carrefour, Colgate e Droga Raia.',
        'Venda consultiva e orientada a solução, dimensionamento técnico para centros de distribuição e redes de varejo.',
        'Bati e superei metas de forma consistente.',
      ],
    },
    {
      year: '2017–2018',
      age: '43 anos',
      company: 'Cozinha profissional',
      role: 'Cozinheiro',
      location: 'Itália',
      bullets: [
        'Depois da Retrak, mudei para a Itália, me formei cozinheiro e aprendi italiano imerso na cultura.',
        'A cozinha profissional é escola de trabalho em equipe: numa brigada, cada estação depende da outra, comunicação clara, rápida e sem ego.',
        'Mise en place, consistência e calma no auge do serviço, entregar experiência ao cliente sob pressão são as mesmas bases de um bom vendedor.',
        'Uma reinvenção completa: aprender um ofício e uma língua do zero, começando de baixo.',
      ],
    },
    {
      year: '2018–2023',
      age: '44 – 49 anos',
      company: 'Transporte & Turismo',
      role: 'Motorista Uber → Empreendedor (frota própria)',
      location: 'Portugal',
      bullets: [
        'Morei 5 anos em Portugal.',
        'Comecei como motorista de app e montei minha própria operação, 4 carros e motoristas trabalhando comigo.',
        'Atuei bastante com turismo de passageiros e transporte de executivos.',
      ],
    },
    {
      year: '2023 – hoje',
      age: '49 anos',
      company: 'WB Digital Solutions',
      role: 'Fundador · Full-Stack & Comercial',
      location: 'São Paulo · Remoto',
      bullets: [
        'De volta ao Brasil, aprendi a programar e fundei minha software house, virei engenheiro full-stack e de IA.',
        'Conduzo o ciclo comercial completo: prospecção, escopo, proposta, precificação, negociação e fechamento, clientes no Brasil, Itália e EUA.',
        'Construí um CRM com IA que automatiza o meu próprio processo de vendas.',
        'O ápice da jornada: vendo o que construo e construo o que vendo.',
      ],
    },
  ],
  en: [
    {
      year: '1987',
      age: 'age 13',
      company: 'Spotlux',
      role: 'Counter salesperson',
      location: 'São Paulo',
      bullets: [
        'First job: behind the counter of an electrical supplies store.',
        'Customer service and sales from an early age, where it all began.',
      ],
    },
    {
      year: '1989–1993',
      age: 'age 15 to 19',
      company: 'Vaz Atacadista',
      role: 'Counter salesperson → Warehouse manager → Field sales rep',
      location: 'São Paulo',
      bullets: [
        'Joined at 15 in the wholesale of electrical supplies, hardware and plumbing.',
        "At 15 and a half, manager of one of the group's construction materials warehouses.",
        'At 16, promoted to field sales rep: I opened and managed the client base for a region of São Paulo, with weekly, biweekly or monthly visits to stores.',
        'The owner financed my car; until I was 18, I paid a driver to take me to clients.',
      ],
    },
    {
      year: '1993',
      age: 'age 19',
      company: 'Own wholesale business',
      role: 'Founder',
      location: 'São Paulo',
      bullets: [
        'I opened my own wholesale business for electrical supplies, hardware, plumbing and paints.',
      ],
    },
    {
      year: '1994',
      age: 'age 20',
      company: 'Traveling salesman',
      role: 'Traveling sales rep',
      location: 'SP · MG · RJ',
      bullets: [
        'Sales for a manufacturer of birthday and Christmas cards.',
        'The company provided the car and the ready-to-deliver kits; I left São Paulo on Monday and covered the countryside of SP, MG and RJ.',
        'I chose the destinations and covered the trip costs myself.',
      ],
    },
    {
      year: '1995',
      age: 'age 21',
      company: 'Computer school',
      role: 'Co-founder',
      location: 'SP countryside',
      bullets: [
        'With two partners, I opened a school for computer assembly and maintenance.',
        'Partnerships with local clubs in small towns; promotion through local media and talks in schools.',
      ],
    },
    {
      year: '1999–2000',
      age: 'age 25',
      company: 'United States',
      role: 'Landscaping assistant',
      location: 'Florida, USA',
      bullets: [
        'I lived a year in Florida working as a landscaping assistant.',
        'The first time I left Brazil: I dove into a new culture, far from everything I knew.',
        'My first manual labor, under the Florida heat: I learned firsthand the discipline of physical effort and the value of starting from the bottom.',
        'It was where I learned English, in practice, immersed in daily life.',
        'Adapting to a completely new country, language and trade gave me the resilience and openness I still use today with any client or market.',
      ],
    },
    {
      year: '2000–2004',
      age: 'age 26 to 30',
      company: 'Aerodinâmica Equipamentos Industriais',
      role: 'Technical sales rep',
      location: 'São Paulo',
      bullets: [
        'Technical sales of thermoplastic pipes (PVC, PP, PVDF) for industries handling corrosive liquids.',
        'I visited the factories, specified the material according to the acid and the temperature, sold and negotiated.',
        'I opened the market for PVDF in injectable water for the pharmaceutical industry, a sector that until then used only stainless steel.',
      ],
    },
    {
      year: '2004–2005',
      age: 'age 30',
      company: 'JN Moura',
      role: 'ERP software representative',
      location: 'São Paulo',
      bullets: [
        'Representative of an ERP software for stores and pharmacies.',
        'I covered the São Paulo market, prospecting, sales, implementation, training and support.',
      ],
    },
    {
      year: '2005–2006',
      age: 'age 31',
      company: 'Adobe Systems',
      role: 'Commercial Specialist',
      location: 'São Paulo',
      bullets: [
        'I handled major accounts. Adobe did not sell directly to companies, only through distributors and resellers.',
        'I represented Adobe with major accounts, leading the relationship and negotiation; the distributor and reseller executed the sale through the channel.',
        'I offered benefits such as training with the leading specialists of each software, Photoshop, Acrobat, among others.',
      ],
    },
    {
      year: '2006–2007',
      age: 'age 32',
      company: 'Softcorp',
      role: 'Product Manager · Adobe Specialist',
      location: 'São Paulo',
      bullets: [
        'Product manager, acting as an Adobe specialist.',
        'I helped break into the education market, serving major universities and school networks.',
      ],
    },
    {
      year: '2007–2008',
      age: 'age 33',
      company: 'SmartBoard',
      role: 'Technical sales',
      location: 'São Paulo',
      bullets: [
        'Technical sales of digital whiteboards (interactive boards) for offices, industries and schools.',
        'I ran the needs assessment, the demonstration and the closing.',
      ],
    },
    {
      year: '2009–2017',
      age: 'age 35 to 43',
      company: 'Retrak Empilhadeiras',
      role: 'Technical Sales Specialist',
      location: 'São Paulo',
      bullets: [
        "B2B technical sales for a leading forklift brand in Greater São Paulo, the company's main market.",
        'I sold new equipment and closed high-volume long-term rental contracts.',
        'I managed accounts from SMB to enterprise: Reckitt Benckiser, Carrefour, Colgate and Droga Raia.',
        'Consultative, solution-oriented selling, technical sizing for distribution centers and retail networks.',
        'I consistently hit and exceeded targets.',
      ],
    },
    {
      year: '2017–2018',
      age: 'age 43',
      company: 'Professional kitchen',
      role: 'Cook',
      location: 'Italy',
      bullets: [
        'After Retrak, I moved to Italy, trained as a cook and learned Italian immersed in the culture.',
        'The professional kitchen is a school of teamwork: in a brigade, each station depends on the next, clear, fast communication with no ego.',
        'Mise en place, consistency and calm at the peak of service, delivering an experience to the client under pressure are the same foundations as a good salesperson.',
        'A complete reinvention: learning a trade and a language from scratch, starting from the bottom.',
      ],
    },
    {
      year: '2018–2023',
      age: 'age 44 to 49',
      company: 'Transport & Tourism',
      role: 'Uber driver → Entrepreneur (own fleet)',
      location: 'Portugal',
      bullets: [
        'I lived 5 years in Portugal.',
        'I started as a ride-hailing driver and built my own operation, 4 cars and drivers working with me.',
        'I worked heavily with passenger tourism and executive transport.',
      ],
    },
    {
      year: '2023 – today',
      age: 'age 49',
      company: 'WB Digital Solutions',
      role: 'Founder · Full-Stack & Sales',
      location: 'São Paulo · Remote',
      bullets: [
        'Back in Brazil, I learned to code and founded my software house, becoming a full-stack and AI engineer.',
        'I run the full sales cycle: prospecting, scoping, proposal, pricing, negotiation and closing, with clients in Brazil, Italy and the USA.',
        'I built an AI-powered CRM that automates my own sales process.',
        'The peak of the journey: I sell what I build and build what I sell.',
      ],
    },
  ],
  it: [
    {
      year: '1987',
      age: '13 anni',
      company: 'Spotlux',
      role: 'Commesso al banco',
      location: 'São Paulo',
      bullets: [
        'Primo lavoro: al banco di un negozio di materiale elettrico.',
        "Assistenza al cliente e vendita fin da giovane, l'inizio di tutto.",
      ],
    },
    {
      year: '1989–1993',
      age: '15 – 19 anni',
      company: 'Vaz Atacadista',
      role: 'Commesso al banco → Responsabile di magazzino → Venditore esterno',
      location: 'São Paulo',
      bullets: [
        "Sono entrato a 15 anni nel commercio all'ingrosso di materiale elettrico, ferramenta e idraulica.",
        'A 15 anni e mezzo, responsabile di un magazzino di materiali edili del gruppo.',
        'A 16 anni, promosso a venditore esterno: ho aperto e gestito il portafoglio clienti di una zona di São Paulo, con visite settimanali, quindicinali o mensili ai negozi.',
        'Il titolare ha finanziato la mia auto; fino ai 18 anni pagavo un autista che mi portava dai clienti.',
      ],
    },
    {
      year: '1993',
      age: '19 anni',
      company: 'Ingrosso proprio',
      role: 'Fondatore',
      location: 'São Paulo',
      bullets: [
        'Ho aperto il mio ingrosso di materiale elettrico, ferramenta, idraulica e vernici.',
      ],
    },
    {
      year: '1994',
      age: '20 anni',
      company: 'Venditore ambulante',
      role: 'Venditore itinerante',
      location: 'SP · MG · RJ',
      bullets: [
        'Vendite per un produttore di biglietti di compleanno e di Natale.',
        "L'azienda forniva l'auto e i kit pronti alla consegna; partivo da São Paulo il lunedì e giravo l'entroterra di SP, MG e RJ.",
        'Sceglievo io le destinazioni e coprivo io i costi del viaggio.',
      ],
    },
    {
      year: '1995',
      age: '21 anni',
      company: 'Scuola di Informatica',
      role: 'Socio fondatore',
      location: 'Entroterra di SP',
      bullets: [
        'Con due soci ho aperto una scuola di assemblaggio e manutenzione di computer.',
        'Collaborazioni con club locali di piccole città; promozione tramite media locali e conferenze nelle scuole.',
      ],
    },
    {
      year: '1999–2000',
      age: '25 anni',
      company: 'Stati Uniti',
      role: 'Aiuto giardiniere',
      location: 'Florida, USA',
      bullets: [
        'Ho vissuto un anno in Florida lavorando come aiuto giardiniere.',
        'La prima volta che ho lasciato il Brasile: mi sono immerso in una nuova cultura, lontano da tutto ciò che conoscevo.',
        'Il mio primo lavoro manuale, sotto il caldo della Florida: ho imparato sulla mia pelle la disciplina dello sforzo fisico e il valore di partire dal basso.',
        "È lì che ho imparato l'inglese, sul campo, immerso nella vita quotidiana.",
        "Adattarmi a un paese, una lingua e un mestiere completamente nuovi mi ha dato la resilienza e l'apertura che uso ancora oggi con qualsiasi cliente o mercato.",
      ],
    },
    {
      year: '2000–2004',
      age: '26 – 30 anni',
      company: 'Aerodinâmica Equipamentos Industriais',
      role: 'Venditore tecnico',
      location: 'São Paulo',
      bullets: [
        'Vendita tecnica di tubi termoplastici (PVC, PP, PVDF) per industrie che convogliavano liquidi corrosivi.',
        "Visitavo le fabbriche, specificavo il materiale in base all'acido e alla temperatura, vendevo e negoziavo.",
        "Ho aperto il mercato del PVDF nelle acque iniettabili per l'industria farmaceutica, un settore che fino ad allora usava solo acciaio inossidabile.",
      ],
    },
    {
      year: '2004–2005',
      age: '30 anni',
      company: 'JN Moura',
      role: 'Rappresentante di software ERP',
      location: 'São Paulo',
      bullets: [
        'Rappresentante di un software ERP per negozi e farmacie.',
        'Seguivo il mercato di São Paulo, prospezione, vendita, implementazione, formazione e supporto.',
      ],
    },
    {
      year: '2005–2006',
      age: '31 anni',
      company: 'Adobe Systems',
      role: 'Specialista Commerciale',
      location: 'São Paulo',
      bullets: [
        'Seguivo i grandi clienti. Adobe non vendeva direttamente alle aziende, solo tramite distributori e rivenditori.',
        'Rappresentavo Adobe presso i grandi clienti, curando la relazione e la trattativa; il distributore e il rivenditore eseguivano la vendita tramite il canale.',
        'Offrivo vantaggi come corsi di formazione con i principali specialisti di ogni software, Photoshop, Acrobat, tra gli altri.',
      ],
    },
    {
      year: '2006–2007',
      age: '32 anni',
      company: 'Softcorp',
      role: 'Product Manager · Specialista Adobe',
      location: 'São Paulo',
      bullets: [
        'Product manager, operando come specialista Adobe.',
        "Ho contribuito a esplorare il mercato dell'istruzione, seguendo grandi università e reti di scuole.",
      ],
    },
    {
      year: '2007–2008',
      age: '33 anni',
      company: 'SmartBoard',
      role: 'Vendite tecniche',
      location: 'São Paulo',
      bullets: [
        'Vendita tecnica di lavagne digitali (lavagne interattive) per uffici, industrie e scuole.',
        "Mi occupavo dell'analisi delle esigenze, della dimostrazione e della chiusura.",
      ],
    },
    {
      year: '2009–2017',
      age: '35 – 43 anni',
      company: 'Retrak Empilhadeiras',
      role: 'Specialista in Vendite Tecniche',
      location: 'São Paulo',
      bullets: [
        "Vendite tecniche B2B per un marchio leader di carrelli elevatori nella Grande São Paulo, il principale mercato dell'azienda.",
        'Ho venduto attrezzature nuove e chiuso contratti di noleggio a lungo termine ad alto volume.',
        'Ho gestito clienti dalle PMI alle enterprise: Reckitt Benckiser, Carrefour, Colgate e Droga Raia.',
        'Vendita consulenziale e orientata alla soluzione, dimensionamento tecnico per centri di distribuzione e reti di vendita al dettaglio.',
        'Ho raggiunto e superato gli obiettivi in modo costante.',
      ],
    },
    {
      year: '2017–2018',
      age: '43 anni',
      company: 'Cucina professionale',
      role: 'Cuoco',
      location: 'Italia',
      bullets: [
        "Dopo Retrak, mi sono trasferito in Italia, mi sono formato come cuoco e ho imparato l'italiano immerso nella cultura.",
        "La cucina professionale è una scuola di lavoro di squadra: in una brigata, ogni postazione dipende dall'altra, comunicazione chiara, rapida e senza ego.",
        "Mise en place, costanza e calma nel pieno del servizio, offrire un'esperienza al cliente sotto pressione sono le stesse basi di un buon venditore.",
        'Una reinvenzione completa: imparare un mestiere e una lingua da zero, partendo dal basso.',
      ],
    },
    {
      year: '2018–2023',
      age: '44 – 49 anni',
      company: 'Trasporto & Turismo',
      role: 'Autista Uber → Imprenditore (flotta propria)',
      location: 'Portogallo',
      bullets: [
        'Ho vissuto 5 anni in Portogallo.',
        'Ho iniziato come autista di app e ho costruito la mia operazione, 4 auto e autisti che lavoravano con me.',
        'Ho lavorato molto con il turismo passeggeri e il trasporto di dirigenti.',
      ],
    },
    {
      year: '2023 – oggi',
      age: '49 anni',
      company: 'WB Digital Solutions',
      role: 'Fondatore · Full-Stack & Commerciale',
      location: 'São Paulo · Remoto',
      bullets: [
        'Tornato in Brasile, ho imparato a programmare e ho fondato la mia software house, diventando ingegnere full-stack e di IA.',
        "Gestisco l'intero ciclo commerciale: prospezione, definizione dello scopo, proposta, prezzatura, trattativa e chiusura, con clienti in Brasile, Italia e USA.",
        'Ho costruito un CRM con IA che automatizza il mio stesso processo di vendita.',
        "L'apice del percorso: vendo ciò che costruisco e costruisco ciò che vendo.",
      ],
    },
  ],
  es: [
    {
      year: '1987',
      age: '13 años',
      company: 'Spotlux',
      role: 'Vendedor de mostrador',
      location: 'São Paulo',
      bullets: [
        'Primer empleo: en el mostrador de una tienda de materiales eléctricos.',
        'Atención y ventas desde muy joven, el comienzo de todo.',
      ],
    },
    {
      year: '1989–1993',
      age: '15 – 19 años',
      company: 'Vaz Atacadista',
      role: 'Vendedor de mostrador → Jefe de almacén → Vendedor externo',
      location: 'São Paulo',
      bullets: [
        'Entré a los 15 en la venta mayorista de materiales eléctricos, ferretería y fontanería.',
        'A los 15 y medio, jefe de un almacén de materiales de construcción del grupo.',
        'A los 16, ascendido a vendedor externo: abrí y gestioné la cartera de una zona de São Paulo, con visitas semanales, quincenales o mensuales a las tiendas.',
        'El dueño financió mi coche; hasta los 18, yo pagaba a un chofer para que me llevara a los clientes.',
      ],
    },
    {
      year: '1993',
      age: '19 años',
      company: 'Mayorista propio',
      role: 'Fundador',
      location: 'São Paulo',
      bullets: [
        'Abrí mi propio mayorista de materiales eléctricos, ferretería, fontanería y pinturas.',
      ],
    },
    {
      year: '1994',
      age: '20 años',
      company: 'Vendedor viajante',
      role: 'Vendedor itinerante',
      location: 'SP · MG · RJ',
      bullets: [
        'Ventas para un fabricante de tarjetas de cumpleaños y navidad.',
        'La empresa proporcionaba el coche y los kits de entrega inmediata; salía de São Paulo el lunes y recorría el interior de SP, MG y RJ.',
        'Yo elegía los destinos y cubría los costes del viaje.',
      ],
    },
    {
      year: '1995',
      age: '21 años',
      company: 'Escuela de Informática',
      role: 'Socio fundador',
      location: 'Interior de SP',
      bullets: [
        'Con dos socios, abrí una escuela de montaje y mantenimiento de ordenadores.',
        'Alianzas con clubes locales de pueblos pequeños; difusión a través de medios locales y charlas en escuelas.',
      ],
    },
    {
      year: '1999–2000',
      age: '25 años',
      company: 'Estados Unidos',
      role: 'Auxiliar de jardinería',
      location: 'Florida, EE. UU.',
      bullets: [
        'Viví un año en Florida trabajando como auxiliar de jardinería.',
        'La primera vez que salí de Brasil: me sumergí en una cultura nueva, lejos de todo lo que conocía.',
        'Mi primer trabajo manual, bajo el calor de Florida: aprendí en carne propia la disciplina del esfuerzo físico y el valor de empezar desde abajo.',
        'Fue donde aprendí inglés, en la práctica, inmerso en el día a día.',
        'Adaptarme a un país, un idioma y un oficio totalmente nuevos me dio la resiliencia y la apertura que uso hasta hoy con cualquier cliente o mercado.',
      ],
    },
    {
      year: '2000–2004',
      age: '26 – 30 años',
      company: 'Aerodinâmica Equipamentos Industriais',
      role: 'Vendedor técnico',
      location: 'São Paulo',
      bullets: [
        'Venta técnica de tuberías termoplásticas (PVC, PP, PVDF) para industrias que conducían líquidos corrosivos.',
        'Visitaba las fábricas, especificaba el material según el ácido y la temperatura, vendía y negociaba.',
        'Abrí mercado para el PVDF en aguas inyectables en la industria farmacéutica, un sector que hasta entonces usaba solo acero inoxidable.',
      ],
    },
    {
      year: '2004–2005',
      age: '30 años',
      company: 'JN Moura',
      role: 'Representante de software ERP',
      location: 'São Paulo',
      bullets: [
        'Representante de un software ERP para tiendas y farmacias.',
        'Atendía el mercado de São Paulo, prospección, venta, implementación, formación y soporte.',
      ],
    },
    {
      year: '2005–2006',
      age: '31 años',
      company: 'Adobe Systems',
      role: 'Especialista Comercial',
      location: 'São Paulo',
      bullets: [
        'Atendía grandes cuentas. Adobe no vendía directamente a las empresas, solo a través de distribuidores y revendedores.',
        'Representaba a Adobe en las grandes cuentas, llevando la relación y la negociación; el distribuidor y el revendedor ejecutaban la venta por el canal.',
        'Ofrecía beneficios como formación con los principales especialistas de cada software, Photoshop, Acrobat, entre otros.',
      ],
    },
    {
      year: '2006–2007',
      age: '32 años',
      company: 'Softcorp',
      role: 'Gerente de Producto · Especialista Adobe',
      location: 'São Paulo',
      bullets: [
        'Gerente de producto, actuando como especialista Adobe.',
        'Ayudé a abrir el mercado educativo, atendiendo a grandes universidades y redes de escuelas.',
      ],
    },
    {
      year: '2007–2008',
      age: '33 años',
      company: 'SmartBoard',
      role: 'Ventas técnicas',
      location: 'São Paulo',
      bullets: [
        'Venta técnica de pizarras digitales (pizarras interactivas) para oficinas, industrias y escuelas.',
        'Hacía el relevamiento de necesidades, la demostración y el cierre.',
      ],
    },
    {
      year: '2009–2017',
      age: '35 – 43 años',
      company: 'Retrak Empilhadeiras',
      role: 'Especialista en Ventas Técnicas',
      location: 'São Paulo',
      bullets: [
        'Ventas técnicas B2B para una marca líder de montacargas en la Gran São Paulo, el principal mercado de la empresa.',
        'Vendí equipos nuevos y cerré contratos de alquiler a largo plazo de alto volumen.',
        'Gestioné cuentas desde pymes hasta enterprise: Reckitt Benckiser, Carrefour, Colgate y Droga Raia.',
        'Venta consultiva y orientada a la solución, dimensionamiento técnico para centros de distribución y redes minoristas.',
        'Alcancé y superé objetivos de forma constante.',
      ],
    },
    {
      year: '2017–2018',
      age: '43 años',
      company: 'Cocina profesional',
      role: 'Cocinero',
      location: 'Italia',
      bullets: [
        'Después de Retrak, me mudé a Italia, me formé como cocinero y aprendí italiano inmerso en la cultura.',
        'La cocina profesional es escuela de trabajo en equipo: en una brigada, cada estación depende de la otra, comunicación clara, rápida y sin ego.',
        'Mise en place, consistencia y calma en el punto álgido del servicio, entregar experiencia al cliente bajo presión son las mismas bases de un buen vendedor.',
        'Una reinvención completa: aprender un oficio y un idioma desde cero, empezando desde abajo.',
      ],
    },
    {
      year: '2018–2023',
      age: '44 – 49 años',
      company: 'Transporte & Turismo',
      role: 'Conductor Uber → Emprendedor (flota propia)',
      location: 'Portugal',
      bullets: [
        'Viví 5 años en Portugal.',
        'Empecé como conductor de app y monté mi propia operación, 4 coches y conductores trabajando conmigo.',
        'Trabajé mucho con turismo de pasajeros y transporte de ejecutivos.',
      ],
    },
    {
      year: '2023 – hoy',
      age: '49 años',
      company: 'WB Digital Solutions',
      role: 'Fundador · Full-Stack & Comercial',
      location: 'São Paulo · Remoto',
      bullets: [
        'De vuelta en Brasil, aprendí a programar y fundé mi software house, me convertí en ingeniero full-stack y de IA.',
        'Llevo el ciclo comercial completo: prospección, alcance, propuesta, precificación, negociación y cierre, con clientes en Brasil, Italia y EE. UU.',
        'Construí un CRM con IA que automatiza mi propio proceso de ventas.',
        'La cúspide del recorrido: vendo lo que construyo y construyo lo que vendo.',
      ],
    },
  ],
};
