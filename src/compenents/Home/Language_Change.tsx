'use client';

import { useState } from 'react';
import Image from 'next/image';

const languages = [
    { code: 'en', label: 'English', icon: '/Icon/english.png' },
    { code: 'km', label: 'Khmer', icon: '/Icon/cambodia.png' },
];

export default function LanguageDropdown() {
    const [selectedLang, setSelectedLang] = useState('en');
    const [isOpen, setIsOpen] = useState(false);

    const selected = languages.find((lang) => lang.code === selectedLang) ?? languages[0];

    const toggleDropdown = () => setIsOpen(!isOpen);
    const selectLanguage = (code: string) => {
        setSelectedLang(code);
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    type="button"
                    onClick={toggleDropdown}
                    className="inline-flex items-center justify-center w-30 px-4 py-2 bg-white text-sm font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                >
                    {selected.icon && (
                        <Image
                            src={selected.icon}
                            alt={selected.label}
                            width={20}
                            height={20}
                            className="mr-2"
                        />
                    )}
                    {selected.label}
                </button>
            </div>

            {isOpen && (
                <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <ul className="py-1 text-sm text-gray-700">
                        {languages.map((lang) => (
                            <li
                                key={lang.code}
                                onClick={() => selectLanguage(lang.code)}
                                className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                            >
                                {lang.icon && (
                                    <Image src={lang.icon} alt={lang.label} width={20} height={20}
                                        className="mr-2"
                                    />
                                )}
                                {lang.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
