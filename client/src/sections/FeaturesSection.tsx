'use client'
import SectionTitle from "../components/SectionTitle";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { featuresData } from "../data/features";
import type { IFeature } from "../types";

export default function FeaturesSection() {
    return (
        <div id="features" className="px-4 md:px-16 lg:px-24 xl:px-32">
            <SectionTitle
                text1="Features"
                text2="Why use our generator?"
                text3="Create stunning thumbnails that get clicks, without the hassle."
            />
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-4 mt-16 px-6">
                {featuresData.map((feature: IFeature, index: number) => (
                    <motion.div
                        key={index}
                        className={`${index === 1 ? 'p-px rounded-[17px]' : ''}`}
                        style={index === 1 ? {
                            background: "linear-gradient(135deg, #f5c842 0%, #a1a1aa 50%, #f5c842 100%)"
                        } : {}}
                        initial={{ y: 150, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15, type: "spring", stiffness: 320, damping: 70 }}
                    >
                        <div
                            className="p-6 rounded-[16px] space-y-4 max-w-80 w-full gold-shimmer"
                            style={{
                                background: "linear-gradient(160deg, #0f0c1f 0%, #130e24 100%)",
                                border: index === 1 ? "none" : "1px solid rgba(200,158,40,0.15)",
                            }}
                        >
                            <img src={feature.icon} alt={feature.title} />
                            <h3 className="text-base font-semibold text-white">
                                {feature.title}
                            </h3>
                            <p className="line-clamp-2 pb-4" style={{ color: "#a1a1aa" }}>
                                {feature.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-40 relative mx-auto max-w-5xl">
                {/* Gold glow blob */}
                <div className="absolute -z-50 size-100 -top-10 -left-20 aspect-square rounded-full blur-3xl opacity-20"
                    style={{ background: "radial-gradient(circle, #f5c842, #c98b0a)" }} />

                <motion.p
                    className="text-lg text-left max-w-3xl font-medium"
                    style={{ color: "#d4d4d8" }}
                    initial={{ y: 150, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 320, damping: 70 }}
                >
                    Our AI understands what makes a video go viral and designs thumbnails accordingly.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-10">
                    <motion.div
                        className="md:col-span-2"
                        initial={{ y: 150, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 240, damping: 70 }}
                    >
                        <img className="h-full w-auto" src="/assets/features-showcase-1.png" alt="features showcase" width={1000} height={500} />
                    </motion.div>
                    <motion.div
                        className="md:col-span-1"
                        initial={{ y: 150, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15, type: "spring", stiffness: 320, damping: 70 }}
                    >
                        <img src="/assets/features-showcase-2.png" alt="features showcase" width={1000} height={500}
                            className="hover:-translate-y-0.5 transition duration-300" />
                        <h3 className="text-[22px]/7 font-bold mt-6"
                            style={{
                                background: "linear-gradient(135deg, #ffffff, #f5c842, #d4d4d8)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}>
                            Boost your views with AI-optimized designs
                        </h3>
                        <p className="mt-2" style={{ color: "#a1a1aa" }}>
                            Stop guessing and start ranking. Our AI creates designs proven to capture attention.
                        </p>
                        <a
                            href="/generate"
                            className="group flex items-center gap-2 mt-4 font-semibold transition"
                            style={{ color: "#f5c842" }}
                        >
                            Start Generating Free
                            <ArrowUpRight className="size-5 group-hover:translate-x-0.5 transition duration-300" />
                        </a>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}