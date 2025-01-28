
import { AIHeader } from '@/components/AIHeader';


import AnimatedBackgroundAIComponent from '@/components/AnimatedBackgoundAIComponent';

import dynamic from 'next/dynamic';


const LLMSection = dynamic(() => import('@/components/AILLMSection'), { ssr: false });
const MachineLearningServices = dynamic(() => import('@/components/AIMLServices'), { ssr: false });
const VisionComputationalSection = dynamic(() => import('@/components/IAVision'), { ssr: false });

const ai: React.FC = () => {
  return <main >
      <div className="relative w-full mt-32 ">

        <div className="flex relative inset-0 z-0">

          <AIHeader scrollIndicatorHidden={true} />
           <AnimatedBackgroundAIComponent />
        </div>
        <div className="relative z-10">
        </div>
         <div className="relative z-10">

        <LLMSection  />
        </div>
         <div className="relative z-10">

        <MachineLearningServices  />
        </div>
         <div className="relative z-10">

        <VisionComputationalSection  />
        </div>
    </div>
  </main>
};

export default ai;
