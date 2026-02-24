import { motion } from "motion/react";
import { CheckCircleIcon, SparklesIcon } from "lucide-react";
import SoftBackdrop from "../components/SoftBackdrop";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
    const navigate = useNavigate();

    return (
        <>
            <SoftBackdrop />
            <div className="min-h-screen flex items-center justify-center px-6">
                <motion.div
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 280, damping: 60 }}
                    className="text-center max-w-md"
                    style={{
                        padding: "2px",
                        borderRadius: "24px",
                        background: "linear-gradient(135deg, #f5c842 0%, #e6a817 50%, #f5c842 100%)",
                    }}
                >
                    <div
                        className="rounded-[22px] px-10 py-14"
                        style={{ background: "linear-gradient(160deg, #16120a, #1e1607)" }}
                    >
                        {/* Icon */}
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <div
                                    className="w-20 h-20 rounded-full flex items-center justify-center"
                                    style={{ background: "linear-gradient(135deg, #f5c842, #e6a817)" }}
                                >
                                    <CheckCircleIcon className="size-10 text-amber-900" />
                                </div>
                                <div
                                    className="absolute inset-0 rounded-full blur-xl -z-10 opacity-60"
                                    style={{ background: "rgba(245,200,66,0.5)" }}
                                />
                            </div>
                        </div>

                        <h1
                            className="text-3xl font-extrabold mb-3"
                            style={{ color: "#f5c842" }}
                        >
                            Payment Successful!
                        </h1>
                        <p className="text-zinc-400 mb-8 leading-relaxed">
                            Thank you for subscribing to Thumblify. Your plan is now active and ready to use.
                        </p>

                        <button
                            onClick={() => navigate("/generate")}
                            className="w-full py-3.5 rounded-xl font-bold tracking-wide text-sm transition-all active:scale-95 hover:brightness-110"
                            style={{
                                background: "linear-gradient(135deg, #e6a817, #f5c842, #c98b0a)",
                                color: "#1a0f00",
                            }}
                        >
                            <span className="flex items-center justify-center gap-2">
                                <SparklesIcon className="size-4" />
                                Start Generating Thumbnails
                            </span>
                        </button>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
