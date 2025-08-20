"use client";
import { useState } from "react";

export default function ContactUsPage() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(""); // "success" or "error"

    const TELEGRAM_BOT_TOKEN = "8461799143:AAHlwmura72q0t0-O154c6GGMkAnb3PGfgQ";
    const TELEGRAM_CHAT_ID = "8461799143"; // replace with your numeric chat ID

    // Escape Markdown special characters
    const escapeMarkdown = (text: string) =>
        text.replace(/([_*[\]()~`>#+-=|{}.!])/g, "\\$1");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !phone || !email || !message) {
            alert("Please fill in all fields!");
            return;
        }

        const text = `
📩 *New Contact Message*
*Name:* ${escapeMarkdown(name)}
*Phone:* ${escapeMarkdown(phone)}
*Email:* ${escapeMarkdown(email)}
*Message:* ${escapeMarkdown(message)}
    `;

        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text,
                    parse_mode: "MarkdownV2",
                }),
            });

            const data = await res.json();

            if (data.ok) {
                setStatus("success");
                alert("Message sent successfully!");
                setName("");
                setPhone("");
                setEmail("");
                setMessage("");
            } else {
                setStatus("error");
                console.error(data);
                alert("Failed to send message!");
            }
        } catch (err) {
            console.error(err);
            setStatus("error");
            alert("Something went wrong!");
        }
    };

    const location =
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.8740054961794!2d104.898028!3d11.585228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31095184941c5b05%3A0x553caa6f32f63b2f!2sCake%20Experiential%20Communications%20(Cambodia)%20Co.%2C%20Ltd.!5e0!3m2!1sen!2skh!4v1691844321120!5m2!1sen!2skh";

    return (
        <section className="relative pt-32 pb-16 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="container mx-auto px-4 lg:px-10">
                {/* Heading */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-3 tracking-tight">
                        Get in Touch
                    </h1>
                    <p className="text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
                        Have a question or a project in mind? Let’s connect and make it happen together.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid lg:grid-cols-2 gap-10 items-stretch">
                    {/* Left Side: Google Map */}
                    <div className="relative group">
                        <div className="w-full h-[360px] lg:h-[460px] overflow-hidden rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-500 group-hover:scale-[1.01]">
                            <iframe
                                src={location}
                                className="w-full h-full border-0"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                        <span className="absolute -top-4 -left-4 bg-blue-600 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-md">
              📍 Our Location
            </span>
                    </div>

                    {/* Right Side: Contact Form */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 transition-all duration-500 hover:shadow-2xl">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                            Let’s Talk
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm leading-relaxed">
                            Fill out the form below and we’ll respond within 24 hours.
                        </p>

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            {/* Full Name & Phone */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                                />
                            </div>

                            {/* Email */}
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                            />

                            {/* Message */}
                            <textarea
                                rows={4}
                                placeholder="Message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                            ></textarea>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full py-3 px-5 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-lg shadow-md transition-all transform hover:scale-[1.02] active:scale-[0.97] flex items-center justify-center gap-2"
                            >
                                Send Message
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
