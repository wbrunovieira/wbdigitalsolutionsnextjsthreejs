import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Card from './Card';

const SectionDaHome: React.FC = () => {
  return (
    <div className='bg-home-cards w-full'>
      <h1>teste</h1>
      {/* <Card
        index={1}
        name='Nome do Projeto'
        description='Descrição do Projeto'
        image='svg/bghome.svg'
      /> */}
    </div>
  );
};

export default SectionDaHome;
