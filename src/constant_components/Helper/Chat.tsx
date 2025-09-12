"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Bot, User, Minimize2, Sparkles } from "lucide-react";

export default function DarkModeChatWidget() {
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
                <div className="fixed bottom-6 right-6 z-50">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="group relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 hover:scale-110 hover:rotate-3"
                    >
                        <MessageCircle className="w-6 h-6 text-white" />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-gray-900 animate-pulse"></div>
                    </button>
                </div>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 z-50 w-[95vw] max-w-[420px] h-[580px] flex flex-col rounded-3xl shadow-2xl overflow-hidden border border-gray-700/50 backdrop-blur-xl bg-gray-900/95">
                    {/* Header */}
                    <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-5 border-b border-gray-700/50">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-600/10 to-purple-700/10"></div>
                        <div className="relative flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 backdrop-blur-sm flex items-center justify-center border border-cyan-400/30">
                                    <Bot className="w-5 h-5 text-cyan-400" />
                                    <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-100">AI Assistant</h3>
                                    <div className="text-xs text-gray-400 flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                                        Online now
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-xl hover:bg-white/10 transition-all duration-200"
                                >
                                    <Minimize2 className="w-4 h-4 text-gray-400" />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-xl hover:bg-white/10 transition-all duration-200"
                                >
                                    <X className="w-4 h-4 text-gray-400" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Messages Container */}
                    <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 bg-gradient-to-b from-gray-900 to-gray-800">
                        {messages.length === 0 && !isTyping && (
                            <div className="flex flex-col items-center justify-center h-full text-center px-4">
                                <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center mb-6 border border-cyan-400/20">
                                    <Bot className="w-10 h-10 text-cyan-400" />
                                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                                        <Sparkles className="w-3 h-3 text-white" />
                                    </div>
                                </div>
                                <h4 className="font-bold text-gray-100 text-xl mb-3">Hey there! 👋</h4>
                                <div className="text-sm text-gray-400 leading-relaxed max-w-xs">
                                    I&#39;m your AI assistant. Ask me anything and I&#39;ll help you out instantly!
                                </div>
                            </div>
                        )}

                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} items-end gap-3 animate-in slide-in-from-bottom-2 duration-300`}>
                                {msg.sender === "bot" && (
                                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/25">
                                        <Bot className="w-4 h-4 text-white" />
                                    </div>
                                )}
                                <div className={`max-w-[85%] ${msg.sender === "user" ? "order-last" : ""}`}>
                                    <div className={`rounded-2xl px-4 py-3 shadow-lg ${msg.sender === "user"
                                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-br-md shadow-cyan-500/25"
                                        : "bg-gray-800 border border-gray-700 text-gray-100 rounded-bl-md shadow-gray-900/50"
                                    }`}>
                                        <div className="text-sm leading-relaxed">{msg.text}</div>
                                    </div>
                                    <div className={`text-xs mt-2 px-1 ${msg.sender === "user" ? "text-gray-500 text-right" : "text-gray-500 text-left"}`}>
                                        {formatTime(msg.timestamp)}
                                    </div>
                                </div>
                                {msg.sender === "user" && (
                                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gray-600 to-gray-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                                        <User className="w-4 h-4 text-white" />
                                    </div>
                                )}
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex justify-start items-end gap-3 animate-in slide-in-from-bottom-2 duration-300">
                                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
                                    <Bot className="w-4 h-4 text-white" />
                                </div>
                                <div className="bg-gray-800 border border-gray-700 rounded-2xl rounded-bl-md px-4 py-3 shadow-lg shadow-gray-900/50">
                                    <div className="flex gap-1">
                                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></span>
                                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-100"></span>
                                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-200"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-5 bg-gray-800/80 backdrop-blur-sm border-t border-gray-700/50">
                        <div className="flex gap-3 items-center">
                            <input
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSend()}
                                placeholder="Type your message..."
                                className="flex-1 px-4 py-3 text-sm rounded-2xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-gray-700 text-gray-100 placeholder-gray-400 shadow-sm transition-all duration-200"
                                disabled={isTyping}
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isTyping}
                                className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-cyan-500/25 hover:scale-105"
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