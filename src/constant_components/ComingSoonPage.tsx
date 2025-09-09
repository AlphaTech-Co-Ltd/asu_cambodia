"use client";

import { useRouter } from "next/navigation";

export default function ComingSoonPage() {
    const router = useRouter();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800">
            <div className="flex flex-col items-center justify-center text-center bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-10 max-w-lg">
                {/* Logo or Icon */}
                <div className="mb-6">
                    <svg
                        className="w-16 h-16 text-blue-500 animate-bounce"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M12 20h.01M12 4h.01M16.24 7.76l.01.01M7.76 16.24l.01.01M4 12h.01M20 12h.01"
                        />
                    </svg>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    🚀 Coming Soon
                </h1>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md">
                    We are working hard to bring you this page. Stay tuned for updates and exciting new features!
                </p>

                {/* Button */}
                <button
                    onClick={() => router.back()}
                    className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition transform hover:scale-105"
                >
                    Back
                </button>
            </div>
        </div>
    );
}
