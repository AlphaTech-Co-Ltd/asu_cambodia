"use client";
import NavBar from "@/compenents/Home/nav/Navbar";
import MobileNav from "@/compenents/Home/nav/MobileNav";
import {useState} from "react";

export default function ResponsiveNav(){
    const [showNav, setShowNav] = useState(false);
    const openNavHandler = () =>setShowNav(true);
    const closeNavHandler = () =>setShowNav(false);


    return (
        <div>
            <NavBar openNav={openNavHandler}/>
            <MobileNav showNavs={showNav} closeNav={closeNavHandler}/>
        </div>
    )
}