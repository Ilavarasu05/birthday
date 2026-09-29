import React from 'react';
import { FileText, CheckCircle2, Heart, Infinity, ArrowRight } from 'lucide-react';
import { StoryConfig } from '../../config/storyConfig';
import { sound } from '../../utils/audioSynthesizer';

interface Scene14Props {
  config: StoryConfig;
  onNext: () => void;
}

export const Scene14FinalReport: React.FC<Scene14Props> = ({ config, onNext }) => {
  const handleProceed = () => {
    sound.playDigitalBeep(880, 0.15);
    onNext();
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 z-10 select-none">
      <div className="w-full max-w-lg bg-slate-950/90 backdrop-blur-xl border border-pink-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-pink-950/50 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-pink-500/20 pb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-pink-400" />
            <span className="font-mono text-xs text-pink-400 font-bold uppercase tracking-widest">
              OFFICIAL CLOSING REPORT
            </span>
          </div>
          <span className="font-mono text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
            ARCHIVE: #FOREVER
          </span>
        </div>

        {/* Report Key-Values */}
        <div className="space-y-3 font-mono text-xs sm:text-sm bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between py-1 border-b border-slate-800">
            <span className="text-slate-400">Mission:</span>
            <span className="text-white font-semibold">{config.FINAL_REPORT.mission}</span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-slate-800">
            <span className="text-slate-400">Status:</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>{config.FINAL_REPORT.status}</span>
            </span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-slate-800">
            <span className="text-slate-400">Heart:</span>
            <span className="text-rose-400 font-semibold flex items-center gap-1">
              <Heart className="w-4 h-4 fill-rose-400" />
              <span>{config.FINAL_REPORT.heart}</span>
            </span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-slate-800">
            <span className="text-slate-400">Relationship:</span>
            <span className="text-amber-400 font-semibold">{config.FINAL_REPORT.relationship}</span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-slate-400">Future:</span>
            <span className="text-cyan-400 font-black flex items-center gap-1 text-sm">
              <Infinity className="w-4 h-4" />
              <span>{config.FINAL_REPORT.future}</span>
            </span>
          </div>
        </div>

        {/* Punchline Card */}
        <div className="text-center space-y-2 p-4 bg-gradient-to-r from-pink-950/40 to-purple-950/40 border border-pink-500/30 rounded-2xl">
          <p className="text-xs font-mono text-pink-300 uppercase tracking-wider font-semibold">
            Congratulations.
          </p>
          <h3 className="text-base sm:text-xl font-bold text-white font-sans">
            "{config.FINAL_REPORT.punchline}"
          </h3>
        </div>

        {/* Proceed Button */}
        <button
          onClick={handleProceed}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-mono font-bold text-sm tracking-wider shadow-lg shadow-pink-600/30 transform active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>SUNRISE HORIZON 🌅</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
