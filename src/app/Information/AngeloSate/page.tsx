"use client";

import { useState } from "react";
import Tabs from "@/app/Information/AngeloSate/Tabs";
import MajorsSection from "@/app/Information/AngeloSate/MajorsSection";
import ScholarshipsSection from "@/app/Information/AngeloSate/ScholarshipsSection";
import Conditions from "@/app/Information/AngeloSate/Conditions";

export default function AngeloStatePage() {
    const [activeTab, setActiveTab] = useState("majors");

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl pt-16 mx-auto">
                {/* Header */}
                <header className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-blue-800 dark:text-white mb-4">Angelo State University</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Explore our programs, tuition, and scholarships for a bright future.
                    </p>
                </header>

                {/* Tabs */}
                <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* Tab content */}
                {activeTab === "majors" && <MajorsSection />}
                {activeTab === "conditions" && <Conditions />}
                {activeTab === "scholarships" && <ScholarshipsSection />}
            </div>
        </div>
    );
}
