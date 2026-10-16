import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const BROWSER_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Referer': 'https://commons.wikimedia.org/',
  'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
};

const MEMBERS_CONFIG = [
  {
    id: 'nayeon',
    name: 'Nayeon',
    classic: 'File:Nayeon in 2017 Fan meeting.jpg',
    between: 'File:20220121—Nayeon 나연 Campaign Film, Pearlygates x Twice 2022.jpg',
    current: 'File:241024 TWICE Nayeon.jpg',
  },
  {
    id: 'jeongyeon',
    name: 'Jeongyeon',
    classic: 'File:Jeongyeon in 2017.jpg',
    between: 'File:220328 Yoo Jeong-yeon TWICE digital film.jpg',
    current: 'File:Twice Jeongyeon in 2023 03.jpg',
  },
  {
    id: 'momo',
    name: 'Momo',
    classic: 'File:Momo in 2017 Fan meeting.jpg',
    between: 'File:20220122—Momo 모모 Campaign Film, Pearlygates x Twice 2022.jpg',
    current: 'File:20220122—Momo 모모 Campaign Film, Pearlygates x Twice 2022.jpg',
  },
  {
    id: 'sana',
    name: 'Sana',
    classic: 'File:Sana in 2017 Fan meeting.jpg',
    between: 'File:20220121—Sana 사나 Campaign Film, Pearlygates x Twice 2022.jpg',
    current: 'File:TWICE SANA Airport Departure on 20250118 01.png',
  },
  {
    id: 'jihyo',
    name: 'Jihyo',
    classic: 'File:Jihyo in 2017.jpg',
    between: 'File:20220121—Jihyo 지효 Campaign Film, Pearlygates x Twice 2022.jpg',
    current: 'File:JIHYO (지효) – FANCAM – 2023.08.26 – P3.png',
  },
  {
    id: 'mina',
    name: 'Mina',
    classic: 'File:Mina in 2017.jpg',
    between: 'File:20220121—Mina 미나 Campaign Film, Pearlygates x Twice 2022.jpg',
    current: 'File:Mina Myoui for Pearly Gates Korea.jpg',
  },
  {
    id: 'dahyun',
    name: 'Dahyun',
    classic: 'File:Dahyun in 2017.jpg',
    between: 'File:20220121—Dahyun 다현 Campaign Film, Pearlygates x Twice 2022.jpg',
    current: 'File:20220121—Dahyun 다현 Campaign Film, Pearlygates x Twice 2022.jpg',
  },
  {
    id: 'chaeyoung',
    name: 'Chaeyoung',
    classic: 'File:Son Chaeyoung in 2015.jpg',
    between: 'File:20220121—Chaeyoung 채영 Campaign Film, Pearlygates x Twice 2022.jpg',
    current: 'File:20220121—Chaeyoung 채영 Campaign Film, Pearlygates x Twice 2022.jpg',
  },
  {
    id: 'tzuyu',
    name: 'Tzuyu',
    classic: 'File:Tzuyu in 2017 Fan meeting.jpg',
    between: 'File:20220121—Tzuyu Campaign Film, Pearlygates x Twice 2022.jpg',
    current: 'File:20220121—Tzuyu Campaign Film, Pearlygates x Twice 2022.jpg',
  },
];

async function getImageUrl(fileTitle) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(fileTitle)}&prop=imageinfo&iiprop=url&format=json`;
  const res = await fetch(url, { headers: BROWSER_HEADERS });
  const data = await res.json();
  const page = Object.values(data.query.pages)[0];
  return page?.imageinfo?.[0]?.url || null;
}

async function downloadAndProcess(url, outPath) {
  const res = await fetch(url, { headers: BROWSER_HEADERS });
  if (!res.ok) throw new Error(`HTTP ${res.status} from ${url}`);
  const buffer = Buffer.from(await res.arrayBuffer());

  await sharp(buffer)
    .resize(600, 380, {
      fit: 'cover',
      position: 'top',
    })
    .webp({ quality: 88 })
    .toFile(outPath);

  console.log(`Saved: ${path.basename(outPath)} (${fs.statSync(outPath).size} bytes)`);
}

async function main() {
  const membersDir = path.join(process.cwd(), 'public', 'assets', 'members');
  fs.mkdirSync(membersDir, { recursive: true });

  for (const m of MEMBERS_CONFIG) {
    console.log(`\n=== Processing real photos for ${m.name} ===`);

    // 1. Between Era
    try {
      const betweenUrl = await getImageUrl(m.between);
      if (betweenUrl) {
        const dest = path.join(membersDir, `${m.id}-between.webp`);
        await downloadAndProcess(betweenUrl, dest);
        // Default photo
        fs.copyFileSync(dest, path.join(membersDir, `${m.id}.webp`));
      }
    } catch (err) {
      console.warn(`[Between] ${m.name}:`, err.message);
    }

    // 2. Classic Era (2015-2018)
    try {
      const classicUrl = await getImageUrl(m.classic);
      if (classicUrl) {
        const dest = path.join(membersDir, `${m.id}-classic.webp`);
        await downloadAndProcess(classicUrl, dest);
      }
    } catch (err) {
      console.warn(`[Classic] ${m.name}:`, err.message);
    }

    // 3. Current Era (2023-2025)
    try {
      const currentUrl = await getImageUrl(m.current);
      if (currentUrl) {
        const dest = path.join(membersDir, `${m.id}-current.webp`);
        await downloadAndProcess(currentUrl, dest);
      }
    } catch (err) {
      console.warn(`[Current] ${m.name}:`, err.message);
    }
  }

  console.log('\nAll member real images downloaded and optimized!');
}

main().catch(console.error);
