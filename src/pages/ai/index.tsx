
import { AIHeader } from '@/components/AIHeader';

import AnimatedBackgroundAIComponent from '@/components/AnimatedBackgoundAIComponent';
import dynamic from 'next/dynamic';


const LLMSection = dynamic(() => import('@/components/AILLMSection'), { ssr: false });

const ai: React.FC = () => {
  return <main>
      <div className="relative w-full mt-32 ">
        <div className="fixed inset-0 z-0">

              <AnimatedBackgroundAIComponent />
        </div>
        <div className="relative z-10">
          <AIHeader scrollIndicatorHidden={true} />
        </div>
         <div className="relative z-10">

        <LLMSection  />
        </div>
    </div>
  </main>
};

export default ai;
