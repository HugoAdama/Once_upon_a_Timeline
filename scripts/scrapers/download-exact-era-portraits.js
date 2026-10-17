import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const BROWSER_HEADERS = {
  'User-Agent': 'TwiceEraPortraitsArchiver/2.0 (contact: archive@once.timeline.org)',
  'Referer': 'https://commons.wikimedia.org/',
};

const ERA_SELECTION = [
  {
    id: 'nayeon',
    classic: 'File:Nayeon in 2017 Fan meeting.jpg',
    between: 'File:220701 Nayeon(나연) of Twice MusicBank Fancam.jpg',
    current: 'File:241024 TWICE Nayeon.jpg',
  },
  {
    id: 'jeongyeon',
    classic: 'File:Jeongyeon in 2017.jpg',
    between: 'File:220328 Yoo Jeong-yeon TWICE digital film.jpg',
    current: 'File:Twice Jeongyeon in 2023 03.jpg',
  },
  {
    id: 'momo',
    classic: 'File:171030 트와이스 LIKEY 쇼케이스 모모 (2).jpg',
    between: 'File:Momo in 2022.jpg',
    current: 'File:TWICE MOMO April 2024.jpg',
  },
  {
    id: 'sana',
    classic: 'File:(17.05.26)뮤직뱅크 TWICE 사나 (1).jpg',
    between: 'File:Sana in an fan-event in 2022 (cropped).jpg',
    current: 'File:20240809 Sana Minatozaki 湊﨑 紗夏 for PRADA 2024 01.jpg',
  },
  {
    id: 'jihyo',
    classic: 'File:170610 영등포팬싸 지효.jpg',
    between: 'File:Jihyo in 2022.jpg',
    current: 'File:TWICE Jihyo Fred May 2024.jpg',
  },
  {
    id: 'mina',
    classic: 'File:Mina in 2017.jpg',
    between: 'File:Mina in 2022.jpg',
    current: 'File:Mina Sharon Myoui 名井 南 2024 01.png',
  },
  {
    id: 'dahyun',
    classic: 'File:Dahyun in 2017.jpg',
    between: 'File:Dahyun 2022.jpg',
    current: 'File:DAHYUN (다현) – 2024.02.12 – P1.png',
  },
  {
    id: 'chaeyoung',
    classic: 'File:171015 경희대 평화의전당 팬미팅 트와이스 채영 (1).jpg',
    between: 'File:Chaeyoung in 2022 01.jpg',
    current: 'File:241204 Chaeyoung at Rokh H&M (2).png',
  },
  {
    id: 'tzuyu',
    classic: 'File:17.05.26 뮤직뱅크 TWICE 쯔위 (2).jpg',
    between: 'File:Tzuyu in 2022.jpg',
    current: 'File:20240305 Chou Tzuyu 周子瑜 01.jpg',
  },
];

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function getWikimediaUrl(fileTitle) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(fileTitle)}&prop=imageinfo&iiprop=url&format=json`;
  const res = await fetch(url, { headers: BROWSER_HEADERS });
  if (!res.ok) return null;
  const data = await res.json();
  const page = Object.values(data.query?.pages || {})[0];
  return page?.imageinfo?.[0]?.url || null;
}

async function downloadAndProcess(url, outPath) {
  const res = await fetch(url, { headers: BROWSER_HEADERS });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());

  await sharp(buffer)
    .resize(540, 660, {
      fit: 'cover',
      position: sharp.strategy.attention,
    })
    .webp({ quality: 92 })
    .toFile(outPath);

  console.log(`Saved: ${path.basename(outPath)} (${fs.statSync(outPath).size} bytes)`);
}

async function main() {
  const membersDir = path.join(process.cwd(), 'public', 'assets', 'members');
  fs.mkdirSync(membersDir, { recursive: true });

  for (const m of ERA_SELECTION) {
    console.log(`\n================== Processing ${m.id} ==================`);
    
    // 1. Classic (2015-2018)
    try {
      await sleep(1100);
      const url = await getWikimediaUrl(m.classic);
      if (url) {
        await sleep(1100);
        await downloadAndProcess(url, path.join(membersDir, `${m.id}-classic.webp`));
      } else {
        console.warn(`Could not get url for classic: ${m.classic}`);
      }
    } catch (e) {
      console.warn(`Classic error ${m.id}:`, e.message);
    }

    // 2. Between (2021-2022)
    try {
      await sleep(1100);
      const url = await getWikimediaUrl(m.between);
      if (url) {
        await sleep(1100);
        await downloadAndProcess(url, path.join(membersDir, `${m.id}-between.webp`));
      } else {
        console.warn(`Could not get url for between: ${m.between}`);
      }
    } catch (e) {
      console.warn(`Between error ${m.id}:`, e.message);
    }

    // 3. Current (2023-2025)
    try {
      await sleep(1100);
      const url = await getWikimediaUrl(m.current);
      if (url) {
        await sleep(1100);
        const curPath = path.join(membersDir, `${m.id}-current.webp`);
        await downloadAndProcess(url, curPath);
        // Also copy as default avatar
        fs.copyFileSync(curPath, path.join(membersDir, `${m.id}.webp`));
      } else {
        console.warn(`Could not get url for current: ${m.current}`);
      }
    } catch (e) {
      console.warn(`Current error ${m.id}:`, e.message);
    }
  }

  console.log('\nAll era portraits updated successfully!');
}

main().catch(console.error);
