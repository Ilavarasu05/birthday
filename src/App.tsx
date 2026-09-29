/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DEFAULT_STORY_CONFIG, StoryConfig } from './config/storyConfig';
import { ThreeCanvas } from './components/ThreeCanvas';
import { AudioControls } from './components/AudioControls';
import { ConfigModal } from './components/ConfigModal';
import { SceneNavigator } from './components/SceneNavigator';

// Scenes
import { Scene01Hacked } from './components/scenes/Scene01Hacked';
import { Scene02Mission } from './components/scenes/Scene02Mission';
import { Scene03Quiz } from './components/scenes/Scene03Quiz';
import { Scene04BossBattle } from './components/scenes/Scene04BossBattle';
import { Scene05Investigation } from './components/scenes/Scene05Investigation';
import { Scene06WrongGifts } from './components/scenes/Scene06WrongGifts';
import { Scene07TheMoodChanges } from './components/scenes/Scene07TheMoodChanges';
import { Scene08Memories } from './components/scenes/Scene08Memories';
import { Scene09BirthdayCake } from './components/scenes/Scene09BirthdayCake';
import { Scene10SecretDoor } from './components/scenes/Scene10SecretDoor';
import { Scene11Proposal } from './components/scenes/Scene11Proposal';
import { Scene13Celebration } from './components/scenes/Scene13Celebration';
import { Scene14FinalReport } from './components/scenes/Scene14FinalReport';
import { Scene15Ending } from './components/scenes/Scene15Ending';

export default function App() {
  const [config, setConfig] = useState<StoryConfig>(DEFAULT_STORY_CONFIG);
  const [currentScene, setCurrentScene] = useState<number>(1);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState<boolean>(false);

  // Scene-specific interactive states for 3D synchronization
  const [boxOpenCount, setBoxOpenCount] = useState<number>(0);
  const [candlesBlown, setCandlesBlown] = useState<boolean>(false);
  const [doorOpened, setDoorOpened] = useState<boolean>(false);
  const [ringRevealed, setRingRevealed] = useState<boolean>(false);
  const [isYesCelebration, setIsYesCelebration] = useState<boolean>(false);

  // Jump or advance scenes
  const goToNextScene = () => {
    setCurrentScene((prev) => Math.min(15, prev + 1));
  };

  const handleRestart = () => {
    setBoxOpenCount(0);
    setCandlesBlown(false);
    setDoorOpened(false);
    setRingRevealed(false);
    setIsYesCelebration(false);
    setCurrentScene(1);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#030308] text-slate-100 overflow-x-hidden selection:bg-pink-500/30 selection:text-pink-200">
      {/* 3D WebGL Canvas Layer */}
      <ThreeCanvas
        currentScene={currentScene}
        config={config}
        boxOpenCount={boxOpenCount}
        candlesBlown={candlesBlown}
        doorOpened={doorOpened}
        ringRevealed={ringRevealed}
        isYesCelebration={isYesCelebration}
        onBoxClick={() => setBoxOpenCount((c) => c + 1)}
        onCandleClick={() => setCandlesBlown(true)}
        onDoorClick={() => setDoorOpened(true)}
      />

      {/* Chapter Quick Jumper */}
      <SceneNavigator
        currentScene={currentScene}
        onSelectScene={(sceneNum) => {
          if (sceneNum === 9) setCandlesBlown(false);
          if (sceneNum === 10) setDoorOpened(false);
          if (sceneNum === 11) setRingRevealed(true);
          if (sceneNum === 13) setIsYesCelebration(true);
          setCurrentScene(sceneNum);
        }}
      />

      {/* Floating Audio & Customization Controls */}
      <AudioControls onOpenConfig={() => setIsConfigModalOpen(true)} />

      {/* Subtle Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-40 h-1 bg-slate-900/60">
        <div
          className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 transition-all duration-700"
          style={{ width: `${(currentScene / 15) * 100}%` }}
        />
      </div>

      {/* Main Dynamic Story Scenes */}
      <main className="relative z-10 w-full min-h-screen">
        {currentScene === 1 && (
          <Scene01Hacked config={config} onNext={goToNextScene} />
        )}

        {currentScene === 2 && (
          <Scene02Mission config={config} onNext={goToNextScene} />
        )}

        {currentScene === 3 && (
          <Scene03Quiz config={config} onNext={goToNextScene} />
        )}

        {currentScene === 4 && (
          <Scene04BossBattle config={config} onNext={goToNextScene} />
        )}

        {currentScene === 5 && (
          <Scene05Investigation config={config} onNext={goToNextScene} />
        )}

        {currentScene === 6 && (
          <Scene06WrongGifts
            config={config}
            boxOpenCount={boxOpenCount}
            onBoxClick={() => setBoxOpenCount((c) => c + 1)}
            onNext={goToNextScene}
          />
        )}

        {currentScene === 7 && (
          <Scene07TheMoodChanges config={config} onNext={goToNextScene} />
        )}

        {currentScene === 8 && (
          <Scene08Memories config={config} onNext={goToNextScene} />
        )}

        {currentScene === 9 && (
          <Scene09BirthdayCake
            config={config}
            candlesBlown={candlesBlown}
            onBlowCandles={() => setCandlesBlown(true)}
            onNext={goToNextScene}
          />
        )}

        {currentScene === 10 && (
          <Scene10SecretDoor
            config={config}
            doorOpened={doorOpened}
            onOpenDoor={() => setDoorOpened(true)}
            onNext={goToNextScene}
          />
        )}

        {(currentScene === 11 || currentScene === 12) && (
          <Scene11Proposal
            config={config}
            ringRevealed={ringRevealed}
            onRevealRing={() => setRingRevealed(true)}
            onAcceptProposal={() => {
              setIsYesCelebration(true);
              setCurrentScene(13);
            }}
          />
        )}

        {currentScene === 13 && (
          <Scene13Celebration config={config} onNext={goToNextScene} />
        )}

        {currentScene === 14 && (
          <Scene14FinalReport config={config} onNext={goToNextScene} />
        )}

        {currentScene === 15 && (
          <Scene15Ending
            config={config}
            onRestart={handleRestart}
            onOpenConfig={() => setIsConfigModalOpen(true)}
          />
        )}
      </main>

      {/* Configuration Customization Modal */}
      <ConfigModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        config={config}
        onSave={(updated) => setConfig(updated)}
      />
    </div>
  );
}
