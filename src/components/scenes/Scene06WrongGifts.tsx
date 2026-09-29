import React, { useState } from 'react';
import { Gift, Sparkles, AlertCircle } from 'lucide-react';
import { StoryConfig } from '../../config/storyConfig';
import { sound } from '../../utils/audioSynthesizer';

interface Scene06Props {
  config: StoryConfig;
  boxOpenCount: number;
  onBoxClick: () => void;
  onNext: () => void;
}

export const Scene06WrongGifts: React.FC<Scene06Props> = ({
  config,
  boxOpenCount,
  onBoxClick,
  onNext,
}) => {
  const [messages] = useState<string[]>([
    "NOPE 😂",
    "TRY AGAIN.",
    "Are you seriously still clicking? 😂",
    "Okay okay... one last box.",
  ]);

  const [isFinalBox, setIsFinalBox] = useState(false);
  const [isBlackout, setIsBlackout] = useState(false);

  const handleClick = () => {
    sound.playFunnyBoing();
    onBoxClick();

    if (boxOpenCount >= 3 && !isFinalBox) {
      setIsFinalBox(true);
      // Soften music
      sound.setVolume(0.2);
    } else if (isFinalBox) {
      // Final click -> Screen fades to pitch black, music stops
      sound.playDigitalBeep(440, 0.4);
      setIsBlackout(true);
      setTimeout(() => {
        onNext();
      }, 1600);
    }
  };

  if (isBlackout) {
    return <div className="fixed inset-0 bg-black z-50 transition-opacity duration-1000" />;
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between p-6 z-10 pointer-events-auto">
      {/* Top Banner */}
      <div className="w-full max-w-md text-center space-y-2 pt-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 font-mono text-xs">
          <Gift className="w-4 h-4 text-purple-400" />
          <span>VAULT RECOVERY OPERATION</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-cinematic text-glow-pink">
          YOUR BIRTHDAY GIFT IS HERE 🎁
        </h1>

        <p className="text-xs sm:text-sm text-slate-300">
          Tap the 3D gift box in the center of the screen to open!
        </p>
      </div>

      {/* Middle Interactive Zone */}
      <div className="w-full flex flex-col items-center my-auto cursor-pointer" onClick={handleClick}>
        {/* Funny inside reveal popover */}
        {boxOpenCount > 0 && !isFinalBox && (
          <div className="mb-8 px-6 py-3 rounded-2xl bg-black/90 border border-pink-500/50 shadow-2xl shadow-pink-500/30 text-center animate-bounce">
            <span className="text-lg sm:text-2xl font-black text-pink-400 font-mono">
              {messages[Math.min(boxOpenCount - 1, messages.length - 1)]}
            </span>
          </div>
        )}

        {isFinalBox && (
          <div className="mb-6 px-6 py-4 rounded-2xl bg-black/90 border border-amber-400/60 shadow-2xl shadow-amber-400/30 text-center animate-pulse">
            <div className="text-xs font-mono text-amber-400 mb-1">
              ✨ SPECIAL ENCRYPTED ARTIFACT DETECTED ✨
            </div>
            <span className="text-lg sm:text-xl font-bold text-white font-romantic">
              Maybe this one is different...
            </span>
          </div>
        )}

        {/* Click Prompt Pill */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          className={`py-3 px-8 rounded-full font-mono text-xs font-bold tracking-widest uppercase transition-all shadow-xl active:scale-95 cursor-pointer ${
            isFinalBox
              ? 'bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 text-white shadow-amber-500/40 animate-pulse text-sm py-4 px-10'
              : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/30'
          }`}
        >
          {isFinalBox ? 'OPEN FINAL GIFT 🎁' : `TAP TO UNWRAP (BOX #${boxOpenCount + 1})`}
        </button>
      </div>

      {/* Bottom hint */}
      <div className="pb-6 text-center text-[11px] font-mono text-slate-500">
        Interactive 3D Gift Box • WebGL Powered
      </div>
    </div>
  );
};
