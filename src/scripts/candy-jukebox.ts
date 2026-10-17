/**
 * Candy Jukebox — ONCE Interactive Web Audio Synthesizer Player
 * Provee reproducción sintetizada en tiempo real de motivos melódicos de TWICE
 * sin dependencias externas, con visualizador espectral en canvas.
 */

interface TrackNote {
  freq: number;
  dur: number;
}

interface Track {
  id: string;
  title: string;
  era: string;
  bpm: number;
  notes: TrackNote[];
}

// Frecuencias de notas musicales (Hz)
const N = {
  Bb3: 233.08,
  C4: 261.63,
  Db4: 277.18,
  D4: 293.66,
  Eb4: 311.13,
  E4: 329.63,
  F4: 349.23,
  Gb4: 369.99,
  G4: 392.0,
  Ab4: 415.3,
  A4: 440.0,
  Bb4: 466.16,
  B4: 493.88,
  C5: 523.25,
  Db5: 554.37,
  D5: 587.33,
  Eb5: 622.25,
  E5: 659.25,
  F5: 698.46,
  Gb5: 739.99,
  G5: 783.99,
  Ab5: 830.61,
  A5: 880.0,
  Bb5: 932.33,
  B5: 987.77,
  C6: 1046.5,
};

const PLAYLIST: Track[] = [
  {
    id: 'feel-special',
    title: 'Feel Special',
    era: 'Feel Special (2019)',
    bpm: 128,
    notes: [
      { freq: N.F4, dur: 0.35 },
      { freq: N.Ab4, dur: 0.35 },
      { freq: N.Bb4, dur: 0.35 },
      { freq: N.C5, dur: 0.7 },
      { freq: N.Bb4, dur: 0.35 },
      { freq: N.Ab4, dur: 0.35 },
      { freq: N.F4, dur: 0.35 },
      { freq: N.Eb4, dur: 0.35 },
      { freq: N.F4, dur: 0.8 },
      { freq: 0, dur: 0.2 },
      { freq: N.Ab4, dur: 0.35 },
      { freq: N.Bb4, dur: 0.35 },
      { freq: N.C5, dur: 0.5 },
      { freq: N.Eb5, dur: 0.5 },
      { freq: N.C5, dur: 0.9 },
    ],
  },
  {
    id: 'what-is-love',
    title: 'What is Love?',
    era: 'What is Love? (2018)',
    bpm: 125,
    notes: [
      { freq: N.C5, dur: 0.25 },
      { freq: N.G4, dur: 0.25 },
      { freq: N.A4, dur: 0.25 },
      { freq: N.F4, dur: 0.25 },
      { freq: N.G4, dur: 0.35 },
      { freq: N.E4, dur: 0.25 },
      { freq: N.F4, dur: 0.25 },
      { freq: N.D4, dur: 0.25 },
      { freq: N.C4, dur: 0.4 },
      { freq: 0, dur: 0.15 },
      { freq: N.E4, dur: 0.25 },
      { freq: N.G4, dur: 0.25 },
      { freq: N.C5, dur: 0.6 },
    ],
  },
  {
    id: 'fancy',
    title: 'FANCY',
    era: 'FANCY YOU (2019)',
    bpm: 130,
    notes: [
      { freq: N.Ab4, dur: 0.3 },
      { freq: N.Bb4, dur: 0.3 },
      { freq: N.C5, dur: 0.45 },
      { freq: N.Eb5, dur: 0.45 },
      { freq: N.C5, dur: 0.3 },
      { freq: N.Bb4, dur: 0.3 },
      { freq: N.Ab4, dur: 0.3 },
      { freq: N.Bb4, dur: 0.6 },
      { freq: 0, dur: 0.2 },
      { freq: N.C5, dur: 0.3 },
      { freq: N.Eb5, dur: 0.3 },
      { freq: N.F5, dur: 0.7 },
    ],
  },
  {
    id: 'the-feels',
    title: 'The Feels',
    era: 'The Feels (2021)',
    bpm: 120,
    notes: [
      { freq: N.Bb3, dur: 0.25 },
      { freq: N.D4, dur: 0.25 },
      { freq: N.F4, dur: 0.25 },
      { freq: N.G4, dur: 0.35 },
      { freq: N.Bb4, dur: 0.4 },
      { freq: N.G4, dur: 0.25 },
      { freq: N.F4, dur: 0.25 },
      { freq: N.D4, dur: 0.35 },
      { freq: N.C4, dur: 0.25 },
      { freq: N.D4, dur: 0.6 },
    ],
  },
  {
    id: 'one-spark',
    title: 'ONE SPARK',
    era: 'With YOU-th (2024)',
    bpm: 126,
    notes: [
      { freq: N.D5, dur: 0.3 },
      { freq: N.E5, dur: 0.3 },
      { freq: N.Gb5, dur: 0.4 },
      { freq: N.A5, dur: 0.6 },
      { freq: N.Gb5, dur: 0.3 },
      { freq: N.E5, dur: 0.3 },
      { freq: N.D5, dur: 0.4 },
      { freq: N.B4, dur: 0.3 },
      { freq: N.A4, dur: 0.3 },
      { freq: N.D5, dur: 0.8 },
    ],
  },
];

export function initCandyJukebox(): void {
  const container = document.getElementById('candy-jukebox');
  const toggleBtn = document.getElementById('jukebox-toggle');
  const closeBtn = document.getElementById('jukebox-close');
  const playPauseBtn = document.getElementById('jukebox-play-pause');
  const prevBtn = document.getElementById('jukebox-prev');
  const nextBtn = document.getElementById('jukebox-next');
  const canvas = document.getElementById('jukebox-canvas') as HTMLCanvasElement | null;
  const statusLabel = document.getElementById('jukebox-status');
  const trackName = document.getElementById('jukebox-track-name');
  const trackEra = document.getElementById('jukebox-track-era');
  const iconBadge = document.getElementById('jukebox-icon-badge');
  const artCover = document.getElementById('jukebox-art-cover');
  const volumeSlider = document.getElementById('jukebox-volume') as HTMLInputElement | null;
  const playIcon = document.getElementById('jukebox-play-icon');
  const pauseIcon = document.getElementById('jukebox-pause-icon');
  const trackPills = document.querySelectorAll<HTMLButtonElement>('.jukebox-track-pill');

  if (!container || !toggleBtn) return;

  let audioCtx: AudioContext | null = null;
  let masterGain: GainNode | null = null;
  let analyser: AnalyserNode | null = null;
  let currentTrackIdx = 0;
  let isPlaying = false;
  let sequenceTimer: number | null = null;
  let currentNoteIdx = 0;
  let animFrameId: number | null = null;

  function initAudio(): void {
    if (audioCtx) return;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
    masterGain = audioCtx.createGain();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 64;

    const initialVolume = volumeSlider ? parseFloat(volumeSlider.value) : 0.4;
    masterGain.gain.setValueAtTime(initialVolume, audioCtx.currentTime);

    masterGain.connect(analyser);
    analyser.connect(audioCtx.destination);
  }

  function playNote(freq: number, duration: number): void {
    if (!audioCtx || !masterGain || freq <= 0) return;

    const osc = audioCtx.createOscillator();
    const noteGain = audioCtx.createGain();

    // Timbre tipo chime/marimba cálido
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    // Envolvente ADSR suave
    const now = audioCtx.currentTime;
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.35, now + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(noteGain);
    noteGain.connect(masterGain);

    osc.start(now);
    osc.stop(now + duration + 0.05);
  }

  function stepSequence(): void {
    if (!isPlaying) return;
    const track = PLAYLIST[currentTrackIdx];
    const note = track.notes[currentNoteIdx];

    if (note && note.freq > 0) {
      playNote(note.freq, note.dur);
    }

    const stepDurationMs = ((note?.dur || 0.3) * 1000);
    currentNoteIdx = (currentNoteIdx + 1) % track.notes.length;

    sequenceTimer = window.setTimeout(() => {
      stepSequence();
    }, stepDurationMs);
  }

  function startPlayback(): void {
    initAudio();
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    isPlaying = true;
    updateUIState();
    stepSequence();
    drawVisualizer();
  }

  function stopPlayback(): void {
    isPlaying = false;
    if (sequenceTimer) {
      clearTimeout(sequenceTimer);
      sequenceTimer = null;
    }
    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
    updateUIState();
  }

  function updateUIState(): void {
    const track = PLAYLIST[currentTrackIdx];
    if (trackName) trackName.textContent = track.title;
    if (trackEra) trackEra.textContent = track.era;
    if (statusLabel) {
      statusLabel.textContent = isPlaying ? `Reproduciendo: ${track.title}` : track.title;
    }

    if (iconBadge) {
      iconBadge.classList.toggle('playing', isPlaying);
    }
    if (artCover) {
      artCover.classList.toggle('spinning', isPlaying);
    }

    if (playIcon && pauseIcon) {
      if (isPlaying) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
      } else {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
      }
    }

    trackPills.forEach((pill, idx) => {
      pill.classList.toggle('active', idx === currentTrackIdx);
    });
  }

  function selectTrack(idx: number): void {
    currentTrackIdx = (idx + PLAYLIST.length) % PLAYLIST.length;
    currentNoteIdx = 0;
    if (isPlaying) {
      if (sequenceTimer) clearTimeout(sequenceTimer);
      updateUIState();
      stepSequence();
    } else {
      updateUIState();
    }
  }

  // Visualizador Canvas
  function drawVisualizer(): void {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width = canvas.parentElement?.clientWidth || 280;
    const height = canvas.height = canvas.parentElement?.clientHeight || 42;

    if (!analyser || !isPlaying) {
      ctx.clearRect(0, 0, width, height);
      // Dibujar línea base en reposo
      ctx.strokeStyle = 'rgba(232, 62, 134, 0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();
      return;
    }

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, width, height);

    const barWidth = (width / bufferLength) * 2;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const barHeight = (dataArray[i] / 255) * height * 0.9;
      const gradient = ctx.createLinearGradient(0, height, 0, 0);
      gradient.addColorStop(0, '#ffbe98');
      gradient.addColorStop(1, '#e83e8c');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.roundRect(x, height - barHeight, barWidth - 1, barHeight, [2, 2, 0, 0]);
      ctx.fill();

      x += barWidth + 1;
    }

    if (isPlaying) {
      animFrameId = requestAnimationFrame(drawVisualizer);
    }
  }

  // Event Listeners
  toggleBtn.addEventListener('click', () => {
    container.classList.toggle('expanded');
    const isExpanded = container.classList.contains('expanded');
    toggleBtn.setAttribute('aria-expanded', String(isExpanded));
    if (isExpanded && isPlaying) {
      drawVisualizer();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      container.classList.remove('expanded');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  }

  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
      if (isPlaying) {
        stopPlayback();
      } else {
        startPlayback();
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      selectTrack(currentTrackIdx - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      selectTrack(currentTrackIdx + 1);
    });
  }

  trackPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const idx = parseInt(pill.dataset.trackIndex || '0', 10);
      selectTrack(idx);
    });
  });

  if (volumeSlider) {
    volumeSlider.addEventListener('input', () => {
      const val = parseFloat(volumeSlider.value);
      if (masterGain && audioCtx) {
        masterGain.gain.setValueAtTime(val, audioCtx.currentTime);
      }
    });
  }

  // Cerrar al hacer clic fuera
  document.addEventListener('click', (e) => {
    if (!container.contains(e.target as Node) && container.classList.contains('expanded')) {
      container.classList.remove('expanded');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Inicializar estado UI
  updateUIState();
}
