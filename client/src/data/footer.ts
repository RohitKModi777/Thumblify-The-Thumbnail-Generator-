import type { IFooter } from "../types";

export const footerData: IFooter[] = [
    {
        title: "Product",
        links: [
            { name: "Home", href: "/" },
            { name: "Generate", href: "/generate" },
            { name: "Pricing", href: "#pricing" },
            { name: "Affiliate", href: "#affiliate" },
        ]
    },
    {
        title: "Company",
        links: [
            { name: "About", href: "/about" },
            { name: "Contact Us", href: "/contact" },
            { name: "Community", href: "#community" },
            { name: "Careers", href: "#careers" },
        ]
    },
    {
        title: "Legal",
        links: [
            { name: "Privacy Policy", href: "#privacy" },
            { name: "Terms of Service", href: "#terms" },
        ]
    }
];