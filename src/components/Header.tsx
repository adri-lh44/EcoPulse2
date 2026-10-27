import React, { useState } from 'react';
import { ActiveTab, UserStats } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  userStats: UserStats;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onSelectTab, userStats }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
    document.documentElement.classList.toggle('dark');
  };

  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'eco-tracker', label: 'Eco-Tracker & Footprint' },
    { id: 'recycle-rush', label: 'Recycle Rush' },
    { id: 'heritage-trail', label: 'Heritage & Eco-Trail' },
    { id: 'focus-timer', label: 'Focus & Productivity' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0c1420]/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.25)] border-b border-white/5">
        <div className="h-20 w-full px-4 md:px-12 flex items-center justify-between gap-6">
          {/* Logo & IDCC Edition Pill */}
          <div className="flex items-center gap-6 flex-shrink-0">
            <button
              onClick={() => onSelectTab('dashboard')}
              className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none"
            >
              <img
                alt="EcoPulse Master Emblem"
                className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida/AEtjO1XshwQcJAVyaASIBMiQKhwkajiazM4RhzT1EkIVSy-YJqZ96fAu_lHaebrmITxSeVRi2PfR7R5EL1N0Mr-c7EcWvwMxXEcPbkDFie5p3XPqCVzHnFvH36Wdj-OGLQM1evwrClSjvbGVV5AYze7-R0Kym_4_wgKquvStyWm5Gxx28rijkPH8iyHLumvl_3BDgYrDxW-005iJMspVjP1mp01zWlvWYLLQrr8vaXl3FJSK8rhbTpkLTcZp2Bk"
              />
              <span className="font-['Outfit',sans-serif] text-xl md:text-2xl text-[#dbe3f4] font-bold tracking-tight">
                EcoPulse
              </span>
            </button>
            <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#232a37] shadow-[0_0_12px_rgba(16,185,129,0.2)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse"></span>
              <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#4edea3] font-bold tracking-wider">
                IDCC 2026 Edition
              </span>
            </div>
          </div>

          {/* Central Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 p-1 bg-[#141c28]/80 backdrop-blur-md rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] border border-white/5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`px-4 py-1.5 rounded-full text-xs md:text-sm transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#10b981] text-[#00422b] font-semibold shadow-[0_0_16px_rgba(16,185,129,0.35)]'
                      : 'text-[#bbcabf] hover:text-[#dbe3f4] hover:bg-[#232a37]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* User Status / Theme / Notifications / Profile */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {/* XP Level Bar */}
            <div className="hidden 2xl:flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#232a37]/70 backdrop-blur-md border border-white/5">
              <div className="flex flex-col">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#bbcabf]">
                    Lvl {userStats.level} Ranger
                  </span>
                  <span className="font-['Space_Grotesk',monospace] text-xs text-[#4edea3] font-bold">
                    {userStats.xp.toLocaleString()} XP
                  </span>
                </div>
                <div className="w-28 h-1.5 rounded-full bg-[#2d3542] overflow-hidden mt-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-[#4edea3] to-[#45dfa4] rounded-full shadow-[0_0_8px_rgba(78,222,163,0.5)] transition-all duration-500"
                    style={{ width: `${Math.min(100, (userStats.xp % 1000) / 10)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title="Toggle Day/Night Environmental Lighting"
              className="w-10 h-10 rounded-full bg-[#141c28] hover:bg-[#232a37] flex items-center justify-center text-[#bbcabf] hover:text-[#dbe3f4] transition-colors cursor-pointer border border-white/5"
              type="button"
            >
              <span className="material-symbols-outlined text-xl">
                {isLightMode ? 'dark_mode' : 'wb_sunny'}
              </span>
            </button>

            {/* Notifications Button */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                aria-label="Notifications"
                className="relative w-10 h-10 rounded-full bg-[#141c28] hover:bg-[#232a37] flex items-center justify-center text-[#bbcabf] hover:text-[#dbe3f4] transition-colors cursor-pointer border border-white/5"
                type="button"
              >
                <span className="material-symbols-outlined text-xl">notifications</span>
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#4edea3] ring-2 ring-[#0c1420] shadow-[0_0_6px_rgba(78,222,163,0.8)]"></span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 rounded-xl bg-[#18202c] border border-[#2d3542] shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between pb-2 border-b border-[#2d3542]">
                    <span className="font-['Space_Grotesk',monospace] text-xs uppercase text-[#4edea3] font-bold">
                      Telemetry Signals
                    </span>
                    <span className="text-[11px] text-[#bbcabf]">3 Live Updates</span>
                  </div>
                  <div className="mt-3 space-y-2.5 text-xs">
                    <div className="p-2.5 rounded-lg bg-[#232a37]/80 flex items-start gap-2.5">
                      <span className="material-symbols-outlined text-sm text-[#4edea3] mt-0.5">park</span>
                      <div>
                        <p className="font-semibold text-[#dbe3f4]">Ghaf Sprout #0884 hydrated</p>
                        <p className="text-[11px] text-[#bbcabf]">Al Marmoom reserve telemetry confirmed +5 XP.</p>
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#232a37]/80 flex items-start gap-2.5">
                      <span className="material-symbols-outlined text-sm text-[#ffb95f] mt-0.5">bolt</span>
                      <div>
                        <p className="font-semibold text-[#dbe3f4]">Solar Grid Output Peak</p>
                        <p className="text-[11px] text-[#bbcabf]">MBR Solar Park operating at 92% efficiency today.</p>
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#232a37]/80 flex items-start gap-2.5">
                      <span className="material-symbols-outlined text-sm text-[#45dfa4] mt-0.5">recycling</span>
                      <div>
                        <p className="font-semibold text-[#dbe3f4]">Recycle Rush Frenzy</p>
                        <p className="text-[11px] text-[#bbcabf]">Sector 09 championship leaderboard reset in 12h.</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="w-full mt-3 py-1.5 rounded-full bg-[#232a37] hover:bg-[#2d3542] text-[11px] uppercase tracking-wider text-[#bbcabf] font-['Space_Grotesk',monospace] transition-colors"
                  >
                    Dismiss Alerts
                  </button>
                </div>
              )}
            </div>

            {/* Profile Avatar & Info */}
            <button
              onClick={() => setShowProfileModal(true)}
              className="flex items-center gap-2 pl-1 cursor-pointer text-left focus:outline-none group"
            >
              <div className="relative flex-shrink-0">
                <img
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-[#4edea3]/40 group-hover:ring-[#4edea3] transition-all"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBV0iYBq6XXo3W7B6ZmpZ5qJ_wNddNqFe4ePw-9TdGLXdsrXdNgKoKKpXWN1mPTqEmoZnO8PTUjeqv4uBlB2sq6i7Gkg-wQdq680sjxqnLyeXJJsso-Rq7RRUOtpW2KZLLTmdyJ9_3J-Ru7kvJMjMZ0wkfnl6laORzekWINaDHNMqEzcJzG5To3H-rR5AG_SXkDqzcIDQ2wndkgmkM-Ao-bPLGa2OFYcpniziS9NhLkxy__BKdSJ6gu"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#4edea3] ring-2 ring-[#0c1420]"></span>
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-semibold text-[#dbe3f4] leading-none group-hover:text-[#4edea3] transition-colors">
                  Dr. Maya Lin
                </span>
                <span className="font-['Space_Grotesk',monospace] text-[10px] text-[#45dfa4] font-medium tracking-wide mt-0.5">
                  Eco-Active
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="lg:hidden flex items-center justify-between px-3 py-2 bg-[#141c28] border-t border-white/5 overflow-x-auto scrollbar-none gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`px-3 py-1 rounded-full text-xs transition-all whitespace-nowrap flex-shrink-0 ${
                  isActive
                    ? 'bg-[#10b981] text-[#00422b] font-semibold'
                    : 'text-[#bbcabf] hover:text-[#dbe3f4] bg-[#18202c]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* User Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070e1a]/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-2xl bg-[#141c28] border border-[#2d3542] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#232a37]">
              <div className="flex items-center gap-3">
                <img
                  alt="Dr. Maya Lin"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-[#4edea3]"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBV0iYBq6XXo3W7B6ZmpZ5qJ_wNddNqFe4ePw-9TdGLXdsrXdNgKoKKpXWN1mPTqEmoZnO8PTUjeqv4uBlB2sq6i7Gkg-wQdq680sjxqnLyeXJJsso-Rq7RRUOtpW2KZLLTmdyJ9_3J-Ru7kvJMjMZ0wkfnl6laORzekWINaDHNMqEzcJzG5To3H-rR5AG_SXkDqzcIDQ2wndkgmkM-Ao-bPLGa2OFYcpniziS9NhLkxy__BKdSJ6gu"
                />
                <div>
                  <h3 className="font-['Outfit',sans-serif] text-lg font-bold text-[#dbe3f4]">Dr. Maya Lin</h3>
                  <p className="font-['Space_Grotesk',monospace] text-xs text-[#4edea3] uppercase">
                    Level {userStats.level} Biosphere Ranger • IDCC #09
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowProfileModal(false)}
                className="w-8 h-8 rounded-full bg-[#232a37] flex items-center justify-center text-[#bbcabf] hover:text-[#dbe3f4] transition-colors"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 py-2">
              <div className="p-3 rounded-xl bg-[#18202c] border border-white/5">
                <span className="font-['Space_Grotesk',monospace] text-[10px] text-[#bbcabf] uppercase block">Total Ranger XP</span>
                <span className="font-['Outfit',sans-serif] text-xl font-bold text-[#4edea3]">{userStats.xp.toLocaleString()} pts</span>
              </div>
              <div className="p-3 rounded-xl bg-[#18202c] border border-white/5">
                <span className="font-['Space_Grotesk',monospace] text-[10px] text-[#bbcabf] uppercase block">Carbon Avoided</span>
                <span className="font-['Outfit',sans-serif] text-xl font-bold text-[#45dfa4]">{userStats.carbonOffsetKg.toFixed(1)} kg</span>
              </div>
              <div className="p-3 rounded-xl bg-[#18202c] border border-white/5">
                <span className="font-['Space_Grotesk',monospace] text-[10px] text-[#bbcabf] uppercase block">Eco Streak</span>
                <span className="font-['Outfit',sans-serif] text-xl font-bold text-[#ffb95f]">{userStats.streak} Days</span>
              </div>
              <div className="p-3 rounded-xl bg-[#18202c] border border-white/5">
                <span className="font-['Space_Grotesk',monospace] text-[10px] text-[#bbcabf] uppercase block">Ghafs Planted</span>
                <span className="font-['Outfit',sans-serif] text-xl font-bold text-[#6ffbbe]">{userStats.treesPlanted} Rooted</span>
              </div>
            </div>

            <p className="text-xs text-[#bbcabf] leading-relaxed">
              Assigned to UAE Biosphere Sector DXB-09. All field contributions, carbon mitigation telemetry, and sorting runs sync with the IDCC Carbon Protocol.
            </p>

            <button
              onClick={() => setShowProfileModal(false)}
              className="w-full py-2.5 rounded-full bg-[#10b981] hover:bg-[#00bd85] text-[#00422b] font-bold font-['Space_Grotesk',monospace] text-xs uppercase tracking-wider transition-colors"
            >
              Close Dossier
            </button>
          </div>
        </div>
      )}
    </>
  );
};
