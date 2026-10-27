import React, { useState } from 'react';
import { soundscape } from '../utils/audio';

interface EcoChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (challenge: { name: string; xp: number; carbonKg: number }) => void;
}

export const EcoChallengeModal: React.FC<EcoChallengeModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [selectedChallenge, setSelectedChallenge] = useState(0);

  if (!isOpen) return null;

  const challenges = [
    {
      id: 0,
      title: 'Zero Single-Use Plastic Sprint',
      desc: 'Single-day audit • 150 XP',
      carbonKg: 1.2,
      xp: 150,
      color: 'text-[#4edea3]',
    },
    {
      id: 1,
      title: 'Falaj Water Conservation Audit',
      desc: 'Home flow rate calibration • 200 XP',
      carbonKg: 3.8,
      xp: 200,
      color: 'text-[#45dfa4]',
    },
    {
      id: 2,
      title: 'Passive Thermal Night Shift',
      desc: 'Air conditioning preset at 24.5°C • 180 XP',
      carbonKg: 4.5,
      xp: 180,
      color: 'text-[#ffb95f]',
    },
  ];

  const handleCommence = () => {
    soundscape.playChime('combo');
    const ch = challenges[selectedChallenge];
    onConfirm({
      name: ch.title,
      xp: ch.xp,
      carbonKg: ch.carbonKg,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070e1a]/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#141c28] border border-[#2d3542] p-6 shadow-2xl flex flex-col gap-4 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#4edea3]">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified
            </span>
            <h3 className="font-['Outfit',sans-serif] text-xl text-[#dbe3f4] font-bold">
              Deploy New Eco-Challenge
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#232a37] flex items-center justify-center text-[#bbcabf] hover:text-[#dbe3f4] transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        <p className="text-sm text-[#bbcabf] leading-relaxed">
          Select a real-world conservation sprint to commence over the next 24 hours. Your telemetry sensor will register activity automatically.
        </p>

        <div className="space-y-2">
          {challenges.map((c) => (
            <label
              key={c.id}
              onClick={() => setSelectedChallenge(c.id)}
              className={`flex items-center justify-between p-3.5 rounded-xl cursor-pointer transition-all border ${
                selectedChallenge === c.id
                  ? 'bg-[#18202c] border-[#4edea3]/40 shadow-[0_0_12px_rgba(78,222,163,0.15)]'
                  : 'bg-[#141c28] border-white/5 hover:bg-[#18202c]'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="challenge"
                  checked={selectedChallenge === c.id}
                  onChange={() => setSelectedChallenge(c.id)}
                  className="w-4 h-4 accent-[#4edea3] cursor-pointer"
                />
                <div>
                  <span className="text-sm font-semibold text-[#dbe3f4] block">
                    {c.title}
                  </span>
                  <span className="font-['Space_Grotesk',monospace] text-[10px] text-[#bbcabf] uppercase">
                    {c.desc}
                  </span>
                </div>
              </div>
              <span className={`font-['Space_Grotesk',monospace] text-xs font-bold ${c.color}`}>
                +{c.carbonKg} kg CO₂
              </span>
            </label>
          ))}
        </div>

        <div className="pt-2 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full text-xs text-[#bbcabf] hover:text-[#dbe3f4] font-['Space_Grotesk',monospace] uppercase tracking-wider cursor-pointer transition-colors"
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={handleCommence}
            className="px-6 py-2.5 rounded-full bg-[#10b981] hover:bg-[#00bd85] text-[#00422b] font-['Outfit',sans-serif] text-sm font-bold shadow-[0_0_16px_rgba(78,222,163,0.5)] cursor-pointer transition-all hover:scale-105 active:scale-95"
            type="button"
          >
            Commence Sprint
          </button>
        </div>
      </div>
    </div>
  );
};
