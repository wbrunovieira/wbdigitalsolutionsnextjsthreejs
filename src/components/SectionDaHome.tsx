import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Card from './Card';

const SectionDaHome: React.FC = () => {
  return (
    <section className='relative w-full h-screen mx-auto bg-[#190321]'>
      <Card
        index={1}
        name='Nome do Projeto'
        description='Descrição do Projeto'
        image='svg/bghome.svg'
      />
    </section>
  );
};

export default SectionDaHome;
