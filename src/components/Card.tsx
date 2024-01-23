import { motion } from 'framer-motion';

import { fadeIn, textVariant } from '../utils/motion';
import Image from 'next/image';

interface CardProps {
  index: number;
  name: string;
  description: string;
  image: string;
}

const Card = ({ index, name, description, image }: CardProps) => {
  return (
    <motion.div variants={fadeIn('up', 'spring', index * 0.5, 0.75)}>
      <div className='bg-primary p-5 rounded-2xl sm:w-[300px] w-full mt-6 ml-6'>
        <div className='relative w-full h-[230px]'>
          <Image
            src={image}
            width={100}
            height={300}
            alt='project_image'
            className='w-full h-full object-cover rounded-2xl'
          />

          <div className='absolute inset-0 flex justify-end m-3 card-img_hover'></div>
        </div>

        <div className='mt-5'>
          <h3 className='text-white font-bold text-[24px]'>{name}</h3>
          <p className='mt-2 text-secondary text-[14px]'>{description}</p>
        </div>

        <div className='mt-4 flex flex-wrap gap-2'></div>
      </div>
    </motion.div>
  );
};

export default Card;
