import { footerData } from "../data/footer";
import { DribbbleIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from "lucide-react";
import { motion } from "motion/react";
import type { IFooterLink } from "../types";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer
            className="mt-40 pt-14 pb-8 px-6 md:px-16 lg:px-24 xl:px-32"
            style={{
                borderTop: "1px solid rgba(200,158,40,0.2)",
                background: "linear-gradient(180deg, transparent 0%, rgba(200,158,40,0.03) 100%)",
            }}
        >
            <div className="flex flex-wrap justify-center md:justify-between gap-10 md:gap-20">
                {/* Left: logo + links */}
                <motion.div
                    className="flex flex-wrap items-start gap-10 md:gap-32"
                    initial={{ x: -150, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 280, damping: 70 }}
                >
                    <Link to="/">
                        <img className="h-8 w-auto" src="/favicon.svg" alt="footer logo" width={32} height={32} />
                    </Link>
                    {footerData.map((section, index) => (
                        <div key={index}>
                            <p
                                className="font-bold text-sm uppercase tracking-wider mb-3"
                                style={{ color: "#f5c842", letterSpacing: "0.1em" }}
                            >
                                {section.title}
                            </p>
                            <ul className="space-y-2">
                                {section.links.map((link: IFooterLink, i: number) => (
                                    <li key={i}>
                                        <Link
                                            to={link.href}
                                            className="text-sm transition-all duration-200 hover:translate-x-0.5"
                                            style={{ color: "#71717a" }}
                                            onMouseEnter={e => (e.currentTarget.style.color = "#f5c842")}
                                            onMouseLeave={e => (e.currentTarget.style.color = "#71717a")}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </motion.div>

                {/* Right: tagline + socials */}
                <motion.div
                    className="flex flex-col max-md:items-center max-md:text-center gap-3 items-end"
                    initial={{ x: 150, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 280, damping: 70 }}
                >
                    <p className="max-w-56 text-sm leading-relaxed" style={{ color: "#71717a" }}>
                        Making every creator feel like royalty — no matter the size of your audience.
                    </p>
                    <div className="flex items-center gap-4 mt-1">
                        {[
                            { Icon: DribbbleIcon, href: "https://dribbble.com/prebuiltui" },
                            { Icon: LinkedinIcon, href: "https://www.linkedin.com/company/prebuiltui" },
                            { Icon: TwitterIcon, href: "https://x.com/prebuiltui" },
                            { Icon: YoutubeIcon, href: "https://www.youtube.com/@prebuiltui" },
                        ].map(({ Icon, href }, i) => (
                            <a
                                key={i}
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                className="transition-all duration-200"
                                style={{ color: "#52525b" }}
                                onMouseEnter={e => (e.currentTarget.style.color = "#f5c842")}
                                onMouseLeave={e => (e.currentTarget.style.color = "#52525b")}
                            >
                                <Icon className="size-5" />
                            </a>
                        ))}
                    </div>
                    <p className="text-xs mt-2" style={{ color: "#52525b" }}>
                        © {new Date().getFullYear()}{" "}
                        <a href="https://thumblify.ai" style={{ color: "#a1a1aa" }}>Thumblify</a>.
                        All rights reserved.
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}