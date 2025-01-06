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
        <>
           
            <div>
                <div className="flex bg-[#F5F5F7] p-8 md:p-14 rounded-3xl mb-4">
                  <div>

                        <p className="flex flex-col gap-4 text-custom-purple text-lg md:text-2xl font-sans max-w-3xl mx-auto">
                            <span className="font-bold text-primary">
                                {currentMessages.cardAppleContentWeb1} <br />{" "}
                            </span>{" "}

                            <span className="text-primary text-2xl mt-4">
                              {currentMessages.cardAppleContentWeb2}

                            </span>
                        </p>
                    </div>
                    <Image
                        src="/img/tech3d2.png"
                        alt="logo"
                        height="400"
                        width="400"
                        className=" md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                    />
                </div>



               
                <div className="flex gap-4 bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                    <Image
                        src="/img/7Site2.png"
                        alt="logo"
                        height="800"
                        width="800"
                         className="md:w-2/3 md:h-auto w-full h-auto mx-auto object-contain"
                    />
                    <div className="flex flex-col gap-4 text-custom-purple dark:text-neutral-400 text-lg md:text-2xl font-sans max-w-3xl mx-auto">
                        <p>
                            <p className="font-bold text-primary dark:text-neutral-200">
                                {currentMessages.cardAppleContentWeb3} <br />{" "}
                            </p>
                            <p className="text-primary text-2xl mt-4">
                                {currentMessages.cardAppleContentWeb4}
                            </p>
                        </p>
                    </div>
                </div>
              
<div className="relative bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4 overflow-hidden">
    {/* Video de fundo */}
    <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
    >
        <source src="/videos/security-website2.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos HTML5.
    </video>

    {/* Conteúdo acima do vídeo */}
    <div className="relative z-20 w-1/3">
        <p className="text-neutral-100  text-lg md:text-2xl font-sans max-w-3xl mx-auto">
            <span className="font-bold mt-4 text-neutral-100  text-2xl">
                {currentMessages.cardAppleContentWeb5} <br />
            </span>{" "}
             <p className="mt-4 text-xl">

            {currentMessages.cardAppleContentWeb6} <br />
            </p>
            <p className="mt-4 text-xl">

                {currentMessages.cardAppleContentWeb6_2}
            </p>
        </p>
    </div>
</div>


                   <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                        <span className="mt-4 font-bold text-neutral-700 dark:text-neutral-200">
                            {currentMessages.cardAppleContentWeb7}
                        </span>{" "}
                        <br />
                        <p className="mt-4">

                        {currentMessages.cardAppleContentWeb8}
                        </p>
                    </p>
                    <Image
                        src="/img/website-hands.png"
                        alt="logo"
                        height="500"
                        width="500"
                        className="mt-4 md:w-1/2 md:h-1/2 rounded h-full w-full mx-auto object-contain"
                    />
                </div>  


<div className="relative bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4 overflow-hidden">


                     <video
                      autoPlay
                      loop
                      muted
                      playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
                    >
                        <source src="/videos/www.mp4" type="video/mp4" />
                        Seu navegador não suporta vídeos HTML5.
                    </video>
                </div>



            </div>
            
        </>
    );
};

const MachineContent = () => {
    const currentMessages = useTranslations();

    return (
        <>
           
            <div>
                <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                        <span className="font-bold text-neutral-700 dark:text-neutral-200">
                            {currentMessages.cardAppleContentMachine1}
                        </span>{" "}
                        {currentMessages.cardAppleContentMachine2}
                    </p>
                    <div className="relative mt-4 md:w-1/2 md:h-1/2 h-full w-full mx-auto">
                        <Image
                            src="/img/machinelearning.jpeg"
                            alt="logo"
                            height="500"
                            width="500"
                            className="h-full w-full object-contain rounded-lg"
                            style={{
                                maskImage: "radial-gradient(circle, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
                                WebkitMaskImage: "radial-gradient(circle, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
                            }}
                        />
                    </div>
                </div>
                <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                        <span className="font-bold text-neutral-700 dark:text-neutral-200">
                            {currentMessages.cardAppleContentMachine3}
                        </span>{" "}
                        {currentMessages.cardAppleContentMachine4}
                    </p>
                    <Image
                        src="/img/machinelearning2.jpg"
                        alt="logo"
                        height="500"
                        width="500"
                        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                    />
                </div>
                <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                        <span className="font-bold text-neutral-700 dark:text-neutral-200">
                            {currentMessages.cardAppleContentMachine5}
                        </span>{" "}
                        {currentMessages.cardAppleContentWeb4}
                    </p>
                    <div className="relative mt-4 md:w-1/2 md:h-1/2 h-full w-full mx-auto">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="h-full w-full object-contain rounded"
                            style={{
                                maskImage: "radial-gradient(circle, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
                                WebkitMaskImage: "radial-gradient(circle, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
                            }}
                        >
                            <source src="/videos/machinelearning.mp4" type="video/mp4" />
                            Seu navegador não suporta vídeos HTML5.
                        </video>
                    </div>
                </div>
                <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                        <span className="font-bold text-neutral-700 dark:text-neutral-200">
                            {currentMessages.cardAppleContentWeb5}
                        </span>{" "}
                        {currentMessages.cardAppleContentMachine6}
                    </p>
                    <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="h-full w-full object-contain rounded"
                            style={{
                                maskImage: "radial-gradient(circle, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
                                WebkitMaskImage: "radial-gradient(circle, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
                            }}
                        >
                            <source src="/videos/robohand.mp4" type="video/mp4" />
                            Seu navegador não suporta vídeos HTML5.
                        </video>
                </div>
                <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                        <span className="font-bold text-neutral-700 dark:text-neutral-200">
                            {currentMessages.cardAppleContentMachine7}
                        </span>{" "}
                        {currentMessages.cardAppleContentMachine8}
                    </p>
                    <Image
                        src="/img/machine.png"
                        alt="logo"
                        height="500"
                        width="500"
                        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                    />
                </div>
                <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                        <span className="font-bold text-neutral-700 dark:text-neutral-200">
                            {currentMessages.cardAppleContentMachine7}
                        </span>{" "}
                        {currentMessages.cardAppleContentMachine8}
                    </p>
                    <Image
                        src="/img/data.jpg"
                        alt="logo"
                        height="500"
                        width="500"
                        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                    />
                </div>
            </div>
            
        </>
    );
};
const AutomationContent = () => {
    const currentMessages = useTranslations();

    return (
        <>
            
            <div>
                <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                        <span className="font-bold text-neutral-700 dark:text-neutral-200">
                            {currentMessages.cardAppleContentAutomation1}
                        </span>{" "}
                        {currentMessages.cardAppleContentAutomation2}
                    </p>
                    <Image
                        src="/img/engrenagem.png"
                        alt="logo"
                        height="500"
                        width="500"
                        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                    />
                </div>
                <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                        <span className="font-bold text-neutral-700 dark:text-neutral-200">
                            {currentMessages.cardAppleContentAutomation3}
                        </span>{" "}
                        {currentMessages.cardAppleContentAutomation4}
                    </p>
                    <Image
                        src="/img/automation2.jpg"
                        alt="logo"
                        height="500"
                        width="500"
                        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                    />
                </div>
                <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                        <span className="font-bold text-neutral-700 dark:text-neutral-200">
                            {currentMessages.cardAppleContentAutomation5}
                        </span>{" "}
                        {currentMessages.cardAppleContentAutomation6}
                    </p>
                    <Image
                        src="/img/automation3.jpg"
                        alt="logo"
                        height="500"
                        width="500"
                        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                    />
                </div>
                <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                        <span className="font-bold text-neutral-700 dark:text-neutral-200">
                            {currentMessages.cardAppleContentAutomation7}
                        </span>{" "}
                        {currentMessages.cardAppleContentAutomation8}
                    </p>
                    <Image
                        src="/img/automation4.jpg"
                        alt="logo"
                        height="500"
                        width="500"
                        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                    />
                </div>
                <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                        <span className="font-bold text-neutral-700 dark:text-neutral-200">
                            {currentMessages.cardAppleContentMachine7}
                        </span>{" "}
                        {currentMessages.cardAppleContentMachine8}
                    </p>
                    <Image
                        src="/img/automation5.jpg"
                        alt="logo"
                        height="500"
                        width="500"
                        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                    />
                </div>
            </div>
            
        </>
    );
};
const BotsContent = () => {
    const currentMessages = useTranslations();

    return (
        <>
          
            <div>
                <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                        <span className="font-bold text-neutral-700 dark:text-neutral-200">
                            {currentMessages.cardAppleContentBots1}
                        </span>{" "}
                        {currentMessages.cardAppleContentBots2}
                    </p>
                    <Image
                        src="/img/bot1.png"
                        alt="logo"
                        height="500"
                        width="500"
                        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                    />
                </div>
                <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                        <span className="font-bold text-neutral-700 dark:text-neutral-200">
                            {currentMessages.cardAppleContentBots3}
                        </span>{" "}
                        {currentMessages.cardAppleContentBots4}
                    </p>
                    <Image
                        src="/img/bot3.png"
                        alt="logo"
                        height="500"
                        width="500"
                        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                    />
                </div>
                <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                        <span className="font-bold text-neutral-700 dark:text-neutral-200">
                            {currentMessages.cardAppleContentBots5}
                        </span>{" "}
                        {currentMessages.cardAppleContentBots6}
                    </p>
                    <Image
                        src="/img/bot2.png"
                        alt="logo"
                        height="500"
                        width="500"
                        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                    />
                </div>
                <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                        <span className="font-bold text-neutral-700 dark:text-neutral-200">
                            {currentMessages.cardAppleContentBots7}
                        </span>{" "}
                        {currentMessages.cardAppleContentBots8}
                    </p>
                    <Image
                        src="/img/bot4.png"
                        alt="logo"
                        height="500"
                        width="500"
                        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                    />
                </div>
            </div>
            
        </>
    );
};
const AIContent = () => {
    const currentMessages = useTranslations();

    return (
        <>
           
            <div>
                <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                        <span className="font-bold text-neutral-700 dark:text-neutral-200">
                            {currentMessages.cardAppleContentAI1}
                        </span>{" "}
                        {currentMessages.cardAppleContentAI2}
                    </p>
                    <Image
                        src="/img/ai1.png"
                        alt="logo"
                        height="500"
                        width="500"
                        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                    />
                </div>
                <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                        <span className="font-bold text-neutral-700 dark:text-neutral-200">
                            {currentMessages.cardAppleContentAI3}
                        </span>{" "}
                        {currentMessages.cardAppleContentAI4}
                    </p>
                    <Image
                        src="/img/ai2.png"
                        alt="logo"
                        height="500"
                        width="500"
                        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                    />
                </div>
                <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                        <span className="font-bold text-neutral-700 dark:text-neutral-200">
                            {currentMessages.cardAppleContentAI5}
                        </span>{" "}
                        {currentMessages.cardAppleContentAI6}
                    </p>
                    <Image
                        src="/img/ai3.png"
                        alt="logo"
                        height="500"
                        width="500"
                        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                    />
                </div>
                <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                        <span className="font-bold text-neutral-700 dark:text-neutral-200">
                            {currentMessages.cardAppleContentAI7}
                        </span>{" "}
                        {currentMessages.cardAppleContentAI8}
                    </p>
                    <Image
                        src="/img/ai4.png"
                        alt="logo"
                        height="500"
                        width="500"
                        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                    />
                </div>
            </div>
            
        </>
    );
};

const ECommerceContent = () => {
    const currentMessages = useTranslations();

    return (
        <>
           
            <div>
                <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                        <span className="font-bold text-neutral-700 dark:text-neutral-200">
                            {currentMessages.cardAppleContentECommerce1}
                        </span>{" "}
                        {currentMessages.cardAppleContentECommerce2}
                    </p>
                    <Image
                        src="/img/ecommerce1.png"
                        alt="logo"
                        height="500"
                        width="500"
                        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                    />
                </div>
                <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                        <span className="font-bold text-neutral-700 dark:text-neutral-200">
                            {currentMessages.cardAppleContentECommerce3}
                        </span>{" "}
                        {currentMessages.cardAppleContentECommerce4}
                    </p>
                    <Image
                        src="/img/ecommerce2.png"
                        alt="logo"
                        height="500"
                        width="500"
                        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                    />
                </div>
                <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                        <span className="font-bold text-neutral-700 dark:text-neutral-200">
                            {currentMessages.cardAppleContentECommerce5}
                        </span>{" "}
                        {currentMessages.cardAppleContentECommerce6}
                    </p>
                    <Image
                        src="/img/ecommerce3.png"
                        alt="logo"
                        height="500"
                        width="500"
                        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                    />
                </div>
                <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                        <span className="font-bold text-neutral-700 dark:text-neutral-200">
                            {currentMessages.cardAppleContentECommerce7}
                        </span>{" "}
                        {currentMessages.cardAppleContentECommerce8}
                    </p>
                    <Image
                        src="/img/ecommerce4.png"
                        alt="logo"
                        height="500"
                        width="500"
                        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                    />
                </div>
            </div>
            
        </>
    );
};
const MarketingContent = () => {
    const currentMessages = useTranslations();

    return (
        <>
            return (
            <div>
                <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                        <span className="font-bold text-neutral-700 dark:text-neutral-200">
                            {currentMessages.cardAppleContentMarketing1}
                        </span>{" "}
                        {currentMessages.cardAppleContentMarketing2}
                    </p>
                    <Image
                        src="/img/tech3d.png"
                        alt="logo"
                        height="500"
                        width="500"
                        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                    />
                </div>
                <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                        <span className="font-bold text-neutral-700 dark:text-neutral-200">
                            {currentMessages.cardAppleContentMarketing3}
                        </span>{" "}
                        {currentMessages.cardAppleContentMarketing4}
                    </p>
                    <Image
                        src="/img/tech3d.png"
                        alt="logo"
                        height="500"
                        width="500"
                        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                    />
                </div>
                <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                        <span className="font-bold text-neutral-700 dark:text-neutral-200">
                            {currentMessages.cardAppleContentMarketing5}
                        </span>{" "}
                        {currentMessages.cardAppleContentMarketing6}
                    </p>
                    <Image
                        src="/img/tech3d.png"
                        alt="logo"
                        height="500"
                        width="500"
                        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                    />
                </div>
                <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                        <span className="font-bold text-neutral-700 dark:text-neutral-200">
                            {currentMessages.cardAppleContentMarketing7}
                        </span>{" "}
                        {currentMessages.cardAppleContentMarketing8}
                    </p>
                    <Image
                        src="/img/tech3d.png"
                        alt="logo"
                        height="500"
                        width="500"
                        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                    />
                </div>
            </div>
            );
        </>
    );
};

const SystemsContent = () => {
    const currentMessages = useTranslations();

    return (
        <>
            <div>
                <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                        <span className="font-bold text-neutral-700 dark:text-neutral-200">
                            {currentMessages.cardAppleContentManagement1}
                        </span>{" "}
                        {currentMessages.cardAppleContentManagement2}
                    </p>
                    <Image
                        src="/img/tech3d.png"
                        alt="logo"
                        height="500"
                        width="500"
                        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                    />
                </div>
                <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                        <span className="font-bold text-neutral-700 dark:text-neutral-200">
                            {currentMessages.cardAppleContentManagement3}
                        </span>{" "}
                        {currentMessages.cardAppleContentManagement4}
                    </p>
                    <Image
                        src="/img/tech3d.png"
                        alt="logo"
                        height="500"
                        width="500"
                        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                    />
                </div>
                <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                        <span className="font-bold text-neutral-700 dark:text-neutral-200">
                            {currentMessages.cardAppleContentManagement5}
                        </span>{" "}
                        {currentMessages.cardAppleContentManagement6}
                    </p>
                    <Image
                        src="/img/tech3d.png"
                        alt="logo"
                        height="500"
                        width="500"
                        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                    />
                </div>
                <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                        <span className="font-bold text-neutral-700 dark:text-neutral-200">
                            {currentMessages.cardAppleContentManagement7}
                        </span>{" "}
                        {currentMessages.cardAppleContentManagement8}
                    </p>
                    <Image
                        src="/img/tech3d.png"
                        alt="logo"
                        height="500"
                        width="500"
                        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                    />
                </div>
            </div>
            );
        </>
    );
};

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
    {
        category: "cardAppleECommerce",
        title: "boostYour",
        src: "/img/e-commerce.jpg",
        content: <ECommerceContent />,
    },

];
