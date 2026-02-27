import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TextReveal from './TextReveal';
import MagneticButton from './MagneticButton';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    const glowRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!glowRef.current) return;
            const x = e.clientX;
            const y = e.clientY;
            glowRef.current.animate({
                background: `radial-gradient(1000px circle at ${x}px ${y}px, rgba(29, 78, 216, 0.15), transparent 60%)`
            }, { duration: 3000, fill: "forwards" });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-[50svh] flex items-center justify-center overflow-hidden py-20 md:py-32" id="home">
            <div
                ref={glowRef}
                className="absolute inset-0 pointer-events-none z-0"
                style={{ background: 'radial-gradient(1000px circle at 50% 50%, rgba(29, 78, 216, 0.1), transparent 60%)' }}
            />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGgwNHY0MEgwem00MCAwaC00djQwSDQweiIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAxKSIvPjwvc3ZnPg==')] opacity-30 z-0 mask-image:linear-gradient(to_bottom,black,transparent)]" />

            <motion.div className="container relative z-10 flex flex-col items-center text-center px-4 md:px-6 mt-16 md:mt-0" style={{ y: yText, opacity: opacityText }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/10 backdrop-blur-md mb-6 md:mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] animate-pulse" />
                    <span className="text-xs md:text-sm font-medium text-cyan-50">Zero-Friction SecOps Pipeline</span>
                </motion.div>

                <TextReveal el="h2" text="Unprecedented Visibility." className="text-4xl sm:text-5xl md:text-6xl font-display text-slate-100 mb-4 tracking-tight leading-tight" />

                <TextReveal delay={2} el="p" text="Every maritime asset, mapped and monitored. We bring your entire dynamic surface into blinding focus." className="text-lg md:text-xl lg:text-2xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed px-2" />

                <motion.div className="mt-10 md:mt-14 scale-90 md:scale-100" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.8 }}>
                    <MagneticButton>
                        Initialize Assessment
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </MagneticButton>
                </motion.div>
            </motion.div>

            <motion.div
                animate={{ rotate: [0, 90, 180], scale: [1, 1.1, 1] }}
                transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                className="absolute -bottom-1/4 -right-1/4 w-[800px] h-[800px] border border-blue-500/10 rounded-full border-dashed pointer-events-none opacity-50 mix-blend-screen"
            />
        </section>
    );
}
