'use client'
import { CheckIcon, ChevronRightIcon, ZapIcon } from "lucide-react";
import TiltedImage from "../components/TiltImage";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
    const navigate = useNavigate();

    const specialFeatures = [
        "No design skill needed",
        "30 days free trial",
        "Setup in 10 minutes",
    ];

    return (
        <div className="relative flex flex-col items-center justify-center px-4 md:px-16 lg:px-24 xl:px-32">
            {/* BG glows — violet */}
            <div className="absolute top-28 -z-10 left-1/4 size-80 blur-[300px] opacity-25"
                style={{ background: "radial-gradient(circle, #7c3aed, #4c1d95)" }} />
            <div className="absolute top-64 -z-10 right-1/4 size-56 blur-[220px] opacity-15"
                style={{ background: "#a1a1aa" }} />

            {/* Badge */}
            <motion.div
                onClick={() => navigate('/generate')}
                className="group flex items-center gap-2 rounded-full p-1 pr-4 mt-44 cursor-pointer"
                style={{
                    background: "rgba(139,92,246,0.12)",
                    border: "1px solid rgba(139,92,246,0.35)",
                    color: "#c4b5fd",
                }}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70 }}
            >
                <span className="flex items-center gap-1.5 text-white text-xs px-3 py-1 rounded-full font-bold"
                    style={{ background: "linear-gradient(135deg, #7c3aed, #5b21b6)", color: "#fff" }}>
                    <ZapIcon className="size-3" /> NEW
                </span>
                <p className="flex items-center gap-1 text-sm">
                    <span>Generate your first Thumbnail for free</span>
                    <ChevronRightIcon size={15} className="group-hover:translate-x-0.5 transition duration-300" />
                </p>
            </motion.div>

            {/* Headline */}
            <motion.h1
                className="text-5xl/17 md:text-6xl/21 font-extrabold max-w-3xl text-center mt-6"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 240, damping: 70 }}
            >
                AI Thumbnail Generator for your{" "}
                <span className="move-gradient">Videos.</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
                className="text-base text-center max-w-lg mt-6"
                style={{ color: "#a1a1aa" }}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70 }}
            >
                Stop wasting hours on design. Get high-converting thumbnails in seconds with our Advanced AI.
            </motion.p>

            {/* CTA Buttons — VIOLET */}
            <motion.div
                className="flex flex-wrap items-center justify-center gap-4 mt-8"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 320, damping: 70 }}
            >
                <button
                    onClick={() => navigate('/generate')}
                    className="rounded-full px-8 h-11 font-semibold text-sm transition-all active:scale-95 hover:brightness-110"
                    style={{
                        background: "linear-gradient(135deg, #7c3aed, #6d28d9, #5b21b6)",
                        color: "#fff",
                        boxShadow: "0 4px 24px rgba(139,92,246,0.4)",
                    }}
                >
                    Generate Now
                </button>
                <button
                    className="flex items-center gap-2 rounded-full px-6 h-11 text-sm font-medium transition-all hover:bg-white/5"
                    style={{
                        border: "1px solid rgba(180,180,190,0.25)",
                        color: "#d4d4d8",
                    }}
                >
                    <svg className="size-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                    </svg>
                    <span>See how it works</span>
                </button>
            </motion.div>

            {/* Feature pills */}
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-12 mt-12">
                {specialFeatures.map((feature, index) => (
                    <motion.p
                        className="flex items-center gap-2 text-sm"
                        style={{ color: "#a1a1aa" }}
                        key={index}
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.2, duration: 0.3 }}
                    >
                        <CheckIcon className="size-4" style={{ color: "#8b5cf6" }} />
                        {feature}
                    </motion.p>
                ))}
            </div>

            <TiltedImage />
        </div>
    );
}