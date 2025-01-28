import dynamic from 'next/dynamic';

import AnimatedBackgroundAutomationComponent from '@/components/AnimatedBackgorundAutomation';import AnimatedBackgroundAIComponent from '@/components/AnimatedBackgoundAIComponent';
import { AutomationHeader } from '@/components/AutomationHeader';

const AnimatedBenefits = dynamic(() => import('@/components/AutomationBenefits'), { ssr: false });
const AutomationCases = dynamic(() => import('@/components/AutomationCases'), { ssr: false });



const ai: React.FC = () => {
  return <main>
      <div className="relative w-full h-96 overflow-hidden mt-32">
        <div className="absolute inset-0 z-0 h-96">

         <AnimatedBackgroundAutomationComponent />
        </div>
        <div className="relative z-10">
          <AutomationHeader scrollIndicatorHidden={true} />
        </div>
    </div>
    <AnimatedBenefits />
    <AutomationCases />


  </main>
};

export default ai;
