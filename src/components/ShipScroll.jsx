import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import TextReveal from './TextReveal';

export default function ShipScroll() {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const [images, setImages] = useState([]);

    // Preload frames (1 to 240)
    useEffect(() => {
        const loadedImages = [];
        for (let i = 1; i <= 240; i++) {
            const img = new Image();
            const frameNum = i.toString().padStart(3, '0');
            img.src = `/ship/ezgif-frame-${frameNum}.jpg`;
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Calculate current frame
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, 239]);

    // Request Animation Frame reference for performance
    const renderFrame = (index) => {
        if (!canvasRef.current || images.length === 0) return;
        const ctx = canvasRef.current.getContext('2d');
        const img = images[index];

        if (img && img.complete) {
            const canvas = canvasRef.current;
            const cw = canvas.width;
            const ch = canvas.height;
            const iw = img.width;
            const ih = img.height;

            const hRatio = cw / iw;
            const vRatio = ch / ih;
            // Use cover sizing
            const ratio = Math.max(hRatio, vRatio);

            const centerShift_x = (cw - iw * ratio) / 2;
            const centerShift_y = (ch - ih * ratio) / 2;

            ctx.clearRect(0, 0, cw, ch);
            ctx.drawImage(img, 0, 0, iw, ih, centerShift_x, centerShift_y, iw * ratio, ih * ratio);
        }
    };

    useMotionValueEvent(frameIndex, "change", (latest) => {
        requestAnimationFrame(() => renderFrame(Math.floor(latest)));
    });

    // Handle Canvas Resize and ensure initial render
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                // Re-render current frame on resize
                if (images.length > 0) renderFrame(Math.floor(frameIndex.get()));
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        // Draw the first frame once images load
        if (images.length > 0 && images[0].complete) {
            renderFrame(0);
        } else if (images.length > 0) {
            images[0].onload = () => renderFrame(0);
        }

        return () => window.removeEventListener('resize', handleResize);
    }, [images]);

    // Transform values for text overlay parallax
    const bgOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 0.4, 0.4, 1]);
    const textY = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);
    const textOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.8, 0.9], [0, 1, 1, 0]);

    return (
        <section ref={containerRef} className="relative h-[250vh] bg-[#020617] w-full" id="scrolling-ship">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                {/* The resulting images seem to be JPG sequences, potentially light background. */}
                <canvas ref={canvasRef} className="w-full h-full object-cover z-0 opacity-80 mix-blend-screen" />

                {/* Dynamic Dark Gradient Overlay to blend with site theme */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/50 to-[#020617] z-10 pointer-events-none" />

                {/* Thematic Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 pt-20">
                    <TextReveal el="h1" text="Maritime Cyber Awareness" className="text-5xl md:text-7xl lg:text-8xl font-display font-semibold tracking-tighter max-w-[15ch] mx-auto text-slate-100 text-center drop-shadow-2xl" />
                    <TextReveal delay={4} el="p" text="Protect global shipping by transforming crew cybersecurity awareness into measurable, auditable maritime resilience." className="mt-8 text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto font-light text-center drop-shadow-md bg-black/40 p-4 rounded-xl backdrop-blur-sm" />
                </div>
            </div>
        </section>
    );
}
