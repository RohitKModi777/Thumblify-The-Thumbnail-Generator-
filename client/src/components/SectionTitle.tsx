import type { SectionTitleProps } from "../types";
import { motion } from "motion/react";

export default function SectionTitle({ text1, text2, text3 }: SectionTitleProps) {
    return (
        <>
            <motion.p
                className="text-center font-semibold mt-28 px-10 py-2 rounded-full w-max mx-auto tracking-widest text-xs uppercase"
                style={{
                    background: "rgba(139,92,246,0.10)",
                    border: "1px solid rgba(139,92,246,0.35)",
                    color: "#c4b5fd",
                    letterSpacing: "0.15em",
                }}
                initial={{ y: 120, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 320, damping: 70 }}
            >
                ✦ {text1} ✦
            </motion.p>

            <motion.h3
                className="text-3xl font-bold text-center mx-auto mt-4"
                style={{
                    background: "linear-gradient(135deg, #ffffff 0%, #c4b5fd 45%, #d4d4d8 80%, #ffffff 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                }}
                initial={{ y: 120, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 280, damping: 70 }}
            >
                {text2}
            </motion.h3>

            <motion.p
                className="text-center mt-2 max-w-xl mx-auto"
                style={{ color: "#a1a1aa" }}
                initial={{ y: 120, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 240, damping: 70 }}
            >
                {text3}
            </motion.p>
        </>
    );
}