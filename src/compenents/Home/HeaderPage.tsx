'use client';
import { useEffect, useState } from "react";
import Image from "next/image";

const images = [
    "/image/Banner1.jpg",
    "/image/Banner2.jpg",
    "/image/Banner3.jpg"
];


export default function HeaderPage() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            // Go to next image or loop to first
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000); // Change every 4 seconds

        return () => clearInterval(interval);
    }, []);
    return (
        <div className="relative bg-blue-950 w-full h-screen flex items-center">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/image/Banner3.jpg"
                    alt="Background"
                    fill
                    priority
                    className="object-cover w-full h-full blur-sm opacity-30"
                />
            </div>
            <div className="w-[90%] md:w-[80%] mx-auto grid grid-cols-1 xl:grid-cols-2 gap-10 items-center">
                {/* Text Section */}
                <div>
                    <p className="text-sm sm:text-base md:text-lg font-semibold text-yellow-300 uppercase tracking-wider">
                        Empowering Global Learners
                    </p>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-4 mb-6 font-extrabold text-white leading-snug">
                        Expert Guidance for <span className="text-yellow-400">Visas</span> & International <span className="text-yellow-400">Study</span> Opportunities
                    </h1>
                    <p className="text-sm sm:text-base md:text-base lg:text-lg text-gray-300 mb-8">
                        At Ambitious Students Ubiquitous, we are committed to helping students achieve their dreams of studying and thriving abroad through trusted visa support and tailored advice.
                    </p>
                    <a href="https://www.angelo.edu/" target="_blank" rel="noopener noreferrer" className="relative inline-flex items-center justify-center px-6 py-3 text-white text-sm sm:text-base md:text-lg font-semibold rounded-lg overflow-hidden group bg-yellow-500 shadow-md transition-all duration-300 hover:bg-yellow-600">
                        <span className="absolute inset-0 w-full h-full bg-white scale-0 group-hover:scale-125 transition-transform duration-500 ease-in-out rounded-lg"></span>
                        <span className="relative z-10 group-hover:text-yellow-600 transition-colors duration-300">
                            Learn More
                        </span>
                    </a>
                </div>
                <div className="mx-auto hidden xl:block w-[700px] h-[500px] relative overflow-hidden rounded-lg shadow-lg">
                    {images.map((img, index) => (
                        <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
                            <Image src={img} alt={`Slideshow image ${index + 1}`} width={900} height={500} className="w-full h-full object-cover" priority={index === 0}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
