import { motion } from "framer-motion";
import { useTranslations } from "@/contexts/TranslationContext";
import Image from "next/image";

import { styles } from "../styles/styles.js";

import ComputersCanvas from "./canvas/ComputersCanvas";

import { Button } from "./Button";
import SpinnerLoader from "./Spinner";
import { AnimatedTextHero } from "./AnimatedTextHero";

const HeroSection: React.FC = () => {
    const currentMessages = useTranslations();

    return (
        <section className="relative w-full h-screen mx-auto mt-24">
            <div className="inset-0 top-[20px] lg:mt-10 max-w-7xl mx-auto flex flex-row items-start gap-2">
                <div className="flex flex-col justify-center items-center">
                    <Image
                        src="/svg/BengalaWBSIte.svg"
                        alt="ilustracao"
                        width={20}
                        height={80}
                    />
                </div>

                <div>
             

                    <AnimatedTextHero 
                        name={currentMessages.heroTitleHome}
                    
                     disciplines={[currentMessages.services1, currentMessages.services2, currentMessages.services3, currentMessages.services4]} 
                    />


                    <Button href="#" text={currentMessages.contactbutton} />
                </div>
            </div>

            <div className="absolute inset-0">

                <ComputersCanvas />
            </div>

        </section>
    );
};

export default HeroSection;
