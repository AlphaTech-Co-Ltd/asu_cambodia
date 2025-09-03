"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaUniversity, FaHandHoldingUsd, FaPassport, FaMedkit } from "react-icons/fa";

export default function Why_Choose_Us() {
    const controlsLeft = useAnimation();
    const controlsRight = useAnimation();
    const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: false });

    useEffect(() => {
        if (inView) {
            controlsLeft.start({ opacity: 1, x: 0, transition: { duration: 0.7 } });
            controlsRight.start({ opacity: 1, x: 0, transition: { duration: 0.7 } });
        } else {
            controlsLeft.start({ opacity: 0, x: -80, transition: { duration: 0.5 } });
            controlsRight.start({ opacity: 0, x: 80, transition: { duration: 0.5 } });
        }
    }, [inView, controlsLeft, controlsRight]);

    const services = [
        {
            icon: <FaUniversity className="w-8 h-8 text-yellow-600" />,
            title: "Study Cost Assurance",
            desc: "Ensure tuition fees and living expenses are clear and manageable for students.",
        },
        {
            icon: <FaHandHoldingUsd className="w-8 h-8 text-yellow-600" />,
            title: "Scholarship & Financial Support",
            desc: "Assist students in applying for scholarships and financial aid opportunities.",
        },
        {
            icon: <FaPassport className="w-8 h-8 text-yellow-600" />,
            title: "Visa & Embassy Training",
            desc: "Guide students through visa applications and practice embassy interviews.",
        },
        {
            icon: <FaMedkit className="w-8 h-8 text-yellow-600" />,
            title: "Pre-Departure & Insurance",
            desc: "Provide health insurance and orientation before leaving for Australia.",
        },
    ];

    return (
        <div ref={ref} className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="w-[90%] max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

                {/* Left Column */}
                <motion.div initial={{ opacity: 0, x: -80 }} animate={controlsLeft}>
                    <p className="text-sm sm:text-base md:text-lg font-semibold text-yellow-600 uppercase tracking-wide">
                        Why Choose Us?
                    </p>
                    <h1 className="text-2xl md:text-3xl lg:text-5xl mt-3 font-extrabold text-gray-900 dark:text-white leading-snug">
                        Trusted guidance for studying abroad.
                    </h1>
                    <p className="mt-4 text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                        Ambitious Students Ubiquitous (ASU) provides reliable support and services to help students succeed in their study abroad journey with clarity and confidence.
                    </p>

                    {/* Services Grid */}
                    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {services.map((service, i) => (
                            <div key={i} className="flex items-start gap-4 p-4 dark:bg-blue-950 rounded-xl shadow hover:shadow-lg transition-all duration-300">
                                <div className="flex items-center justify-center rounded-full">
                                    {service.icon}
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{service.title}</h2>
                                    <p className="mt-1 text-gray-600 dark:text-gray-300 text-sm">{service.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Right Column: Image or Video */}
                <motion.div
                    initial={{ opacity: 0, x: 80 }}
                    animate={controlsRight}
                    className="flex justify-center items-center rounded-2xl overflow-hidden shadow-lg"
                >
                    <video src="/video/AQOxH8LbonUDnNuTBGnOCCLVe0gvk_pvp21gE8pEWWAWvqxcnZ_xkyKmYZUpt3FslS7yqbzbdy3z9Eo9yZT1QjXnavUJ6PgKcxFF9d9FZx60Cw.mp4"
                        loop
                        playsInline
                        controls
                        className="w-full max-w-3xl h-auto object-cover rounded-2xl"
                    />
                </motion.div>
            </div>
        </div>
    );
}
