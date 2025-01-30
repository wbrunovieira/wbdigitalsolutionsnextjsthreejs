"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/contexts/TranslationContext";

export function AppleCardsCarouselDemo() {
    const { language } = useLanguage();
    const currentMessages = useTranslations();



    const cards = data.map((card, index) => (
        <Card
            key={card.src}
            card={{
                ...card,
                category: currentMessages[card.category],
                title: currentMessages[card.title],
            }}
            index={index}
        />
    ));

    return (
        <div className="w-full h-full py-20 mt-20">
            <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-white font-sans">
                {currentMessages.transformYourBusiness}
            </h2>
            <Carousel items={cards} />
        </div>
    );
}


const WebContent = () => {
    const currentMessages = useTranslations();

    return (
        <div className="flex flex-col gap-6 p-4 md:p-8 lg:p-14">
            {/* 🟣 Seção 1 */}
            <div className="flex flex-col md:flex-row bg-[#F5F5F7] p-6 md:p-12 rounded-3xl gap-6 items-center">
                <div className="md:w-1/2">
                    <p className="text-custom-purple text-lg md:text-2xl font-sans mx-auto">
                        <span className="font-bold text-primary">
                            {currentMessages.cardAppleContentWeb1} <br />
                        </span>
                        <span className="text-primary text-2xl mt-4">
                            {currentMessages.cardAppleContentWeb2}
                        </span>
                    </p>
                </div>
                <Image
                    src="/img/tech3d2.png"
                    alt="logo"
                    width={400}
                    height={400}
                    className="w-full md:w-1/2 h-auto object-contain"
                />
            </div>

            {/* 🟢 Seção 2 */}
            <div className="flex flex-col md:flex-row bg-[#F5F5F7] dark:bg-neutral-800 p-6 md:p-12 rounded-3xl gap-6 items-center">
                <Image
                    src="/img/7Site2.png"
                    alt="logo"
                    width={800}
                    height={800}
                    className="w-full md:w-2/3 h-auto object-contain"
                />
                <div className="text-custom-purple dark:text-neutral-400 text-lg md:text-2xl font-sans mx-auto">
                    <p className="font-bold text-primary dark:text-neutral-200">
                        {currentMessages.cardAppleContentWeb3} <br />
                    </p>
                    <p className="text-primary text-2xl mt-4">
                        {currentMessages.cardAppleContentWeb4}
                    </p>
                </div>
            </div>

            {/* 🔵 Seção 3 (Vídeo de fundo) */}
            <div className="relative bg-[#F5F5F7] dark:bg-neutral-800 p-6 md:p-12 rounded-3xl overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover z-0 rounded-3xl"
                >
                    <source src="/videos/security-website2_lowbitrate.mp4" type="video/mp4" />
                    Seu navegador não suporta vídeos HTML5.
                </video>
                <div className="relative z-10 w-full md:w-1/2 text-white p-4">
                    <p className="text-lg md:text-2xl font-sans mx-auto">
                        <span className="font-bold text-neutral-100 text-2xl">
                            {currentMessages.cardAppleContentWeb5} <br />
                        </span>
                        <p className="mt-4 text-xl">{currentMessages.cardAppleContentWeb6}</p>
                        <p className="mt-4 text-xl">{currentMessages.cardAppleContentWeb6_2}</p>
                    </p>
                </div>
            </div>

            {/* 🟡 Seção 4 */}
            <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-6 md:p-12 rounded-3xl">
                <div className="text-neutral-600 dark:text-neutral-400 text-lg md:text-2xl font-sans mx-auto">
                    <p className="mt-4 font-bold text-neutral-700 dark:text-neutral-200">
                        {currentMessages.cardAppleContentWeb7}
                    </p>
                    <p className="mt-4 text-xl">{currentMessages.cardAppleContentWeb8}</p>
                </div>
                <Image
                    src="/img/website-hands.png"
                    alt="logo"
                    width={500}
                    height={500}
                    className="mt-4 w-full md:w-1/2 h-auto rounded object-contain"
                />
            </div>

            {/* 🔴 Seção 5 (Vídeo final) */}
            <div className="relative bg-[#F5F5F7] dark:bg-neutral-800 p-6 md:p-12 rounded-3xl overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto object-cover rounded-3xl aspect-video"
                >
                    <source src="/videos/www_optimized.mp4" type="video/mp4" />
                    Seu navegador não suporta vídeos HTML5.
                </video>
            </div>
        </div>
    );
};





const MachineContent = () => {
    const currentMessages = useTranslations();

    return (
        <div className="flex flex-col gap-6 p-4 md:p-8 lg:p-14">
            {/* 🟣 Seção 1 */}
            <div className="flex flex-col md:flex-row bg-[#F5F5F7] p-6 md:p-12 rounded-3xl gap-6 items-center">
                <div className="md:w-1/2 text-center md:text-left">
                    <p className="text-custom-purple text-lg md:text-2xl font-sans mx-auto">
                        <span className="font-bold text-primary">
                            {currentMessages.cardAppleContentMachine1}
                        </span>
                        <span className="text-primary text-2xl mt-4">
                            {currentMessages.cardAppleContentMachine2}
                        </span>
                    </p>
                </div>
                <Image
                    src="/img/machinelearning.jpeg"
                    alt="Machine Learning"
                    width={500}
                    height={500}
                    className="w-full md:w-1/2 h-auto object-cover rounded-lg"
                />
            </div>

            {/* 🟢 Seção 2 */}
            <div className="flex flex-col md:flex-row bg-[#F5F5F7] dark:bg-neutral-800 p-6 md:p-12 rounded-3xl gap-6 items-center">
                <Image
                    src="/img/machinelearning2.jpg"
                    alt="Machine Learning 2"
                    width={500}
                    height={500}
                    className="w-full md:w-1/2 h-auto object-cover rounded-lg"
                />
                <div className="text-custom-purple dark:text-neutral-400 text-lg md:text-2xl font-sans text-center md:text-left">
                    <p className="text-primary text-2xl mt-4">
                        {currentMessages.cardAppleContentMachine3}
                    </p>
                    <p className="text-primary text-2xl mt-4">
                        {currentMessages.cardAppleContentMachine4}
                    </p>
                </div>
            </div>

            {/* 🔵 Seção 3 (Vídeo de fundo) */}
            <div className="relative bg-[#F5F5F7] dark:bg-neutral-800 p-6 md:p-12 rounded-3xl overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover z-0 rounded-3xl"
                >
                    <source src="/videos/machinelearning_optimized.mp4" type="video/mp4" />
                    Seu navegador não suporta vídeos HTML5.
                </video>
                <div className="relative z-10 bg-primary p-6 rounded-lg w-full md:w-1/2 mx-auto text-center">
                    <p className="text-white text-lg md:text-2xl">
                        <span className="font-bold text-2xl">
                            {currentMessages.cardAppleContentMachine5}
                        </span>
                    </p>
                    <p className="mt-4 text-xl text-white">
                        {currentMessages.cardAppleContentWeb4}
                    </p>
                    <p className="mt-4 text-xl text-white">
                        {currentMessages.cardAppleContentWeb4_1}
                    </p>
                </div>
            </div>

            {/* 🟡 Seção 4 */}
            <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-6 md:p-12 rounded-3xl text-center">
                <p className="font-bold text-neutral-700 dark:text-neutral-200 text-lg md:text-2xl">
                    {currentMessages.cardAppleContentWeb5}
                </p>
                <p className="text-neutral-600 dark:text-neutral-400 text-lg md:text-2xl mt-4">
                    {currentMessages.cardAppleContentMachine6}
                </p>
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto object-cover rounded-lg mt-4"
                >
                    <source src="/videos/robohand_optimized.mp4" type="video/mp4" />
                    Seu navegador não suporta vídeos HTML5.
                </video>
            </div>

            {/* 🔴 Seção 5 */}
            <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-6 md:p-12 rounded-3xl flex flex-col md:flex-row gap-6 items-center">
                <div className="text-neutral-600 dark:text-neutral-400 text-lg md:text-2xl text-center md:text-left">
                    <p className="font-bold text-neutral-700 dark:text-neutral-200">
                        {currentMessages.cardAppleContentMachine7}
                    </p>
                    <p className="text-neutral-700 dark:text-neutral-200 mt-4">
                        {currentMessages.cardAppleContentMachine8}
                    </p>
                </div>
                <Image
                    src="/img/machine.png"
                    alt="Machine"
                    width={500}
                    height={500}
                    className="w-full md:w-1/2 h-auto object-cover rounded-lg"
                />
            </div>

            {/* 🟠 Seção 6 */}
            <div className="flex flex-col md:flex-row bg-[#F5F5F7] p-6 md:p-12 rounded-3xl gap-6 items-center">
                <div className="text-custom-purple text-lg md:text-2xl text-center md:text-left">
                    <span className="font-bold text-primary">
                        {currentMessages.cardAppleContentMachine7}
                    </span>
                    <p className="text-primary text-2xl mt-4">
                        {currentMessages.cardAppleContentMachine8}
                    </p>
                </div>
                <Image
                    src="/img/data.jpg"
                    alt="Data"
                    width={500}
                    height={500}
                    className="w-full md:w-1/2 h-auto object-cover rounded-lg"
                />
            </div>
        </div>
    );
};



const AutomationContent = () => {
    const currentMessages = useTranslations();

    return (
        <div className="flex flex-col gap-6 p-4 md:p-8 lg:p-14">
            {/* 🟣 Seção 1 */}
            <div className="flex flex-col md:flex-row bg-[#F5F5F7] p-6 md:p-12 rounded-3xl gap-6 items-center">
                <div className="md:w-1/2 text-center md:text-left">
                    <p className="text-custom-purple text-lg md:text-2xl font-sans">
                        <span className="font-bold text-primary">
                            {currentMessages.cardAppleContentAutomation1}
                        </span>
                        <span className="text-primary text-2xl mt-4">
                            {currentMessages.cardAppleContentAutomation2}
                        </span>
                    </p>
                </div>
                <Image
                    src="/img/engrenagem.png"
                    alt="Engrenagem"
                    width={500}
                    height={500}
                    className="w-full md:w-1/2 h-auto object-cover rounded-lg"
                />
            </div>

            {/* 🟢 Seção 2 */}
            <div className="flex flex-col md:flex-row bg-[#F5F5F7] dark:bg-neutral-800 p-6 md:p-12 rounded-3xl gap-6 items-center">
                <div className="text-primary text-lg md:text-2xl font-sans text-center md:text-left">
                    <p className="font-bold text-primary">
                        {currentMessages.cardAppleContentAutomation3}
                    </p>
                    <p className="text-primary mt-4">
                        {currentMessages.cardAppleContentAutomation4}
                    </p>
                </div>
                <Image
                    src="/img/automation2.png"
                    alt="Automação 2"
                    width={500}
                    height={500}
                    className="w-full md:w-1/2 h-auto object-cover rounded-lg"
                />
            </div>

            {/* 🔵 Seção 3 */}
            <div className="flex flex-col md:flex-row bg-[#F5F5F7] dark:bg-neutral-800 p-6 md:p-12 rounded-3xl gap-6 items-center">
                <div className="text-primary text-lg md:text-2xl font-sans text-center md:text-left">
                    <p className="font-bold text-primary">
                        {currentMessages.cardAppleContentAutomation5}
                    </p>
                    <p className="text-primary mt-4">
                        {currentMessages.cardAppleContentAutomation6}
                    </p>
                </div>
                <Image
                    src="/img/automation3.png"
                    alt="Automação 3"
                    width={500}
                    height={500}
                    className="w-full md:w-1/2 h-auto object-cover rounded-lg"
                />
            </div>

            {/* 🟡 Seção 4 */}
            <div className="flex flex-col md:flex-row bg-[#F5F5F7] p-6 md:p-12 rounded-3xl gap-6 items-center">
                <div className="text-primary text-lg md:text-2xl font-sans text-center md:text-left">
                    <p className="font-bold text-primary">
                        {currentMessages.cardAppleContentAutomation7}
                    </p>
                    <p className="text-primary mt-4">
                        {currentMessages.cardAppleContentAutomation8}
                    </p>
                </div>
                <Image
                    src="/img/automation5.png"
                    alt="Automação 5"
                    width={500}
                    height={500}
                    className="w-full md:w-1/2 h-auto object-cover rounded-lg"
                />
            </div>

            {/* 🔴 Seção 5 */}
            <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-6 md:p-12 rounded-3xl text-center">
                <p className="text-neutral-600 dark:text-neutral-400 text-lg md:text-2xl font-sans">
                    <span className="font-bold text-neutral-700 dark:text-neutral-200">
                        {currentMessages.cardAppleContentMachine7}
                    </span>{" "}
                    {currentMessages.cardAppleContentMachine8}
                </p>
                <Image
                    src="/img/automation5.png"
                    alt="Automação 5"
                    width={500}
                    height={500}
                    className="w-full md:w-1/2 h-auto object-cover rounded-lg mt-4"
                />
            </div>

            {/* 🟠 Seção 6 (Vídeo de fundo) */}
            <div className="relative bg-[#F5F5F7] dark:bg-neutral-800 p-6 md:p-12 rounded-3xl overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover z-0 rounded-3xl"
                >
                    <source src="/videos/automation-roxo_lowbitrate.mp4" type="video/mp4" />
                    Seu navegador não suporta vídeos HTML5.
                </video>
                <div className="relative z-10 bg-primary/80 p-6 rounded-lg w-full md:w-1/2 mx-auto text-center">
                    <p className="text-white text-lg md:text-2xl">
                        <span className="font-bold text-2xl">
                            {currentMessages.cardAppleContentAutomation9}
                        </span>
                    </p>
                    <p className="mt-4 text-xl text-white">
                        {currentMessages.cardAppleContentAutomation10}
                    </p>
                </div>
            </div>
        </div>
    );
};



const BotsContent = () => {
    const currentMessages = useTranslations();

    return (
        <div className="flex flex-col gap-6 p-4 md:p-8 lg:p-14">
            {/* 🟣 Seção 1 */}
            <div className="flex flex-col md:flex-row bg-[#F5F5F7] p-6 md:p-12 rounded-3xl gap-6 items-center">
                <div className="md:w-1/2 text-center md:text-left">
                    <p className="text-custom-purple text-lg md:text-2xl font-sans">
                        <span className="font-bold text-primary">
                            {currentMessages.cardAppleContentBots1}
                        </span>
                        <span className="text-primary text-2xl mt-4">
                            {currentMessages.cardAppleContentBots2}
                        </span>
                    </p>
                </div>
                <Image
                    src="/img/bot1.png"
                    alt="Bot"
                    width={500}
                    height={500}
                    className="w-full md:w-1/2 h-auto object-cover rounded-lg"
                />
            </div>

            {/* 🟢 Seção 2 */}
            <div className="flex flex-col md:flex-row bg-[#F5F5F7] dark:bg-neutral-800 p-6 md:p-12 rounded-3xl gap-6 items-center">
                <Image
                    src="/img/bot3_converted.png"
                    alt="Bot"
                    width={500}
                    height={500}
                    className="w-full md:w-1/2 h-auto object-cover rounded-lg"
                />
                <div className="text-primary text-lg md:text-2xl font-sans text-center md:text-left">
                    <p className="font-bold text-primary">
                        {currentMessages.cardAppleContentBots3}
                    </p>
                    <p className="text-primary mt-4">
                        {currentMessages.cardAppleContentBots4}
                    </p>
                </div>
            </div>

            {/* 🔵 Seção 3 */}
            <div className="flex flex-col md:flex-row bg-[#F5F5F7] p-6 md:p-12 rounded-3xl gap-6 items-center">
                <div className="text-primary text-lg md:text-2xl font-sans text-center md:text-left">
                    <p className="font-bold text-primary">
                        {currentMessages.cardAppleContentBots5}
                    </p>
                    <p className="text-primary mt-4">
                        {currentMessages.cardAppleContentBots6}
                    </p>
                </div>
                <Image
                    src="/img/bot2_converted.png"
                    alt="Bot"
                    width={500}
                    height={500}
                    className="w-full md:w-1/2 h-auto object-cover rounded-lg"
                />
            </div>

            {/* 🟡 Seção 4 */}
            <div className="flex flex-col md:flex-row bg-[#F5F5F7] p-6 md:p-12 rounded-3xl gap-6 items-center">
                <div className="text-custom-purple text-lg md:text-2xl font-sans text-center md:text-left">
                    <p className="font-bold text-primary">
                        {currentMessages.cardAppleContentBots7}
                    </p>
                    <p className="text-primary mt-4">
                        {currentMessages.cardAppleContentBots8}
                    </p>
                </div>
                <Image
                    src="/img/bot4_nobackground.png"
                    alt="Bot"
                    width={500}
                    height={500}
                    className="w-full md:w-1/2 h-auto object-cover rounded-lg"
                />
            </div>

            {/* 🔴 Seção 5 (Vídeo de fundo) */}
            <div className="relative bg-[#F5F5F7] dark:bg-neutral-800 p-6 md:p-12 rounded-3xl overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover z-0 rounded-3xl"
                >
                    <source src="/videos/videobotcard_lowbitrate.mp4" type="video/mp4" />
                    Seu navegador não suporta vídeos HTML5.
                </video>
                <div className="relative z-10 bg-primary/80 p-6 rounded-lg w-full md:w-1/2 mx-auto text-center">
                    <p className="text-white text-lg md:text-2xl">
                        <span className="font-bold text-2xl">
                            {currentMessages.cardAppleContentBots9}
                        </span>
                    </p>
                    <p className="mt-4 text-xl text-white">
                        {currentMessages.cardAppleContentBots10}
                    </p>
                </div>
            </div>
        </div>
    );
};




const AIContent = () => {
    const currentMessages = useTranslations();

    return (
        <div className="flex flex-col gap-6 p-4 md:p-8 lg:p-14">
            {/* 🟣 Seção 1 */}
            <div className="flex flex-col md:flex-row bg-[#F5F5F7] p-6 md:p-12 rounded-3xl gap-6 items-center">
                <div className="md:w-1/2 text-center md:text-left">
                    <p className="text-custom-purple text-lg md:text-2xl font-sans">
                        <span className="font-bold text-primary">
                            {currentMessages.cardAppleContentAI1}
                        </span>
                        <span className="text-primary text-2xl mt-4">
                            {currentMessages.cardAppleContentAI2}
                        </span>
                    </p>
                </div>
                <Image
                    src="/img/ai1_converted.png"
                    alt="AI"
                    width={500}
                    height={500}
                    className="w-full md:w-1/2 h-auto object-cover rounded-lg"
                />
            </div>

            {/* 🟢 Seção 2 */}
            <div className="flex flex-col md:flex-row-reverse bg-[#F5F5F7] p-6 md:p-12 rounded-3xl gap-6 items-center">
                <div className="md:w-1/2 text-center md:text-left">
                    <p className="text-custom-purple text-lg md:text-2xl font-sans">
                        <span className="font-bold text-primary">
                            {currentMessages.cardAppleContentAI3}
                        </span>
                        <span className="text-primary text-2xl mt-4">
                            {currentMessages.cardAppleContentAI4}
                        </span>
                    </p>
                </div>
                <Image
                    src="/img/ai2_converted.png"
                    alt="AI"
                    width={500}
                    height={500}
                    className="w-full md:w-1/2 h-auto object-cover rounded-lg"
                />
            </div>

            {/* 🔵 Seção 3 */}
            <div className="flex flex-col md:flex-row bg-[#F5F5F7] p-6 md:p-12 rounded-3xl gap-6 items-center">
                <div className="md:w-1/2 text-center md:text-left">
                    <p className="text-custom-purple text-lg md:text-2xl font-sans">
                        <span className="font-bold text-primary">
                            {currentMessages.cardAppleContentAI5}
                        </span>
                        <span className="text-primary text-2xl mt-4">
                            {currentMessages.cardAppleContentAI6}
                        </span>
                    </p>
                </div>
                <Image
                    src="/img/ai3_converted.png"
                    alt="AI"
                    width={500}
                    height={500}
                    className="w-full md:w-1/2 h-auto object-cover rounded-lg"
                />
            </div>

            {/* 🟡 Seção 4 */}
            <div className="flex flex-col md:flex-row-reverse bg-[#F5F5F7] p-6 md:p-12 rounded-3xl gap-6 items-center">
                <div className="md:w-1/2 text-center md:text-left">
                    <p className="text-custom-purple text-lg md:text-2xl font-sans">
                        <span className="font-bold text-primary">
                            {currentMessages.cardAppleContentAI7}
                        </span>
                        <span className="text-primary text-2xl mt-4">
                            {currentMessages.cardAppleContentAI8}
                        </span>
                    </p>
                </div>
                <Image
                    src="/img/ai4_converted.png"
                    alt="AI"
                    width={500}
                    height={500}
                    className="w-full md:w-1/2 h-auto object-cover rounded-lg"
                />
            </div>

            {/* 🔴 Seção 5 (Vídeo de fundo) */}
            <div className="relative bg-[#F5F5F7] dark:bg-neutral-800 p-6 md:p-12 rounded-3xl overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover z-0 rounded-3xl"
                >
                    <source src="/videos/aicard_lowbitrate.mp4" type="video/mp4" />
                    Seu navegador não suporta vídeos HTML5.
                </video>
                <div className="relative z-10 bg-primary/80 p-6 rounded-lg w-full md:w-1/2 mx-auto text-center">
                    <p className="text-white text-lg md:text-2xl">
                        <span className="font-bold text-2xl">
                            {currentMessages.cardAppleContentAI9}
                        </span>
                    </p>
                    <p className="mt-4 text-xl text-white">
                        {currentMessages.cardAppleContentAI10}
                    </p>
                    <p className="mt-4 text-xl font-bold text-white">
                        {currentMessages.cardAppleContentAI11}
                    </p>
                    <p className="mt-4 text-xl text-white">
                        {currentMessages.cardAppleContentAI12}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AIContent;

const data = [
    {
        category: "cardAppleWebSite",
        title: "createStunningWebsites",
        src: "/img/web-site.jpg",
        content: <WebContent />,
    },
    {
        category: "cardAppleMachineLearning",
        title: "UnlockInsights",
        src: "/img/machine-learning.jpg",
        content: <MachineContent />,
    },
    {
        category: "cardAppleAutomation",
        title: "AutomateYour",
        src: "/img/automation.jpg",
        content: <AutomationContent />,
    },
    {
        category: "cardAppleBots",
        title: "IntegrateIntelligent",
        src: "/img/chatbot.jpg",
        content: <BotsContent />,
    },
    {
        category: "cardAppleAI",
        title: "LeverageAI",
        src: "/img/ai.jpg",
        content: <AIContent />,
    },

];
