'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { styles } from '../styles/styles.js';
import ComputersCanvas from './canvas/ComputersCanvas.client';
import { Button } from './Button';
import Quote from './Quote';

const HeroSection = () => {
  const t = useTranslations('Index');

  return (
    <section className='relative w-full h-screen mx-auto hero'>
      <div className='absolute inset-0 top-[120px] lg:mt-10 max-w-7xl mx-auto flex flex-row items-start gap-5'>
        <div className='flex flex-col justify-center items-center mt-5'>
          <Image
            src='/svg/BengalaWBSIte.svg'
            alt='ilustração'
            width={20}
            height={80}
          />
        </div>

        <div>
          <div className={`${styles.heroHeadText} text-white`}>
            {t('title')}
            <h1 className='text-[#792990]'>WB Digital Solutions</h1>
          </div>

          <p className={`${styles.heroSubText} mt-2 text-white-100 relative`}>
            {t('services1')} <br className='sm:block hidden text-xs' />
            {t('services2')}
          </p>
          <Button href='#' text={t('contactbutton')} />
        </div>
        <Quote quote={t('quote')} author={t('author')} />
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
