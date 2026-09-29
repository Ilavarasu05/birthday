import React, { useState, useEffect } from 'react';
import { DoorOpen, Sparkles, Heart } from 'lucide-react';
import { StoryConfig } from '../../config/storyConfig';
import { sound } from '../../utils/audioSynthesizer';

interface Scene10Props {
  config: StoryConfig;
  doorOpened: boolean;
  onOpenDoor: () => void;
  onNext: () => void;
}

export const Scene10SecretDoor: React.FC<Scene10Props> = ({
  doorOpened,
  onOpenDoor,
  onNext,
}) => {
  const [step, setStep] = useState<number>(0);
  const [heartbeatActive, setHeartbeatActive] = useState<boolean>(false);

  useEffect(() => {
    // 1. Initial fade to dark
    const t1 = setTimeout(() => {
      setStep(1); // "Wait..."
    }, 800);

    // 2. "I still have one more thing."
    const t2 = setTimeout(() => {
      setStep(2);
      setHeartbeatActive(true);
    }, 2400);

    // 3. Golden door emerges with heartbeat thumps
    const t3 = setTimeout(() => {
      sound.playHeartbeat();
      setStep(3);
    }, 4200);

    const heartbeatInterval = setInterval(() => {
      if (heartbeatActive && !doorOpened) {
        sound.playHeartbeat();
      }
    }, 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(heartbeatInterval);
    };
  }, [heartbeatActive, doorOpened]);

  const handleDoorClick = () => {
    if (doorOpened) return;
    sound.playDigitalBeep(523.25, 0.4);
    sound.playPianoNote(440, 3, 0.3);
    onOpenDoor();

    // After camera travels through the bright door light, transition to proposal scene
    setTimeout(() => {
      onNext();
    }, 2800);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between p-6 z-10 select-none">
      {/* Top Text Reveals */}
      <div className="max-w-md mx-auto text-center space-y-3 pt-8">
        {step >= 1 && (
          <p className="text-xl sm:text-2xl font-romantic italic text-slate-300 animate-fadeIn">
            Wait...
          </p>
        )}

        {step >= 2 && (
          <h2 className="text-2xl sm:text-3xl font-romantic text-white text-glow-gold animate-fadeIn">
            I still have one more thing.
          </h2>
        )}
      </div>

      {/* Heartbeat pulse and door open button */}
      <div className="w-full flex flex-col items-center my-auto">
        {step >= 3 && !doorOpened && (
          <div className="text-center space-y-6 animate-fadeIn">
            {/* Pulsing heart indicating the thumps */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/60 border border-rose-500/40 text-rose-300 font-mono text-xs">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-ping" />
              <span>HEARTBEAT DETECTED // 120 BPM</span>
            </div>

            <p className="text-lg font-cinematic text-amber-200 tracking-wider">
              One final mission.
            </p>

            <button
              onClick={handleDoorClick}
              className="group py-4 px-10 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 hover:from-amber-400 hover:to-rose-400 text-white font-mono font-bold text-sm sm:text-base tracking-widest shadow-2xl shadow-amber-500/40 hover:shadow-amber-500/70 transform active:scale-95 transition-all flex items-center gap-3 cursor-pointer mx-auto"
            >
              <DoorOpen className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              <span>OPEN</span>
              <Sparkles className="w-4 h-4 text-yellow-200" />
            </button>
          </div>
        )}

        {doorOpened && (
          <div className="text-center space-y-2 animate-pulse">
            <p className="font-cinematic text-sm sm:text-base text-amber-200 tracking-widest uppercase">
              Entering the Sanctuary...
            </p>
          </div>
        )}
      </div>

      {/* Bottom hint */}
      <div className="pb-4 text-center text-[11px] font-mono text-slate-500">
        3D Golden Portal • Unlocking Destiny
      </div>
    </div>
  );
};
