import React, { useState } from 'react';
import { UserStats } from '../types';
import { soundscape } from '../utils/audio';

interface EcoTrackerScreenProps {
  userStats: UserStats;
  onUpdateStats: (updater: (prev: UserStats) => UserStats) => void;
}

export const EcoTrackerScreen: React.FC<EcoTrackerScreenProps> = ({
  userStats,
  onUpdateStats,
}) => {
  // Simulator parameters
  const [transportVal, setTransportVal] = useState<number>(0.4);
  const [transportLabel, setTransportLabel] = useState<string>('0.40 kg CO₂e');

  const [waterVal, setWaterVal] = useState<number>(0.35);
  const [waterLabel, setWaterLabel] = useState<string>('0.35 kg CO₂e (45L)');

  const [wasteVal, setWasteVal] = useState<number>(0.45);
  const [wasteLabel, setWasteLabel] = useState<string>('0.45 kg CO₂e');

  const [dietChecked, setDietChecked] = useState<boolean>(true);
  const [acChecked, setAcChecked] = useState<boolean>(true);

  // Tree growth state
  const [activeStage, setActiveStage] = useState<number>(4);
  const [treeScale, setTreeScale] = useState<boolean>(false);
  const [waterFx, setWaterFx] = useState<{ id: number; text: string }[]>([]);

  const UAE_BASELINE = 5.53;

  // Calculation
  let grossFootprint = transportVal + waterVal + wasteVal + 2.0;
  if (dietChecked) grossFootprint -= 0.65;
  if (acChecked) grossFootprint -= 0.45;
  grossFootprint = Math.max(0.75, grossFootprint);

  const diffPercent = Math.round(((UAE_BASELINE - grossFootprint) / UAE_BASELINE) * 100);
  const vitalityPercent = Math.min(99, Math.max(45, Math.round(100 - (grossFootprint / UAE_BASELINE) * 45)));

  const handleWaterGhaf = () => {
    soundscape.playChime('water');
    onUpdateStats((prev) => ({
      ...prev,
      xp: prev.xp + 5,
    }));

    setTreeScale(true);
    setTimeout(() => setTreeScale(false), 350);

    const fxId = Date.now();
    setWaterFx((prev) => [...prev, { id: fxId, text: '+5 XP Watered' }]);
    setTimeout(() => {
      setWaterFx((prev) => prev.filter((item) => item.id !== fxId));
    }, 900);
  };

  const handleRecalculate = () => {
    soundscape.playChime('success');
  };

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full overflow-hidden px-4 md:px-12 py-8 max-w-[1440px] mx-auto">
        {/* Dynamic Atmospheric Glow Background Vectors */}
        <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-[#4edea3]/10 blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/2 -right-20 w-80 h-80 rounded-full bg-[#ffb95f]/10 blur-[140px] pointer-events-none"></div>

        {/* Editorial Header HUD Cluster */}
        <div className="relative z-10 max-w-7xl mx-auto mb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#232a37]/80 backdrop-blur-md shadow-sm border border-white/5">
              <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-ping"></span>
              <span className="font-['Space_Grotesk',monospace] text-[10px] text-[#4edea3] uppercase font-bold tracking-widest">
                Al Ghaf Biosphere Telemetry • UAE Baseline 2026
              </span>
            </div>
            <div className="flex items-center gap-4 font-['Space_Grotesk',monospace] text-[10px] text-[#bbcabf]">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#45dfa4]">satellite_alt</span>
                SATELLITE SYNC: NOMINAL
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#ffb95f]">wb_sunny</span>
                SOLAR INDEX: 9.4 UV
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-['Outfit',sans-serif] text-3xl md:text-4xl text-[#dbe3f4] tracking-tight font-bold">
                Eco-Tracker & UAE Carbon Footprint Simulator
              </h1>
              <p className="text-base text-[#bbcabf] max-w-3xl mt-1 leading-relaxed">
                Adjust your daily lifestyle parameters to simulate your environmental impact and nurture your digital Ghaf Tree in real time.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-[#141c28]/90 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-md border border-white/5">
              <div className="w-3 h-10 rounded-full bg-gradient-to-b from-[#4edea3] via-[#45dfa4] to-[#ffb95f]"></div>
              <div>
                <div className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#bbcabf] tracking-wider">
                  Region Baseline
                </div>
                <div className="font-['Space_Grotesk',monospace] text-xs text-[#dbe3f4] font-bold">
                  5.53 kg CO₂e / Cap / Day
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Desktop Architecture */}
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: Lifestyle Simulator */}
          <section className="lg:col-span-7 flex flex-col gap-6 bg-[#141c28]/80 backdrop-blur-2xl p-6 rounded-2xl shadow-xl border border-white/5">
            {/* Module Header */}
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#232a37] flex items-center justify-center text-[#4edea3] shadow-inner">
                  <span className="material-symbols-outlined text-lg">tune</span>
                </span>
                <div>
                  <h2 className="font-['Outfit',sans-serif] text-lg font-bold text-[#dbe3f4]">
                    Telemetry Adjustment Console
                  </h2>
                  <p className="font-['Space_Grotesk',monospace] text-[10px] text-[#bbcabf] uppercase tracking-wider">
                    Input your current lifestyle parameters
                  </p>
                </div>
              </div>
              <span className="font-['Space_Grotesk',monospace] text-xs px-3 py-1 rounded-full bg-[#4edea3]/10 text-[#4edea3] uppercase font-bold tracking-wider">
                Active Stream
              </span>
            </div>

            {/* Section 1: Daily Transport Mode */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-[#dbe3f4] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#4edea3] text-base">
                    directions_transit
                  </span>
                  1. Daily Commute & Transport Mode
                </label>
                <span className="font-['Space_Grotesk',monospace] text-xs text-[#4edea3] font-bold">
                  {transportLabel}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  { id: 'walk', label: 'Walk / Cycle', val: 0.0, str: '0.00 kg CO₂e', icon: 'pedal_bike' },
                  { id: 'metro', label: 'Metro / EV Transit', val: 0.4, str: '+0.4 kg CO₂e', icon: 'tram' },
                  { id: 'hybrid', label: 'Hybrid Fleet', val: 1.8, str: '+1.8 kg CO₂e', icon: 'electric_car' },
                  { id: 'petrol', label: 'Solo Petrol', val: 4.2, str: '+4.2 kg CO₂e', icon: 'directions_car' },
                ].map((item) => {
                  const isSelected = transportVal === item.val;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        soundscape.playChime('click');
                        setTransportVal(item.val);
                        setTransportLabel(item.val === 0 ? '0.00 kg CO₂e' : `${item.val.toFixed(2)} kg CO₂e`);
                      }}
                      className={`group flex flex-col items-start p-3 rounded-xl text-left transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-[#10b981] text-[#00422b] shadow-md border-transparent font-bold'
                          : 'bg-[#232a37]/60 hover:bg-[#232a37] text-[#dbe3f4] border-white/5'
                      }`}
                    >
                      <span className={`material-symbols-outlined text-xl mb-1 ${isSelected ? 'text-[#00422b]' : 'text-[#bbcabf] group-hover:text-[#4edea3]'}`}>
                        {item.icon}
                      </span>
                      <span className="text-xs font-semibold">{item.label}</span>
                      <span className={`font-['Space_Grotesk',monospace] text-[10px] ${isSelected ? 'text-[#00422b]/80' : 'text-[#bbcabf]'}`}>
                        {item.str}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 2: Water Conservation Habits */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-[#dbe3f4] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#45dfa4] text-base">
                    water_drop
                  </span>
                  2. Water Conservation Habits
                </label>
                <span className="font-['Space_Grotesk',monospace] text-xs text-[#45dfa4] font-bold">
                  {waterLabel}
                </span>
              </div>

              <div className="space-y-2">
                {[
                  {
                    val: 0.12,
                    label: '0.12 kg CO₂e (18L)',
                    title: '5-min Eco-Shower with aerator',
                    sub: 'Optimal flow regulator, 18 liters total',
                    badge: 'Optimum',
                    badgeColor: 'text-[#45dfa4] bg-[#45dfa4]/10',
                  },
                  {
                    val: 0.35,
                    label: '0.35 kg CO₂e (45L)',
                    title: 'Conscious 10-min wash',
                    sub: 'Moderate consumption, non-aerated head',
                    badge: 'Standard',
                    badgeColor: 'text-[#bbcabf] bg-[#070e1a]',
                  },
                  {
                    val: 1.1,
                    label: '1.10 kg CO₂e (120L)',
                    title: 'High flow unchecked bath',
                    sub: 'Unregulated pressure, full immersion basin',
                    badge: 'Deficit',
                    badgeColor: 'text-[#ffb4ab] bg-[#93000a]/20',
                  },
                ].map((w) => {
                  const isChecked = waterVal === w.val;
                  return (
                    <label
                      key={w.val}
                      onClick={() => {
                        soundscape.playChime('click');
                        setWaterVal(w.val);
                        setWaterLabel(w.label);
                      }}
                      className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${
                        isChecked
                          ? 'bg-[#232a37] border-[#45dfa4]/40 shadow-sm'
                          : 'bg-[#18202c] border-white/5 hover:bg-[#232a37]/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="water-habit"
                          checked={isChecked}
                          onChange={() => {}}
                          className="accent-[#4edea3] w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <div className="text-xs font-semibold text-[#dbe3f4]">{w.title}</div>
                          <div className="font-['Space_Grotesk',monospace] text-[10px] text-[#bbcabf]">
                            {w.sub}
                          </div>
                        </div>
                      </div>
                      <span className={`font-['Space_Grotesk',monospace] text-[10px] font-bold px-2.5 py-0.5 rounded-full ${w.badgeColor}`}>
                        {w.badge}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Section 3: Waste & Material Recovery Habits */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-[#dbe3f4] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#4edea3] text-base">
                    recycling
                  </span>
                  3. Waste & Material Recovery Habits
                </label>
                <span className="font-['Space_Grotesk',monospace] text-xs text-[#4edea3] font-bold">
                  {wasteLabel}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {[
                  {
                    val: 0.05,
                    label: '0.05 kg CO₂e',
                    tier: '100% Recovery',
                    name: 'Zero-Waste Champion',
                    desc: 'Compost + full sorting',
                    tierColor: 'text-[#4edea3]',
                  },
                  {
                    val: 0.45,
                    label: '0.45 kg CO₂e',
                    tier: '60-80% Recovery',
                    name: 'Active Sorter',
                    desc: 'Plastics & carton bins',
                    tierColor: 'text-[#4edea3]',
                  },
                  {
                    val: 1.3,
                    label: '1.30 kg CO₂e',
                    tier: '<10% Recovery',
                    name: 'Casual Disposal',
                    desc: 'Single stream landfill',
                    tierColor: 'text-[#ffb4ab]',
                  },
                ].map((item) => {
                  const isSelected = wasteVal === item.val;
                  return (
                    <button
                      key={item.val}
                      type="button"
                      onClick={() => {
                        soundscape.playChime('click');
                        setWasteVal(item.val);
                        setWasteLabel(item.label);
                      }}
                      className={`p-3 rounded-xl text-left transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-[#10b981] text-[#00422b] shadow-md border-transparent font-bold'
                          : 'bg-[#18202c] border-white/5 hover:bg-[#232a37] text-[#dbe3f4]'
                      }`}
                    >
                      <div className={`font-['Space_Grotesk',monospace] text-[10px] uppercase font-bold tracking-wider mb-0.5 ${isSelected ? 'text-[#00422b]/90' : item.tierColor}`}>
                        {item.tier}
                      </div>
                      <div className="text-xs font-semibold">{item.name}</div>
                      <div className={`font-['Space_Grotesk',monospace] text-[10px] mt-1 ${isSelected ? 'text-[#00422b]/80' : 'text-[#bbcabf]'}`}>
                        {item.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 4: Diet & Energy Toggles */}
            <div className="space-y-2.5">
              <label className="text-sm font-semibold text-[#dbe3f4] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ffb95f] text-base">bolt</span>
                4. Micro-Actions: Diet & Ambient Climate Control
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="flex items-center justify-between p-3 rounded-xl bg-[#232a37]/60 hover:bg-[#232a37] cursor-pointer transition-colors border border-white/5">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[#ffb95f]">eco</span>
                    <div>
                      <div className="text-xs font-semibold text-[#dbe3f4]">Plant-forward meals today</div>
                      <div className="font-['Space_Grotesk',monospace] text-[10px] text-[#bbcabf]">
                        Drawdown: -0.65 kg CO₂e
                      </div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={dietChecked}
                    onChange={(e) => {
                      soundscape.playChime('click');
                      setDietChecked(e.target.checked);
                    }}
                    className="w-5 h-5 rounded accent-[#4edea3] cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-[#232a37]/60 hover:bg-[#232a37] cursor-pointer transition-colors border border-white/5">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[#4edea3]">mode_fan</span>
                    <div>
                      <div className="text-xs font-semibold text-[#dbe3f4]">AC set to 24°C eco-mode</div>
                      <div className="font-['Space_Grotesk',monospace] text-[10px] text-[#bbcabf]">
                        Drawdown: -0.45 kg CO₂e
                      </div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={acChecked}
                    onChange={(e) => {
                      soundscape.playChime('click');
                      setAcChecked(e.target.checked);
                    }}
                    className="w-5 h-5 rounded accent-[#4edea3] cursor-pointer"
                  />
                </label>
              </div>
            </div>

            {/* Simulator Result & Action HUD */}
            <div className="mt-2 p-4 rounded-2xl bg-[#2d3542]/60 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4 shadow-inner border border-white/5">
              <div>
                <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#bbcabf] tracking-wider block">
                  Estimated Ecological Drawdown
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-['Outfit',sans-serif] text-3xl font-bold text-[#4edea3]">
                    {grossFootprint.toFixed(2)}
                  </span>
                  <span className="font-['Space_Grotesk',monospace] text-xs text-[#dbe3f4]">
                    kg CO₂e / day
                  </span>
                </div>
                <div className="font-['Space_Grotesk',monospace] text-[10px] text-[#45dfa4] font-semibold flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-sm">trending_down</span>
                  <span>{diffPercent}% lower than national average ({UAE_BASELINE} kg)</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleRecalculate}
                className="w-full md:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#10b981] to-[#00bd85] hover:from-[#4edea3] hover:to-[#45dfa4] text-[#00422b] font-['Space_Grotesk',monospace] text-xs uppercase font-bold tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">sync</span>
                <span>Recalculate Biome Score</span>
              </button>
            </div>
          </section>

          {/* RIGHT COLUMN: Gamified Ghaf Tree Growth Visualizer */}
          <section className="lg:col-span-5 flex flex-col gap-4">
            <div className="relative overflow-hidden rounded-2xl bg-[#141c28]/90 backdrop-blur-2xl shadow-xl flex flex-col border border-white/5">
              {/* Top HUD Meta Bar */}
              <div className="px-4 pt-4 pb-2 flex items-center justify-between z-20">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#45dfa4]"></span>
                  <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase tracking-wider text-[#dbe3f4] font-bold">
                    Prosopis Cineraria Node #84
                  </span>
                </div>
                <div className="px-2 py-0.5 rounded bg-[#232a37] font-['Space_Grotesk',monospace] text-[10px] text-[#ffb95f] font-bold tracking-widest uppercase">
                  Endemic UAE Bio-Sentinel
                </div>
              </div>

              {/* Stage Progress Step Indicator */}
              <div className="px-4 py-2 z-20">
                <div className="grid grid-cols-4 gap-2 text-center">
                  {[
                    { stage: 1, label: '1. Seedling' },
                    { stage: 2, label: '2. Sprout' },
                    { stage: 3, label: '3. Sapling' },
                    { stage: 4, label: '4. Majestic' },
                  ].map((s) => {
                    const isActive = activeStage >= s.stage;
                    const isCurrent = activeStage === s.stage;
                    return (
                      <button
                        key={s.stage}
                        onClick={() => {
                          soundscape.playChime('click');
                          setActiveStage(s.stage);
                        }}
                        className="flex flex-col items-center gap-1 cursor-pointer focus:outline-none"
                      >
                        <div
                          className={`w-full h-1.5 rounded-full shadow-sm transition-all ${
                            isCurrent
                              ? 'bg-[#ffb95f]'
                              : isActive
                              ? 'bg-[#4edea3]'
                              : 'bg-[#232a37]'
                          }`}
                        ></div>
                        <span
                          className={`font-['Space_Grotesk',monospace] text-[10px] ${
                            isCurrent
                              ? 'text-[#ffb95f] font-bold'
                              : isActive
                              ? 'text-[#dbe3f4] font-semibold'
                              : 'text-[#bbcabf]'
                          }`}
                        >
                          {s.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Visual Display: The Living Ghaf Tree Biome */}
              <div className="relative w-full h-96 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#070e1a] via-[#141c28] to-[#0c1420]">
                {/* Ambient Desert Dusk Glow */}
                <div className="absolute inset-0 bg-radial from-[#ffb95f]/10 via-transparent to-transparent opacity-60"></div>

                {/* Animated Bio-Luminescent Particles */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                  <circle className="animate-ping" cx="15%" cy="30%" fill="#4edea3" r="2" style={{ animationDuration: '3s' }}></circle>
                  <circle className="animate-pulse" cx="78%" cy="25%" fill="#ffb95f" r="1.5" style={{ animationDuration: '2.2s' }}></circle>
                  <circle className="animate-pulse" cx="85%" cy="65%" fill="#45dfa4" r="2.5" style={{ animationDuration: '4s' }}></circle>
                  <circle className="animate-ping" cx="22%" cy="75%" fill="#6ffbbe" r="1" style={{ animationDuration: '5s' }}></circle>
                  <circle className="animate-pulse" cx="50%" cy="15%" fill="#ffddb8" r="2" style={{ animationDuration: '3.5s' }}></circle>
                </svg>

                {/* Vector Root Network into Desert Sand Base */}
                <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-[#232a37]/90 to-transparent flex items-end justify-center pointer-events-none">
                  <svg className="w-full h-16 text-[#3c4a42]/40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 400 60">
                    <path d="M200 10 Q190 35 150 55 M200 10 Q215 30 260 55 M200 10 Q180 40 120 50 M200 10 Q225 38 290 48 M150 55 Q130 58 100 60 M260 55 Q290 58 330 60"></path>
                  </svg>
                </div>

                {/* Majestic Ghaf Tree Custom Render Canvas SVG */}
                <div
                  className={`relative z-10 w-80 h-80 flex items-center justify-center transition-all duration-500 transform ${
                    treeScale ? 'scale-105' : 'hover:scale-102'
                  }`}
                >
                  <svg className="w-full h-full" fill="none" viewBox="0 0 320 320">
                    {/* Deep Taproot */}
                    <path d="M160 250 L160 295" stroke="#3c4a42" strokeLinecap="round" strokeWidth="4"></path>
                    <path d="M160 265 Q145 285 125 300" stroke="#3c4a42" strokeLinecap="round" strokeWidth="2.5"></path>
                    <path d="M160 270 Q175 288 198 302" stroke="#3c4a42" strokeLinecap="round" strokeWidth="2.5"></path>

                    {/* Trunk & Bark Texture */}
                    <path d="M152 250 C154 200, 142 165, 150 130 C155 105, 160 90, 160 85" stroke="#2d3542" strokeLinecap="round" strokeWidth="12"></path>
                    <path d="M152 250 C154 200, 142 165, 150 130 C155 105, 160 90, 160 85" stroke="#4edea3" strokeDasharray="6 8" strokeOpacity="0.3" strokeWidth="1.5"></path>

                    {/* Primary Branches */}
                    <path d="M150 155 Q120 135 95 115" stroke="#2d3542" strokeLinecap="round" strokeWidth="7"></path>
                    <path d="M155 140 Q188 120 225 105" stroke="#2d3542" strokeLinecap="round" strokeWidth="7"></path>
                    <path d="M152 110 Q130 90 110 70" stroke="#2d3542" strokeLinecap="round" strokeWidth="5"></path>
                    <path d="M158 100 Q180 80 205 60" stroke="#2d3542" strokeLinecap="round" strokeWidth="5"></path>

                    {/* Foliage Canopy Micro-Clouds */}
                    {/* Foliage Left */}
                    <circle cx="95" cy="115" fill="#00422b" fillOpacity="0.75" r="28"></circle>
                    <circle cx="85" cy="105" fill="#10b981" fillOpacity="0.65" r="22"></circle>
                    <circle cx="100" cy="98" fill="#4edea3" fillOpacity="0.45" r="18"></circle>

                    {/* Foliage Right */}
                    <circle cx="225" cy="105" fill="#00422b" fillOpacity="0.75" r="32"></circle>
                    <circle cx="235" cy="95" fill="#10b981" fillOpacity="0.7" r="24"></circle>
                    <circle cx="215" cy="85" fill="#4edea3" fillOpacity="0.5" r="20"></circle>

                    {/* Foliage Central Apex */}
                    <circle cx="160" cy="70" fill="#00422b" fillOpacity="0.8" r="36"></circle>
                    <circle cx="145" cy="55" fill="#10b981" fillOpacity="0.7" r="28"></circle>
                    <circle cx="175" cy="55" fill="#4edea3" fillOpacity="0.6" r="26"></circle>
                    <circle cx="160" cy="42" fill="#6ffbbe" fillOpacity="0.4" r="18"></circle>

                    {/* Radiant Desert Sunlight Spark */}
                    <circle className="animate-pulse" cx="160" cy="40" fill="#ffb95f" r="6"></circle>

                    {/* Desert Gazelle near roots */}
                    <g transform="translate(68, 222) scale(0.65)">
                      <path d="M20 25 Q35 15 50 25 Q58 35 48 42 L22 42 Z" fill="#ffb95f" fillOpacity="0.85"></path>
                      <path d="M48 28 Q52 10 58 5 Q64 3 66 8 Q60 18 52 30 Z" fill="#ffddb8"></path>
                      <path d="M60 4 Q63 -5 68 -8" stroke="#dbe3f4" strokeLinecap="round" strokeWidth="2"></path>
                      <path d="M24 42 L22 55 M46 42 L48 55" stroke="#ffb95f" strokeWidth="2"></path>
                    </g>

                    {/* Hoopoe Bird perched on eastern bough */}
                    <g transform="translate(205, 78) scale(0.55)">
                      <path d="M10 20 Q20 15 32 24 L22 32 Z" fill="#ffb95f"></path>
                      <path d="M10 20 L2 28 L6 30 Z" fill="#2d3542"></path>
                      <circle cx="34" cy="18" fill="#ffddb8" r="5"></circle>
                      <path d="M32 14 L36 4 L38 15" stroke="#ffb95f" strokeWidth="2"></path>
                      <path d="M38 19 L48 21" stroke="#2d3542" strokeLinecap="round" strokeWidth="1.5"></path>
                    </g>
                  </svg>
                </div>

                {/* Floating Feedback Particle Spawner */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  {waterFx.map((fx) => (
                    <div
                      key={fx.id}
                      className="absolute font-['Space_Grotesk',monospace] text-xs font-bold text-[#45dfa4] bg-[#232a37] px-3 py-1 rounded-full shadow-lg pointer-events-none animate-in fade-in slide-in-from-bottom-6 duration-500"
                    >
                      <span className="inline-flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">water_drop</span>
                        {fx.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Ambient Status Indicator Badge on tree base */}
                <div className="absolute bottom-3 left-4 flex items-center gap-2 bg-[#232a37]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/5">
                  <span className="w-2 h-2 rounded-full bg-[#45dfa4]"></span>
                  <span className="font-['Space_Grotesk',monospace] text-[10px] text-[#dbe3f4] font-semibold uppercase tracking-wider">
                    Arabian Oryx & Hoopoe Protected
                  </span>
                </div>
              </div>

              {/* Bottom HUD Stats & Action */}
              <div className="p-4 bg-[#18202c] space-y-3 border-t border-white/5">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-['Space_Grotesk',monospace] text-xs text-[#dbe3f4] uppercase font-bold tracking-wider flex items-center gap-1">
                      <span className="material-symbols-outlined text-[#4edea3] text-sm">vital_signs</span>
                      Vitality Gauge
                    </span>
                    <span className="font-['Space_Grotesk',monospace] text-xs text-[#4edea3] font-bold">
                      {vitalityPercent}% • {vitalityPercent > 80 ? 'Thriving Oasis Tier' : 'Stable Growth Tier'}
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-[#070e1a] overflow-hidden p-0.5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#00bd85] via-[#4edea3] to-[#ffb95f] transition-all duration-500 shadow-sm"
                      style={{ width: `${vitalityPercent}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-1 flex items-center gap-3">
                  <button
                    onClick={handleWaterGhaf}
                    type="button"
                    className="flex-1 py-2.5 px-4 rounded-full bg-[#232a37] hover:bg-[#2d3542] text-[#4edea3] hover:text-[#6ffbbe] font-['Space_Grotesk',monospace] text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all shadow-md group cursor-pointer border border-white/5"
                  >
                    <span className="material-symbols-outlined text-lg text-[#45dfa4] group-hover:scale-125 transition-transform">
                      water_drop
                    </span>
                    <span>Water Virtual Ghaf (+5 XP)</span>
                  </button>

                  <div className="px-4 py-2.5 rounded-full bg-[#070e1a] flex items-center gap-1 font-['Space_Grotesk',monospace] text-xs text-[#ffb95f] font-bold shadow-inner border border-white/5">
                    <span className="material-symbols-outlined text-sm">stars</span>
                    <span>{userStats.xp.toLocaleString()} XP</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Biosphere Context Card */}
            <div className="p-4 rounded-2xl bg-[#141c28]/70 backdrop-blur-md flex items-center gap-4 shadow-sm border border-white/5">
              <div className="w-12 h-12 rounded-xl bg-[#4edea3]/10 flex-shrink-0 flex items-center justify-center text-[#4edea3]">
                <span className="material-symbols-outlined text-2xl">park</span>
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-[#dbe3f4] truncate">Why the National Ghaf Matters</h3>
                <p className="font-['Space_Grotesk',monospace] text-[10px] text-[#bbcabf] line-clamp-2 mt-0.5 leading-relaxed">
                  With taproots penetrating up to 30 meters beneath Dubai dunes, each mature Ghaf stabilizes moving sands and sequesters 34kg of CO₂ annually.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Unlockable Badges & Achievements Section (Bottom) */}
        <section className="relative z-10 max-w-7xl mx-auto mt-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-1 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-[#ffb95f] text-lg">military_tech</span>
                <span className="font-['Space_Grotesk',monospace] text-[10px] text-[#ffb95f] uppercase font-bold tracking-widest">
                  Planetary Stewardship Honors
                </span>
              </div>
              <h2 className="font-['Outfit',sans-serif] text-2xl md:text-3xl font-bold text-[#dbe3f4]">
                Stewardship Badges & Environmental Feats
              </h2>
            </div>
            <div className="font-['Space_Grotesk',monospace] text-xs text-[#bbcabf]">
              Progress: <span className="text-[#4edea3] font-bold">4 Unlocked</span> / 2 Locked
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Badge 1: Water Guardian */}
            <div className="relative group p-4 rounded-2xl bg-[#141c28]/90 backdrop-blur-md hover:bg-[#232a37] transition-all shadow-md border border-white/5">
              <div className="flex items-start gap-4">
                <div className="relative w-14 h-14 rounded-2xl bg-[#45dfa4]/15 flex items-center justify-center text-[#45dfa4] flex-shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-3xl">water_damage</span>
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#45dfa4] flex items-center justify-center text-[#003824] text-[10px] font-bold">
                    ✓
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-['Outfit',sans-serif] text-base font-bold text-[#dbe3f4] truncate">
                      Water Guardian
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#45dfa4]/20 text-[#45dfa4] font-['Space_Grotesk',monospace] text-[10px] uppercase font-bold">
                      +150 XP
                    </span>
                  </div>
                  <p className="text-xs text-[#bbcabf] mt-0.5 line-clamp-1">
                    Saved 500L water via low-flow aeration
                  </p>
                  <div className="mt-2 flex items-center gap-1.5 font-['Space_Grotesk',monospace] text-[10px] text-[#45dfa4] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#45dfa4]"></span>
                    <span>Unlocked on 14 Feb 2026</span>
                  </div>
                </div>
              </div>
              <div className="hidden group-hover:block absolute bottom-full left-4 mb-2 z-30 w-64 p-3 rounded-xl bg-[#2d3542] text-[#dbe3f4] shadow-2xl font-['Space_Grotesk',monospace] text-[10px] border border-white/10 leading-relaxed">
                Verified via smart meter sync: Maintained sub-40L daily consumption across 14 consecutive observation cycles.
              </div>
            </div>

            {/* Badge 2: Metro Nomad */}
            <div className="relative group p-4 rounded-2xl bg-[#141c28]/90 backdrop-blur-md hover:bg-[#232a37] transition-all shadow-md border border-white/5">
              <div className="flex items-start gap-4">
                <div className="relative w-14 h-14 rounded-2xl bg-[#4edea3]/15 flex items-center justify-center text-[#4edea3] flex-shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-3xl">directions_subway</span>
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#4edea3] flex items-center justify-center text-[#003824] text-[10px] font-bold">
                    ✓
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-['Outfit',sans-serif] text-base font-bold text-[#dbe3f4] truncate">
                      Metro Nomad
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#4edea3]/20 text-[#4edea3] font-['Space_Grotesk',monospace] text-[10px] uppercase font-bold">
                      +200 XP
                    </span>
                  </div>
                  <p className="text-xs text-[#bbcabf] mt-0.5 line-clamp-1">
                    10 consecutive public transit commutes
                  </p>
                  <div className="mt-2 flex items-center gap-1.5 font-['Space_Grotesk',monospace] text-[10px] text-[#4edea3] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
                    <span>Unlocked on 28 Feb 2026</span>
                  </div>
                </div>
              </div>
              <div className="hidden group-hover:block absolute bottom-full left-4 mb-2 z-30 w-64 p-3 rounded-xl bg-[#2d3542] text-[#dbe3f4] shadow-2xl font-['Space_Grotesk',monospace] text-[10px] border border-white/10 leading-relaxed">
                Valid transit card handshake: Replaced 140km of highway combustion travel with zero-emission Red Line metro transits.
              </div>
            </div>

            {/* Badge 3: Carbon Cutter */}
            <div className="relative group p-4 rounded-2xl bg-[#141c28]/90 backdrop-blur-md hover:bg-[#232a37] transition-all shadow-md border border-white/5">
              <div className="flex items-start gap-4">
                <div className="relative w-14 h-14 rounded-2xl bg-[#10b981]/25 flex items-center justify-center text-[#4edea3] flex-shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-3xl">energy_savings_leaf</span>
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#4edea3] flex items-center justify-center text-[#003824] text-[10px] font-bold">
                    ✓
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-['Outfit',sans-serif] text-base font-bold text-[#dbe3f4] truncate">
                      Carbon Cutter
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#4edea3]/20 text-[#4edea3] font-['Space_Grotesk',monospace] text-[10px] uppercase font-bold">
                      +350 XP
                    </span>
                  </div>
                  <p className="text-xs text-[#bbcabf] mt-0.5 line-clamp-1">
                    Kept footprint under 3kg for full week
                  </p>
                  <div className="mt-2 flex items-center gap-1.5 font-['Space_Grotesk',monospace] text-[10px] text-[#4edea3] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
                    <span>Unlocked on 03 Mar 2026</span>
                  </div>
                </div>
              </div>
              <div className="hidden group-hover:block absolute bottom-full left-4 mb-2 z-30 w-64 p-3 rounded-xl bg-[#2d3542] text-[#dbe3f4] shadow-2xl font-['Space_Grotesk',monospace] text-[10px] border border-white/10 leading-relaxed">
                Audit criteria: Maintained sub-3.0 kg aggregate footprint without carbon debt spikes over 7 consecutive days.
              </div>
            </div>

            {/* Badge 4: Ghaf Arborist */}
            <div className="relative group p-4 rounded-2xl bg-[#141c28]/90 backdrop-blur-md hover:bg-[#232a37] transition-all shadow-md border border-white/5">
              <div className="flex items-start gap-4">
                <div className="relative w-14 h-14 rounded-2xl bg-[#ffb95f]/20 flex items-center justify-center text-[#ffb95f] flex-shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-3xl">nature</span>
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#ffb95f] flex items-center justify-center text-[#472a00] text-[10px] font-bold">
                    ✓
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-['Outfit',sans-serif] text-base font-bold text-[#dbe3f4] truncate">
                      Ghaf Arborist
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#ffb95f]/20 text-[#ffb95f] font-['Space_Grotesk',monospace] text-[10px] uppercase font-bold">
                      +500 XP
                    </span>
                  </div>
                  <p className="text-xs text-[#bbcabf] mt-0.5 line-clamp-1">
                    Grew majestic tree to final Stage 4
                  </p>
                  <div className="mt-2 flex items-center gap-1.5 font-['Space_Grotesk',monospace] text-[10px] text-[#ffb95f] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffb95f]"></span>
                    <span>Active Champion Sentinel</span>
                  </div>
                </div>
              </div>
              <div className="hidden group-hover:block absolute bottom-full left-4 mb-2 z-30 w-64 p-3 rounded-xl bg-[#2d3542] text-[#dbe3f4] shadow-2xl font-['Space_Grotesk',monospace] text-[10px] border border-white/10 leading-relaxed">
                Culmination accomplishment: Complete digital lifecycle nourished by genuine daily carbon reduction habits.
              </div>
            </div>

            {/* Badge 5: Solar Vanguard (Locked) */}
            <div className="relative group p-4 rounded-2xl bg-[#141c28]/40 backdrop-blur-md opacity-70 hover:opacity-100 transition-all shadow-sm border border-white/5">
              <div className="flex items-start gap-4">
                <div className="relative w-14 h-14 rounded-2xl bg-[#232a37] flex items-center justify-center text-[#86948a] flex-shrink-0">
                  <span className="material-symbols-outlined text-3xl">solar_power</span>
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#2d3542] flex items-center justify-center text-[#86948a]">
                    <span className="material-symbols-outlined text-[10px]">lock</span>
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-['Outfit',sans-serif] text-base font-bold text-[#bbcabf] truncate">
                      Solar Vanguard
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#232a37] text-[#86948a] font-['Space_Grotesk',monospace] text-[10px] uppercase font-bold">
                      +400 XP
                    </span>
                  </div>
                  <p className="text-xs text-[#86948a] mt-0.5 line-clamp-1">Generate 50kWh clean energy</p>
                  <div className="mt-2 flex items-center gap-2 font-['Space_Grotesk',monospace] text-[10px] text-[#86948a]">
                    <div className="w-16 h-1.5 rounded-full bg-[#2d3542] overflow-hidden">
                      <div className="w-7/12 h-full bg-[#ffb95f]/50"></div>
                    </div>
                    <span>32 / 50 kWh</span>
                  </div>
                </div>
              </div>
              <div className="hidden group-hover:block absolute bottom-full left-4 mb-2 z-30 w-64 p-3 rounded-xl bg-[#2d3542] text-[#dbe3f4] shadow-2xl font-['Space_Grotesk',monospace] text-[10px] border border-white/10 leading-relaxed">
                Criteria: Connect home rooftop PV or participate in Dubai Clean Energy shared solar farm to tally 50kWh.
              </div>
            </div>

            {/* Badge 6: Zero Waste Hero (Locked) */}
            <div className="relative group p-4 rounded-2xl bg-[#141c28]/40 backdrop-blur-md opacity-70 hover:opacity-100 transition-all shadow-sm border border-white/5">
              <div className="flex items-start gap-4">
                <div className="relative w-14 h-14 rounded-2xl bg-[#232a37] flex items-center justify-center text-[#86948a] flex-shrink-0">
                  <span className="material-symbols-outlined text-3xl">delete_sweep</span>
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#2d3542] flex items-center justify-center text-[#86948a]">
                    <span className="material-symbols-outlined text-[10px]">lock</span>
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-['Outfit',sans-serif] text-base font-bold text-[#bbcabf] truncate">
                      Zero Waste Hero
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#232a37] text-[#86948a] font-['Space_Grotesk',monospace] text-[10px] uppercase font-bold">
                      +600 XP
                    </span>
                  </div>
                  <p className="text-xs text-[#86948a] mt-0.5 line-clamp-1">
                    Score 100% on Recycle Rush Challenge
                  </p>
                  <div className="mt-2 flex items-center gap-2 font-['Space_Grotesk',monospace] text-[10px] text-[#86948a]">
                    <div className="w-16 h-1.5 rounded-full bg-[#2d3542] overflow-hidden">
                      <div className="w-4/12 h-full bg-[#4edea3]/40"></div>
                    </div>
                    <span>4 / 10 Rounds</span>
                  </div>
                </div>
              </div>
              <div className="hidden group-hover:block absolute bottom-full left-4 mb-2 z-30 w-64 p-3 rounded-xl bg-[#2d3542] text-[#dbe3f4] shadow-2xl font-['Space_Grotesk',monospace] text-[10px] border border-white/10 leading-relaxed">
                Criteria: Attain flawless streak in the IDCC Recycle Rush sorting arcade module across 10 rounds.
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
