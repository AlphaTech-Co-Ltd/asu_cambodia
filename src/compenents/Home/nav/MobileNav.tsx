"use client";

import { useEffect } from "react";
import { NavLinks } from "@/constant_components/constants"; // adjust path
import Link from "next/link";
import { CgClose } from "react-icons/cg";
import LanguageChange from "@/compenents/Home/Language_Change";
import Image from "next/image";

type Props = {
    showNavs: boolean;
    closeNav: () => void;
};

export default function MobileNav({ showNavs, closeNav }: Props) {
    // Tailwind translate-x with safe fallback inline styles to avoid purging issues
    const transformStyle = showNavs ? "translateX(0)" : "translateX(-100%)";
    const overlayOpacity = showNavs ? "opacity-70" : "opacity-0";
    const pointerEvents = showNavs ? "pointer-events-auto" : "pointer-events-none";

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth >= 640) {
                closeNav();
            }
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [closeNav]);

    return (
        <>
            {/* Overlay */}
            <div
                aria-hidden={!showNavs}
                className={`fixed inset-0 z-[1002] bg-black transition-opacity duration-300 ${overlayOpacity} ${pointerEvents}`}
                onClick={closeNav}
            />

            {/* Sidebar */}
            <aside
                role="dialog"
                aria-modal="true"
                aria-label="Mobile Navigation"
                className={`fixed top-0 left-0 z-[1050] flex h-full w-[80%] sm:w-[60%] flex-col space-y-8 bg-blue-900 px-6 py-8 text-white transition-transform duration-500 ease-in-out`}
                style={{ transform: transformStyle }}
            >
                {/* Close Button */}
                <CgClose
                    onClick={closeNav}
                    tabIndex={0}
                    role="button"
                    aria-label="Close menu"
                    className="absolute top-6 right-6 w-6 h-6 sm:w-8 sm:h-8 cursor-pointer hover:text-yellow-400 transition-colors"
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            closeNav();
                        }
                    }}
                />

                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <Link href="/" onClick={closeNav} className="flex items-center space-x-2">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                            <Image
                                src="/Logo/Logo.png"
                                alt="ASU Cambodia Logo"
                                width={40}
                                height={40}
                                className="rounded-full object-cover"
                                priority
                            />
                        </div>
                        <h1 className="text-xl font-bold md:text-2xl">ASU Cambodia</h1>
                    </Link>
                </div>

                <hr className="border-yellow-400 opacity-50" />

                {/* Nav Links */}
                <nav className="flex flex-col flex-grow space-y-6 overflow-auto">
                    <LanguageChange />
                    {NavLinks.map((link) => (
                        <Link
                            key={link.id}
                            href={link.url}
                            onClick={closeNav}
                            className="group flex w-fit items-center space-x-3 text-xl font-semibold text-white transition-colors duration-300 hover:text-yellow-400 sm:text-2xl"
                        >
                            <span className="text-xl sm:text-2xl">{link.icon}</span>
                            <span className="border-b-2 border-transparent transition-all duration-300 group-hover:border-yellow-400">
                {link.label}
              </span>
                        </Link>
                    ))}
                </nav>

                <hr className="border-yellow-400 opacity-50" />

                {/* Login Button */}
                <div className="flex flex-col space-y-4">
                    <Link
                        href="/LoginAndRegister"
                        onClick={closeNav}
                        className="w-full rounded-lg bg-yellow-500 py-3 text-center text-lg font-semibold text-white transition-colors duration-300 hover:bg-yellow-700"
                    >
                        Login
                    </Link>
                </div>
            </aside>
        </>
    );
}
