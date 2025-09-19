"use client";

import { useState } from "react";
import { majors } from "@/app/Information/AngeloSate/data/majors";
import { motion, AnimatePresence } from "framer-motion";

const ITEMS_PER_PAGE = 6;

// Modern animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            ease: [0.23, 1, 0.32, 1] as const,
        }
    }
};

const cardVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.23, 1, 0.32, 1] as const,
        }
    }
};

const expandVariants = {
    collapsed: {
        height: 0,
        opacity: 0,
        transition: {
            duration: 0.3,
            ease: [0.23, 1, 0.32, 1] as const,
        }
    },
    expanded: {
        height: "auto",
        opacity: 1,
        transition: {
            duration: 0.4,
            ease: [0.23, 1, 0.32, 1] as const,
        }
    }
};

const fadeInUp = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: [0.23, 1, 0.32, 1] as const,
        }
    }
};

export default function ModernAcademicPrograms() {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedMajor, setSelectedMajor] = useState<number | null>(null);
    const [expandedMajor, setExpandedMajor] = useState<number | null>(null);

    const totalPages = Math.ceil(majors.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentMajors = majors.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handleMajorClick = (majorId: number) => {
        setExpandedMajor(expandedMajor === majorId ? null : majorId);
    };

    const handleMajorHover = (majorId: number) => {
        setSelectedMajor(majorId);
    };

    const handleMajorLeave = () => {
        setSelectedMajor(null);
    };

    return (
        <section className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Modern Header */}
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                >
                    <motion.span
                        className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-4 block"
                        variants={fadeInUp}
                    >
                        Innovative Education
                    </motion.span>
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
                        variants={fadeInUp}
                    >
                        Transformative <span className="text-indigo-600 dark:text-indigo-400">Academic Programs</span>
                    </motion.h2>
                    <motion.div
                        className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-6 rounded-full"
                        variants={fadeInUp}
                    ></motion.div>
                    <motion.p
                        className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
                        variants={fadeInUp}
                    >
                        Discover our cutting-edge programs designed to equip you with the skills and knowledge
                        needed to excel in today&#39;s dynamic professional landscape.
                    </motion.p>
                </motion.div>

                {/* Programs Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    key={`page-${currentPage}`}
                >
                    <AnimatePresence mode="popLayout">
                        {currentMajors.map((major) => {
                            const isSelected = selectedMajor === major.id;
                            const isExpanded = expandedMajor === major.id;

                            return (
                                <motion.div
                                    key={major.id}
                                    className={`relative group rounded-2xl overflow-hidden 
                    ${isExpanded ? 'md:col-span-2 lg:col-span-3' : ''}
                  `}
                                    onClick={() => handleMajorClick(major.id)}
                                    onMouseEnter={() => handleMajorHover(major.id)}
                                    onMouseLeave={handleMajorLeave}
                                    variants={cardVariants}
                                    layout
                                    transition={{
                                        type: "spring",
                                        stiffness: 120,
                                        damping: 15
                                    }}
                                    whileHover={{
                                        y: -8,
                                        transition: { duration: 0.3 }
                                    }}
                                >
                                    {/* Card with gradient background */}
                                    <div className={`h-full bg-gradient-to-br from-white to-slate-50 dark:from-gray-800 dark:to-gray-900 
                    border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden
                    ${isSelected ? 'shadow-md ring-2 ring-indigo-500/20' : ''}
                    ${isExpanded ? 'ring-2 ring-indigo-500/30 shadow-lg' : ''}
                  `}>
                                        <div className="p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex-1">
                                                    <motion.h3
                                                        className="text-xl font-bold text-gray-900 dark:text-white mb-2"
                                                        layout="position"
                                                    >
                                                        {major.major}
                                                    </motion.h3>
                                                    <motion.p
                                                        className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2"
                                                        layout="position"
                                                    >
                                                        {major.description || "A comprehensive program designed for future innovators"}
                                                    </motion.p>
                                                </div>
                                                {major.icon && (
                                                    <motion.div
                                                        className="ml-4 p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400"
                                                        whileHover={{
                                                            rotate: 5,
                                                            scale: 1.05,
                                                            transition: { duration: 0.2 }
                                                        }}
                                                    >
                                                        <major.icon size={24} />
                                                    </motion.div>
                                                )}
                                            </div>

                                            {/* Expandable Content */}
                                            <AnimatePresence>
                                                {isExpanded && (
                                                    <motion.div
                                                        className="overflow-hidden"
                                                        variants={expandVariants}
                                                        initial="collapsed"
                                                        animate="expanded"
                                                        exit="collapsed"
                                                    >
                                                        <div className="pt-4 border-t border-gray-100 dark:border-gray-800 mt-4">
                                                            <motion.h4
                                                                className="text-lg font-semibold text-gray-900 dark:text-white mb-3"
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{
                                                                    opacity: 1,
                                                                    y: 0,
                                                                    transition: {
                                                                        delay: 0.1,
                                                                        duration: 0.3
                                                                    }
                                                                }}
                                                            >
                                                                Program Highlights
                                                            </motion.h4>
                                                            <motion.p
                                                                className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6"
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{
                                                                    opacity: 1,
                                                                    y: 0,
                                                                    transition: {
                                                                        delay: 0.2,
                                                                        duration: 0.3
                                                                    }
                                                                }}
                                                            >
                                                                {major.description}
                                                            </motion.p>
                                                            <motion.div
                                                                className="flex flex-col sm:flex-row gap-3"
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{
                                                                    opacity: 1,
                                                                    y: 0,
                                                                    transition: {
                                                                        delay: 0.3,
                                                                        duration: 0.3
                                                                    }
                                                                }}
                                                            >
                                                                <motion.button
                                                                    className="flex-1 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors duration-300 shadow-sm"
                                                                    whileHover={{
                                                                        scale: 1.03,
                                                                        transition: { duration: 0.2 }
                                                                    }}
                                                                    whileTap={{ scale: 0.98 }}
                                                                >
                                                                    Program Details
                                                                </motion.button>
                                                                <motion.button
                                                                    className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium rounded-lg transition-colors duration-300"
                                                                    whileHover={{
                                                                        scale: 1.03,
                                                                        transition: { duration: 0.2 }
                                                                    }}
                                                                    whileTap={{ scale: 0.98 }}
                                                                >
                                                                    Contact Advisor
                                                                </motion.button>
                                                            </motion.div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            {/* Expand Indicator */}
                                            {!isExpanded && (
                                                <motion.div
                                                    className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between"
                                                    initial={{ opacity: 0 }}
                                                    animate={{
                                                        opacity: 1,
                                                        transition: { delay: 0.2 }
                                                    }}
                                                >
                          <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                            Click for details
                          </span>
                                                    <motion.div
                                                        className="w-8 h-8 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400"
                                                        whileHover={{
                                                            scale: 1.1,
                                                            rotate: 90,
                                                            transition: { duration: 0.2 }
                                                        }}
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                        </svg>
                                                    </motion.div>
                                                </motion.div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {/* Modern Pagination */}
                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200 dark:border-gray-800 pt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration: 0.5,
                            ease: [0.23, 1, 0.32, 1]
                        }
                    }}
                >
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                        Page <span className="font-semibold">{currentPage}</span> of <span className="font-semibold">{totalPages}</span> •{" "}
                        <span className="font-medium">{majors.length}</span> programs total
                    </div>

                    <div className="flex items-center space-x-2">
                        <motion.button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                            whileHover={{
                                scale: currentPage !== 1 ? 1.05 : 1,
                                transition: { duration: 0.2 }
                            }}
                            whileTap={{ scale: currentPage !== 1 ? 0.95 : 1 }}
                        >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Previous
                        </motion.button>

                        <div className="hidden md:flex items-center space-x-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <motion.button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`relative inline-flex items-center justify-center w-10 h-10 text-sm font-medium rounded-lg ${
                                        page === currentPage
                                            ? 'bg-indigo-600 text-white shadow-sm'
                                            : 'text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                                    }`}
                                    whileHover={{
                                        scale: 1.1,
                                        transition: { duration: 0.2 }
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 17
                                    }}
                                >
                                    {page}
                                </motion.button>
                            ))}
                        </div>

                        <motion.button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                            whileHover={{
                                scale: currentPage !== totalPages ? 1.05 : 1,
                                transition: { duration: 0.2 }
                            }}
                            whileTap={{ scale: currentPage !== totalPages ? 0.95 : 1 }}
                        >
                            Next
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}