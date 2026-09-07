import { ModalContent } from './types';

export const getModalContent = (language: string): ModalContent => {
  switch (language) {
    case 'pt-BR':
      return {
        close: 'Fechar',
        viewLive: 'Saber Mais',
        viewCode: 'Ver Código',
        features: 'Recursos',
        technologies: 'Tecnologias',
        next: 'Próximo',
        previous: 'Anterior',
      };
    case 'es':
      return {
        close: 'Cerrar',
        viewLive: 'Saber Más',
        viewCode: 'Ver Código',
        features: 'Características',
        technologies: 'Tecnologías',
        next: 'Siguiente',
        previous: 'Anterior',
      };
    case 'it':
      return {
        close: 'Chiudi',
        viewLive: 'Scopri di Più',
        viewCode: 'Vedi Codice',
        features: 'Caratteristiche',
        technologies: 'Tecnologie',
        next: 'Prossimo',
        previous: 'Precedente',
      };
    default:
      return {
        close: 'Close',
        viewLive: 'View Details',
        viewCode: 'View Code',
        features: 'Features',
        technologies: 'Technologies',
        next: 'Next',
        previous: 'Previous',
      };
  }
};
