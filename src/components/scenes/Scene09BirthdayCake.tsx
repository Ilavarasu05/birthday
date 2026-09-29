import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Flame, Heart, ArrowRight } from 'lucide-react';
import { StoryConfig } from '../../config/storyConfig';
import { sound } from '../../utils/audioSynthesizer';

interface Scene09Props {
  config: StoryConfig;
  candlesBlown: boolean;
  onBlowCandles: () => void;
  onNext: () => void;
}

export const Scene09BirthdayCake: React.FC<Scene09Props> = ({
  config,
  candlesBlown,
  onBlowCandles,
  onNext,
}) => {
  const [showCelebrationText, setShowCelebrationText] = useState(false);

  const handleCandleInteraction = () => {
    if (candlesBlown) return;

    sound.playBlowCandles();
    onBlowCandles();

    // Trigger explosive fireworks & confetti celebration
    setTimeout(() => {
      sound.playFirework();

      // Confetti burst 1 (left)
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { x: 0.2, y: 0.6 },
        colors: ['#fbbf24', '#f43f5e', '#a855f7', '#ffffff'],
      });

      // Confetti burst 2 (right)
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { x: 0.8, y: 0.6 },
        colors: ['#fbbf24', '#f43f5e', '#a855f7', '#ffffff'],
      });

      // Star shape burst (center)
      confetti({
        particleCount: 50,
        spread: 100,
        origin: { x: 0.5, y: 0.4 },
        shapes: ['circle'],
        colors: ['#fbbf24', '#ffd700', '#ffffff'],
      });

      setShowCelebrationText(true);
    }, 450);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between p-6 z-10 select-none">
      {/* Top Banner */}
      <div className="max-w-md mx-auto text-center space-y-2 pt-6">
        <p className="font-mono text-xs text-amber-300 tracking-widest uppercase">
          {config.BIRTHDAY_MESSAGE.greeting}
        </p>

        <h1 className="text-3xl sm:text-5xl font-black font-romantic text-white text-glow-gold">
          {config.BIRTHDAY_MESSAGE.subtext}
        </h1>
      </div>

      {/* Center Interactive Candle Zone */}
      <div className="w-full flex flex-col items-center my-auto">
        {!candlesBlown ? (
          <div className="text-center space-y-4">
            <button
              onClick={handleCandleInteraction}
              className="group relative inline-flex items-center gap-2 py-4 px-8 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 hover:from-amber-400 hover:to-rose-400 text-white font-mono font-bold text-sm sm:text-base tracking-wider shadow-2xl shadow-amber-500/30 active:scale-95 transition-all cursor-pointer animate-pulse"
            >
              <Flame className="w-5 h-5 text-yellow-200 animate-bounce group-hover:scale-125 transition-transform" />
              <span>{config.BIRTHDAY_MESSAGE.wishPrompt}</span>
              <Sparkles className="w-4 h-4 text-yellow-200" />
            </button>
            <p className="text-xs font-mono text-slate-400">
              (Tap the button or the 3D candles on the cake to blow)
            </p>
          </div>
        ) : (
          showCelebrationText && (
            <div className="max-w-xl mx-auto text-center space-y-4 p-6 bg-slate-950/80 backdrop-blur-xl border border-pink-500/30 rounded-3xl shadow-2xl shadow-pink-950/60 animate-fadeIn">
              <div className="w-12 h-12 mx-auto rounded-full bg-pink-500/20 border border-pink-500/40 flex items-center justify-center">
                <Heart className="w-6 h-6 text-pink-400 fill-pink-400 animate-pulse" />
              </div>

              <h2 className="text-xl sm:text-3xl font-romantic font-bold text-white text-glow-pink leading-snug">
                "{config.BIRTHDAY_MESSAGE.afterWishMessage}"
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 font-sans italic">
                May every dream you hold close whisper itself into reality this year.
              </p>

              <div className="pt-2">
                <button
                  onClick={onNext}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-purple-500 text-white font-mono font-bold text-xs sm:text-sm tracking-wider shadow-xl shadow-pink-600/30 transform active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>BUT WAIT... ONE MORE THING</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )
        )}
      </div>

      {/* Bottom hint */}
      <div className="pb-4 text-center text-[11px] font-mono text-slate-500">
        Interactive 3D Cake • Birthday Celebration
      </div>
    </div>
  );
};
