"use client";

import React, { useEffect, useRef, useState } from "react";
import ServiceCard from "@/compenents/Home/service/ServiceCard";

// Scroll animation hook
function useScrollAnimationDirection(direction: "left" | "right" | "up") {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [scrollDirection, setScrollDirection] = useState<"down" | "up">("down");
    const lastScrollY = useRef(0);

    useEffect(() => {
        function onScroll() {
            const currentY = window.scrollY;
            setScrollDirection(currentY > lastScrollY.current ? "down" : "up");
            lastScrollY.current = currentY;
        }

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.3 }
        );

        observer.observe(ref.current);

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);


    const baseClasses = "transition-all duration-700 ease-out";
    const visibleClasses = "opacity-100 translate-x-0 translate-y-0";
    let hiddenClasses = "opacity-0";

    if (scrollDirection === "down") {
        if (direction === "left") hiddenClasses += " -translate-x-20";
        else if (direction === "right") hiddenClasses += " translate-x-20";
        else if (direction === "up") hiddenClasses += " translate-y-10";
    } else {
        if (direction === "left") hiddenClasses += " -translate-x-32";
        else if (direction === "right") hiddenClasses += " translate-x-32";
        else if (direction === "up") hiddenClasses += " translate-y-16";
    }

    const className = `${baseClasses} ${isVisible ? visibleClasses : hiddenClasses}`;
    return { ref, className };
}

// Main Component
export default function ServiceHeader() {
    const leftColumn = useScrollAnimationDirection("left");
    const rightColumn = useScrollAnimationDirection("right");
    const cardsGrid = useScrollAnimationDirection("up");

    return (
        <div className="py-16 bg-white dark:bg-gray-900">
            <div className="w-[90%] max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
                    {/* Left Text Column */}
                    <div ref={leftColumn.ref} className={leftColumn.className}>
                        <h2 className="text-base sm:text-lg md:text-xl font-bold text-blue-950 dark:text-white uppercase">
                            What do we provide for you?
                        </h2>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-3 text-blue-950 dark:text-white leading-snug">
                            We provide high-quality services and study opportunities abroad.
                        </h1>
                    </div>

                    {/* Right Button Column */}
                    <div ref={rightColumn.ref} className={`${rightColumn.className} flex lg:justify-end mt-6 lg:mt-0`}>
                        <a
                            href="#"
                            className="w-full sm:w-auto inline-block text-center px-8 py-4 bg-blue-800 hover:bg-blue-950 text-white font-semibold text-sm sm:text-base rounded-full uppercase transition-all duration-300"
                        >
                            All Services
                        </a>
                    </div>
                </div>

                {/* Service Cards Section */}
                <div
                    ref={cardsGrid.ref}
                    className={`${cardsGrid.className} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16`}
                >
                    {[
                        {
                            image: "/icon/consultation.png",
                            title: "Visa Consultation Service",
                            description:
                                "Get expert advice for U.S. student and tourist visa applications. We guide you through the process, help with documentation, and increase your chances of approval.",
                        },
                        {
                            image: "/icon/opportunities.png",
                            title: "Study Opportunities Abroad",
                            description:
                                "Explore top universities in the U.S. and Australia. We connect you with programs at all levels—bachelor's, master's, PhD, and vocational—with affordable tuition options.",
                        },
                        {
                            image: "/icon/assistance.png",
                            title: "Visa Application Assistance",
                            description:
                                "We help you complete and submit your visa applications properly and on time, reducing errors and making the process easier and stress-free.",
                        },
                    ].map((card, index) => (
                        <div key={index} className="h-full flex">
                            <ServiceCard
                                image={card.image}
                                title={card.title}
                                description={card.description}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
