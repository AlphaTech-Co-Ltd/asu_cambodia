"use client";
import {NavLinks} from "@/constant_components/constants";
import Link from "next/link";
import {CgClose} from "react-icons/cg";

type Props = {
    showNavs: boolean;
    closeNav: ()=> void;
}

export default function MobileNav({showNavs, closeNav}: Props) {
    const navOpen = showNavs ? "translate-x-0" : "translate-x-[-100%]";
    return (
        <div>
            <div className={`fixed ${navOpen} inset-0 transform transition-all duration-300 z-[1002] bg-black opacity-70 w-full h-screen`}>
            </div>
            <div className={`text-white ${navOpen} fixed top-0 left-0 h-full w-[80%] sm:w-[60%] bg-blue-900 z-[1050] flex flex-col justify-center space-y-6 transform transition-all duration-500 ease-in-out px-6 sm:px-12`}>
                {NavLinks.map((link) => (
                    <Link key={link.id} href={link.url} className="group flex items-center space-x-3 w-fit text-xl sm:text-2xl font-semibold text-white hover:text-yellow-400 transition-colors duration-300">
                        <span className="text-xl sm:text-2xl">{link.icon}</span>
                        <span className="border-b-2 border-transparent group-hover:border-yellow-400 transition-all duration-300">{link.label}</span>
                    </Link>
                ))}
                <CgClose onClick={closeNav} className={"absolute top-[0.7rem] right-[1.4rem] sm:w-8 sm:h-8 w-6 h-6"}/>
            </div>

        </div>
    )
};