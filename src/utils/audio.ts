// Web Audio API Synthesizer for tactile arcade sounds and ambient bio-soundscapes

class SoundscapeEngine {
  private ctx: AudioContext | null = null;
  private ambientGainNodes: { [key: string]: GainNode } = {};
  private ambientSourceNodes: { [key: string]: AudioNode } = {};
  private isSoundEnabled = true;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  setSoundEnabled(enabled: boolean) {
    this.isSoundEnabled = enabled;
  }

  getSoundEnabled() {
    return this.isSoundEnabled;
  }

  playChime(type: 'success' | 'combo' | 'error' | 'click' | 'water') {
    if (!this.isSoundEnabled) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'success') {
      // Pleasant bright marimba chime
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'combo') {
      // High energetic synth double-beep
      osc.type = 'sine';
      osc.frequency.setValueAtTime(659.25, now); // E5
      osc.frequency.setValueAtTime(987.77, now + 0.08); // B5
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.26);
    } else if (type === 'error') {
      // Soft low buzzer
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(146.83, now); // D3
      osc.frequency.linearRampToValueAtTime(110, now + 0.15); // A2
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === 'water') {
      // Gentle water drop droplet sound
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.15);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.22);
    } else {
      // Click
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.06);
    }
  }

  // Ambient sound synthesizer generators
  setAmbientTrack(track: 'desert' | 'rain' | 'birds' | 'whiteNoise', active: boolean, volume = 0.5) {
    const ctx = this.initCtx();
    if (!ctx) return;

    if (!active) {
      if (this.ambientGainNodes[track]) {
        this.ambientGainNodes[track].gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
      }
      return;
    }

    if (!this.ambientSourceNodes[track]) {
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, ctx.currentTime);

      if (track === 'desert') {
        // Low pass filter to create a warm soothing desert wind sound
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, ctx.currentTime);
        whiteNoise.connect(filter);
        filter.connect(gain);
      } else if (track === 'rain') {
        // Bandpass filter for gentle rain trickle
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(850, ctx.currentTime);
        filter.Q.setValueAtTime(1.2, ctx.currentTime);
        whiteNoise.connect(filter);
        filter.connect(gain);
      } else if (track === 'whiteNoise') {
        // Softened high frequency white noise
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, ctx.currentTime);
        whiteNoise.connect(filter);
        filter.connect(gain);
      } else if (track === 'birds') {
        // Bird tweet periodic oscillator
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(2400, ctx.currentTime);
        osc.connect(gain);
        osc.start();
        this.ambientSourceNodes[track] = osc;
        this.ambientGainNodes[track] = gain;
        gain.connect(ctx.destination);
        gain.gain.linearRampToValueAtTime(volume * 0.15, ctx.currentTime + 0.5);
        return;
      }

      gain.connect(ctx.destination);
      whiteNoise.start();

      this.ambientSourceNodes[track] = whiteNoise;
      this.ambientGainNodes[track] = gain;
    }

    const gainNode = this.ambientGainNodes[track];
    if (gainNode) {
      const targetGain = Math.max(0.01, volume * 0.2);
      gainNode.gain.linearRampToValueAtTime(targetGain, ctx.currentTime + 0.5);
    }
  }

  updateAmbientVolume(track: 'desert' | 'rain' | 'birds' | 'whiteNoise', volume: number) {
    if (this.ambientGainNodes[track] && this.ctx) {
      const target = Math.max(0.001, (volume / 100) * 0.2);
      this.ambientGainNodes[track].gain.linearRampToValueAtTime(target, this.ctx.currentTime + 0.1);
    }
  }
}

export const soundscape = new SoundscapeEngine();
