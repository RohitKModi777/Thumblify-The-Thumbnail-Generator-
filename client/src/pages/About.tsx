import { motion } from "motion/react";
import SoftBackdrop from "../components/SoftBackdrop";
import { HeartIcon, LightbulbIcon, ShieldIcon, TrendingUpIcon, SparklesIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const values = [
    { icon: LightbulbIcon, title: "Innovation First", desc: "We constantly push the boundaries of what AI can do for visual content creation." },
    { icon: HeartIcon, title: "Creator Focused", desc: "Every feature we build is designed with creators in mind — from beginners to pros." },
    { icon: ShieldIcon, title: "Quality Assured", desc: "Our AI models are fine-tuned to produce only high-converting, professional-grade thumbnails." },
    { icon: TrendingUpIcon, title: "Results Driven", desc: "We measure success by your success: higher CTR, more views, faster growth." },
];

/* ── ROSE accent ────────────────────────── */
const roseAccent = "#0000ff";
const roseBorder = "rgba(244,63,94,0.25)";
const roseBg = "rgba(244,63,94,0.1)";

export default function About() {
    const navigate = useNavigate();
    return (
        <>
            <SoftBackdrop />
            <div className="min-h-screen pt-32 pb-24 px-6 md:px-16 lg:px-24 xl:px-32">

                {/* Rose glow */}
                <div className="absolute top-40 left-1/3 -z-10 w-96 h-96 rounded-full blur-[200px] opacity-10 pointer-events-none"
                    style={{ background: roseAccent }} />

                {/* Hero */}
                <motion.div className="text-center max-w-3xl mx-auto mb-24"
                    initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 240, damping: 60 }}>

                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-bold tracking-widest uppercase"
                        style={{ background: roseBg, border: `1px solid ${roseBorder}`, color: roseAccent }}>
                        <SparklesIcon className="size-3.5" /> About Thumblify
                    </div>

                    <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6"
                        style={{
                            background: "linear-gradient(135deg, #ffffff 0%, #fda4b4 40%, #d4d4d8 70%, #ffffff 100%)",
                            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                        }}>
                        We Make Creators<br />Go Viral
                    </h1>
                    <p className="text-lg leading-relaxed" style={{ color: "#a1a1aa" }}>
                        Thumblify is an AI-powered thumbnail generation platform built for YouTube creators,
                        podcasters, and content marketers who want to stand out without spending hours on design.
                    </p>
                </motion.div>

                {/* Rose divider */}
                <div className="divider-rose max-w-md mx-auto mb-24 opacity-60" />

                {/* Stats */}
                <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-28"
                    initial={{ y: 60, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}>
                    {[
                        { label: "Creators", value: "50K+" },
                        { label: "Thumbnails Generated", value: "2M+" },
                        { label: "Average CTR Increase", value: "3.2×" },
                        { label: "Countries", value: "120+" },
                    ].map((stat, i) => (
                        <motion.div key={i} className="text-center p-6 rounded-2xl card-shimmer"
                            style={{ background: "linear-gradient(160deg, #1a0810, #200c14)", border: `1px solid ${roseBorder}` }}
                            initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}
                            transition={{ delay: i * 0.1, type: "spring", stiffness: 280, damping: 70 }}>
                            <p className="text-4xl font-extrabold mb-1" style={{ color: roseAccent }}>{stat.value}</p>
                            <p className="text-xs" style={{ color: "#71717a" }}>{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Mission — rose-pink gradient border */}
                <motion.div className="max-w-4xl mx-auto mb-28 p-px rounded-3xl"
                    style={{ background: "linear-gradient(135deg, #f43f5e, #a1a1aa 50%, #f43f5e)" }}
                    initial={{ y: 60, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}>
                    <div className="rounded-[23px] px-10 py-12 text-center"
                        style={{ background: "linear-gradient(160deg, #120009, #1c000e)" }}>
                        <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: roseAccent }}>
                            ✦ Our Mission ✦
                        </p>
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-4"
                            style={{
                                background: "linear-gradient(135deg, #ffffff, #fda4b4, #d4d4d8)",
                                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                            }}>
                            Democratize Visual Marketing
                        </h2>
                        <p className="text-base leading-relaxed max-w-2xl mx-auto" style={{ color: "#a1a1aa" }}>
                            Great thumbnails used to require expensive designers and hours of work.
                            We believe every creator deserves professional-grade visuals instantly —
                            so you can focus on content, not design.
                        </p>
                    </div>
                </motion.div>

                {/* Values */}
                <div className="max-w-5xl mx-auto">
                    <motion.div className="text-center mb-14"
                        initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}>
                        <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: roseAccent }}>✦ Our Values ✦</p>
                        <h2 className="text-3xl font-extrabold"
                            style={{
                                background: "linear-gradient(135deg, #ffffff, #fda4b4, #d4d4d8)",
                                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                            }}>
                            What Drives Us
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {values.map((v, i) => (
                            <motion.div key={i}
                                className="flex gap-5 p-6 rounded-2xl transition-all card-shimmer"
                                style={{ background: "linear-gradient(160deg, #1a0810, #200c14)", border: `1px solid ${roseBorder}` }}
                                initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}
                                transition={{ delay: i * 0.1, type: "spring", stiffness: 280, damping: 70 }}
                                onMouseEnter={e => (e.currentTarget.style.border = `1px solid rgba(244,63,94,0.55)`)}
                                onMouseLeave={e => (e.currentTarget.style.border = `1px solid ${roseBorder}`)}>
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 mt-1"
                                    style={{ background: roseBg, border: `1px solid ${roseBorder}` }}>
                                    <v.icon className="size-5" style={{ color: roseAccent }} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-base mb-1.5" style={{ color: roseAccent }}>{v.title}</h3>
                                    <p className="text-sm leading-relaxed" style={{ color: "#a1a1aa" }}>{v.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA — ROSE button */}
                    <motion.div className="text-center mt-16"
                        initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}>
                        <button onClick={() => navigate("/generate")}
                            className="px-10 py-4 rounded-full font-bold text-sm text-white transition-all active:scale-95 hover:brightness-110"
                            style={{ background: "linear-gradient(135deg, #e11d48, #f43f5e, #fb7185)", boxShadow: "0 4px 24px rgba(244,63,94,0.35)" }}>
                            ✦ Start Generating Free
                        </button>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
