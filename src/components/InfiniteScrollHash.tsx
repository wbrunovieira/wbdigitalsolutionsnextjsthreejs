'use client';

import React from 'react';
import { useTranslations } from '@/contexts/TranslationContext';
import styles from './InfiniteScrollHash.module.css';

const InfiniteScrollHash: React.FC = () => {
    const currentMessages = useTranslations();

    const tags = [
        currentMessages.WebSitesKey,
        currentMessages.CustomSystemsKey,
      
        currentMessages.OnlineStoreKey,
        currentMessages.AutomationKey,
        currentMessages.ArtificialIntelligenceKey,
        currentMessages.DataScienceKey,

        currentMessages.EcommerceDevelopmentKey,
        currentMessages.AppDevelopmentKey,


        currentMessages.LandingPagesKey,

        currentMessages.DataAnalyticsKey,
        currentMessages.ChatbotsKey,
        currentMessages.MachineLearningKey,
        currentMessages.CloudSolutionsKey,
        currentMessages.CRMIntegrationKey,
        currentMessages.PaymentGatewayIntegrationKey,

        currentMessages.VirtualRealityKey,
        // currentMessages.AugmentedRealityKey,
        currentMessages.EADKey,
    ].filter(tag => tag !== undefined);

    return (
        <section className="w-full max-w-[1400px] mx-auto py-10 bg-[#350545] overflow-hidden mt-32">
            <div className={`${styles.tagList} py-4`}>
                <div className={styles.inner}>
                    {tags.map((tag, index) => (
                        <div className={styles.tag} key={index}>
                            <span>#</span>
                            {tag}
                        </div>
                    ))}
                    {/* Duplicar as tags para criar o efeito infinito */}
                    {tags.map((tag, index) => (
                        <div className={styles.tag} key={`duplicate-${index}`}>
                            <span>#</span>
                            {tag}
                        </div>
                    ))}
                </div>
                <div className={styles.fade}></div>
            </div>
        </section>
    );
};

export default InfiniteScrollHash;