import React from 'react';
import { motion } from 'framer-motion';
import TextReveal from './TextReveal';

export default function About() {
    return (
        <section id="about" className="section relative z-10 py-16 md:py-24">
            <div className="max-w-[1600px] w-full px-4 md:px-8 xl:px-16 mx-auto relative z-10">
                <div className="glass bg-white/5 backdrop-blur-xl rounded-[2rem] border border-cyan-500/30 p-8 md:p-16 mb-16 md:mb-24 relative overflow-visible shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:shadow-[0_0_40px_rgba(6,182,212,0.25)] hover:border-cyan-400/50 transition-all duration-500">
                    <div className="absolute -top-5 left-8 md:left-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full px-6 py-2 text-xs md:text-sm font-bold tracking-widest uppercase text-white shadow-[0_0_15px_rgba(6,182,212,0.5)] border border-cyan-300/30">
                        About Us
                    </div>

                    <div className="mb-4 max-w-[1200px]">
                        <TextReveal
                            text="About Allegorix"
                            el="h2"
                            className="text-3xl md:text-5xl lg:text-6xl font-display text-white mt-4 mb-6 font-bold tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                        />
                        <p className="text-slate-200 text-base md:text-xl leading-relaxed font-medium drop-shadow-sm">
                            Allegorix is founded by a cybersecurity analyst and educator who specializes in
                            hands-on training and realistic simulations, with a growing focus on the maritime
                            domain.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 relative z-20 -mt-8 md:-mt-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="group glass bg-white/5 backdrop-blur-xl border border-blue-500/20 hover:bg-white/10 hover:border-blue-400/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] rounded-[2rem] p-6 lg:p-10 flex flex-col transition-all duration-500 hover:-translate-y-4"
                    >
                        <h3 className="text-xl md:text-2xl font-display font-bold mb-4 md:mb-6 text-white leading-tight drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]">
                            Why marine cyber?
                        </h3>
                        <div className="text-slate-200 text-base md:text-lg leading-relaxed font-medium space-y-4">
                            <p>
                                Ships, ports and logistics operations are rapidly digitizing. At the same
                                time, many crews and shore teams are still given generic IT training
                                that ignores the unique realities of life at sea or in port.
                            </p>
                            <p>
                                Allegorix exists to close that gap. We bring targeted awareness and
                                safe attack simulations into your existing safety culture, so cyber risk is
                                managed with the same seriousness as physical risk.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="group glass bg-white/5 backdrop-blur-xl border border-purple-500/20 hover:bg-white/10 hover:border-purple-400/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] rounded-[2rem] p-6 lg:p-10 flex flex-col transition-all duration-500 hover:-translate-y-4"
                    >
                        <h3 className="text-xl md:text-2xl font-display font-bold mb-4 md:mb-6 text-white leading-tight drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]">
                            How we work
                        </h3>
                        <div className="text-slate-200 text-base md:text-lg leading-relaxed font-medium space-y-4">
                            <p>
                                We start small, with scoped pilots and clear rules of engagement. Sessions are highly practical, built around real messages, workflows and systems your people use every day.
                            </p>
                            <p>
                                The goal is simple: fewer risky clicks, better reporting, and management visibility into where cyber risk really lives in your organization.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
