"use client";
import { useState } from "react";

export default function ContactUsPage() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<"" | "success" | "error">("");

    // Replace with your own Telegram Bot token and Chat ID
    const BOT_TOKEN = "8461799143:AAHlwmura72q0t0-O154c6GGMkAnb3PGfgQ";
    const CHAT_ID = "-1002071754413";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !phone || !email || !message) {
            setStatus("error");
            return;
        }

        const telegramMessage = `
📩 Contact Request Received
═══════════════════
👤 Full Name : ${name || "N/A"}
📞 Phone     : ${phone ? `[${phone}](tel:${phone})` : "N/A"}
📧 Email     : ${email || "N/A"}

💬 Message:
${message || "No message provided."}

🕒 Submitted: ${new Date().toLocaleString()}
═══════════════════
`;

        fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: telegramMessage,
                parse_mode: "Markdown",
            }),
        })
            .then(() => {
                setStatus("success");
                setName("");
                setPhone("");
                setEmail("");
                setMessage("");
            })
            .catch((error) => {
                console.error("Telegram API error:", error);
                setStatus("error");
            });
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
                            Fill out the form below and we’ll respond via Telegram.
                        </p>

                        <form className="space-y-5" onSubmit={handleSubmit}>
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

                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                            />

                            <textarea
                                rows={4}
                                placeholder="Message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                            ></textarea>
                            {status === "error" && (
                                <p className="text-red-500 font-medium">
                                    Please fill all fields before sending.
                                </p>
                            )}

                            <button
                                type="submit"
                                className="w-full py-3 px-5 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-lg shadow-md transition-all transform hover:scale-[1.02] active:scale-[0.97] flex items-center justify-center gap-2"
                            >
                                Send via Telegram
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
