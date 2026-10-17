/**
 * Candy Jukebox — ONCE Interactive Audio Player
 * Reproductor de clips de audio oficiales de TWICE con analizador de espectro Web Audio,
 * barra de progreso interactiva con seek y visualizador estético.
 */

interface Track {
  id: string;
  title: string;
  era: string;
  bpm: number;
  audioUrl: string;
  cover: string;
}

const PLAYLIST: Track[] = [
  {
    id: 'feel-special',
    title: 'Feel Special',
    era: 'Feel Special (2019)',
    bpm: 128,
    cover: '/Once_upon_a_Timeline/assets/covers/feel-special.webp',
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/8f/14/4d/8f144d3e-2064-debe-445f-f7d62714beaa/mzaf_1892723014686349236.plus.aac.p.m4a',
  },
  {
    id: 'what-is-love',
    title: 'What is Love?',
    era: 'What is Love? (2018)',
    bpm: 125,
    cover: '/Once_upon_a_Timeline/assets/covers/what-is-love.webp',
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/11/29/e2/1129e2b9-2d59-c3bf-9242-982aa012cb95/mzaf_2107069738025586373.plus.aac.p.m4a',
  },
  {
    id: 'fancy',
    title: 'FANCY',
    era: 'FANCY YOU (2019)',
    bpm: 130,
    cover: '/Once_upon_a_Timeline/assets/covers/fancy-you.webp',
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/e4/f5/f7/e4f5f7d3-ffff-70e6-69a5-eb8e9263327d/mzaf_3167851399749861261.plus.aac.p.m4a',
  },
  {
    id: 'the-feels',
    title: 'The Feels',
    era: 'The Feels (2021)',
    bpm: 120,
    cover: '/Once_upon_a_Timeline/assets/covers/the-feels.webp',
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/16/09/06/16090679-d33d-14e3-2d1f-338f459b8eec/mzaf_9506922916768796625.plus.aac.p.m4a',
  },
  {
    id: 'one-spark',
    title: 'ONE SPARK',
    era: 'With YOU-th (2024)',
    bpm: 126,
    cover: '/Once_upon_a_Timeline/assets/covers/with-you-th.webp',
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/a9/a0/50/a9a05036-f5de-f9d9-c48e-0ce3ec601474/mzaf_9312888476283040924.plus.aac.p.m4a',
  },
  {
    id: 'cant-stop-me',
    title: "I CAN'T STOP ME",
    era: 'Eyes wide open (2020)',
    bpm: 150,
    cover: '/Once_upon_a_Timeline/assets/covers/eyes-wide-open.webp',
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/70/66/62/706662b3-3825-4397-82d7-bfd445ac4410/mzaf_10084979905200977324.plus.aac.p.m4a',
  },
];

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

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

  // Progress Bar Elements
  const progressTrack = document.getElementById('jukebox-progress-track');
  const progressFill = document.getElementById('jukebox-progress-fill');
  const currentTimeEl = document.getElementById('jukebox-current-time');
  const durationEl = document.getElementById('jukebox-duration');

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
  let animFrameId: number | null = null;
  let activeCandybongColor = '#e83e86';

  function initAudioGraph(): void {
    if (audioCtx) return;
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
        console.warn('Conexión MediaElementSource a Web Audio no disponible:', err);
      }
    }
  }

  function startPlayback(): void {
    initAudioGraph();
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const track = PLAYLIST[currentTrackIdx];
    isPlaying = true;

    if (audioEl) {
      if (audioEl.src !== track.audioUrl) {
        audioEl.src = track.audioUrl;
        audioEl.load();
      }
      const initialVolume = volumeSlider ? parseFloat(volumeSlider.value) : 0.45;
      audioEl.volume = initialVolume;

      audioEl.play().catch((err) => {
        console.warn('Fallo al reproducir audio real de TWICE:', err);
        isPlaying = false;
        updateUIState();
      });
    }

    updateUIState();
    drawVisualizer();
  }

  function stopPlayback(): void {
    isPlaying = false;
    if (audioEl) {
      audioEl.pause();
    }
    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
    updateUIState();
    drawVisualizer();
  }

  function updateProgressUI(): void {
    if (!audioEl) return;
    const cur = audioEl.currentTime || 0;
    const dur = audioEl.duration && !isNaN(audioEl.duration) ? audioEl.duration : 30;
    const pct = Math.min(100, Math.max(0, (cur / dur) * 100));

    if (progressFill) {
      progressFill.style.width = `${pct}%`;
    }
    if (progressTrack) {
      progressTrack.setAttribute('aria-valuenow', Math.round(pct).toString());
    }
    if (currentTimeEl) {
      currentTimeEl.textContent = formatTime(cur);
    }
    if (durationEl) {
      durationEl.textContent = formatTime(dur);
    }
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

    trackPills.forEach((pill, idx) => {
      pill.classList.toggle('active', idx === currentTrackIdx);
    });

    updateProgressUI();
  }

  function selectTrack(idx: number): void {
    currentTrackIdx = (idx + PLAYLIST.length) % PLAYLIST.length;
    if (audioEl) {
      audioEl.pause();
      audioEl.currentTime = 0;
    }
    updateProgressUI();
    if (isPlaying) {
      startPlayback();
    } else {
      updateUIState();
    }
  }

  // Eventos de audio nativo para actualización de progreso y auto-avance
  if (audioEl) {
    audioEl.addEventListener('timeupdate', updateProgressUI);
    audioEl.addEventListener('loadedmetadata', updateProgressUI);
    audioEl.addEventListener('durationchange', updateProgressUI);
    audioEl.addEventListener('ended', () => {
      selectTrack(currentTrackIdx + 1);
    });
  }

  // Interacción en la barra de progreso
  if (progressTrack) {
    const handleSeek = (e: MouseEvent) => {
      if (!audioEl) return;
      const rect = progressTrack.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const fraction = Math.max(0, Math.min(1, clickX / rect.width));
      const dur = audioEl.duration && !isNaN(audioEl.duration) ? audioEl.duration : 30;
      audioEl.currentTime = fraction * dur;
      updateProgressUI();
    };

    progressTrack.addEventListener('click', handleSeek);

    progressTrack.addEventListener('keydown', (e: KeyboardEvent) => {
      if (!audioEl) return;
      if (e.key === 'ArrowRight') {
        audioEl.currentTime = Math.min((audioEl.duration || 30), audioEl.currentTime + 5);
        updateProgressUI();
      } else if (e.key === 'ArrowLeft') {
        audioEl.currentTime = Math.max(0, audioEl.currentTime - 5);
        updateProgressUI();
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (isPlaying) stopPlayback();
        else startPlayback();
      }
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

  // Visualizador Canvas reactivo al audio real con estado idle estético
  function drawVisualizer(): void {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = canvas.parentElement?.clientWidth || 294);
    const height = (canvas.height = canvas.parentElement?.clientHeight || 38);

    ctx.clearRect(0, 0, width, height);

    if (!isPlaying) {
      // Estado Idle elegante: Onda suave con degradado Candybong tenue
      const grad = ctx.createLinearGradient(0, 0, width, 0);
      grad.addColorStop(0, 'rgba(232, 62, 134, 0.1)');
      grad.addColorStop(0.5, activeCandybongColor + '44');
      grad.addColorStop(1, 'rgba(244, 162, 126, 0.1)');

      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.beginPath();

      const midY = height / 2;
      ctx.moveTo(0, midY);

      // Dibujar 4 ondas suaves sutiles
      for (let x = 0; x <= width; x += 10) {
        const y = midY + Math.sin(x * 0.04) * 3;
        ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Puntos de ritmo sutiles
      const dotCount = 8;
      for (let i = 0; i < dotCount; i++) {
        const x = (width / (dotCount + 1)) * (i + 1);
        const y = midY + Math.sin(x * 0.04) * 3;
        ctx.fillStyle = activeCandybongColor + '55';
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
      return;
    }

    const bufferLength = analyser ? analyser.frequencyBinCount : 32;
    const dataArray = new Uint8Array(bufferLength);
    if (analyser) {
      analyser.getByteFrequencyData(dataArray);
    }

    const barWidth = (width / bufferLength) * 2.2;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      let val = dataArray[i];
      if (val === 0 && isPlaying) {
        val = Math.floor(Math.sin(Date.now() / 150 + i) * 60 + 95);
      }

      const barHeight = Math.max(3, (val / 255) * height * 0.95);
      const gradient = ctx.createLinearGradient(0, height, 0, 0);
      gradient.addColorStop(0, '#f4a27e');
      gradient.addColorStop(0.5, activeCandybongColor);
      gradient.addColorStop(1, '#e83e86');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.roundRect(x, height - barHeight, Math.max(2, barWidth - 1.5), barHeight, [2, 2, 0, 0]);
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
    drawVisualizer();
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

  // Escuchar peticiones de reproducción desde eventos
  window.addEventListener('candy-jukebox:play', (e: Event) => {
    const customEvent = e as CustomEvent<{ title: string }>;
    if (!customEvent.detail?.title) return;
    const query = customEvent.detail.title.toLowerCase().trim();
    const foundIdx = PLAYLIST.findIndex(
      (t) =>
        t.title.toLowerCase() === query ||
        query.includes(t.title.toLowerCase()) ||
        t.title.toLowerCase().includes(query)
    );
    if (foundIdx !== -1) {
      selectTrack(foundIdx);
      container.classList.add('expanded');
      toggleBtn.setAttribute('aria-expanded', 'true');
      startPlayback();
    }
  });

  // Inicializar estado UI y dibujo inicial del visualizador
  updateUIState();
  drawVisualizer();
}
