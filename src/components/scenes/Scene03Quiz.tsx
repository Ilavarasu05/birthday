import React, { useState } from 'react';
import { HelpCircle, Sparkles, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { StoryConfig } from '../../config/storyConfig';
import { sound } from '../../utils/audioSynthesizer';

interface Scene03Props {
  config: StoryConfig;
  onNext: () => void;
}

export const Scene03Quiz: React.FC<Scene03Props> = ({ config, onNext }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{
    type: 'correct' | 'incorrect';
    title: string;
    sub: string;
  } | null>(null);
  const [shake, setShake] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const question = config.QUIZ_QUESTIONS[currentIdx];

  const handleSelect = (idx: number) => {
    if (selectedOption !== null) return; // Prevent multiple clicks
    setSelectedOption(idx);
    const option = question.options[idx];

    if (option.isCorrect) {
      sound.playCorrectChime();
      setFeedback({
        type: 'correct',
        title: 'Okayyy... you actually know me. 👀❤️',
        sub: option.funnyReaction || question.explanation,
      });
    } else {
      sound.playWrongBuzzer();
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setFeedback({
        type: 'incorrect',
        title: 'INCORRECT 😂',
        sub: option.funnyReaction || 'How do you not know this? Did you forget who you are dealing with?',
      });
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setFeedback(null);
    if (currentIdx + 1 < config.QUIZ_QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      sound.playVictoryFanfare();
      setIsCompleted(true);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 z-10">
      <div
        className={`w-full max-w-xl bg-slate-950/90 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-purple-950/50 space-y-6 ${
          shake ? 'glitch-anim' : ''
        }`}
      >
        {!isCompleted ? (
          <>
            {/* Header with progress */}
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-purple-400" />
                <span className="font-mono text-xs text-purple-400 uppercase tracking-widest font-semibold">
                  SURVIVAL QUIZ • QUESTION {currentIdx + 1}/{config.QUIZ_QUESTIONS.length}
                </span>
              </div>
              <div className="flex gap-1.5">
                {config.QUIZ_QUESTIONS.map((_, i) => (
                  <span
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i < currentIdx
                        ? 'bg-emerald-400'
                        : i === currentIdx
                        ? 'bg-purple-400 animate-pulse'
                        : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Question Text */}
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                {question.question}
              </h2>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {question.options.map((opt, idx) => {
                let borderStyle = 'border-slate-800 hover:border-purple-500/50 hover:bg-purple-950/20';
                if (selectedOption !== null) {
                  if (idx === selectedOption) {
                    borderStyle = opt.isCorrect
                      ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200'
                      : 'border-rose-500 bg-rose-950/40 text-rose-200';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    disabled={selectedOption !== null}
                    className={`w-full text-left p-4 rounded-xl border bg-slate-900/60 transition-all flex items-center justify-between group cursor-pointer ${borderStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 font-mono text-xs flex items-center justify-center font-bold group-hover:bg-purple-500 group-hover:text-white transition-colors">
                        {opt.label}
                      </span>
                      <span className="text-sm font-medium text-slate-100">{opt.text}</span>
                    </div>

                    {selectedOption === idx && (
                      <div>
                        {opt.isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-rose-400" />
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Reaction Feedback box */}
            {feedback && (
              <div
                className={`p-4 rounded-xl border space-y-1.5 animate-fadeIn ${
                  feedback.type === 'correct'
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                    : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
                }`}
              >
                <div className="font-bold text-sm">{feedback.title}</div>
                <div className="text-xs opacity-90">{feedback.sub}</div>

                <div className="pt-2">
                  <button
                    onClick={handleNextQuestion}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-semibold ml-auto transition-colors cursor-pointer"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Compatibility Score Reveal */
          <div className="text-center space-y-6 py-4 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-950/50 border border-pink-500/30 text-pink-400 font-mono text-xs">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span>OFFICIAL COMPATIBILITY RESULTS</span>
            </div>

            <div className="space-y-1">
              <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">
                Calculated Algorithm:
              </p>
              <div className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-amber-300 font-mono tracking-tight">
                {config.COMPATIBILITY_SCORE}
              </div>
            </div>

            <div className="p-4 bg-purple-950/30 border border-purple-500/30 rounded-xl max-w-md mx-auto">
              <p className="text-sm font-medium text-purple-200">
                "{config.COMPATIBILITY_NOTE}"
              </p>
            </div>

            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              However, high compatibility triggers an inevitable encounter with the local boss monster...
            </p>

            <button
              onClick={onNext}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white font-mono font-bold text-sm tracking-wider shadow-xl shadow-purple-600/30 transform active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>ENTER BOSS BATTLE ⚔️</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
