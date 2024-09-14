"use client";
// import { useLanguage } from "@/contexts/LanguageContext";
// import { useTranslations } from "@/contexts/TranslationContext";

// const { language, setLanguage } = useLanguage();

// const currentMessages = useTranslations();

// const tags = [
//     currentMessages.websites,
//     currentMessages.InteligenciaArtificial,
// currentMessages.Automation,
// currentMessages.digitalmarketingHash,
// currentMessages.ecommerce,
// currentMessages.socialmediaHash,
// currentMessages.landingpage,
// currentMessages.design,
// currentMessages.digitalmarketingSeo,
// ...(language === "pt-BR" ? currentMessages.wbsalao : '')
// ];
const tags = [
    "WebSites",
    "WebSites",
    "WebSites",
    "WebSites",
    "WebSites",
    "WebSites",
    "WebSites",
    "WebSites",
    "WebSites",
    "WebSites",
    "WebSites",
    "WebSites",
    "WebSites",
    "WebSites",
    "WebSites",
    "WebSites",
];

const InfiniteScrollHash: React.FC = () => {
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
