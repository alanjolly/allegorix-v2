import React from 'react';
import ShipScroll from '../components/ShipScroll';
import Services from '../components/Services';
import About from '../components/About';

export default function Home() {
    return (
        <>
            <ShipScroll />
            <div className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-[#020617] to-[#020617] font-sans min-h-screen">
                <Services />
                <About />
            </div>
        </>
    );
}
