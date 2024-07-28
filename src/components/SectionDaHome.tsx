import Card from "./Card";
import { useTranslations } from "@/contexts/TranslationContext";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const SectionDaHome: React.FC = () => {
    const currentMessages = useTranslations();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadGSAP = async () => {
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");
            gsap.registerPlugin(ScrollTrigger);

            const cards = gsap.utils.toArray(".card");
            cards.forEach((card) => {
                if (card instanceof HTMLElement) {
                    gsap.fromTo(
                        card,
                        { opacity: 0, y: 50 },
                        {
                            opacity: 1,
                            y: 0,
                            scrollTrigger: {
                                trigger: card,
                                start: "top 80%",
                                end: "top 20%",
                                scrub: true,
                                onEnter: () =>
                                    gsap.to(card, { opacity: 1, y: 0 }),
                                onLeave: () =>
                                    gsap.to(card, { opacity: 0, y: 50 }),
                                onEnterBack: () =>
                                    gsap.to(card, { opacity: 1, y: 0 }),
                                onLeaveBack: () =>
                                    gsap.to(card, { opacity: 0, y: 50 }),
                            },
                        }
                    );
                }
            });
        };

        loadGSAP();
    }, []);

    return (
        <section className="flex gap-3 relative w-full h-screen mx-auto bg-[#190321] overflow-x-scroll overscroll-x-auto">
            <motion.div
                ref={containerRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="flex gap-6 overflow-x-auto whitespace-nowrap gap-6"
            >
                {Array.isArray(currentMessages.cards) &&
                    currentMessages.cards.map((card, index) => (
                        <Card
                            key={index}
                            index={index + 1}
                            name={card.name}
                            description={card.subtitle}
                            image={card.image}
                            className="card"
                        />
                    ))}
            </motion.div>
        </section>
    );
};

export default SectionDaHome;
