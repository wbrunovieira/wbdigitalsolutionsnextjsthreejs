import { useTranslations } from "@/contexts/TranslationContext";
import Image from "next/image";
import ComputersCanvas from "./canvas/ComputersCanvas";
import { Button } from "./Button";
import { AnimatedTextHero } from "./AnimatedTextHero";

const HeroSection: React.FC = () => {
  const currentMessages = useTranslations();

  return (
<section className="w-full pt-32 bg-modern-gradient">

  <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-start justify-between gap-2">
    
    
    <div className="md:w-1/2 w-full flex flex-col items-start md:items-start text-left  gap-4 z-10">
      <AnimatedTextHero 
        name={currentMessages.heroTitleHome}
        disciplines={[
          currentMessages.services1, 
          currentMessages.services2, 
          currentMessages.services3, 
          currentMessages.services4
        ]}
      />
      <div className="mt-8">
        
          <Button 
        href="https://wa.me/5511982864581"
        text={currentMessages.contactbutton} 
        />
        </div>
    </div>
    
 

       <div className="w-full md:w-[600px] h-[500px] overflow-visible">

        <ComputersCanvas />
       </div>

    
  </div>
</section>
  );
};

export default HeroSection;

