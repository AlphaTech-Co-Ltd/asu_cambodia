import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaTelegram, FaYoutube } from "react-icons/fa";

export default function FooterPage() {
  return (
    <div className="pt-16 pb-16 bg-blue-950">
      <div className="w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 items-start">
        {/* Logo & Description */}
        <div>
          <div className="flex items-center space-x-2">
            <Link
              href="/"
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <Image
                src="/Logo/Logo.jpg"
                alt="Logo"
                priority
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            </Link>
            <h1 className="text-xl font-bold text-white md:text-2xl">
              ASU Cambodia
            </h1>
          </div>

          <p className="mt-4 text-gray-200 font-medium">
            Ambitious Students Ubiquitous is the exclusive representative of
            Angelo State University in Cambodia.
          </p>

          {/* Social Icons */}
          <div className="mt-6 flex items-center space-x-3">
            <a
              href="https://www.facebook.com/ambitiousstudentsubiquitous"
              rel="noopener noreferrer"
              target="_blank"
              className="w-8 h-8 flex items-center justify-center bg-white rounded hover:bg-gray-200 transition">
              <FaFacebook className="text-[#1877F2]" /> {/* Facebook Blue */}
            </a>

            <a
              href="https://t.me/globalpromgram_asu"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center bg-white rounded hover:bg-gray-200 transition">
              <FaTelegram className="text-[#0088cc]" /> {/* Telegram Blue */}
            </a>

            <a
              href="https://www.instagram.com/ambitiousstudentsubiquitous"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center bg-white rounded hover:bg-gray-200 transition">
              <FaInstagram className="text-[#E4405F]" />{" "}
              {/* Instagram Pink-Red */}
            </a>

            <a
              href="https://www.youtube.com/@angelostate"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center bg-white rounded hover:bg-gray-200 transition">
              <FaYoutube className="text-red-700" />{" "}
              {/* TikTok default black, or use #010101 */}
            </a>
          </div>
        </div>
        <div className={"space-y-5"}>
          <h1 className={"text-xl font-bold text-white"}>Company</h1>
          <p className={"footer__link"}>About US</p>
          <p className={"footer__link"}>News & Press</p>
          <p className={"footer__link"}>Our Student</p>
          <p className={"footer__link"}>Careers</p>
        </div>
      </div>
      <div
        className={
          "mt-8 w-[80%] mx-auto border-t pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm"
        }>
        <p className={"text-center text-white md:text-left"}>
          Copyright © 2025 AUS Cambodia. All rights reserved
        </p>
        <div className={"flex items-center text-white space-x-4 mt-4 md:mt-0"}>
          <span>Social Media:</span>
          <a
            href="https://www.facebook.com/ambitiousstudentsubiquitous"
            rel="noopener noreferrer"
            target="_blank"
            className="w-8 h-8 flex items-center justify-center bg-white rounded hover:bg-gray-200 transition">
            <FaFacebook className="text-[#1877F2]" /> {/* Facebook Blue */}
          </a>
          <a
            href="https://t.me/globalpromgram_asu"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center bg-white rounded hover:bg-gray-200 transition">
            <FaTelegram className="text-[#0088cc]" /> {/* Telegram Blue */}
          </a>
          <a
            href="https://www.instagram.com/ambitiousstudentsubiquitous"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center bg-white justify-center rounded hover:bg-gray-200 transition">
            <FaInstagram className="text-[#E4405F]" />{" "}
            {/* Instagram Pink-Red */}
          </a>
        </div>
      </div>
    </div>
  );
}
