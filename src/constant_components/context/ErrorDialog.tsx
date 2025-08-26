import { XCircleIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";

type ErrorDialogProps = {
    onClose: () => void;
};

export default function ErrorDialog({ onClose }: ErrorDialogProps) {
    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {/* Backdrop */}
                <motion.div
                    className="fixed inset-0 bg-black/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                />

                {/* Dialog */}
                <motion.div
                    className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-2xl shadow-2xl max-w-md w-full z-50"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                            <XCircleIcon className="h-10 w-10 text-red-600" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                Something went wrong
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">Please check the information again please!</p>
                        </div>
                    </div>
                    <div className="mt-6">
                        <button
                            onClick={onClose}
                            className="w-full flex justify-center items-center gap-2 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-md transition-colors duration-200"
                        >
                            Close
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
