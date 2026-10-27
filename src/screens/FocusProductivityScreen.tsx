import React, { useState, useEffect, useRef } from 'react';
import { UserStats } from '../types';
import { soundscape } from '../utils/audio';

interface FocusProductivityScreenProps {
  userStats: UserStats;
  onUpdateStats: (updater: (prev: UserStats) => UserStats) => void;
}

type TimerMode = 'focus' | 'short' | 'long';

interface ChecklistItem {
  id: string;
  text: string;
  xp: number;
  completed: boolean;
}

export const FocusProductivityScreen: React.FC<FocusProductivityScreenProps> = ({
  userStats,
  onUpdateStats,
}) => {
  // Timer state
  const [timerMode, setTimerMode] = useState<TimerMode>('focus');
  const [duration, setDuration] = useState<number>(25 * 60);
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [sessionIndex, setSessionIndex] = useState<number>(3); // 3 of 4

  // Ambient sound tracks
  const [sounds, setSounds] = useState<{
    [key: string]: { active: boolean; volume: number };
  }>({
    desert: { active: false, volume: 40 },
    rain: { active: false, volume: 65 },
    birds: { active: false, volume: 30 },
    whiteNoise: { active: false, volume: 20 },
  });

  // Daily Eco-Checklist
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    {
      id: '1',
      text: 'Use a reusable thermal water bottle today',
      xp: 20,
      completed: true,
    },
    {
      id: '2',
      text: 'Set thermostat/AC to eco-optimal 24°C',
      xp: 30,
      completed: true,
    },
    {
      id: '3',
      text: 'Switch off all standby workstation monitors and surge protectors',
      xp: 15,
      completed: false,
    },
    {
      id: '4',
      text: 'Opt for a 100% plant-based lunch',
      xp: 40,
      completed: false,
    },
    {
      id: '5',
      text: 'Take stairs or walk short errands under 1km',
      xp: 25,
      completed: false,
    },
  ]);

  const [newHabitInput, setNewHabitInput] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const confettiCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Ring geometry
  const ringCircumference = 703.7;

  // Timer countdown
  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          soundscape.playChime('combo');
          onUpdateStats((stats) => ({
            ...stats,
            xp: stats.xp + 35,
            carbonOffsetKg: stats.carbonOffsetKg + 0.14,
          }));
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onUpdateStats]);

  const switchMode = (mode: TimerMode) => {
    soundscape.playChime('click');
    setTimerMode(mode);
    setIsRunning(false);

    let secs = 25 * 60;
    if (mode === 'short') secs = 5 * 60;
    if (mode === 'long') secs = 15 * 60;

    setDuration(secs);
    setTimeLeft(secs);
  };

  const toggleTimer = () => {
    soundscape.playChime('click');
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    soundscape.playChime('click');
    setIsRunning(false);
    setTimeLeft(duration);
  };

  const skipCycle = () => {
    soundscape.playChime('click');
    setIsRunning(false);
    if (timerMode === 'focus') {
      switchMode('short');
    } else {
      switchMode('focus');
      setSessionIndex((prev) => (prev >= 4 ? 1 : prev + 1));
    }
  };

  // Soundscape toggles
  const toggleSound = (trackKey: 'desert' | 'rain' | 'birds' | 'whiteNoise') => {
    const nextState = !sounds[trackKey].active;
    setSounds((prev) => ({
      ...prev,
      [trackKey]: { ...prev[trackKey], active: nextState },
    }));
    soundscape.setAmbientTrack(trackKey, nextState, sounds[trackKey].volume / 100);
  };

  const handleVolumeChange = (
    trackKey: 'desert' | 'rain' | 'birds' | 'whiteNoise',
    val: number
  ) => {
    setSounds((prev) => ({
      ...prev,
      [trackKey]: { ...prev[trackKey], volume: val },
    }));
    soundscape.updateAmbientVolume(trackKey, val);
  };

  // Checklist handler
  const toggleChecklistItem = (id: string) => {
    soundscape.playChime('click');
    const updated = checklist.map((item) => {
      if (item.id === id) {
        const next = !item.completed;
        if (next) {
          onUpdateStats((stats) => ({ ...stats, xp: stats.xp + item.xp }));
        }
        return { ...item, completed: next };
      }
      return item;
    });
    setChecklist(updated);

    const completedCount = updated.filter((i) => i.completed).length;
    if (completedCount === updated.length) {
      triggerConfetti();
      setShowCelebration(true);
      soundscape.playChime('combo');
      onUpdateStats((stats) => ({ ...stats, xp: stats.xp + 150 }));
    }
  };

  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitInput.trim()) return;
    soundscape.playChime('success');

    const newItem: ChecklistItem = {
      id: Date.now().toString(),
      text: newHabitInput.trim(),
      xp: 20,
      completed: false,
    };
    setChecklist([...checklist, newItem]);
    setNewHabitInput('');
  };

  // Confetti trigger
  const triggerConfetti = () => {
    const canvas = confettiCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      color: string;
    }[] = [];
    const colors = ['#4edea3', '#ffb95f', '#45dfa4', '#dbe3f4', '#6ffbbe'];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        size: Math.random() * 8 + 4,
        speedY: Math.random() * 4 + 2,
        speedX: Math.random() * 2 - 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let frames = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });
      frames++;
      if (frames < 140) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    animate();
  };

  const completedTasks = checklist.filter((i) => i.completed).length;
  const checklistPercent = Math.round((completedTasks / checklist.length) * 100);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const ringOffset = ringCircumference - (timeLeft / duration) * ringCircumference;

  return (
    <div className="flex flex-col w-full relative">
      <canvas
        ref={confettiCanvasRef}
        className="pointer-events-none fixed inset-0 z-50 w-full h-full"
      ></canvas>

      <div className="relative w-full overflow-hidden px-4 md:px-12 py-8 max-w-[1440px] mx-auto">
        {/* Glow Vectors */}
        <div className="pointer-events-none absolute -top-40 left-1/4 w-96 h-96 bg-[#4edea3]/10 rounded-full blur-3xl"></div>
        <div className="pointer-events-none absolute top-1/3 -right-20 w-80 h-80 bg-[#ffb95f]/10 rounded-full blur-3xl"></div>

        <div className="max-w-[1440px] mx-auto w-full flex flex-col space-y-8 relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#232a37] text-[#4edea3] font-['Space_Grotesk',monospace] text-[10px] uppercase tracking-wider font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse"></span>
                  Bio-Productivity Telemetry
                </span>
                <span className="font-['Space_Grotesk',monospace] text-[10px] text-[#bbcabf] uppercase tracking-widest">
                  // NODE-04: DEEP_WORK
                </span>
              </div>
              <h1 className="font-['Outfit',sans-serif] text-3xl md:text-4xl font-bold text-[#dbe3f4] tracking-tight">
                Eco-Focus & Sustainability Productivity Hub
              </h1>
              <p className="text-sm md:text-base text-[#bbcabf] max-w-2xl leading-relaxed">
                Combine focused work sessions with daily environmental commitments. Earn carbon credits for every productive Pomodoro completed.
              </p>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-2xl bg-[#141c28] shadow-md backdrop-blur-md border border-white/5">
              <div className="w-12 h-12 rounded-xl bg-[#18202c] flex items-center justify-center text-[#4edea3] shadow-inner">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  eco
                </span>
              </div>
              <div>
                <div className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#bbcabf]">
                  Session Offset Yield
                </div>
                <div className="font-['Outfit',sans-serif] text-xl font-bold text-[#4edea3] flex items-baseline gap-1">
                  +140 <span className="font-['Space_Grotesk',monospace] text-xs text-[#bbcabf] font-normal">g CO₂e / hr</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column (Pomodoro + Soundscapes + Metric Cards) */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              {/* Pomodoro Timer Container */}
              <div className="rounded-2xl bg-[#141c28]/90 backdrop-blur-xl p-6 md:p-8 shadow-xl relative overflow-hidden flex flex-col items-center text-center border border-white/5">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#4edea3] to-transparent opacity-80"></div>

                {/* Top Status */}
                <div className="w-full flex flex-wrap items-center justify-between gap-2 mb-6 pb-2 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#45dfa4] animate-ping"></span>
                    <span className="font-['Space_Grotesk',monospace] text-xs uppercase tracking-wider text-[#dbe3f4] font-semibold">
                      Telemetry Active
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#232a37] text-[#bbcabf] font-['Space_Grotesk',monospace] text-[10px] uppercase tracking-wider border border-white/5">
                    <span className="material-symbols-outlined text-sm text-[#45dfa4]">
                      power_settings_new
                    </span>
                    <span>Power-Saver Node: Synchronized</span>
                  </div>
                </div>

                {/* Mode Selector */}
                <div className="inline-flex p-1 rounded-full bg-[#070e1a] shadow-inner gap-1 mb-6 border border-white/5">
                  {[
                    { id: 'focus', label: 'Eco-Focus (25m)' },
                    { id: 'short', label: 'Short Nature Break (5m)' },
                    { id: 'long', label: 'Deep Breath Rest (15m)' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => switchMode(m.id as TimerMode)}
                      className={`px-4 py-1.5 rounded-full font-['Space_Grotesk',monospace] text-xs tracking-wide transition-all cursor-pointer ${
                        timerMode === m.id
                          ? 'bg-[#10b981] text-[#00422b] font-bold shadow-md'
                          : 'text-[#bbcabf] hover:text-[#dbe3f4]'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>

                {/* Big Circular Progress Gauge */}
                <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center my-4">
                  <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 260 260">
                    <circle
                      className="text-[#2d3542]"
                      cx="130"
                      cy="130"
                      fill="none"
                      opacity="0.45"
                      r="112"
                      stroke="currentColor"
                      strokeWidth="8"
                    ></circle>
                    <circle
                      className="text-[#4edea3] transition-all duration-1000 ease-linear"
                      cx="130"
                      cy="130"
                      fill="none"
                      r="112"
                      stroke="currentColor"
                      strokeDasharray={ringCircumference}
                      strokeDashoffset={ringOffset}
                      strokeLinecap="round"
                      strokeWidth="8"
                      style={{ filter: 'drop-shadow(0 0 10px rgba(78, 222, 163, 0.7))' }}
                    ></circle>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-['Outfit',sans-serif] text-5xl md:text-6xl font-bold tracking-tighter text-[#dbe3f4] leading-none select-none">
                      {formatTime(timeLeft)}
                    </span>
                    <div className="flex items-center gap-1.5 mt-2 text-[#45dfa4] font-['Space_Grotesk',monospace] text-xs uppercase tracking-widest">
                      <span className="material-symbols-outlined text-base animate-pulse">
                        nest_clock_farsight_analog
                      </span>
                      <span>
                        {timerMode === 'focus'
                          ? 'Sprint Mode'
                          : timerMode === 'short'
                          ? 'Short Pause'
                          : 'Recovery Wave'}
                      </span>
                    </div>
                    <div className="mt-2 text-[#bbcabf] text-xs">
                      ~0.47g CO₂ Mitigated this block
                    </div>
                  </div>
                </div>

                {/* Session Cycle Indicator */}
                <div className="w-full max-w-md bg-[#18202c] rounded-2xl p-4 my-4 flex items-center justify-between shadow-inner border border-white/5">
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-10 h-10 rounded-xl bg-[#232a37] flex items-center justify-center text-[#45dfa4]">
                      <span className="material-symbols-outlined text-xl">forest</span>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#dbe3f4]">
                        Session {sessionIndex} of 4
                      </div>
                      <div className="font-['Space_Grotesk',monospace] text-[10px] text-[#bbcabf]">
                        Acacia Biosphere Growth Phase
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-['Space_Grotesk',monospace] text-xs font-bold text-[#4edea3]">
                      {(sessionIndex / 4) * 100}% Complete
                    </div>
                    <div className="w-24 h-2 bg-[#2d3542] rounded-full overflow-hidden mt-1">
                      <div
                        className="h-full bg-gradient-to-r from-[#4edea3] to-[#45dfa4] rounded-full transition-all duration-500"
                        style={{ width: `${(sessionIndex / 4) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Control Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3 w-full pt-2">
                  <button
                    type="button"
                    onClick={toggleTimer}
                    className="px-8 py-3 rounded-full bg-gradient-to-r from-[#10b981] to-[#00bd85] hover:brightness-110 text-[#00422b] font-['Outfit',sans-serif] text-base font-bold flex items-center gap-2 shadow-[0_0_24px_-4px_rgba(16,185,129,0.55)] transition-all cursor-pointer hover:scale-105 active:scale-95"
                  >
                    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {isRunning ? 'pause' : 'play_arrow'}
                    </span>
                    <span>{isRunning ? 'Pause' : 'Start Focus'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={resetTimer}
                    title="Reset Session"
                    className="w-12 h-12 rounded-full bg-[#232a37] hover:bg-[#2d3542] flex items-center justify-center text-[#bbcabf] hover:text-[#dbe3f4] transition-colors cursor-pointer border border-white/5"
                  >
                    <span className="material-symbols-outlined text-xl">restart_alt</span>
                  </button>

                  <button
                    type="button"
                    onClick={skipCycle}
                    title="Skip to Next Cycle"
                    className="w-12 h-12 rounded-full bg-[#232a37] hover:bg-[#2d3542] flex items-center justify-center text-[#bbcabf] hover:text-[#dbe3f4] transition-colors cursor-pointer border border-white/5"
                  >
                    <span className="material-symbols-outlined text-xl">skip_next</span>
                  </button>
                </div>
              </div>

              {/* Ambient Bio-Soundscape Generator */}
              <div className="rounded-2xl bg-[#141c28] p-6 shadow-md border border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#4edea3] text-xl">equalizer</span>
                    <h2 className="font-['Outfit',sans-serif] text-lg font-bold text-[#dbe3f4]">
                      Ambient Bio-Soundscape Generator
                    </h2>
                  </div>
                  <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#bbcabf]">
                    Binaural Mix 432Hz
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      key: 'desert' as const,
                      name: 'Desert Breeze',
                      icon: 'air',
                      color: 'text-[#ffb95f]',
                    },
                    {
                      key: 'rain' as const,
                      name: 'Mangrove Rain',
                      icon: 'water_drop',
                      color: 'text-[#4edea3]',
                    },
                    {
                      key: 'birds' as const,
                      name: 'Forest Birds',
                      icon: 'flutter',
                      color: 'text-[#45dfa4]',
                    },
                    {
                      key: 'whiteNoise' as const,
                      name: 'White Noise',
                      icon: 'waves',
                      color: 'text-[#bbcabf]',
                    },
                  ].map((t) => {
                    const track = sounds[t.key];
                    return (
                      <div
                        key={t.key}
                        className="p-4 rounded-xl bg-[#18202c] flex flex-col space-y-3 border border-white/5"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className={`material-symbols-outlined text-lg ${t.color}`}>
                              {t.icon}
                            </span>
                            <span className="text-xs font-semibold text-[#dbe3f4]">{t.name}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => toggleSound(t.key)}
                            className={`px-2.5 py-0.5 rounded-full font-['Space_Grotesk',monospace] text-[10px] uppercase font-bold cursor-pointer transition-colors ${
                              track.active
                                ? 'bg-[#10b981] text-[#00422b]'
                                : 'bg-[#232a37] text-[#bbcabf] hover:text-[#dbe3f4]'
                            }`}
                          >
                            {track.active ? 'Playing' : 'Muted'}
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-[#bbcabf] text-xs">
                            volume_down
                          </span>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={track.volume}
                            onChange={(e) => handleVolumeChange(t.key, Number(e.target.value))}
                            className="w-full accent-[#4edea3] h-1.5 bg-[#2d3542] rounded-lg cursor-pointer"
                          />
                          <span className="material-symbols-outlined text-[#bbcabf] text-xs">
                            volume_up
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-[#141c28] p-4 flex items-center gap-4 border border-white/5">
                  <div className="w-12 h-12 rounded-xl bg-[#232a37] flex items-center justify-center text-[#4edea3]">
                    <span className="material-symbols-outlined text-2xl">timelapse</span>
                  </div>
                  <div>
                    <div className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#bbcabf]">
                      Daily Deep Focus
                    </div>
                    <div className="font-['Outfit',sans-serif] text-2xl font-bold text-[#dbe3f4] leading-tight">
                      3.5 hrs
                    </div>
                    <div className="text-xs text-[#45dfa4]">+45m above daily average</div>
                  </div>
                </div>

                <div className="rounded-2xl bg-[#141c28] p-4 flex items-center gap-4 border border-white/5">
                  <div className="w-12 h-12 rounded-xl bg-[#232a37] flex items-center justify-center text-[#45dfa4]">
                    <span className="material-symbols-outlined text-2xl">energy_savings_leaf</span>
                  </div>
                  <div>
                    <div className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#bbcabf]">
                      Carbon Mitigated
                    </div>
                    <div className="font-['Outfit',sans-serif] text-2xl font-bold text-[#4edea3] leading-tight">
                      700g CO₂
                    </div>
                    <div className="text-xs text-[#bbcabf]">Via device power-saver sync</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (Checklist + Field Note + Biome Live Photo) */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              {/* Daily Eco-Checklist */}
              <div className="rounded-2xl bg-[#141c28] p-6 shadow-xl flex flex-col space-y-4 relative border border-white/5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#4edea3] tracking-widest font-bold">
                      Stewardship Ledger
                    </span>
                    <h2 className="font-['Outfit',sans-serif] text-xl font-bold text-[#dbe3f4]">
                      Daily Eco-Checklist
                    </h2>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#232a37] text-[#ffb95f] flex items-center gap-1 font-['Space_Grotesk',monospace] text-xs font-bold shadow-[0_0_12px_rgba(245,158,11,0.25)] border border-white/5">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                      local_fire_department
                    </span>
                    {userStats.streak}-Day Streak
                  </span>
                </div>

                {/* Completion Progress Bar */}
                <div className="p-4 rounded-xl bg-[#18202c] space-y-1.5 border border-white/5">
                  <div className="flex justify-between items-center text-[#dbe3f4] text-xs font-semibold">
                    <span>Daily Completion</span>
                    <span className="text-[#4edea3] font-['Space_Grotesk',monospace]">
                      {checklistPercent}% ({completedTasks} of {checklist.length} done)
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-[#2d3542] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#4edea3] to-[#45dfa4] transition-all duration-500 rounded-full"
                      style={{ width: `${checklistPercent}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center font-['Space_Grotesk',monospace] text-[10px] text-[#bbcabf] pt-1">
                    <span>Tier 1 Milestone</span>
                    <span className="text-[#45dfa4] font-bold">Next reward at 100% (+150 XP bonus)</span>
                  </div>
                </div>

                {/* Checklist items */}
                <div className="flex flex-col space-y-2 pt-1">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className="group p-3 rounded-xl bg-[#18202c] hover:bg-[#232a37] transition-all flex items-start gap-3 cursor-pointer border border-white/5"
                    >
                      <div
                        className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded flex items-center justify-center transition-all ${
                          item.completed
                            ? 'bg-[#4edea3] text-[#003824] shadow-[0_0_8px_rgba(78,222,163,0.5)]'
                            : 'bg-[#2d3542]'
                        }`}
                      >
                        {item.completed && (
                          <span className="material-symbols-outlined text-sm font-bold">check</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span
                          className={`text-xs select-none block leading-relaxed ${
                            item.completed
                              ? 'line-through text-[#bbcabf]'
                              : 'text-[#dbe3f4]'
                          }`}
                        >
                          {item.text}
                        </span>
                      </div>
                      <span className="font-['Space_Grotesk',monospace] text-[10px] px-2 py-0.5 rounded-full bg-[#2d3542] text-[#4edea3] font-bold whitespace-nowrap">
                        +{item.xp} XP
                      </span>
                    </div>
                  ))}
                </div>

                {/* Add Custom Habit Form */}
                <div className="pt-2">
                  <form onSubmit={handleAddHabit} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newHabitInput}
                      onChange={(e) => setNewHabitInput(e.target.value)}
                      placeholder="Add custom eco-goal (e.g. Unplug chargers at night)..."
                      className="flex-1 bg-[#18202c] px-4 py-2.5 rounded-full text-[#dbe3f4] placeholder:text-[#86948a] text-xs focus:outline-none focus:ring-1 focus:ring-[#4edea3] shadow-inner border border-white/5"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-full bg-[#232a37] hover:bg-[#2d3542] text-[#4edea3] font-['Space_Grotesk',monospace] text-xs font-bold whitespace-nowrap flex items-center gap-1 transition-colors cursor-pointer border border-white/5"
                    >
                      <span className="material-symbols-outlined text-base">add</span>
                      <span>+ Add Habit</span>
                    </button>
                  </form>
                </div>

                {/* Celebration Toast */}
                {showCelebration && (
                  <div className="absolute inset-x-4 top-4 p-4 rounded-xl bg-[#10b981] text-[#00422b] shadow-2xl flex items-center justify-between animate-in zoom-in-95 duration-200 z-30">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        verified
                      </span>
                      <div>
                        <div className="font-['Outfit',sans-serif] text-base font-bold">
                          100% Target Crushed!
                        </div>
                        <div className="text-xs">
                          All daily planetary goals logged. +150 XP credited.
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowCelebration(false)}
                      className="p-1 rounded-full hover:bg-black/10 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-base">close</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Field Operative Note: Ranger Wisdom of the Day */}
              <div className="rounded-2xl bg-gradient-to-br from-[#141c28] to-[#18202c] p-6 shadow-md relative overflow-hidden border border-white/5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#e29100] text-[#523200] flex items-center justify-center flex-shrink-0 shadow-[0_0_16px_rgba(226,145,0,0.3)]">
                    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      lightbulb
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#ffb95f] font-bold tracking-wider">
                        Field Operative Note
                      </span>
                      <span className="text-[#3c4a42]">•</span>
                      <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#bbcabf]">
                        Validated Sensor Standard
                      </span>
                    </div>
                    <h3 className="font-['Outfit',sans-serif] text-base font-bold text-[#dbe3f4]">
                      Ranger Wisdom of the Day
                    </h3>
                    <p className="text-xs text-[#bbcabf] leading-relaxed">
                      Setting your AC to 24°C instead of 20°C in the Gulf summer reduces household energy usage by up to 24% without sacrificing thermal comfort.
                    </p>
                  </div>
                </div>
              </div>

              {/* Research Biome Cluster Photo Card */}
              <div
                className="rounded-2xl overflow-hidden shadow-lg relative h-48 flex items-end p-4 bg-cover bg-center border border-white/5"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBZBERNOOmj0dD08RvgXl5E45eGkSBnv76W66o8x9eD-EtiN-dll-qZa7Cw_wJM2T5JVLRMHoLRn-3QAXoQKt9qWcOjNkx0Y8vBDGkI0s_aqPm0TVoMAWG98F6_lM68EcZ90vfU1QgXutq9NH-7nRN6CQ1kdBj-SgCKiaNs9txNvPRCDqEDh721sMW6F4kEcwnJHd5OoDWlRmv-zVVtcd_8GfcN7CX6Pk-0f5Rd583roprriZFVehDy')",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1420] via-[#070e1a]/70 to-transparent"></div>
                <div className="relative z-10 w-full flex items-center justify-between">
                  <div>
                    <span className="font-['Space_Grotesk',monospace] text-[10px] uppercase text-[#45dfa4] font-bold">
                      Research Biome Cluster
                    </span>
                    <div className="text-sm font-bold text-[#dbe3f4]">
                      Al-Hajar Mangrove Station
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#070e1a]/80 text-[#4edea3] font-['Space_Grotesk',monospace] text-[10px] font-semibold backdrop-blur-md border border-white/10">
                    Live Feed Sync
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
