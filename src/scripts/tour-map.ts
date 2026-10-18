/**
 * World Tour Odyssey — Navegación entre giras y rotación automática de fotografías
 * de conciertos cada 30 segundos con barra de progreso, controles manuales y pausas dinámicas.
 */

interface SlideItem {
  url: string;
  caption: string;
  location: string;
}

interface TourController {
  tourId: string;
  panel: HTMLElement;
  viewport: HTMLElement;
  slides: SlideItem[];
  currentIndex: number;
  timerFill: HTMLElement | null;
  imgEl: HTMLImageElement | null;
  locationEl: HTMLElement | null;
  captionEl: HTMLElement | null;
  dots: HTMLButtonElement[];
  isHovered: boolean;
  startTime: number;
  elapsedTime: number;
  animFrameId: number | null;
  start: () => void;
  pause: () => void;
  resetTimer: () => void;
  goToSlide: (index: number) => void;
}

const ROTATION_INTERVAL_MS = 30000; // 30 segundos exactos

export function initTourOdyssey(): void {
  const tourNavBtns = document.querySelectorAll<HTMLButtonElement>('[data-tour-id]');
  const tourPanels = document.querySelectorAll<HTMLElement>('.tour-content-panel');
  const controllers: Map<string, TourController> = new Map();

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Inicializar cada viewport de galería
  document.querySelectorAll<HTMLElement>('[data-tour-gallery]').forEach((viewport) => {
    const tourId = viewport.getAttribute('data-tour-id');
    const panel = viewport.closest<HTMLElement>('.tour-content-panel');
    if (!tourId || !panel) return;

    const rawSlides = viewport.getAttribute('data-slides');
    let slides: SlideItem[] = [];
    try {
      slides = rawSlides ? JSON.parse(rawSlides) : [];
    } catch (e) {
      console.warn('Error parsing tour slides', e);
    }
    if (slides.length === 0) return;

    const imgEl = viewport.querySelector<HTMLImageElement>('.tour-hero-img');
    const timerFill = viewport.querySelector<HTMLElement>('.tour-timer-fill');
    const locationEl = viewport.querySelector<HTMLElement>('.tour-location-text');
    const captionEl = viewport.querySelector<HTMLElement>('.tour-caption-text');
    const dots = Array.from(viewport.querySelectorAll<HTMLButtonElement>('[data-dot-index]'));
    const prevBtn = viewport.querySelector<HTMLButtonElement>('[data-slide-prev]');
    const nextBtn = viewport.querySelector<HTMLButtonElement>('[data-slide-next]');

    const controller: TourController = {
      tourId,
      panel,
      viewport,
      slides,
      currentIndex: 0,
      timerFill,
      imgEl,
      locationEl,
      captionEl,
      dots,
      isHovered: false,
      startTime: 0,
      elapsedTime: 0,
      animFrameId: null,

      goToSlide(nextIndex: number) {
        if (slides.length === 0) return;
        this.currentIndex = (nextIndex + slides.length) % slides.length;
        const slide = slides[this.currentIndex];

        if (this.imgEl) {
          this.imgEl.classList.add('fade-transition');
          setTimeout(() => {
            if (this.imgEl) {
              this.imgEl.src = slide.url;
              this.imgEl.alt = slide.caption;
              this.imgEl.classList.remove('fade-transition');
            }
          }, 180);
        }

        if (this.locationEl) {
          this.locationEl.textContent = slide.location;
        }
        if (this.captionEl) {
          this.captionEl.textContent = slide.caption;
        }

        this.dots.forEach((dot, idx) => {
          const isActive = idx === this.currentIndex;
          dot.classList.toggle('active', isActive);
          dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        this.resetTimer();
      },

      resetTimer() {
        this.elapsedTime = 0;
        this.startTime = performance.now();
        if (this.timerFill) {
          this.timerFill.style.width = '0%';
        }
      },

      start() {
        if (prefersReducedMotion) return;
        this.startTime = performance.now() - this.elapsedTime;
        const loop = (now: number) => {
          if (!this.isHovered) {
            this.elapsedTime = now - this.startTime;
            const progress = Math.min(1, this.elapsedTime / ROTATION_INTERVAL_MS);
            if (this.timerFill) {
              this.timerFill.style.width = `${(progress * 100).toFixed(1)}%`;
            }

            if (this.elapsedTime >= ROTATION_INTERVAL_MS) {
              this.goToSlide(this.currentIndex + 1);
            }
          } else {
            this.startTime = now - this.elapsedTime;
          }
          this.animFrameId = requestAnimationFrame(loop);
        };
        if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
        this.animFrameId = requestAnimationFrame(loop);
      },

      pause() {
        if (this.animFrameId) {
          cancelAnimationFrame(this.animFrameId);
          this.animFrameId = null;
        }
      },
    };

    // Eventos de controles de usuario
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        controller.goToSlide(controller.currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        controller.goToSlide(controller.currentIndex + 1);
      });
    }

    dots.forEach((dot, dotIdx) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        controller.goToSlide(dotIdx);
      });
    });

    // Pausar en hover para permitir inspección visual de la fotografía
    viewport.addEventListener('mouseenter', () => {
      controller.isHovered = true;
    });

    viewport.addEventListener('mouseleave', () => {
      controller.isHovered = false;
      controller.startTime = performance.now() - controller.elapsedTime;
    });

    controllers.set(tourId, controller);
  });

  // Manejo de tabs de gira
  tourNavBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tourId = btn.getAttribute('data-tour-id');
      if (!tourId) return;

      tourNavBtns.forEach((b) => {
        const isTarget = b === btn;
        b.classList.toggle('active', isTarget);
        b.setAttribute('aria-selected', isTarget ? 'true' : 'false');
      });

      tourPanels.forEach((panel) => {
        const isMatch = panel.id === `panel-${tourId}`;
        panel.style.display = isMatch ? 'block' : 'none';
      });

      // Pausar controladores de paneles ocultos y arrancar el activo
      controllers.forEach((ctrl, id) => {
        if (id === tourId) {
          ctrl.resetTimer();
          ctrl.start();
        } else {
          ctrl.pause();
        }
      });
    });
  });

  // Iniciar rotación en la primera gira activa
  const firstActiveBtn = document.querySelector<HTMLButtonElement>('.tour-nav-btn.active');
  const initialTourId = firstActiveBtn?.getAttribute('data-tour-id');
  if (initialTourId && controllers.has(initialTourId)) {
    controllers.get(initialTourId)!.start();
  }
}
