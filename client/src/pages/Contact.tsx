import { motion } from "motion/react";
import SoftBackdrop from "../components/SoftBackdrop";
import { MailIcon, PhoneIcon, MapPinIcon, MessageCircleIcon, ArrowRightIcon } from "lucide-react";

const contactItems = [
    { icon: MailIcon, title: "Email Us", desc: "Our team replies within 24 hours", value: "support@thumblify.ai" },
    { icon: PhoneIcon, title: "Call Us", desc: "Mon–Fri, 9am – 6pm IST", value: "+91 98765 43210" },
    { icon: MapPinIcon, title: "Visit Us", desc: "Come say hello at our HQ", value: "Bangalore, Karnataka, India" },
];

const faqs = [
    { q: "Is there a free plan?", a: "Yes! You can generate up to 5 thumbnails for free each month with no credit card required." },
    { q: "What formats can I export?", a: "Thumbnails are exported in high-resolution PNG and JPG formats, optimised for YouTube, Spotify, and social media." },
    { q: "Can I cancel anytime?", a: "Absolutely. All our plans are monthly and you can cancel with a single click at any time." },
    { q: "Do you offer team plans?", a: "Yes, our Enterprise plan supports multiple seats with shared brand kits and team collaboration tools." },
];

/* ── CYAN accent ─────────────────────────── */
const C = "#06b6d4";
const CB = "rgba(6,182,212,0.22)";

export default function Contact() {
    const inputStyle: React.CSSProperties = {
        background: "rgba(0,18,22,0.85)",
        border: `1px solid ${CB}`,
        color: "#f4f4f5",
        borderRadius: "12px",
    };
    const focus = (e: React.FocusEvent<HTMLElement>) => (e.currentTarget.style.border = "1px solid rgba(34,211,238,0.55)");
    const blur = (e: React.FocusEvent<HTMLElement>) => (e.currentTarget.style.border = `1px solid ${CB}`);

    return (
        <>
            <SoftBackdrop />
            <div className="min-h-screen pt-32 pb-24 px-6 md:px-16 lg:px-24 xl:px-32">

                {/* Cyan glow */}
                <div className="absolute top-40 right-1/4 -z-10 w-80 h-80 rounded-full blur-[200px] opacity-10 pointer-events-none"
                    style={{ background: C }} />

                {/* Hero */}
                <motion.div className="text-center max-w-2xl mx-auto mb-20"
                    initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 240, damping: 60 }}>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-bold tracking-widest uppercase"
                        style={{ background: "rgba(6,182,212,0.1)", border: `1px solid ${CB}`, color: C }}>
                        <MessageCircleIcon className="size-3.5" /> Get In Touch
                    </div>
                    <h1 className="text-5xl font-extrabold mb-5 leading-tight"
                        style={{
                            background: "linear-gradient(135deg, #ffffff 0%, #67e8f9 40%, #d4d4d8 70%, #ffffff 100%)",
                            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                        }}>
                        We'd Love to<br />Hear From You
                    </h1>
                    <p className="text-base" style={{ color: "#a1a1aa" }}>
                        Questions? Feedback? Partnership ideas? Drop us a line and we'll get back ASAP.
                    </p>
                </motion.div>

                {/* Cyan divider */}
                <div className="divider-cyan max-w-xs mx-auto mb-20 opacity-60" />

                {/* Contact Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
                    {contactItems.map((item, i) => (
                        <motion.div key={i}
                            className="text-center p-7 rounded-2xl card-shimmer transition-all"
                            style={{ background: "linear-gradient(160deg, #00141a, #00181f)", border: `1px solid ${CB}` }}
                            initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}
                            transition={{ delay: i * 0.1, type: "spring", stiffness: 280, damping: 70 }}
                            onMouseEnter={e => (e.currentTarget.style.border = "1px solid rgba(34,211,238,0.5)")}
                            onMouseLeave={e => (e.currentTarget.style.border = `1px solid ${CB}`)}>
                            <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
                                style={{ background: "rgba(6,182,212,0.1)", border: `1px solid ${CB}` }}>
                                <item.icon className="size-5" style={{ color: C }} />
                            </div>
                            <h3 className="font-bold text-sm mb-1" style={{ color: C }}>{item.title}</h3>
                            <p className="text-xs mb-2" style={{ color: "#71717a" }}>{item.desc}</p>
                            <p className="text-sm font-medium" style={{ color: "#d4d4d8" }}>{item.value}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Form — CYAN border card */}
                <motion.div className="max-w-2xl mx-auto mb-28 p-px rounded-3xl"
                    style={{ background: "linear-gradient(135deg, #06b6d4, #a1a1aa 50%, #06b6d4)" }}
                    initial={{ y: 60, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}>
                    <div className="rounded-[23px] px-8 py-10"
                        style={{ background: "linear-gradient(160deg, #00141a, #001a20)" }}>
                        <h2 className="text-2xl font-extrabold mb-6"
                            style={{
                                background: "linear-gradient(135deg, #ffffff, #67e8f9)",
                                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                            }}>
                            Send a Message
                        </h2>
                        <form onSubmit={e => e.preventDefault()} className="space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    { name: "name", type: "text", placeholder: "Your full name" },
                                    { name: "email", type: "email", placeholder: "your@email.com" },
                                ].map(field => (
                                    <input key={field.name} type={field.type} name={field.name} placeholder={field.placeholder}
                                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                                        style={inputStyle}
                                        onFocus={focus} onBlur={blur}
                                    />
                                ))}
                            </div>
                            <input type="text" name="subject" placeholder="Subject"
                                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                                style={inputStyle} onFocus={focus} onBlur={blur} />
                            <textarea name="message" rows={5} placeholder="Tell us how we can help you..."
                                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all"
                                style={inputStyle} onFocus={focus} onBlur={blur} />

                            {/* CYAN button */}
                            <button type="submit"
                                className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm text-white transition-all active:scale-95 hover:brightness-110"
                                style={{ background: "linear-gradient(135deg, #0891b2, #06b6d4, #22d3ee)", boxShadow: "0 4px 20px rgba(6,182,212,0.35)" }}>
                                Send Message <ArrowRightIcon className="size-4" />
                            </button>
                        </form>
                    </div>
                </motion.div>

                {/* FAQ */}
                <div className="max-w-3xl mx-auto">
                    <motion.div className="text-center mb-12"
                        initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}>
                        <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: C }}>✦ FAQ ✦</p>
                        <h2 className="text-3xl font-extrabold"
                            style={{
                                background: "linear-gradient(135deg, #ffffff, #67e8f9, #d4d4d8)",
                                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                            }}>
                            Frequently Asked Questions
                        </h2>
                    </motion.div>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <motion.div key={i} className="p-6 rounded-2xl"
                                style={{ background: "linear-gradient(160deg, #00141a, #001a20)", border: `1px solid ${CB}` }}
                                initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}
                                transition={{ delay: i * 0.1, type: "spring", stiffness: 280, damping: 70 }}>
                                <p className="font-bold text-sm mb-2" style={{ color: C }}>{faq.q}</p>
                                <p className="text-sm leading-relaxed" style={{ color: "#a1a1aa" }}>{faq.a}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
