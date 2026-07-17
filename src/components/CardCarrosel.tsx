'use client';
import React from 'react';
import { Carousel, Card } from '@/components/ui/apple-cards-carousel';

import { useTranslations } from '@/contexts/TranslationContext';
import CardClickTutorial from './CardClickTutorial';
import WebContent from './carousel/WebContent';
import MachineContent from './carousel/MachineContent';
import AutomationContent from './carousel/AutomationContent';
import BotsContent from './carousel/BotsContent';
import AIContent from './carousel/AIContent';

export function AppleCardsCarouselDemo() {
    const currentMessages = useTranslations();



    const cards = data.map((card, index) => (
        <Card
            key={card.src}
            card={{
                ...card,
                category: currentMessages[card.category as keyof typeof currentMessages] as string,
                title: currentMessages[card.title as keyof typeof currentMessages] as string,
            }}
            index={index}
        />
    ));

    return (
        <div className="w-full h-full py-20 mt-20 relative">
            <h2 className="max-w-[1400px] pl-4 mx-auto text-xl md:text-5xl font-bold text-white font-sans">
                {currentMessages.transformYourBusiness}
            </h2>
            <div className="relative">
                <CardClickTutorial />
                <Carousel items={cards} />
            </div>
        </div>
    );
}

const data = [
    {
        category: 'cardAppleWebSite',
        title: 'createStunningWebsites',
        src: '/img/web-site.jpg',
        content: <WebContent />,
    },
    {
        category: 'cardAppleMachineLearning',
        title: 'UnlockInsights',
        src: '/img/machine-learning.jpg',
        content: <MachineContent />,
    },
    {
        category: 'cardAppleAutomation',
        title: 'AutomateYour',
        src: '/img/automation.jpg',
        content: <AutomationContent />,
    },
    {
        category: 'cardAppleBots',
        title: 'IntegrateIntelligent',
        src: '/img/chatbot.jpg',
        content: <BotsContent />,
    },
    {
        category: 'cardAppleAI',
        title: 'LeverageAI',
        src: '/img/ai.jpg',
        content: <AIContent />,
    },

];
