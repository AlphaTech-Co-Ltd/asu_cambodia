"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { GoArrowUpRight } from "react-icons/go";

interface CardProps {
    image: string;
    title: string;
    description: string;
}

export default function ScrollDirectionCard({ image, title, description }: CardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [scrollDirection, setScrollDirection] = useState<"down" | "up">("down");
    const lastScrollY = useRef(0);

    // Track scroll direction
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

    // Intersection Observer to track visibility
    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.3 } // 30% visible triggers
        );

        observer.observe(ref.current);

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    // Determine animation classes based on visibility and scroll direction
    let animationClasses = "";
    if (isVisible && scrollDirection === "down") {
        // Animate in on scroll down
        animationClasses = "opacity-100 translate-y-0 transition-all duration-700 ease-out";
    } else if (!isVisible && scrollDirection === "up") {
        // Animate out on scroll up
        animationClasses = "opacity-0 translate-y-10 transition-all duration-700 ease-in";
    } else if (!isVisible) {
        // Default hidden state
        animationClasses = "opacity-0 translate-y-10 transition-all duration-700 ease-in";
    } else {
        // Visible but scrolling up — keep visible
        animationClasses = "opacity-100 translate-y-0 transition-all duration-700 ease-out";
    }

    return (
        <div ref={ref} className={`p-6 cursor-pointer group relative bg-gray-100 dark:bg-blue-950 shadow rounded-xl flex flex-col justify-between h-full min-h-[320px] ${animationClasses}`}>
            <Image src={image} alt={title} width={60} height={60} className="object-contain" priority />
            <div className="mt-5 flex-grow">
                <h1 className="text-lg font-semibold group-hover:text-gray-600 transition-all duration-500 min-h-[48px]">{title}</h1>
                <p className="mt-4 font-medium text-gray-500 dark:text-gray-200 group-hover:text-gray-600 transition-all duration-500 min-h-[72px]">
                    {description}
                </p>
            </div>

            <div className="mt-6 text-xl font-medium flex items-center gap-1 group-hover:text-gray-500 transition-all duration-500">
                <span>Learn More</span>
                <GoArrowUpRight />
            </div>
        </div>
    );
}
