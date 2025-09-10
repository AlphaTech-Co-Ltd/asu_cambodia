"use client";

import Image from "next/image";

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
            {/* Logo or Icon */}
            <div className="relative w-20 h-20 mb-6">
                <Image
                    src="/Logo/Logo.jpg" // 👈 replace with your logo file inside public/
                    alt="ASU Cambodia"
                    className="object-contain animate-pulse"
                    width={400}
                    height={400}
                />
            </div>

            {/* Text with subtle animation */}
            <h1 className="text-2xl font-semibold text-gray-800 tracking-wide">
                Ambitious Students Ubiquitous
            </h1>
            <p className="text-sm text-gray-500 mt-1">Loading, please wait...</p>

            {/* Spinner */}
            <div className="mt-8">
                <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        </div>
    );
}
