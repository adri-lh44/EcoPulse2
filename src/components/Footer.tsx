import React from 'react';

interface FooterProps {
  onNavigate?: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#070e1a]/90 backdrop-blur-md mt-auto border-t border-white/5">
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-12 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-8 border-b border-[#18202c]">
          {/* Brand & Mission Statement */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <img
                alt="EcoPulse Master Emblem"
                className="h-6 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida/AEtjO1XshwQcJAVyaASIBMiQKhwkajiazM4RhzT1EkIVSy-YJqZ96fAu_lHaebrmITxSeVRi2PfR7R5EL1N0Mr-c7EcWvwMxXEcPbkDFie5p3XPqCVzHnFvH36Wdj-OGLQM1evwrClSjvbGVV5AYze7-R0Kym_4_wgKquvStyWm5Gxx28rijkPH8iyHLumvl_3BDgYrDxW-005iJMspVjP1mp01zWlvWYLLQrr8vaXl3FJSK8rhbTpkLTcZp2Bk"
              />
              <span className="font-['Outfit',sans-serif] text-xl text-[#dbe3f4] font-bold">
                EcoPulse
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#232a37] text-[#4edea3] font-['Space_Grotesk',monospace] text-[10px] uppercase">
                v4.2
              </span>
            </div>
            <p className="text-xs text-[#bbcabf] max-w-md leading-relaxed">
              Synthesizing planetary biosensors, high-performance telemetry, and gamified environmental action to accelerate global carbon drawdown initiatives.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="w-2 h-2 rounded-full bg-[#45dfa4] animate-ping"></span>
              <span className="font-['Space_Grotesk',monospace] text-xs text-[#bbcabf] uppercase tracking-wider">
                Sensors Live • 99.8% Grid Sync
              </span>
            </div>
          </div>

          {/* Modules Navigation Links */}
          <div className="md:col-span-4 flex gap-10">
            <div className="space-y-2">
              <div className="font-['Space_Grotesk',monospace] text-xs uppercase tracking-wider text-[#dbe3f4] font-bold">
                Modules
              </div>
              <div className="flex flex-col space-y-1.5 text-xs text-[#bbcabf]">
                <button
                  onClick={() => onNavigate?.('eco-tracker')}
                  className="hover:text-[#4edea3] transition-colors text-left cursor-pointer"
                >
                  Carbon Audits
                </button>
                <button
                  onClick={() => onNavigate?.('dashboard')}
                  className="hover:text-[#4edea3] transition-colors text-left cursor-pointer"
                >
                  Telemetry Feed
                </button>
                <button
                  onClick={() => onNavigate?.('recycle-rush')}
                  className="hover:text-[#4edea3] transition-colors text-left cursor-pointer"
                >
                  Eco Quests & Arcade
                </button>
                <button
                  onClick={() => onNavigate?.('heritage-trail')}
                  className="hover:text-[#4edea3] transition-colors text-left cursor-pointer"
                >
                  Flora & Trail Index
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="font-['Space_Grotesk',monospace] text-xs uppercase tracking-wider text-[#dbe3f4] font-bold">
                Governance
              </div>
              <div className="flex flex-col space-y-1.5 text-xs text-[#bbcabf]">
                <span className="hover:text-[#4edea3] transition-colors cursor-pointer">
                  Telemetry API
                </span>
                <span className="hover:text-[#4edea3] transition-colors cursor-pointer">
                  IDCC Protocol
                </span>
                <span className="hover:text-[#4edea3] transition-colors cursor-pointer">
                  Climate Trust
                </span>
                <span className="hover:text-[#4edea3] transition-colors cursor-pointer">
                  Privacy Node
                </span>
              </div>
            </div>
          </div>

          {/* Top of Grid Button */}
          <div className="md:col-span-3 flex md:justify-end items-start">
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 px-4 py-2 rounded-full bg-[#232a37] hover:bg-[#2d3542] transition-all shadow-[0_1px_8px_rgba(0,0,0,0.2)] cursor-pointer border border-white/5"
              type="button"
            >
              <span className="font-['Space_Grotesk',monospace] text-xs uppercase text-[#bbcabf] group-hover:text-[#dbe3f4] transition-colors">
                Top of Grid
              </span>
              <span className="material-symbols-outlined text-base text-[#4edea3] group-hover:-translate-y-0.5 transition-transform">
                arrow_upward
              </span>
            </button>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-[#bbcabf]">
          <p>© 2026 EcoPulse Biosphere Initiative. Accredited IDCC Global Node.</p>
          <p className="font-['Space_Grotesk',monospace] text-[10px] uppercase tracking-wider text-[#86948a]">
            Obsidian Bio-Telemetry v4.2.1 • All Satellites Nominal
          </p>
        </div>
      </div>
    </footer>
  );
};
