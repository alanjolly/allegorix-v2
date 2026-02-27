import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './WhoWeHelp.css';

gsap.registerPlugin(ScrollTrigger);

export default function WhoWeHelp() {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const [activeCard, setActiveCard] = useState(null);

    // Particle Canvas Effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: null, y: null, radius: 150 };
        let animationFrameId;

        function resizeCanvas() {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.opacity = Math.random() * 0.5 + 0.1;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;

                // Mouse interaction
                if (mouse.x != null && mouse.y != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouse.radius) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (mouse.radius - distance) / mouse.radius;
                        const directionX = forceDirectionX * force * 0.6;
                        const directionY = forceDirectionY * force * 0.6;
                        this.x -= directionX;
                        this.y -= directionY;
                    }
                }
            }

            draw() {
                ctx.fillStyle = `rgba(56, 189, 248, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            const numberOfParticles = Math.min(window.innerWidth / 10, 100);
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        }
        initParticles();

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                // Draw connections
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(56, 189, 248, ${0.1 * (1 - distance / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            animationFrameId = requestAnimationFrame(animateParticles);
        }
        animateParticles();

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleMouseOut = () => {
            mouse.x = null;
            mouse.y = null;
        };

        const handleClick = (e) => {
            // Burst particles on click
            const burstCount = 20;
            for (let i = 0; i < burstCount; i++) {
                const p = new Particle();
                p.x = e.clientX;
                p.y = e.clientY;
                // Give them higher speed for burst
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 3 + 2;
                p.speedX = Math.cos(angle) * speed;
                p.speedY = Math.sin(angle) * speed;
                p.size = Math.random() * 3 + 1;
                particles.push(p);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseOut);
        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseOut);
            window.removeEventListener('click', handleClick);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // Interactive Card Hover Effects
    const handleCardMouseMove = (e, index) => {
        const card = document.querySelectorAll('.help-card')[index];
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Update CSS variables for the radial glow
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        // Calculate 3D Tilt - Disable tilt on smaller screens for better mobile exp
        if (window.innerWidth < 1024) return;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg tilt
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(card, {
            rotateX,
            rotateY,
            scale: 1.02,
            duration: 0.4,
            ease: "power2.out"
        });
    };

    const handleCardMouseLeave = (index) => {
        setActiveCard(null);
        const card = document.querySelectorAll('.help-card')[index];
        if (!card) return;

        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.7,
            ease: "elastic.out(1, 0.3)"
        });
    };

    // GSAP Animations
    useGSAP(() => {
        // Text Reveal Animation
        gsap.to('.reveal-text', {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            delay: 0.2
        });

        // Cards Stagger Animation
        gsap.fromTo('.help-card',
            {
                opacity: 0,
                y: 60
            },
            {
                scrollTrigger: {
                    trigger: '#cards-container',
                    start: "top 80%",
                },
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out"
            }
        );

        // Parallax Effect for Background Orbs & Grid
        const moveBg = (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 40;
            const y = (e.clientY / window.innerHeight - 0.5) * 40;

            gsap.to('.bg-grid', { x: x * 0.5, y: y * 0.5, duration: 1, ease: 'power2.out' });
            gsap.to('.orb-1', { x: -x, y: -y, duration: 1.5, ease: 'power2.out' });
            gsap.to('.orb-2', { x: x * 1.5, y: y * 1.5, duration: 1.2, ease: 'power2.out' });
        };

        window.addEventListener('mousemove', moveBg);

        return () => {
            window.removeEventListener('mousemove', moveBg);
        }
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative overflow-hidden min-h-screen font-sans text-[#e2e8f0]" style={{ background: '#0a0f1c' }}>
            {/* Background Elements */}
            <div className="bg-grid"></div>
            <div className="orb orb-1"></div>
            <div className="orb orb-2"></div>
            <canvas id="particle-canvas" ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-[1]"></canvas>

            {/* Main Content */}
            <main className="relative z-10 pt-24 md:pt-32 pb-20 px-4 md:px-6 lg:px-12 xl:px-24">
                <div className="max-w-[1600px] mx-auto w-full">

                    {/* Header Section */}
                    <div className="text-center mb-16 md:mb-24 lg:mb-32">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 mb-6 reveal-text">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                            <span className="text-xs md:text-sm font-medium text-slate-300">Maritime Cybersecurity Solutions</span>
                        </div>

                        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 md:mb-8 leading-tight reveal-text text-white">
                            Who Allegorix <span className="bg-gradient-to-br from-[#38bdf8] to-[#818cf8] bg-clip-text text-transparent italic font-light">helps</span>
                        </h1>

                        <p className="text-base sm:text-lg md:text-2xl text-slate-400 max-w-4xl mx-auto leading-relaxed reveal-text px-2">
                            We work with organizations across the maritime ecosystem, adapting content and scenarios to fit your operating reality and constraints.
                        </p>
                    </div>

                    {/* Interactive Cards Grid */}
                    <div className="grid lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12 mb-16 items-stretch" id="cards-container">

                        {/* Card 1: Shipping */}
                        <div
                            className={`help-card h-full flex flex-col rounded-2xl p-6 md:p-8 cursor-pointer group ${activeCard === 'shipping' ? 'active' : ''}`}
                            onMouseEnter={() => setActiveCard('shipping')}
                            onMouseLeave={() => handleCardMouseLeave(0)}
                            onMouseMove={(e) => handleCardMouseMove(e, 0)}
                        >
                            <div className="icon-container w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 md:w-7 md:h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>

                            <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 group-hover:text-cyan-300 transition-colors">
                                Shipping companies & fleets
                            </h3>

                            <p className="text-sm md:text-base text-slate-400 leading-relaxed mb-6">
                                Protect shipboard and office environments with crew-friendly training, phishing simulations and basic hygiene checks that respect watch schedules and port calls.
                            </p>

                            <div className="flex-1"></div>

                            <div className={`detail-panel ${activeCard === 'shipping' ? 'open' : ''}`}>
                                <div className="pt-4 border-t border-slate-700/50 mt-4">
                                    <ul className="space-y-2 text-sm text-slate-300">
                                        <li className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            Real-time threat monitoring
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            Offline-capable training modules
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            Satellite communication security
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="flex items-center text-cyan-400 font-medium text-sm mt-4 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-0 lg:translate-y-2 group-hover:translate-y-0 relative z-20">
                                Learn more
                                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>

                        {/* Card 2: Ports */}
                        <div
                            className={`help-card h-full flex flex-col rounded-2xl p-6 md:p-8 cursor-pointer group ${activeCard === 'ports' ? 'active' : ''}`}
                            onMouseEnter={() => setActiveCard('ports')}
                            onMouseLeave={() => handleCardMouseLeave(1)}
                            onMouseMove={(e) => handleCardMouseMove(e, 1)}
                        >
                            <div className="icon-container w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 md:w-7 md:h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                            </div>

                            <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 group-hover:text-cyan-300 transition-colors">
                                Ports, terminals & logistics
                            </h3>

                            <p className="text-sm md:text-base text-slate-400 leading-relaxed mb-6">
                                Raise awareness for staff handling documentation, port systems and cargo coordination, where a single infected workstation or fake email can cause major delays.
                            </p>

                            <div className="flex-1"></div>

                            <div className={`detail-panel ${activeCard === 'ports' ? 'open' : ''}`}>
                                <div className="pt-4 border-t border-slate-700/50 mt-4">
                                    <ul className="space-y-2 text-sm text-slate-300">
                                        <li className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            ICS/SCADA protection
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            Supply chain verification
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            24/7 Security Operations Center
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="flex items-center text-cyan-400 font-medium text-sm mt-4 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-0 lg:translate-y-2 group-hover:translate-y-0 relative z-20">
                                Learn more
                                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>

                        {/* Card 3: Academies */}
                        <div
                            className={`help-card h-full flex flex-col rounded-2xl p-6 md:p-8 cursor-pointer group ${activeCard === 'academies' ? 'active' : ''}`}
                            onMouseEnter={() => setActiveCard('academies')}
                            onMouseLeave={() => handleCardMouseLeave(2)}
                            onMouseMove={(e) => handleCardMouseMove(e, 2)}
                        >
                            <div className="icon-container w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 md:w-7 md:h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                </svg>
                            </div>

                            <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 group-hover:text-cyan-300 transition-colors">
                                Maritime academies & institutes
                            </h3>

                            <p className="text-sm md:text-base text-slate-400 leading-relaxed mb-6">
                                Integrate practical cyber modules into your curriculum so cadets and students join the industry with strong cyber habits from day one.
                            </p>

                            <div className="flex-1"></div>

                            <div className={`detail-panel ${activeCard === 'academies' ? 'open' : ''}`}>
                                <div className="pt-4 border-t border-slate-700/50 mt-4">
                                    <ul className="space-y-2 text-sm text-slate-300">
                                        <li className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            Curriculum integration support
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            Hands-on simulation labs
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            Certification programs
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="flex items-center text-cyan-400 font-medium text-sm mt-4 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-0 lg:translate-y-2 group-hover:translate-y-0 relative z-20">
                                Learn more
                                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
