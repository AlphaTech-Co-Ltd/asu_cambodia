'use client';

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

export default function LoginAndRegister() {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => setIsLogin(!isLogin);

    return (
        <div className="flex justify-center items-center pt-20 min-h-screen bg-gray-100 px-4">
            <div className="bg-white shadow-md rounded px-8 pt-8 pb-10 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-transparent bg-gradient-to-r from-blue-950 to-yellow-400 bg-clip-text mb-6">
                    {isLogin ? "Login" : "Sign Up"}
                </h2>

                <form>
                    {!isLogin && (
                        <div className="mb-6">
                            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                                <FontAwesomeIcon icon={faUser} className="mr-2 inline-block w-4" /> Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    )}

                    <div className="mb-6">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            <FontAwesomeIcon icon={faEnvelope} className="mr-2 inline-block w-4" /> Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="example@email.com"
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                            <FontAwesomeIcon icon={faLock} className="mr-2 inline-block w-4" /> Password
                        </label>
                        <input id="password" type="password" placeholder="Enter your password" className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>

                    {!isLogin && (
                        <div className="mb-6">
                            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
                                <FontAwesomeIcon icon={faLock} className="mr-2 inline-block w-4" /> Confirm Password
                            </label>
                            <input id="confirmPassword" type="password" placeholder="Re-enter your password" className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                    )}

                    <div className="flex items-center justify-center">
                        <button type="submit" className="bg-yellow-400 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                            {isLogin ? "Sign In" : "Register"}
                        </button>
                    </div>

                    {isLogin && (
                        <div className="text-center mt-4">
                            <Link href="#" className="text-gray-700 hover:text-gray-900">
                                Forgot Password?
                            </Link>
                        </div>
                    )}
                </form>

                <p className="text-center text-gray-500 mt-6">
                    {isLogin ? "Don’t have an account?" : "Already have an account?"}
                    <button onClick={toggleForm} className="text-blue-500 hover:underline ml-1">
                        {isLogin ? "Sign Up" : "Login"}
                    </button>
                </p>

                <div className="mt-6">
                    <p className="text-center text-gray-700">or continue with</p>
                    <div className="flex justify-center mt-3 flex-wrap gap-2">
                        <Link href="#" className="flex items-center gap-2 bg-[#1877F2] hover:bg-[#155DC1] text-white font-medium py-2 px-4 rounded">
                            <FontAwesomeIcon icon={faFacebook} className="w-4 h-4" />
                            <span className="hidden sm:inline">Facebook</span>
                        </Link>

                        <Link href="#" className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded">
                            <FontAwesomeIcon icon={faGoogle} className="w-4 h-4 text-[#DB4437]" />
                            <span className="hidden sm:inline">Google</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
