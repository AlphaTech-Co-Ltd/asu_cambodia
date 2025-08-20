"use client";

import { useState } from "react";
import { LockClosedIcon } from "@heroicons/react/24/solid";

type Props = {
    onClose: () => void;
    onSubmit: (current: string,
               newPass: string,
               confirm: string) => Promise<void>;
};

export default function EditPasswordDialog({ onClose, onSubmit }: Props) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!currentPassword || !newPassword || !confirmPassword) {
            setError("All fields are required");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("New passwords do not match");
            return;
        }

        try {
            setLoading(true);

            await onSubmit(currentPassword, newPassword, confirmPassword);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err: any) {
            // Show server-provided error message
            if (err.message === "Incorrect current password") {
                setError("Current password is incorrect");
            } else {
                setError(err.message || "Failed to update password");
            }
        } finally {
            setLoading(false);
        }
    };

    const inputClass = (fieldEmpty: boolean) =>
        `w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 transition ${
            error && fieldEmpty ? "border-red-500 focus:ring-red-500" : ""
        }`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-8 transform transition-all duration-300 scale-100">
                {/* Header */}
                <div className="flex flex-col items-center mb-6">
                    <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mb-3">
                        <LockClosedIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Change Password
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 text-center">
                        Enter your current password and a new password to update your account.
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 p-3 rounded mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-600 dark:text-gray-300 text-sm font-medium mb-1">
                            Current Password
                        </label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="Enter current password"
                            className={inputClass(!currentPassword)}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 dark:text-gray-300 text-sm font-medium mb-1">
                            New Password
                        </label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                            className={inputClass(!newPassword)}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 dark:text-gray-300 text-sm font-medium mb-1">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            className={inputClass(!confirmPassword)}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition flex-1"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex-1"
                        >
                            {loading ? "Updating..." : "Update Password"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
