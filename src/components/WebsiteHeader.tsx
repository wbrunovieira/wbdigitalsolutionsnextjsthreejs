import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTranslations } from "@/contexts/TranslationContext";
import { FaArrowRight, FaStar } from "react-icons/fa";

interface HeaderProps {
    scrollIndicatorHidden: boolean;
}

export const WebsiteHeader: React.FC<HeaderProps> = ({ scrollIndicatorHidden }) => {
    const currentMessages = useTranslations();


    const config = {
        name1: currentMessages?.experienceTitle1 ,
        name2: currentMessages?.experienceTitle2 ,
        disciplines: currentMessages?.experienceDisciplines 
    };

    const disciplines = config.disciplines;
    let disciplineIndex = 0;

    const headerRef = useRef<HTMLDivElement>(null);
    const name1Ref = useRef<HTMLSpanElement>(null);
    const name2Ref = useRef<HTMLSpanElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const disciplineRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        if (name1Ref.current) {
            const letters = name1Ref.current.querySelectorAll("span");
            gsap.to(letters, {
                opacity: 1,
                stagger: 0.1,
                duration: 1.3,
                ease: "power2.inOut",
            });
        }
    }, []);
    useGSAP(() => {
        if (name2Ref.current) {
            const letters = name2Ref.current.querySelectorAll("span");
            gsap.to(letters, {
                opacity: 1,
                stagger: 0.1,
                duration: 1.3,
                ease: "power2.inOut",
            });
        }
    }, []);

    useGSAP(() => {
        const timeline = gsap.timeline({
            repeat: -1,
            repeatDelay: 1.5,
            onRepeat: () => {
                disciplineIndex = (disciplineIndex + 1) % disciplines.length;
                if (disciplineRef.current) {
                    disciplineRef.current.textContent = disciplines[disciplineIndex];
                }
            },
        });

        gsap.set(overlayRef.current, { scaleX: 0, backgroundColor: "white", zIndex: 20 });
        gsap.set(disciplineRef.current, { opacity: 0 });

        timeline
            .to(overlayRef.current, {
                scaleX: 1,
                transformOrigin: "left center",
                duration: 1.2,
                yoyo: true,
                ease: "power2.out",
            })
            .to(disciplineRef.current, { opacity: 1, duration: 1 }, "-=1.2")
            .to(disciplineRef.current, { opacity: 0, duration: 1 }, "+=1")
            .to(overlayRef.current, { scaleX: 0, duration: 1, ease: "power2.in" }, "-=0.8");

        return () => {
            timeline.kill();
        };
    }, [disciplines]);

    if (!currentMessages?.experienceTitle1 || !currentMessages?.experienceTitle2) {
    return <div>Loading...</div>;
}


    return (
        <header ref={headerRef} className="relative flex flex-col items-start space-y-4 p-8 text-white mb-8 bg-primary/70 md:bg-transparent ">

            <h1 className="text-xl md:text-4xl">
                <span aria-hidden="true" ref={name1Ref} className="flex space-x-1">
                     {config.name1.split("").map((letter: string, index: number) => (
                        <span key={index} className="inline-block opacity-0">
                            {letter}
                        </span>
                    ))}
                </span>
                <span aria-hidden="true" ref={name2Ref} className="flex space-x-1 mt-2">
                     {config.name2.split("").map((letter: string, index: number) => (
                        <span key={index} className="inline-block opacity-0">
                            {letter}
                        </span>
                    ))}
                </span>
            </h1>

            <h2 className="relative flex items-center text-2xl font-semibold">
                <span className="flex flex-col">
                    <span ref={disciplineRef} className="relative text-yellowcustom overflow-hidden">
                        <span className="relative z-30">{disciplines[disciplineIndex]}</span>
                    </span>
                    <div
                        ref={overlayRef}
                        className="absolute bg-white z-20 w-full h-[0.1em] top-[0.95em] left-0 mt-2"
                    ></div>
                </span>
            </h2>

<div className="flex flex-col text-white w-full md:w-1/3 bg-gradient-to-r from-primary to-transparent py-8 rounded opacity-80 mt-2 md:mt-8 min-h-[100px]">                 
<p className="font-semibold text-yellowcustom flex items-center whitespace-nowrap ">
                    <FaStar className="mr-2" />
                    {currentMessages?.experiencesub1}
                  </p>
                   <div className="mt-2 w-full h-[1px] bg-gradient-to-r from-white to-transparent mx-auto"></div>
                   <p className="font-extralight mt-2  p-2 w-full max-w-none ">
                     {currentMessages?.experiencesub2}
                  </p>
            </div>

        </header>
    );
};