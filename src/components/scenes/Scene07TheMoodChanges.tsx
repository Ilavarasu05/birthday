import React, { useState, useEffect } from 'react';
import { StoryConfig } from '../../config/storyConfig';
import { sound } from '../../utils/audioSynthesizer';

interface Scene07Props {
  config: StoryConfig;
  onNext: () => void;
}

export const Scene07TheMoodChanges: React.FC<Scene07Props> = ({ onNext }) => {
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    // Start emotional piano & strings background music
    sound.setVolume(0.75);
    sound.startRomanticMusic('gentle');

    // Cinematic step-by-step pacing
    const t1 = setTimeout(() => setStep(1), 1200); // "Okay..."
    const t2 = setTimeout(() => setStep(2), 3200); // "Enough jokes."
    const t3 = setTimeout(() => setStep(3), 5600); // "There's something I actually wanted to tell you."
    const t4 = setTimeout(() => {
      onNext();
    }, 9000); // Transition to Scene 08 Memories

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onNext]);

  return (
    <div className="fixed inset-0 z-20 flex flex-col items-center justify-center p-6 text-center bg-black/50 pointer-events-none select-none">
      {/* Single floating golden particle */}
      <div className="relative mb-8">
        <div className="w-3 h-3 rounded-full bg-amber-300 shadow-[0_0_25px_8px_rgba(251,191,36,0.8)] animate-pulse" />
        <div className="absolute inset-0 w-3 h-3 rounded-full bg-amber-100 animate-ping opacity-75" />
      </div>

      <div className="min-h-[140px] flex items-center justify-center">
        {step === 1 && (
          <h2 className="text-3xl sm:text-4xl text-slate-200 font-romantic italic tracking-wide animate-fadeIn transition-opacity duration-1000">
            Okay...
          </h2>
        )}

        {step === 2 && (
          <h2 className="text-3xl sm:text-4xl text-slate-100 font-romantic tracking-wide animate-fadeIn transition-opacity duration-1000">
            Enough jokes.
          </h2>
        )}

        {step === 3 && (
          <h2 className="text-2xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-200 to-rose-100 font-romantic font-normal leading-relaxed max-w-xl animate-fadeIn transition-opacity duration-1000">
            There’s something I actually wanted to tell you.
          </h2>
        )}
      </div>

      {step >= 3 && (
        <p className="text-xs font-mono text-amber-200/50 tracking-widest uppercase mt-4 animate-pulse">
          Entering the Night Garden...
        </p>
      )}
    </div>
  );
};
