import React from 'react';
import { ShieldCheck, CheckCircle2, Award, Zap } from 'lucide-react';
import { StoryConfig } from '../../config/storyConfig';
import { sound } from '../../utils/audioSynthesizer';

interface Scene02Props {
  config: StoryConfig;
  onNext: () => void;
}

export const Scene02Mission: React.FC<Scene02Props> = ({ config, onNext }) => {
  const handleAccept = () => {
    sound.playDigitalBeep(980, 0.2);
    sound.playCorrectChime();
    onNext();
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 z-10">
      <div className="w-full max-w-lg bg-slate-950/85 backdrop-blur-xl border border-cyan-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/40 space-y-6 animate-fadeIn">
        {/* Top badge */}
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-semibold">
              {config.MISSION.department}
            </span>
          </div>
          <span className="font-mono text-[10px] text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded-full font-bold">
            TOP SECRET
          </span>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <p className="font-mono text-xs text-slate-400 tracking-wider">
            SECURITY DOSSIER #007-LOVE
          </p>
          <h1 className="text-2xl sm:text-3xl font-black font-cinematic text-white tracking-wide text-glow-cyan">
            AGENT {config.NAME.toUpperCase()}
          </h1>
          <p className="text-sm text-slate-300 font-sans leading-relaxed pt-1">
            You have been selected for a highly classified birthday mission.
          </p>
        </div>

        {/* Mission Objectives List */}
        <div className="space-y-3 bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="text-xs font-mono font-semibold text-cyan-400 flex items-center gap-1.5 uppercase tracking-wider">
            <Award className="w-4 h-4 text-cyan-400" />
            <span>PRIMARY MISSION OBJECTIVES:</span>
          </div>

          <ul className="space-y-2.5">
            {config.MISSION.objectives.map((obj, idx) => (
              <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Rules of Engagement */}
        <div className="p-3 bg-cyan-950/20 border border-cyan-500/20 rounded-xl text-center">
          <p className="text-[11px] font-mono text-cyan-300">
            WARNING: Refusal of this mission will result in endless hugs and forced cuddles.
          </p>
        </div>

        {/* Accept Button */}
        <button
          onClick={handleAccept}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono font-bold text-sm tracking-wider shadow-lg shadow-cyan-600/30 hover:shadow-cyan-500/50 transform active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Zap className="w-4 h-4 text-yellow-300 animate-bounce" />
          <span>ACCEPT MISSION</span>
        </button>
      </div>
    </div>
  );
};
