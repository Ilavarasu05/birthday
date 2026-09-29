import React, { useState, useEffect } from 'react';
import { ShieldAlert, Terminal, AlertTriangle, Search } from 'lucide-react';
import { StoryConfig } from '../../config/storyConfig';
import { sound } from '../../utils/audioSynthesizer';

interface Scene01Props {
  config: StoryConfig;
  onNext: () => void;
}

export const Scene01Hacked: React.FC<Scene01Props> = ({ config, onNext }) => {
  const [phase, setPhase] = useState<'black' | 'alert' | 'terminal' | 'diagnostics'>('black');
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    // 1. Initial black screen for 1 second, then sudden glitch
    const timer1 = setTimeout(() => {
      setGlitchActive(true);
      sound.playGlitch();
      setPhase('alert');
    }, 1000);

    // 2. Glitch settles into terminal
    const timer2 = setTimeout(() => {
      sound.playGlitch();
      setPhase('terminal');
    }, 2800);

    // 3. Diagnostics populate
    const timer3 = setTimeout(() => {
      sound.playDigitalBeep(880, 0.1);
      setPhase('diagnostics');
    }, 4200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleStart = () => {
    sound.playDigitalBeep(1200, 0.15);
    onNext();
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* CRT scanline layer */}
      <div className="fixed inset-0 crt-overlay pointer-events-none z-20" />

      {/* Black screen initial */}
      {phase === 'black' && (
        <div className="text-center font-mono text-xs text-slate-700 animate-pulse">
          [INITIALIZING SECURITY PROTOCOL 0x8F...]
        </div>
      )}

      {/* Red Warning Alert */}
      {phase === 'alert' && (
        <div className={`text-center space-y-4 max-w-lg z-10 ${glitchActive ? 'glitch-anim' : ''}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-950/80 border border-red-500/50 text-red-400 font-mono text-sm tracking-widest shadow-lg shadow-red-500/20">
            <ShieldAlert className="w-5 h-5 text-red-500 animate-pulse" />
            <span>🚨 SYSTEM ALERT 🚨</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-red-500 font-mono tracking-tighter text-glow-red">
            YOUR BIRTHDAY HAS BEEN HACKED.
          </h1>

          <p className="text-xs sm:text-sm font-mono text-red-300/80">
            BREACH DETECTED IN SECTOR 7 • CRITICAL OVERLOAD OF CHARM
          </p>
        </div>
      )}

      {/* Futuristic Hacker Terminal Interface */}
      {(phase === 'terminal' || phase === 'diagnostics') && (
        <div className="w-full max-w-xl bg-black/85 backdrop-blur-xl border border-red-500/40 rounded-2xl p-5 sm:p-7 shadow-2xl shadow-red-950/50 z-10 space-y-6">
          {/* Header bar */}
          <div className="flex items-center justify-between border-b border-red-500/20 pb-3">
            <div className="flex items-center gap-2 font-mono text-xs text-red-400">
              <Terminal className="w-4 h-4 text-red-400" />
              <span>TERMINAL_AI // ROOT_OVERRIDE</span>
            </div>
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/60 animate-ping" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            </div>
          </div>

          {/* Target Identity */}
          <div className="space-y-2 font-mono text-xs sm:text-sm">
            <div className="text-red-400 tracking-wider font-semibold">
              &gt; TARGET IDENTIFIED...
            </div>
            <div className="grid grid-cols-2 gap-2 bg-red-950/20 p-3 rounded-lg border border-red-500/10">
              <div>
                <span className="text-slate-400">Name:</span>{' '}
                <span className="text-pink-400 font-bold">{config.NAME}</span>
              </div>
              <div>
                <span className="text-slate-400">Age:</span>{' '}
                <span className="text-amber-400 font-bold">{config.AGE}</span>
              </div>
              <div>
                <span className="text-slate-400">Birthday:</span>{' '}
                <span className="text-cyan-400 font-bold">{config.BIRTHDAY_DATE}</span>
              </div>
              <div>
                <span className="text-slate-400">Status:</span>{' '}
                <span className="text-emerald-400 font-bold">"WAY TOO CUTE"</span>
              </div>
            </div>
          </div>

          {/* Diagnostics Meters */}
          {phase === 'diagnostics' && (
            <div className="space-y-3 font-mono text-xs">
              <div className="text-slate-300 font-semibold flex items-center gap-1.5 text-xs">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>BIOMETRIC THREAT DIAGNOSTICS:</span>
              </div>

              {/* Cuteness */}
              <div className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>Cuteness:</span>
                  <span className="text-pink-400 font-bold">██████████ 100%</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-pink-500 h-full w-full rounded-full shadow-sm shadow-pink-500" />
                </div>
              </div>

              {/* Drama */}
              <div className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>Drama:</span>
                  <span className="text-amber-400 font-bold">████████░░ 87%</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full w-[87%] rounded-full" />
                </div>
              </div>

              {/* Attitude */}
              <div className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>Attitude:</span>
                  <span className="text-purple-400 font-bold">█████████░ 93%</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full w-[93%] rounded-full" />
                </div>
              </div>

              {/* Patience */}
              <div className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>Patience:</span>
                  <span className="text-red-400 font-bold">██░░░░░░░░ 21%</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-red-500 h-full w-[21%] rounded-full" />
                </div>
              </div>

              {/* Reply Speed */}
              <div className="flex justify-between text-slate-300 py-1 border-t border-red-500/10">
                <span>Reply Speed:</span>
                <span className="text-cyan-400 font-bold">{config.DIAGNOSTICS.replySpeed}</span>
              </div>

              {/* Food Stealing */}
              <div className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>Food Stealing:</span>
                  <span className="text-yellow-400 font-bold">██████████ 100%</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-yellow-500 h-full w-full rounded-full" />
                </div>
              </div>

              {/* Stealing My Heart */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-pink-300 font-bold">
                  <span>Stealing My Heart:</span>
                  <span className="text-pink-400">██████████ 1000%</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-pink-500 to-rose-500 h-full w-full rounded-full shadow-lg shadow-pink-500/50 animate-pulse" />
                </div>
              </div>

              {/* Final Warning */}
              <div className="p-3 bg-red-950/40 border border-red-500/30 rounded-xl text-center space-y-1 mt-4">
                <p className="text-red-400 font-bold uppercase tracking-wider text-xs">
                  WARNING: This person is dangerously lovable.
                </p>
                <p className="text-slate-400 text-[11px]">
                  Immediate romantic investigation mandatory under galactic protocol.
                </p>
              </div>

              {/* Start Investigation Button */}
              <div className="pt-2">
                <button
                  onClick={handleStart}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-red-600 via-pink-600 to-red-600 hover:from-red-500 hover:to-pink-500 text-white font-mono font-bold text-sm tracking-wider shadow-xl shadow-red-600/30 hover:shadow-red-500/50 transform active:scale-98 transition-all cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>START INVESTIGATION 🔎</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
