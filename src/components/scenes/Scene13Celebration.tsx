import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Award, ArrowRight } from 'lucide-react';
import { StoryConfig } from '../../config/storyConfig';
import { sound } from '../../utils/audioSynthesizer';

interface Scene13Props {
  config: StoryConfig;
  onNext: () => void;
}

export const Scene13Celebration: React.FC<Scene13Props> = ({ config, onNext }) => {
  useEffect(() => {
    // Firework & Golden Shimmer Heart barrage
    const fireBarrage = () => {
      sound.playFirework();
      const originX = Math.random() * 0.8 + 0.1;
      const originY = Math.random() * 0.4 + 0.2;

      // Colorful firework burst
      confetti({
        particleCount: 80,
        spread: 120,
        origin: { x: originX, y: originY },
        colors: ['#f43f5e', '#fbbf24', '#ffd700', '#a855f7', '#38bdf8', '#ffffff'],
      });

      // Dedicated golden heart & star glitter shower
      confetti({
        particleCount: 40,
        spread: 90,
        origin: { x: originX, y: originY },
        colors: ['#ffd700', '#fbbf24', '#f59e0b', '#fffbeb'],
        scalar: 1.3,
        ticks: 200,
        gravity: 0.8,
      });
    };

    fireBarrage();
    const interval = setInterval(fireBarrage, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between p-6 z-10 select-none text-center">
      {/* Top Badge */}
      <div className="pt-6">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-rose-950/80 border border-rose-500/50 text-rose-300 font-mono text-sm tracking-widest shadow-2xl shadow-rose-500/30 animate-pulse">
          <Award className="w-4 h-4 text-rose-400" />
          <span>{config.CELEBRATION.badge}</span>
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
        </div>
      </div>

      {/* Main Emotional Climax Headlines */}
      <div className="max-w-2xl mx-auto my-auto space-y-6">
        <h1 className="text-3xl sm:text-5xl font-black font-cinematic text-white leading-tight text-glow-gold">
          {config.CELEBRATION.title}
        </h1>

        <p className="text-sm sm:text-lg text-rose-200/90 font-romantic italic max-w-lg mx-auto">
          "{config.CELEBRATION.subtitle}"
        </p>

        <div className="space-y-2 pt-2">
          <h2 className="text-2xl sm:text-4xl font-romantic font-bold text-amber-300">
            Happy Birthday, {config.NAME}.
          </h2>
          <div className="text-3xl sm:text-5xl font-black font-cinematic text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-amber-300 text-glow-pink">
            {config.CELEBRATION.loveDeclaration}
          </div>
        </div>
      </div>

      {/* Button to proceed to Scene 14 */}
      <div className="max-w-md mx-auto w-full pb-6">
        <button
          onClick={onNext}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white font-mono font-bold text-xs sm:text-sm tracking-wider shadow-2xl shadow-pink-600/30 transform active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span>VIEW OFFICIAL CLOSING REPORT 📋</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
