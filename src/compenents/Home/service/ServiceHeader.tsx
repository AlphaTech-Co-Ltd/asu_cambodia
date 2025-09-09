"use client";

import React from "react";
import { FaPassport, FaGraduationCap, FaChalkboardTeacher } from "react-icons/fa";
import { ChevronRight } from "lucide-react";

// Scroll animation hook
function useScrollAnimationDirection(direction: "left" | "right" | "up") {
    const ref = React.useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = React.useState(false);
    const [scrollDirection, setScrollDirection] = React.useState<"down" | "up">("down");
    const lastScrollY = React.useRef(0);

    React.useEffect(() => {
        function onScroll() {
            const currentY = window.scrollY;
            setScrollDirection(currentY > lastScrollY.current ? "down" : "up");
            lastScrollY.current = currentY;
        }

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    React.useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
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

    const serviceCards = [
        {
            icon: <FaPassport size={40} className="text-blue-600" />,
            title: "Visa & Documentation Support",
            description:
                "We help you with student visa applications, embassy interview preparation, health insurance, and provide regular updates via email or SMS.",
            gradient: "from-blue-500 to-blue-700"
        },
        {
            icon: <FaGraduationCap size={40} className="text-green-600" />,
            title: "Scholarship Opportunities",
            description:
                "We guarantee affordable tuition fees, assist with study packages or scholarships, and connect you with opportunities to study abroad.",
            gradient: "from-green-500 to-green-700"
        },
        {
            icon: <FaChalkboardTeacher size={40} className="text-purple-600" />,
            title: "Training Orientation",
            description:
                "We organize seminars, workshops, and pre-departure orientation sessions to prepare you for studying and living in Australia.",
            gradient: "from-purple-500 to-purple-700"
        },
    ];

    return (
        <div className="py-16 bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 dark:bg-blue-900/20 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-100 dark:bg-green-900/20 rounded-full translate-x-1/3 translate-y-1/3 opacity-50"></div>

            <div className="relative z-10 w-[90%] max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16">
                    {/* Left Text Column */}
                    <div ref={leftColumn.ref} className={leftColumn.className}>
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
                            Our Services
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
                            Comprehensive Support for Your <span className="text-blue-600 dark:text-blue-400">Study Abroad</span> Journey
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl">
                            We provide end-to-end services to ensure your international education experience is seamless and successful.
                        </p>
                    </div>

                    {/* Right Button Column */}
                    <div ref={rightColumn.ref} className={`${rightColumn.className} flex lg:justify-end`}>
                        <a href="/Service" className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold text-base rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
                            Explore All Services
                            <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>

                {/* Service Cards Section */}
                <div
                    ref={cardsGrid.ref}
                    className={`${cardsGrid.className} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`}
                >
                    {serviceCards.map((card, index) => (
                        <div key={index} className="h-full flex group">
                            <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group-hover:-translate-y-2 flex-1">
                                {/* Gradient accent */}
                                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${card.gradient} rounded-t-2xl`}></div>

                                {/* Icon container */}
                                <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 mb-6">
                                    {card.icon}
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                    {card.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {card.description}
                                </p>

                                {/* Hover effect line */}
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-4/5 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent transition-all duration-300"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}