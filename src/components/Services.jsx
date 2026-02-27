import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Crosshair, Search, Target } from 'lucide-react';
import TextReveal from './TextReveal';

const bentoItems = [
    {
        overhead: "AWARENESS TRAINING",
        title: "Crew & shore awareness programs",
        icon: <ShieldAlert className="w-6 h-6" />,
        desc: "Live or online sessions that use real-world ship, port and logistics scenarios to teach your people how to spot, avoid and report cyber threats.",
        bullets: [
            "Modules on phishing, USB/media, passwords, social engineering.",
            "Separate tracks for onboard crew and office staff.",
            "Short reference guides and checklists after each session."
        ],
        footer: "Ideal as a first step to meet modern maritime cyber requirements and build a safety-first cyber culture.",
        iconColor: "text-blue-400",
    },
    {
        overhead: "RED TEAM LITE",
        title: "Phishing & social engineering simulations",
        icon: <Crosshair className="w-6 h-6" />,
        desc: "Controlled \"red team\"-style campaigns that safely emulate real attacker tactics against your crew and staff, without impacting operations.",
        bullets: [
            "Scenario-based emails themed around voyages, port calls and cargo.",
            "Click-rate and reporting-rate analytics with clear visuals.",
            "Targeted follow-up training where people struggle most."
        ],
        footer: "Turn awareness into measurable behavior change with periodic tests instead of one-off training.",
        iconColor: "text-blue-400",
    },
    {
        overhead: "ADVISORY ADD-ON",
        title: "Baseline cyber hygiene review",
        icon: <Search className="w-6 h-6" />,
        desc: "A lightweight review of your current practices around accounts, devices, backups and access to ship and shore systems, tuned to your size and risk profile.",
        bullets: [
            "High-level review of account and password practices.",
            "Quick wins for securing email, remote access and shared devices.",
            "Prioritized 30-, 60- and 90-day action list for management."
        ],
        footer: "Best bundled with training and simulations to give leadership a clear, practical roadmap.",
        iconColor: "text-blue-400",
    }
];

const tags = [
    "Crew & officer awareness",
    "Office & shore staff",
    "Phishing simulations",
    "Actionable management reporting"
];

export default function Services() {
    return (
        <section id="services" className="relative z-10 py-24 pb-32">
            <div className="w-full px-4 md:px-8 xl:px-16 mx-auto relative z-10 max-w-[1700px]">

                {/* Centered Header Section matching new design */}
                <div className="text-center mb-16 max-w-4xl mx-auto flex flex-col items-center">
                    <div className="inline-block bg-[#0070f3] rounded-full px-5 py-2 text-[11px] md:text-xs font-bold tracking-widest uppercase text-white mb-8 shadow-md shadow-blue-500/20">
                        Capabilities
                    </div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl lg:text-[64px] font-display text-white mt-2 mb-6 font-medium tracking-tight leading-none"
                    >
                        Services tailored to the maritime world
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 text-lg md:text-xl leading-relaxed mb-8 max-w-3xl mx-auto"
                    >
                        Allegorix combines cyber awareness training with controlled red team exercises, so your people learn how attacks really look and how to respond calmly and correctly.
                    </motion.p>

                    <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-2">
                        {tags.map((tag, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="px-5 py-2 rounded-full bg-[#0f172a] border border-[#1e293b] text-slate-300 text-xs md:text-sm shadow-sm transition-colors cursor-default"
                            >
                                {tag}
                            </motion.span>
                        ))}
                    </div>
                </div>

                {/* Grid of glowing cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 xl:gap-16 relative z-20">
                    {bentoItems.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: 0.1 * idx }}
                            className="relative group p-8 lg:p-10 rounded-[1.5rem] bg-[#050b14] border border-[#1e293b] hover:border-[#2563eb]/50 transition-all duration-500 shadow-[0_4px_20px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col h-full"
                        >
                            {/* Top subtle blue rim light */}
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#3b82f6] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            {/* Inner glow effect */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#2563eb]/20 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                            {/* Icon Container with Overhead */}
                            <div className="flex items-center gap-4 mb-8 relative z-10">
                                <div className={`w-12 h-12 rounded-xl bg-[#0f172a] border border-[#1e293b] flex items-center justify-center group-hover:bg-[#1e3a8a]/20 group-hover:border-[#3b82f6]/30 transition-colors duration-500 ${item.iconColor}`}>
                                    {item.icon}
                                </div>
                                <span className="text-xs font-bold tracking-widest text-[#3b82f6] transition-colors uppercase">{item.overhead}</span>
                            </div>

                            <div className="relative z-10 flex-1">
                                <h3 className="text-xl md:text-2xl font-display font-medium mb-4 text-white leading-snug">
                                    {item.title}
                                </h3>
                                <p className="text-slate-400 text-sm md:text-base leading-relaxed group-hover:text-slate-300 transition-colors duration-500 mb-8">
                                    {item.desc}
                                </p>

                                <ul className="space-y-4 mb-8">
                                    {item.bullets.map((bullet, bIdx) => (
                                        <li key={bIdx} className="flex items-start gap-4 text-slate-400 text-sm md:text-base leading-snug group-hover:text-slate-300 transition-colors duration-500">
                                            <Target className="w-5 h-5 mt-0.5 shrink-0 text-[#2563eb]" />
                                            <span>{bullet}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="pt-6 pb-2 border-t border-[#1e293b] mt-auto relative z-10">
                                <p className="pl-2 md:pl-4 text-sm md:text-base text-slate-300 leading-relaxed font-medium transition-colors duration-500">
                                    {item.footer}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
