export interface ShowcaseTexts {
  exit: string;
  controls: string;
  mouse: string;
  scroll: string;
  click: string;
  watch: string;
  loading: string;
  touchDrag: string;
  pinchZoom: string;
  navWebsites: string;
  navAutomation: string;
  navAi: string;
}

// Translation texts
export const getShowcaseTexts = (language: string): ShowcaseTexts => {
  switch (language) {
    case 'pt-BR':
    case 'pt':
      return {
        exit: 'Sair da Experiência 3D',
        controls: 'Controles:',
        mouse: 'Mouse: Olhar ao redor',
        scroll: 'Scroll: Zoom in/out',
        click: 'Clique nos botões nas mesas',
        watch: 'Observe a bola quicar!',
        loading: 'Carregando Ambiente 3D...',
        touchDrag: 'Toque e arraste para girar',
        pinchZoom: 'Pinça para zoom',
        navWebsites: 'Sites',
        navAutomation: 'Automação',
        navAi: 'I.A.',
      };
    case 'es':
      return {
        exit: 'Salir de la Experiencia 3D',
        controls: 'Controles:',
        mouse: 'Ratón: Mirar alrededor',
        scroll: 'Scroll: Acercar/Alejar',
        click: 'Haz clic en los botones de los escritorios',
        watch: '¡Mira la pelota rebotar!',
        loading: 'Cargando Entorno 3D...',
        touchDrag: 'Toca y arrastra para girar',
        pinchZoom: 'Pellizca para zoom',
        navWebsites: 'Sitios',
        navAutomation: 'Automatización',
        navAi: 'I.A.',
      };
    case 'it':
      return {
        exit: 'Esci dall\'Esperienza 3D',
        controls: 'Controlli:',
        mouse: 'Mouse: Guarda intorno',
        scroll: 'Scroll: Zoom avanti/indietro',
        click: 'Clicca sui pulsanti sulle scrivanie',
        watch: 'Guarda la palla rimbalzare!',
        loading: 'Caricamento Ambiente 3D...',
        touchDrag: 'Tocca e trascina per ruotare',
        pinchZoom: 'Pizzica per lo zoom',
        navWebsites: 'Siti',
        navAutomation: 'Automazione',
        navAi: 'I.A.',
      };
    default: // 'en'
      return {
        exit: 'Exit 3D Experience',
        controls: 'Controls:',
        mouse: 'Mouse: Look around',
        scroll: 'Scroll: Zoom in/out',
        click: 'Click buttons on desks',
        watch: 'Watch the ball bounce!',
        loading: 'Loading 3D Environment...',
        touchDrag: 'Touch and drag to rotate',
        pinchZoom: 'Pinch to zoom',
        navWebsites: 'Websites',
        navAutomation: 'Automation',
        navAi: 'A.I.',
      };
  }
};
