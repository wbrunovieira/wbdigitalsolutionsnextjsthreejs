"use client";

import React from "react";
import { useTranslations } from "@/contexts/TranslationContext";

const InfiniteScrollHash: React.FC = () => {
    const currentMessages = useTranslations();

    const tags = [
        currentMessages.WebSitesKey,
        currentMessages.CustomSystemsKey,
        currentMessages.PaidAdsKey,
        currentMessages.SocialMediaManagementKey,
        currentMessages.OnlineStoreKey,
        currentMessages.AutomationKey,
        currentMessages.ArtificialIntelligenceKey,
        currentMessages.DataScienceKey,
        currentMessages.DigitalMarketingKey,
        currentMessages.GraphicDesignKey,
        currentMessages.SEOOptimizationKey,
        currentMessages.ResponsiveDesignKey,
        currentMessages.UIUXDesignKey,
        currentMessages.EcommerceDevelopmentKey,
        currentMessages.AppDevelopmentKey,
        currentMessages.ConversionOptimizationKey,
        currentMessages.BrandStrategyKey,
        currentMessages.ContentCreationKey,
        currentMessages.EmailMarketingKey,
        currentMessages.PerformanceAnalyticsKey,
        currentMessages.SocialMediaAdsKey,
        currentMessages.LeadGenerationKey,
        currentMessages.MarketingAutomationKey,
        currentMessages.InfluencerMarketingKey,
        currentMessages.CampaignManagementKey,
        currentMessages.LandingPagesKey,
        currentMessages.ABTestingKey,
        currentMessages.DataAnalyticsKey,
        currentMessages.ChatbotsKey,
        currentMessages.MachineLearningKey,
        currentMessages.CloudSolutionsKey,
        currentMessages.CRMIntegrationKey,
        currentMessages.PaymentGatewayIntegrationKey,
        currentMessages.ProductPhotographyKey,
        currentMessages.VideoEditingKey,
        currentMessages.CopywritingKey,
        currentMessages.LogoDesignKey,
        currentMessages.ConversionTrackingKey,
        currentMessages.MarketResearchKey,
        currentMessages.VirtualRealityKey,
        currentMessages.AugmentedRealityKey,
    ];

    return (
        <section className="w-screen p-10 bg-[#350545]">
            <div className="tag-list p-4">
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

// "use client";

// const tags = [
//     "WebSites",
//     "CustomSystems",
//     "PaidAds",
//     "SocialMediaManagement",
//     "OnlineStore",
//     "Automation",
//     "ArtificialIntelligence",
//     "DataScience",
//     "DigitalMarketing",
//     "GraphicDesign",
//     "SEOOptimization",
//     "ResponsiveDesign",
//     "UIUXDesign",
//     "EcommerceDevelopment",
//     "AppDevelopment",
//     "ConversionOptimization",
//     "BrandStrategy",
//     "ContentCreation",
//     "EmailMarketing",
//     "PerformanceAnalytics",
//     "SocialMediaAds",
//     "LeadGeneration",
//     "MarketingAutomation",
//     "InfluencerMarketing",
//     "CampaignManagement",
//     "LandingPages",
//     "ABTesting",
//     "DataAnalytics",
//     "Chatbots",
//     "MachineLearning",
//     "CloudSolutions",
//     "CRMIntegration",
//     "PaymentGatewayIntegration",
//     "ProductPhotography",
//     "VideoEditing",
//     "Copywriting",
//     "LogoDesign",
//     "ConversionTracking",
//     "MarketResearch",
//     "VirtualReality",
//     "AugmentedReality",
// ];

// const InfiniteScrollHash: React.FC = () => {
//     return (
//         <section className="w-screen p-10 bg-[#350545]">
//             <div className="tag-list p-4">
//                 <div className="inner">
//                     {tags.map((tag, index) => (
//                         <div className="tag" key={index}>
//                             <span>#</span>
//                             {tag}
//                         </div>
//                     ))}
//                 </div>
//                 <div className="fade"></div>
//             </div>
//         </section>
//     );
// };

// export default InfiniteScrollHash;
