"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/constant_components/context/AuthContext";
import ErrorDialog from "@/constant_components/context/ErrorDialog";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import Image from "next/image";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
        phoneNumber: "",
        roleUser: "USER",
        imageUrl: null as File | null,
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();
    const [preview, setPreview] = useState<string | null>(null);

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
        setError("");
        setStep(1);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData((prev) => ({ ...prev, imageUrl: file }));
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSocialLogin = (provider: "google" | "facebook" | "tiktok") => {
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/${provider}`;
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!formData.username || !formData.password) {
            setError("Username and password are required");
            setLoading(false);
            return;
        }

        if (!isLogin) {
            if (
                !formData.email ||
                !formData.firstName ||
                !formData.lastName ||
                !formData.gender ||
                !formData.phoneNumber
            ) {
                setError("Please fill all required fields");
                setLoading(false);
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                setError("Passwords do not match");
                setLoading(false);
                return;
            }
        }

        try {
            const endpoint = isLogin
                ? `${process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, '')}/api/republic/auth/logIn`
                : `${process.env.NEXT_PUBLIC_API_URL}/api/private/users/create`;

            let res;
            if (isLogin) {
                res = await fetch(endpoint, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: formData.username,
                        password: formData.password,
                    }),
                });
            } else {
                const body = new FormData();
                Object.entries(formData).forEach(([key, value]) => {
                    if (value !== null) body.append(key, value as never);
                });

                res = await fetch(endpoint, {
                    method: "POST",
                    body,
                });
            }

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "Authentication failed");
            }

            const data = await res.json();

            if (isLogin) {
                const token = data.token;
                const user = {
                    id: data.user.id,
                    username: data.user.username,
                    email: data.user.email,
                    avatar: data.user.imageUrl,
                    firstName: data.user.firstName,
                    lastName: data.user.lastName,
                    gender: data.user.gender,
                    phoneNumber: data.user.phoneNumber,
                    createdAt: data.user.createdAt,
                    updatedAt: data.user.updatedAt,
                };
                login(user, token);
                router.push("/");
            } else {
                setIsLogin(true);
                setError("Registration successful! Please login.");
                setFormData((prev) => ({
                    ...prev,
                    password: "",
                    confirmPassword: "",
                }));
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Something went wrong");
            }
        }
        finally {
            setLoading(false);
        }
    }

    const inputClass =
        "w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition";

    const buttonPrimary =
        "w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold rounded-lg shadow-md transition";

    const buttonSecondary =
        "w-full py-2 px-4 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-lg transition";

    return (
        <main className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 p-4 transition-colors duration-300">
            <section className="bg-white dark:bg-gray-800 mt-20 rounded-xl shadow-2xl overflow-hidden max-w-md w-full border border-gray-200 dark:border-gray-700">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-800 to-blue-900 dark:from-blue-950 dark:to-gray-900 p-6 text-center">
                    <h1 className="text-2xl font-bold text-white">
                        {isLogin ? "Welcome Back" : "Create Account"}
                    </h1>
                    <p className="text-blue-100 text-sm">
                        {isLogin
                            ? "Sign in to continue"
                            : "Join us and explore new opportunities"}
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 dark:border-gray-700">
                    <button
                        onClick={() => toggleAuthMode()}
                        className={`flex-1 py-4 font-medium text-sm uppercase tracking-wider transition ${
                            isLogin
                                ? "text-yellow-500 border-b-2 border-yellow-500"
                                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                        }`}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => toggleAuthMode()}
                        className={`flex-1 py-4 font-medium text-sm uppercase tracking-wider transition ${
                            !isLogin
                                ? "text-yellow-500 border-b-2 border-yellow-500"
                                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                        }`}
                    >
                        Register
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Registration Step 1 */}
                    {!isLogin && step === 1 && (
                        <>
                            {/* File Upload */}
                            <div>
                                {preview && (
                                    <div className="mt-3 flex justify-center">
                                        <Image
                                            src={preview}
                                            alt="Profile Preview"
                                            className="w-24 h-24 rounded-full object-cover border-2 border-blue-500 shadow-md"
                                        />
                                    </div>
                                )}
                                <label className="block text-sm font-medium mb-1">Profile Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className={inputClass}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        First Name
                                    </label>
                                    <input
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        type="text"
                                        required
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Last Name
                                    </label>
                                    <input
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        type="text"
                                        required
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    type="email"
                                    required
                                    className={inputClass}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        type="text"
                                        required
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Gender</label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        required
                                        className={inputClass}
                                    >
                                        <option value="" disabled>
                                            Select Gender
                                        </option>
                                        <option value="MALE">Male</option>
                                        <option value="FEMALE">Female</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setStep(2)}
                                className={buttonPrimary}
                            >
                                Next
                            </button>
                        </>
                    )}

                    {/* Registration Step 2 */}
                    {!isLogin && step === 2 && (
                        <>
                            <div>
                                <label className="block text-sm font-medium mb-1">Username</label>
                                <input
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    type="text"
                                    required
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Password</label>
                                <input
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    type="password"
                                    required
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Confirm Password
                                </label>
                                <input
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    type="password"
                                    required
                                    className={inputClass}
                                />
                            </div>
                            <div className="flex justify-between gap-2">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className={buttonSecondary}
                                >
                                    Back
                                </button>
                                <button type="submit" disabled={loading} className={buttonPrimary}>
                                    {loading ? "Processing..." : "Create Account"}
                                </button>
                            </div>
                        </>
                    )}

                    {/* Login Form */}
                    {isLogin && (
                        <>
                            <div>
                                <label className="block text-sm font-medium mb-1">Username</label>
                                <input
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    type="text"
                                    required
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Password</label>
                                <input
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    type="password"
                                    required
                                    className={inputClass}
                                />
                            </div>
                            <div className="text-right">
                                <button
                                    type="button"
                                    className="text-sm text-blue-600 hover:underline"
                                    onClick={() => router.push("/forgot-password")}
                                >
                                    Forgot your password?
                                </button>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={buttonPrimary}
                            >
                                {loading ? "Processing..." : "Sign In"}
                            </button>

                            {/* Divider */}
                            <div className="flex items-center my-4">
                                <hr className="flex-grow border-gray-300" />
                                <span className="mx-2 text-gray-500 text-sm">or</span>
                                <hr className="flex-grow border-gray-300" />
                            </div>

                            {/* Social Login Icons */}
                            <div className="flex justify-center gap-4">
                                <button
                                    type="button"
                                    onClick={() => handleSocialLogin("google")}
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white shadow-md"
                                >
                                    <FaGoogle />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSocialLogin("facebook")}
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                                >
                                    <FaFacebookF />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSocialLogin("tiktok")}
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-black hover:bg-gray-900 text-white shadow-md"
                                >
                                    <SiTiktok />
                                </button>
                            </div>
                        </>
                    )}

                    {error && <ErrorDialog message={error} onClose={() => setError("")} />}
                </form>
            </section>
        </main>
    );
}
