import React, { useState } from 'react';
import { X, Save, RefreshCw, Sparkles, Heart } from 'lucide-react';
import { StoryConfig, DEFAULT_STORY_CONFIG } from '../config/storyConfig';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: StoryConfig;
  onSave: (newConfig: StoryConfig) => void;
}

export const ConfigModal: React.FC<ConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
}) => {
  const [formData, setFormData] = useState<StoryConfig>({ ...config });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleReset = () => {
    setFormData({ ...DEFAULT_STORY_CONFIG });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-slate-900 border border-pink-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-pink-400" />
            <h2 className="text-lg font-semibold text-white tracking-wide">
              Customize Surprise Experience
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="bg-pink-500/10 border border-pink-500/20 rounded-xl p-3 text-xs text-pink-300 flex items-center gap-2">
            <Heart className="w-4 h-4 text-pink-400 shrink-0" />
            <span>
              All fields update the interactive story, quiz, investigation dossier, 3D cake, and proposal in real-time!
            </span>
          </div>

          {/* Primary Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Her / His Name (Birthday Star)
              </label>
              <input
                type="text"
                value={formData.NAME}
                onChange={(e) => setFormData({ ...formData, NAME: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-pink-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={formData.YOUR_NAME}
                onChange={(e) => setFormData({ ...formData, YOUR_NAME: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-pink-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Age
              </label>
              <input
                type="text"
                value={formData.AGE}
                onChange={(e) => setFormData({ ...formData, AGE: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-pink-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Birthday Date
              </label>
              <input
                type="text"
                value={formData.BIRTHDAY_DATE}
                onChange={(e) => setFormData({ ...formData, BIRTHDAY_DATE: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-pink-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Proposal Messages */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider font-mono">
              Proposal Scene Text
            </h3>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Lead-in Line
              </label>
              <input
                type="text"
                value={formData.PROPOSAL_MESSAGE.leadIn}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    PROPOSAL_MESSAGE: { ...formData.PROPOSAL_MESSAGE, leadIn: e.target.value },
                  })
                }
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-pink-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Secondary Line
              </label>
              <input
                type="text"
                value={formData.PROPOSAL_MESSAGE.middle}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    PROPOSAL_MESSAGE: { ...formData.PROPOSAL_MESSAGE, middle: e.target.value },
                  })
                }
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-pink-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Photos Configuration */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-pink-400 uppercase tracking-wider font-mono">
              Floating Memory Photos & Captions
            </h3>
            {formData.PHOTOS.map((photo, index) => (
              <div key={photo.id} className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Photo #{index + 1}</span>
                  <span>{photo.caption}</span>
                </div>
                <input
                  type="text"
                  placeholder="Image URL"
                  value={photo.url}
                  onChange={(e) => {
                    const newPhotos = [...formData.PHOTOS];
                    newPhotos[index] = { ...newPhotos[index], url: e.target.value };
                    setFormData({ ...formData, PHOTOS: newPhotos });
                  }}
                  className="w-full bg-slate-900 border border-slate-700 rounded-md px-2.5 py-1.5 text-xs text-white focus:border-pink-500 focus:outline-none"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Caption"
                    value={photo.caption}
                    onChange={(e) => {
                      const newPhotos = [...formData.PHOTOS];
                      newPhotos[index] = { ...newPhotos[index], caption: e.target.value };
                      setFormData({ ...formData, PHOTOS: newPhotos });
                    }}
                    className="w-full bg-slate-900 border border-slate-700 rounded-md px-2.5 py-1.5 text-xs text-white focus:border-pink-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Date / Mood"
                    value={photo.date || ''}
                    onChange={(e) => {
                      const newPhotos = [...formData.PHOTOS];
                      newPhotos[index] = { ...newPhotos[index], date: e.target.value };
                      setFormData({ ...formData, PHOTOS: newPhotos });
                    }}
                    className="w-full bg-slate-900 border border-slate-700 rounded-md px-2.5 py-1.5 text-xs text-white focus:border-pink-500 focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-mono transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Defaults
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-xs font-semibold shadow-lg shadow-pink-500/25 transition-all"
              >
                <Save className="w-3.5 h-3.5" />
                Apply Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
