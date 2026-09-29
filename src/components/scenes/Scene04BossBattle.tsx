import React, { useState } from 'react';
import { Swords, Heart, Flame, Eye, Sparkles, Utensils, Shield, Trophy } from 'lucide-react';
import { StoryConfig } from '../../config/storyConfig';
import { sound } from '../../utils/audioSynthesizer';

interface Scene04Props {
  config: StoryConfig;
  onNext: () => void;
}

export const Scene04BossBattle: React.FC<Scene04Props> = ({ config, onNext }) => {
  const [bossHp, setBossHp] = useState(100);
  const [bossDialogue, setBossDialogue] = useState<string>(
    "Halt! You dare challenge my cuteness? Who loves who more?!"
  );
  const [bossExpression, setBossExpression] = useState<'smug' | 'angry' | 'shocked' | 'defeated'>('smug');
  const [turn, setTurn] = useState<number>(1);
  const [bossDefeated, setBossDefeated] = useState(false);

  const handlePlayerChoice = (choice: 'me' | 'you' | 'snacks' | 'cuddle') => {
    sound.playArcadeHit();

    if (choice === 'me') {
      setBossExpression('angry');
      setBossDialogue('Nice try! 😂 The audacity! My love is at least 10,000x greater!');
      // Boss counters back playfully
    } else if (choice === 'you') {
      setBossExpression('shocked');
      setBossHp((prev) => Math.max(0, prev - 50));
      setBossDialogue('Correct answer! 😳 *Heart melts slightly* ...B-but I am not giving up yet!');
      if (bossHp <= 50) {
        finishBoss();
      } else {
        setTurn(2);
      }
    } else if (choice === 'snacks') {
      setBossExpression('shocked');
      setBossHp((prev) => Math.max(0, prev - 50));
      setBossDialogue('Critical Hit! 🍟 Offered favorite French fries! Defenses lowered by 99%!');
      if (bossHp <= 50) {
        finishBoss();
      } else {
        setTurn(2);
      }
    } else if (choice === 'cuddle') {
      setBossHp(0);
      finishBoss();
    }
  };

  const finishBoss = () => {
    setBossHp(0);
    setBossExpression('defeated');
    setBossDialogue('Okay fine... you win my heart forever. 🥹❤️');
    sound.playVictoryFanfare();
    setTimeout(() => {
      setBossDefeated(true);
    }, 1200);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 z-10">
      <div className="w-full max-w-xl bg-slate-950/90 backdrop-blur-xl border border-pink-500/30 rounded-2xl p-5 sm:p-7 shadow-2xl shadow-pink-950/50 space-y-5">
        {/* Game Title Bar */}
        <div className="flex items-center justify-between border-b border-pink-500/20 pb-3">
          <div className="flex items-center gap-2">
            <Swords className="w-5 h-5 text-pink-400 animate-bounce" />
            <span className="font-mono text-xs text-pink-400 font-bold uppercase tracking-widest">
              RELATIONSHIP BOSS BATTLE
            </span>
          </div>
          <span className="text-[10px] font-mono bg-pink-500/10 text-pink-300 border border-pink-500/30 px-2 py-0.5 rounded-full font-bold">
            STAGE 01 — BOSS FIGHT
          </span>
        </div>

        {/* Character Stats Display */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-[11px] font-mono text-center">
          <div className="flex flex-col items-center">
            <span className="text-rose-400 flex items-center gap-1 font-bold">
              <Heart className="w-3.5 h-3.5 fill-rose-400" /> 100
            </span>
            <span className="text-slate-400 text-[10px]">LOVE</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-amber-400 flex items-center gap-1 font-bold">
              <Flame className="w-3.5 h-3.5" /> 87
            </span>
            <span className="text-slate-400 text-[10px]">DRAMA</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-purple-400 flex items-center gap-1 font-bold">
              <Eye className="w-3.5 h-3.5" /> 42
            </span>
            <span className="text-slate-400 text-[10px]">JEALOUSY</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-yellow-300 flex items-center gap-1 font-bold">
              <Sparkles className="w-3.5 h-3.5" /> 999
            </span>
            <span className="text-slate-400 text-[10px]">CUTENESS</span>
          </div>
          <div className="col-span-2 sm:col-span-1 flex flex-col items-center">
            <span className="text-cyan-400 flex items-center gap-1 font-bold">
              <Utensils className="w-3.5 h-3.5" /> 100
            </span>
            <span className="text-slate-400 text-[10px]">FOOD STEAL</span>
          </div>
        </div>

        {/* Boss Visual & HP Bar */}
        <div className="bg-gradient-to-b from-purple-950/40 to-slate-950 p-6 rounded-2xl border border-purple-500/20 text-center space-y-4">
          {/* Boss HP */}
          <div className="space-y-1 max-w-sm mx-auto">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-purple-300 font-bold">{config.NAME} (BOSS)</span>
              <span className="text-pink-400 font-bold">HP: {bossHp}/100</span>
            </div>
            <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-500 rounded-full"
                style={{ width: `${bossHp}%` }}
              />
            </div>
          </div>

          {/* Cute Animated Boss Avatar */}
          <div className="relative inline-block py-2">
            <div className="w-28 h-28 mx-auto rounded-3xl bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 p-1 shadow-xl shadow-pink-500/30 transform hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[22px] flex flex-col items-center justify-center p-2">
                <span className="text-4xl animate-pulse">
                  {bossExpression === 'smug' && '👑'}
                  {bossExpression === 'angry' && '😤'}
                  {bossExpression === 'shocked' && '😳'}
                  {bossExpression === 'defeated' && '🥰'}
                </span>
                <span className="text-[10px] font-mono text-pink-300 mt-1 font-bold">
                  {config.NAME}
                </span>
              </div>
            </div>
            <div className="absolute -top-1 -right-2 bg-yellow-400 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded-full shadow">
              LV.99
            </div>
          </div>

          {/* Boss Speech Bubble */}
          <div className="p-3 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-pink-200 font-mono shadow-inner max-w-md mx-auto">
            "{bossDialogue}"
          </div>
        </div>

        {/* Player Action Buttons */}
        {!bossDefeated ? (
          <div className="space-y-2">
            <p className="text-xs font-mono text-slate-400 text-center uppercase tracking-wider">
              Choose Your Action:
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handlePlayerChoice('me')}
                className="py-3 px-4 rounded-xl bg-slate-900 border border-slate-700 hover:border-pink-500 text-white font-mono text-xs font-semibold hover:bg-pink-950/30 transition-all active:scale-95 cursor-pointer"
              >
                Attack: "ME ❤️"
              </button>

              <button
                onClick={() => handlePlayerChoice('you')}
                className="py-3 px-4 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-mono text-xs font-bold shadow-lg shadow-pink-600/30 transition-all active:scale-95 cursor-pointer"
              >
                Truth: "YOU ❤️"
              </button>

              <button
                onClick={() => handlePlayerChoice('snacks')}
                className="py-3 px-4 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-500 text-white font-mono text-xs font-semibold hover:bg-amber-950/30 transition-all active:scale-95 cursor-pointer"
              >
                Item: 🍟 French Fries
              </button>

              <button
                onClick={() => handlePlayerChoice('cuddle')}
                className="py-3 px-4 rounded-xl bg-slate-900 border border-slate-700 hover:border-purple-500 text-white font-mono text-xs font-semibold hover:bg-purple-950/30 transition-all active:scale-95 cursor-pointer"
              >
                Special: 🫂 Warm Hug
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4 pt-2 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span>VICTORY! BOSS PACIFIED WITH LOVE</span>
            </div>

            <p className="text-xs text-slate-300">
              The boss dropped a mysterious crime scene report...
            </p>

            <button
              onClick={onNext}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-mono font-bold text-sm tracking-wider shadow-xl shadow-emerald-600/30 transform active:scale-98 transition-all cursor-pointer"
            >
              <span>INSPECT THE CRIME SCENE 🚨</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
