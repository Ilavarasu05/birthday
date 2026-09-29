import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Settings } from 'lucide-react';
import { sound } from '../utils/audioSynthesizer';

interface AudioControlsProps {
  onOpenConfig?: () => void;
}

export const AudioControls: React.FC<AudioControlsProps> = ({ onOpenConfig }) => {
  const [isMuted, setIsMuted] = useState(sound.getIsMuted());
  const [volume, setVolume] = useState(0.8);
  const [showSlider, setShowSlider] = useState(false);

  const toggleMute = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    sound.setMuted(nextState);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    sound.setVolume(val);
    if (isMuted && val > 0) {
      setIsMuted(false);
      sound.setMuted(false);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      {onOpenConfig && (
        <button
          onClick={onOpenConfig}
          className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-slate-300 hover:text-white hover:border-pink-500/50 transition-all text-xs font-mono shadow-lg hover:shadow-pink-500/20 active:scale-95"
          title="Customize Names, Dates & Photos"
        >
          <Settings className="w-3.5 h-3.5 text-pink-400 animate-spin-slow" />
          <span className="hidden sm:inline">Customize</span>
        </button>
      )}

      <div
        className="relative flex items-center bg-slate-900/80 backdrop-blur-md border border-slate-700/60 rounded-full px-3 py-2 shadow-lg"
        onMouseEnter={() => setShowSlider(true)}
        onMouseLeave={() => setShowSlider(false)}
      >
        <button
          onClick={toggleMute}
          className="text-slate-300 hover:text-white transition-colors focus:outline-none flex items-center gap-1.5"
          aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-red-400" />
          ) : (
            <Volume2 className="w-4 h-4 text-pink-400" />
          )}
          <Music className="w-3.5 h-3.5 text-amber-400/80 animate-pulse" />
        </button>

        {showSlider && (
          <div className="ml-2 flex items-center transition-all animate-fadeIn">
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
            />
          </div>
        )}
      </div>
    </div>
  );
};
