"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation, Variants, easeOut } from "framer-motion";
import Image from "next/image";

export default function AboutUs_HeaderPage() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const isInView = useInView(containerRef, { once: false, amount: 0.3 });
    const mainControls = useAnimation();

    // Video control
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView, mainControls]);

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

    // Animation Variants
    const containerVariants: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } }
    };

    const itemVariants: Variants = {
        hidden: { y: 25, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: easeOut } }
    };

    const videoVariants: Variants = {
        hidden: { scale: 0.95, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { duration: 0.8, ease: easeOut } }
    };

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (isPlaying) videoRef.current.pause();
        else videoRef.current.play();
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="py-24 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800" ref={containerRef}>
            <div className="w-[90%] max-w-7xl mx-auto">
                {/* Header */}
                <motion.div variants={containerVariants} initial="hidden" animate={mainControls} className="text-center mb-20">
                    <motion.div
                        variants={itemVariants}
                        className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 mb-6"
                    >
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300 uppercase tracking-wider">
              About Our Organization
            </span>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight"
                    >
                        Empowering <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Global Education</span>
                    </motion.h1>

                    <motion.div
                        variants={itemVariants}
                        className="w-32 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mb-8 rounded-full"
                    />

                    <motion.p
                        variants={itemVariants}
                        className="max-w-3xl mx-auto text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-light"
                    >
                        Ambitious Students Ubiquitous (ASU) is the exclusive representative of leading international
                        educational institutions, providing trusted guidance and comprehensive support for students
                        pursuing global education opportunities.
                    </motion.p>
                </motion.div>

                {/* Content Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* LEFT: Video */}
                    <motion.div variants={videoVariants} initial="hidden" animate={mainControls} className="w-full relative">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-700 hover:shadow-3xl">
                            <div className="relative w-full aspect-video">
                                <video
                                    ref={videoRef}
                                    src="/video/AQNLaLt4e0tSdKu_fCFD00hwB6S7yHZhzQHdeHA4hIYaiCswlXS27Z_9p4zRyR9i5UlY2mOKRyPMcOlSqcm_CCPrvfT4QTSd-NH3bS6q_FGS7w.mp4"
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover rounded-2xl"
                                />
                                {/* Play/Pause Button */}
                                <button
                                    onClick={togglePlay}
                                    className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-colors"
                                >
                                    {isPlaying ? "Pause" : "Play"}
                                </button>
                            </div>
                            <div className="absolute inset-0 border border-slate-200/30 dark:border-slate-700/30 rounded-2xl pointer-events-none" />
                        </div>
                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500/10 rounded-full -z-10" />
                        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-indigo-500/10 rounded-full -z-10" />
                    </motion.div>

                    {/* RIGHT: Text & Services */}
                    <motion.div variants={containerVariants} initial="hidden" animate={mainControls} className="w-full">
                        <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-8">
                            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Strategic Partnerships</span>
                        </motion.h2>

                        <motion.p variants={itemVariants} className="text-lg text-slate-600 dark:text-slate-300 mb-12 leading-relaxed font-light">
                            We proudly represent <span className="font-semibold text-blue-600 dark:text-blue-400">Angelo State University (USA)</span> and{" "}
                            <span className="font-semibold text-indigo-600 dark:text-indigo-400">Concord English College (Melbourne, Australia)</span> in Cambodia, connecting students to world-class education opportunities with personalized guidance.
                        </motion.p>

                        <motion.h3 variants={itemVariants} className="text-2xl font-semibold text-slate-900 dark:text-white mb-8 flex items-center">
                            <span className="w-8 h-0.5 bg-blue-500 mr-4"></span>
                            Comprehensive Services
                        </motion.h3>

                        {/* Services Grid */}
                        <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {services.map((service, i) => (
                                <motion.div
                                    key={i}
                                    variants={itemVariants}
                                    whileHover={{ y: -8, transition: { duration: 0.3, ease: easeOut } }}
                                    className="group bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 dark:border-slate-700/50 hover:border-blue-200 dark:hover:border-blue-800/50 relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-bl-full transition-all duration-500 group-hover:w-24 group-hover:h-24" />

                                    <div className="flex items-start gap-5 relative z-10">
                                        <div className="bg-gradient-to-br from-blue-500 to-indigo-500 p-3 rounded-xl flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                                            <Image
                                                src={service.icon}
                                                alt={service.title}
                                                width={28}
                                                height={28}
                                                className="w-7 h-7 filter brightness-0 invert"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                                {service.title}
                                            </h4>
                                            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-light">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
