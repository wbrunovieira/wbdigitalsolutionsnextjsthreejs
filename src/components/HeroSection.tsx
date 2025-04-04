import { useTranslations } from "@/contexts/TranslationContext";
import Image from "next/image";
import ComputersCanvas from "./canvas/ComputersCanvas";
import { Button } from "./Button";
import { AnimatedTextHero } from "./AnimatedTextHero";

const HeroSection: React.FC = () => {
  const currentMessages = useTranslations();

  return (
<section className="w-full  px-4 md:px-8 mt-32 ">

  <div className="flex flex-col md:flex-row items-start justify-between gap-2">
    
    
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
      
      <Button 
        href="https://wa.me/5511982864581"
        text={currentMessages.contactbutton} 
      />
    </div>
    
 

       <div className="w-full md:w-[400px] h-[400px]">

        <ComputersCanvas />
       </div>

    
  </div>
</section>
  );
};

export default HeroSection;

