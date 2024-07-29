import Card from "./Card";
import { useTranslations } from "@/contexts/TranslationContext";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const SectionDaHome: React.FC = () => {
    const currentMessages = useTranslations();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadGSAP = async () => {
            const gsap = (await import("gsap")).default;
            const ScrollTrigger = (await import("gsap/ScrollTrigger")).default;
            gsap.registerPlugin(ScrollTrigger);
            const cards = gsap.utils.toArray(".card");

            gsap.set(cards, { opacity: 0.3, x: -2000 });

            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top 60%",
                end: "bottom top",
                scrub: true,

                onEnter: () => {
                    gsap.to(cards, {
                        opacity: 1,
                        x: 0,
                        duration: 1.5,
                        ease: "power1.inOut",
                        stagger: {
                            each: 0.5,
                        },
                    });
                },
                onLeave: () => {
                    gsap.to(cards, {
                        opacity: 0.3,
                        x: -1800,
                        duration: 1.5,
                        ease: "power1.inOut",
                        stagger: {
                            each: 0.5,
                        },
                    });
                },
                onEnterBack: () => {
                    gsap.to(cards, {
                        opacity: 1,
                        x: 0,
                        duration: 1.5,
                        ease: "power1.inOut",
                        stagger: {
                            each: 0.5,
                        },
                    });
                },
                onLeaveBack: () => {
                    gsap.to(cards, {
                        opacity: 0.3,
                        x: -1800,
                        duration: 1.5,
                        ease: "power1.inOut",
                        stagger: {
                            each: 0.5,
                        },
                    });
                },
            });
        };

        loadGSAP();
    }, []);

    return (
        <section className="flex gap-3 relative w-full h-screen mx-auto pt-10 bg-[#190321] overflow-x-scroll overscroll-x-auto">
            <motion.div
                ref={containerRef}
                initial={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 5 }}
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
