"use client";
import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import Image from "next/image";

export default function AboutUs_HeaderPage() {
    const leftRef = useRef(null);
    const rightRef = useRef(null);
    const isLeftInView = useInView(leftRef, { once: false });
    const isRightInView = useInView(rightRef, { once: false });

    const leftControl = useAnimation();
    const rightControl = useAnimation();

    useEffect(() => {
        if (isLeftInView) {
            leftControl.start({
                x: 0,
                opacity: 1,
                transition: { duration: 1, ease: "easeOut" },
            });
        } else {
            leftControl.start({ x: -100, opacity: 0 });
        }

        if (isRightInView) {
            rightControl.start({
                x: 0,
                opacity: 1,
                transition: { duration: 1, ease: "easeOut" },
            });
        } else {
            rightControl.start({ x: 100, opacity: 0 });
        }
    }, [isLeftInView, isRightInView, leftControl, rightControl]);

    return (
        <div className={"pt-16 pb-16"}>
            <div className={"w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"}>
                {/* LEFT: Image */}
                <motion.div ref={leftRef} initial={{ x: -100, opacity: 0 }} animate={leftControl}>
                    <Image src={"/image/About_Us_Header.png"} alt={"About_Us_Header"} priority width={700} height={700} />
                </motion.div>

                {/* RIGHT: Text */}
                <motion.div ref={rightRef} initial={{ x: 100, opacity: 0 }} animate={rightControl}>
                    <p className={"text-sm sm:text-base md:text-xl font-bold text-blue-950 dark:text-white uppercase"}>
                        About Us
                    </p>
                    <h1 className={"text-2xl md:text-3xl lg:text-5xl mt-5 font-bold leading-[1.8rem] md:leading-[3rem]"}>
                        Ambitious Students Ubiquitous
                    </h1>
                    <p className={"mt-3 text-gray-400 dark:text-white"}>
                        Ambitious Students Ubiquitous is the exclusive representative of Angelo State University in Cambodia
                    </p>

                    <div className={"mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center"}>
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className={"flex items-center gap-4"}>
                                <Image src={"/Icon/visa.png"} alt={"Visa Icon"} priority width={50} height={50} />
                                <h1 className={"text-lg sm:text-xl font-bold leading-5"}>VISA card Process</h1>
                            </div>
                        ))}
                    </div>

                    <div className={"mt-12"}>
                        <a
                            href={"#"}
                            className={
                                "w-full py-4 text-base text-center text-white transition-all font-semibold duration-300 bg-blue-950 rounded-full uppercase hover:bg-blue-800 ease px-9 md:w-auto"
                            }
                        >
                            About More ASU
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
