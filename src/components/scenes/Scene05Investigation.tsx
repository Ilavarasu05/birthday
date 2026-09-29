import React, { useState, useEffect } from 'react';
import { Siren, FileSearch, CheckCircle2, ShieldAlert, Heart, Camera, MessageSquare, Sparkles, Utensils } from 'lucide-react';
import { StoryConfig } from '../../config/storyConfig';
import { sound } from '../../utils/audioSynthesizer';

interface Scene05Props {
  config: StoryConfig;
  onNext: () => void;
}

export const Scene05Investigation: React.FC<Scene05Props> = ({ config, onNext }) => {
  const [collectedEvidence, setCollectedEvidence] = useState<string[]>([]);
  const [caseSolved, setCaseSolved] = useState(false);
  const [showSentence, setShowSentence] = useState(false);

  useEffect(() => {
    sound.playDetectiveSting();
  }, []);

  const handleInspectEvidence = (id: string) => {
    if (!collectedEvidence.includes(id)) {
      sound.playDigitalBeep(750, 0.08);
      const updated = [...collectedEvidence, id];
      setCollectedEvidence(updated);

      if (updated.length === config.INVESTIGATION.evidenceList.length) {
        sound.playVictoryFanfare();
        setTimeout(() => {
          setCaseSolved(true);
        }, 600);
        setTimeout(() => {
          setShowSentence(true);
        }, 2200);
      }
    }
  };

  const getEvidenceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Camera': return <Camera className="w-4 h-4 text-pink-400" />;
      case 'MessageSquare': return <MessageSquare className="w-4 h-4 text-cyan-400" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-amber-400" />;
      case 'Utensils': return <Utensils className="w-4 h-4 text-yellow-400" />;
      default: return <FileSearch className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 z-10">
      <div className="w-full max-w-xl bg-slate-950/90 backdrop-blur-xl border border-amber-500/40 rounded-2xl p-5 sm:p-7 shadow-2xl shadow-amber-950/40 space-y-6">
        {/* Police Badge Header */}
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
          <div className="flex items-center gap-2">
            <Siren className="w-5 h-5 text-amber-400 animate-pulse" />
            <span className="font-mono text-xs text-amber-400 font-bold uppercase tracking-widest">
              🚨 SPECIAL INVESTIGATION UNIT 🚨
            </span>
          </div>
          <span className="font-mono text-xs text-slate-400 bg-slate-900 border border-slate-700 px-2 py-0.5 rounded">
            CASE {config.INVESTIGATION.caseNumber}
          </span>
        </div>

        {/* Case Description */}
        <div className="space-y-1">
          <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            CLASSIFIED REPORT:
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
            "{config.INVESTIGATION.crime}"
          </h2>
        </div>

        {/* Suspects Lineup (All 3 are the same person!) */}
        <div className="space-y-2">
          <p className="text-xs font-mono text-slate-400">
            PERSONS OF INTEREST (LINEUP):
          </p>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 text-center space-y-2 relative group hover:border-amber-500/50 transition-colors"
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-tr from-amber-500/30 to-pink-500/30 border border-amber-500/40 flex items-center justify-center text-lg">
                  🕵️‍♀️
                </div>
                <div>
                  <div className="text-[10px] font-mono text-amber-400 font-semibold">
                    SUSPECT #{String(num).padStart(2, '0')}
                  </div>
                  <div className="text-xs font-bold text-white">{config.NAME}</div>
                  <div className="text-[9px] text-slate-400 truncate mt-0.5">
                    {config.INVESTIGATION.aliases[num - 1] || 'Guilty Cutie'}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] font-mono text-center text-slate-500 italic">
            *Forensics note: All 3 suspects appear to be the exact same dangerously cute human.*
          </p>
        </div>

        {/* Evidence Vault */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-300">
            <span>COLLECT FORENSIC EVIDENCE ({collectedEvidence.length}/{config.INVESTIGATION.evidenceList.length}):</span>
            <span className="text-amber-400">Tap cards to inspect</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {config.INVESTIGATION.evidenceList.map((ev) => {
              const isInspected = collectedEvidence.includes(ev.id);
              return (
                <button
                  key={ev.id}
                  onClick={() => handleInspectEvidence(ev.id)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                    isInspected
                      ? 'bg-amber-950/20 border-amber-500/40 text-slate-200'
                      : 'bg-slate-900/50 border-slate-800 hover:border-amber-500/30 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                      {getEvidenceIcon(ev.icon)}
                      <span>{ev.title}</span>
                    </div>
                    {isInspected ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <span className="text-[10px] font-mono bg-slate-800 px-1.5 py-0.5 rounded text-amber-400">
                        NEW
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    {ev.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Case Solved & Sentence Reveal */}
        {caseSolved && (
          <div className="pt-2 border-t border-amber-500/20 space-y-4 text-center animate-fadeIn">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                VERDICT REACHED:
              </span>
              <h3 className="text-xl font-black text-amber-300 font-cinematic">
                CASE SOLVED.
              </h3>
              <p className="text-sm text-slate-200">
                The suspect is guilty of{' '}
                <span className="text-pink-400 font-bold">stealing my heart.</span>
              </p>
            </div>

            {showSentence && (
              <div className="p-4 bg-gradient-to-r from-pink-950/60 to-purple-950/60 border border-pink-500/40 rounded-xl space-y-2 animate-fadeIn">
                <span className="text-[11px] font-mono text-pink-300 uppercase tracking-widest font-semibold">
                  RECOMMENDED COURT SENTENCE:
                </span>
                <div className="text-lg sm:text-xl font-black text-white font-cinematic text-glow-pink">
                  "{config.INVESTIGATION.sentence}"
                </div>
              </div>
            )}

            <button
              onClick={onNext}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-600 via-pink-600 to-purple-600 hover:from-amber-500 hover:to-pink-500 text-white font-mono font-bold text-sm tracking-wider shadow-xl shadow-amber-600/30 transform active:scale-98 transition-all cursor-pointer"
            >
              <span>PROCEED TO EVIDENCE RECOVERY 🎁</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
