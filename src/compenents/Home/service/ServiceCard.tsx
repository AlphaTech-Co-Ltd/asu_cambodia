"use client";

import React, { useEffect, useRef, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";

interface CardProps {
    image: string; // path from public folder, e.g., "/icon/visa.png"
    title: string;
    description: string;
}

export default function ScrollDirectionCard({ image, title, description }: CardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Intersection Observer
    useEffect(() => {
        if (!ref.current) return;
        const element = ref.current;
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.3 }
        );

        observer.observe(element);
        return () => observer.unobserve(element);
    }, []);

    const animationClasses = isVisible
        ? "opacity-100 translate-y-0 transition-all duration-700 ease-out"
        : "opacity-0 translate-y-10 transition-all duration-700 ease-in";

    return (
        <div
            ref={ref}
            className={`relative p-8 bg-white dark:bg-blue-950 rounded-2xl shadow border border-gray-100 dark:border-blue-900 flex flex-col justify-between h-full min-h-[340px] ${animationClasses}`}
        >
            {/* Icon */}
            <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-yellow-100 dark:bg-blue-900 flex-shrink-0">
                <img
                    src={image} // direct path from public folder
                    alt={title}
                    width={40}
                    height={40}
                    className="object-contain"
                />
            </div>

            {/* Title + Description */}
            <div className="mt-6 flex flex-col flex-grow">
                <h1 className="text-xl font-bold text-blue-950 dark:text-white min-h-[48px]">
                    {title}
                </h1>
                <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed min-h-[72px]">
                    {description}
                </p>
            </div>

            {/* Learn More */}
            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-700 dark:text-yellow-400">
                <span>Learn More</span>
                <GoArrowUpRight className="text-lg" />
            </div>
        </div>
    );
}
