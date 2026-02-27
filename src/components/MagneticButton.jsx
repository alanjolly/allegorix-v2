import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function MagneticButton({ children, className = "", onClick, ...props }) {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();

        // Calculate distance from center of button
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        // Apply a weak magnetic pull
        setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={`relative inline-flex items-center justify-center px-8 py-4 font-medium text-white rounded-full bg-blue-600 hover:bg-blue-500 overflow-hidden group ${className}`}
            onClick={onClick}
            {...props}
        >
            <span className="relative z-10 flex items-center gap-2">{children}</span>
            <div className="absolute inset-0 z-0 bg-blue-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
        </motion.button>
    );
}
