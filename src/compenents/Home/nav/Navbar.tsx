"use client";

import Image from "next/image";
import { NavLinks } from "@/constant_components/constants"; // adjust path
import Link from "next/link";
import { HiBars3 } from "react-icons/hi2";
import { useEffect, useState } from "react";
import LanguageChange from "@/compenents/Home/Language_Change";
import ThemeToggle from "@/constant_components/Helper/ThemeToggle";

type Props = {
    openNav: () => void;
};

export default function NavBar({ openNav }: Props) {
    const [navBg, setNavBg] = useState(false);

    useEffect(() => {
        const handler = () => {
            if (window.scrollY >= 90) setNavBg(true);
            else setNavBg(false);
        };
        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    return (
        <div
            className={`transition-all ${
                navBg ? "bg-blue-950 shadow-md" : "fixed"
            } duration-200 h-[12vh] z-[100] fixed w-full bg-blue-800`}
        >
            <div className={"flex items-center h-full justify-between w-[90%] xl:w-[80%] mx-auto"}>
                {/* Logo */}
                <div className={"flex items-center space-x-2"}>
                    <div className={"w-10 h-10 bg-white rounded-full flex items-center justify-center flex-col"}>
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
                    <h1 className={"text-xl font-bold text-white hidden sm:block md:text-2xl"}>ASU Cambodia</h1>
                </div>

                {/* Desktop Nav Links */}
                <div className="hidden lg:flex items-center space-x-6">
                    {NavLinks.map((link) => (
                        <Link
                            key={link.id}
                            href={link.url}
                            className="group relative text-white text-base font-medium transition-colors duration-300"
                        >
              <span className="flex items-center space-x-1 hover:text-yellow-500 duration-300">
                {link.icon}
                  <span className={"hover:text-yellow-500 duration-300"}>{link.label}</span>
              </span>
                            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-700 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    ))}
                </div>

                {/* Login Button */}
                <div className="hidden sm:flex items-center space-x-4">
                    <Link
                        href="/LoginAndRegister"
                        className="relative inline-flex w-30 h-9 items-center justify-center px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3
               overflow-hidden font-semibold text-white
               bg-yellow-500 rounded-lg shadow-md group
               transition-all duration-300 ease-in-out
               text-sm sm:text-base md:text-lg hover:bg-yellow-700"
                    >
                        <span className="absolute inset-0 bg-white rounded-lg transform scale-0 group-hover:scale-150 transition-transform duration-500 ease-in-out"></span>
                        <span className="relative z-10 group-hover:text-yellow-500 transition-colors duration-300 text-sm ease-in-out">
              Login
            </span>
                    </Link>
                </div>

                {/* Theme toggle, language, and hamburger */}
                <div className="flex items-center space-x-4">
                    <ThemeToggle />
                    <LanguageChange />
                    <HiBars3
                        onClick={openNav}
                        className="w-8 h-8 text-white cursor-pointer lg:hidden transition-transform duration-200 hover:scale-110"
                    />
                </div>
            </div>
        </div>
    );
}
