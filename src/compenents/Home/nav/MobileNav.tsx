"use client";
import { NavLinks } from "@/constant_components/constants";
import Link from "next/link";
import { CgClose } from "react-icons/cg";
import LanguageChange from "@/compenents/Home/Language_Change";
import Image from "next/image";

type Props = {
    showNavs: boolean;
    closeNav: () => void;
};

export default function MobileNav({ showNavs, closeNav }: Props) {
    const navOpen = showNavs ? "translate-x-0" : "translate-x-[-100%]";
    return (
        <div>
            {/* Overlay */}
            <div
                className={`fixed ${navOpen} inset-0 transform transition-all duration-300 z-[1002] bg-black opacity-70 w-full h-screen`}
                onClick={closeNav}
            ></div>

            {/* Sidebar */}
            <div
                className={`text-white ${navOpen} fixed top-0 left-0 h-full w-[80%] sm:w-[60%] bg-blue-900 z-[1050] flex flex-col space-y-8 transform transition-all duration-500 ease-in-out px-6 sm:px-12 py-8`}
            >
                {/* Close Button */}
                <CgClose
                    onClick={closeNav}
                    className="absolute top-6 right-6 sm:w-8 sm:h-8 w-6 h-6 cursor-pointer"
                />

                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                        <Link href="/">
                            <Image
                                src="/Logo/Logo.png"
                                alt="Logo"
                                priority
                                width={40}
                                height={40}
                                className="rounded-full object-cover"
                            />
                        </Link>
                    </div>
                    <h1 className="text-xl font-bold text-white md:text-2xl">ASU Cambodia</h1>
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col space-y-6 flex-grow">
                    {NavLinks.map((link) => (
                        <Link
                            key={link.id}
                            href={link.url}
                            className="group flex items-center space-x-3 w-fit text-xl sm:text-2xl font-semibold text-white hover:text-yellow-400 transition-colors duration-300"
                            onClick={closeNav}
                        >
                            <span className="text-xl sm:text-2xl">{link.icon}</span>
                            <span className="border-b-2 border-transparent group-hover:border-yellow-400 transition-all duration-300">
                                {link.label}
                            </span>
                        </Link>
                    ))}
                </nav>

                {/* Separator line */}
                <hr className="border-yellow-400 opacity-50" />

                {/* Bottom actions: Login + LanguageChange */}
                <div className="flex flex-col space-y-4">
                    <Link href="#" className="w-full text-center bg-yellow-500 hover:bg-yellow-700 transition-colors duration-300 rounded-lg py-3 font-semibold text-white text-lg" onClick={closeNav}>
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
