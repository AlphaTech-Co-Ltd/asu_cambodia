"use client";

import { GraduationCap, Plane, Users, MapPin, Phone, MessageCircle, Star, Award, CheckCircle, Globe, Shield, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default function VisaEducationServices() {
    const [activeService, setActiveService] = useState('student-visa');
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [darkMode, setDarkMode] = useState(false);

    const services = [
        {
            id: 'student-visa',
            icon: <GraduationCap className="w-8 h-8" />,
            title: "Student Visa Consultation",
            subtitle: "Your Gateway to US and AU Education",
            shortDescription: "Expert guidance for USA and AU student visa applications and approval process.",
            fullDescription: "Navigate the complex US and AU student visa process with confidence. Our experienced consultants provide comprehensive guidance from application preparation to interview success, ensuring the highest approval rates for your educational journey.",
            features: [
                "Complete F-1 Student Visa Application Assistance",
                "I-20 Form Processing and SEVIS Fee Guidance",
                "DS-160 Form Completion and Review",
                "Embassy Interview Preparation and Mock Sessions",
                "Supporting Document Review and Organization",
                "Visa Status Tracking and Follow-up Support"
            ],
            benefits: [
                "99% Visa Approval Success Rate",
                "Personalized One-on-One Consultation",
                "Post-Visa Arrival Support Services",
                "Emergency Assistance During Process"
            ],
            priceLabel: "Starting from",
            timeline: "2 weeks",
            color: "blue",
            gradient: "from-blue-500 via-blue-600 to-blue-700"
        },
        {
            id: 'tourist-visa',
            icon: <Plane className="w-8 h-8" />,
            title: "Tourist Visa B1/B2",
            subtitle: "Explore America with Confidence",
            shortDescription: "Professional assistance for US tourist and business visa applications.",
            fullDescription: "Make your American dream vacation a reality with our expert B1/B2 visa consultation services. We handle all aspects of your tourist visa application, from documentation to interview preparation, ensuring a smooth and successful process.",
            features: [
                "B1/B2 Tourist Visa Application Processing",
                "Travel Itinerary Planning and Documentation",
                "Financial Documentation Review",
                "Embassy Appointment Scheduling",
                "Interview Coaching and Preparation",
                "Travel Insurance and Support Services"
            ],
            benefits: [
                "Fast-Track Processing Available",
                "Multiple Entry Visa Assistance",
                "Family Group Applications",
                "Travel Planning Support"
            ],
            priceLabel: "Starting from",
            timeline: "1 weeks",
            color: "green",
            gradient: "from-green-500 via-green-600 to-green-700"
        },
        {
            id: 'study-abroad',
            icon: <Globe className="w-8 h-8" />,
            title: "Study Abroad Programs",
            subtitle: "USA & Australia Education",
            shortDescription: "Complete educational pathways to top universities in USA and Australia.",
            fullDescription: "Unlock world-class education opportunities in the USA and Australia. We provide end-to-end support for your international education journey, from university selection to graduation, with special rates comparable to domestic students.",
            features: [
                "University Selection and Application Support",
                "Bachelor's, Master's, PhD Program Guidance",
                "Vocational and Technical School Placements",
                "Scholarship and Financial Aid Assistance",
                "Special Domestic Rate Arrangements",
                "Academic and Career Counseling"
            ],
            programs: [
                "Bachelor's Degree Programs",
                "Master's and Graduate Programs",
                "Doctoral (PhD) Programs",
                "Vocational and Technical Schools",
                "English Language Programs",
                "Professional Certification Courses"
            ],
            priceLabel: "Starting from",
            timeline: "2 months",
            color: "purple",
            gradient: "from-purple-500 via-purple-600 to-purple-700"
        }
    ];

    const stats = [
        { icon: <Users className="w-6 h-6" />, label: "Students Placed", value: "2,000+", text:"Students" },
        { icon: <Award className="w-6 h-6" />, label: "Success Rate", value: "99%", text:"Rate" },
        { icon: <Globe className="w-6 h-6" />, label: "Partner Universities", value: "BIU | RUPP", text: "Partner Universities" },
        { icon: <Shield className="w-6 h-6" />, label: "Years Experience", value: "6+" }
    ];

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    type ColorType = "blue" | "green" | "purple";

    const getColorClasses = (color: ColorType) => {
        const colors = {
            blue: {
                primary: 'text-blue-600 dark:text-blue-400',
                button: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600',
                border: 'border-blue-600 dark:border-blue-500',
                bg: 'bg-blue-50 dark:bg-blue-900/20'
            },
            green: {
                primary: 'text-green-600 dark:text-green-400',
                button: 'bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600',
                border: 'border-green-600 dark:border-green-500',
                bg: 'bg-green-50 dark:bg-green-900/20'
            },
            purple: {
                primary: 'text-purple-600 dark:text-purple-400',
                button: 'bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600',
                border: 'border-purple-600 dark:border-purple-500',
                bg: 'bg-purple-50 dark:bg-purple-900/20'
            }
        };
        return colors[color];
    };

    const activeServiceData = services.find(service => service.id === activeService);

    // Add a fallback to prevent undefined errors
    if (!activeServiceData) {
        return <div>Service not found</div>;
    }

    const colorClasses = getColorClasses(activeServiceData.color as ColorType);

    return (
        <div className={`min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 relative overflow-hidden transition-colors duration-300`}>
            {/* Subtle Background Elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>

            {/* Mouse Follower - More Subtle */}
            <div
                className="absolute w-96 h-96 bg-gradient-radial from-blue-100/10 to-transparent dark:from-blue-400/5 dark:to-transparent rounded-full pointer-events-none transition-all duration-300 ease-out"
                style={{
                    left: mousePosition.x - 192,
                    top: mousePosition.y - 192,
                }}
            ></div>

            {/* Dark Mode Toggle */}
            <div className="fixed top-4 right-4 z-20">
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`p-3 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-yellow-300 shadow-md transition-colors`}
                >
                    {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className={`inline-flex items-center space-x-2 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 rounded-full px-6 py-3 mb-8 border border-gray-200 dark:border-gray-700 shadow-sm transition-colors`}>
                        <Star className="w-5 h-5" />
                        <span className="font-medium">Exclusive Representative in Cambodia</span>
                    </div>

                    <h1 className={`text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900 dark:text-white`}>
                        Visa & Education <span className="text-blue-600 dark:text-blue-400">Consultancy Services</span>
                    </h1>
                    <p className={`text-lg max-w-3xl mx-auto leading-relaxed mb-8 text-gray-600 dark:text-gray-300`}>
                        Your trusted partner for US Student Visas, Tourist Visas, and international education opportunities in USA and Australia.
                    </p>

                    {/* Contact Info */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <a href="https://www.google.com/maps/place/Cake+Experiential+Communications+(Cambodia)+Co.,+Ltd./@11.5851232,104.9001383,98m/data=!3m1!1e3!4m14!1m7!3m6!1s0x310951e32c5ee595:0x4fdf9847d6b209b3!2s345+Office+Space!8m2!3d11.5816066!4d104.9002823!16s%2Fg%2F11vf3ld34v!3m5!1s0x31095184941c5b05:0x553caa6f32f63b2f!8m2!3d11.5852101!4d104.9002143!16s%2Fg%2F11cncpw7cn?entry=ttu&g_ep=EgoyMDI5MDkwMy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className={`flex items-center space-x-2 rounded-lg px-4 py-2 border shadow-sm hover:shadow-md transition bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700`}>
                            <MapPin className="w-4 h-4 text-blue-500" />
                            <span className="text-sm">The Base Building (Near Tuol Kok Antenna)</span>
                        </a>

                        <a href="tel:023902300" className={`flex items-center space-x-2 rounded-lg px-4 py-2 border shadow-sm hover:shadow-md transition bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700`}>
                            <Phone className="w-4 h-4 text-green-500" />
                            <span className="text-sm">023 902 300 | 096 976 7031</span>
                        </a>

                        <div className={`flex items-center space-x-2 rounded-lg px-4 py-2 border shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300`}>
                            <MessageCircle className="w-4 h-4 text-purple-500" />
                            <span className="text-sm">
                                <a href="https://t.me/Ambitious_Students_ubiquitous">@Ambitious_Students_ubiquitous</a>
                            </span>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className={`rounded-xl p-6 border shadow-sm hover:shadow-md transition-all duration-300 group bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700`}
                                style={{ animationDelay: `${index * 200}ms` }}
                            >
                                {/* Icon + Text */}
                                <div className={`flex items-center gap-2 mb-3 group-hover:text-gray-800 dark:group-hover:text-white transition-colors text-gray-600 dark:text-gray-400`}>
                                    <span className={`w-8 h-8 flex items-center justify-center rounded-full text-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400`}>
                                      {stat.icon}
                                    </span>
                                    <span className="text-sm font-medium">{stat.text}</span>
                                </div>

                                {/* Value */}
                                <div className={`text-2xl font-bold mb-1 text-gray-900 dark:text-white`}>
                                    {stat.value}
                                </div>

                                {/* Label */}
                                <div className={`text-sm text-gray-500 dark:text-gray-500`}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Service Navigation - Professional Tabs */}
                <div className={`flex flex-wrap justify-center gap-1 mb-16 rounded-xl p-2 max-w-3xl mx-auto border shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700`}>
                    {services.map((service) => {
                        const isActive = activeService === service.id;
                        const serviceColor = getColorClasses(service.color as ColorType);

                        return (
                            <button
                                key={service.id}
                                onClick={() => setActiveService(service.id)}
                                className={`relative px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 whitespace-nowrap ${
                                    isActive
                                        ? `${serviceColor.button} text-white shadow-md`
                                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                            >
                                {service.title}
                            </button>
                        );
                    })}
                </div>

                {/* Active Service Details */}
                <div className={`rounded-2xl border overflow-hidden shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700`}>
                    <div key={activeService} className="animate-fade-in">
                        {/* Header */}
                        <div className="relative overflow-hidden">
                            <div className={`absolute inset-0 ${colorClasses.bg} opacity-30`}></div>
                            <div className={`relative p-8 lg:p-10 border-b border-gray-200 dark:border-gray-700`}>
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
                                    <div className="flex items-start space-x-6">
                                        <div className={`p-4 rounded-xl ${colorClasses.bg} ${colorClasses.primary}`}>
                                            {activeServiceData.icon}
                                        </div>
                                        <div>
                                            <h2 className={`text-2xl lg:text-3xl font-bold mb-2 text-gray-900 dark:text-white`}>
                                                {activeServiceData.title}
                                            </h2>
                                            <p className={`text-lg mb-4 text-gray-600 dark:text-gray-300`}>
                                                {activeServiceData.subtitle}
                                            </p>
                                            <p className={`leading-relaxed max-w-2xl text-gray-700 dark:text-gray-400`}>
                                                {activeServiceData.fullDescription}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end space-y-4">
                                        <div className={`rounded-xl p-4 text-center border shadow-sm bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300`}>
                                            <div className="text-sm mb-1">{activeServiceData.priceLabel}</div>
                                            <div className="text-sm mt-1">Timeline: {activeServiceData.timeline}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 lg:p-10">
                            <div className="grid lg:grid-cols-2 gap-10">
                                {/* Features */}
                                <div className="space-y-6">
                                    <div>
                                        <h3 className={`text-xl font-bold mb-6 flex items-center text-gray-900 dark:text-white`}>
                                            <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                                            What&#39;s Included
                                        </h3>
                                        <div className="space-y-3">
                                            {activeServiceData.features.map((feature, index) => (
                                                <div
                                                    key={index}
                                                    className={`flex items-start space-x-4 p-4 rounded-lg border hover:transition-all duration-300 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600`}
                                                    style={{ animationDelay: `${index * 100}ms` }}
                                                >
                                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                    <span className="leading-relaxed">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Benefits & CTA */}
                                <div className="space-y-6">
                                    <div>
                                        <h3 className={`text-xl font-bold mb-6 flex items-center text-gray-900 dark:text-white`}>
                                            <Star className="w-5 h-5 mr-3 text-yellow-500" />
                                            {activeServiceData.programs ? 'Available Programs' : 'Key Benefits'}
                                        </h3>
                                        <div className="grid gap-3">
                                            {(activeServiceData.programs || activeServiceData.benefits)?.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className={`rounded-lg px-4 py-3 border hover:transition-all duration-300 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600`}
                                                    style={{ animationDelay: `${index * 100}ms` }}
                                                >
                                                    <span className="font-medium">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Why Choose Us */}
                                    <div className={`rounded-xl p-5 border bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600`}>
                                        <div className="flex items-center space-x-3 mb-4">
                                            <Award className="w-5 h-5 text-blue-500" />
                                            <h4 className={`font-bold text-lg text-gray-900 dark:text-white`}>Why Choose Us?</h4>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3 text-sm">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                <span className="text-gray-700 dark:text-gray-400">Exclusive representative</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                <span className="text-gray-700 dark:text-gray-400">99% success rate</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                                <span className="text-gray-700 dark:text-gray-400">6+ years experience</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                                <span className="text-gray-700 dark:text-gray-400">Post-visa support</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* CTA Buttons */}
                                    <div className="space-y-4">
                                        <button className={`w-full ${colorClasses.button} text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-md flex items-center justify-center space-x-3`}>
                                            <span className="relative">
                                                <a href="tel:0969767031">Get Started with {activeServiceData.title}</a>
                                            </span>
                                            <Phone className="w-5 h-5" />
                                        </button>
                                        <a href="https://t.me/Ambitious_Students_ubiquitous">
                                            <button className={`w-full px-6 py-3 rounded-xl font-medium transition-all duration-300 border flex items-center justify-center space-x-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600`}>
                                                <MessageCircle className="w-5 h-5" />
                                                <span>
                                                Contact via Telegram
                                            </span>
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="mt-16 text-center">
                    <div className={`rounded-2xl p-8 border shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700`}>
                        <h3 className={`text-2xl font-bold mb-6 text-gray-900 dark:text-white`}>Ready to Start Your Journey?</h3>
                        <p className={`mb-8 max-w-2xl mx-auto text-gray-600 dark:text-gray-400`}>
                            Contact us today for a free consultation and take the first step towards your international education goals.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a href="tel:023902300" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-md flex items-center space-x-2">
                                <Phone className="w-5 h-5" />
                                <span>Call Now: 023 902 300</span>
                            </a>
                            <a href="tel:0969767031" className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-md flex items-center space-x-2">
                                <Phone className="w-5 h-5" />
                                <span>Mobile: 096 976 7031</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}