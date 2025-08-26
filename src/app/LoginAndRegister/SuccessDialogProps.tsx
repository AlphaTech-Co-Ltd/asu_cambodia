"use client";

interface SuccessDialogProps {
    message: string;
    onClose: () => void;
}

export default function SuccessDialog({ message, onClose }: SuccessDialogProps) {
    return (
        <div className="fixed inset-0 bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transform transition-transform duration-300 hover:scale-105">
                <div className="text-center">
                    <div className="w-14 h-14 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-5 animate-pulse">
                        <svg
                            className="w-7 h-7 text-green-600 dark:text-green-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            ></path>
                        </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                        Success!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
                    <button
                        onClick={onClose}
                        className="px-6 py-3 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-medium rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
}
