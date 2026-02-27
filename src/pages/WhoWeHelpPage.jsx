import React from 'react';
import WhoWeHelp from '../components/WhoWeHelp';
import SatelliteScroll from '../components/SatelliteScroll';

export default function WhoWeHelpPage() {
    return (
        <div className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-[#020617] to-[#020617] font-sans min-h-screen pt-24 pb-24">
            <SatelliteScroll />
            <WhoWeHelp />
        </div>
    );
}
