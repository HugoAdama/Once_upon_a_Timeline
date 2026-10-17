/**
 * Candy Jukebox — ONCE Interactive Audio Player
 * Reproduce clips de audio oficiales reales de TWICE con analizador de espectro Web Audio
 * y soporte para motivos melódicos sintetizados como respaldo offline.
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
  audioUrl: string;
  cover: string;
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
    cover: '/Once_upon_a_Timeline/assets/covers/feel-special.webp',
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/8f/14/4d/8f144d3e-2064-debe-445f-f7d62714beaa/mzaf_1892723014686349236.plus.aac.p.m4a',
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
    cover: '/Once_upon_a_Timeline/assets/covers/what-is-love.webp',
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/11/29/e2/1129e2b9-2d59-c3bf-9242-982aa012cb95/mzaf_2107069738025586373.plus.aac.p.m4a',
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
    cover: '/Once_upon_a_Timeline/assets/covers/fancy-you.webp',
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/e4/f5/f7/e4f5f7d3-ffff-70e6-69a5-eb8e9263327d/mzaf_3167851399749861261.plus.aac.p.m4a',
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
    cover: '/Once_upon_a_Timeline/assets/covers/the-feels.webp',
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/16/09/06/16090679-d33d-14e3-2d1f-338f459b8eec/mzaf_9506922916768796625.plus.aac.p.m4a',
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
    cover: '/Once_upon_a_Timeline/assets/covers/with-you-th.webp',
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/a9/a0/50/a9a05036-f5de-f9d9-c48e-0ce3ec601474/mzaf_9312888476283040924.plus.aac.p.m4a',
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
  {
    id: 'cant-stop-me',
    title: "I CAN'T STOP ME",
    era: 'Eyes wide open (2020)',
    bpm: 150,
    cover: '/Once_upon_a_Timeline/assets/covers/eyes-wide-open.webp',
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/70/66/62/706662b3-3825-4397-82d7-bfd445ac4410/mzaf_10084979905200977324.plus.aac.p.m4a',
    notes: [
      { freq: N.A4, dur: 0.25 },
      { freq: N.C5, dur: 0.25 },
      { freq: N.D5, dur: 0.35 },
      { freq: N.E5, dur: 0.5 },
      { freq: N.D5, dur: 0.25 },
      { freq: N.C5, dur: 0.25 },
      { freq: N.A4, dur: 0.5 },
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
  const artImg = document.getElementById('jukebox-art-img') as HTMLImageElement | null;
  const volumeSlider = document.getElementById('jukebox-volume') as HTMLInputElement | null;
  const playIcon = document.getElementById('jukebox-play-icon');
  const pauseIcon = document.getElementById('jukebox-pause-icon');
  const trackPills = document.querySelectorAll<HTMLButtonElement>('.jukebox-track-pill');
  const modeBtn = document.getElementById('jukebox-mode-btn');
  const modeLabel = document.getElementById('jukebox-mode-label');

  // Elemento de audio nativo
  let audioEl = document.getElementById('jukebox-audio-element') as HTMLAudioElement | null;
  if (!audioEl) {
    audioEl = new Audio();
    audioEl.id = 'jukebox-audio-element';
  }
  audioEl.crossOrigin = 'anonymous';

  if (!container || !toggleBtn) return;

  let audioCtx: AudioContext | null = null;
  let masterGain: GainNode | null = null;
  let analyser: AnalyserNode | null = null;
  let mediaSource: MediaElementAudioSourceNode | null = null;
  let currentTrackIdx = 0;
  let isPlaying = false;
  let isRealAudioMode = true; // Por defecto reproduce la canción real oficial
  let sequenceTimer: number | null = null;
  let currentNoteIdx = 0;
  let animFrameId: number | null = null;
  let activeCandybongColor = '#e83e86';

  function initAudioGraph(): void {
    if (audioCtx) return;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
    masterGain = audioCtx.createGain();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 64;

    const initialVolume = volumeSlider ? parseFloat(volumeSlider.value) : 0.45;
    masterGain.gain.setValueAtTime(initialVolume, audioCtx.currentTime);

    masterGain.connect(analyser);
    analyser.connect(audioCtx.destination);

    // Conectar el elemento HTML5 de audio al grafo de Web Audio
    if (audioEl && !mediaSource) {
      try {
        mediaSource = audioCtx.createMediaElementSource(audioEl);
        mediaSource.connect(masterGain);
      } catch (err) {
        console.warn('Conexión MediaElementSource directa a Web Audio no disponible:', err);
      }
    }
  }

  function playSynthNote(freq: number, duration: number): void {
    if (!audioCtx || !masterGain || freq <= 0) return;

    const osc = audioCtx.createOscillator();
    const noteGain = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    const now = audioCtx.currentTime;
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.35, now + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(noteGain);
    noteGain.connect(masterGain);

    osc.start(now);
    osc.stop(now + duration + 0.05);
  }

  function stepSynthSequence(): void {
    if (!isPlaying || isRealAudioMode) return;
    const track = PLAYLIST[currentTrackIdx];
    const note = track.notes[currentNoteIdx];

    if (note && note.freq > 0) {
      playSynthNote(note.freq, note.dur);
    }

    const stepDurationMs = (note?.dur || 0.3) * 1000;
    currentNoteIdx = (currentNoteIdx + 1) % track.notes.length;

    sequenceTimer = window.setTimeout(() => {
      stepSynthSequence();
    }, stepDurationMs);
  }

  function startPlayback(): void {
    initAudioGraph();
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const track = PLAYLIST[currentTrackIdx];
    isPlaying = true;

    if (isRealAudioMode && audioEl) {
      if (audioEl.src !== track.audioUrl) {
        audioEl.src = track.audioUrl;
        audioEl.load();
      }
      const initialVolume = volumeSlider ? parseFloat(volumeSlider.value) : 0.45;
      audioEl.volume = initialVolume;

      audioEl.play().catch((err) => {
        console.warn('Fallo al reproducir audio real, alternando a sintetizador chime:', err);
        isRealAudioMode = false;
        updateUIState();
        stepSynthSequence();
      });
    } else {
      stepSynthSequence();
    }

    updateUIState();
    drawVisualizer();
  }

  function stopPlayback(): void {
    isPlaying = false;
    if (audioEl) {
      audioEl.pause();
    }
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
    if (artImg) {
      artImg.src = track.cover;
      artImg.alt = `Portada de ${track.title}`;
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

    if (modeLabel) {
      modeLabel.textContent = isRealAudioMode ? 'Canción Real' : 'Chime 8-bit';
    }

    trackPills.forEach((pill, idx) => {
      pill.classList.toggle('active', idx === currentTrackIdx);
    });
  }

  function selectTrack(idx: number): void {
    currentTrackIdx = (idx + PLAYLIST.length) % PLAYLIST.length;
    currentNoteIdx = 0;
    if (audioEl) {
      audioEl.pause();
      audioEl.currentTime = 0;
    }
    if (isPlaying) {
      if (sequenceTimer) clearTimeout(sequenceTimer);
      startPlayback();
    } else {
      updateUIState();
    }
  }

  // Auto-avance al finalizar la canción real
  if (audioEl) {
    audioEl.addEventListener('ended', () => {
      selectTrack(currentTrackIdx + 1);
    });
  }

  // Sincronización del color Candybong recibido del evento
  window.addEventListener('candybong-color-changed', (e: Event) => {
    const customEv = e as CustomEvent<{ hex: string }>;
    if (customEv.detail && customEv.detail.hex) {
      activeCandybongColor = customEv.detail.hex;
      if (iconBadge) {
        iconBadge.style.boxShadow = `0 4px 14px ${customEv.detail.hex}`;
      }
    }
  });

  // Visualizador Canvas reactivo al audio real o sintetizado
  function drawVisualizer(): void {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = canvas.parentElement?.clientWidth || 280);
    const height = (canvas.height = canvas.parentElement?.clientHeight || 42);

    if (!isPlaying) {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = 'rgba(232, 62, 134, 0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();
      return;
    }

    const bufferLength = analyser ? analyser.frequencyBinCount : 32;
    const dataArray = new Uint8Array(bufferLength);
    if (analyser) {
      analyser.getByteFrequencyData(dataArray);
    }

    ctx.clearRect(0, 0, width, height);
    const barWidth = (width / bufferLength) * 2.2;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      // Si el audio nativo no pasa por Web Audio por restricciones del navegador, genera barras dinámicas
      let val = dataArray[i];
      if (val === 0 && isPlaying) {
        val = Math.floor(Math.sin((Date.now() / 150) + i) * 60 + 90);
      }

      const barHeight = (val / 255) * height * 0.95;
      const gradient = ctx.createLinearGradient(0, height, 0, 0);
      gradient.addColorStop(0, '#f4a27e');
      gradient.addColorStop(0.5, activeCandybongColor);
      gradient.addColorStop(1, '#e83e86');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.roundRect(x, height - barHeight, barWidth - 1.5, barHeight, [2, 2, 0, 0]);
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

  if (modeBtn) {
    modeBtn.addEventListener('click', () => {
      isRealAudioMode = !isRealAudioMode;
      if (isPlaying) {
        stopPlayback();
        startPlayback();
      } else {
        updateUIState();
      }
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
      if (audioEl) {
        audioEl.volume = val;
      }
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
