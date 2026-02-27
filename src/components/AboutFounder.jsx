import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './AboutFounder.css';

gsap.registerPlugin(ScrollTrigger);

export default function AboutFounder() {
    const containerRef = useRef(null);
    const cursorDotRef = useRef(null);
    const cursorOutlineRef = useRef(null);
    const spotlightRef = useRef(null);

    const [loadingProgress, setLoadingProgress] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        // Loading Bar simulation
        setLoadingProgress(100);
        const timer = setTimeout(() => {
            const loadingBar = document.getElementById('loadingBar');
            if (loadingBar) loadingBar.style.opacity = '0';
        }, 500);

        // Custom Cursor & Spotlight
        const handleMouseMove = (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            if (cursorDotRef.current) {
                cursorDotRef.current.style.left = `${posX}px`;
                cursorDotRef.current.style.top = `${posY}px`;
            }

            if (cursorOutlineRef.current) {
                cursorOutlineRef.current.animate({
                    left: `${posX}px`,
                    top: `${posY}px`
                }, { duration: 500, fill: "forwards" });
            }

            if (spotlightRef.current) {
                spotlightRef.current.style.left = `${posX}px`;
                spotlightRef.current.style.top = `${posY}px`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Magnetic Elements Event Listeners
        const magneticElements = document.querySelectorAll('.magnetic-element');
        const handleMagneticEnter = () => setIsHovering(true);
        const handleMagneticLeave = (e) => {
            setIsHovering(false);
            e.currentTarget.style.transform = '';
        };
        const handleMagneticMove = (e) => {
            const elem = e.currentTarget;
            const rect = elem.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            elem.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        };

        magneticElements.forEach(elem => {
            // Only attach hover effects if it's likely a desktop (coarse check)
            if (window.innerWidth > 768) {
                elem.addEventListener('mouseenter', handleMagneticEnter);
                elem.addEventListener('mouseleave', handleMagneticLeave);
                elem.addEventListener('mousemove', handleMagneticMove);
            }
        });

        // Skill Orbs Interaction
        const skillOrbs = document.querySelectorAll('.skill-orb');
        const handleOrbEnter = (e) => {
            gsap.to(e.currentTarget, { scale: 1.15, duration: 0.3, ease: "power2.out" });
        };
        const handleOrbLeave = (e) => {
            gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "power2.out" });
        };

        skillOrbs.forEach(orb => {
            if (window.innerWidth > 768) {
                orb.addEventListener('mouseenter', handleOrbEnter);
                orb.addEventListener('mouseleave', handleOrbLeave);
            }
        });

        // Touch detection
        if ('ontouchstart' in window) {
            document.body.style.cursor = 'auto';
            if (cursorDotRef.current) cursorDotRef.current.style.display = 'none';
            if (cursorOutlineRef.current) cursorOutlineRef.current.style.display = 'none';
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearTimeout(timer);

            magneticElements.forEach(elem => {
                elem.removeEventListener('mouseenter', handleMagneticEnter);
                elem.removeEventListener('mouseleave', handleMagneticLeave);
                elem.removeEventListener('mousemove', handleMagneticMove);
            });

            skillOrbs.forEach(orb => {
                orb.removeEventListener('mouseenter', handleOrbEnter);
                orb.removeEventListener('mouseleave', handleOrbLeave);
            });
        };
    }, []);

    useGSAP(() => {
        // Entrance Animations
        gsap.fromTo('#badge', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power3.out" });
        gsap.fromTo('#mainTitle', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: "power3.out" });
        gsap.fromTo('#subtitle', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: "power3.out" });
        gsap.fromTo('#profileVisual', { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1, delay: 0.8, ease: "power3.out" });
        gsap.fromTo('#bioContent', { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1, delay: 1, ease: "power3.out" });

        // Timeline Animation
        const timelineItems = gsap.utils.toArray('.timeline-item');
        timelineItems.forEach((item, index) => {
            gsap.fromTo(item,
                { opacity: 0, y: 50 },
                {
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                    },
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: (index % 2) * 0.2,
                    ease: "power3.out"
                }
            );
        });
    }, { scope: containerRef });

    return (
        <div className={`about-founder-page overflow-x-hidden ${isHovering ? 'hovering' : ''}`} ref={containerRef}>
            {/* Custom Cursor */}
            <div className="cursor-dot hidden md:block" ref={cursorDotRef}></div>
            <div className="cursor-outline hidden md:block" ref={cursorOutlineRef}></div>

            {/* Loading Bar */}
            <div className="loading-bar" id="loadingBar" style={{ width: `${loadingProgress}%` }}></div>

            {/* Spotlight Effect */}
            <div className="spotlight hidden md:block" id="spotlight" ref={spotlightRef}></div>

            {/* Background */}
            <div className="af-bg-grid"></div>

            {/* Main Content */}
            <main className="relative z-10 pt-24 md:pt-32 pb-20 px-4 md:px-6 lg:px-12 xl:px-24 font-sans w-full">
                <div className="max-w-[1600px] mx-auto w-full">
                    {/* Hero Section */}
                    <div className="text-center mb-16 md:mb-20 relative">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-cyan-500/30 mb-6 floating opacity-0" id="badge">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]"></span>
                            <span className="text-xs md:text-sm font-medium text-cyan-100">Leadership</span>
                        </div>

                        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight opacity-0" id="mainTitle">
                            <span className="text-white">About the </span>
                            <span className="text-gradient-accent italic font-light">Founder</span>
                        </h1>

                        <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed opacity-0 px-2" id="subtitle">
                            From quantum physics to cyber defense — a journey of analytical precision and relentless innovation
                        </p>
                    </div>

                    {/* Profile Section */}
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center mb-24 md:mb-32">
                        {/* Profile Image/Visual */}
                        <div className="relative opacity-0 lg:col-span-5" id="profileVisual">
                            <div className="relative w-full aspect-square max-w-sm md:max-w-md mx-auto scale-90 md:scale-100">
                                {/* Animated Rings */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-full h-full border-2 border-cyan-500/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
                                </div>
                                <div className="absolute inset-4 flex items-center justify-center">
                                    <div className="w-full h-full border-2 border-blue-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                                </div>
                                <div className="absolute inset-8 flex items-center justify-center">
                                    <div className="w-full h-full border-2 border-purple-500/20 rounded-full animate-[spin_25s_linear_infinite]"></div>
                                </div>

                                {/* Center Content */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <a
                                        href="https://alanjolly.in/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-2 border-cyan-500/30 flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer magnetic-element hover:scale-105 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:border-cyan-400 text-center p-4"
                                    >
                                        <div className="pulse-ring"></div>
                                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <span className="relative z-10 font-bold text-cyan-100 group-hover:text-white transition-colors text-[0.9rem] md:text-[1.1rem] leading-[1.2]">
                                            Visit<br />Founder<br />Portfolio
                                        </span>
                                        <svg className="w-4 h-4 md:w-5 md:h-5 text-cyan-400 relative z-10 mt-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                </div>

                                {/* Floating Elements */}
                                <div className="absolute top-4 right-4 md:top-10 md:right-10 w-12 h-12 md:w-16 md:h-16 rounded-lg bg-slate-800/80 border border-cyan-500/20 flex items-center justify-center floating" style={{ animationDelay: '0.5s' }}>
                                    <svg className="w-6 h-6 md:w-8 md:h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                    </svg>
                                </div>
                                <div className="absolute bottom-4 left-4 md:bottom-10 md:left-10 w-12 h-12 md:w-16 md:h-16 rounded-lg bg-slate-800/80 border border-blue-500/20 flex items-center justify-center floating" style={{ animationDelay: '1s' }}>
                                    <svg className="w-6 h-6 md:w-8 md:h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Bio Content */}
                        <div className="space-y-6 md:space-y-8 opacity-0 lg:col-span-7" id="bioContent">
                            <div className="quote-block magnetic-element">
                                <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 leading-relaxed relative z-10 pl-6 md:pl-8">
                                    Physics graduate turned cybersecurity specialist with <span className="text-cyan-400 font-semibold">8+ years of experience</span> (5 in network engineering, 3 in cybersecurity). I leverage analytical thinking and hands-on expertise to lead complex projects, solve challenging problems, and deliver results. Adaptable, persistent, and committed to continuous learning and excellence.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-8 md:mt-12">
                                <div className="bg-slate-900/50 border border-cyan-500/10 rounded-xl p-4 md:p-6 hover:border-cyan-500/30 transition-colors cursor-pointer magnetic-element group">
                                    <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2 group-hover:scale-110 transition-transform inline-block">8+</div>
                                    <div className="text-xs md:text-sm text-slate-400">Years Experience</div>
                                </div>
                                <div className="bg-slate-900/50 border border-cyan-500/10 rounded-xl p-4 md:p-6 hover:border-cyan-500/30 transition-colors cursor-pointer magnetic-element group">
                                    <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform inline-block">5</div>
                                    <div className="text-xs md:text-sm text-slate-400">Years Network Eng.</div>
                                </div>
                                <div className="bg-slate-900/50 border border-cyan-500/10 rounded-xl p-4 md:p-6 hover:border-cyan-500/30 transition-colors cursor-pointer magnetic-element group">
                                    <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2 group-hover:scale-110 transition-transform inline-block">3</div>
                                    <div className="text-xs md:text-sm text-slate-400">Years Cybersecurity</div>
                                </div>
                                <div className="bg-slate-900/50 border border-cyan-500/10 rounded-xl p-4 md:p-6 hover:border-cyan-500/30 transition-colors cursor-pointer magnetic-element group">
                                    <div className="text-3xl md:text-4xl font-bold text-pink-400 mb-2 group-hover:scale-110 transition-transform inline-block">∞</div>
                                    <div className="text-xs md:text-sm text-slate-400">Learning Mindset</div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Journey Timeline */}
                    <div className="mb-24 md:mb-32 max-w-[1400px] mx-auto px-2 md:px-0">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-white">
                            The <span className="text-gradient-accent">Journey</span>
                        </h2>

                        <div className="timeline-container relative">
                            {/* Hide background line on mobile and adjust nodes */}
                            <div className="timeline-line hidden md:block"></div>

                            <div className="space-y-8 md:space-y-0">
                                {/* Physics Background */}
                                <div className="timeline-node opacity-0 timeline-item md:mb-12" data-side="left">
                                    <div className="grid md:grid-cols-2 gap-4 md:gap-8 items-center">
                                        <div className="timeline-content timeline-left md:text-right magnetic-element w-full md:w-auto ml-4 md:ml-0 pl-4 md:pl-0 border-l-2 border-cyan-500/30 md:border-l-0">
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs md:text-sm mb-3">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                                </svg>
                                                Foundation
                                            </div>
                                            <h3 className="text-lg md:text-xl font-bold text-white mb-2">Physics Graduate</h3>
                                            <p className="text-slate-400 text-sm leading-relaxed">
                                                Developed analytical thinking and problem-solving methodologies through rigorous scientific training. Understanding complex systems and quantum mechanics principles.
                                            </p>
                                        </div>
                                        <div className="hidden md:block"></div>
                                    </div>
                                    <div className="timeline-dot hidden md:block"></div>
                                </div>

                                {/* Network Engineering */}
                                <div className="timeline-node opacity-0 timeline-item md:mb-12" data-side="right">
                                    <div className="grid md:grid-cols-2 gap-4 md:gap-8 items-center">
                                        <div className="hidden md:block"></div>
                                        <div className="timeline-content timeline-right magnetic-element w-full md:w-auto ml-4 md:ml-0 pl-4 md:pl-0 border-l-2 border-blue-500/30 md:border-l-0">
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs md:text-sm mb-3">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                Infrastructure
                                            </div>
                                            <h3 className="text-lg md:text-xl font-bold text-white mb-2">Network Engineering</h3>
                                            <p className="text-slate-400 text-sm leading-relaxed">
                                                5 years building and optimizing complex network infrastructures. Deep understanding of protocols, architecture, and system vulnerabilities from the ground up.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="timeline-dot hidden md:block" style={{ borderColor: '#3b82f6', boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }}></div>
                                </div>

                                {/* Cybersecurity Transition */}
                                <div className="timeline-node opacity-0 timeline-item md:mb-12" data-side="left">
                                    <div className="grid md:grid-cols-2 gap-4 md:gap-8 items-center">
                                        <div className="timeline-content timeline-left md:text-right magnetic-element w-full md:w-auto ml-4 md:ml-0 pl-4 md:pl-0 border-l-2 border-purple-500/30 md:border-l-0">
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs md:text-sm mb-3">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                                Defense
                                            </div>
                                            <h3 className="text-lg md:text-xl font-bold text-white mb-2">Cybersecurity Specialist</h3>
                                            <p className="text-slate-400 text-sm leading-relaxed">
                                                3 years dedicated to cybersecurity, combining physics-based analytical thinking with hands-on technical expertise to protect critical infrastructure.
                                            </p>
                                        </div>
                                        <div className="hidden md:block"></div>
                                    </div>
                                    <div className="timeline-dot hidden md:block" style={{ borderColor: '#8b5cf6', boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)' }}></div>
                                </div>

                                {/* Allegorix Founding */}
                                <div className="timeline-node opacity-0 timeline-item" data-side="right">
                                    <div className="grid md:grid-cols-2 gap-4 md:gap-8 items-center">
                                        <div className="hidden md:block"></div>
                                        <div className="timeline-content timeline-right magnetic-element border-cyan-400/30 w-full md:w-auto ml-4 md:ml-0 pl-4 md:pl-0 border-l-2 md:border-l-0">
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs md:text-sm mb-3">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                                Leadership
                                            </div>
                                            <h3 className="text-lg md:text-xl font-bold text-white mb-2">Founder, Allegorix</h3>
                                            <p className="text-slate-400 text-sm leading-relaxed">
                                                Leading complex maritime cybersecurity projects, solving challenging problems, and delivering results. Building a team committed to excellence and continuous innovation.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="timeline-dot hidden md:block" style={{ borderColor: '#06b6d4', background: '#06b6d4', boxShadow: '0 0 30px rgba(6, 182, 212, 0.8)' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Core Competencies */}
                    <div className="mb-24 md:mb-32 min-h-[40vh] max-w-[1400px] mx-auto">
                        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 md:mb-24 text-white">
                            Core <span className="text-gradient-accent">Competencies</span>
                        </h2>

                        <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-20">
                            <div className="skill-orb magnetic-element w-[120px] h-[120px] md:w-[150px] md:h-[150px]" data-skill="analytical">
                                <div className="skill-orb-inner text-center">
                                    <svg className="w-6 h-6 md:w-8 md:h-8 text-cyan-400 mb-2 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                    <span className="text-xs md:text-sm font-semibold text-white">Analytical<br />Thinking</span>
                                </div>
                            </div>

                            <div className="skill-orb magnetic-element w-[120px] h-[120px] md:w-[150px] md:h-[150px]" data-skill="leadership">
                                <div className="skill-orb-inner text-center">
                                    <svg className="w-6 h-6 md:w-8 md:h-8 text-blue-400 mb-2 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <span className="text-xs md:text-sm font-semibold text-white">Project<br />Leadership</span>
                                </div>
                            </div>

                            <div className="skill-orb magnetic-element w-[120px] h-[120px] md:w-[150px] md:h-[150px]" data-skill="problem">
                                <div className="skill-orb-inner text-center">
                                    <svg className="w-6 h-6 md:w-8 md:h-8 text-purple-400 mb-2 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                                    </svg>
                                    <span className="text-xs md:text-sm font-semibold text-white">Problem<br />Solving</span>
                                </div>
                            </div>

                            <div className="skill-orb magnetic-element w-[120px] h-[120px] md:w-[150px] md:h-[150px]" data-skill="adaptable">
                                <div className="skill-orb-inner text-center">
                                    <svg className="w-6 h-6 md:w-8 md:h-8 text-pink-400 mb-2 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    <span className="text-xs md:text-sm font-semibold text-white">Adaptable<br />& Persistent</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Philosophy Section */}
                    <div className="sharp-divider mb-16"></div>

                    <div className="text-center max-w-[1400px] mx-auto mb-20 md:mb-32">
                        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-16 text-white">
                            Leadership <span className="text-gradient-accent">Philosophy</span>
                        </h2>

                        <div className="grid md:grid-cols-3 gap-6 md:gap-8 lg:gap-16">
                            <div className="bg-slate-900/30 border border-cyan-500/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-all hover:-translate-y-2 magnetic-element group text-left">
                                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Continuous Learning</h3>
                                <p className="text-slate-400 text-sm">Never stop evolving. Every challenge is an opportunity to expand knowledge and capabilities.</p>
                            </div>

                            <div className="bg-slate-900/30 border border-blue-500/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all hover:-translate-y-2 magnetic-element group text-left">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Results-Driven</h3>
                                <p className="text-slate-400 text-sm">Focus on delivering tangible outcomes that protect and empower maritime operations.</p>
                            </div>

                            <div className="bg-slate-900/30 border border-purple-500/10 rounded-2xl p-6 hover:border-purple-500/30 transition-all hover:-translate-y-2 magnetic-element group text-left">
                                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Team Excellence</h3>
                                <p className="text-slate-400 text-sm">Building teams that combine diverse expertise with shared commitment to security.</p>
                            </div>
                        </div>
                    </div>


                </div>
            </main>
        </div>
    );
}
