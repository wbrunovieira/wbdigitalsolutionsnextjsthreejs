import { motion } from 'framer-motion';
import { useTranslations } from '@/contexts/TranslationContext';

import { styles } from '../styles/styles.js';

import ComputersCanvas from './canvas/ComputersCanvas';
import HighTechMinimalistLineLight from './HighTechMinimalistLineLight';
import CanvasTextMasterclass from './CanvasTextMasterclass';
import { Button } from './Button';

const HeroSection: React.FC = () => {
  const currentMessages = useTranslations();

  return (
    <section className=' relative w-full h-screen mx-auto hero bg'>
      <div className='absolute inset-0 top-[120px] lg:mt-10 max-w-7xl mx-auto  flex flex-row items-start gap-5'>
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#792990]' />
          <div className='w-1 sm:h-80 h-40 bg-gradient-to-r from-custom-purple to-transparent' />
        </div>

        <div>
          <div className='high-tech-minimalist-line-light'>
            <div className='line'></div>
          </div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            {currentMessages.welcome}{' '}
            <p className='text-[#792990]'>WB Digital Solutions</p>
          </h1>
          <Button href='#' text=' contate ' />
          <p className={`${styles.heroSubText} mt-6 text-white-100`}>
            {currentMessages.services1} <br className='sm:block hidden' />
            {currentMessages.services2}
          </p>
        </div>
      </div>

      <ComputersCanvas />

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop',
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
