import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaTelegram, FaYoutube } from "react-icons/fa";

export default function FooterPage() {
    return (
        <footer className="bg-blue-950 text-white pt-16 pb-12">
            <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                {/* Logo & Description */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <Link
                            href="/"
                            className="w-12 h-12 bg-white rounded-full flex items-center justify-center"
                        >
                            <Image
                                src="/Logo/Logo.jpg"
                                alt="Logo"
                                width={40}
                                height={40}
                                className="rounded-full object-cover"
                                priority
                            />
                        </Link>
                        <h1 className="text-2xl font-bold">ASU Cambodia</h1>
                    </div>
                    <p className="text-gray-200 text-sm md:text-base">
                        Ambitious Students Ubiquitous is the exclusive representative of Angelo State University in Cambodia.
                    </p>

                    {/* Social Icons */}
                    <div className="flex items-center space-x-3 mt-4">
                        <a
                            href="https://www.facebook.com/ambitiousstudentsubiquitous"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 flex items-center justify-center bg-white rounded-full hover:bg-gray-200 transition duration-300"
                        >
                            <FaFacebook className="text-[#1877F2]" size={18} />
                        </a>
                        <a
                            href="https://t.me/globalpromgram_asu"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 flex items-center justify-center bg-white rounded-full hover:bg-gray-200 transition duration-300"
                        >
                            <FaTelegram className="text-[#0088cc]" size={18} />
                        </a>
                        <a
                            href="https://www.instagram.com/ambitiousstudentsubiquitous"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 flex items-center justify-center bg-white rounded-full hover:bg-gray-200 transition duration-300"
                        >
                            <FaInstagram className="text-[#E4405F]" size={18} />
                        </a>
                        <a
                            href="https://www.youtube.com/@angelostate"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 flex items-center justify-center bg-white rounded-full hover:bg-gray-200 transition duration-300"
                        >
                            <FaYoutube className="text-red-700" size={18} />
                        </a>
                    </div>
                </div>

                {/* Company Links */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold">Company</h2>
                    <ul className="space-y-2">
                        <li>
                            <a href="/Information" className="text-gray-200 hover:text-white transition duration-200">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-200 hover:text-white transition duration-200">
                                News & Press
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-200 hover:text-white transition duration-200">
                                Our Students
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-200 hover:text-white transition duration-200">
                                Careers
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Programs Links */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold">Programs</h2>
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="text-gray-200 hover:text-white transition duration-200">
                                Undergraduate
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-200 hover:text-white transition duration-200">
                                Graduate
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-200 hover:text-white transition duration-200">
                                Scholarships
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-200 hover:text-white transition duration-200">
                                Online Learning
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Contact Links */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold">Contact</h2>
                    <ul className="space-y-2">
                        <li>
                            <a href="/ContactUs" className="text-gray-200 hover:text-white transition duration-200">
                                Contact Us
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-200 hover:text-white transition duration-200">
                                Support
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-200 hover:text-white transition duration-200">
                                FAQs
                            </a>
                        </li>
                        <li>
                            <a href="/ContactUs" className="text-gray-200 hover:text-white transition duration-200">
                                Visit Campus
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Copyright & Bottom */}
            <div className="mt-12 w-[90%] mx-auto border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
                <p className="text-center md:text-left text-gray-300 text-sm">
                    © 2025 ASU Cambodia. All rights reserved.
                </p>
                <div className="flex items-center space-x-3 mt-4 md:mt-0">
                    <span className="text-gray-300 text-sm">Follow us:</span>
                    <a
                        href="https://www.facebook.com/ambitiousstudentsubiquitous"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 flex items-center justify-center bg-white rounded-full hover:bg-gray-200 transition duration-300"
                    >
                        <FaFacebook className="text-[#1877F2]" size={16} />
                    </a>
                    <a
                        href="https://t.me/globalpromgram_asu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 flex items-center justify-center bg-white rounded-full hover:bg-gray-200 transition duration-300"
                    >
                        <FaTelegram className="text-[#0088cc]" size={16} />
                    </a>
                    <a
                        href="https://www.instagram.com/ambitiousstudentsubiquitous"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 flex items-center justify-center bg-white rounded-full hover:bg-gray-200 transition duration-300"
                    >
                        <FaInstagram className="text-[#E4405F]" size={16} />
                    </a>
                    <a
                        href="https://www.youtube.com/@angelostate"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 flex items-center justify-center bg-white rounded-full hover:bg-gray-200 transition duration-300"
                    >
                        <FaYoutube className="text-red-700" size={16} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
