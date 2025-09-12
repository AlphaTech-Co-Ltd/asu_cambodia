"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Loading() {
    const [isDark, setIsDark] = useState(false);

    // Check for dark mode preference
    useEffect(() => {
        // Check if dark mode is enabled at the system level
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDark(mediaQuery.matches);

        // Listen for changes
        const handleChange = () => setIsDark(mediaQuery.matches);
        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return (
        <div className={`flex flex-col items-center justify-center min-h-screen w-full transition-colors duration-300 ${
            isDark
                ? "bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900"
                : "bg-gradient-to-br from-blue-50 via-white to-indigo-50"
        }`}>
            <div className="relative w-32 h-32 mb-8">
                <div className={`absolute inset-0 rounded-3xl transform rotate-6 animate-pulse-slow ${
                    isDark ? "bg-indigo-900" : "bg-blue-100"
                }`}></div>
                <div className={`absolute inset-0 shadow-lg rounded-3xl flex items-center justify-center p-4 ${
                    isDark ? "bg-gray-800" : "bg-white"
                }`}>
                    <Image
                        src="/Logo/Logo.jpg"
                        alt="ASU Cambodia"
                        className="object-contain"
                        width={300}
                        height={300}
                    />
                </div>
            </div>

            <h1 className={`text-3xl font-bold tracking-wide mb-2 bg-clip-text text-transparent ${
                isDark
                    ? "bg-gradient-to-r from-blue-400 to-indigo-400"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600"
            }`}>
                Ambitious Students Ubiquitous
            </h1>

            <p className={`text-md mb-8 font-medium ${
                isDark ? "text-gray-300" : "text-gray-600"
            }`}>
                Loading your experience...
            </p>

            <div className={`relative w-64 h-2 rounded-full overflow-hidden ${
                isDark ? "bg-gray-700" : "bg-gray-200"
            }`}>
                <div className="absolute top-0 left-0 h-full rounded-full w-1/2 animate-loading-bar bg-gradient-to-r from-blue-500 to-indigo-600"></div>
            </div>

            <div className="mt-12 flex space-x-2">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className={`h-3 w-3 rounded-full animate-bounce ${
                            isDark ? "bg-indigo-400" : "bg-indigo-500"
                        }`}
                        style={{ animationDelay: `${i * 0.2}s` }}
                    ></div>
                ))}
            </div>

            <div className={`mt-8 text-xs font-light ${
                isDark ? "text-gray-400" : "text-gray-500"
            }`}>
                ASU Cambodia · Empowering Future Leaders
            </div>
        </div>
    );
}