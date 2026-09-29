import React, { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { StoryConfig } from '../../config/storyConfig';
import { sound } from '../../utils/audioSynthesizer';

interface Scene11Props {
  config: StoryConfig;
  ringRevealed: boolean;
  onRevealRing: () => void;
  onAcceptProposal: () => void;
}

export const Scene11Proposal: React.FC<Scene11Props> = ({
  config,
  ringRevealed,
  onRevealRing,
  onAcceptProposal,
}) => {
  const [step, setStep] = useState<number>(0);
  const [noCount, setNoCount] = useState<number>(0);
  const [noPosition, setNoPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    // Cinematic timeline pacing
    const t1 = setTimeout(() => setStep(1), 1000); // leadIn
    const t2 = setTimeout(() => setStep(2), 3500); // middle
    const t3 = setTimeout(() => {
      setStep(3); // Ring reveals
      onRevealRing();
      sound.playPianoNote(587.33, 4, 0.35);
    }, 6000);
    const t4 = setTimeout(() => setStep(4), 8500); // questionPrefix
    const t5 = setTimeout(() => setStep(5), 10500); // Main Question + buttons

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onRevealRing]);

  const handleNoClick = () => {
    sound.playFunnyBoing();
    const nextCount = noCount + 1;
    setNoCount(nextCount);

    // Playfully displace button away from touch/cursor
    const randomX = (Math.random() - 0.5) * 160;
    const randomY = (Math.random() - 0.5) * 80;
    setNoPosition({ x: randomX, y: randomY });
  };

  const handleYesClick = () => {
    sound.boostClimax();
    onAcceptProposal();
  };

  const noResponses = config.NO_BUTTON_RESPONSES || [
    "Are you sure? 👀",
    "Think again 😂",
    "That button is starting to look suspicious 🧐",
    "Okay... I think we both know the answer 🥺",
  ];

  const currentNoText = noCount > 0 ? noResponses[Math.min(noCount - 1, noResponses.length - 1)] : "NO 🙈";

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between p-6 z-10 select-none pointer-events-auto">
      {/* Lead-in Lines */}
      <div className="max-w-xl mx-auto text-center space-y-3 pt-6">
        {step >= 1 && (
          <p className="text-xl sm:text-2xl font-romantic italic text-slate-200 animate-fadeIn">
            "{config.PROPOSAL_MESSAGE.leadIn}"
          </p>
        )}

        {step >= 2 && (
          <h2 className="text-2xl sm:text-3xl font-romantic font-bold text-amber-200 text-glow-gold animate-fadeIn leading-relaxed">
            "{config.PROPOSAL_MESSAGE.middle}"
          </h2>
        )}
      </div>

      {/* Center Ring Reveal & The Big Question */}
      <div className="w-full max-w-xl mx-auto flex flex-col items-center my-auto text-center space-y-6">
        {step >= 4 && (
          <p className="font-mono text-xs sm:text-sm text-pink-300 tracking-widest uppercase animate-fadeIn">
            {config.PROPOSAL_MESSAGE.questionPrefix}
          </p>
        )}

        {step >= 5 && (
          <div className="space-y-4 animate-fadeIn">
            <h1 className="text-3xl sm:text-5xl font-black font-cinematic text-white tracking-wider text-glow-gold">
              {config.PROPOSAL_MESSAGE.mainQuestion}
            </h1>
            <div className="text-4xl sm:text-6xl font-black font-romantic text-rose-500 text-glow-red">
              {config.PROPOSAL_MESSAGE.subQuestion}
            </div>

            {/* Funny No feedback if clicked */}
            {noCount > 0 && (
              <div className="py-1.5 px-4 rounded-full bg-slate-900/90 border border-amber-400/40 text-amber-300 font-mono text-xs inline-block animate-bounce">
                {currentNoText}
              </div>
            )}

            {/* Buttons YES / NO */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 relative min-h-[90px]">
              {/* The YES Button */}
              <button
                onClick={handleYesClick}
                style={{
                  transform: `scale(${1 + Math.min(noCount * 0.12, 0.5)})`,
                }}
                className="py-4 px-10 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 hover:from-rose-500 hover:to-pink-500 text-white font-cinematic font-black text-base sm:text-xl tracking-widest shadow-2xl shadow-rose-600/50 hover:shadow-rose-500/80 active:scale-95 transition-all duration-300 cursor-pointer flex items-center gap-2 group z-20"
              >
                <Heart className="w-6 h-6 fill-white text-white group-hover:scale-125 transition-transform" />
                <span>YES ❤️</span>
                <Sparkles className="w-5 h-5 text-yellow-300" />
              </button>

              {/* The Playful NO Button */}
              <button
                onClick={handleNoClick}
                style={{
                  transform: `translate(${noPosition.x}px, ${noPosition.y}px) scale(${Math.max(0.7, 1 - noCount * 0.08)})`,
                }}
                className="py-3 px-6 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 font-mono text-xs font-semibold border border-slate-600 transition-all duration-300 cursor-pointer select-none"
              >
                <span>{noCount === 0 ? "NO 🙈" : "NO 🏃‍♂️"}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom hint */}
      <div className="pb-4 text-center text-[11px] font-mono text-slate-500">
        Solitaire Diamond Ring in Octagonal Velvet Jewelry Box
      </div>
    </div>
  );
};
