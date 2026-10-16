import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// 1. DATA DEFINITIONS
const MEMBERS = [
  { id: 'nayeon', name: 'Nayeon', hangul: '임나연', num: '01', color: '#91cdee', secondary: '#c9e8fa', symbol: '🐰', role: 'Lead Vocal & Center' },
  { id: 'jeongyeon', name: 'Jeongyeon', hangul: '유정연', num: '02', color: '#bdd36c', secondary: '#e3f0a8', symbol: '🍈', role: 'Lead Vocal' },
  { id: 'momo', name: 'Momo', hangul: '모모', num: '03', color: '#ed9fc2', secondary: '#fad4e5', symbol: '🍑', role: 'Main Dancer & Rapper' },
  { id: 'sana', name: 'Sana', hangul: '사나', num: '04', color: '#b9a0df', secondary: '#ded2f5', symbol: '🐹', role: 'Sub Vocal' },
  { id: 'jihyo', name: 'Jihyo', hangul: '박지효', num: '05', color: '#f2a77d', secondary: '#fcd9c5', symbol: '🎤', role: 'Leader & Main Vocal' },
  { id: 'mina', name: 'Mina', hangul: '미나', num: '06', color: '#91d1c1', secondary: '#c8eee5', symbol: '🐧', role: 'Main Dancer & Vocal' },
  { id: 'dahyun', name: 'Dahyun', hangul: '김다현', num: '07', color: '#d8d4d0', secondary: '#f3f1ef', symbol: '🦅', role: 'Lead Rapper & Vocal' },
  { id: 'chaeyoung', name: 'Chaeyoung', hangul: '손채영', num: '08', color: '#e66f7a', secondary: '#f8babc', symbol: '🐯', role: 'Main Rapper & Vocal' },
  { id: 'tzuyu', name: 'Tzuyu', hangul: '쯔위', num: '09', color: '#76a3d8', secondary: '#bad2f0', symbol: '🦌', role: 'Lead Dancer & Maknae' },
];

const LOVELYS = [
  { id: 'navely', name: 'Navely', member: 'Nayeon', color: '#91cdee', ear: '🐰' },
  { id: 'jeongvely', name: 'Jeongvely', member: 'Jeongyeon', color: '#bdd36c', ear: '🍈' },
  { id: 'movely', name: 'Movely', member: 'Momo', color: '#ed9fc2', ear: '🍑' },
  { id: 'savely', name: 'Savely', member: 'Sana', color: '#b9a0df', ear: '🐹' },
  { id: 'jively', name: 'Jively', member: 'Jihyo', color: '#f2a77d', ear: '🎤' },
  { id: 'mively', name: 'Mively', member: 'Mina', color: '#91d1c1', ear: '🐧' },
  { id: 'davely', name: 'Davely', member: 'Dahyun', color: '#d8d4d0', ear: '🦅' },
  { id: 'chaengvely', name: 'Chaengvely', member: 'Chaeyoung', color: '#e66f7a', ear: '🐯' },
  { id: 'tzuvely', name: 'Tzuvely', member: 'Tzuyu', color: '#76a3d8', ear: '🦌' },
];

const TDOONGZ = [
  { id: 'imnabong', name: 'IMNABONG', member: 'Nayeon', color: '#91cdee', trait: 'Bunny Star', icon: '🐰' },
  { id: 'yubbuibbui', name: 'YUBBUIBBUI', member: 'Jeongyeon', color: '#bdd36c', trait: 'Guardian Pup', icon: '🐶' },
  { id: 'mokuring', name: 'MOKURING', member: 'Momo', color: '#ed9fc2', trait: 'Raccoon Dancer', icon: '🦝' },
  { id: 'shyam-shyam', name: 'SHYAM SHYAM', member: 'Sana', color: '#b9a0df', trait: 'Shy Hamster', icon: '🐹' },
  { id: 'parkzyoni', name: 'PARKZYONI', member: 'Jihyo', color: '#f2a77d', trait: 'Mic Owl Leader', icon: '🦉' },
  { id: 'myodette', name: 'MYODETTE', member: 'Mina', color: '#91d1c1', trait: 'Gamer Swan', icon: '🦢' },
  { id: 'dupnyangee', name: 'DUPNYANGEE', member: 'Dahyun', color: '#d8d4d0', trait: 'Tofu Cat', icon: '🐱' },
  { id: 'sonchaetty', name: 'SONCHAETTY', member: 'Chaeyoung', color: '#e66f7a', trait: 'Artist Tiger', icon: '🐯' },
  { id: 'tzukumi', name: 'TZUKUMI', member: 'Tzuyu', color: '#76a3d8', trait: 'Sweet Deer', icon: '🦌' },
];

// 2. ALBUM PALETTES FOR COVERS
const ERA_THEMES = {
  'this-is-for': { c1: '#ff6b9d', c2: '#ff9ebb', c3: '#734b6d', subtitle: '4TH REGULAR ALBUM' },
  'strategy': { c1: '#4a00e0', c2: '#8e2de2', c3: '#f093fb', subtitle: 'MINI ALBUM · FT. MEGAN' },
  'with-you-th': { c1: '#00c6ff', c2: '#0072ff', c3: '#ff758c', subtitle: '13TH MINI ALBUM' },
  'ready-to-be': { c1: '#f857a6', c2: '#ff5858', c3: '#200122', subtitle: '12TH MINI ALBUM' },
  'between-1-2': { c1: '#fa709a', c2: '#fee140', c3: '#30cfd0', subtitle: '11TH MINI ALBUM' },
  'taste-of-love': { c1: '#43e97b', c2: '#38f9d7', c3: '#fa709a', subtitle: '10TH MINI ALBUM' },
  'cry-for-me': { c1: '#141e30', c2: '#243b55', c3: '#e83e86', subtitle: 'DIGITAL SINGLE' },
  'eyes-wide-open': { c1: '#232526', c2: '#414345', c3: '#e83e86', subtitle: '2ND REGULAR ALBUM' },
  'more-and-more': { c1: '#f12711', c2: '#f5af19', c3: '#91d1c1', subtitle: '9TH MINI ALBUM' },
  'feel-special': { c1: '#834d9b', c2: '#d04ed6', c3: '#f4a27e', subtitle: '8TH MINI ALBUM' },
  'fancy-you': { c1: '#ec008c', c2: '#fc6767', c3: '#3b0066', subtitle: '7TH MINI ALBUM' },
  'the-year-of-yes': { c1: '#d31027', c2: '#ea384d', c3: '#f8d7c9', subtitle: '3RD SPECIAL ALBUM' },
  'yes-or-yes': { c1: '#7b4397', c2: '#dc2430', c3: '#f2a77d', subtitle: '6TH MINI ALBUM' },
  'summer-nights': { c1: '#2193b0', c2: '#6dd5ed', c3: '#ff758c', subtitle: '2ND SPECIAL ALBUM' },
  'what-is-love': { c1: '#ff9a9e', c2: '#fecfef', c3: '#a1c4fd', subtitle: '5TH MINI ALBUM' },
  'merry-and-happy': { c1: '#11998e', c2: '#38ef7d', c3: '#ea384d', subtitle: '1ST ALBUM REPACKAGE' },
  'twicetagram': { c1: '#ff0844', c2: '#ffb199', c3: '#43e97b', subtitle: '1ST REGULAR ALBUM' },
  'signal': { c1: '#0052d4', c2: '#4364f7', c3: '#6fb1fc', subtitle: '4TH MINI ALBUM' },
  'twicecoaster-lane-2': { c1: '#f857a6', c2: '#ff5858', c3: '#fecfef', subtitle: 'SPECIAL ALBUM' },
  'twicecoaster-lane-1': { c1: '#fa709a', c2: '#fee140', c3: '#f857a6', subtitle: '3RD MINI ALBUM' },
  'page-two': { c1: '#91d1c1', c2: '#bdd36c', c3: '#f4a27e', subtitle: '2ND MINI ALBUM' },
  'best-2015-2025': { c1: '#2c3e50', c2: '#3498db', c3: '#e83e86', subtitle: 'COMPILATION · 50 TRACKS' },
  'enemy': { c1: '#1f1c2c', c2: '#928dab', c3: '#e83e86', subtitle: '6TH JAPANESE ALBUM' },
  'twice5': { c1: '#f093fb', c2: '#f5576c', c3: '#4facfe', subtitle: '5TH JAPANESE COMPILATION' },
  'dive': { c1: '#0052d4', c2: '#4364f7', c3: '#00d2ff', subtitle: '5TH JAPANESE ALBUM' },
  'dance-again': { c1: '#ff758c', c2: '#ff7eb3', c3: '#ffd700', subtitle: 'JAPAN DIGITAL SINGLE' },
  'hare-hare': { c1: '#f857a6', c2: '#ff5858', c3: '#00c6ff', subtitle: '10TH JAPANESE SINGLE' },
  'celebrate': { c1: '#ec008c', c2: '#fc6767', c3: '#f4a27e', subtitle: '4TH JAPANESE ALBUM' },
  'just-be-yourself': { c1: '#667eea', c2: '#764ba2', c3: '#fbc2eb', subtitle: 'JAPAN DIGITAL SINGLE' },
  'twice4': { c1: '#f093fb', c2: '#f5576c', c3: '#38ef7d', subtitle: '4TH JAPANESE COMPILATION' },
  'doughnut': { c1: '#e0c3fc', c2: '#8ec5fc', c3: '#ffffff', subtitle: '9TH JAPANESE SINGLE' },
  'perfect-world': { c1: '#cb2d3e', c2: '#ef473a', c3: '#000000', subtitle: '3RD JAPANESE ALBUM' },
  'kura-kura': { c1: '#f857a6', c2: '#ff5858', c3: '#ffd200', subtitle: '8TH JAPANESE SINGLE' },
  'better': { c1: '#1d2671', c2: '#c33764', c3: '#ffffff', subtitle: '7TH JAPANESE SINGLE' },
  'twice3': { c1: '#e14fad', c2: '#f9d423', c3: '#ff4e50', subtitle: '3RD JAPANESE COMPILATION' },
  'fanfare': { c1: '#f12711', c2: '#f5af19', c3: '#2980b9', subtitle: '6TH JAPANESE SINGLE' },
  'and-twice-repackage': { c1: '#2b5876', c2: '#4e4376', c3: '#e83e86', subtitle: 'REPACKAGE ALBUM' },
  'and-twice': { c1: '#114b5f', c2: '#028090', c3: '#f45b69', subtitle: '2ND JAPANESE ALBUM' },
  'breakthrough': { c1: '#141e30', c2: '#243b55', c3: '#ff416c', subtitle: '5TH JAPANESE SINGLE' },
  'happy-happy': { c1: '#f857a6', c2: '#ff5858', c3: '#fbc2eb', subtitle: '4TH JAPANESE SINGLE' },
  'twice2': { c1: '#ff9a9e', c2: '#fecfef', c3: '#f5576c', subtitle: '2ND JAPANESE COMPILATION' },
  'bdz-repackage': { c1: '#d31027', c2: '#ea384d', c3: '#ffffff', subtitle: 'JAPAN REPACKAGE' },
  'stay-by-my-side': { c1: '#e0c3fc', c2: '#8ec5fc', c3: '#ff758c', subtitle: 'DRAMA THEME SONG' },
  'bdz': { c1: '#eb3349', c2: '#f45c43', c3: '#1a1a1a', subtitle: '1ST JAPANESE ALBUM' },
  'bdz-digital': { c1: '#eb3349', c2: '#f45c43', c3: '#ffd700', subtitle: 'DIGITAL PRE-RELEASE' },
  'i-want-you-back': { c1: '#f857a6', c2: '#ff5858', c3: '#38ef7d', subtitle: 'MOVIE THEME SONG' },
  'wake-me-up': { c1: '#f3904f', c2: '#3b4371', c3: '#f5af19', subtitle: '3RD JAPANESE SINGLE' },
  'candy-pop': { c1: '#ff9a9e', c2: '#fecfef', c3: '#a1c4fd', subtitle: '2ND JAPANESE SINGLE' },
  'one-more-time': { c1: '#e83e86', c2: '#f4a27e', c3: '#ffffff', subtitle: '1ST JAPANESE SINGLE' },
  'twice1': { c1: '#f857a6', c2: '#ff5858', c3: '#ffffff', subtitle: '1ST JAPANESE COMPILATION' },
  'i-got-you': { c1: '#00c6ff', c2: '#0072ff', c3: '#ffffff', subtitle: 'ENGLISH SINGLE' },
  'the-remixes': { c1: '#141e30', c2: '#243b55', c3: '#00f2fe', subtitle: 'DIGITAL REMIX ALBUM' },
  'moonlight-sunrise': { c1: '#0f2027', c2: '#203a43', c3: '#2c5364', subtitle: 'ENGLISH SINGLE' },
  'the-feels': { c1: '#ec008c', c2: '#fc6767', c3: '#00f2fe', subtitle: 'ENGLISH SINGLE' },
  'more-and-more-english': { c1: '#f12711', c2: '#f5af19', c3: '#4facfe', subtitle: 'ENGLISH VERSION' },
};

// 3. GENERATORS
async function generateMemberImages() {
  const dir = path.join(process.cwd(), 'public', 'assets', 'members');
  fs.mkdirSync(dir, { recursive: true });

  for (const m of MEMBERS) {
    const svg = `
      <svg width="600" height="340" viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg-${m.id}" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${m.color}" />
            <stop offset="60%" stop-color="${m.secondary}" />
            <stop offset="100%" stop-color="#fff8f3" />
          </linearGradient>
          <radialGradient id="glow-${m.id}" cx="75%" cy="30%" r="60%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.8" />
            <stop offset="100%" stop-color="${m.color}" stop-opacity="0" />
          </radialGradient>
        </defs>

        <rect width="600" height="340" fill="url(#bg-${m.id})" />
        <rect width="600" height="340" fill="url(#glow-${m.id})" />

        <!-- Geometric Ornaments -->
        <circle cx="500" cy="80" r="130" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.4" />
        <circle cx="500" cy="80" r="80" fill="none" stroke="${m.color}" stroke-width="1.5" opacity="0.6" />
        <circle cx="120" cy="280" r="90" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.3" />

        <!-- Member Number Badge -->
        <rect x="36" y="32" width="70" height="26" rx="13" fill="#ffffff" opacity="0.92" />
        <text x="71" y="49" font-family="'Inter', system-ui, sans-serif" font-size="12" font-weight="900" fill="#251b26" text-anchor="middle" letter-spacing="1">#${m.num}</text>

        <!-- Symbol Avatar Circle -->
        <g transform="translate(430, 110)">
          <circle cx="60" cy="60" r="68" fill="#ffffff" filter="drop-shadow(0 10px 20px rgba(0,0,0,0.08))" />
          <circle cx="60" cy="60" r="62" fill="none" stroke="${m.color}" stroke-width="3" />
          <text x="60" y="78" font-size="52" text-anchor="middle">${m.symbol}</text>
        </g>

        <!-- Typography -->
        <text x="38" y="112" font-family="'Inter', sans-serif" font-size="13" font-weight="800" fill="#a93869" letter-spacing="3">TWICE MEMBER</text>
        <text x="38" y="180" font-family="'Newsreader', Georgia, serif" font-size="64" font-weight="400" fill="#251b26" letter-spacing="-1">${m.name}</text>
        <text x="40" y="215" font-family="'Inter', sans-serif" font-size="20" font-weight="700" fill="#5c485a" opacity="0.9">${m.hangul}</text>

        <!-- Role tag -->
        <rect x="38" y="254" width="280" height="32" rx="16" fill="rgba(255,255,255,0.85)" stroke="${m.color}" stroke-width="1" />
        <text x="52" y="275" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#302431">${m.role.replace(/&/g, '&amp;')}</text>
      </svg>
    `;

    const dest = path.join(dir, `${m.id}.webp`);
    await sharp(Buffer.from(svg)).webp({ quality: 90 }).toFile(dest);
    console.log(`Generated member image: ${dest}`);
  }
}

async function generateCharacterImages() {
  const dir = path.join(process.cwd(), 'public', 'assets', 'characters');
  fs.mkdirSync(dir, { recursive: true });

  // Lovelys
  for (const l of LOVELYS) {
    const svg = `
      <svg width="400" height="320" viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg-${l.id}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fff8f3" />
            <stop offset="50%" stop-color="${l.color}" stop-opacity="0.35" />
            <stop offset="100%" stop-color="${l.color}" stop-opacity="0.65" />
          </linearGradient>
        </defs>
        <rect width="400" height="320" fill="url(#bg-${l.id})" rx="12" />

        <!-- Halo glow -->
        <circle cx="200" cy="130" r="95" fill="#ffffff" opacity="0.8" />
        <circle cx="200" cy="130" r="75" fill="${l.color}" opacity="0.4" />

        <!-- Cute Mascot Face -->
        <g transform="translate(140, 70)">
          <!-- Heart ears / antenna -->
          <text x="60" y="55" font-size="64" text-anchor="middle">♡</text>
          <text x="60" y="60" font-size="34" text-anchor="middle">${l.ear}</text>
        </g>

        <!-- Banner -->
        <rect x="80" y="215" width="240" height="38" rx="19" fill="#ffffff" filter="drop-shadow(0 4px 10px rgba(0,0,0,0.06))" />
        <text x="200" y="240" font-family="'Newsreader', Georgia, serif" font-size="22" font-weight="600" fill="#251b26" text-anchor="middle">${l.name}</text>
        <text x="200" y="280" font-family="'Inter', sans-serif" font-size="11" font-weight="800" fill="#8873a8" text-anchor="middle" letter-spacing="1.5">LOVELY · ${l.member.toUpperCase()}</text>
      </svg>
    `;
    const dest = path.join(dir, `${l.id}.webp`);
    await sharp(Buffer.from(svg)).webp({ quality: 90 }).toFile(dest);
    console.log(`Generated Lovely image: ${dest}`);
  }

  // TDOONGZ
  for (const t of TDOONGZ) {
    const svg = `
      <svg width="400" height="320" viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg-${t.id}" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#f2ecfa" />
            <stop offset="50%" stop-color="#e3e0f5" />
            <stop offset="100%" stop-color="${t.color}" stop-opacity="0.45" />
          </linearGradient>
        </defs>
        <rect width="400" height="320" fill="url(#bg-${t.id})" rx="12" />

        <!-- Celestial star rings -->
        <circle cx="200" cy="125" r="90" fill="#ffffff" opacity="0.85" />
        <circle cx="200" cy="125" r="75" fill="none" stroke="#8873a8" stroke-width="1.5" stroke-dasharray="4,4" />

        <!-- Star Sparkles -->
        <text x="110" y="80" font-size="22" fill="#8873a8" opacity="0.7">✦</text>
        <text x="280" y="85" font-size="18" fill="#e83e86" opacity="0.7">✧</text>

        <!-- Mascot Icon -->
        <text x="200" y="145" font-size="52" text-anchor="middle">${t.icon}</text>

        <!-- Badge -->
        <rect x="70" y="215" width="260" height="40" rx="20" fill="#ffffff" filter="drop-shadow(0 4px 10px rgba(0,0,0,0.06))" />
        <text x="200" y="241" font-family="'Inter', sans-serif" font-size="16" font-weight="900" fill="#39243a" text-anchor="middle" letter-spacing="1">${t.name}</text>
        <text x="200" y="280" font-family="'Inter', sans-serif" font-size="11" font-weight="800" fill="#76618e" text-anchor="middle" letter-spacing="1.5">TDOONGZ · ${t.member.toUpperCase()}</text>
      </svg>
    `;
    const dest = path.join(dir, `${t.id}.webp`);
    await sharp(Buffer.from(svg)).webp({ quality: 90 }).toFile(dest);
    console.log(`Generated TDOONGZ image: ${dest}`);
  }
}

async function generateAlbumCovers() {
  const dir = path.join(process.cwd(), 'public', 'assets', 'covers');
  fs.mkdirSync(dir, { recursive: true });

  const releaseData = fs.readFileSync(path.join(process.cwd(), 'src', 'data', 'releases.ts'), 'utf8');
  const matches = [...releaseData.matchAll(/title:\s*'([^']+)'[\s\S]*?cover:\s*'([^']+)'/g)];

  for (const match of matches) {
    const title = match[1];
    const coverPath = match[2];
    const filename = path.basename(coverPath);
    const dest = path.join(dir, filename);

    // Skip if already generated (e.g. AI-generated covers for debut, formula, ten)
    if (fs.existsSync(dest) && fs.statSync(dest).size > 50000) {
      console.log(`Preserving existing high-res cover: ${filename}`);
      continue;
    }

    const key = filename.replace('.webp', '');
    const theme = ERA_THEMES[key] || { c1: '#e83e86', c2: '#f4a27e', c3: '#ffffff', subtitle: 'OFFICIAL RELEASE' };

    // Escape title for XML
    const escapedTitle = title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const fontSize = title.length > 18 ? 32 : title.length > 12 ? 40 : 48;

    const svg = `
      <svg width="500" height="500" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cover-grad-${key}" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${theme.c1}" />
            <stop offset="65%" stop-color="${theme.c2}" />
            <stop offset="100%" stop-color="${theme.c3}" />
          </linearGradient>
          <radialGradient id="vignette-${key}" cx="50%" cy="50%" r="70%">
            <stop offset="40%" stop-color="#000000" stop-opacity="0" />
            <stop offset="100%" stop-color="#000000" stop-opacity="0.55" />
          </radialGradient>
        </defs>

        <!-- Base Background -->
        <rect width="500" height="500" fill="url(#cover-grad-${key})" />
        <rect width="500" height="500" fill="url(#vignette-${key})" />

        <!-- Stylized Vinyl Grooves -->
        <circle cx="250" cy="250" r="210" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.25" />
        <circle cx="250" cy="250" r="160" fill="none" stroke="#ffffff" stroke-width="1.5" opacity="0.3" />
        <circle cx="250" cy="250" r="110" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.25" />

        <!-- TWICE Top Logo -->
        <g transform="translate(250, 60)">
          <text font-family="'Newsreader', Georgia, serif" font-size="28" font-weight="700" fill="#ffffff" text-anchor="middle" letter-spacing="5">TWICE</text>
        </g>

        <!-- Center Badge -->
        <circle cx="250" cy="245" r="95" fill="#ffffff" opacity="0.9" filter="drop-shadow(0 15px 30px rgba(0,0,0,0.25))" />
        <circle cx="250" cy="245" r="88" fill="none" stroke="${theme.c1}" stroke-width="2.5" />
        <text x="250" y="235" font-family="'Inter', sans-serif" font-size="11" font-weight="800" fill="${theme.c1}" text-anchor="middle" letter-spacing="2">ONCE UPON A TIMELINE</text>
        <text x="250" y="270" font-family="'Newsreader', Georgia, serif" font-size="26" font-style="italic" fill="#251b26" text-anchor="middle">Archive</text>

        <!-- Album Title -->
        <rect x="30" y="375" width="440" height="85" rx="8" fill="rgba(25, 18, 25, 0.75)" backdrop-filter="blur(10px)" />
        <text x="250" y="420" font-family="'Inter', system-ui, sans-serif" font-size="${fontSize}" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="-0.5">${escapedTitle}</text>
        <text x="250" y="445" font-family="'Inter', sans-serif" font-size="12" font-weight="800" fill="${theme.c2}" text-anchor="middle" letter-spacing="2">${theme.subtitle}</text>
      </svg>
    `;

    await sharp(Buffer.from(svg)).webp({ quality: 90 }).toFile(dest);
    console.log(`Generated album cover: ${dest}`);
  }
}

async function run() {
  console.log('--- Generating Member Images ---');
  await generateMemberImages();
  console.log('--- Generating Character Images ---');
  await generateCharacterImages();
  console.log('--- Generating Album Covers ---');
  await generateAlbumCovers();
  console.log('All assets generated successfully!');
}

run().catch(console.error);
