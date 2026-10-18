import { resolveAsset } from '../utils/streaming';

/**
 * Inicializa la ONCE Fan Zone: Quiz de afinidad y Generador de Photocard personalizada
 * Con sincronización directa en vivo entre los resultados del test y el Photocard Studio.
 */
export function initFanZone(): void {
  // ==========================================
  // METADATOS DE INTEGRANTES
  // ==========================================
  const MEMBER_DATA: Record<string, { name: string; title: string; desc: string; color: string; photo: string }> = {
    nayeon: {
      name: 'Nayeon',
      title: 'Tu esencia es: Nayeon (Radiante & Espontánea)',
      desc: 'Tienes una energía magnética inagotable que contagia alegría dondequiera que vas. Tu confianza natural y amor por la vida te hacen brillar como el pop star del grupo.',
      color: '#5bc2e7',
      photo: '/assets/members/nayeon.webp',
    },
    jeongyeon: {
      name: 'Jeongyeon',
      title: 'Tu esencia es: Jeongyeon (Auténtica & Protectora)',
      desc: 'Eres una persona leal, con un sentido del humor espontáneo y un corazón bondadoso que siempre vela por sus amigos. Valoras la autenticidad por encima de todo.',
      color: '#bdd36c',
      photo: '/assets/members/jeongyeon.webp',
    },
    momo: {
      name: 'Momo',
      title: 'Tu esencia es: Momo (Pura Pasión & Dedicación)',
      desc: 'Cuando te apasiona algo, entregas el alma hasta perfeccionarlo. Tienes una personalidad adorable fuera del escenario y una presencia imparable en acción.',
      color: '#ff6ea7',
      photo: '/assets/members/momo.webp',
    },
    sana: {
      name: 'Sana',
      title: 'Tu esencia es: Sana (Chispa Luminosa & Amor Puro)',
      desc: 'Tu calidez y ternura iluminan el día de cualquier persona. Ves lo mejor en los demás y tu entusiasmo es un regalo para quienes te rodean.',
      color: '#b9a0df',
      photo: '/assets/members/sana.webp',
    },
    jihyo: {
      name: 'Jihyo',
      title: 'Tu esencia es: Jihyo (Liderazgo & Resiliencia)',
      desc: 'Fuerza, paciencia y perseverancia inquebrantable. Tienes el don de inspirar y sostener a los demás en momentos difíciles con una voz inconfundible.',
      color: '#f4a27e',
      photo: '/assets/members/jihyo.webp',
    },
    mina: {
      name: 'Mina',
      title: 'Tu esencia es: Mina (Elegancia Serena & Sensibilidad)',
      desc: 'Posees una gracia etérea y una calma magnética. Tu mirada atenta y gusto por los detalles sutiles revelan una mente creativa de profunda riqueza interior.',
      color: '#91d1c1',
      photo: '/assets/members/mina.webp',
    },
    dahyun: {
      name: 'Dahyun',
      title: 'Tu esencia es: Dahyun (Humor Único & Brillantez)',
      desc: 'Espíritu libre, ingeniosa y espontánea. No tienes miedo de ser tú misma y encuentras sonrisas en los momentos más inesperados.',
      color: '#e83e86',
      photo: '/assets/members/dahyun.webp',
    },
    chaeyoung: {
      name: 'Chaeyoung',
      title: 'Tu esencia es: Chaeyoung (Arte Vanguardista & Libertad)',
      desc: 'Una mente inquieta y creativa que no sigue moldes establecidos. Tu estilo, sensibilidad lírica y visión artística son únicos.',
      color: '#e02438',
      photo: '/assets/members/chaeyoung.webp',
    },
    tzuyu: {
      name: 'Tzuyu',
      title: 'Tu esencia es: Tzuyu (Calma Noble & Valentía Callada)',
      desc: 'Gentil, perseverante y leal. Tu elegancia natural y nobleza de espíritu conquistan a todos con serenidad y dulzura sin pretensiones.',
      color: '#005bac',
      photo: '/assets/members/tzuyu.webp',
    },
  };

  // ==========================================
  // ELEMENTOS DEL PHOTOCARD STUDIO
  // ==========================================
  const studioCard = document.querySelector<HTMLElement>('#photocard-studio-card');
  const fanNameInput = document.querySelector<HTMLInputElement>('#custom-fan-name');
  const memberSelect = document.querySelector<HTMLSelectElement>('#custom-member-select');
  const paletteBtns = document.querySelectorAll<HTMLButtonElement>('[data-frame-color]');
  const canvasWrap = document.querySelector<HTMLElement>('#photocard-canvas-preview');
  const previewMemberName = document.querySelector<HTMLElement>('#canvas-member-preview');
  const previewFanName = document.querySelector<HTMLElement>('#canvas-fan-preview');
  const previewPhoto = document.querySelector<HTMLImageElement>('#canvas-member-photo');
  const matchTag = document.querySelector<HTMLElement>('#canvas-match-tag');
  const studioSyncPill = document.querySelector<HTMLElement>('#studio-sync-pill');
  const studioSyncPillText = document.querySelector<HTMLElement>('#studio-sync-pill-text');
  const downloadBtn = document.querySelector<HTMLButtonElement>('#download-photocard-btn');

  let activeColor = '#e83e86';

  function applyFrameColor(color: string): void {
    activeColor = color;
    paletteBtns.forEach((b) => {
      if (b.getAttribute('data-frame-color') === color) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    if (canvasWrap) {
      canvasWrap.style.setProperty('--custom-color', color);
      canvasWrap.style.setProperty('--custom-glow', `${color}55`);
    }
  }

  function syncStudioWithMember(memberKey: string, isFromQuiz = false): void {
    const meta = MEMBER_DATA[memberKey];
    if (!meta) return;

    if (memberSelect) {
      memberSelect.value = meta.name;
    }

    if (previewMemberName) {
      previewMemberName.textContent = meta.name;
    }

    if (previewPhoto) {
      const resolved = resolveAsset(meta.photo);
      if (resolved) previewPhoto.src = resolved;
    }

    applyFrameColor(meta.color);

    if (isFromQuiz) {
      if (matchTag) matchTag.style.display = 'block';
      if (studioSyncPill) {
        studioSyncPill.style.display = 'inline-flex';
        if (studioSyncPillText) studioSyncPillText.textContent = `Afinidad Sincronizada: ${meta.name}`;
      }
      if (studioCard) {
        studioCard.classList.remove('studio-highlight-pulse');
        // Forzar reflow para reiniciar la animación
        void studioCard.offsetWidth;
        studioCard.classList.add('studio-highlight-pulse');
      }
    }
  }

  // ==========================================
  // EVENTOS DEL PHOTOCARD STUDIO
  // ==========================================
  if (fanNameInput && previewFanName) {
    fanNameInput.addEventListener('input', () => {
      const val = fanNameInput.value.trim() || 'ONCE Oficial';
      previewFanName.textContent = val;
    });
  }

  if (memberSelect) {
    memberSelect.addEventListener('change', () => {
      const selOpt = memberSelect.options[memberSelect.selectedIndex];
      const memberName = memberSelect.value;
      const photo = selOpt.getAttribute('data-photo');
      const color = selOpt.getAttribute('data-color');

      if (previewMemberName) previewMemberName.textContent = memberName;
      if (photo && previewPhoto) previewPhoto.src = photo;
      if (color) applyFrameColor(color);
    });
  }

  paletteBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const color = btn.getAttribute('data-frame-color') || '#e83e86';
      applyFrameColor(color);
    });
  });

  // ==========================================
  // 1. QUIZ DE AFINIDAD
  // ==========================================
  const quizQuestions = document.querySelectorAll<HTMLElement>('.quiz-question-step');
  const fillBar = document.querySelector<HTMLElement>('#quiz-progress-fill');
  const pillCounter = document.querySelector<HTMLElement>('#quiz-counter-text');
  const resultView = document.querySelector<HTMLElement>('#quiz-result-view');
  const quizBody = document.querySelector<HTMLElement>('#quiz-body');
  const resetBtn = document.querySelector<HTMLButtonElement>('#quiz-reset-btn');
  const resultTitle = document.querySelector<HTMLElement>('#result-member-title');
  const resultDesc = document.querySelector<HTMLElement>('#result-member-desc');
  const applyStudioBtn = document.querySelector<HTMLButtonElement>('#quiz-apply-studio-btn');
  const applyBtnLabel = document.querySelector<HTMLElement>('#quiz-apply-btn-label');

  let currentStep = 0;
  const userPicks: string[] = [];

  const optionBtns = document.querySelectorAll<HTMLButtonElement>('[data-quiz-choice]');
  optionBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const member = btn.getAttribute('data-quiz-choice') || 'nayeon';
      userPicks.push(member);

      if (currentStep < quizQuestions.length - 1) {
        quizQuestions[currentStep].style.display = 'none';
        currentStep++;
        quizQuestions[currentStep].style.display = 'block';

        const progressPercent = ((currentStep + 1) / quizQuestions.length) * 100;
        if (fillBar) fillBar.style.width = `${progressPercent}%`;
        if (pillCounter) pillCounter.textContent = `${currentStep + 1} / ${quizQuestions.length}`;
      } else {
        showQuizResult();
      }
    });
  });

  function showQuizResult(): void {
    if (quizBody) quizBody.style.display = 'none';
    if (resultView) {
      resultView.classList.add('active');
      resultView.style.display = 'flex';
    }

    // Calcular integrante más frecuente
    const counts: Record<string, number> = {};
    let maxMember = userPicks[0] || 'nayeon';
    let maxCount = 0;

    userPicks.forEach((m) => {
      counts[m] = (counts[m] || 0) + 1;
      if (counts[m] > maxCount) {
        maxCount = counts[m];
        maxMember = m;
      }
    });

    const info = MEMBER_DATA[maxMember] || MEMBER_DATA.nayeon;
    if (resultTitle) resultTitle.textContent = info.title;
    if (resultDesc) resultDesc.textContent = info.desc;
    if (applyBtnLabel) applyBtnLabel.textContent = `Personalizar Photocard de ${info.name}`;

    // Sincronizar inmediatamente el Photocard Studio
    syncStudioWithMember(maxMember, true);
  }

  if (applyStudioBtn) {
    applyStudioBtn.addEventListener('click', () => {
      if (studioCard) {
        studioCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        studioCard.classList.remove('studio-highlight-pulse');
        void studioCard.offsetWidth;
        studioCard.classList.add('studio-highlight-pulse');
        if (fanNameInput) {
          setTimeout(() => fanNameInput.focus(), 600);
        }
      }
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      userPicks.length = 0;
      currentStep = 0;
      quizQuestions.forEach((q, idx) => {
        q.style.display = idx === 0 ? 'block' : 'none';
      });
      if (fillBar) fillBar.style.width = '20%';
      if (pillCounter) pillCounter.textContent = '1 / 5';
      if (quizBody) quizBody.style.display = 'block';
      if (resultView) {
        resultView.classList.remove('active');
        resultView.style.display = 'none';
      }
    });
  }

  // ==========================================
  // EXPORTACIÓN DE PHOTOCARD EN ALTA DEFINICIÓN (CANVAS API)
  // ==========================================
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 900;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const memberName = memberSelect?.value || 'TWICE';
      const fanName = fanNameInput?.value.trim() || 'ONCE Oficial';

      function renderCard(loadedImg?: HTMLImageElement): void {
        if (!ctx) return;

        // 1. Fondo base de lujo
        const bgGrad = ctx.createLinearGradient(0, 0, 600, 900);
        bgGrad.addColorStop(0, '#2b132c');
        bgGrad.addColorStop(0.5, '#160918');
        bgGrad.addColorStop(1, '#0e040f');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 600, 900);

        // 2. Foto de la integrante
        if (loadedImg && loadedImg.complete && loadedImg.naturalWidth > 0) {
          ctx.save();
          // Clip dentro del marco interior
          ctx.beginPath();
          ctx.roundRect(40, 110, 520, 570, 16);
          ctx.clip();
          ctx.drawImage(loadedImg, 40, 110, 520, 570);

          // Gradiente inferior oscuro sobre la foto para legibilidad del nombre
          const photoGrad = ctx.createLinearGradient(0, 480, 0, 680);
          photoGrad.addColorStop(0, 'rgba(14, 4, 15, 0)');
          photoGrad.addColorStop(1, 'rgba(14, 4, 15, 0.95)');
          ctx.fillStyle = photoGrad;
          ctx.fillRect(40, 480, 520, 200);
          ctx.restore();
        }

        // 3. Borde exterior de la tarjeta
        ctx.strokeStyle = activeColor;
        ctx.lineWidth = 14;
        ctx.strokeRect(16, 16, 568, 868);

        // 4. Marco interior fotográfico
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.lineWidth = 2;
        ctx.strokeRect(38, 108, 524, 574);

        // 5. Brillo y reflejo diagonal
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(600, 320);
        ctx.lineTo(600, 0);
        ctx.closePath();
        ctx.fill();

        // 6. Cabecera editorial
        ctx.fillStyle = activeColor;
        ctx.font = 'bold 22px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('ONCE COLLECTOR PHOTOCARD · 10TH', 300, 75);

        // 7. Nombre de la integrante
        ctx.fillStyle = '#ffffff';
        ctx.font = 'italic bold 52px serif';
        ctx.fillText(memberName, 300, 630);

        // 8. Nombre del Fan
        ctx.fillStyle = activeColor;
        ctx.font = 'bold 26px sans-serif';
        ctx.fillText(`PROPIEDAD DE: ${fanName.toUpperCase()}`, 300, 740);

        // 9. Sello de autenticidad
        ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
        ctx.font = 'bold 15px sans-serif';
        ctx.fillText('NINE MEMBERS · TWO WORLDS · OFFICIAL MATCH', 300, 780);

        // 10. Pie de página
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.font = '14px sans-serif';
        ctx.fillText('TWICE 10TH ANNIVERSARY ARCHIVE · 2015-2025', 300, 840);

        // 11. Descargar archivo PNG
        const link = document.createElement('a');
        link.download = `photocard-${memberName.toLowerCase()}-${fanName.toLowerCase().replace(/\s+/g, '-')}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      }

      if (previewPhoto && previewPhoto.src) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => renderCard(img);
        img.onerror = () => renderCard();
        img.src = previewPhoto.src;
      } else {
        renderCard();
      }
    });
  }
}
