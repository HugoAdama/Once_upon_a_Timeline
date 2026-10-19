/**
 * Photocard Studio Polco Deco — Stickers, Acabados Holográficos y Renderizador Canvas HD
 */

export interface DecoState {
  holoFinish: 'none' | 'glitter' | 'prism';
  stickers: {
    washi: boolean;
    anniversary: boolean;
    candybong: boolean;
    sparkles: boolean;
  };
}

export const decoState: DecoState = {
  holoFinish: 'none',
  stickers: {
    washi: false,
    anniversary: false,
    candybong: false,
    sparkles: false,
  },
};

export function initPhotocardDeco(): void {
  const holoButtons = document.querySelectorAll<HTMLButtonElement>('[data-holo-finish]');
  const stickerButtons = document.querySelectorAll<HTMLButtonElement>('[data-sticker]');
  const holoOverlay = document.getElementById('canvas-holo-overlay');
  const washiTop = document.getElementById('washi-strip-top');
  const washiBottom = document.getElementById('washi-strip-bottom');
  const stickerAnniversary = document.getElementById('sticker-anniversary');
  const stickerCandybong = document.getElementById('sticker-candybong');
  const stickerSparkles = document.getElementById('sticker-sparkles');

  // 1. Selector de acabado Holográfico
  holoButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const finish = (btn.getAttribute('data-holo-finish') || 'none') as DecoState['holoFinish'];
      decoState.holoFinish = finish;

      holoButtons.forEach((b) => {
        const isActive = b === btn;
        b.classList.toggle('active', isActive);
        b.setAttribute('aria-checked', String(isActive));
      });

      if (holoOverlay) {
        holoOverlay.className = `canvas-holo-overlay holo-${finish}`;
      }
    });
  });

  // 2. Conmutador de Stickers
  stickerButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const stickerType = btn.getAttribute('data-sticker') as keyof DecoState['stickers'];
      if (!stickerType || !(stickerType in decoState.stickers)) return;

      const isNowActive = !decoState.stickers[stickerType];
      decoState.stickers[stickerType] = isNowActive;

      btn.classList.toggle('active', isNowActive);
      btn.setAttribute('aria-pressed', String(isNowActive));

      switch (stickerType) {
        case 'washi':
          if (washiTop) washiTop.style.display = isNowActive ? 'block' : 'none';
          if (washiBottom) washiBottom.style.display = isNowActive ? 'block' : 'none';
          break;
        case 'anniversary':
          if (stickerAnniversary) stickerAnniversary.style.display = isNowActive ? 'flex' : 'none';
          break;
        case 'candybong':
          if (stickerCandybong) stickerCandybong.style.display = isNowActive ? 'flex' : 'none';
          break;
        case 'sparkles':
          if (stickerSparkles) stickerSparkles.style.display = isNowActive ? 'flex' : 'none';
          break;
      }
    });
  });
}

/**
 * Dibuja los elementos Polco Deco en el Canvas 2D exportado
 */
export function drawDecoOnCanvas(ctx: CanvasRenderingContext2D, activeColor: string): void {
  // A. Washi Tape (cintas adhesivas semi-transparentes en esquinas superiores)
  if (decoState.stickers.washi) {
    ctx.save();
    ctx.fillStyle = activeColor ? `${activeColor}66` : 'rgba(255, 115, 153, 0.45)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1;

    // Cinta superior izquierda
    ctx.translate(65, 130);
    ctx.rotate((-22 * Math.PI) / 180);
    ctx.fillRect(-45, -12, 90, 24);
    ctx.strokeRect(-45, -12, 90, 24);
    ctx.restore();

    // Cinta inferior derecha
    ctx.save();
    ctx.fillStyle = 'rgba(244, 162, 126, 0.45)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1;
    ctx.translate(530, 650);
    ctx.rotate((18 * Math.PI) / 180);
    ctx.fillRect(-50, -12, 100, 24);
    ctx.strokeRect(-50, -12, 100, 24);
    ctx.restore();
  }

  // B. Sello Dorado 10th Aniversario
  if (decoState.stickers.anniversary) {
    ctx.save();
    const cx = 505;
    const cy = 175;
    ctx.beginPath();
    ctx.arc(cx, cy, 38, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(245, 166, 35, 0.22)';
    ctx.fill();
    ctx.strokeStyle = '#f5a623';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, 32, 0, Math.PI * 2);
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 15px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('10TH', cx, cy - 6);
    ctx.font = 'bold 10px sans-serif';
    ctx.fillStyle = '#f5a623';
    ctx.fillText('SEAL', cx, cy + 10);
    ctx.restore();
  }

  // C. Candybong Glow Badge
  if (decoState.stickers.candybong) {
    ctx.save();
    const cx = 90;
    const cy = 610;
    ctx.beginPath();
    ctx.arc(cx, cy, 26, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(232, 62, 134, 0.35)';
    ctx.fill();
    ctx.strokeStyle = '#ff7399';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, 14, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    ctx.fillStyle = '#e83e86';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('CB', cx, cy);
    ctx.restore();
  }

  // D. Destellos y estrellas
  if (decoState.stickers.sparkles) {
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.font = '24px serif';
    ctx.textAlign = 'center';
    ctx.fillText('✦', 120, 210);
    ctx.font = '18px serif';
    ctx.fillText('★', 480, 520);
    ctx.fillText('✧', 100, 480);
    ctx.font = '28px serif';
    ctx.fillText('✦', 460, 270);
    ctx.restore();
  }

  // E. Acabado Holográfico
  if (decoState.holoFinish === 'glitter') {
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    for (let i = 0; i < 48; i++) {
      const rx = (i * 73) % 560 + 20;
      const ry = (i * 97) % 860 + 20;
      ctx.beginPath();
      ctx.arc(rx, ry, (i % 3) + 1, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  } else if (decoState.holoFinish === 'prism') {
    ctx.save();
    const prismGrad = ctx.createLinearGradient(0, 0, 600, 900);
    prismGrad.addColorStop(0, 'rgba(255, 0, 128, 0.08)');
    prismGrad.addColorStop(0.33, 'rgba(0, 255, 255, 0.08)');
    prismGrad.addColorStop(0.66, 'rgba(255, 255, 0, 0.08)');
    prismGrad.addColorStop(1, 'rgba(255, 0, 128, 0.08)');
    ctx.fillStyle = prismGrad;
    ctx.fillRect(16, 16, 568, 868);
    ctx.restore();
  }
}
