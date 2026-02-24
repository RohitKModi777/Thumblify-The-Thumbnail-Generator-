'use client'
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { ZapIcon } from "lucide-react";

export default function CTASection() {
    const navigate = useNavigate();
    return (
        <motion.div
            className="max-w-5xl mt-40 max-md:mx-4 md:mx-auto rounded-3xl overflow-hidden relative p-px"
            style={{
                background: "linear-gradient(135deg, #7c3aed 0%, #a1a1aa 40%, #06b6d4 70%, #7c3aed 100%)",
            }}
            initial={{ y: 150, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 320, damping: 70 }}
        >
            <div
                className="relative rounded-[23px] flex flex-col md:flex-row max-md:gap-8 items-center justify-between px-10 py-14 md:py-16 md:px-20 overflow-hidden"
                style={{ background: "linear-gradient(135deg, #0d0b1e 0%, #0b1a25 100%)" }}
            >
                {/* BG blobs */}
                <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full blur-[100px] opacity-20 pointer-events-none"
                    style={{ background: "#7c3aed" }} />
                <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full blur-[100px] opacity-15 pointer-events-none"
                    style={{ background: "#06b6d4" }} />

                <div className="relative z-10 text-left">
                    <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3"
                        style={{ color: "#a78bfa" }}>
                        ✦ Start For Free ✦
                    </p>
                    <motion.h2
                        className="text-4xl md:text-5xl font-extrabold leading-tight"
                        style={{
                            background: "linear-gradient(135deg, #ffffff 0%, #c4b5fd 40%, #d4d4d8 75%, #ffffff 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                        initial={{ y: 40, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 280, damping: 70 }}
                    >
                        Ready to go viral?
                    </motion.h2>
                    <motion.p
                        className="mt-3 text-base max-w-sm"
                        style={{ color: "#a1a1aa" }}
                        initial={{ y: 40, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        Join thousands of creators using AI to boost their CTR with stunning thumbnails.
                    </motion.p>
                </div>

                {/* Violet + Cyan split button */}
                <motion.button
                    onClick={() => navigate("/generate")}
                    className="relative z-10 flex items-center gap-2 px-10 py-4 rounded-full font-bold text-sm transition-all active:scale-95 hover:brightness-110 shrink-0"
                    style={{
                        background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                        color: "#fff",
                        boxShadow: "0 4px 32px rgba(139,92,246,0.4)",
                    }}
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                >
                    <ZapIcon className="size-4" />
                    Generate Free Thumbnail
                </motion.button>
            </div>
        </motion.div>
    );
}