"use client";

import React from "react";
import { useTranslations } from "@/contexts/TranslationContext";

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
        currentMessages.AugmentedRealityKey,
    ];

    return (
        <section className="w-full max-w-7xl mx-auto py-10 bg-[#350545] overflow-hidden">
            <div className="tag-list py-4">
                <div className="inner">
                    {tags.map((tag, index) => (
                        <div className="tag" key={index}>
                            <span>#</span>
                            {tag}
                        </div>
                    ))}
                </div>
                <div className="fade"></div>
            </div>
        </section>
    );
};

export default InfiniteScrollHash;