'use client';
import React from 'react';
import Image from 'next/image';
import { useTranslations } from '@/contexts/TranslationContext';
import { getOptimizedImagePath } from '@/utils/imageOptimizer';

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
                    src={getOptimizedImagePath('/img/machinelearning.jpeg')}
                    alt="Machine Learning"
                    width={500}
                    height={500}
                    className="w-full md:w-1/2 h-auto object-cover rounded-lg"
                />
            </div>

            {/* 🟢 Seção 2 */}
            <div className="flex flex-col md:flex-row bg-[#F5F5F7] dark:bg-neutral-800 p-6 md:p-12 rounded-3xl gap-6 items-center">
                <Image
                    src={getOptimizedImagePath('/img/machinelearning2.jpg')}
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
                    src={getOptimizedImagePath('/img/machine.png')}
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
                    src={getOptimizedImagePath('/img/data.jpg')}
                    alt="Data"
                    width={500}
                    height={500}
                    className="w-full md:w-1/2 h-auto object-cover rounded-lg"
                />
            </div>
        </div>
    );
};

export default MachineContent;
