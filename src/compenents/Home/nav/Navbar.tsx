"use client";

import Image from "next/image";
import Link from "next/link";
import { HiBars3 } from "react-icons/hi2";
import { useEffect, useState, useRef } from "react";
import LanguageChange from "@/compenents/Home/Language_Change";
import ThemeToggle from "@/constant_components/Helper/ThemeToggle";
import { NavLinks } from "@/constant_components/constants";
import { useAuth } from "@/constant_components/context/AuthContext";
import {useRouter} from "next/navigation";

type Props = {
    openNav: () => void;
};

export default function NavBar({ openNav }: Props) {
    const [navBg, setNavBg] = useState(false);
    const { user, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const router = useRouter();

    const handleLogout = () => {
        logout();
        setDropdownOpen(false);
        setShowLogoutConfirm(false);
        router.push("/"); // Redirect to home page
    };

    // Close dropdown if clicked outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Navbar background on scroll
    useEffect(() => {
        const onScroll = () => setNavBg(window.scrollY >= 30);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Determine user avatar URL
    const avatar = user?.avatar
        ? user.avatar.startsWith("http")
            ? user.avatar
            : `${process.env.NEXT_PUBLIC_API_URL}/api/republic/files/${user.avatar.replace(/^\/+/, "")}`
        : null;

    return (
        <nav
            className={`fixed w-full h-20 z-50 transition-all duration-300 ${
                navBg ? "bg-blue-900/95 backdrop-blur-sm shadow-xl" : "bg-blue-900/80 backdrop-blur-sm"
            }`}
        >
            <div className="container mx-auto flex items-center justify-between h-full px-4 xl:px-0 max-w-7xl">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <Link
                        href="/"
                        aria-label="Home"
                        className="flex items-center space-x-3 hover:opacity-90 transition-opacity group"
                    >
                        <div className="relative w-10 h-10 rounded-full border-2 border-white group-hover:border-yellow-400 transition-colors duration-200 overflow-hidden">
                            <Image
                                src="/Logo/Logo.jpg"
                                alt="Logo"
                                fill
                                className="object-cover"
                                priority
                                sizes="40px"
                            />
                        </div>
                        <h1 className="text-white font-bold text-xl md:text-2xl hidden sm:block tracking-tight">
                            <span className="text-yellow-400">ASU</span> Cambodia
                        </h1>
                    </Link>
                </div>

                {/* Desktop Links */}
                <ul className="hidden lg:flex items-center space-x-1">
                    {NavLinks.map(({ id, url, label, icon }) => (
                        <li key={id}>
                            <Link
                                href={url}
                                className="flex items-center space-x-2 text-white font-medium hover:text-yellow-400 transition-all duration-200 py-2 px-4 rounded-lg hover:bg-white/10 group"
                            >
                                <span className="text-xl group-hover:scale-110 transition-transform">{icon}</span>
                                <span className="text-sm font-semibold">{label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Right controls */}
                <div className="flex items-center space-x-4">
                    {/* Theme & Language toggles */}
                    <div className="hidden sm:flex items-center space-x-3">
                        <ThemeToggle />
                        <LanguageChange />
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={openNav}
                        className="p-2 rounded-full lg:hidden hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        aria-label="Open navigation menu"
                    >
                        <HiBars3 className="w-6 h-6 text-white hover:text-yellow-400 transition-colors" />
                    </button>

                    {/* User area */}
                    <div className="relative hidden sm:flex items-center" ref={dropdownRef}>
                        {user ? (
                            <>
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center focus:outline-none group"
                                    aria-haspopup="true"
                                    aria-expanded={dropdownOpen}
                                    aria-label="User menu"
                                >
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
                                        <div className="w-10 h-10 bg-yellow-400 text-blue-900 font-bold rounded-full flex items-center justify-center uppercase text-lg border-2 border-white group-hover:border-yellow-400 transition-colors">
                                            {user.username.charAt(0)}
                                        </div>
                                    )}
                                </button>

                                {/* Dropdown */}
                                {dropdownOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 z-50 overflow-hidden animate-fadeIn">
                                        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                                            <p className="text-gray-900 font-semibold text-sm truncate">{user.firstName} {user.lastName}</p>
                                            {user.email && (
                                                <p className="text-gray-500 text-xs truncate mt-1">{user.email}</p>
                                            )}
                                        </div>
                                        <div className="py-1">
                                            <Link href={"/Profile"} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center" onClick={() => setDropdownOpen(false)}>
                                                <span className="mr-2">👤</span>
                                                Your Profile
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    setDropdownOpen(false);
                                                    setShowLogoutConfirm(true);
                                                }}
                                                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center"
                                            >
                                                <span className="mr-2">🚪</span>
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Logout Confirmation */}
                                {showLogoutConfirm && (
                                    <div className="fixed inset-0 backdrop-blur-sm flex pt-[25%] items-center justify-center z-[60] animate-fadeIn">
                                        <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4 animate-scaleIn">
                                            <div className="text-center">
                                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                                                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                    </svg>
                                                </div>
                                                <h3 className="text-lg font-bold text-gray-900 mb-2">Confirm Sign Out</h3>
                                                <p className="text-gray-600 mb-6">Are you sure you want to sign out of your account?</p>
                                            </div>
                                            <div className="flex justify-end space-x-3">
                                                <button
                                                    onClick={() => setShowLogoutConfirm(false)}
                                                    className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={handleLogout}
                                                    className="px-5 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-1"
                                                >
                                                    Sign Out
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="flex space-x-3 ml-4">
                                <Link
                                    href="/LoginAndRegister"
                                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-yellow-500 text-white font-semibold shadow-md hover:bg-yellow-600 hover:shadow-lg transition-all duration-200 text-sm whitespace-nowrap hover:-translate-y-0.5 active:translate-y-0"
                                >
                                    Sign In
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Animation styles */}
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
                    animation: fadeIn 0.15s ease-out forwards;
                }
                .animate-scaleIn {
                    animation: scaleIn 0.15s ease-out forwards;
                }
            `}</style>
        </nav>
    );
}