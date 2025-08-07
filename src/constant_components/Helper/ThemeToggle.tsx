"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { BiMoon, BiSun } from "react-icons/bi";

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme, systemTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    return (
        <button onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")} className="p-2 transition duration-300 ease-in-out">
            {currentTheme === "dark" ? (<BiSun className="text-white w-8 h-8 cursor-pointer transition-opacity duration-300 opacity-100" />)
                :
                (<BiMoon className="text-white w-8 h-8 cursor-pointer transition-opacity duration-300 opacity-100" />)}
        </button>

    );
}
