'use client'
import SectionTitle from "../components/SectionTitle"
import { pricingData } from "../data/pricing";
import type { IPricing } from "../types";
import { CheckIcon, CrownIcon, SparklesIcon, ZapIcon } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import api from "../config/api";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Per-plan visual configs — gold / silver / royal purple
const planConfig: Record<string, {
    gradientBorder: string;
    cardBg: string;
    badgeBg: string;
    badgeText: string;
    buttonBg: string;
    buttonText: string;
    glowColor: string;
    icon: React.ElementType;
    iconColor: string;
    priceColor: string;
    checkColor: string;
}> = {
    Basic: {
        gradientBorder: "linear-gradient(135deg, #a1a1aa 0%, #71717a 40%, #d4d4d8 70%, #a1a1aa 100%)",
        cardBg: "linear-gradient(160deg, #141418 0%, #1a1a22 100%)",
        badgeBg: "linear-gradient(90deg, #a1a1aa, #d4d4d8)",
        badgeText: "#0f0f12",
        buttonBg: "linear-gradient(135deg, #71717a, #a1a1aa)",
        buttonText: "#ffffff",
        glowColor: "rgba(161,161,170,0.25)",
        icon: ZapIcon,
        iconColor: "#a1a1aa",
        priceColor: "#d4d4d8",
        checkColor: "#a1a1aa",
    },
    Pro: {
        gradientBorder: "linear-gradient(135deg, #f5c842 0%, #e6a817 30%, #fff2b2 55%, #c98b0a 80%, #f5c842 100%)",
        cardBg: "linear-gradient(160deg, #16120a 0%, #1e1607 50%, #16120a 100%)",
        badgeBg: "linear-gradient(90deg, #f5c842, #e6a817, #f5c842)",
        badgeText: "#1a0f00",
        buttonBg: "linear-gradient(135deg, #e6a817, #f5c842, #c98b0a)",
        buttonText: "#1a0f00",
        glowColor: "rgba(230,168,23,0.35)",
        icon: CrownIcon,
        iconColor: "#f5c842",
        priceColor: "#f5c842",
        checkColor: "#f5c842",
    },
    Enterprise: {
        gradientBorder: "linear-gradient(135deg, #7c3aed 0%, #9d4edd 40%, #c084fc 65%, #7c3aed 100%)",
        cardBg: "linear-gradient(160deg, #0d0a1a 0%, #130e24 100%)",
        badgeBg: "linear-gradient(90deg, #7c3aed, #c084fc)",
        badgeText: "#ffffff",
        buttonBg: "linear-gradient(135deg, #7c3aed, #9d4edd)",
        buttonText: "#ffffff",
        glowColor: "rgba(124,58,237,0.3)",
        icon: SparklesIcon,
        iconColor: "#c084fc",
        priceColor: "#c084fc",
        checkColor: "#a855f7",
    },
};

function formatINR(amount: number) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(amount);
}

export default function PricingSection() {
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const handleBuy = async (plan: IPricing) => {
        if (!isLoggedIn) {
            toast.error("Please login to purchase a plan");
            navigate("/login");
            return;
        }

        try {
            setLoadingPlan(plan.name);
            const { data } = await api.post("/api/payment/create-checkout-session", {
                planName: plan.name,
                price: plan.price,
                priceId: plan.priceId,
            });

            if (data.url) {
                window.location.href = data.url;  // Redirect to Stripe Checkout
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Payment failed. Please try again.");
        } finally {
            setLoadingPlan(null);
        }
    };

    return (
        <div id="pricing" className="px-4 md:px-16 lg:px-24 xl:px-32 relative">
            {/* Background accent */}
            <div
                className="absolute -z-10 left-1/2 -translate-x-1/2 top-0 w-[600px] h-[200px] blur-[120px] opacity-20 rounded-full pointer-events-none"
                style={{ background: "linear-gradient(90deg, #f5c842, #c084fc, #f5c842)" }}
            />

            <SectionTitle
                text1="Pricing"
                text2="Choose Your Plan"
                text3="Unlock the power of AI thumbnails. Cancel anytime."
            />

            {/* Royal divider */}
            <div className="royal-divider max-w-sm mx-auto mt-2 mb-16 opacity-60" />

            <div className="flex flex-wrap items-stretch justify-center gap-8 mt-4">
                {pricingData.map((plan: IPricing, index: number) => {
                    const cfg = planConfig[plan.name] ?? planConfig["Basic"];
                    const IconComponent = cfg.icon;
                    const isLoading = loadingPlan === plan.name;

                    return (
                        <motion.div
                            key={index}
                            className="relative"
                            style={{ padding: "1px", borderRadius: "20px", background: cfg.gradientBorder }}
                            initial={{ y: 80, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15, type: "spring", stiffness: 280, damping: 60 }}
                        >
                            {/* Glow layer */}
                            <div
                                className="absolute inset-0 rounded-[20px] blur-xl -z-10 opacity-60"
                                style={{ background: cfg.glowColor }}
                            />

                            {/* Card inner */}
                            <div
                                className="gold-shimmer flex flex-col w-72 rounded-[19px] px-7 pt-7 pb-8 h-full"
                                style={{ background: cfg.cardBg }}
                            >
                                {/* Most Popular badge */}
                                {plan.mostPopular && (
                                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                                        <span
                                            className="px-4 py-1 text-xs font-bold rounded-full tracking-wide shadow-lg"
                                            style={{ background: cfg.badgeBg, color: cfg.badgeText }}
                                        >
                                            ✦ MOST POPULAR
                                        </span>
                                    </div>
                                )}

                                {/* Header */}
                                <div className="flex items-center gap-3 mb-5">
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                        style={{ background: `${cfg.glowColor}` }}
                                    >
                                        <IconComponent className="size-5" style={{ color: cfg.iconColor }} />
                                    </div>
                                    <h3
                                        className="text-lg font-bold tracking-wide"
                                        style={{ color: cfg.priceColor }}
                                    >
                                        {plan.name}
                                    </h3>
                                </div>

                                {/* Price */}
                                <div className="mb-6">
                                    <p
                                        className="text-4xl font-extrabold leading-none"
                                        style={{ color: cfg.priceColor }}
                                    >
                                        {formatINR(plan.price)}
                                    </p>
                                    <p className="text-zinc-500 text-xs mt-1">per {plan.period} · billed monthly</p>
                                </div>

                                {/* Divider */}
                                <div className="h-px mb-5 opacity-30" style={{ background: cfg.gradientBorder }} />

                                {/* Features */}
                                <ul className="space-y-2.5 flex-1 mb-7">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2.5">
                                            <CheckIcon
                                                className="size-4 mt-0.5 shrink-0"
                                                style={{ color: cfg.checkColor }}
                                            />
                                            <span className="text-zinc-300 text-sm leading-snug">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA Button */}
                                <button
                                    onClick={() => handleBuy(plan)}
                                    disabled={isLoading}
                                    className="w-full py-3 rounded-xl font-bold tracking-wide text-sm transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed hover:brightness-110 hover:shadow-lg"
                                    style={{
                                        background: cfg.buttonBg,
                                        color: cfg.buttonText,
                                        boxShadow: `0 4px 20px ${cfg.glowColor}`,
                                    }}
                                >
                                    {isLoading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <span className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                            Processing...
                                        </span>
                                    ) : (
                                        `Get ${plan.name} →`
                                    )}
                                </button>

                                {plan.mostPopular && (
                                    <p className="text-center text-xs mt-3 opacity-50" style={{ color: cfg.priceColor }}>
                                        ✦ Secure payment via Stripe
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Trust badges */}
            <motion.div
                className="flex flex-wrap items-center justify-center gap-6 mt-14 text-xs text-zinc-500"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
            >
                <span className="flex items-center gap-1.5">🔒 Secure Stripe Checkout</span>
                <span className="flex items-center gap-1.5">🇮🇳 Prices in Indian Rupees</span>
                <span className="flex items-center gap-1.5">↩ Cancel anytime</span>
                <span className="flex items-center gap-1.5">💳 All major cards accepted</span>
            </motion.div>
        </div>
    );
}