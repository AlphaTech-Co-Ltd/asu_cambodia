'use client';
import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
    image: string;
    title: string;
    description: string;
}

export default function OurStudent_And_Tour_Card({ image, title, description }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl bg-white dark:bg-gray-900 transition-shadow duration-300"
        >
            <Image
                src={image}
                alt={title}
                width={800}
                height={600}
                className="w-full h-64 object-cover"
                priority
            />
            <div className="p-5">
                <h2 className="text-xl font-bold text-blue-950 dark:text-white mb-2">{title}</h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{description}</p>
            </div>
        </motion.div>
    );
}
