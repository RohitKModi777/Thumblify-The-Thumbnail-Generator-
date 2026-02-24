import SectionTitle from "../components/SectionTitle";
import TestimonialCard from "../components/TestimonialCard";
import { testimonialsData } from "../data/testimonial";
import type { ITestimonial } from "../types";
import Marquee from "react-fast-marquee";

export default function TestimonialSection() {
    return (
        <div id="testimonials" className="px-4 md:px-16 lg:px-24 xl:px-32">
            <SectionTitle
                text1="Testimonials"
                text2="Loved by Creators"
                text3="See how our AI thumbnails are helping channels explode their views."
            />
            {/* Royal divider */}
            <div className="royal-divider max-w-xs mx-auto mt-4 mb-10 opacity-50" />

            <Marquee className="max-w-5xl mx-auto" gradient={true} speed={28} gradientColor="#06050d">
                <div className="flex items-center justify-center py-5">
                    {[...testimonialsData, ...testimonialsData].map((testimonial: ITestimonial, index: number) => (
                        <TestimonialCard key={index} index={index} testimonial={testimonial} />
                    ))}
                </div>
            </Marquee>
            <Marquee className="max-w-5xl mx-auto" gradient={true} speed={28} direction="right" gradientColor="#06050d">
                <div className="flex items-center justify-center py-5">
                    {[...testimonialsData, ...testimonialsData].map((testimonial: ITestimonial, index: number) => (
                        <TestimonialCard key={index} index={index} testimonial={testimonial} />
                    ))}
                </div>
            </Marquee>
        </div>
    );
}