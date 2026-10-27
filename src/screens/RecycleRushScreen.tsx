import React, { useState, useEffect, useCallback } from 'react';
import { UserStats } from '../types';
import { soundscape } from '../utils/audio';

interface RecycleRushScreenProps {
  userStats: UserStats;
  onUpdateStats: (updater: (prev: UserStats) => UserStats) => void;
}

interface Item {
  name: string;
  category: string;
  target: 'recycle' | 'compost' | 'landfill';
  hint: string;
  dotColor: string;
  catColor: string;
  image: string;
  alt: string;
}

const ITEMS: Item[] = [
  {
    name: 'Clean PET Plastic Bottle',
    category: 'Plastic Polymers',
    target: 'recycle',
    hint: 'Rinsed food-grade thermoplastic; highly recyclable.',
    dotColor: 'bg-[#4edea3]',
    catColor: 'text-[#4edea3]',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCg2VQLmDRvXrmfFe_0BDrjkIDTbJyvIqJJk_gCbxYWqQdsS28Nd9GJBGn-54NAiL86_4_5fUE3nYwemCfp53g6BSgKqHZnWiHjFOi3euMxxrnRG4Sn3IQyHoL5G3At72-3d-W2I1FZjw6uS-ElKuhgls7YqptW4FNx4vh4Iqv7wKF9-O8UeSpXu2isLla2Ll7js1l1157DYC3IeAC7u6eS9_nm7oeRNqGFyYWZkuPFsBRtHZHVUzMr',
    alt: 'Clean discarded PET clear mineral water bottle in obsidian lab lighting',
  },
  {
    name: 'Organic Banana Peel',
    category: 'Bio Organic Scrap',
    target: 'compost',
    hint: 'Nutrient-rich fruit residue ideal for biogenic humus.',
    dotColor: 'bg-[#ffb95f]',
    catColor: 'text-[#ffb95f]',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBP-wO4hWE5RWGthMkB1iDA7p4SAgbte5gZRgipKv0JFKyZhdS1iyWnKS6ULCZch0NKO0phfuID_Si7QHwMBnwPBN3v0MT7l82FiY4hU0UgLjLjawJtGJ2vi7ssnIygym1JRZEsbKq7ccSTrro135OX7yz_KbXonjvHCMXpDs3yqb_FXTUwLtIb3A76q_yZQ1C6Gwh-Rpgd4PjIkAEBaUEOgoy83STvwgvH-10b_fAoBxmB0AkMSXOJ',
    alt: 'Natural organic fruit banana residue',
  },
  {
    name: 'Aluminium Soda Can',
    category: 'Ferrous & Alloys',
    target: 'recycle',
    hint: 'Infinite lifecycle metal; melts with 95% energy savings.',
    dotColor: 'bg-[#4edea3]',
    catColor: 'text-[#4edea3]',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCQ9eyuMNXu1UQa3_AFGkYI4ifIzlsbwgfO58z6kHSmIpK-8EcXcdfsN74gtDOMhHFY7YLkdRbCqVqxOf70QcFw6oFEROnSZlWQ8MoNhXJdLOkS0bxFB0hrkdWe90owWrLXQCVrQ0lFPjTztqZYViFFgV7RQAroSXPO6RlSdi8XXcfcMBuMVBrtHp9R5a_XSQo2WSoe3TCyvaGkMdVj3PVlXAE6x8I_B90x6gWD0apXBh5VSEF5DMJY',
    alt: 'Crushed sleek aluminum soda can',
  },
  {
    name: 'Styrofoam Food Box',
    category: 'Poly-Expanded Waste',
    target: 'landfill',
    hint: 'Contaminated foam resin; non-curbside recyclable.',
    dotColor: 'bg-[#ffb4ab]',
    catColor: 'text-[#ffb4ab]',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD1QYDltIOGMeS0M5pBrLFnrlssdIEgqxTsJGs2zp2VF-keBa1LVXVCO12Rv-TjR4yYO005i_XugsrewZtFg1bm8l3EEXoFpj7mUPQIskdiRkXHPT9RhzFDHxP__eOVt_eekcIyEMjRI5zFIopcnLewcSY7jciS1_QizGQuy1lYeRpZWB8AnvP8baf5ETeptqnZ8EN_m209-jfzLqiAunhZcvHCpKaZYdOZaLEXWaNh0wfSKSPpXoWe',
    alt: 'Styrofoam food takeout box',
  },
  {
    name: 'Crisp Apple Core',
    category: 'Bio Organic Scrap',
    target: 'compost',
    hint: 'Cellulose core and natural seeds; converts to rich humus.',
    dotColor: 'bg-[#ffb95f]',
    catColor: 'text-[#ffb95f]',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAtOYF3uEAftciKVoWfV5IuHozrS_rU0YUkr_RbcittZw7E0PeGzBxRugqp7XmRchTEFoC_mFR-v1uwnJcv-2VgkVUWEdgi2iaKJUID3O3V46viLHwGYtvSSYVy0lcPeczc2WlaxCQJesxJd9nrxMfchIN14MKTDWbFwKUsPc6yI-2D7QvwesS46KGxi7GqmsmKjKe9ItZ0h2OsKvKXkhHNBE_FsDRK0SuiKUWRlZgK-5uTPMaW-gq9',
    alt: 'Eaten fresh apple core',
  },
  {
    name: 'Soiled Snack Foil Wrap',
    category: 'Metallized Composite',
    target: 'landfill',
    hint: 'Bonded multi-layer polymer cannot be segregated.',
    dotColor: 'bg-[#ffb4ab]',
    catColor: 'text-[#ffb4ab]',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCg2VQLmDRvXrmfFe_0BDrjkIDTbJyvIqJJk_gCbxYWqQdsS28Nd9GJBGn-54NAiL86_4_5fUE3nYwemCfp53g6BSgKqHZnWiHjFOi3euMxxrnRG4Sn3IQyHoL5G3At72-3d-W2I1FZjw6uS-ElKuhgls7YqptW4FNx4vh4Iqv7wKF9-O8UeSpXu2isLla2Ll7js1l1157DYC3IeAC7u6eS9_nm7oeRNqGFyYWZkuPFsBRtHZHVUzMr',
    alt: 'Crinkled metallic snack foil wrapper',
  },
  {
    name: 'Clean Newspaper Roll',
    category: 'Clean Paper / Cardboard',
    target: 'recycle',
    hint: 'Dry de-inkable wood fiber ready for pulp recovery.',
    dotColor: 'bg-[#4edea3]',
    catColor: 'text-[#4edea3]',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB8aQ2IQl0dxra4F0u20UU0juCTaX9-V-wa5RMdorJV92dLI4SWcPZv48pL-uJK0xAdeTAN8bKkDoQi5ZthtHPBwp38lDBfpcXBz56_ukbnZOjIDIk1mfKYjJD8nCHfWr2RPn3jx22ppIrXNAY_8ZI4Rim_WV8xWaYtFLc4PkcsCJrt0trcDS2qDyPxtMYb39Z-5uigUCAp2ysFQV5p3cAHKw7xTAjvHgnke86g-yRYN6ogGv1j75Do',
    alt: 'Clean newsprint rolls',
  },
];

export const RecycleRushScreen: React.FC<RecycleRushScreenProps> = ({
  onUpdateStats,
}) => {
  const [score, setScore] = useState(1420);
  const [combo, setCombo] = useState(3);
  const [maxCombo, setMaxCombo] = useState(3);
  const [timeLeft, setTimeLeft] = useState(24);
  const [isPaused, setIsPaused] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const [counts, setCounts] = useState({ recycle: 18, compost: 12, landfill: 6 });
  const [totalDiverted, setTotalDiverted] = useState(36);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  const [feedback, setFeedback] = useState<{
    show: boolean;
    isSuccess: boolean;
    text: string;
  }>({ show: false, isSuccess: true, text: '' });

  const [isGameOver, setIsGameOver] = useState(false);
  const [highScore, setHighScore] = useState(8450);

  // Timer interval
  useEffect(() => {
    if (isPaused || timeLeft <= 0 || isGameOver) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsGameOver(true);
          soundscape.playChime('combo');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused, timeLeft, isGameOver]);

  const handleSort = useCallback(
    (selectedTarget: 'recycle' | 'compost' | 'landfill') => {
      if (isPaused || timeLeft <= 0 || isGameOver) return;

      const currentItem = ITEMS[currentItemIndex];
      const isCorrect = currentItem.target === selectedTarget;

      if (isCorrect) {
        soundscape.playChime('success');
        const nextCombo = combo + 1;
        setCombo(nextCombo);
        if (nextCombo > maxCombo) setMaxCombo(nextCombo);

        const gained = 100 * nextCombo;
        setScore((prev) => prev + gained);
        setCounts((prev) => ({ ...prev, [selectedTarget]: prev[selectedTarget] + 1 }));
        setTotalDiverted((prev) => prev + 1);

        onUpdateStats((prev) => ({
          ...prev,
          xp: prev.xp + gained,
          carbonOffsetKg: prev.carbonOffsetKg + 0.095,
        }));

        setFeedback({
          show: true,
          isSuccess: true,
          text: `+${gained} Perfect Sort!`,
        });
      } else {
        soundscape.playChime('error');
        setCombo(1);
        setScore((prev) => Math.max(0, prev - 50));
        setFeedback({
          show: true,
          isSuccess: false,
          text: `-50 Contamination Warning!`,
        });
      }

      setTimeout(() => {
        setFeedback((prev) => ({ ...prev, show: false }));
      }, 1200);

      setCurrentItemIndex((prev) => (prev + 1) % ITEMS.length);
    },
    [isPaused, timeLeft, isGameOver, currentItemIndex, combo, maxCombo, onUpdateStats]
  );

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '1') handleSort('recycle');
      if (e.key === '2') handleSort('compost');
      if (e.key === '3') handleSort('landfill');
      if (e.key === 'p' || e.key === 'P') setIsPaused((prev) => !prev);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSort]);

  const resetGame = () => {
    soundscape.playChime('click');
    setScore(0);
    setCombo(1);
    setMaxCombo(1);
    setTimeLeft(30);
    setIsPaused(false);
    setTotalDiverted(0);
    setCounts({ recycle: 0, compost: 0, landfill: 0 });
    setIsGameOver(false);
    setCurrentItemIndex(0);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundscape.setSoundEnabled(next);
  };

  const currentItem = ITEMS[currentItemIndex];
  const frenzyVal = Math.min(100, combo * 14);

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full overflow-hidden px-4 md:px-12 py-6 max-w-[1440px] mx-auto">
        {/* Atmospheric Glow */}
        <div className="absolute -top-28 left-1/4 w-[600px] h-[340px] bg-[#4edea3]/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute top-1/2 right-10 w-[420px] h-[380px] bg-[#ffb95f]/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto w-full flex flex-col gap-6">
          {/* TOP METRIC HUD BAR */}
          <section className="w-full bg-[#141c28]/85 backdrop-blur-2xl rounded-2xl p-4 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6 border border-white/5">
            {/* Identity & Status Indicator */}
            <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#232a37] flex items-center justify-center text-[#4edea3] shadow-[0_0_16px_rgba(78,222,163,0.3)]">
                  <span className="material-symbols-outlined text-2xl">sports_esports</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-['Outfit',sans-serif] text-xl font-bold text-[#dbe3f4] tracking-tight">
                      Recycle Rush
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#10b981]/20 text-[#4edea3] font-['Space_Grotesk',monospace] text-[10px] uppercase font-bold">
                      Arcade Mod v2.6
                    </span>
                  </div>
                  <p className="font-['Space_Grotesk',monospace] text-xs text-[#bbcabf] uppercase tracking-wider">
                    Planetary Sorter • Real-time Telemetry
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#2d3542] border border-white/5">
                <span className="w-2 h-2 rounded-full bg-[#45dfa4] animate-ping"></span>
                <span className="font-['Space_Grotesk',monospace] text-xs text-[#45dfa4] uppercase font-semibold">
                  Sensor Live
                </span>
              </div>
            </div>

            {/* Central Score HUD */}
            <div className="flex flex-wrap items-center justify-center gap-4 w-full lg:w-auto">
              {/* Active Score */}
              <div className="flex flex-col items-center bg-[#18202c] px-4 py-1.5 rounded-xl shadow-inner min-w-[130px] border border-white/5">
                <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#bbcabf] font-bold">
                  Active Score
                </span>
                <span className="font-['Outfit',sans-serif] text-2xl font-bold text-[#4edea3] transition-transform duration-150">
                  {score.toLocaleString()}
                </span>
              </div>

              {/* Multiplier Combo */}
              <div className="flex flex-col items-center bg-[#18202c] px-4 py-1.5 rounded-xl shadow-inner min-w-[120px] border border-white/5">
                <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#bbcabf] font-bold">
                  Multiplier
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="font-['Outfit',sans-serif] text-2xl font-bold text-[#ffb95f]">
                    x{combo}
                  </span>
                  <span className="font-['Space_Grotesk',monospace] text-[10px] text-[#ffb95f] uppercase font-bold tracking-widest animate-pulse">
                    Combo!
                  </span>
                </div>
              </div>

              {/* Circular Countdown Gauge */}
              <div className="flex items-center gap-3 bg-[#18202c] px-4 py-1.5 rounded-xl shadow-inner border border-white/5">
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-[#2d3542]"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                    ></path>
                    <path
                      className={`transition-all duration-1000 ease-linear ${
                        timeLeft <= 5 ? 'text-[#ffb4ab]' : 'text-[#4edea3]'
                      }`}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray="100, 100"
                      strokeDashoffset={((30 - timeLeft) / 30) * 100}
                      strokeLinecap="round"
                      strokeWidth="3.5"
                    ></path>
                  </svg>
                  <span className="absolute font-['Space_Grotesk',monospace] text-xs font-bold text-[#dbe3f4]">
                    {timeLeft}s
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#bbcabf] font-bold">
                    Time Window
                  </span>
                  <span className="text-xs text-[#45dfa4] font-medium font-['Space_Grotesk',monospace]">
                    00:{timeLeft < 10 ? '0' + timeLeft : timeLeft} left
                  </span>
                </div>
              </div>

              {/* Record To Beat */}
              <div className="hidden xl:flex flex-col bg-[#18202c] px-4 py-1.5 rounded-xl shadow-inner border border-white/5">
                <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#bbcabf] font-bold">
                  Record To Beat
                </span>
                <span className="text-xs font-semibold text-[#ffddb8]">
                  {Math.max(highScore, score).toLocaleString()} pts{' '}
                  <span className="text-[#bbcabf] font-normal">(Dr. Maya Lin)</span>
                </span>
              </div>
            </div>

            {/* Utility Controls Bar */}
            <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
              <button
                onClick={() => {
                  soundscape.playChime('click');
                  setIsPaused(!isPaused);
                }}
                className="px-4 py-2 rounded-full bg-[#232a37] hover:bg-[#2d3542] text-[#dbe3f4] font-['Space_Grotesk',monospace] text-xs uppercase flex items-center gap-1.5 transition-colors cursor-pointer border border-white/5"
                type="button"
              >
                <span className="material-symbols-outlined text-base">
                  {isPaused ? 'play_arrow' : 'pause'}
                </span>
                <span>{isPaused ? 'Resume' : 'Pause'}</span>
              </button>

              <button
                onClick={toggleSound}
                className="px-4 py-2 rounded-full bg-[#232a37] hover:bg-[#2d3542] text-[#dbe3f4] font-['Space_Grotesk',monospace] text-xs uppercase flex items-center gap-1.5 transition-colors cursor-pointer border border-white/5"
                type="button"
              >
                <span className="material-symbols-outlined text-base">
                  {soundEnabled ? 'volume_up' : 'volume_off'}
                </span>
                <span>SFX [{soundEnabled ? 'On' : 'Off'}]</span>
              </button>

              <button
                onClick={resetGame}
                title="Restart Round"
                className="w-10 h-10 rounded-full bg-[#232a37] hover:bg-[#2d3542] text-[#dbe3f4] flex items-center justify-center transition-transform hover:rotate-180 cursor-pointer border border-white/5"
                type="button"
              >
                <span className="material-symbols-outlined text-base">restart_alt</span>
              </button>
            </div>
          </section>

          {/* MAIN ARENA GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* CENTRAL PLAY ARENA */}
            <section className="lg:col-span-8 flex flex-col gap-4">
              {/* Conveyor Arena */}
              <div className="relative w-full h-[520px] rounded-2xl bg-[#070e1a]/95 backdrop-blur-2xl overflow-hidden shadow-2xl flex flex-col justify-between p-4 border border-white/10">
                {/* Laser Grid Background */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                  <div className="w-full h-full bg-[linear-gradient(to_right,#18202c_1px,transparent_1px),linear-gradient(to_bottom,#18202c_1px,transparent_1px)] bg-[size:32px_32px]"></div>
                </div>
                <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-transparent via-[#4edea3]/60 to-transparent"></div>

                {/* Overhead Conveyor Bar */}
                <div className="relative z-10 w-full flex items-center justify-between px-4 py-2 rounded-xl bg-[#141c28]/70 backdrop-blur-md border border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#4edea3] text-base animate-spin">
                      conveyor_belt
                    </span>
                    <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#bbcabf] tracking-wider font-semibold">
                      Feed: Kinetic Sorting Stream
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#45dfa4]">
                      Drop Velocity: 1.25 G
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#45dfa4]"></span>
                  </div>
                </div>

                {/* Frenzy Meter Progress Bar */}
                <div className="relative z-10 w-full bg-[#232a37]/80 rounded-full h-2 overflow-hidden shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-[#4edea3] via-[#45dfa4] to-[#ffb95f] transition-all duration-300 shadow-[0_0_12px_rgba(78,222,163,0.6)]"
                    style={{ width: `${frenzyVal}%` }}
                  ></div>
                </div>

                {/* Central Falling Drop Stage */}
                <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden">
                  {/* Floating Feedback Alert */}
                  {feedback.show && (
                    <div
                      className={`absolute top-6 pointer-events-none z-30 flex items-center gap-2 px-5 py-2 rounded-full font-['Space_Grotesk',monospace] text-xs font-bold shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200 ${
                        feedback.isSuccess
                          ? 'bg-[#10b981] text-[#00422b] shadow-[0_0_24px_rgba(78,222,163,0.6)]'
                          : 'bg-[#93000a] text-[#ffdad6] shadow-[0_0_24px_rgba(255,180,171,0.5)]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">
                        {feedback.isSuccess ? 'check_circle' : 'warning'}
                      </span>
                      <span>{feedback.text}</span>
                    </div>
                  )}

                  {/* ACTIVE ITEM CARD */}
                  <div className="relative z-20 flex flex-col items-center text-center p-5 rounded-2xl bg-[#18202c]/90 backdrop-blur-xl shadow-[0_0_36px_rgba(78,222,163,0.25)] border border-white/10 max-w-xs transition-transform duration-200 hover:scale-105">
                    {/* Category Pill */}
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#232a37] mb-3 shadow-inner">
                      <span className={`w-1.5 h-1.5 rounded-full ${currentItem.dotColor}`}></span>
                      <span
                        className={`font-['Space_Grotesk',monospace] text-[10px] uppercase font-bold tracking-wider ${currentItem.catColor}`}
                      >
                        {currentItem.category}
                      </span>
                    </div>

                    {/* Photo Thumbnail */}
                    <div className="relative w-28 h-28 rounded-xl overflow-hidden bg-[#232a37] flex items-center justify-center p-2 mb-2 shadow-inner">
                      <img
                        className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                        src={currentItem.image}
                        alt={currentItem.alt}
                      />
                    </div>

                    {/* Name & Hint */}
                    <h4 className="font-['Outfit',sans-serif] text-lg font-bold text-[#dbe3f4]">
                      {currentItem.name}
                    </h4>
                    <p className="text-xs text-[#bbcabf] mt-1 max-w-[240px] leading-relaxed">
                      {currentItem.hint}
                    </p>

                    {/* Keydown Guidance */}
                    <div className="mt-4 flex items-center gap-1 font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#86948a]">
                      <span className="material-symbols-outlined text-xs">keyboard</span>
                      <span>Press Bin Keys [1], [2], or [3]</span>
                    </div>
                  </div>
                </div>

                {/* Base Status */}
                <div className="relative z-10 w-full flex items-center justify-between px-2 pt-1 text-[#bbcabf] font-['Space_Grotesk',monospace] text-[10px] uppercase tracking-wider">
                  <span className="text-[#45dfa4] flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">south</span> Target Drop Area
                  </span>
                  <span className="text-[#ffb95f] font-bold tracking-widest">
                    Frenzy: {frenzyVal}%
                  </span>
                </div>
              </div>

              {/* INTERACTIVE TARGET BINS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
                {/* BIN 1: RECYCLE */}
                <button
                  type="button"
                  onClick={() => handleSort('recycle')}
                  className="group relative rounded-2xl p-4 text-left transition-all duration-200 bg-[#18202c] hover:bg-[#232a37] hover:-translate-y-1 active:translate-y-0 shadow-lg hover:shadow-[0_0_24px_rgba(78,222,163,0.35)] flex flex-col justify-between overflow-hidden cursor-pointer border border-white/5"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4edea3] to-[#45dfa4]"></div>
                  <div className="flex items-start justify-between w-full">
                    <div className="w-12 h-12 rounded-xl bg-[#070e1a] flex items-center justify-center text-[#4edea3] group-hover:scale-110 transition-transform shadow-inner">
                      <span className="material-symbols-outlined text-3xl">recycling</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#2d3542] font-['Space_Grotesk',monospace] text-xs text-[#4edea3] font-bold">
                      KEY [1]
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center gap-1.5">
                      <span className="font-['Outfit',sans-serif] text-lg font-bold text-[#dbe3f4] group-hover:text-[#4edea3] transition-colors">
                        Recycle
                      </span>
                      <span className="w-2 h-2 rounded-full bg-[#4edea3]"></span>
                    </div>
                    <p className="text-xs text-[#bbcabf] mt-1 leading-relaxed">
                      Clean plastics, aluminum cans, glass vessels, clean corrugated paper.
                    </p>
                  </div>

                  <div className="mt-4 pt-2 flex items-center justify-between font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#bbcabf] border-t border-white/5">
                    <span>
                      Diverted:{' '}
                      <strong className="text-[#4edea3] font-bold">{counts.recycle} units</strong>
                    </span>
                    <span className="text-[#45dfa4] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                      Route <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </span>
                  </div>
                </button>

                {/* BIN 2: COMPOST */}
                <button
                  type="button"
                  onClick={() => handleSort('compost')}
                  className="group relative rounded-2xl p-4 text-left transition-all duration-200 bg-[#18202c] hover:bg-[#232a37] hover:-translate-y-1 active:translate-y-0 shadow-lg hover:shadow-[0_0_24px_rgba(255,185,95,0.35)] flex flex-col justify-between overflow-hidden cursor-pointer border border-white/5"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ffb95f] to-[#e29100]"></div>
                  <div className="flex items-start justify-between w-full">
                    <div className="w-12 h-12 rounded-xl bg-[#070e1a] flex items-center justify-center text-[#ffb95f] group-hover:scale-110 transition-transform shadow-inner">
                      <span className="material-symbols-outlined text-3xl">compost</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#2d3542] font-['Space_Grotesk',monospace] text-xs text-[#ffb95f] font-bold">
                      KEY [2]
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center gap-1.5">
                      <span className="font-['Outfit',sans-serif] text-lg font-bold text-[#dbe3f4] group-hover:text-[#ffb95f] transition-colors">
                        Compost
                      </span>
                      <span className="w-2 h-2 rounded-full bg-[#ffb95f]"></span>
                    </div>
                    <p className="text-xs text-[#bbcabf] mt-1 leading-relaxed">
                      Fruit peels, coffee grounds, organic food scraps, untreated leaves.
                    </p>
                  </div>

                  <div className="mt-4 pt-2 flex items-center justify-between font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#bbcabf] border-t border-white/5">
                    <span>
                      Diverted:{' '}
                      <strong className="text-[#ffb95f] font-bold">{counts.compost} units</strong>
                    </span>
                    <span className="text-[#ffb95f] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                      Route <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </span>
                  </div>
                </button>

                {/* BIN 3: LANDFILL */}
                <button
                  type="button"
                  onClick={() => handleSort('landfill')}
                  className="group relative rounded-2xl p-4 text-left transition-all duration-200 bg-[#18202c] hover:bg-[#232a37] hover:-translate-y-1 active:translate-y-0 shadow-lg hover:shadow-[0_0_24px_rgba(255,180,171,0.25)] flex flex-col justify-between overflow-hidden cursor-pointer border border-white/5"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ffb4ab] to-[#93000a]"></div>
                  <div className="flex items-start justify-between w-full">
                    <div className="w-12 h-12 rounded-xl bg-[#070e1a] flex items-center justify-center text-[#ffb4ab] group-hover:scale-110 transition-transform shadow-inner">
                      <span className="material-symbols-outlined text-3xl">delete_forever</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#2d3542] font-['Space_Grotesk',monospace] text-xs text-[#ffb4ab] font-bold">
                      KEY [3]
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center gap-1.5">
                      <span className="font-['Outfit',sans-serif] text-lg font-bold text-[#dbe3f4] group-hover:text-[#ffb4ab] transition-colors">
                        Landfill
                      </span>
                      <span className="w-2 h-2 rounded-full bg-[#ffb4ab]"></span>
                    </div>
                    <p className="text-xs text-[#bbcabf] mt-1 leading-relaxed">
                      Styrofoam packaging, composite foils, greasy contaminated paper.
                    </p>
                  </div>

                  <div className="mt-4 pt-2 flex items-center justify-between font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#bbcabf] border-t border-white/5">
                    <span>
                      Isolated:{' '}
                      <strong className="text-[#ffb4ab] font-bold">{counts.landfill} units</strong>
                    </span>
                    <span className="text-[#ffb4ab] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                      Route <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </span>
                  </div>
                </button>
              </div>
            </section>

            {/* SIDEBAR INTELLIGENCE & LEADERBOARDS */}
            <aside className="lg:col-span-4 flex flex-col gap-4">
              {/* Live Telemetry Card: Carbon Avoided */}
              <div className="rounded-2xl p-4 bg-[#141c28]/85 backdrop-blur-xl shadow-xl flex flex-col justify-between border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#4edea3] text-xl">co2</span>
                    <span className="font-['Space_Grotesk',monospace] text-xs uppercase text-[#dbe3f4] font-bold">
                      Impact Meter
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#232a37] font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#45dfa4]">
                    Verified
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div className="p-3 rounded-xl bg-[#18202c]">
                    <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#bbcabf]">
                      CO2 Mitigated
                    </span>
                    <div className="font-['Outfit',sans-serif] text-2xl font-bold text-[#4edea3]">
                      {(totalDiverted * 0.095).toFixed(2)}
                      <span className="text-base font-normal">kg</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#18202c]">
                    <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#bbcabf]">
                      Sorting Precision
                    </span>
                    <div className="font-['Outfit',sans-serif] text-2xl font-bold text-[#45dfa4]">
                      94.8<span className="text-base font-normal">%</span>
                    </div>
                  </div>
                </div>

                {/* SVG Sparkline */}
                <div className="p-3 rounded-xl bg-[#18202c] flex flex-col gap-1">
                  <div className="flex items-center justify-between text-[#bbcabf] font-['Space_Grotesk',monospace] text-[10px] uppercase">
                    <span>Speed vs Contamination</span>
                    <span className="text-[#4edea3] font-bold">0.84s / item avg</span>
                  </div>
                  <svg className="w-full h-12 text-[#4edea3]" fill="none" viewBox="0 0 240 48">
                    <path
                      d="M0 38 Q 30 15, 60 25 T 120 18 T 180 32 T 240 10"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                    ></path>
                    <path
                      d="M0 38 Q 30 15, 60 25 T 120 18 T 180 32 T 240 10 L 240 48 L 0 48 Z"
                      fill="currentColor"
                      fillOpacity="0.1"
                    ></path>
                  </svg>
                </div>
              </div>

              {/* Ranger Hall of Fame */}
              <div className="rounded-2xl p-4 bg-[#141c28]/85 backdrop-blur-xl shadow-xl flex-1 flex flex-col justify-between border border-white/5">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#ffb95f] text-xl">
                        military_tech
                      </span>
                      <span className="font-['Outfit',sans-serif] text-lg font-bold text-[#dbe3f4]">
                        Sector Champions
                      </span>
                    </div>
                    <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#bbcabf] font-bold">
                      Global IDCC #09
                    </span>
                  </div>

                  <div className="space-y-2">
                    {/* Rank 1 */}
                    <div className="p-2.5 rounded-xl bg-[#232a37]/90 flex items-center justify-between shadow-[0_0_12px_rgba(255,185,95,0.15)] border border-white/5">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-full bg-[#e29100] text-[#523200] font-['Space_Grotesk',monospace] text-xs font-bold flex items-center justify-center flex-shrink-0">
                          1
                        </div>
                        <div className="truncate">
                          <div className="text-xs font-bold text-[#dbe3f4] flex items-center gap-1.5">
                            Dr. Maya Lin
                            <span className="px-1.5 py-0.2 rounded bg-[#4edea3]/20 text-[#4edea3] text-[9px] font-bold font-['Space_Grotesk',monospace]">
                              YOU
                            </span>
                          </div>
                          <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#ffb95f] font-bold">
                            Lvl 14 Ranger • 84 Streak
                          </span>
                        </div>
                      </div>
                      <span className="font-['Space_Grotesk',monospace] text-xs font-bold text-[#ffb95f] pl-2">
                        {Math.max(highScore, score).toLocaleString()} pts
                      </span>
                    </div>

                    {/* Rank 2 */}
                    <div className="p-2.5 rounded-xl bg-[#18202c]/60 hover:bg-[#18202c] flex items-center justify-between transition-colors border border-white/5">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-full bg-[#2d3542] text-[#dbe3f4] font-['Space_Grotesk',monospace] text-xs font-bold flex items-center justify-center flex-shrink-0">
                          2
                        </div>
                        <div className="truncate">
                          <div className="text-xs font-semibold text-[#dbe3f4]">Ranger Omar Vance</div>
                          <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#bbcabf]">
                            Sub-Sahara Canopy Node
                          </span>
                        </div>
                      </div>
                      <span className="font-['Space_Grotesk',monospace] text-xs font-semibold text-[#bbcabf] pl-2">
                        7,920 pts
                      </span>
                    </div>

                    {/* Rank 3 */}
                    <div className="p-2.5 rounded-xl bg-[#18202c]/60 hover:bg-[#18202c] flex items-center justify-between transition-colors border border-white/5">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-full bg-[#2d3542] text-[#dbe3f4] font-['Space_Grotesk',monospace] text-xs font-bold flex items-center justify-center flex-shrink-0">
                          3
                        </div>
                        <div className="truncate">
                          <div className="text-xs font-semibold text-[#dbe3f4]">Sarah Zhang, PE</div>
                          <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#bbcabf]">
                            Nordic Circular Hub
                          </span>
                        </div>
                      </div>
                      <span className="font-['Space_Grotesk',monospace] text-xs font-semibold text-[#bbcabf] pl-2">
                        7,340 pts
                      </span>
                    </div>

                    {/* Rank 4 */}
                    <div className="p-2.5 rounded-xl bg-[#18202c]/60 hover:bg-[#18202c] flex items-center justify-between transition-colors border border-white/5">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-full bg-[#2d3542] text-[#dbe3f4] font-['Space_Grotesk',monospace] text-xs font-bold flex items-center justify-center flex-shrink-0">
                          4
                        </div>
                        <div className="truncate">
                          <div className="text-xs font-semibold text-[#dbe3f4]">Kaelen Thorne</div>
                          <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#bbcabf]">
                            Great Barrier Reef Node
                          </span>
                        </div>
                      </div>
                      <span className="font-['Space_Grotesk',monospace] text-xs font-semibold text-[#bbcabf] pl-2">
                        6,880 pts
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pro-Tip HUD Footer */}
                <div className="mt-4 p-3 rounded-xl bg-[#18202c] flex items-start gap-2.5 border border-white/5">
                  <span className="material-symbols-outlined text-[#4edea3] text-base flex-shrink-0 mt-0.5">
                    tips_and_updates
                  </span>
                  <p className="text-xs text-[#bbcabf] leading-relaxed">
                    <strong className="text-[#dbe3f4] font-semibold">Stewardship Tip:</strong> Pizza
                    boxes soaked with oil must go into Compost if unlined, or Landfill if poly-coated.
                    Never contaminate clean paper recycling!
                  </p>
                </div>
              </div>
            </aside>
          </div>

          {/* VERIFIED LANDFILL DIVERSION STREAMS (Real World Impact) */}
          <section className="w-full mt-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4edea3]">photo_library</span>
                <h3 className="font-['Outfit',sans-serif] text-lg font-bold text-[#dbe3f4]">
                  Verified Landfill Diversion Streams
                </h3>
              </div>
              <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#bbcabf]">
                Telemetry Station Cam-04
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="group relative rounded-2xl overflow-hidden bg-[#18202c] shadow-lg border border-white/5">
                <div className="relative w-full h-44 overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8aQ2IQl0dxra4F0u20UU0juCTaX9-V-wa5RMdorJV92dLI4SWcPZv48pL-uJK0xAdeTAN8bKkDoQi5ZthtHPBwp38lDBfpcXBz56_ukbnZOjIDIk1mfKYjJD8nCHfWr2RPn3jx22ppIrXNAY_8ZI4Rim_WV8xWaYtFLc4PkcsCJrt0trcDS2qDyPxtMYb39Z-5uigUCAp2ysFQV5p3cAHKw7xTAjvHgnke86g-yRYN6ogGv1j75Do"
                    alt="High precision optical sorter conveyor"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070e1a] via-transparent to-transparent"></div>
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#070e1a]/80 backdrop-blur-md font-['Space_Grotesk',monospace] text-[10px] text-[#4edea3] uppercase font-bold">
                    Optical Sort
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-['Outfit',sans-serif] text-base font-bold text-[#dbe3f4]">
                    Polymer Clean Loop
                  </h4>
                  <p className="text-xs text-[#bbcabf] mt-1 leading-relaxed">
                    HDPE and PET bottles separated for pellet extrusion and zero-virgin polyester manufacturing.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group relative rounded-2xl overflow-hidden bg-[#18202c] shadow-lg border border-white/5">
                <div className="relative w-full h-44 overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtOYF3uEAftciKVoWfV5IuHozrS_rU0YUkr_RbcittZw7E0PeGzBxRugqp7XmRchTEFoC_mFR-v1uwnJcv-2VgkVUWEdgi2iaKJUID3O3V46viLHwGYtvSSYVy0lcPeczc2WlaxCQJesxJd9nrxMfchIN14MKTDWbFwKUsPc6yI-2D7QvwesS46KGxi7GqmsmKjKe9ItZ0h2OsKvKXkhHNBE_FsDRK0SuiKUWRlZgK-5uTPMaW-gq9"
                    alt="Industrial organic composting aerator turner"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070e1a] via-transparent to-transparent"></div>
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#070e1a]/80 backdrop-blur-md font-['Space_Grotesk',monospace] text-[10px] text-[#ffb95f] uppercase font-bold">
                    Organic Regen
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-['Outfit',sans-serif] text-base font-bold text-[#dbe3f4]">
                    Bio-Digester & Humus
                  </h4>
                  <p className="text-xs text-[#bbcabf] mt-1 leading-relaxed">
                    Decomposing peelings and fiber enrich topsoil microbial diversity, preventing toxic anaerobic methane plumes.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group relative rounded-2xl overflow-hidden bg-[#18202c] shadow-lg border border-white/5">
                <div className="relative w-full h-44 overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1QYDltIOGMeS0M5pBrLFnrlssdIEgqxTsJGs2zp2VF-keBa1LVXVCO12Rv-TjR4yYO005i_XugsrewZtFg1bm8l3EEXoFpj7mUPQIskdiRkXHPT9RhzFDHxP__eOVt_eekcIyEMjRI5zFIopcnLewcSY7jciS1_QizGQuy1lYeRpZWB8AnvP8baf5ETeptqnZ8EN_m209-jfzLqiAunhZcvHCpKaZYdOZaLEXWaNh0wfSKSPpXoWe"
                    alt="Automated robotics arm sorting items"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070e1a] via-transparent to-transparent"></div>
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#070e1a]/80 backdrop-blur-md font-['Space_Grotesk',monospace] text-[10px] text-[#45dfa4] uppercase font-bold">
                    Robotic Sort
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-['Outfit',sans-serif] text-base font-bold text-[#dbe3f4]">
                    Non-Recyclable Thermal Sink
                  </h4>
                  <p className="text-xs text-[#bbcabf] mt-1 leading-relaxed">
                    Multi-layer foil polymers and contaminated resins isolated into high-efficiency plasma gasification cells.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* GAME OVER / SPRINT COMPLETE MODAL */}
      {isGameOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070e1a]/85 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#141c28] border border-[#2d3542] rounded-2xl p-6 shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-[#232a37] flex items-center justify-center text-[#ffb95f] shadow-[0_0_28px_rgba(255,185,95,0.4)] mb-3">
              <span className="material-symbols-outlined text-4xl">rewarded_ads</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#10b981]/20 text-[#4edea3] font-['Space_Grotesk',monospace] text-[10px] uppercase font-bold mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse"></span>
              Sprint Complete
            </div>
            <h3 className="font-['Outfit',sans-serif] text-2xl font-bold text-[#dbe3f4]">
              Sorting Run Verified
            </h3>
            <p className="text-xs text-[#bbcabf] mt-1 max-w-sm">
              Planetary telemetric audit finished. Exceptional circular throughput recorded on IDCC Ledger.
            </p>

            <div className="w-full grid grid-cols-2 gap-3 my-4">
              <div className="p-3 rounded-xl bg-[#18202c] border border-white/5 flex flex-col items-center">
                <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#bbcabf] font-bold">
                  Final Score
                </span>
                <span className="font-['Outfit',sans-serif] text-2xl font-bold text-[#4edea3]">
                  {score.toLocaleString()}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#18202c] border border-white/5 flex flex-col items-center">
                <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#bbcabf] font-bold">
                  Max Combo
                </span>
                <span className="font-['Outfit',sans-serif] text-2xl font-bold text-[#ffb95f]">
                  x{maxCombo}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#18202c] border border-white/5 flex flex-col items-center">
                <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#bbcabf] font-bold">
                  Items Diverted
                </span>
                <span className="font-['Outfit',sans-serif] text-xl font-bold text-[#45dfa4]">
                  {totalDiverted} units
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#18202c] border border-white/5 flex flex-col items-center">
                <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#bbcabf] font-bold">
                  Carbon Mitigated
                </span>
                <span className="font-['Outfit',sans-serif] text-xl font-bold text-[#ffddb8]">
                  {(totalDiverted * 0.095).toFixed(2)} kg CO2
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
              <button
                onClick={resetGame}
                type="button"
                className="w-full sm:flex-1 py-3 px-4 rounded-full bg-[#10b981] hover:bg-[#00bd85] text-[#00422b] font-['Outfit',sans-serif] text-base font-bold shadow-[0_0_24px_rgba(16,185,129,0.45)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined">replay</span>
                <span>Play Again</span>
              </button>
              <button
                onClick={() => setIsGameOver(false)}
                type="button"
                className="w-full sm:w-auto py-3 px-5 rounded-full bg-[#232a37] hover:bg-[#2d3542] text-[#dbe3f4] text-xs font-semibold transition-colors cursor-pointer"
              >
                View Arena
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
