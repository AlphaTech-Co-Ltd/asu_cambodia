"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center w-[99%] h-screen bg-white dark:bg-black text-center px-4">
            {/* Message */}
            <h1 className="mt-15 text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                Oops! Page Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
                The page you&#39;re looking for doesn&#39;t exist or has been moved.
            </p>
            <Image src="/image/404Found.gif" alt="Not Found" width={600} height={600} priority unoptimized/>

            {/* "Go Back" Button */}
            <button onClick={() => router.back()} className="mt-6 px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition duration-300">
                Go Back
            </button>
        </div>
    );
}
