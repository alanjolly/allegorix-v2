import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function SatelliteScroll() {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const textRef = useRef(null);
    const [images, setImages] = useState([]);

    const frameCount = 240;

    // Preload images
    useEffect(() => {
        const loadedImages = [];
        let loadedCount = 0;

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            // Ensure padding with zeros like "001", "045", "120"
            const paddedIndex = i.toString().padStart(3, '0');
            img.src = `${import.meta.env.BASE_URL}satellite-frames/ezgif-frame-${paddedIndex}.jpg`;

            img.onload = () => {
                loadedCount++;
                if (loadedCount === frameCount) {
                    // Initial draw once all images load, use useGSAP for scrub timeline
                    drawFrame(0);
                }
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, []);

    const drawFrame = (index) => {
        if (!canvasRef.current || images.length === 0 || !images[index]) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = images[index];

        // Match the canvas size to the window for full bleed
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Calculate aspect ratio for object-fit: cover equivalent inside Canvas
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
            img,
            0, 0, img.width, img.height,
            centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
        );
    };

    useGSAP(() => {
        // Handle canvas drawing animation
        if (images.length === frameCount) {
            const playhead = { frame: 0 };

            ScrollTrigger.create({
                trigger: containerRef.current,
                pin: true,
                start: "top top",
                end: "+=3000", // 3000px of scrolling for 240 frames
                scrub: 0.5, // 0.5s smoothing
                animation: gsap.to(playhead, {
                    frame: frameCount - 1,
                    snap: "frame",
                    ease: "none",
                    onUpdate: () => drawFrame(playhead.frame)
                }),
                invalidateOnRefresh: true,
            });

            // Handle Text reveal over the timeline
            gsap.fromTo(textRef.current,
                { opacity: 1, scale: 1, y: 0 },
                {
                    opacity: 0,
                    scale: 1.1,
                    y: -50,
                    duration: 1,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: "+=1500", // Fades completely away by the time user is half-way through the pin
                        scrub: 1
                    }
                }
            );

        }

        // Re-draw on resize
        const handleResize = () => {
            if (images.length > 0) {
                // Determine current frame conceptually, but drawing frame 0 is acceptable fallback
                // GSAP will handle re-draw on scroll anyway.
                drawFrame(0);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);

    }, { dependencies: [images], scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="relative w-full h-screen bg-black overflow-hidden"
        >
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-center z-10">
                <h2
                    ref={textRef}
                    className="font-display text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-widest drop-shadow-2xl"
                    style={{
                        color: 'transparent',
                        WebkitTextStroke: '2px rgba(255, 255, 255, 0.4)',
                        backgroundImage: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.05))',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text'
                    }}
                >
                    Allegorix
                </h2>
            </div>

        </section>
    );
}
