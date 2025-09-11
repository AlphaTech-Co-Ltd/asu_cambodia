"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Bot, User, Minimize2 } from "lucide-react";

export default function ProfessionalChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string; timestamp: Date }[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const formatTime = (date: Date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: { sender: "user"; text: string; timestamp: Date } = {
            sender: "user",
            text: input,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input }),
            });

            const data: { reply: string } = await res.json();

            setTimeout(() => {
                const botMessage: { sender: "bot"; text: string; timestamp: Date } = {
                    sender: "bot",
                    text: data.reply,
                    timestamp: new Date(),
                };

                setMessages(prev => [...prev, botMessage]);
                setIsTyping(false);
            }, 1000);

        } catch {
            const botMessage: { sender: "bot"; text: string; timestamp: Date } = {
                sender: "bot",
                text: "I apologize, but I'm experiencing technical difficulties. Please try again in a moment.",
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, botMessage]);
            setIsTyping(false);
        }
    };

    return (
        <>
            {/* Floating Chat Button */}
            {!isOpen && (
                <div className="fixed bottom-8 right-8 z-50">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="group relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 shadow-2xl hover:shadow-slate-900/50 transition-all duration-500 hover:scale-105"
                    >
                        <MessageCircle className="w-7 h-7 text-white transition-transform group-hover:scale-110" />
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-500 rounded-full border-3 border-white animate-pulse"></div>
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                    </button>
                </div>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-8 right-8 z-50 w-[95vw] max-w-[420px] h-[600px] flex flex-col rounded-3xl shadow-2xl overflow-hidden border border-slate-200/20 bg-white backdrop-blur-xl">
                    {/* Header */}
                    <div className="flex justify-between items-center bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                                    <Bot className="w-6 h-6 text-white" />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900"></div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">AI Assistant</h3>
                                <p className="text-sm text-slate-300 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                                    Ready to assist
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 rounded-xl hover:bg-slate-700/50 transition-colors duration-200"
                            >
                                <Minimize2 className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 rounded-xl hover:bg-slate-700/50 transition-colors duration-200"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Messages Container */}
                    <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 bg-gradient-to-b from-slate-50/50 to-white">
                        {messages.length === 0 && !isTyping && (
                            <div className="flex flex-col items-center justify-center h-full text-center px-4">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center mb-6 shadow-inner">
                                    <Bot className="w-10 h-10 text-slate-600" />
                                </div>
                                <h4 className="font-semibold text-slate-800 text-lg mb-2">Welcome! How can I help?</h4>
                                <p className="text-sm text-slate-600 leading-relaxed max-w-xs">
                                    I&#39;m here to assist you with any questions or tasks you might have. Feel free to ask me anything.
                                </p>
                            </div>
                        )}

                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} items-end gap-3`}>
                                {msg.sender === "bot" && (
                                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md flex-shrink-0">
                                        <Bot className="w-5 h-5 text-white" />
                                    </div>
                                )}
                                <div className={`max-w-[75%] ${msg.sender === "user" ? "order-last" : ""}`}>
                                    <div className={`rounded-2xl px-4 py-3 shadow-sm ${
                                        msg.sender === "user"
                                            ? "bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-br-md"
                                            : "bg-white border border-slate-200/60 text-slate-800 rounded-bl-md"
                                    }`}>
                                        <p className="text-sm leading-relaxed font-medium">{msg.text}</p>
                                    </div>
                                    <p className={`text-xs mt-2 ${
                                        msg.sender === "user" ? "text-slate-500 text-right" : "text-slate-500 text-left"
                                    }`}>
                                        {formatTime(msg.timestamp)}
                                    </p>
                                </div>
                                {msg.sender === "user" && (
                                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center shadow-md flex-shrink-0">
                                        <User className="w-5 h-5 text-white" />
                                    </div>
                                )}
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex justify-start items-end gap-3">
                                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <div className="bg-white border border-slate-200/60 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                                    <div className="flex gap-1.5">
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-6 bg-white border-t border-slate-100">
                        <div className="flex gap-3 items-end">
                            <div className="flex-1">
                                <input
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSend()}
                                    placeholder="Type your message here..."
                                    className="w-full px-5 py-4 text-base rounded-2xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 focus:bg-white transition-all duration-200 font-medium"
                                    disabled={isTyping}
                                />
                            </div>
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isTyping}
                                className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white hover:shadow-lg disabled:from-slate-400 disabled:to-slate-500 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}