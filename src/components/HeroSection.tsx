import { motion } from "framer-motion";
import { useTranslations } from "@/contexts/TranslationContext";
import Image from "next/image";

import { styles } from "../styles/styles.js";

import ComputersCanvas from "./canvas/ComputersCanvas";

import { Button } from "./Button";
import SpinnerLoader from "./Spinner";

const HeroSection: React.FC = () => {
    const currentMessages = useTranslations();

    return (
        <section className="relative w-full h-screen mx-auto">
            <div className="inset-0 top-[20px] lg:mt-10 max-w-7xl mx-auto flex flex-row items-start gap-5">
                <div className="flex flex-col justify-center items-center">
                    <Image
                        src="/svg/BengalaWBSIte.svg"
                        alt="ilustracao"
                        width={20}
                        height={80}
                    />
                </div>

                <div>
                    <h1 className={`${styles.heroHeadText} text-white title `}>
                        {currentMessages.welcome}{" "}
                        <p className="text-[#792990] opacity-25">
                            WB Digital Solutions
                        </p>
                        <SpinnerLoader />
                    </h1>

                    <p
                        className={`${styles.heroSubText} mt-2 text-white-100 relative w-96 text-[16px] tracking-wider leading-tight font-light leading-relaxed`}
                    >
                        <span>{currentMessages.services1} </span>
                        <br className="sm:block hidden " />
                        {currentMessages.services2}{" "}
                        <br className="sm:block hidden  " />
                        {currentMessages.services3}{" "}
                        <br className="sm:block hidden " />
                        {currentMessages.services4}{" "}
                    </p>
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
