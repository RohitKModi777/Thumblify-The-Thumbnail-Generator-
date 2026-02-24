import { motion } from "motion/react";
import type { TestimonialCardProps } from "../types";
import { StarIcon } from "lucide-react";

export default function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
    return (
        <motion.div
            className="p-4 rounded-xl mx-4 w-72 shrink-0 gold-shimmer"
            style={{
                background: "linear-gradient(160deg, #0f0c1f 0%, #130e24 100%)",
                border: "1px solid rgba(200,158,40,0.18)",
                boxShadow: "0 4px 24px -8px rgba(200,158,40,0.12)",
            }}
            initial={{ y: 150, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, type: "spring", stiffness: 320, damping: 70 }}
        >
            {/* Stars */}
            <div className="flex items-center gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="size-3 fill-amber-400 text-amber-400" />
                ))}
            </div>

            <p className="text-sm leading-relaxed mb-4" style={{ color: "#a1a1aa" }}>
                "{testimonial.quote}"
            </p>

            <div className="flex gap-3 items-center pt-3" style={{ borderTop: "1px solid rgba(200,158,40,0.12)" }}>
                <img
                    className="size-9 rounded-full"
                    style={{ border: "1.5px solid rgba(200,158,40,0.35)" }}
                    src={testimonial.image}
                    alt={testimonial.name}
                    height={36} width={36}
                />
                <div>
                    <p className="text-sm font-medium" style={{ color: "#f5c842" }}>{testimonial.name}</p>
                    <span className="text-xs" style={{ color: "#71717a" }}>{testimonial.handle}</span>
                </div>
            </div>
        </motion.div>
    );
}