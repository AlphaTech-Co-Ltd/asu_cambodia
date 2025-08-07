"use client";

import React, { useEffect, useRef, useState } from "react";
import ServiceCard from "@/compenents/Home/service/ServiceCard";

function useScrollAnimationDirection(direction: "left" | "right" | "up") {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [scrollDirection, setScrollDirection] = useState<"down" | "up">("down");
    const lastScrollY = useRef(0);

    useEffect(() => {
        function onScroll() {
            const currentY = window.scrollY;
            if (currentY > lastScrollY.current) {
                setScrollDirection("down");
            } else if (currentY < lastScrollY.current) {
                setScrollDirection("up");
            }
            lastScrollY.current = currentY;
        }
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false); // Hide when out of view
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(ref.current);

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    const baseClasses = "transition-all duration-700 ease-out";
    const visibleClasses = "opacity-100 translate-x-0 translate-y-0";
    let hiddenClasses = "opacity-0";

    if (scrollDirection === "down") {
        switch (direction) {
            case "left":
                hiddenClasses += " -translate-x-20";
                break;
            case "right":
                hiddenClasses += " translate-x-20";
                break;
            case "up":
                hiddenClasses += " translate-y-10";
                break;
        }
    } else {
        switch (direction) {
            case "left":
                hiddenClasses += " -translate-x-32";
                break;
            case "right":
                hiddenClasses += " translate-x-32";
                break;
            case "up":
                hiddenClasses += " translate-y-16";
                break;
        }
    }

    const className = `${baseClasses} ${isVisible ? visibleClasses : hiddenClasses}`;

    return {
        ref,
        className,
    };
}

export default function ServiceHeader() {
    const leftColumn = useScrollAnimationDirection("left");
    const rightColumn = useScrollAnimationDirection("right");
    const cardsGrid = useScrollAnimationDirection("up");

    return (
        <div className="pt-16 pb-16">
            <div className="w-[80%] mx-auto">
                {/* Header Section */}
                <div
                    ref={leftColumn.ref}
                    className={`${leftColumn.className} w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center`}
                >
                    {/* Left Column */}
                    <div>
                        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-950 dark:text-white">
                            What do we provide for you?
                        </h1>
                        <h1 className="text-xl sm:text-3xl md:text-4xl font-bold mt-1">
                            We provide high-quality services and study opportunities abroad.
                        </h1>
                    </div>

                    {/* Right Column - Button */}
                    <div
                        ref={rightColumn.ref}
                        className={`${rightColumn.className} lg:ml-auto`}
                    >
                        <a
                            href="#"
                            className="w-full py-4 text-base sm:text-lg md:text-lg text-center text-white transition-colors font-semibold duration-300 bg-blue-800 rounded-full uppercase hover:bg-blue-950 ease px-9 md:w-auto"
                        >
                            All Services
                        </a>
                    </div>
                </div>

                {/* Service Cards */}
                <div
                    ref={cardsGrid.ref}
                    className={`${cardsGrid.className} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch mt-16`}
                >
                    <div className="h-full flex">
                        <ServiceCard
                            image={"/icon/consultation.png"}
                            title={"Visa Consultation Service"}
                            description={
                                "Get expert advice for U.S. student and tourist visa applications. We guide you through the process, help with documentation, and increase your chances of approval."
                            }
                        />
                    </div>
                    <div className="h-full flex">
                        <ServiceCard
                            image={"/icon/opportunities.png"}
                            title={"Study Opportunities Abroad"}
                            description={
                                "Explore top universities in the U.S. and Australia. We connect you with programs at all levels—bachelor's, master's, PhD, and vocational—with affordable tuition options."
                            }
                        />
                    </div>
                    <div className="h-full flex">
                        <ServiceCard
                            image={"/icon/assistance.png"}
                            title={"Visa Application Assistance"}
                            description={
                                "We help you complete and submit your visa applications properly and on time, reducing errors and making the process easier and stress-free."
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
