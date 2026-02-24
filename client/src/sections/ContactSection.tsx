'use client'
import SectionTitle from "../components/SectionTitle";
import { ArrowRightIcon, MailIcon, UserIcon } from "lucide-react";
import { motion } from "motion/react";

export default function ContactSection() {
    const inputBase: React.CSSProperties = {
        background: "rgba(15,12,31,0.85)",
        border: "1px solid rgba(6,182,212,0.2)",
        color: "#f4f4f5",
        borderRadius: "12px",
    };

    const handleFocus = (e: React.FocusEvent<HTMLElement>) => {
        (e.currentTarget as HTMLElement).style.border = "1px solid rgba(6,182,212,0.55)";
    };
    const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
        (e.currentTarget as HTMLElement).style.border = "1px solid rgba(6,182,212,0.2)";
    };

    return (
        <div className="px-4 md:px-16 lg:px-24 xl:px-32">
            <SectionTitle
                text1="Contact"
                text2="Grow Your Channel"
                text3="Have a question about our AI? Ready to scale your views? Let's talk."
            />

            {/* Cyan divider */}
            <div className="divider-cyan max-w-xs mx-auto mt-4 mb-16 opacity-60" />

            <form onSubmit={(e) => e.preventDefault()} className="grid sm:grid-cols-2 gap-4 sm:gap-5 max-w-2xl mx-auto w-full">

                {/* Name */}
                <motion.div initial={{ y: 150, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 320, damping: 70 }}>
                    <p className="mb-2 text-sm font-semibold" style={{ color: "#d4d4d8" }}>Your name</p>
                    <div className="flex items-center pl-3 rounded-xl transition-all" style={inputBase}
                        onFocus={handleFocus} onBlur={handleBlur}>
                        <UserIcon className="size-4 shrink-0" style={{ color: "#06b6d4" }} />
                        <input name="name" type="text" placeholder="Enter your name"
                            className="w-full p-3 outline-none bg-transparent text-sm" style={{ color: "#f4f4f5" }} />
                    </div>
                </motion.div>

                {/* Email */}
                <motion.div initial={{ y: 150, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 280, damping: 70 }}>
                    <p className="mb-2 text-sm font-semibold" style={{ color: "#d4d4d8" }}>Email address</p>
                    <div className="flex items-center pl-3 rounded-xl transition-all" style={inputBase}
                        onFocus={handleFocus} onBlur={handleBlur}>
                        <MailIcon className="size-4 shrink-0" style={{ color: "#06b6d4" }} />
                        <input name="email" type="email" placeholder="Enter your email"
                            className="w-full p-3 outline-none bg-transparent text-sm" style={{ color: "#f4f4f5" }} />
                    </div>
                </motion.div>

                {/* Message */}
                <motion.div className="sm:col-span-2" initial={{ y: 150, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }} transition={{ type: "spring", stiffness: 240, damping: 70 }}>
                    <p className="mb-2 text-sm font-semibold" style={{ color: "#d4d4d8" }}>Message</p>
                    <textarea name="message" rows={7} placeholder="Enter your message..."
                        className="resize-none w-full p-3 outline-none rounded-xl text-sm transition-all"
                        style={inputBase}
                        onFocus={e => (e.target.style.border = "1px solid rgba(6,182,212,0.55)")}
                        onBlur={e => (e.target.style.border = "1px solid rgba(6,182,212,0.2)")}
                    />
                </motion.div>

                {/* Submit — CYAN button */}
                <motion.button type="submit"
                    className="w-max flex items-center gap-2 px-10 py-3 rounded-full font-bold text-sm transition-all active:scale-95 hover:brightness-110"
                    style={{
                        background: "linear-gradient(135deg, #0891b2, #06b6d4, #22d3ee)",
                        color: "#fff",
                        boxShadow: "0 4px 20px rgba(6,182,212,0.35)",
                    }}
                    initial={{ y: 150, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }} transition={{ type: "spring", stiffness: 280, damping: 70 }}
                >
                    Submit <ArrowRightIcon className="size-4" />
                </motion.button>
            </form>
        </div>
    );
}