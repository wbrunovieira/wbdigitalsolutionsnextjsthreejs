import  { useState } from 'react';
import { motion } from 'framer-motion';


import { styles } from '../styles/styles';

import  EarthCanvas  from './canvas/Earth';

import { slideIn } from '../utils/motion';

const Contact: React.FC = () => {
  
 



  return (
    <div
      className={'flex flex-row  p-16 mx-auto h-screen relative'}
    >
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className='flex-1 bg-black-100 rounded-2xl z-50 fixed '
        style={{ width: '50%' }} 
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadtext}>Contact.</h3>

        <form

          className='mt-12 flex flex-col gap-8 w-full'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input
              type='text'
              name='name'
            
              placeholder="What's your good name?"
              className='bg-primary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your email</span>
            <input
              type='email'
              name='email'
             
              placeholder="What's your web address?"
              className='bg-primary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea
              rows={7}
              name='message'
           
              placeholder='What you want to say?'
              className='bg-primary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>

          <button
            type='submit'
            className='bg-primary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
          >
            
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className='flex-1 xl:h-auto md:h-[550px] h-[350px] absolute'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default Contact;