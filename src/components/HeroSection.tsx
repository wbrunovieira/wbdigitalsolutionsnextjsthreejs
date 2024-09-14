import { motion } from "framer-motion";
import { useTranslations } from "@/contexts/TranslationContext";
import Image from "next/image";

import { styles } from "../styles/styles.js";

import ComputersCanvas from "./canvas/ComputersCanvas";

import { Button } from "./Button";

const HeroSection: React.FC = () => {
    const currentMessages = useTranslations();

    return (
        <section className=" relative w-full h-screen mx-auto hero">
            <div className="absolute inset-0 top-[20px] lg:mt-10 max-w-7xl mx-auto flex flex-row items-start gap-5">
                <div className="flex flex-col justify-center items-center">
                    <Image
                        src="/svg/BengalaWBSIte.svg"
                        alt="ilustracao"
                        width={20}
                        height={80}
                    />
                </div>

                <div>
                    <h1 className={`${styles.heroHeadText} text-white title`}>
                        {currentMessages.welcome}{" "}
                        <p className="text-[#792990]">WB Digital Solutions</p>
                    </h1>

                    <p
                        className={`${styles.heroSubText} mt-2 text-white-100 relative`}
                    >
                        {currentMessages.services1}{" "}
                        <br className="sm:block hidden text-xs" />
                        {currentMessages.services2}
                    </p>
                    <Button href="#" text={currentMessages.contactbutton} />
                </div>
            </div>

            <ComputersCanvas />

        </section>
    );
};

export default HeroSection;
