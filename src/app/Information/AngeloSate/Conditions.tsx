import { useState, useEffect } from 'react';
import { conditions } from "@/app/Information/AngeloSate/data/Conditions";
import { motion} from 'framer-motion';

export default function Conditions() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Check system preference for dark mode on initial load
    useEffect(() => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setIsDarkMode(true);
        }
    }, []);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 10
            }
        }
    };

    const tableRowVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i : number) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: i * 0.05,
                duration: 0.3
            }
        })
    };

    return (
        <div className={isDarkMode ? 'dark' : ''}>
            <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-12 text-center"
                    >
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Admission Requirements</h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            Please prepare the following documents and fulfill requirements for successful admission.
                        </p>
                    </motion.div>

                    {/* Cards Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {/* Transcript */}
                        <motion.div
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.03,
                                transition: { duration: 0.2 }
                            }}
                            className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                        >
                            <div className="flex items-start space-x-4">
                                <motion.div
                                    whileHover={{ rotate: 5 }}
                                    className="p-4 rounded-xl bg-gradient-to-tr from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/20 transition-transform duration-300 group-hover:scale-110"
                                >
                                    <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                    </svg>
                                </motion.div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Transcript Requirement</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        Submit an official transcript showing a minimum GPA of <span className="font-medium text-blue-600 dark:text-blue-400">2.5 or higher</span>.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Application Form */}
                        <motion.div
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.03,
                                transition: { duration: 0.2 }
                            }}
                            className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                        >
                            <div className="flex items-start space-x-4">
                                <motion.div
                                    whileHover={{ rotate: 5 }}
                                    className="p-4 rounded-xl bg-gradient-to-tr from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/20 transition-transform duration-300 group-hover:scale-110"
                                >
                                    <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                                    </svg>
                                </motion.div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Application Form</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        Complete the official online application form provided by the <span className="font-medium text-green-600 dark:text-green-400">ASU Cambodia team</span>.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Flywire */}
                        <motion.div
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.03,
                                transition: { duration: 0.2 }
                            }}
                            className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                        >
                            <div className="flex items-start space-x-4">
                                <motion.div
                                    whileHover={{ rotate: 5 }}
                                    className="p-4 rounded-xl bg-gradient-to-tr from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/20 transition-transform duration-300 group-hover:scale-110"
                                >
                                    <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                    </svg>
                                </motion.div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Flywire</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        <span className="font-medium text-purple-600 dark:text-purple-400">Flywire</span> is a secure global payment platform for tuition and fees, offering competitive exchange rates and real-time tracking.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Passport */}
                        <motion.div
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.03,
                                transition: { duration: 0.2 }
                            }}
                            className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                        >
                            <div className="flex items-start space-x-4">
                                <motion.div
                                    whileHover={{ rotate: 5 }}
                                    className="p-4 rounded-xl bg-gradient-to-tr from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-800/20 transition-transform duration-300 group-hover:scale-110"
                                >
                                    <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 2h6a2 2 0 012 2v16a2 2 0 01-2 2H9a2 2 0 01-2-2V4a2 2 0 012-2z"/>
                                        <circle cx="12" cy="12" r="3.5" strokeWidth={2} />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8M8.5 12h7"/>
                                    </svg>
                                </motion.div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Passport</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        Applicants must submit a <span className="font-medium text-indigo-600 dark:text-indigo-400">valid passport</span> for identity verification and international admission purposes.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Bank Balance */}
                        <motion.div
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.03,
                                transition: { duration: 0.2 }
                            }}
                            className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                        >
                            <div className="flex items-start space-x-4">
                                <motion.div
                                    whileHover={{ rotate: 5 }}
                                    className="p-4 rounded-xl bg-gradient-to-tr from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/20 transition-transform duration-300 group-hover:scale-110"
                                >
                                    <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3v1a3 3 0 006 0v-1c0-1.657-1.343-3-3-3zm-6 5v4a2 2 0 002 2h8a2 2 0 002-2v-4"/>
                                    </svg>
                                </motion.div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Bank Balance Requirement</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        Applicants must provide proof of a <span className="font-medium text-emerald-600 dark:text-emerald-400">minimum bank balance of $25,000</span> to ensure financial stability for tuition and living expenses.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Table */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="mt-16 bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-colors duration-300"
                    >
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-800 transition-colors duration-300">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider border-r border-white/20">English Test</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider border-r border-white/20">Degree</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider border-r border-white/20">Class A</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Class B</th>
                                </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 transition-colors duration-300">
                                {conditions.map((c, index) => (
                                    <motion.tr
                                        key={c.id}
                                        custom={index}
                                        initial="hidden"
                                        animate="visible"
                                        variants={tableRowVariants}
                                        className={`transition-all duration-200 hover:bg-blue-50 dark:hover:bg-gray-750 ${index % 2 === 0 ? "bg-gray-50 dark:bg-gray-800" : "bg-white dark:bg-gray-800"}`}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-blue-100">{c.degree}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{c.classA}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{c.classB}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{c.IELTS}</td>
                                    </motion.tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-750 px-6 py-4 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                Note: Admission requirements are subject to change. Please contact the admissions office for the most current information.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}