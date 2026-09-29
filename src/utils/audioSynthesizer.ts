/**
 * Web Audio API procedural sound engine.
 * Generates glitch sounds, retro beeps, funny buzzers, dramatic stingers,
 * realistic heartbeat, candle extinguishing swoosh, fireworks bursts,
 * and a rich, emotional cinematic piano & ambient strings synthesizer.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private ambientInterval: number | null = null;
  private isMusicPlaying: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
      this.musicGain.connect(this.masterGain);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(muted ? 0 : 0.8, this.ctx.currentTime, 0.05);
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public setVolume(vol: number) {
    if (this.masterGain && this.ctx) {
      const clamped = Math.max(0, Math.min(1, vol));
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : clamped, this.ctx.currentTime, 0.05);
    }
  }

  // Glitch effect sound
  public playGlitch() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.setValueAtTime(600, now + 0.04);
    osc.frequency.setValueAtTime(80, now + 0.08);
    osc.frequency.setValueAtTime(950, now + 0.12);
    osc.frequency.setValueAtTime(220, now + 0.18);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, now);
    filter.Q.setValueAtTime(4, now);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.28);
  }

  // Futuristic digital computer beep
  public playDigitalBeep(freq = 880, duration = 0.08) {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + duration);
  }

  // Correct answer chime
  public playCorrectChime() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime + idx * 0.07;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.35);
    });
  }

  // Funny incorrect buzzer / boing
  public playWrongBuzzer() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(70, now + 0.3);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.32);
  }

  // Funny gift box open boing
  public playFunnyBoing() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(650, now + 0.15);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.35);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.35);
  }

  // Deep Heartbeat THUMP
  public playHeartbeat() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const playThump = (timeOffset: number, freq: number, vol: number) => {
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime + timeOffset;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.2);

      gain.gain.setValueAtTime(vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.22);
    };

    playThump(0, 65, 0.6);
    playThump(0.18, 55, 0.45);
  }

  // Candle blowing whoosh
  public playBlowCandles() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.6;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(200, now + 0.6);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    noise.start(now);
    noise.stop(now + 0.6);
  }

  // Fireworks whistle and burst
  public playFirework() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    // Whistle
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.25);
    oscGain.gain.setValueAtTime(0.2, now);
    oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
    osc.connect(oscGain);
    oscGain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.25);

    // Burst
    const bufferSize = this.ctx.sampleRate * 0.5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.15));
    }
    const burst = this.ctx.createBufferSource();
    burst.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, now + 0.25);
    filter.frequency.exponentialRampToValueAtTime(300, now + 0.7);

    const burstGain = this.ctx.createGain();
    burstGain.gain.setValueAtTime(0.6, now + 0.25);
    burstGain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

    burst.connect(filter);
    filter.connect(burstGain);
    burstGain.connect(this.sfxGain);

    burst.start(now + 0.25);
    burst.stop(now + 0.75);
  }

  // Boss attack sound (arcade punch)
  public playArcadeHit() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(90, now + 0.15);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.18);
  }

  // Boss defeat victory fanfare
  public playVictoryFanfare() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const chords = [
      [523.25, 659.25], // C, E
      [587.33, 739.99], // D, F#
      [659.25, 830.61], // E, G#
      [783.99, 1046.5], // G, C6
    ];

    chords.forEach((chord, i) => {
      const time = this.ctx!.currentTime + i * 0.12;
      chord.forEach(freq => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, time);
        gain.gain.setValueAtTime(0.2, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.3);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(time);
        osc.stop(time + 0.3);
      });
    });
  }

  // Detective suspense sting
  public playDetectiveSting() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'sine';

    osc1.frequency.setValueAtTime(110, now); // A2
    osc2.frequency.setValueAtTime(116.54, now); // Bb2 (tense tritone/minor 2nd friction)

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.sfxGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 1.2);
    osc2.stop(now + 1.2);
  }

  // Soft romantic piano note generator
  public playPianoNote(freq: number, duration = 2.0, velocity = 0.25) {
    this.initContext();
    if (!this.ctx || !this.musicGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const oscHarmonic = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    oscHarmonic.type = 'triangle';
    oscHarmonic.frequency.setValueAtTime(freq * 2, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1600, now);
    filter.frequency.exponentialRampToValueAtTime(300, now + duration);

    gain.gain.setValueAtTime(velocity, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    oscHarmonic.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicGain);

    osc.start(now);
    oscHarmonic.start(now);
    osc.stop(now + duration);
    oscHarmonic.stop(now + duration);
  }

  /**
   * Start Emotional Piano & Strings Background Ambient Loop
   * Cycles through romantic, cinematic chords (D - A/C# - Bm - G / F#m - Em - Asus4 - A)
   */
  public startRomanticMusic(intensity: 'gentle' | 'climax' = 'gentle') {
    this.initContext();
    if (this.isMusicPlaying) {
      if (intensity === 'climax') {
        this.boostClimax();
      }
      return;
    }
    this.isMusicPlaying = true;

    // Romantic chord progression in D major (very cinematic & emotional)
    const chordProgression = [
      // Dmaj9
      [146.83, 220.00, 293.66, 369.99, 440.00], 
      // F#m7
      [185.00, 220.00, 277.18, 369.99, 440.00],
      // Gmaj7
      [196.00, 246.94, 293.66, 369.99, 493.88],
      // A add9
      [220.00, 277.18, 329.63, 440.00, 554.37],
      // Bm9
      [123.47, 185.00, 246.94, 369.99, 440.00],
      // Gmaj9
      [196.00, 246.94, 293.66, 440.00, 587.33],
      // Asus4 -> A
      [220.00, 293.66, 329.63, 440.00, 554.37],
    ];

    let chordIndex = 0;
    const playNextChord = () => {
      if (!this.isMusicPlaying) return;
      const chord = chordProgression[chordIndex % chordProgression.length];
      chordIndex++;

      // Arpeggiate notes of the chord gently like a grand piano
      chord.forEach((note, nIdx) => {
        window.setTimeout(() => {
          if (this.isMusicPlaying) {
            this.playPianoNote(note, 3.5, 0.18 + (nIdx === 0 ? 0.08 : 0));
          }
        }, nIdx * 240);
      });

      // Warm string pad drone
      this.playStringsPad(chord[0] * 0.5, 4.2);
    };

    playNextChord();
    this.ambientInterval = window.setInterval(playNextChord, 4200);
  }

  private playStringsPad(bassFreq: number, duration: number) {
    if (!this.ctx || !this.musicGain || this.isMuted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(bassFreq, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 1.2);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicGain);

    osc.start(now);
    osc.stop(now + duration);
  }

  public boostClimax() {
    if (!this.ctx || !this.musicGain) return;
    this.musicGain.gain.setTargetAtTime(0.75, this.ctx.currentTime, 0.5);
    // Play celebratory sparkling flourish
    const flourish = [587.33, 739.99, 880.00, 1174.66, 1479.98];
    flourish.forEach((f, idx) => {
      window.setTimeout(() => {
        this.playPianoNote(f, 2.5, 0.28);
      }, idx * 120);
    });
  }

  public stopRomanticMusic() {
    this.isMusicPlaying = false;
    if (this.ambientInterval) {
      window.clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
  }
}

export const sound = new SoundEngine();
