import React, { useState } from "react";
import {
    PiInstagramLogo,
    PiFacebookLogo,
    PiWhatsappLogo,
    PiYoutubeLogo,
} from "react-icons/pi";
import { useLanguage } from "@/contexts/LanguageContext";

const SideSocial = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const { language } = useLanguage();

    // Define links para diferentes idiomas
    const socialLinks = {
        en: [
            { name: "Instagram", href: "https://www.instagram.com/en", icon: <PiInstagramLogo /> },
            { name: "Facebook", href: "https://www.facebook.com/en", icon: <PiFacebookLogo /> },
            { name: "Whatsapp", href: "https://wa.me/en", icon: <PiWhatsappLogo /> },
            { name: "Youtube", href: "https://www.youtube.com/en", icon: <PiYoutubeLogo /> },
        ],
        "pt-BR": [
            { name: "Instagram", href: "https://www.instagram.com/pt", icon: <PiInstagramLogo /> },
            { name: "Facebook", href: "https://www.facebook.com/pt", icon: <PiFacebookLogo /> },
            { name: "Whatsapp", href: "https://wa.me/pt", icon: <PiWhatsappLogo /> },
            { name: "Youtube", href: "https://www.youtube.com/pt", icon: <PiYoutubeLogo /> },
        ],
        it: [
            { name: "Instagram", href: "https://www.instagram.com/it", icon: <PiInstagramLogo /> },
            { name: "Facebook", href: "https://www.facebook.com/it", icon: <PiFacebookLogo /> },
            { name: "Whatsapp", href: "https://wa.me/it", icon: <PiWhatsappLogo /> },
            { name: "Youtube", href: "https://www.youtube.com/it", icon: <PiYoutubeLogo /> },
        ],
        es: [
            { name: "Instagram", href: "https://www.instagram.com/es", icon: <PiInstagramLogo /> },
            { name: "Facebook", href: "https://www.facebook.com/es", icon: <PiFacebookLogo /> },
            { name: "Whatsapp", href: "https://wa.me/es", icon: <PiWhatsappLogo /> },
            { name: "Youtube", href: "https://www.youtube.com/es", icon: <PiYoutubeLogo /> },
        ],
    };

    // Links da rede social com base no idioma atual
    const navData = socialLinks[language as keyof typeof socialLinks] || socialLinks.en;

    const handleMouseEnter = (index: number) => {
        setHoveredIndex(index);
    };

    const getIconStyle = (index: number) => {
        let scale = 1;
        let margin = "10px";

        if (hoveredIndex !== null) {
            if (index === hoveredIndex) {
                scale = 1.5;
                margin = "20px";
            } else if (Math.abs(index - hoveredIndex) === 1) {
                scale = 1.1;
                margin = "20px";
            }
        }

        return {
            transform: `scale(${scale})`,
            margin: `0 ${margin}`,
            transition: "transform 0.3s, margin 0.3s",
        };
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    const getContainerStyle = () => {
        return {
            gap: hoveredIndex !== null ? "20px" : "10px",
            transition: "gap 0.3s",
        };
    };

    return (
        <nav className="right-[2%] z-5550 w-16 border flex h-56 rounded !flex-col items-center gap-y-2 xl:w-16 xl:max-w-md xl:justify-center">
            <div
                className="flex flex-col h-full items-center justify-between gap-y-10 px-2 py-4 text-2xl backdrop-blur-sm md:px-40 xl:h-max xl:flex-col
                xl:justify-center xl:rounded-full xl:px-0 xl:text-xl"
                onMouseLeave={handleMouseLeave}
                style={getContainerStyle()}
            >
                {navData.map((link, index) => (
                    <a
                        className={`${link.href} hover:text-accent group relative flex items-center transition-all duration-300 dock-item cursor-pointer`}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={index}
                        onMouseEnter={() => handleMouseEnter(index)}
                    >
                        {/* Tooltip */}
                        <div className="absolute right-0 hidden pr-14 xl:group-hover:flex">
                            <div className="text-primary relative flex items-center rounded-[3px] bg-white p-[12px] shadow-lg">
                                <div className="text-[10px] font-semibold capitalize leading-none">
                                    {link.name}
                                </div>
                                {/* Triangle */}
                                <div className="absolute -right-2 border-y-[6px] border-l-8 border-r-0 border-solid border-y-transparent border-l-white"></div>
                            </div>
                        </div>
                        {/* Icon */}
                        <div style={getIconStyle(index)}>
                            <div className="text-white">{link.icon}</div>
                        </div>
                    </a>
                ))}
            </div>
        </nav>
    );
};

export default SideSocial;