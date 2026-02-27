import React from 'react';
import { motion } from 'framer-motion';

export default function TextReveal({ text, el: Wrapper = "p", className = "", delay = 0 }) {
    const words = text.split(" ");
    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: delay * 0.1 },
        }),
    };
    const child = {
        visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring", damping: 12, stiffness: 100 } },
        hidden: { opacity: 0, y: 20, rotateX: -90 },
    };

    return (
        <Wrapper className={className}>
            <motion.span
                style={{ display: "inline-flex", flexWrap: "wrap", gap: "0.25em" }}
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {words.map((word, index) => (
                    <span key={index} style={{ overflow: "hidden", display: "inline-block" }}>
                        <motion.span style={{ display: "inline-block", transformOrigin: "50% 100%" }} variants={child}>
                            {word}
                        </motion.span>
                    </span>
                ))}
            </motion.span>
        </Wrapper>
    );
}
