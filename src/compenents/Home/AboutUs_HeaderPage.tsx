"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import Image from "next/image";

export default function AboutUs_HeaderPage() {
    const leftRef = useRef(null);
    const rightRef = useRef(null);
    const isLeftInView = useInView(leftRef, { once: false });
    const isRightInView = useInView(rightRef, { once: false });

    const leftControl = useAnimation();
    const rightControl = useAnimation();

    useEffect(() => {
        if (isLeftInView) leftControl.start({ x: 0, opacity: 1, transition: { duration: 1, ease: "easeOut" } });
        else leftControl.start({ x: -100, opacity: 0 });

        if (isRightInView) rightControl.start({ x: 0, opacity: 1, transition: { duration: 1, ease: "easeOut" } });
        else rightControl.start({ x: 100, opacity: 0 });
    }, [isLeftInView, isRightInView, leftControl, rightControl]);

    const services = [
        {
            icon: "/Icon/icons8-parcel-cost-50.png",
            title: "Study Cost Assurance",
            description: "Ensure tuition fees and living expenses are clear and manageable for students."
        },
        {
            icon: "/Icon/icons8-financial-support-100.png",
            title: "Scholarship & Financial Support",
            description: "Assist students in applying for scholarships and financial aid opportunities."
        },
        {
            icon: "/Icon/visa.png",
            title: "Visa & Embassy Training",
            description: "Guide students through visa applications and practice embassy interviews."
        },
        {
            icon: "/Icon/icons8-insurance-agent-100.png",
            title: "Pre-Departure & Insurance",
            description: "Provide health insurance and orientation before leaving for Australia."
        }
    ];

    return (
        <div className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="w-[90%] max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                {/* LEFT: Video */}
                <motion.div
                    ref={leftRef}
                    initial={{ x: -100, opacity: 0 }}
                    animate={leftControl}
                    className="w-full rounded-2xl overflow-hidden shadow-lg relative"
                >
                    <video
                        src="/video/AQNLaLt4e0tSdKu_fCFD00hwB6S7yHZhzQHdeHA4hIYaiCswlXS27Z_9p4zRyR9i5UlY2mOKRyPMcOlSqcm_CCPrvfT4QTSd-NH3bS6q_FGS7w.mp4"
                        loop
                        playsInline
                        controls // Show play/pause and volume controls
                        className="w-full h-auto object-cover rounded-2xl"
                    />
                </motion.div>


                {/* RIGHT: Text */}
                <motion.div
                    ref={rightRef}
                    initial={{ x: 100, opacity: 0 }}
                    animate={rightControl}
                    className="w-full"
                >
                    <p className="text-sm sm:text-base md:text-lg font-semibold text-yellow-600 uppercase tracking-wide">
                        About Us
                    </p>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-4 font-extrabold leading-snug text-gray-900 dark:text-white">
                        Ambitious Students Ubiquitous
                    </h1>

                    <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        Ambitious Students Ubiquitous (ASU) is the exclusive representative of
                        <span className="font-semibold text-yellow-600"> Angelo State University (USA)</span>
                        and <span className="font-semibold text-yellow-600">Concord English College (Melbourne, Australia)</span>
                        in Cambodia. We provide trusted guidance and support for students aiming to study abroad.
                    </p>

                    {/* 4 Main Services */}
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {services.map((service, i) => (
                            <div key={i} className="flex items-start gap-4">
                                <Image src={service.icon} alt={service.title} width={50} height={50} className="w-12 h-12" />
                                <div>
                                    <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white leading-snug">
                                        {service.title}
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
