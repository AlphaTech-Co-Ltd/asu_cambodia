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
        if (isLeftInView) {
            leftControl.start({
                x: 0,
                opacity: 1,
                transition: { duration: 1, ease: "easeOut" },
            });
        } else {
            leftControl.start({ x: -100, opacity: 0 });
        }

        if (isRightInView) {
            rightControl.start({
                x: 0,
                opacity: 1,
                transition: { duration: 1, ease: "easeOut" },
            });
        } else {
            rightControl.start({ x: 100, opacity: 0 });
        }
    }, [isLeftInView, isRightInView, leftControl, rightControl]);

    return (
        <div className="py-16">
            <div className="w-[90%] max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                {/* LEFT: Image */}
                <motion.div
                    ref={leftRef}
                    initial={{ x: -100, opacity: 0 }}
                    animate={leftControl}
                    className="w-full"
                >
                    <Image
                        src="/image/About_Us_Header.png"
                        alt="About Us Header"
                        priority
                        width={700}
                        height={700}
                        className="w-full h-auto max-w-full object-contain"
                    />
                </motion.div>

                {/* RIGHT: Text */}
                <motion.div
                    ref={rightRef}
                    initial={{ x: 100, opacity: 0 }}
                    animate={rightControl}
                    className="w-full"
                >
                    <p className="text-sm sm:text-base md:text-xl font-bold text-blue-950 dark:text-white uppercase">
                        About Us
                    </p>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-5 font-bold leading-snug text-blue-950 dark:text-white">
                        Ambitious Students Ubiquitous
                    </h1>

                    <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300">
                        Ambitious Students Ubiquitous is the exclusive representative of Angelo State University in Cambodia.
                    </p>

                    {/* Icon Grid */}
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <Image
                                    src="/Icon/visa.png"
                                    alt="Visa Icon"
                                    priority
                                    width={50}
                                    height={50}
                                    className="w-10 h-10 sm:w-12 sm:h-12"
                                />
                                <h2 className="text-base sm:text-lg font-semibold text-blue-950 dark:text-white leading-snug">
                                    VISA Card Process
                                </h2>
                            </div>
                        ))}
                    </div>

                    {/* Button */}
                    <div className="mt-10">
                        <a
                            href="#"
                            className="inline-block w-full sm:w-auto text-center px-8 py-4 bg-blue-950 hover:bg-blue-800 transition-all duration-300 rounded-full text-white text-sm sm:text-base font-semibold uppercase"
                        >
                            About More ASU
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
