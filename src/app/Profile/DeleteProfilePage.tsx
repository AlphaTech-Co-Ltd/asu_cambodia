"use client";

import { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import { MdWarning } from "react-icons/md";

type DeleteProfileProps = {
    userId: string | number;
};

export default function DeleteProfilePage({ userId }: DeleteProfileProps) {
    const [showDialog, setShowDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [confirmUsername, setConfirmUsername] = useState("");
    const [username, setUsername] = useState("");

    // Fetch user info from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                setUsername(user.username);
            } catch (error) {
                console.error("Failed to parse user from localStorage", error);
            }
        }
    }, []);

    const handleDelete = async () => {
        setLoading(true);
        setMessage("");
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/private/users/delete/${userId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || "Failed to delete account");
            }

            setMessage("✅ Account deleted successfully.");

            // Clear localStorage
            localStorage.removeItem("user");
            localStorage.removeItem("token");

            // Redirect to login page
            window.location.replace("/");
        } catch (error: never) {
            setMessage(`❌ ${error.message}`);
        } finally {
            setLoading(false);
            setShowDialog(false);
            setConfirmUsername("");
        }
    };

    const isUsernameMatched = confirmUsername === username;

    return (
        <>
            {/* Delete Button */}
            <button
                onClick={() => setShowDialog(true)}
                className="flex items-center w-12 h-12 justify-center p-3 rounded-full bg-red-50 dark:bg-red-900 text-red-600 dark:text-red-500 hover:bg-red-100 dark:hover:bg-red-800 transition-all shadow-md hover:shadow-lg"
                aria-label="Delete Account"
            >
                <FiTrash2 size={20} />
            </button>

            {/* Message */}
            {message && (
                <p className="mt-4 text-center text-sm text-gray-700 dark:text-gray-200">{message}</p>
            )}

            {/* Modal */}
            {showDialog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Blur Background */}
                    <div
                        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
                        onClick={() => !loading && setShowDialog(false)}
                    ></div>

                    {/* Modal Card */}
                    <div className="relative bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl w-96 max-w-sm text-center transform transition-transform scale-95 animate-fadeIn">
                        <div className="flex flex-col items-center">
                            <div className="bg-red-100 dark:bg-red-800 p-4 rounded-full mb-4">
                                <MdWarning className="text-red-600 dark:text-red-200" size={36} />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                                Confirm Deletion
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                To delete your account, please type your username
                            </p>

                            <input
                                type="text"
                                placeholder="Enter your username"
                                value={confirmUsername}
                                onChange={(e) => setConfirmUsername(e.target.value)}
                                className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                                disabled={loading}
                            />

                            <div className="flex justify-center gap-4 w-full">
                                <button
                                    onClick={() => setShowDialog(false)}
                                    className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all font-medium shadow-md hover:shadow-lg disabled:opacity-50"
                                    disabled={loading || !isUsernameMatched}
                                >
                                    {loading ? "Deleting..." : "Yes, Delete"}
                                </button>
                            </div>

                            {!isUsernameMatched && confirmUsername && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-400">Username does not match.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
