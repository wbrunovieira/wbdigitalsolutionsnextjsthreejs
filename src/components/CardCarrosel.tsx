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
                <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                        <span className="font-bold text-neutral-700 dark:text-neutral-200">
                            {currentMessages.cardAppleContentWeb1}
                        </span>{" "}
                        {currentMessages.cardAppleContentWeb2}
                    </p>
                    <Image
                        src="/img/tech3d.png"
                        alt="logo"
                        height="500"
                        width="500"
                        className=" md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                    />
                </div>
                <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                        <span className="font-bold text-neutral-700 dark:text-neutral-200">
                            {currentMessages.cardAppleContentWeb3}
                        </span>{" "}
                        {currentMessages.cardAppleContentWeb4}
                    </p>
                    <Image
                        src="/img/7Site.jpg"
                        alt="logo"
                        height="500"
                        width="500"
                        className="mt-4 md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                    />
                </div>
                <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                        <span className="font-bold text-neutral-700 dark:text-neutral-200">
                            {currentMessages.cardAppleContentWeb3}
                        </span>{" "}
                        {currentMessages.cardAppleContentWeb4}
                    </p>
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="mt-4 md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain rounded"
                    >
                        <source src="/videos/websitehttps.mp4" type="video/mp4" />
                        Seu navegador não suporta vídeos HTML5.
                    </video>
                </div>
                <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                        <span className="font-bold text-neutral-700 dark:text-neutral-200">
                            {currentMessages.cardAppleContentWeb5}
                        </span>{" "}
                        {currentMessages.cardAppleContentWeb6}
                    </p>
                     <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="mt-4 md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain rounded"
                    >
                        <source src="/videos/www.mp4" type="video/mp4" />
                        Seu navegador não suporta vídeos HTML5.
                    </video>
                </div>
                <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                        <span className="font-bold text-neutral-700 dark:text-neutral-200">
                            {currentMessages.cardAppleContentWeb7}
                        </span>{" "}
                        {currentMessages.cardAppleContentWeb8}
                    </p>
                    <Image
                        src="/img/website-hands.jpeg"
                        alt="logo"
                        height="500"
                        width="500"
                        className="mt-4 md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                    />
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
                            {currentMessages.cardAppleContentAutomation5}
                        </span>{" "}
                        {currentMessages.cardAppleContentAutomation6}
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
                            {currentMessages.cardAppleContentAutomation7}
                        </span>{" "}
                        {currentMessages.cardAppleContentAutomation8}
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
                            {currentMessages.cardAppleContentMachine7}
                        </span>{" "}
                        {currentMessages.cardAppleContentMachine8}
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
                            {currentMessages.cardAppleContentBots3}
                        </span>{" "}
                        {currentMessages.cardAppleContentBots4}
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
                            {currentMessages.cardAppleContentBots5}
                        </span>{" "}
                        {currentMessages.cardAppleContentBots6}
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
                            {currentMessages.cardAppleContentBots7}
                        </span>{" "}
                        {currentMessages.cardAppleContentBots8}
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
                            {currentMessages.cardAppleContentAI3}
                        </span>{" "}
                        {currentMessages.cardAppleContentAI4}
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
                            {currentMessages.cardAppleContentAI5}
                        </span>{" "}
                        {currentMessages.cardAppleContentAI6}
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
                            {currentMessages.cardAppleContentAI7}
                        </span>{" "}
                        {currentMessages.cardAppleContentAI8}
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
                            {currentMessages.cardAppleContentECommerce3}
                        </span>{" "}
                        {currentMessages.cardAppleContentECommerce4}
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
                            {currentMessages.cardAppleContentECommerce5}
                        </span>{" "}
                        {currentMessages.cardAppleContentECommerce6}
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
                            {currentMessages.cardAppleContentECommerce7}
                        </span>{" "}
                        {currentMessages.cardAppleContentECommerce8}
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
    {
        category: "cardAppleMarketing",
        title: "boostYourMarketing",
        src: "/img/marketing.jpg",
        content: <MarketingContent />,
    },
];
