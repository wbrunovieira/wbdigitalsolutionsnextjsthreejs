import React, { useRef } from 'react';

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Card from './Card';





const SectionDaHome: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  gsap.registerPlugin(ScrollTrigger); 
  useGSAP(() => {
   
   

    gsap.to('.title_paralax', {
			scrollTrigger: {
				trigger: '.header',
				start: 'top center',
        end: 'bottom center', 
				scrub: true,
        markers: {startColor: 'white', endColor: 'white', fontSize: '18px', fontWeight: 'bold', indent: 20}
			},
			
		});
		
  
  }, { scope: container });




  return (
    <section  className="">

      	<header ref={container} className="bg-home-section bg-cover bg-no-repeat w-full h-full">

          
			    <h1 className="" data-splitting><span className="title_paralax">Sistemas</span><span className="stroke">WebSites</span></h1>


          <Card 
            index={1} 
            name="Nome do Projeto" 
            description="Descrição do Projeto" 
            image="svg/bghome.svg"
          />
							
		  </header>
    </section>
  );
};

export default SectionDaHome;
