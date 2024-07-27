"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function AppleCardsCarouselDemo() {
    const cards = data.map((card, index) => (
        <Card key={card.src} card={card} index={index} />
    ));

    return (
        <div className="w-full h-full py-20">
            <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-white font-sans">
                Transform Your Business with Our Solutions
            </h2>
            <Carousel items={cards} />
        </div>
    );
}

const DummyContent = () => {
    return (
        <>
            {[...new Array(3).fill(1)].map((_, index) => {
                return (
                    <div
                        key={"dummy-content" + index}
                        className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
                    >
                        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                            <span className="font-bold text-neutral-700 dark:text-neutral-200">
                                Revolutionize your business with our
                                cutting-edge technology.
                            </span>{" "}
                            Our solutions are designed to enhance productivity,
                            streamline operations, and drive growth. Discover
                            how our innovative approaches can transform your
                            business today.
                        </p>
                        <Image
                            src="/tech/html.png"
                            alt="Macbook mockup from Aceternity UI"
                            height="500"
                            width="500"
                            className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                        />
                    </div>
                );
            })}
        </>
    );
};

const data = [
    {
        category: "Web Development",
        title: "Create Stunning Websites.",
        src: "/tech/html.png",
        content: <DummyContent />,
    },
    {
        category: "Machine Learning",
        title: "Unlock Insights with Machine Learning.",
        src: "/tech/html.png",
        content: <DummyContent />,
    },
    {
        category: "Automation",
        title: "Automate Your Business Processes.",
        src: "/tech/html.png",
        content: <DummyContent />,
    },
    {
        category: "Bots",
        title: "Integrate Intelligent Bots.",
        src: "/tech/html.png",
        content: <DummyContent />,
    },
    {
        category: "Artificial Intelligence",
        title: "Leverage AI for Smarter Decisions.",
        src: "/tech/html.png",
        content: <DummyContent />,
    },
    {
        category: "E-commerce",
        title: "Boost Your Sales with E-commerce Solutions.",
        src: "/tech/html.png",
        content: <DummyContent />,
    },
];
