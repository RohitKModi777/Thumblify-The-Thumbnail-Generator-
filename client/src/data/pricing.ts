import type { IPricing } from "../types";

export const pricingData: IPricing[] = [
    {
        name: "Basic",
        price: 24,
        period: "month",
        priceId: "price_basic_sandbox",    // Replace with your Stripe sandbox price ID
        features: [
            "50 AI Thumbnails/month",
            "Basic Templates",
            "Standard Resolution",
            "No Watermark",
            "Email support"
        ],
        mostPopular: false
    },
    {
        name: "Pro",
        price: 99,
        period: "month",
        priceId: "price_pro_sandbox",      // Replace with your Stripe sandbox price ID
        features: [
            "Unlimited AI thumbnails",
            "Premium Templates",
            "4K Resolution",
            "A/B Testing Tools",
            "Priority support",
            "Custom Fonts",
            "Brand Kit Analysis"
        ],
        mostPopular: true
    },
    {
        name: "Enterprise",
        price: 150,
        period: "month",
        priceId: "price_enterprise_sandbox", // Replace with your Stripe sandbox price ID
        features: [
            "Everything in Pro",
            "API Access",
            "Team Collaboration",
            "Custom Branding",
            "Dedicated Account Manager",
        ],
        mostPopular: false
    }
];