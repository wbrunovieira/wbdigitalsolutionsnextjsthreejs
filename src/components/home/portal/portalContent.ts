export interface PortalContent {
  title: string;
  subtitle: string;
  description: string;
  showcaseBtn: string;
  showcaseDesc: string;
  tunnelBtn: string;
  tunnelDesc: string;
  enterText: string;
  featuresTitle: string;
}

/** Copy for the "portal to the 3D experiences" home section. */
export const getPortalContent = (language: string): PortalContent => {
  // Handle both 'pt' and 'pt-BR'
  const lang = language === 'pt-BR' ? 'pt' : language;

  switch (lang) {
    case 'pt':
      return {
        title: 'Portal para o Futuro Digital',
        subtitle: 'Mergulhe em experiências 3D revolucionárias',
        description: 'Tecnologia de ponta que transforma sua visão em realidade digital imersiva',
        showcaseBtn: 'Escritório Virtual 3D',
        showcaseDesc: 'Explore nosso espaço interativo com hologramas e animações',
        tunnelBtn: 'Túnel Hiperespacial',
        tunnelDesc: 'Viaje através de dimensões tecnológicas infinitas',
        enterText: 'ENTRAR',
        featuresTitle: 'Experiências Únicas',
      };
    case 'es':
      return {
        title: 'Portal al Futuro Digital',
        subtitle: 'Sumérgete en experiencias 3D revolucionarias',
        description: 'Tecnología de vanguardia que transforma tu visión en realidad digital inmersiva',
        showcaseBtn: 'Oficina Virtual 3D',
        showcaseDesc: 'Explora nuestro espacio interactivo con hologramas y animaciones',
        tunnelBtn: 'Túnel Hiperespacial',
        tunnelDesc: 'Viaja a través de dimensiones tecnológicas infinitas',
        enterText: 'ENTRAR',
        featuresTitle: 'Experiencias Únicas',
      };
    case 'it':
      return {
        title: 'Portale verso il Futuro Digitale',
        subtitle: 'Immergiti in esperienze 3D rivoluzionarie',
        description: 'Tecnologia all\'avanguardia che trasforma la tua visione in realtà digitale immersiva',
        showcaseBtn: 'Ufficio Virtuale 3D',
        showcaseDesc: 'Esplora il nostro spazio interattivo con ologrammi e animazioni',
        tunnelBtn: 'Tunnel Iperspaziale',
        tunnelDesc: 'Viaggia attraverso dimensioni tecnologiche infinite',
        enterText: 'ENTRA',
        featuresTitle: 'Esperienze Uniche',
      };
    default:
      return {
        title: 'Portal to the Digital Future',
        subtitle: 'Dive into revolutionary 3D experiences',
        description: 'Cutting-edge technology that transforms your vision into immersive digital reality',
        showcaseBtn: '3D Virtual Office',
        showcaseDesc: 'Explore our interactive space with holograms and animations',
        tunnelBtn: 'Hyperspace Tunnel',
        tunnelDesc: 'Travel through infinite technological dimensions',
        enterText: 'ENTER',
        featuresTitle: 'Unique Experiences',
      };
  }
};
