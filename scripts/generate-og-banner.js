import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generateOgBanner() {
  const width = 1200;
  const height = 630;

  const svgContent = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#150a17"/>
        <stop offset="50%" stop-color="#261028"/>
        <stop offset="100%" stop-color="#120713"/>
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="40%" r="55%">
        <stop offset="0%" stop-color="#e83e86" stop-opacity="0.38"/>
        <stop offset="50%" stop-color="#f4a27e" stop-opacity="0.18"/>
        <stop offset="100%" stop-color="#150a17" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="twiceGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#e83e86"/>
        <stop offset="100%" stop-color="#f4a27e"/>
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#000000" flood-opacity="0.6"/>
      </filter>
    </defs>

    <!-- Background -->
    <rect width="${width}" height="${height}" fill="url(#bg)"/>
    <circle cx="600" cy="280" r="380" fill="url(#glow)"/>

    <!-- Decorative Orbit Rings -->
    <circle cx="600" cy="270" r="220" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" stroke-dasharray="6,6"/>
    <circle cx="600" cy="270" r="260" fill="none" stroke="rgba(232,62,134,0.18)" stroke-width="1.5"/>

    <!-- 9 Member Colors Constellation -->
    <circle cx="440" cy="130" r="10" fill="#5bc2e7" stroke="#ffffff" stroke-width="2.5"/> <!-- Nayeon -->
    <circle cx="560" cy="90" r="10" fill="#a9d535" stroke="#ffffff" stroke-width="2.5"/> <!-- Jeongyeon -->
    <circle cx="680" cy="90" r="10" fill="#ff6ea7" stroke="#ffffff" stroke-width="2.5"/> <!-- Momo -->
    <circle cx="780" cy="150" r="10" fill="#9e7bb5" stroke="#ffffff" stroke-width="2.5"/> <!-- Sana -->
    <circle cx="820" cy="270" r="10" fill="#f4a27e" stroke="#ffffff" stroke-width="2.5"/> <!-- Jihyo -->
    <circle cx="760" cy="380" r="10" fill="#75c9be" stroke="#ffffff" stroke-width="2.5"/> <!-- Mina -->
    <circle cx="650" cy="430" r="10" fill="#ffffff" stroke="#222" stroke-width="2.5"/> <!-- Dahyun -->
    <circle cx="520" cy="430" r="10" fill="#e02438" stroke="#ffffff" stroke-width="2.5"/> <!-- Chaeyoung -->
    <circle cx="410" cy="350" r="10" fill="#005bac" stroke="#ffffff" stroke-width="2.5"/> <!-- Tzuyu -->

    <!-- Top Badge -->
    <g transform="translate(480, 50)">
      <rect x="0" y="0" width="240" height="34" rx="17" fill="rgba(255,255,255,0.08)" stroke="rgba(232,62,134,0.3)" stroke-width="1"/>
      <text x="120" y="22" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="800" fill="#ff9bc7" text-anchor="middle" letter-spacing="2">✦ 2015 — 2025 · 10 AÑOS</text>
    </g>

    <!-- Center Typography -->
    <text x="600" y="235" font-family="Georgia, serif" font-size="64" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="-1">Once Upon</text>
    <text x="600" y="305" font-family="Georgia, serif" font-style="italic" font-size="68" fill="url(#twiceGrad)" text-anchor="middle" letter-spacing="-1">a Timeline.</text>
    
    <text x="600" y="355" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="600" fill="#fbdbe9" text-anchor="middle" letter-spacing="1">TWICE FAN ARCHIVE</text>

    <!-- Subtitle Description -->
    <text x="600" y="490" font-family="system-ui, -apple-system, sans-serif" font-size="17" fill="rgba(255,255,255,0.72)" text-anchor="middle">
      9 Integrantes · Discografía Completa (Corea, Japón, Global) · Personajes Lovelys &amp; TDOONGZ
    </text>

    <!-- Bottom Metrics Strip -->
    <g transform="translate(300, 530)">
      <rect x="0" y="0" width="600" height="52" rx="26" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
      <text x="75" y="32" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#ffffff">9 INTEGRANTES</text>
      <line x1="165" y1="16" x2="165" y2="36" stroke="rgba(255,255,255,0.2)"/>
      <text x="210" y="32" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#ffffff">10+ AÑOS</text>
      <line x1="295" y1="16" x2="295" y2="36" stroke="rgba(255,255,255,0.2)"/>
      <text x="340" y="32" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#ffffff">100+ LANZAMIENTOS</text>
      <line x1="475" y1="16" x2="475" y2="36" stroke="rgba(255,255,255,0.2)"/>
      <text x="515" y="32" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#ffffff">18 PERSONAJES</text>
    </g>
  </svg>
  `;

  const outPath = path.join(process.cwd(), 'public', 'assets', 'og-banner.png');
  await sharp(Buffer.from(svgContent))
    .png({ quality: 95 })
    .toFile(outPath);

  console.log(`Generated OG banner at: ${outPath} (${fs.statSync(outPath).size} bytes)`);
}

generateOgBanner().catch(console.error);
