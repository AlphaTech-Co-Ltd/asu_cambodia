"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {FiEdit, FiKey, FiUser, FiMail, FiClock} from "react-icons/fi";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import EditPasswordDialog from "@/app/Profile/EditPasswordDialog";
import DeleteProfilePage from "@/app/Profile/DeleteProfilePage";

// Helper function to validate dates
const isValidDate = (dateString: string | null | undefined) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    return !isNaN(date.getTime());
};

type UserData = {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phoneNumber?: string;
    gender?: string;
    avatar?: string | null;
    roleUser?: string;
    createdAt?: string | null;
    updatedAt?: string | null;
};

export default function ProfilePage() {
    const router = useRouter();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [imageError, setImageError] = useState(false);
    const [showEditPassword, setShowEditPassword] = useState(false);

    // Fetch user data
    useEffect(() => {
        const fetchUser = () => {
            try {
                setLoading(true);
                setError(null);
                setImageError(false);

                const storedUserString = localStorage.getItem("user");
                if (!storedUserString) {
                    router.push("/LoginAndRegister");
                    return;
                }

                const storedUser: UserData = JSON.parse(storedUserString);

                const formattedData: UserData = {
                    ...storedUser,
                    createdAt: isValidDate(storedUser.createdAt)
                        ? format(new Date(storedUser.createdAt!), "MMMM d, yyyy")
                        : "Unknown",
                    updatedAt: isValidDate(storedUser.updatedAt)
                        ? format(new Date(storedUser.updatedAt!), "MMMM d, yyyy")
                        : null,
                };

                setUserData(formattedData);
            } catch (err: any) {
                console.error("Error loading user data:", err);
                setError(err.message || "Failed to load user data");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [router]);

    const handleEditProfile = () => {
        console.log("Edit profile clicked");
        alert("Edit profile feature coming soon!");
    };

    const handlePasswordUpdate = async (
        current: string,
        newPass: string,
        confirm: string
    ) => {
        if (newPass !== confirm) {
            setError("New passwords do not match");
            return;
        }

        if (!userData) return;

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/private/users/${userData.id}/password`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        currentPassword: current,
                        newPassword: newPass,
                    }),
                }
            );

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "Failed to update password");
            }

            setShowEditPassword(false);
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        }
    };

    // Loading screen
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-300">
                        Loading your profile...
                    </p>
                </div>
            </div>
        );
    }

    // Error screen
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-md w-full text-center">
                    <div className="text-red-500 dark:text-red-400 mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 mx-auto"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-2">
                        Error Loading Profile
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // No profile found
    if (!userData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-md w-full text-center">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-2">
                        Profile Not Found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        We couldn&#39;t find your profile information.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white mt-20 dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden transition-all duration-300">
                    {/* Header Banner */}
                    <div className="relative">
                        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-800 dark:from-indigo-700 dark:to-purple-900"></div>
                        <div className="absolute -bottom-16 left-6">
                            <div className="relative h-32 w-32 rounded-full border-4 border-white dark:border-gray-900 bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
                                {userData.avatar && !imageError ? (
                                    <Image src={`${process.env.NEXT_PUBLIC_API_URL}/api/republic/files/${encodeURIComponent(userData.avatar)}`}
                                        alt={`${userData.firstName} ${userData.lastName}`}
                                        width={128}
                                        height={128}
                                        className="w-full h-full object-cover rounded-full"
                                        priority
                                        onError={() => setImageError(true)}
                                        unoptimized
                                    />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-500 text-4xl text-white font-bold rounded-full">
                                        {userData.firstName?.charAt(0)}
                                        {userData.lastName?.charAt(0)}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Profile Content */}
                    <div className="pt-20 px-6 pb-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                                    {userData.firstName} {userData.lastName}
                                </h2>
                                <div className="flex flex-wrap items-center mt-1 gap-2">
                                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 uppercase dark:text-blue-200 text-xs font-medium rounded-full">
                                        {userData.roleUser || "User"} : ASU5083{userData.id}8794
                                    </span>
                                </div>
                            </div>

                            <div className="flex space-x-3 mt-4 sm:mt-0">
                                <button
                                    onClick={handleEditProfile}
                                    className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors"
                                    aria-label="Edit profile"
                                >
                                    <FiEdit size={20} />
                                </button>

                                <button
                                    onClick={() => setShowEditPassword(true)}
                                    className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-50 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300 hover:bg-yellow-100 dark:hover:bg-yellow-800 transition-colors"
                                    aria-label="Change password"
                                >
                                    <FiKey size={20} />
                                </button>

                                {userData && (
                                    <DeleteProfilePage
                                        userId={userData.id}
                                    />
                                )}
                            </div>

                        </div>

                        {/* Info Sections */}
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Personal */}
                            <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-xl hover:shadow-md transition-shadow">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center mb-4">
                                    <FiUser className="mr-2 text-blue-600" /> Personal Information
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Username
                                        </p>
                                        <p className="font-medium text-gray-800 dark:text-gray-200 mt-1">
                                            {userData.username || "Not set"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Gender
                                        </p>
                                        <p className="font-medium text-gray-800 dark:text-gray-200 mt-1 capitalize">
                                            {userData.gender?.toLowerCase() || "Not specified"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Contact */}
                            <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-xl hover:shadow-md transition-shadow">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center mb-4">
                                    <FiMail className="mr-2 text-blue-600" /> Contact Information
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Email
                                        </p>
                                        <p className="font-medium text-gray-800 dark:text-gray-200 mt-1 break-all">
                                            {userData.email || "Not set"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Phone Number
                                        </p>
                                        <p className="font-medium text-gray-800 dark:text-gray-200 mt-1">
                                            {userData.phoneNumber || "Not provided"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Account Info */}
                        <div className="mt-6 bg-gray-50 dark:bg-gray-800 p-5 rounded-xl hover:shadow-md transition-shadow">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center mb-4">
                                <FiClock className="mr-2 text-blue-600" /> Account Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        User ID
                                    </p>
                                    <p className="font-medium text-gray-800 dark:text-gray-200 mt-1 break-all">
                                        ASU5083{userData.id}8794
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Last Updated
                                    </p>
                                    <p className="font-medium text-gray-800 dark:text-gray-200 mt-1">
                                        {userData.updatedAt || (
                                            <span className="text-gray-400 dark:text-gray-500">
                                                Not updated yet
                                            </span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-end gap-3">
                            <button
                                onClick={handleEditProfile}
                                className="px-5 py-2.5 border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-300 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors font-medium flex items-center justify-center"
                            >
                                <FiEdit className="mr-2" /> Edit Profile
                            </button>

                            <button
                                onClick={() => setShowEditPassword(true)}
                                className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium flex items-center justify-center"
                            >
                                <FiKey className="mr-2" /> Edit Password
                            </button>
                        </div>
                    </div>
                </div>

                {/* Edit Password Dialog */}
                {showEditPassword && (
                    <EditPasswordDialog
                        onClose={() => setShowEditPassword(false)}
                        onSubmit={handlePasswordUpdate}
                    />
                )}
            </div>
        </div>
    );
}
