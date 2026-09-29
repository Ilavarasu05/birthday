import React, { useState, useEffect } from 'react';
import { RotateCcw, Heart, Sparkles, Share2, Settings } from 'lucide-react';
import { StoryConfig } from '../../config/storyConfig';
import { sound } from '../../utils/audioSynthesizer';

interface Scene15Props {
  config: StoryConfig;
  onRestart: () => void;
  onOpenConfig?: () => void;
}

export const Scene15Ending: React.FC<Scene15Props> = ({
  config,
  onRestart,
  onOpenConfig,
}) => {
  const [step, setStep] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1200); // quote1
    const t2 = setTimeout(() => setStep(2), 3600); // quote2
    const t3 = setTimeout(() => setStep(3), 6200); // signature & button

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Birthday Surprise for ${config.NAME}`,
        text: `${config.YOUR_NAME} & ${config.NAME} - Forever & Always! ❤️`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleRestart = () => {
    sound.stopRomanticMusic();
    onRestart();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between p-6 z-10 select-none text-center">
      {/* Space for top view */}
      <div className="pt-8" />

      {/* Cinematic Quote & Silhouettes */}
      <div className="max-w-xl mx-auto my-auto space-y-6">
        <div className="min-h-[140px] flex flex-col items-center justify-center space-y-3">
          {step >= 1 && (
            <p className="text-xl sm:text-2xl font-romantic italic text-amber-100/90 animate-fadeIn">
              "{config.FINAL_MESSAGE.quote1}"
            </p>
          )}

          {step >= 2 && (
            <h1 className="text-3xl sm:text-5xl font-romantic font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-200 to-pink-100 text-glow-gold animate-fadeIn">
              "{config.FINAL_MESSAGE.quote2}"
            </h1>
          )}
        </div>

        {step >= 3 && (
          <div className="space-y-4 animate-fadeIn">
            {/* Signature */}
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-black/60 backdrop-blur-md border border-amber-400/30 text-white font-cinematic text-lg sm:text-2xl shadow-2xl shadow-amber-500/20">
              <span className="text-amber-300 font-bold">{config.YOUR_NAME}</span>
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
              <span className="text-pink-300 font-bold">{config.NAME}</span>
            </div>

            <p className="text-xs font-mono text-amber-200/70 tracking-widest uppercase">
              {config.FINAL_MESSAGE.dateDisplay || config.BIRTHDAY_DATE}
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {step >= 3 && (
        <div className="max-w-md mx-auto w-full space-y-3 pb-6 animate-fadeIn">
          <button
            onClick={handleRestart}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-pink-600 hover:from-amber-400 hover:to-pink-500 text-white font-mono font-bold text-sm tracking-wider shadow-2xl shadow-amber-500/30 transform active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>PLAY THE STORY AGAIN</span>
          </button>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleShare}
              className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-mono text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-pink-400" />
              <span>{copied ? 'Link Copied! ✨' : 'Share Surprise'}</span>
            </button>

            {onOpenConfig && (
              <button
                onClick={onOpenConfig}
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-mono text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5 text-amber-400" />
                <span>Customize Surprise</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
