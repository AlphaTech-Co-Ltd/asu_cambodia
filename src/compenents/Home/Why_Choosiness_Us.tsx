"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaRegFileImage } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { GrResources } from "react-icons/gr";
import Image from "next/image";

export default function Why_Choosiness_Us() {
    const controlsLeft = useAnimation();
    const controlsRight = useAnimation();

    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: false,
    });

    useEffect(() => {
        if (inView) {
            controlsLeft.start({ opacity: 1, x: 0, transition: { duration: 0.7 } });
            controlsRight.start({ opacity: 1, x: 0, transition: { duration: 0.7 } });
        } else {
            controlsLeft.start({ opacity: 0, x: -80, transition: { duration: 0.5 } });
            controlsRight.start({ opacity: 0, x: 80, transition: { duration: 0.5 } });
        }
    }, [inView, controlsLeft, controlsRight]);

    const features = [
        {
            icon: <FaRegFileImage className="w-8 h-8 text-blue-950 dark:text-white" />,
            title: "Document Processing",
            desc: "We help prepare, review, and submit all documents for visas, school admissions, and legal checks.",
        },
        {
            icon: <GrResources className="w-8 h-8 text-blue-950 dark:text-white" />,
            title: "Resource Guidance",
            desc: "Access curated resources to support your visa journey and school applications abroad.",
        },
        {
            icon: <BiSupport className="w-8 h-8 text-blue-950 dark:text-white" />,
            title: "Ongoing Support",
            desc: "Our team is here to support you before and after you arrive at your study destination.",
        },
    ];

    return (
        <div ref={ref} className="pt-16 pb-16">
            <div className="w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                {/* Left Column */}
                <motion.div
                    initial={{ opacity: 0, x: -80 }}
                    animate={controlsLeft}
                >
                    <p className="text-sm sm:text-base md:text-xl font-bold text-blue-950 dark:text-white uppercase">
                        Why Choose Us?
                    </p>
                    <h1 className="text-2xl md:text-3xl lg:text-5xl mt-3 font-bold leading-snug">
                        Trusted help for visas and study abroad.
                    </h1>
                    <div className="mt-5 mb-8 w-full h-[1px] bg-gray-200 dark:bg-gray-600"></div>

                    {features.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8"
                        >
                            <div className="flex items-center justify-center w-16 h-16 outline outline-2 outline-amber-300 dark:outline-white rounded-full">
                                {item.icon}
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-bold">{item.title}</h2>
                                <p className="mt-2 text-gray-800 dark:text-gray-400 sm:w-[90%]">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Right Column */}
                <motion.div
                    initial={{ opacity: 0, x: 80 }}
                    animate={controlsRight}
                    className="w-full h-auto"
                >
                    <Image
                        src="/image/WhyUs.png"
                        alt="Why Us Image"
                        width={800}
                        height={800}
                        className="w-full h-auto max-w-full"
                        priority
                    />
                </motion.div>
            </div>
        </div>
    );
}
