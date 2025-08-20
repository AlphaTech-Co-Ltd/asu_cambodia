"use client";

import { useEffect, useState, useRef } from "react";
import { NavLinks } from "@/constant_components/constants";
import Link from "next/link";
import { CgClose } from "react-icons/cg";
import LanguageChange from "@/compenents/Home/Language_Change";
import Image from "next/image";
import { useAuth } from "@/constant_components/context/AuthContext";
import {useRouter} from "next/navigation";

type Props = {
    showNavs: boolean;
    closeNav: () => void;
};

export default function MobileNav({ showNavs, closeNav }: Props) {
    const { user, logout } = useAuth();
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);

    const avatar = user?.avatar
        ? user.avatar.startsWith("http")
            ? user.avatar
            : `http://localhost:8081/api/republic/files/${user.avatar.replace(/^\/+/, "")}`
        : null;

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 640) closeNav();
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [closeNav]);

    useEffect(() => {
        if (showNavs) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [showNavs]);

    const router = useRouter();

    const handleLogout = () => {
        logout();
        setShowLogoutConfirm(false);
        closeNav();
        router.push('/'); // Navigate to home page
    };

    return (
        <>
            {/* Overlay with smooth transition */}
            <div
                className={`fixed inset-0 z-[1002] bg-black transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    showNavs ? "opacity-70 pointer-events-auto" : "opacity-0 pointer-events-none delay-300"
                }`}
                onClick={closeNav}
            />

            {/* Sidebar with refined styling */}
            <aside
                ref={navRef}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile Navigation"
                className={`fixed top-0 left-0 z-[1050] flex h-full w-4/5 max-w-xs flex-col bg-blue-900 text-white shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    showNavs ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                {/* Close Button with better positioning */}
                <button
                    onClick={closeNav}
                    aria-label="Close menu"
                    className="absolute top-5 right-5 p-2 rounded-full hover:bg-blue-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                    <CgClose className="w-6 h-6 text-white hover:text-yellow-400 transition-colors" />
                </button>

                {/* User Profile Section with better spacing */}
                <div className="flex flex-col items-center pt-16 pb-6 px-6 border-b border-blue-800">
                    {user ? (
                        <>
                            <div className="relative">
                                {avatar ? (
                                    <div className="relative w-10 h-10 rounded-full border-2 border-white group-hover:border-yellow-400 transition-colors duration-200 overflow-hidden">
                                        <Image
                                            src={avatar}
                                            alt={`${user.firstName} ${user.lastName} avatar`}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                            sizes="40px"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-16 h-16 bg-yellow-400 text-blue-900 font-bold rounded-full flex items-center justify-center uppercase text-2xl border-4 border-white shadow-md">
                                        {user.username.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <p className="text-white font-bold mt-3 text-lg">{user.username}</p>
                            {user.email && (
                                <p className="text-blue-200 text-sm mt-1 truncate max-w-full">
                                    {user.email}
                                </p>
                            )}
                        </>
                    ) : (
                        <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center border-2 border-dashed border-blue-300">
                            <span className="text-2xl">👤</span>
                        </div>
                    )}
                </div>

                {/* Navigation Links with better visual hierarchy */}
                <nav className="flex-1 overflow-y-auto py-6 px-6">
                    <div className="mb-8">
                        <LanguageChange />
                    </div>

                    <ul className="space-y-4">
                        {NavLinks.map((link) => (
                            <li key={link.id}>
                                <Link
                                    href={link.url}
                                    onClick={closeNav}
                                    className="flex items-center space-x-4 p-3 rounded-lg text-lg font-medium hover:bg-blue-800 hover:text-yellow-400 transition-all duration-200"
                                >
                                    <span className="text-xl flex-shrink-0">{link.icon}</span>
                                    <span>{link.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Action Buttons with better spacing and shadows */}
                <div className="p-6 border-t border-blue-800 bg-blue-950/30">
                    {user ? (
                        <div className="space-y-3">
                            <Link
                                href="/Profile"
                                onClick={closeNav}
                                className="flex items-center justify-center space-x-3 w-full rounded-xl bg-yellow-500 py-3.5 px-4 font-bold text-white text-lg hover:bg-yellow-600 transition-colors duration-200 shadow-md hover:shadow-lg hover:translate-y-[-1px] active:translate-y-0"
                            >
                                {avatar && (
                                    <Image
                                        src={avatar}
                                        alt="Avatar"
                                        width={24}
                                        height={24}
                                        className="rounded-full border border-white"
                                        unoptimized
                                    />
                                )}
                                <span>My Profile</span>
                            </Link>
                            <button
                                onClick={() => setShowLogoutConfirm(true)}
                                className="w-full rounded-xl bg-red-600/90 py-3.5 px-4 text-lg font-bold text-white hover:bg-red-700 transition-colors duration-200 shadow-md hover:shadow-lg hover:translate-y-[-1px] active:translate-y-0"
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/LoginAndRegister"
                            onClick={closeNav}
                            className="block w-full rounded-xl bg-yellow-500 py-3.5 px-4 text-center text-lg font-bold text-white hover:bg-yellow-600 transition-colors duration-200 shadow-md hover:shadow-lg hover:translate-y-[-1px] active:translate-y-0"
                        >
                            Login / Register
                        </Link>
                    )}
                </div>

                {/* Enhanced Logout Confirmation Modal */}
                {showLogoutConfirm && (
                    <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
                        <div className="bg-white rounded-2xl overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full mx-4 animate-scaleIn">
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Confirm Sign Out</h3>
                                <p className="text-gray-600 mb-6">Are you sure you want to sign out of your account?</p>

                                <div className="flex justify-end space-x-3">
                                    <button
                                        onClick={() => setShowLogoutConfirm(false)}
                                        className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="px-5 py-2.5 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-md"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </aside>

            {/* Add some global styles for animations */}
            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleIn {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out forwards;
                }
                .animate-scaleIn {
                    animation: scaleIn 0.2s ease-out forwards;
                }
            `}</style>
        </>
    );
}