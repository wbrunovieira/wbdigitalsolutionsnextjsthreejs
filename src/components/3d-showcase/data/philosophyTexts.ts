export interface PhilosophyTexts {
  mission: string;
  missionText: string;
  vision: string;
  visionText: string;
  values: string;
  value1: string;
  value2: string;
  value3: string;
  value4: string;
}

/** Company philosophy copy shown on the right-wall screen of the 3D room. */
export const getPhilosophyTexts = (language: string): PhilosophyTexts => {
  switch (language) {
    case 'pt-BR':
    case 'pt':
      return {
        mission: 'NOSSA MISSÃO',
        missionText: 'Dar vida a ideias, criando soluções digitais que realmente ajudam pessoas e negócios.',
        vision: 'NOSSA VISÃO',
        visionText: 'Ser reconhecida pela forma como unimos tecnologia e criatividade para transformar realidades.',
        values: 'NOSSOS VALORES',
        value1: '• Inovar sempre com propósito',
        value2: '• Qualidade em cada detalhe',
        value3: '• Parceria de confiança',
        value4: '• Impacto que pode ser medido',
      };
    case 'es':
      return {
        mission: 'NUESTRA MISIÓN',
        missionText: 'Dar vida a las ideas, creando soluciones digitales que realmente ayuden a las personas y negocios.',
        vision: 'NUESTRA VISIÓN',
        visionText: 'Ser reconocida por la forma en que unimos tecnología y creatividad para transformar realidades.',
        values: 'NUESTROS VALORES',
        value1: '• Innovar siempre con propósito',
        value2: '• Calidad en cada detalle',
        value3: '• Alianza de confianza',
        value4: '• Impacto que se puede medir',
      };
    case 'it':
      return {
        mission: 'LA NOSTRA MISSIONE',
        missionText: 'Dare vita alle idee, creando soluzioni digitali che realmente aiutino persone e imprese.',
        vision: 'LA NOSTRA VISIONE',
        visionText: 'Essere riconosciuta per il modo in cui uniamo tecnologia e creatività per trasformare le realtà.',
        values: 'I NOSTRI VALORI',
        value1: '• Innovare sempre con uno scopo',
        value2: '• Qualità in ogni dettaglio',
        value3: '• Partnership di fiducia',
        value4: '• Impatto che può essere misurato',
      };
    default:
      return {
        mission: 'OUR MISSION',
        missionText: 'Bring ideas to life by creating digital solutions that truly help people and businesses.',
        vision: 'OUR VISION',
        visionText: 'To be recognized for the way we unite technology and creativity to transform realities.',
        values: 'OUR VALUES',
        value1: '• Innovate always with purpose',
        value2: '• Quality in every detail',
        value3: '• Trusted partnership',
        value4: '• Impact that can be measured',
      };
  }
};
