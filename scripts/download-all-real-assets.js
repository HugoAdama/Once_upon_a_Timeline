import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const BROWSER_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  'Referer': 'https://commons.wikimedia.org/',
  'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const REAL_MEMBERS = [
  {
    id: 'nayeon',
    between: 'File:20220121—Nayeon 나연 Campaign Film, Pearlygates x Twice 2022.jpg',
    classic: 'File:Nayeon in 2017 Fan meeting.jpg',
    current: 'File:241024 TWICE Nayeon.jpg',
  },
  {
    id: 'jeongyeon',
    between: 'File:220328 Yoo Jeong-yeon TWICE digital film.jpg',
    classic: 'File:Jeongyeon in 2017.jpg',
    current: 'File:Twice Jeongyeon in 2023 03.jpg',
  },
  {
    id: 'momo',
    between: 'File:20220122—Momo 모모 Campaign Film, Pearlygates x Twice 2022.jpg',
    classic: 'File:Momo in 2017 Fan meeting.jpg',
    current: 'File:20220122—Momo 모모 Campaign Film, Pearlygates x Twice 2022.jpg',
  },
  {
    id: 'sana',
    between: 'File:20220121—Sana 사나 Campaign Film, Pearlygates x Twice 2022.jpg',
    classic: 'File:Sana in 2017 Fan meeting.jpg',
    current: 'File:TWICE SANA Airport Departure on 20250118 01.png',
  },
  {
    id: 'jihyo',
    between: 'File:20220121—Jihyo 지효 Campaign Film, Pearlygates x Twice 2022.jpg',
    classic: 'File:Jihyo in 2017.jpg',
    current: 'File:JIHYO (지효) – FANCAM – 2023.08.26 – P3.png',
  },
  {
    id: 'mina',
    between: 'File:20220121—Mina 미나 Campaign Film, Pearlygates x Twice 2022.jpg',
    classic: 'File:Mina in 2017.jpg',
    current: 'File:Mina Myoui for Pearly Gates Korea.jpg',
  },
  {
    id: 'dahyun',
    between: 'File:20220121—Dahyun 다현 Campaign Film, Pearlygates x Twice 2022.jpg',
    classic: 'File:Dahyun in 2017.jpg',
    current: 'File:20220121—Dahyun 다현 Campaign Film, Pearlygates x Twice 2022.jpg',
  },
  {
    id: 'chaeyoung',
    between: 'File:20220121—Chaeyoung 채영 Campaign Film, Pearlygates x Twice 2022.jpg',
    classic: 'File:Son Chaeyoung in 2015.jpg',
    current: 'File:20220121—Chaeyoung 채영 Campaign Film, Pearlygates x Twice 2022.jpg',
  },
  {
    id: 'tzuyu',
    between: 'File:20220121—Tzuyu Campaign Film, Pearlygates x Twice 2022.jpg',
    classic: 'File:Tzuyu in 2017 Fan meeting.jpg',
    current: 'File:20220121—Tzuyu Campaign Film, Pearlygates x Twice 2022.jpg',
  },
];

async function getWikimediaUrl(fileTitle) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(fileTitle)}&prop=imageinfo&iiprop=url&format=json`;
  const res = await fetch(url, { headers: BROWSER_HEADERS });
  if (!res.ok) return null;
  const data = await res.json();
  const page = Object.values(data.query.pages)[0];
  return page?.imageinfo?.[0]?.url || null;
}

async function downloadAndSave(url, outPath) {
  const res = await fetch(url, { headers: BROWSER_HEADERS });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());

  await sharp(buffer)
    .resize(600, 380, {
      fit: 'cover',
      position: 'top',
    })
    .webp({ quality: 90 })
    .toFile(outPath);

  console.log(`Saved: ${path.basename(outPath)} (${fs.statSync(outPath).size} bytes)`);
}

async function main() {
  const membersDir = path.join(process.cwd(), 'public', 'assets', 'members');
  fs.mkdirSync(membersDir, { recursive: true });

  for (const m of REAL_MEMBERS) {
    console.log(`\nProcessing ${m.id}...`);

    // 1. Between
    const betweenPath = path.join(membersDir, `${m.id}-between.webp`);
    if (!fs.existsSync(betweenPath)) {
      try {
        await delay(1200);
        const url = await getWikimediaUrl(m.between);
        if (url) {
          await delay(1200);
          await downloadAndSave(url, betweenPath);
          fs.copyFileSync(betweenPath, path.join(membersDir, `${m.id}.webp`));
        }
      } catch (e) {
        console.warn(`Between ${m.id}:`, e.message);
      }
    } else {
      console.log(`Already have between for ${m.id}`);
    }

    // 2. Classic
    const classicPath = path.join(membersDir, `${m.id}-classic.webp`);
    if (!fs.existsSync(classicPath)) {
      try {
        await delay(1200);
        const url = await getWikimediaUrl(m.classic);
        if (url) {
          await delay(1200);
          await downloadAndSave(url, classicPath);
        }
      } catch (e) {
        console.warn(`Classic ${m.id}:`, e.message);
      }
    } else {
      console.log(`Already have classic for ${m.id}`);
    }

    // 3. Current
    const currentPath = path.join(membersDir, `${m.id}-current.webp`);
    if (!fs.existsSync(currentPath)) {
      try {
        await delay(1200);
        const url = await getWikimediaUrl(m.current);
        if (url) {
          await delay(1200);
          await downloadAndSave(url, currentPath);
        }
      } catch (e) {
        console.warn(`Current ${m.id}:`, e.message);
      }
    } else {
      console.log(`Already have current for ${m.id}`);
    }
  }

  console.log('\nAll member real images downloaded and optimized!');
}

main().catch(console.error);
