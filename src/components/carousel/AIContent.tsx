'use client';
import React from 'react';
import Image from 'next/image';
import { useTranslations } from '@/contexts/TranslationContext';
import { getOptimizedImagePath } from '@/utils/imageOptimizer';

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
                    src={getOptimizedImagePath('/img/ai1_converted.png')}
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
                    src={getOptimizedImagePath('/img/ai2_converted.png')}
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
                    src={getOptimizedImagePath('/img/ai3_converted.png')}
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
                    src={getOptimizedImagePath('/img/ai4_converted.png')}
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
