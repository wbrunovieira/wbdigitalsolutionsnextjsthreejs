import dynamic from 'next/dynamic';

import AnimatedBackgroundAutomationComponent from '@/components/AnimatedBackgorundAutomation';

import CallToActionAutomation from '@/components/AutomationCTA';
import { AutomationHeader } from '@/components/AutomationHeader';
import PageHead from '@/components/PageHead';


const AnimatedBenefits = dynamic(() => import('@/components/AutomationBenefits'), { ssr: false });
const AutomationCases = dynamic(() => import('@/components/AutomationCases'), { ssr: false });
const Technologies = dynamic(() => import('@/components/AutomationTecs'), { ssr: false });




const ai: React.FC = () => {
  return(
    <>
      <PageHead pageKey="automation" />
      <main className="relative flex flex-col items-center justify-center bg-modern-gradient min-h-screen w-full max-w-7xl mx-auto">

      <div className="ml-8 md:ml-20 md:relative flex flex-col md:flex-row w-full h-96 overflow-hidden mt-32">


         <div className="relative md:absolute inset-0 z-0">

         <AnimatedBackgroundAutomationComponent />
        </div>
         <div className="relative z-10 flex flex-col justify-center items-center w-full md:w-auto min-h-[8rem]">
          <AutomationHeader scrollIndicatorHidden={true} />
        </div>
    </div>
    <AnimatedBenefits />
    <AutomationCases />
    <Technologies />
    <CallToActionAutomation />


      </main>
    </>
  ) 
};

export default ai;
