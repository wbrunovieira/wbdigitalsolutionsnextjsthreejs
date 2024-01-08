import React, { useRef } from 'react';

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';





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
			},
			
		});
		
  
  }, { scope: container });




  return (
    <section  ref={container}>
      	<header className="header">

          <h1  ref={container} className="title">teste</h1>
			    <h1 className="title" data-splitting><span className="title_paralax">Parallax effect</span><span className="stroke">on
					gsap</span></h1>


			
							
		</header>
    </section>
  );
};

export default SectionDaHome;
