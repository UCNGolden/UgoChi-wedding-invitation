/**
 * Romantic Ambient Audio Controller for Chika & Noble-Gold's Wedding
 * Features Web Audio API procedural romantic harp & piano arpeggios
 * + fallback/option for an external audio file.
 */
class WeddingAudioPlayer {
  constructor() {
    this.isPlaying = false;
    this.audioCtx = null;
    this.audioElement = null;
    this.loopTimeout = null;
    this.step = 0;
    this.btn = null;
    this.waveBars = [];
  }

  init() {
    this.btn = document.getElementById("audio-toggle-btn");
    this.waveBars = document.querySelectorAll(".audio-wave-bar");

    if (this.btn) {
      this.btn.addEventListener("click", () => this.toggle());
    }

    // Check if external mp3 exists and can be loaded
    const externalAudio = new Audio();
    externalAudio.src = "assets/audio/wedding-melody.mp3";
    externalAudio.loop = true;
    externalAudio.volume = 0.45;

    externalAudio.addEventListener("canplaythrough", () => {
      this.audioElement = externalAudio;
    });

    externalAudio.addEventListener("error", () => {
      // Use Web Audio API synthesizer
      this.audioElement = null;
    });
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    if (this.audioElement) {
      this.audioElement.play().then(() => {
        this.isPlaying = true;
        this.updateUI(true);
      }).catch(() => {
        this.startProceduralHarp();
      });
    } else {
      this.startProceduralHarp();
    }
  }

  pause() {
    this.isPlaying = false;
    if (this.audioElement) {
      this.audioElement.pause();
    }
    if (this.loopTimeout) {
      clearTimeout(this.loopTimeout);
      this.loopTimeout = null;
    }
    this.updateUI(false);
  }

  startProceduralHarp() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }

    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }

    this.isPlaying = true;
    this.updateUI(true);

    // Chords: Gmaj7 -> Em7 -> Cmaj7 -> Dadd9 (Romantic classical wedding progression)
    // Frequencies (Hz) for harp notes
    const chordProgressions = [
      // Gmaj7: G3, B3, D4, F#4, G4, B4, D5
      [196.00, 246.94, 293.66, 369.99, 392.00, 493.88, 587.33],
      // Em9: E3, G3, B3, D4, F#4, G4, B4
      [164.81, 196.00, 246.94, 293.66, 369.99, 392.00, 493.88],
      // Cmaj9: C3, G3, B3, C4, E4, G4, B4
      [130.81, 196.00, 246.94, 261.63, 329.63, 392.00, 493.88],
      // Dsus2/add9: D3, A3, D4, E4, F#4, A4, D5
      [146.83, 220.00, 293.66, 329.63, 369.99, 440.00, 587.33]
    ];

    let chordIdx = 0;
    let noteIdx = 0;

    const playNextNote = () => {
      if (!this.isPlaying) return;

      const chord = chordProgressions[chordIdx];
      const freq = chord[noteIdx];

      this.pluckHarpString(freq);

      noteIdx++;
      if (noteIdx >= chord.length) {
        noteIdx = 0;
        chordIdx = (chordIdx + 1) % chordProgressions.length;
      }

      // Gentle irregular arpeggio timing for organic live harp sensation
      const delay = (noteIdx === 0) ? 650 : (240 + Math.random() * 40);
      this.loopTimeout = setTimeout(playNextNote, delay);
    };

    playNextNote();
  }

  pluckHarpString(freq) {
    if (!this.audioCtx || this.audioCtx.state !== "running") return;

    const now = this.audioCtx.currentTime;

    // Dual oscillator: Warm Sine + Delicate Triangle for rich acoustic chime
    const osc1 = this.audioCtx.createOscillator();
    const osc2 = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();

    osc1.type = "sine";
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(freq * 1.002, now); // Slight chorus detune for acoustic shimmer

    // Pluck attack & long graceful decay
    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.exponentialRampToValueAtTime(0.09, now + 0.035);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

    // Low-pass filter for soft warm tone
    const filter = this.audioCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(700, now + 1.8);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 2.3);
    osc2.stop(now + 2.3);
  }

  updateUI(playing) {
    if (this.btn) {
      this.btn.setAttribute("aria-label", playing ? "Pause Wedding Music" : "Play Wedding Music");
      this.btn.classList.toggle("is-playing", playing);
    }
    this.waveBars.forEach(bar => {
      bar.classList.toggle("animating", playing);
    });
  }
}

window.weddingAudio = new WeddingAudioPlayer();
document.addEventListener("DOMContentLoaded", () => {
  window.weddingAudio.init();
});
