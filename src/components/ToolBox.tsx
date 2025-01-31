import BallCanvas from './canvas/Ball';
import { Tooltip } from 'react-tooltip';


import { technologies } from '../constants';
import { useRef } from 'react';
import { useTranslations } from '@/contexts/TranslationContext';

const ToolBox = () => {

    const ballRefs = useRef<(HTMLDivElement | null)[]>([]);
    const currentMessages = useTranslations();

    return (
        <div className='bg-modern-gradient pt-8 md:px-10  flex flex-col justify-center mt-32 pb-16'>
            <h2 className={'text-white text-3xl text-center p-2'}>
                {currentMessages.tools}{' '}
            </h2>

            <div className='w-full border-t border-gray-200 my-8 opacity-50  items-center'></div>
            <div className='flex flex-row flex-wrap justify-center gap-10'>
                {technologies.map((technology, index) => (
                    <div
                        className="w-20 h-20 md:w-28 md:h-28 flex justify-center items-center"
                        key={technology.name}
                        ref={(el) => {
                            ballRefs.current[index] = el; 
                        }}
                        data-tooltip-id='tech-tooltip'
                        data-tooltip-content={technology.name}
                    >
                        <div
                            data-tooltip-id='tech-tooltip'
                            data-tooltip-content={technology.name}
                        >
                            <BallCanvas icon={technology.icon} />
                        </div>
                        <Tooltip id='tech-tooltip' />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ToolBox;
