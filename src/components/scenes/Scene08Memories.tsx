import React, { useState } from 'react';
import { Sparkles, Heart, ChevronRight, X, Calendar } from 'lucide-react';
import { StoryConfig, MemoryPhoto } from '../../config/storyConfig';
import { sound } from '../../utils/audioSynthesizer';

interface Scene08Props {
  config: StoryConfig;
  onNext: () => void;
}

export const Scene08Memories: React.FC<Scene08Props> = ({ config, onNext }) => {
  const [activePhoto, setActivePhoto] = useState<MemoryPhoto | null>(null);
  const [viewedCount, setViewedCount] = useState<number>(0);

  const handleOpenPhoto = (photo: MemoryPhoto) => {
    sound.playPianoNote(659.25, 2.5, 0.2);
    setActivePhoto(photo);
    setViewedCount((prev) => Math.max(prev, photo.id));
  };

  const handleClosePhoto = () => {
    setActivePhoto(null);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between p-6 z-10 select-none">
      {/* Garden Header */}
      <div className="max-w-md mx-auto text-center space-y-1.5 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/60 border border-amber-400/30 text-amber-300 font-mono text-[11px] backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>FLOATING CONSTELLATION OF MEMORIES</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-romantic text-white text-glow-gold">
          Moments Etched in Time
        </h2>
        <p className="text-xs text-slate-300 font-sans">
          Tap each floating polaroid in the garden to bring it into focus.
        </p>
      </div>

      {/* Floating 3D Polaroid Array */}
      <div className="relative w-full max-w-4xl mx-auto my-auto min-h-[380px] sm:min-h-[440px] flex items-center justify-center">
        {config.PHOTOS.map((photo, index) => {
          // Calculate floating spatial offsets
          const positions = [
            'top-2 left-4 sm:left-12 rotate-[-4deg]',
            'top-6 right-4 sm:right-16 rotate-[5deg]',
            'bottom-8 left-8 sm:left-24 rotate-[3deg]',
            'bottom-4 right-6 sm:right-20 rotate-[-6deg]',
          ];
          const posClass = positions[index % positions.length];

          return (
            <div
              key={photo.id}
              onClick={() => handleOpenPhoto(photo)}
              className={`absolute ${posClass} cursor-pointer transform hover:scale-110 hover:z-30 hover:rotate-0 transition-all duration-500 ease-out`}
            >
              {/* Polaroid Frame */}
              <div className="w-44 sm:w-56 p-3 bg-white/95 text-slate-900 rounded-lg shadow-2xl shadow-black/80 border border-amber-100/60 backdrop-blur-sm group">
                <div className="relative aspect-4/3 w-full overflow-hidden rounded bg-slate-950 mb-2">
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="px-1 text-center">
                  <p className="font-romantic text-xs sm:text-sm font-bold text-slate-800 tracking-wide line-clamp-1">
                    "{photo.caption}"
                  </p>
                  {photo.date && (
                    <span className="text-[10px] font-mono text-slate-500 block mt-0.5">
                      {photo.date}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Photo Modal Zoom */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn"
          onClick={handleClosePhoto}
        >
          <div
            className="relative max-w-lg w-full bg-slate-950/95 border border-amber-400/40 rounded-2xl p-5 shadow-2xl shadow-amber-950/50 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClosePhoto}
              className="absolute top-3 right-3 text-slate-400 hover:text-white p-1 rounded-full bg-slate-900 border border-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden border border-slate-800 shadow-inner">
              <img
                src={activePhoto.url}
                alt={activePhoto.caption}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-1.5 text-center">
              {activePhoto.date && (
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{activePhoto.date}</span>
                </div>
              )}
              <h3 className="text-xl font-romantic font-bold text-white">
                {activePhoto.caption}
              </h3>
              {activePhoto.note && (
                <p className="text-xs sm:text-sm text-slate-300 font-sans italic leading-relaxed pt-1">
                  "{activePhoto.note}"
                </p>
              )}
            </div>

            <button
              onClick={handleClosePhoto}
              className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400 text-xs font-mono text-slate-300 hover:text-white transition-colors"
            >
              Back to Garden
            </button>
          </div>
        </div>
      )}

      {/* Bottom Button to proceed to Cake */}
      <div className="max-w-md mx-auto w-full text-center pb-4">
        <button
          onClick={onNext}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-pink-600 hover:from-amber-400 hover:to-pink-500 text-white font-mono font-bold text-xs sm:text-sm tracking-wider shadow-xl shadow-amber-500/25 transform active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Heart className="w-4 h-4 fill-white" />
          <span>BEFORE ANYTHING ELSE... 🎂</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
