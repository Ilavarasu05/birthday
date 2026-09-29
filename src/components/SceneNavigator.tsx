import React, { useState } from 'react';
import { Layers, ChevronDown } from 'lucide-react';

interface SceneNavigatorProps {
  currentScene: number;
  onSelectScene: (scene: number) => void;
}

const SCENE_NAMES = [
  { id: 1, name: '01 • Birthday Hack' },
  { id: 2, name: '02 • Secret Mission' },
  { id: 3, name: '03 • Funny Quiz' },
  { id: 4, name: '04 • Boss Battle' },
  { id: 5, name: '05 • Police Unit' },
  { id: 6, name: '06 • Wrong Gifts' },
  { id: 7, name: '07 • The Mood Changes' },
  { id: 8, name: '08 • Floating Memories' },
  { id: 9, name: '09 • 3D Birthday Cake' },
  { id: 10, name: '10 • Golden Door' },
  { id: 11, name: '11 • The Proposal' },
  { id: 13, name: '13 • Celebration' },
  { id: 14, name: '14 • Final Report' },
  { id: 15, name: '15 • Sunrise Ending' },
];

export const SceneNavigator: React.FC<SceneNavigatorProps> = ({
  currentScene,
  onSelectScene,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-4 left-4 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-slate-300 hover:text-white hover:border-purple-500/50 transition-all text-xs font-mono shadow-lg active:scale-95"
          title="Jump to any scene"
        >
          <Layers className="w-3.5 h-3.5 text-purple-400" />
          <span className="hidden sm:inline">
            Scene {currentScene <= 9 ? `0${currentScene}` : currentScene}
          </span>
          <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-52 bg-slate-950/95 border border-slate-700 rounded-xl shadow-2xl p-1.5 backdrop-blur-xl animate-fadeIn max-h-80 overflow-y-auto">
            <div className="px-2 py-1 text-[10px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-800">
              Jump To Chapter:
            </div>
            {SCENE_NAMES.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  onSelectScene(s.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center justify-between ${
                  currentScene === s.id
                    ? 'bg-purple-600/40 text-purple-200 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <span>{s.name}</span>
                {currentScene === s.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
