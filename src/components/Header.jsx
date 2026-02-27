import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="fixed top-0 w-full z-40 px-6 py-6 md:px-12 flex justify-between items-center mix-blend-difference">
            <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold tracking-tight z-50 mix-blend-difference" onClick={closeMenu}>
                <ShieldCheck className="text-blue-500 w-6 h-6" />
                <span className="text-white">Allegorix</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-[#c3a07a]">
                <a href="/#about" className="relative hover:text-amber-300 hover:drop-shadow-[0_0_8px_rgba(252,211,77,0.8)] transition-all duration-300">Platform</a>
                <a href="/#services" className="relative hover:text-amber-300 hover:drop-shadow-[0_0_8px_rgba(252,211,77,0.8)] transition-all duration-300">Services</a>
                <Link to="/who-we-help" className="relative hover:text-amber-300 hover:drop-shadow-[0_0_8px_rgba(252,211,77,0.8)] transition-all duration-300">Who We Help</Link>
                <Link to="/about-founder" className="relative hover:text-amber-300 hover:drop-shadow-[0_0_8px_rgba(252,211,77,0.8)] transition-all duration-300">About the Founder</Link>
                <a href="/#contact" className="relative hover:text-amber-300 hover:drop-shadow-[0_0_8px_rgba(252,211,77,0.8)] transition-all duration-300">Contact</a>
            </nav>

            {/* Mobile Menu Toggle button */}
            <button
                className="md:hidden z-50 text-white p-2 flex items-center justify-center mix-blend-difference"
                onClick={toggleMenu}
                aria-label="Toggle mobile menu"
            >
                {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>

            {/* Mobile Navigation Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-0 z-40 bg-[#020617]/95 backdrop-blur-xl flex flex-col items-center justify-center min-h-screen"
                    >
                        <nav className="flex flex-col items-center gap-8 font-medium text-xl text-slate-100">
                            <a href="/#about" onClick={closeMenu} className="hover:text-amber-300 transition-colors">Platform</a>
                            <a href="/#services" onClick={closeMenu} className="hover:text-amber-300 transition-colors">Services</a>
                            <Link to="/who-we-help" onClick={closeMenu} className="hover:text-amber-300 transition-colors">Who We Help</Link>
                            <Link to="/about-founder" onClick={closeMenu} className="hover:text-amber-300 transition-colors">About the Founder</Link>
                            <a href="/#contact" onClick={closeMenu} className="hover:text-amber-300 transition-colors">Contact</a>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
