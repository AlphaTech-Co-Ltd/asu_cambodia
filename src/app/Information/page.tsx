"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function InformationPage() {
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);
    const [showHeader, setShowHeader] = useState(false);

    useEffect(() => {
        setTimeout(() => setShowHeader(true), 100);
        setTimeout(() => setShowLeft(true), 400);
        setTimeout(() => setShowRight(true), 700);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
            <div className="max-w-6xl mx-auto px-6 pt-16">
                {/* Header Section */}
                <div className={`text-center mb-16 transition-all duration-1000 ${showHeader ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Ambitious Students Ubiquitous
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                        Your trusted partner for international education in Cambodia. We are the exclusive representative
                        of Angelo State University and Concord English College, offering world-class academic programs
                        designed to prepare students for global success.
                    </p>
                    <div className="w-20 h-0.5 bg-blue-600 mx-auto"></div>
                </div>

                {/* Program Overview */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">
                        Available Academic Programs
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center p-4">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">2+2</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Beltei International University</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Complete 2 years locally, transfer for final 2 years</p>
                        </div>
                        <div className="text-center p-4">
                            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-green-600 dark:text-green-400">1+3</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">RUPP Partnership</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">1 year foundation, 3 years international study</p>
                        </div>
                        <div className="text-center p-4">
                            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">2+2</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">RUPP Partnership</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">2 years foundation, 2 years international study</p>
                        </div>
                    </div>
                </div>

                {/* University Cards */}
                <div className="grid lg:grid-cols-2 gap-8 mb-16">
                    {/* Angelo State University Card */}
                    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-700 hover:shadow-xl ${showLeft ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
                        <div className="p-8">
                            {/* Logo Section */}
                            <div className="flex items-center justify-center mb-6">
                                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center shadow-sm">
                                    <Image
                                        src="/Logo/24734_ichoseangelostate_c_rev_1461778809_PhotoRoom_png_PhotoRoom.png"
                                        alt="Angelo State University Logo"
                                        width={80}
                                        height={80}
                                        className="object-contain"
                                    />
                                </div>
                            </div>

                            {/* University Info */}
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-4">
                                Angelo State University
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 text-center mb-6 leading-relaxed">
                                A prestigious public university in Texas, USA.<br/> Popular majors include:
                            </p>

                            {/* Popular Majors */}
                            <div className="space-y-2 mb-6 text-gray-700 dark:text-gray-300 text-sm">
                                <div className="flex items-start">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 mr-3 flex-shrink-0"></div>
                                    <span>Business Administration</span>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 mr-3 flex-shrink-0"></div>
                                    <span>Computer Science</span>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 mr-3 flex-shrink-0"></div>
                                    <span>Nursing</span>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 mr-3 flex-shrink-0"></div>
                                    <span>Criminal Justice</span>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200">
                                <a href="/Information/AngeloSate">
                                    Explore Angelo State University
                                </a>
                            </button>
                        </div>
                    </div>

                    {/* Concord English College Card */}
                    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-700 hover:shadow-xl ${showRight ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
                        <div className="p-8">
                            {/* Logo Section */}
                            <div className="flex items-center justify-center mb-6">
                                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center shadow-sm">
                                    <Image
                                        src="/Logo/cropped-cropped-CEC-Logo-blue-purple-orange-01.png"
                                        alt="Concord English College Logo"
                                        width={80}
                                        height={80}
                                        className="object-contain"
                                    />
                                </div>
                            </div>

                            {/* College Info */}
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-4">
                                Concord English College
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 text-center mb-6 leading-relaxed">
                                Leading English language institution in Cambodia. Popular programs include:
                            </p>

                            {/* Popular Programs */}
                            <div className="space-y-2 mb-6 text-gray-700 dark:text-gray-300 text-sm">
                                <div className="flex items-start">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-1 mr-3 flex-shrink-0"></div>
                                    <span>IELTS Preparation</span>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-1 mr-3 flex-shrink-0"></div>
                                    <span>TOEFL Preparation</span>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-1 mr-3 flex-shrink-0"></div>
                                    <span>Academic Writing & Research Skills</span>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-1 mr-3 flex-shrink-0"></div>
                                    <span>University Pathway Programs</span>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <button className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-200">
                                <a href="/Information/Concord">Explore Concord English College</a>
                            </button>
                        </div>
                    </div>
                </div>


                {/* Call to Action */}
                <div className="text-center">
                    <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white">
                        <h3 className="text-2xl font-bold mb-4">
                            Ready to Begin Your International Education Journey?
                        </h3>
                        <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                            Join thousands of successful students who have achieved their academic goals through our partnership programs.
                            Take the first step towards your international future today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                                <a href="https://t.me/Ambitious_Students_ubiquitous">Consultation</a>
                            </button>
                            <button
                                className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
                                onClick={() => {
                                    const files = ["/brochur/1.pdf"]; // Add all files you want
                                    files.forEach((file) => {
                                        const link = document.createElement("a");
                                        link.href = file;
                                        link.download = file.split("/").pop()!; // Extract file name
                                        link.target = "_blank"; // Helps in some browsers
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    });
                                }}
                            >
                                Download Brochures
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}