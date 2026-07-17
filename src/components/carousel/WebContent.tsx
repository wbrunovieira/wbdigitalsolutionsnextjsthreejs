'use client';
import React from 'react';
import Image from 'next/image';
import { useTranslations } from '@/contexts/TranslationContext';
import { getOptimizedImagePath } from '@/utils/imageOptimizer';

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
                    src={getOptimizedImagePath('/img/tech3d2.png')}
                    alt="logo"
                    width={400}
                    height={400}
                    className="w-full md:w-1/2 h-auto object-contain"
                />
            </div>

            {/* 🟢 Seção 2 */}
            <div className="flex flex-col md:flex-row bg-[#F5F5F7] dark:bg-neutral-800 p-6 md:p-12 rounded-3xl gap-6 items-center">
                <Image
                    src={getOptimizedImagePath('/img/7Site2.png')}
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
                    src={getOptimizedImagePath('/img/website-hands.png')}
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

export default WebContent;
