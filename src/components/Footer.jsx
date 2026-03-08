import React from 'react';
import { Mail, Youtube, Instagram, Github, Phone } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="section mt-24 text-center py-20 relative overflow-hidden bg-black/20 backdrop-blur-xl border-t border-white/5" id="contact">
            <div className="container relative z-10 flex flex-col items-center gap-10 glass p-12 max-w-6xl mx-auto rounded-[3rem] border border-white/10 bg-white/5">
                <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-wide">Contact</h2>

                <div className="flex flex-col md:flex-row flex-wrap justify-center gap-10 md:gap-16 w-full mt-4">
                    <a href="mailto:ceo@allegorix.com" className="flex flex-col items-center gap-3 text-slate-300 hover:text-[#3b82f6] transition-all hover:-translate-y-1">
                        <div className="p-4 rounded-full bg-white/5 border border-white/10 group-hover:border-[#3b82f6]/50">
                            <Mail className="w-7 h-7" />
                        </div>
                        <span className="text-base font-medium">ceo@allegorix.com</span>
                    </a>

                    <a href="https://www.youtube.com/@Allegorix1" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 text-slate-300 hover:text-red-500 transition-all hover:-translate-y-1">
                        <div className="p-4 rounded-full bg-white/5 border border-white/10">
                            <Youtube className="w-7 h-7" />
                        </div>
                        <span className="text-base font-medium text-center">www.youtube.com/<br />@Allegorix1</span>
                    </a>

                    <a href="https://www.instagram.com/allegorix1/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 text-slate-300 hover:text-pink-500 transition-all hover:-translate-y-1">
                        <div className="p-4 rounded-full bg-white/5 border border-white/10">
                            <Instagram className="w-7 h-7" />
                        </div>
                        <span className="text-base font-medium">@allegorix1</span>
                    </a>

                    <a href="https://github.com/allegorix" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 text-slate-300 hover:text-white transition-all hover:-translate-y-1">
                        <div className="p-4 rounded-full bg-white/5 border border-white/10">
                            <Github className="w-7 h-7" />
                        </div>
                        <span className="text-base font-medium">allegorix</span>
                    </a>

                    <a href="tel:+917012291144" className="flex flex-col items-center gap-3 text-slate-300 hover:text-green-400 transition-all hover:-translate-y-1">
                        <div className="p-4 rounded-full bg-white/5 border border-white/10">
                            <Phone className="w-7 h-7" />
                        </div>
                        <span className="text-base font-medium">+91 7012291144</span>
                    </a>
                </div>

                <p className="text-slate-500 text-sm mt-8">&copy; 2026 Allegorix. Built with precision and momentum.</p>
            </div>
        </footer>
    );
}
