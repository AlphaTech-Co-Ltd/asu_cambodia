import React from "react";

interface TabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export default function Tabs({ activeTab, setActiveTab }: TabsProps) {
    return (
        <div className="flex flex-col sm:flex-row justify-center mb-12 gap-4">
            {["majors", "conditions", "scholarships"].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 rounded-xl font-semibold text-lg transition ${
                        activeTab === tab
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-md"
                    }`}
                >
                    {tab === "majors" ? "Majors" : tab === "conditions" ? "Conditions" : "Scholarships"}
                </button>
            ))}
        </div>
    );
}
