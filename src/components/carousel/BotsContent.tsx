'use client';
import React from 'react';
import Image from 'next/image';
import { useTranslations } from '@/contexts/TranslationContext';
import { getOptimizedImagePath } from '@/utils/imageOptimizer';

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
                    src={getOptimizedImagePath('/img/bot1.png')}
                    alt="Bot"
                    width={500}
                    height={500}
                    className="w-full md:w-1/2 h-auto object-cover rounded-lg"
                />
            </div>

            {/* 🟢 Seção 2 */}
            <div className="flex flex-col md:flex-row bg-[#F5F5F7] dark:bg-neutral-800 p-6 md:p-12 rounded-3xl gap-6 items-center">
                <Image
                    src={getOptimizedImagePath('/img/bot3_converted.png')}
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
                    src={getOptimizedImagePath('/img/bot2_converted.png')}
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
                    src={getOptimizedImagePath('/img/bot4_nobackground.png')}
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

export default BotsContent;
