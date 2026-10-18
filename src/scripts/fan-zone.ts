/**
 * Inicializa la ONCE Fan Zone: Quiz de afinidad y Generador de Photocard personalizada
 */
export function initFanZone(): void {
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

  const MEMBER_DATA: Record<string, { title: string; desc: string }> = {
    nayeon: {
      title: 'Tu esencia es: Nayeon (Radiante & Espontánea)',
      desc: 'Tienes una energía magnética inagotable que contagia alegría dondequiera que vas. Tu confianza natural y amor por la vida te hacen brillar como el pop star del grupo.',
    },
    jeongyeon: {
      title: 'Tu esencia es: Jeongyeon (Auténtica & Protectora)',
      desc: 'Eres una persona leal, con un sentido del humor espontáneo y un corazón bondadoso que siempre vela por sus amigos. Valoras la autenticidad por encima de todo.',
    },
    momo: {
      title: 'Tu esencia es: Momo (Pura Pasión & Dedicación)',
      desc: 'Cuando te apasiona algo, entregas el alma hasta perfeccionarlo. Tienes una personalidad adorable fuera del escenario y una presencia imparable en acción.',
    },
    sana: {
      title: 'Tu esencia es: Sana (Chispa Luminosa & Amor Puro)',
      desc: 'Tu calidez y ternura iluminan el día de cualquier persona. Ves lo mejor en los demás y tu entusiasmo es un regalo para quienes te rodean.',
    },
    jihyo: {
      title: 'Tu esencia es: Jihyo (Liderazgo & Resiliencia)',
      desc: 'Fuerza, paciencia y perseverancia inquebrantable. Tienes el don de inspirar y sostener a los demás en momentos difíciles con una voz inconfundible.',
    },
    mina: {
      title: 'Tu esencia es: Mina (Elegancia Serena & Sensibilidad)',
      desc: 'Posees una gracia etérea y una calma magnética. Tu mirada atenta y gusto por los detalles sutiles revelan una mente creativa de profunda riqueza interior.',
    },
    dahyun: {
      title: 'Tu esencia es: Dahyun (Humor Único & Brillantez)',
      desc: 'Espíritu libre, ingeniosa y espontánea. No tienes miedo de ser tú misma y encuentras sonrisas en los momentos más inesperados.',
    },
    chaeyoung: {
      title: 'Tu esencia es: Chaeyoung (Arte Vanguardista & Libertad)',
      desc: 'Una mente inquieta y creativa que no sigue moldes establecidos. Tu estilo, sensibilidad lírica y visión artística son únicos.',
    },
    tzuyu: {
      title: 'Tu esencia es: Tzuyu (Calma Noble & Valentía Callada)',
      desc: 'Gentil, perseverante y leal. Tu elegancia natural y nobleza de espíritu conquistan a todos con serenidad y dulzura sin pretensiones.',
    },
  };

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
        // Fin del quiz: calcular ganador
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

    // Elegir el integrante más frecuente o el último elegido
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
  // 2. GENERADOR DE PHOTOCARD PERSONALIZADA
  // ==========================================
  const fanNameInput = document.querySelector<HTMLInputElement>('#custom-fan-name');
  const memberSelect = document.querySelector<HTMLSelectElement>('#custom-member-select');
  const paletteBtns = document.querySelectorAll<HTMLButtonElement>('[data-frame-color]');
  const canvasWrap = document.querySelector<HTMLElement>('#photocard-canvas-preview');
  const previewMemberName = document.querySelector<HTMLElement>('#canvas-member-preview');
  const previewFanName = document.querySelector<HTMLElement>('#canvas-fan-preview');
  const downloadBtn = document.querySelector<HTMLButtonElement>('#download-photocard-btn');

  let activeColor = '#e83e86';

  if (fanNameInput && previewFanName) {
    fanNameInput.addEventListener('input', () => {
      const val = fanNameInput.value.trim() || 'ONCE Oficial';
      previewFanName.textContent = val;
    });
  }

  if (memberSelect && previewMemberName) {
    memberSelect.addEventListener('change', () => {
      previewMemberName.textContent = memberSelect.value;
    });
  }

  paletteBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const color = btn.getAttribute('data-frame-color') || '#e83e86';
      activeColor = color;

      paletteBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      if (canvasWrap) {
        canvasWrap.style.setProperty('--custom-color', color);
        canvasWrap.style.setProperty('--custom-glow', color + '55');
      }
    });
  });

  // Exportar Photocard en alta resolución usando Canvas API
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 900;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const memberName = memberSelect?.value || 'TWICE';
      const fanName = fanNameInput?.value.trim() || 'ONCE Oficial';

      // 1. Fondo gradiente de lujo
      const bgGrad = ctx.createLinearGradient(0, 0, 600, 900);
      bgGrad.addColorStop(0, '#2b132c');
      bgGrad.addColorStop(0.5, '#190a1a');
      bgGrad.addColorStop(1, '#0e040f');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 600, 900);

      // 2. Borde exterior de la tarjeta
      ctx.strokeStyle = activeColor;
      ctx.lineWidth = 12;
      ctx.strokeRect(16, 16, 568, 868);

      // 3. Brillo y reflejo diagonal
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(600, 300);
      ctx.lineTo(600, 0);
      ctx.closePath();
      ctx.fill();

      // 4. Cabecera editorial
      ctx.fillStyle = activeColor;
      ctx.font = 'bold 22px sans-serif';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '4px';
      ctx.fillText('ONCE COLLECTOR PHOTOCARD', 300, 100);

      // 5. Marco central de la integrante
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2;
      ctx.strokeRect(60, 140, 480, 500);

      // 6. Nombre de la integrante
      ctx.fillStyle = '#ffffff';
      ctx.font = 'italic bold 56px serif';
      ctx.fillText(memberName, 300, 410);

      // 7. Sello de autenticidad
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText('NINE MEMBERS · TWO WORLDS', 300, 470);

      // 8. Nombre del Fan
      ctx.fillStyle = activeColor;
      ctx.font = 'bold 30px sans-serif';
      ctx.fillText(`PROPIEDAD DE: ${fanName.toUpperCase()}`, 300, 720);

      // 9. Pie de página
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = '16px sans-serif';
      ctx.fillText('TWICE 10TH ANNIVERSARY ARCHIVE · 2015-2025', 300, 810);

      // 10. Descargar archivo PNG
      const link = document.createElement('a');
      link.download = `photocard-${memberName.toLowerCase()}-${fanName.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  }
}
