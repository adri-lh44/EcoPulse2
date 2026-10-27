import React, { useState, useEffect } from 'react';
import { ActiveTab, FeatItem, UserStats } from '../types';
import { EcoChallengeModal } from '../components/EcoChallengeModal';
import { soundscape } from '../utils/audio';

interface DashboardScreenProps {
  userStats: UserStats;
  onUpdateStats: (updater: (prev: UserStats) => UserStats) => void;
  onNavigate: (tab: ActiveTab) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  userStats,
  onUpdateStats,
  onNavigate,
}) => {
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);
  const [shieldVerified, setShieldVerified] = useState(false);
  const [transitPercent, setTransitPercent] = useState(85);
  const [quickSortIndex, setQuickSortIndex] = useState(0);
  const [quickSortMessage, setQuickSortMessage] = useState<string | null>(null);

  // Focus preview timer
  const [isFocusRunning, setIsFocusRunning] = useState(true);
  const [focusSeconds, setFocusSeconds] = useState(18 * 60 + 42);

  // Mini checklist in Focus card
  const [focusTasks, setFocusTasks] = useState([
    { id: 1, text: 'Power-down idling external monitors', done: true },
    { id: 2, text: 'Fill reusable thermal hydration flask', done: true },
    { id: 3, text: 'Log 25-min zero-watt deep write session', done: false },
  ]);

  // Live Cam overlay toggle
  const [liveCamActive, setLiveCamActive] = useState(true);

  // Quest planted count
  const [questTrees, setQuestTrees] = useState(2);
  const [questClaimed, setQuestClaimed] = useState(false);

  // Recent feeds state
  const [feats, setFeats] = useState<FeatItem[]>([
    {
      id: '1',
      initials: 'TK',
      name: 'Tariq K.',
      location: 'Abu Dhabi',
      description: 'Sorted 15 high-density plastics in Recycle Rush',
      xp: 120,
      timeAgo: '4m ago',
      colorClass: 'text-[#4edea3]',
    },
    {
      id: '2',
      initials: 'LS',
      name: 'Layla S.',
      location: 'Sharjah',
      description: 'Unlocked Barjeel Master architectural badge',
      xp: 350,
      timeAgo: '18m ago',
      colorClass: 'text-[#ffb95f]',
    },
    {
      id: '3',
      initials: 'ZO',
      name: 'Zaid O.',
      location: 'Fujairah',
      description: 'Completed Coastal Mangrove drone mapping survey',
      xp: 500,
      timeAgo: '42m ago',
      colorClass: 'text-[#45dfa4]',
    },
  ]);

  const quickItems = [
    { name: 'Clean PET Bottle', bin: 'Recycle' },
    { name: 'Aluminum Drink Can', bin: 'Recycle' },
    { name: 'Degradable Palm Frond Box', bin: 'Compost' },
    { name: 'Soiled Snack Wrapper', bin: 'Landfill' },
  ];

  // Pomodoro timer tick
  useEffect(() => {
    if (!isFocusRunning || focusSeconds <= 0) return;
    const interval = setInterval(() => {
      setFocusSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isFocusRunning, focusSeconds]);

  const handleQuickSort = () => {
    soundscape.playChime('success');
    const current = quickItems[quickSortIndex];
    setQuickSortMessage(`+50 XP: Sorted into ${current.bin}!`);
    setTimeout(() => setQuickSortMessage(null), 1800);
    setQuickSortIndex((prev) => (prev + 1) % quickItems.length);
    onUpdateStats((prev) => ({
      ...prev,
      xp: prev.xp + 50,
      carbonOffsetKg: prev.carbonOffsetKg + 0.1,
    }));
  };

  const handlePlantQuestTree = () => {
    if (questClaimed) return;
    soundscape.playChime('water');
    if (questTrees < 3) {
      setQuestTrees(questTrees + 1);
      onUpdateStats((prev) => ({
        ...prev,
        treesPlanted: prev.treesPlanted + 1,
        xp: prev.xp + 100,
      }));
    } else {
      setQuestClaimed(true);
      soundscape.playChime('combo');
      onUpdateStats((prev) => ({
        ...prev,
        xp: prev.xp + 400,
      }));
    }
  };

  const handleChallengeConfirm = (challenge: { name: string; xp: number; carbonKg: number }) => {
    onUpdateStats((prev) => ({
      ...prev,
      xp: prev.xp + challenge.xp,
      carbonOffsetKg: prev.carbonOffsetKg + challenge.carbonKg,
    }));

    const newFeat: FeatItem = {
      id: Date.now().toString(),
      initials: 'ML',
      name: 'Dr. Maya Lin',
      location: 'Dubai',
      description: `Activated ${challenge.name}`,
      xp: challenge.xp,
      timeAgo: 'Just now',
      colorClass: 'text-[#4edea3]',
    };
    setFeats([newFeat, ...feats]);
  };

  const toggleTask = (id: number) => {
    soundscape.playChime('click');
    setFocusTasks(
      focusTasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const formatTimer = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full max-w-[1440px] mx-auto px-4 md:px-12 pt-6 pb-12 overflow-hidden">
        {/* Ambient Bio-Light Accents */}
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-[#4edea3]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-[#ffb95f]/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Live Telemetry HUD Bar (Biome State) */}
        <div className="w-full flex flex-wrap items-center justify-between gap-3 py-2 px-4 rounded-full bg-[#141c28]/90 backdrop-blur-xl border border-white/5 shadow-sm mb-6">
          <div className="flex items-center gap-3 overflow-x-auto py-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#232a37] text-[#4edea3] font-['Space_Grotesk',monospace] text-[10px] uppercase font-bold tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-ping"></span>
              Telemetry Live
            </span>
            <span className="text-[#bbcabf] font-['Space_Grotesk',monospace] text-xs hidden sm:inline">|</span>
            <div className="flex items-center gap-1.5 font-['Space_Grotesk',monospace] text-xs text-[#dbe3f4]">
              <span className="material-symbols-outlined text-[#4edea3] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                bolt
              </span>
              <span>
                Dubai Clean Energy Index: <span className="text-[#4edea3] font-bold">92/100</span>
              </span>
            </div>
            <span className="text-[#3c4a42] font-['Space_Grotesk',monospace] text-xs hidden md:inline">•</span>
            <div className="hidden md:flex items-center gap-1.5 font-['Space_Grotesk',monospace] text-xs text-[#bbcabf]">
              <span className="material-symbols-outlined text-[#ffb95f] text-sm">wb_sunny</span>
              <span>
                Solar Yield: <span className="text-[#dbe3f4] font-semibold">Peak (8.4 kWh/m²)</span>
              </span>
            </div>
            <span className="text-[#3c4a42] font-['Space_Grotesk',monospace] text-xs hidden lg:inline">•</span>
            <div className="hidden lg:flex items-center gap-1.5 font-['Space_Grotesk',monospace] text-xs text-[#bbcabf]">
              <span className="material-symbols-outlined text-[#45dfa4] text-sm">air</span>
              <span>
                Air Quality: <span className="text-[#45dfa4] font-semibold">Optimal (AQI 24)</span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[#bbcabf] font-['Space_Grotesk',monospace] text-[10px] uppercase tracking-wider ml-auto">
            <span className="material-symbols-outlined text-xs text-[#4edea3]">satellite_alt</span>
            <span>Al Marmoom Array Sync</span>
          </div>
        </div>

        {/* Editorial Hero Unit */}
        <div className="relative w-full rounded-2xl bg-[#18202c]/60 backdrop-blur-2xl p-6 md:p-10 shadow-xl overflow-hidden mb-10 border border-white/5">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c1420] via-[#18202c]/80 to-transparent pointer-events-none z-0"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4edea3]/40 to-transparent"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-[#232a37] text-[#4edea3] font-['Space_Grotesk',monospace] text-[10px] uppercase tracking-widest shadow-sm border border-white/5">
                <span className="material-symbols-outlined text-sm">nature_people</span>
                <span>Ranger Maya Lin • Planetary Ops Console</span>
              </div>

              <h1 className="font-['Outfit',sans-serif] text-3xl md:text-5xl text-[#dbe3f4] tracking-tight max-w-3xl font-bold leading-[1.12]">
                Turn Everyday Ideas into{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4edea3] via-[#45dfa4] to-[#ffb95f]">
                  Planet-Scale
                </span>{' '}
                Eco-Action.
              </h1>

              <p className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg text-[#bbcabf] max-w-2xl leading-relaxed">
                Welcome back, Ranger Maya! Track real-time biometrics, offset emissions, and conquer local restoration challenges across the Emirates.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setIsChallengeModalOpen(true)}
                  className="group relative px-6 py-3 rounded-full bg-gradient-to-r from-[#10b981] to-[#00bd85] text-[#00422b] font-['Outfit',sans-serif] text-base font-bold shadow-[0_0_24px_-4px_rgba(16,185,129,0.5)] hover:shadow-[0_0_32px_0px_rgba(16,185,129,0.7)] hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-xl transition-transform group-hover:rotate-12">
                    rocket_launch
                  </span>
                  <span>Launch Eco-Challenge</span>
                </button>

                <button
                  onClick={() => onNavigate('recycle-rush')}
                  className="px-6 py-3 rounded-full bg-[#232a37]/80 hover:bg-[#2d3542] text-[#4edea3] font-['Space_Grotesk',monospace] text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm hover:-translate-y-0.5 cursor-pointer border border-white/5"
                  type="button"
                >
                  <span className="material-symbols-outlined text-lg">videogame_asset</span>
                  <span>Play Recycle Rush [Arcade]</span>
                </button>
              </div>
            </div>

            {/* Hero Graphic Showcase (Visual Sprout / Biome Card) */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center">
              <div className="w-full relative rounded-2xl bg-[#070e1a]/80 p-4 flex flex-col gap-3 shadow-xl border border-white/5">
                <div className="relative w-full h-44 rounded-xl overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform hover:scale-105 duration-700"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDE53UOC5QLFVBByrwZYIlfjogDj9EDXRO1yUMrTGdjLaprzUAN8v01wnZQW1gV-WHtllxiKGY2nMcvdymx5lDTZiSi2CV6pz0wJxD0inNazhturYRzY0sr4oNht8xLc8NWIiP9TDK-Ja8yX00L8A6iltNLWrYflOzK3WPkC_cjT1YC8LZXfZLjqy3T6xO4q9E0uRf_SyEJG5xPxxICxUxN7QJHv1LBjhLhwBXoU_qT9aoU7TA7mLlp')",
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070e1a] via-transparent to-transparent"></div>
                  <div className="absolute top-2 left-2 px-2.5 py-1 rounded bg-[#070e1a]/90 font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#45dfa4] font-bold">
                    Al Marmoom Sector 04
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#bbcabf] block">
                      Assigned Canopy
                    </span>
                    <span className="font-['Outfit',sans-serif] text-base text-[#dbe3f4] font-semibold">
                      Ghaf Sprout #0884
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#4edea3] block">
                      Vitality Index
                    </span>
                    <span className="font-['Outfit',sans-serif] text-lg text-[#4edea3] font-bold">
                      98.2%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-[#232a37] rounded-full h-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-[#4edea3] to-[#45dfa4] h-full rounded-full w-[98%] shadow-[0_0_8px_rgba(78,222,163,0.5)]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Animated Impact Counters (Metric Ribbon) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Card 1: Carbon Offset */}
          <div className="relative rounded-2xl bg-[#141c28]/70 backdrop-blur-md p-4 flex flex-col justify-between shadow-lg hover:bg-[#232a37]/60 transition-all border border-white/5 group">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-['Space_Grotesk',monospace] text-xs uppercase text-[#bbcabf] tracking-wider">
                  Total Carbon Offset
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-['Outfit',sans-serif] text-3xl text-[#4edea3] font-bold">
                    {userStats.carbonOffsetKg.toFixed(1)}
                  </span>
                  <span className="font-['Space_Grotesk',monospace] text-xs text-[#bbcabf] font-bold">
                    kg CO₂
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#18202c] flex items-center justify-center text-[#4edea3] group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-xl">co2</span>
              </div>
            </div>
            <div className="py-2">
              <svg className="w-full h-9 overflow-visible" fill="none" viewBox="0 0 100 24">
                <defs>
                  <linearGradient id="dashOffsetGrad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#4edea3" stopOpacity="0.3"></stop>
                    <stop offset="100%" stopColor="#4edea3" stopOpacity="0.0"></stop>
                  </linearGradient>
                </defs>
                <path d="M0 20 Q 20 18, 35 12 T 70 8 T 100 2 L 100 24 L 0 24 Z" fill="url(#dashOffsetGrad)"></path>
                <path d="M0 20 Q 20 18, 35 12 T 70 8 T 100 2" stroke="#4edea3" strokeLinecap="round" strokeWidth="2.5"></path>
              </svg>
            </div>
            <div className="flex items-center justify-between text-xs pt-1 text-[#bbcabf]">
              <span className="flex items-center text-[#4edea3] font-semibold gap-0.5 font-['Space_Grotesk',monospace]">
                <span className="material-symbols-outlined text-sm">trending_up</span> +14.2%
              </span>
              <span>vs last cycle</span>
            </div>
          </div>

          {/* Card 2: Ghaf Trees Planted */}
          <div className="relative rounded-2xl bg-[#141c28]/70 backdrop-blur-md p-4 flex flex-col justify-between shadow-lg hover:bg-[#232a37]/60 transition-all border border-white/5 group">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-['Space_Grotesk',monospace] text-xs uppercase text-[#bbcabf] tracking-wider">
                  Ghaf Trees Planted
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-['Outfit',sans-serif] text-3xl text-[#45dfa4] font-bold">
                    {userStats.treesPlanted}
                  </span>
                  <span className="font-['Space_Grotesk',monospace] text-xs text-[#bbcabf] font-bold">
                    Rooted
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#18202c] flex items-center justify-center text-[#45dfa4] group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  park
                </span>
              </div>
            </div>
            <div className="py-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-[#45dfa4]">explore</span>
              <span className="font-['Space_Grotesk',monospace] text-[10px] text-[#bbcabf] uppercase">
                Al Marmoom Desert Reserve
              </span>
            </div>
            <div className="flex items-center justify-between text-xs pt-1 text-[#bbcabf]">
              <button
                onClick={() => onNavigate('eco-tracker')}
                className="text-[#45dfa4] hover:underline font-['Space_Grotesk',monospace] text-xs uppercase font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>24.848°N, 55.302°E</span>
                <span className="material-symbols-outlined text-xs">open_in_new</span>
              </button>
              <span className="px-2 py-0.5 rounded bg-[#232a37] font-['Space_Grotesk',monospace] text-[10px] text-[#4edea3]">
                GPS Tagged
              </span>
            </div>
          </div>

          {/* Card 3: Eco Streak */}
          <div className="relative rounded-2xl bg-[#141c28]/70 backdrop-blur-md p-4 flex flex-col justify-between shadow-lg hover:bg-[#232a37]/60 transition-all border border-white/5 group">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-['Space_Grotesk',monospace] text-xs uppercase text-[#bbcabf] tracking-wider">
                  Active Eco Streak
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-['Outfit',sans-serif] text-3xl text-[#ffb95f] font-bold">
                    {userStats.streak}
                  </span>
                  <span className="font-['Space_Grotesk',monospace] text-xs text-[#bbcabf] font-bold">
                    Days Flame
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#18202c] flex items-center justify-center text-[#ffb95f] shadow-[0_0_20px_-2px_rgba(245,158,11,0.4)] group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  local_fire_department
                </span>
              </div>
            </div>
            <div className="py-2">
              <div className="flex justify-between items-center text-[#bbcabf] font-['Space_Grotesk',monospace] text-[10px] uppercase mb-1">
                <span>Shield Protection</span>
                <span className="text-[#ffb95f] font-bold">
                  {shieldVerified ? 'Active & Shielded' : 'Armed'}
                </span>
              </div>
              <div className="w-full bg-[#232a37] rounded-full h-2 overflow-hidden flex">
                <div className="bg-gradient-to-r from-[#ffb95f] to-[#e29100] h-full rounded-full w-4/5 shadow-[0_0_8px_rgba(255,185,95,0.6)]"></div>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs pt-1 text-[#bbcabf]">
              <span className="flex items-center gap-1 font-['Space_Grotesk',monospace] text-xs text-[#ffb95f]">
                <span className="material-symbols-outlined text-sm">shield</span> Safe for 34h
              </span>
              <button
                onClick={() => {
                  soundscape.playChime('success');
                  setShieldVerified(true);
                }}
                className={`font-['Space_Grotesk',monospace] text-xs uppercase transition-colors cursor-pointer ${
                  shieldVerified ? 'text-[#4edea3] font-bold' : 'hover:text-[#ffb95f]'
                }`}
              >
                {shieldVerified ? 'Shield Intact' : 'Verify'}
              </button>
            </div>
          </div>

          {/* Card 4: Community XP Standing */}
          <div className="relative rounded-2xl bg-[#141c28]/70 backdrop-blur-md p-4 flex flex-col justify-between shadow-lg hover:bg-[#232a37]/60 transition-all border border-white/5 group">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-['Space_Grotesk',monospace] text-xs uppercase text-[#bbcabf] tracking-wider">
                  Community XP Rank
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-['Outfit',sans-serif] text-3xl text-[#dbe3f4] font-bold">
                    #{userStats.rank}
                  </span>
                  <span className="font-['Space_Grotesk',monospace] text-xs text-[#4edea3] font-bold">
                    Top 3%
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#18202c] flex items-center justify-center text-[#4edea3] group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  military_tech
                </span>
              </div>
            </div>
            <div className="py-2 flex items-center justify-between">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-[#2d3542] flex items-center justify-center font-['Space_Grotesk',monospace] text-[10px] text-[#dbe3f4] font-bold">
                  01
                </div>
                <div className="w-7 h-7 rounded-full bg-[#2d3542] flex items-center justify-center font-['Space_Grotesk',monospace] text-[10px] text-[#dbe3f4] font-bold">
                  02
                </div>
                <div className="w-7 h-7 rounded-full bg-[#4edea3] text-[#003824] flex items-center justify-center font-['Space_Grotesk',monospace] text-[10px] font-bold">
                  YOU
                </div>
              </div>
              <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#bbcabf]">
                {userStats.xp.toLocaleString()} / 3,000 XP
              </span>
            </div>
            <div className="flex items-center justify-between text-xs pt-1 text-[#bbcabf]">
              <span className="font-['Space_Grotesk',monospace] text-xs text-[#4edea3] uppercase">
                Elite Tier
              </span>
              <span>+{Math.max(0, 3000 - userStats.xp)} XP to Lvl 15</span>
            </div>
          </div>
        </div>

        {/* Quick-Access Mission Control Grid */}
        <div className="w-full flex flex-col gap-4 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="font-['Space_Grotesk',monospace] text-xs uppercase text-[#4edea3] tracking-widest block">
                Active Operations
              </span>
              <h2 className="font-['Outfit',sans-serif] text-2xl md:text-3xl font-bold text-[#dbe3f4]">
                Mission Control Grid
              </h2>
            </div>
            <p className="text-xs md:text-sm text-[#bbcabf] max-w-sm">
              Four interconnected biosphere modules designed to turn digital discipline into physical green momentum.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Card A: Recycle Rush Arcade */}
            <div className="md:col-span-6 rounded-2xl bg-[#141c28]/80 backdrop-blur-xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:-translate-y-1 transition-all border border-white/5">
              <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-[#4edea3]/10 rounded-full blur-2xl group-hover:bg-[#4edea3]/20 transition-all"></div>
              <div className="flex flex-col gap-4 z-10">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#232a37] text-[#4edea3] font-['Space_Grotesk',monospace] text-[10px] uppercase font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
                    Gamified Sorting Arcade
                  </span>
                  <div className="flex items-center gap-1 px-3 py-0.5 rounded bg-[#2d3542] text-[#ffb95f] font-['Space_Grotesk',monospace] text-xs font-bold">
                    <span className="material-symbols-outlined text-sm">trophy</span>
                    <span>Best: 8,450 pts</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-['Outfit',sans-serif] text-xl font-bold text-[#dbe3f4]">
                    Recycle Rush Simulator
                  </h3>
                  <p className="text-sm text-[#bbcabf]">
                    Sharpen ultra-rapid sorting skills. Classify e-waste, compostable bioplastics, and glass bottles under pressurized timer runs.
                  </p>
                </div>

                {/* Mini Interactive Arcade Quick Play Widget */}
                <div className="p-3 rounded-xl bg-[#070e1a]/80 flex items-center justify-between gap-3 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#232a37] flex items-center justify-center text-[#4edea3]">
                      <span className="material-symbols-outlined">delete_sweep</span>
                    </div>
                    <div>
                      <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#bbcabf] block">
                        Quick Practice
                      </span>
                      <span className="text-sm font-semibold text-[#dbe3f4]">
                        Current Item: {quickItems[quickSortIndex].name}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <button
                      onClick={handleQuickSort}
                      className="px-4 py-1.5 rounded-full bg-[#10b981] text-[#00422b] font-['Space_Grotesk',monospace] text-xs uppercase font-bold hover:bg-[#4edea3] transition-all cursor-pointer"
                    >
                      Sort Item
                    </button>
                    {quickSortMessage && (
                      <span className="text-[10px] text-[#4edea3] font-bold mt-1 animate-pulse">
                        {quickSortMessage}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between z-10 border-t border-white/5 mt-4">
                <div className="flex items-center gap-2 text-[#bbcabf] font-['Space_Grotesk',monospace] text-[10px] uppercase">
                  <span className="material-symbols-outlined text-sm text-[#4edea3]">speed</span>
                  <span>120 BPM High Speed</span>
                </div>
                <button
                  onClick={() => onNavigate('recycle-rush')}
                  className="px-4 py-2 rounded-full bg-[#4edea3] text-[#003824] font-['Outfit',sans-serif] text-sm font-bold shadow-[0_0_16px_rgba(78,222,163,0.4)] hover:shadow-[0_0_24px_rgba(78,222,163,0.6)] flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Play Arcade</span>
                  <span className="material-symbols-outlined text-base">play_arrow</span>
                </button>
              </div>
            </div>

            {/* Card B: Ghaf Tree Footprint Simulator */}
            <div className="md:col-span-6 rounded-2xl bg-[#141c28]/80 backdrop-blur-xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:-translate-y-1 transition-all border border-white/5">
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#45dfa4]/10 rounded-full blur-2xl group-hover:bg-[#45dfa4]/20 transition-all"></div>
              <div className="flex flex-col gap-4 z-10">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#232a37] text-[#45dfa4] font-['Space_Grotesk',monospace] text-[10px] uppercase font-bold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-xs">forest</span>
                    Bio-Carbon Synthesizer
                  </span>
                  <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#bbcabf]">
                    Updated 12m ago
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-['Outfit',sans-serif] text-xl font-bold text-[#dbe3f4]">
                    Ghaf Tree Footprint Simulator
                  </h3>
                  <p className="text-sm text-[#bbcabf]">
                    Calculate the real-world carbon sequestration capacity of indigenous flora against weekly commuting and residential AC energy draw.
                  </p>
                </div>

                {/* Footprint Interactive Slider */}
                <div className="space-y-2 p-3 rounded-xl bg-[#070e1a]/80 border border-white/5">
                  <div className="flex justify-between text-xs text-[#dbe3f4]">
                    <span className="font-['Space_Grotesk',monospace] text-xs text-[#bbcabf] uppercase">
                      Metro Transit vs Car
                    </span>
                    <span className="text-[#45dfa4] font-bold font-['Space_Grotesk',monospace] text-xs">
                      {transitPercent}% Metro
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={transitPercent}
                    onChange={(e) => setTransitPercent(Number(e.target.value))}
                    className="w-full h-1.5 bg-[#2d3542] rounded-lg appearance-none cursor-pointer accent-[#45dfa4]"
                  />
                  <div className="flex justify-between items-center text-[10px] font-['Space_Grotesk',monospace] uppercase text-[#bbcabf]">
                    <span>
                      Offset Required:{' '}
                      <strong className="text-[#dbe3f4]">
                        {(1.8 - (transitPercent / 100) * 1.2).toFixed(1)} Ghaf Trees / mo
                      </strong>
                    </span>
                    <span className="text-[#4edea3] font-bold">Net Positive Profile</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between z-10 border-t border-white/5 mt-4">
                <span className="font-['Space_Grotesk',monospace] text-xs text-[#bbcabf] uppercase">
                  Model: UAE Desert Flora v2
                </span>
                <button
                  onClick={() => onNavigate('eco-tracker')}
                  className="px-4 py-2 rounded-full bg-[#232a37] hover:bg-[#2d3542] text-[#45dfa4] font-['Space_Grotesk',monospace] text-xs uppercase font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Simulate Impact</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Card C: Heritage & Eco-Trail Explorer */}
            <div className="md:col-span-7 rounded-2xl bg-[#141c28]/80 backdrop-blur-xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:-translate-y-1 transition-all border border-white/5">
              <div className="flex flex-col gap-4 z-10">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#232a37] text-[#ffb95f] font-['Space_Grotesk',monospace] text-[10px] uppercase font-bold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-xs">history_edu</span>
                    Cultural Sustainability
                  </span>
                  <span className="px-3 py-0.5 rounded bg-[#e29100] text-[#523200] font-['Space_Grotesk',monospace] text-[10px] uppercase font-bold">
                    +250 XP Quest
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  <div className="sm:col-span-7 space-y-1">
                    <h3 className="font-['Outfit',sans-serif] text-xl font-bold text-[#dbe3f4]">
                      Heritage & Eco-Trail Explorer
                    </h3>
                    <p className="text-sm text-[#bbcabf]">
                      Explore traditional Emirati <span className="text-[#dbe3f4] font-semibold">Falaj</span> underground irrigation channels and Barjeel wind towers, bridged with contemporary passive architectural cooling.
                    </p>
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-[#18202c] text-[#bbcabf] font-['Space_Grotesk',monospace] text-[10px]">
                        Hatta Mountains
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#18202c] text-[#bbcabf] font-['Space_Grotesk',monospace] text-[10px]">
                        Al Ain Oasis
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#18202c] text-[#bbcabf] font-['Space_Grotesk',monospace] text-[10px]">
                        Passive Air Cooling
                      </span>
                    </div>
                  </div>

                  <div className="sm:col-span-5 h-36 rounded-xl overflow-hidden relative shadow-md">
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform hover:scale-105 duration-500"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBP-wO4hWE5RWGthMkB1iDA7p4SAgbte5gZRgipKv0JFKyZhdS1iyWnKS6ULCZch0NKO0phfuID_Si7QHwMBnwPBN3v0MT7l82FiY4hU0UgLjLjawJtGJ2vi7ssnIygym1JRZEsbKq7ccSTrro135OX7yz_KbXonjvHCMXpDs3yqb_FXTUwLtIb3A76q_yZQ1C6Gwh-Rpgd4PjIkAEBaUEOgoy83STvwgvH-10b_fAoBxmB0AkMSXOJ')",
                      }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c1420]/90 via-transparent to-transparent"></div>
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[#dbe3f4] font-['Space_Grotesk',monospace] text-[10px] uppercase">
                      <span>Falaj Route 03</span>
                      <span className="text-[#ffb95f] font-bold">Interactive 3D</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between z-10 border-t border-white/5 mt-4">
                <div className="flex items-center gap-1.5 text-[#bbcabf] font-['Space_Grotesk',monospace] text-xs">
                  <span className="material-symbols-outlined text-sm text-[#ffb95f]">quiz</span>
                  <span>3 Knowledge Checks Available</span>
                </div>
                <button
                  onClick={() => onNavigate('heritage-trail')}
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-[#e29100] to-[#ffb95f] text-[#472a00] font-['Outfit',sans-serif] text-sm font-bold shadow-[0_0_16px_rgba(245,158,11,0.3)] hover:shadow-[0_0_24px_rgba(245,158,11,0.5)] flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Start Discovery Trail</span>
                  <span className="material-symbols-outlined text-sm">near_me</span>
                </button>
              </div>
            </div>

            {/* Card D: Eco-Focus & Productivity Hub */}
            <div className="md:col-span-5 rounded-2xl bg-[#141c28]/80 backdrop-blur-xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:-translate-y-1 transition-all border border-white/5">
              <div className="flex flex-col gap-3 z-10">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#232a37] text-[#4edea3] font-['Space_Grotesk',monospace] text-[10px] uppercase font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-ping"></span>
                    Deep Work Generator
                  </span>
                  <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#4edea3] font-bold">
                    Live Synced
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <h3 className="font-['Outfit',sans-serif] text-xl font-bold text-[#dbe3f4]">
                      Eco-Focus Hub
                    </h3>
                    <span className="text-xs text-[#bbcabf]">Carbon-neutral Pomodoro sprint</span>
                  </div>

                  {/* Circular Timer Ring Widget */}
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle
                        className="text-[#2d3542]"
                        cx="50"
                        cy="50"
                        fill="none"
                        r="42"
                        stroke="currentColor"
                        strokeWidth="6"
                      ></circle>
                      <circle
                        className="text-[#4edea3] transition-all duration-1000"
                        cx="50"
                        cy="50"
                        fill="none"
                        r="42"
                        stroke="#4edea3"
                        strokeDasharray="263.89"
                        strokeDashoffset={263.89 * (1 - focusSeconds / (25 * 60))}
                        strokeLinecap="round"
                        strokeWidth="6"
                      ></circle>
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="font-['Outfit',sans-serif] text-base font-bold text-[#dbe3f4] tracking-tighter">
                        {formatTimer(focusSeconds)}
                      </span>
                      <span className="font-['Space_Grotesk',monospace] text-[8px] uppercase text-[#4edea3] font-semibold">
                        {isFocusRunning ? 'Active' : 'Paused'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mini Checklist */}
                <div className="space-y-1.5 pt-1">
                  {focusTasks.map((t) => (
                    <label
                      key={t.id}
                      onClick={() => toggleTask(t.id)}
                      className="flex items-center gap-2 text-xs text-[#dbe3f4] cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={t.done}
                        readOnly
                        className="w-4 h-4 rounded accent-[#4edea3] bg-[#232a37] cursor-pointer"
                      />
                      <span className={t.done ? 'line-through text-[#bbcabf]' : 'text-[#dbe3f4]'}>
                        {t.text}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between z-10 border-t border-white/5 mt-4">
                <span className="font-['Space_Grotesk',monospace] text-[10px] text-[#bbcabf] uppercase">
                  0.04 kg CO₂ averted / block
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      soundscape.playChime('click');
                      setIsFocusRunning(!isFocusRunning);
                    }}
                    className={`px-3 py-1.5 rounded-full font-['Space_Grotesk',monospace] text-xs uppercase font-bold transition-all shadow-sm cursor-pointer ${
                      isFocusRunning
                        ? 'bg-[#10b981] text-[#00422b]'
                        : 'bg-[#232a37] text-[#bbcabf]'
                    }`}
                  >
                    {isFocusRunning ? 'Pause Sprint' : 'Resume Sprint'}
                  </button>
                  <button
                    onClick={() => onNavigate('focus-timer')}
                    className="p-1.5 rounded-full bg-[#232a37] text-[#bbcabf] hover:text-[#dbe3f4]"
                    title="Open Full Focus Hub"
                  >
                    <span className="material-symbols-outlined text-sm">open_in_full</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Feats & Community Stewardship Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Recent Ranger Feats Feed */}
          <div className="lg:col-span-7 rounded-2xl bg-[#141c28]/70 backdrop-blur-xl p-6 flex flex-col gap-4 shadow-xl border border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4edea3] text-xl">rss_feed</span>
                <h3 className="font-['Outfit',sans-serif] text-xl font-bold text-[#dbe3f4]">
                  Recent Ranger Feats
                </h3>
              </div>
              <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#bbcabf] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#45dfa4] animate-pulse"></span>
                Global Grid Sync
              </span>
            </div>

            <div className="space-y-3">
              {feats.map((feat) => (
                <div
                  key={feat.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#232a37]/60 hover:bg-[#232a37] transition-colors border border-white/5"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#18202c] flex items-center justify-center font-['Space_Grotesk',monospace] text-xs font-bold text-[#4edea3]">
                      {feat.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[#dbe3f4]">{feat.name}</span>
                        <span className="px-1.5 py-0.2 rounded bg-[#2d3542] text-[#45dfa4] font-['Space_Grotesk',monospace] text-[10px]">
                          {feat.location}
                        </span>
                      </div>
                      <p className="text-xs text-[#bbcabf] mt-0.5">{feat.description}</p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className={`font-['Space_Grotesk',monospace] text-xs font-bold ${feat.colorClass}`}>
                      +{feat.xp} XP
                    </span>
                    <span className="font-['Space_Grotesk',monospace] text-[10px] text-[#86948a]">
                      {feat.timeAgo}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-white/5">
              <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#86948a]">
                Showing {feats.length} of 1,280 Daily Feats
              </span>
              <button
                onClick={() => setIsChallengeModalOpen(true)}
                className="font-['Space_Grotesk',monospace] text-xs uppercase text-[#4edea3] hover:text-[#45dfa4] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Broadcast Your Feat</span>
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </div>
          </div>

          {/* Right: Weekly Biome Quest & Map Hub */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Weekly Quest Card */}
            <div className="w-full rounded-2xl bg-[#141c28]/70 backdrop-blur-xl p-6 flex flex-col gap-4 shadow-xl border border-white/5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-['Space_Grotesk',monospace] text-xs uppercase text-[#4edea3] tracking-widest block">
                    Active Syndicate Sprint
                  </span>
                  <h3 className="font-['Outfit',sans-serif] text-xl font-bold text-[#dbe3f4]">
                    Weekly Biome Quest
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#2d3542] font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#ffb95f] font-bold">
                  3 Days Left
                </span>
              </div>

              <p className="text-sm text-[#bbcabf] leading-relaxed">
                Target:{' '}
                <span className="text-[#dbe3f4] font-semibold">
                  Plant 3 Virtual Ghaf Trees before Friday
                </span>{' '}
                to trigger a physical root sponsorship at Al Marmoom reserve.
              </p>

              <div className="space-y-1.5">
                <div className="flex justify-between font-['Space_Grotesk',monospace] text-xs text-[#dbe3f4]">
                  <span>Biome Progress: {questTrees} of 3 Planted</span>
                  <span className="text-[#4edea3] font-bold">
                    {Math.round((questTrees / 3) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-[#232a37] rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#4edea3] to-[#45dfa4] h-full rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(78,222,163,0.5)]"
                    style={{ width: `${(questTrees / 3) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#070e1a]/80 flex items-center justify-between border border-white/5">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#ffb95f] text-2xl">
                    workspace_premium
                  </span>
                  <div>
                    <span className="text-xs font-semibold text-[#dbe3f4] block">
                      Reward: Bronze Ghaf Seal
                    </span>
                    <span className="font-['Space_Grotesk',monospace] text-[10px] text-[#bbcabf] uppercase">
                      +400 XP & Certified Carbon Token
                    </span>
                  </div>
                </div>
                <button
                  onClick={handlePlantQuestTree}
                  disabled={questClaimed}
                  className={`px-4 py-1.5 rounded-full font-['Space_Grotesk',monospace] text-xs uppercase font-bold transition-all cursor-pointer ${
                    questClaimed
                      ? 'bg-[#10b981] text-[#00422b] cursor-default'
                      : questTrees >= 3
                      ? 'bg-[#ffb95f] text-[#472a00] hover:scale-105'
                      : 'bg-[#232a37] text-[#4edea3] hover:bg-[#10b981] hover:text-[#00422b]'
                  }`}
                >
                  {questClaimed ? 'Claimed!' : questTrees >= 3 ? 'Claim +400 XP' : 'Plant +1'}
                </button>
              </div>
            </div>

            {/* Geographic Reserve Snapshot */}
            <div className="w-full rounded-2xl bg-[#141c28]/70 backdrop-blur-xl p-4 flex flex-col gap-2 shadow-xl border border-white/5">
              <div className="flex items-center justify-between">
                <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#bbcabf]">
                  Field Map Coordinates
                </span>
                <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#45dfa4] font-bold">
                  Node #DXB-9
                </span>
              </div>

              <div
                className="w-full h-36 bg-cover bg-center rounded-xl relative overflow-hidden shadow-md flex items-end p-3 group"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC06v__6JCagfkTsGHeBG-20F_oui3Ry1DYKg6eVyWhyfRyZu9XZo4xQmL4tV6I4R_3yRukBOD6Ls-V4EL4tL7qa0UU7goUHRC49_My6wubE2D-gvQeRqQW578w1wF0I6Igs9WDOigxXo00Rth_Gn1N3Bb6HMHTL0g-jR_vNPvKaWJoACgjScVMnAXSYX3hDVxO5joCrkThyUhKnA6ulbgx9s5K3omVJEXYpdajqhT14QJrNTrA5yii')",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1420] via-transparent to-transparent pointer-events-none"></div>
                <div className="relative z-10 flex items-center justify-between w-full">
                  <div className="flex items-center gap-1.5 text-[#dbe3f4] font-['Space_Grotesk',monospace] text-[10px] uppercase">
                    <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-ping"></span>
                    <span>Al Marmoom Reserve Canopy</span>
                  </div>
                  <button
                    onClick={() => {
                      soundscape.playChime('click');
                      setLiveCamActive(!liveCamActive);
                    }}
                    className={`px-2 py-0.5 rounded font-['Space_Grotesk',monospace] text-[10px] font-bold cursor-pointer transition-colors ${
                      liveCamActive
                        ? 'bg-[#070e1a]/80 text-[#4edea3]'
                        : 'bg-[#232a37] text-[#bbcabf]'
                    }`}
                  >
                    {liveCamActive ? 'Active Live Cam' : 'Cam Standby'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EcoChallengeModal
        isOpen={isChallengeModalOpen}
        onClose={() => setIsChallengeModalOpen(false)}
        onConfirm={handleChallengeConfirm}
      />
    </div>
  );
};
