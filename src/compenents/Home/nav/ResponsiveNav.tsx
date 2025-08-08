"use client";

import { useState } from "react";
import NavBar from "@/compenents/Home/nav/Navbar";
import MobileNav from "@/compenents/Home/nav/MobileNav";

export default function ResponsiveNav() {
    const [showNav, setShowNav] = useState(false);

    const openNavHandler = () => setShowNav(true);
    const closeNavHandler = () => setShowNav(false);

    //console.log("ResponsiveNav showNav:", showNav);

    return (
        <div>
            <NavBar openNav={openNavHandler} />
            <MobileNav showNavs={showNav} closeNav={closeNavHandler} />
        </div>
    );
}
