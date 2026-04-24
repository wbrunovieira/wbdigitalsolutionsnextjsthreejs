import BallCanvas from './canvas/Ball';
import { Tooltip } from 'react-tooltip';
import { technologies } from '../constants';
import { useTranslations } from '@/contexts/TranslationContext';

const ToolBox = () => {
    const currentMessages = useTranslations();

    return (
        <div className='bg-modern-gradient pt-8 flex flex-col justify-center mt-32 pb-16 relative'>
            <div className='max-w-[1400px] mx-auto px-4 md:px-10 w-full'>
                <h2 className='text-white text-3xl text-center p-2'>
                    {currentMessages.tools}
                </h2>
                <div className='w-full border-t border-gray-200 my-8 opacity-50' />
                <div className='flex flex-row flex-wrap justify-center gap-10'>
                    {technologies.map((technology, index) => (
                        <div
                            className="w-20 h-20 md:w-28 md:h-28"
                            key={technology.name}
                            data-tooltip-id='tech-tooltip'
                            data-tooltip-content={technology.name}
                        >
                            <BallCanvas icon={technology.icon} index={index} />
                        </div>
                    ))}
                    <Tooltip id='tech-tooltip' />
                </div>
            </div>
        </div>
    );
};

export default ToolBox;
