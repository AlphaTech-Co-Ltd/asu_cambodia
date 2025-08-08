"use client";

import {useEffect, useState} from "react";
import {FaArrowUp} from "react-icons/fa";

export default function ScrollToTop(){
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const toggleVisbility =()=>{
            if (window.scrollY > 300) setIsVisible(true);
            else setIsVisible(false);
        };
        window.addEventListener("scroll", toggleVisbility);
        return () => window.removeEventListener("scroll", toggleVisbility);
    }, []);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }
    return(
        <div className={"fixed bottom-4 animate-pulse right-4"}>
            {isVisible && (
                <button className={"bg-yellow-400 cursor-pointer text-white rounded-full w-12 h-12 flex items-center justify-center focus:outline-none"} onClick={scrollToTop}>
                    <FaArrowUp />
                </button>
            )}
        </div>
    )
}