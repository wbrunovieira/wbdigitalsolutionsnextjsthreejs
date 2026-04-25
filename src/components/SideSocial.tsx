import React, { useState } from "react";
import {
    PiInstagramLogo,
    PiFacebookLogo,
    PiWhatsappLogo,
    PiYoutubeLogo,
} from "react-icons/pi";
import { useLanguage } from "@/contexts/LanguageContext";

const brandColors: Record<string, string> = {
    Instagram: "#e1306c",
    Facebook: "#1877f2",
    Whatsapp: "#25d366",
    Youtube: "#ff0000",
};

const SideSocial = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const { language } = useLanguage();

    const socialLinks = {
        en: [
            { name: "Instagram", href: "https://www.instagram.com/wb.digitalsolutions_int/", icon: <PiInstagramLogo /> },
            { name: "Facebook", href: "https://www.facebook.com/wb.digitalsolutions/", icon: <PiFacebookLogo /> },
            { name: "Whatsapp", href: "https://wa.me/5511982864581", icon: <PiWhatsappLogo /> },
            { name: "Youtube", href: "https://www.youtube.com/@wbdigitalsolutions", icon: <PiYoutubeLogo /> },
        ],
        "pt-BR": [
            { name: "Instagram", href: "https://www.instagram.com/wb.digitalsolutions/", icon: <PiInstagramLogo /> },
            { name: "Facebook", href: "https://www.facebook.com/wb.digitalsolutions/", icon: <PiFacebookLogo /> },
            { name: "Whatsapp", href: "https://wa.me/5511982864581", icon: <PiWhatsappLogo /> },
            { name: "Youtube", href: "https://www.youtube.com/@wbdigitalsolutions", icon: <PiYoutubeLogo /> },
        ],
        it: [
            { name: "Instagram", href: "https://www.instagram.com/wb.digitalsolutions_it/", icon: <PiInstagramLogo /> },
            { name: "Facebook", href: "https://www.facebook.com/wb.digitalsolutions/", icon: <PiFacebookLogo /> },
            { name: "Whatsapp", href: "https://wa.me/5511982864581", icon: <PiWhatsappLogo /> },
            { name: "Youtube", href: "https://www.youtube.com/@wbdigitalsolutions", icon: <PiYoutubeLogo /> },
        ],
        es: [
            { name: "Instagram", href: "https://www.instagram.com/wb.digitalsolutions_es/", icon: <PiInstagramLogo /> },
            { name: "Facebook", href: "https://www.facebook.com/wb.digitalsolutions/", icon: <PiFacebookLogo /> },
            { name: "Whatsapp", href: "https://wa.me/5511982864581", icon: <PiWhatsappLogo /> },
            { name: "Youtube", href: "https://www.youtube.com/@wbdigitalsolutions", icon: <PiYoutubeLogo /> },
        ],
    };

    const navData = socialLinks[language as keyof typeof socialLinks] || socialLinks.en;

    const getIconStyle = (index: number) => {
        let scale = 1;
        let marginY = "0px";

        if (hoveredIndex !== null) {
            if (index === hoveredIndex) {
                scale = 1.5;
                marginY = "6px";
            } else if (Math.abs(index - hoveredIndex) === 1) {
                scale = 1.1;
                marginY = "3px";
            }
        }

        return {
            transform: `scale(${scale})`,
            margin: `${marginY} 0`,
            transition: "transform 0.3s, margin 0.3s, color 0.3s",
            color: hoveredIndex === index ? brandColors[navData[index].name] : "white",
        };
    };

    const getContainerStyle = () => ({
        gap: hoveredIndex !== null ? "16px" : "10px",
        transition: "gap 0.3s",
    });

    return (
        <nav
            className="z-20 w-14 flex flex-col items-center rounded-2xl"
            style={{
                background: "rgba(26, 8, 38, 0.55)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(121, 41, 144, 0.45)",
                boxShadow: "0 0 18px rgba(121, 41, 144, 0.15)",
            }}
        >
            <div
                className="flex flex-col items-center justify-center py-4 px-2 text-2xl"
                onMouseLeave={() => setHoveredIndex(null)}
                style={getContainerStyle()}
            >
                {navData.map((link, index) => (
                    <a
                        className="group relative flex items-center cursor-pointer"
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={index}
                        onMouseEnter={() => setHoveredIndex(index)}
                    >
                        {/* Tooltip */}
                        <div className="absolute right-0 hidden pr-14 xl:group-hover:flex">
                            <div className="text-primary relative flex items-center rounded-[3px] bg-white p-[12px] shadow-lg">
                                <div className="text-[10px] font-semibold capitalize leading-none">
                                    {link.name}
                                </div>
                                <div className="absolute -right-2 border-y-[6px] border-l-8 border-r-0 border-solid border-y-transparent border-l-white"></div>
                            </div>
                        </div>

                        {/* Icon */}
                        <div style={getIconStyle(index)}>
                            {link.icon}
                        </div>
                    </a>
                ))}
            </div>
        </nav>
    );
};

export default SideSocial;
