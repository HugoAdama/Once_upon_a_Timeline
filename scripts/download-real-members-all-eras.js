import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const BROWSER_HEADERS = {
  'User-Agent': 'TwiceTimelineArchive/2.0 (https://github.com/HugoAdama/Once_upon_a_Timeline; contact: archive@once.timeline.org) node-fetch/3.0',
  'Referer': 'https://en.wikipedia.org/',
};

const ERA_MAP = [
  {
    id: 'nayeon',
    current: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Nayeon_251120_1.jpg',
    between: 'https://upload.wikimedia.org/wikipedia/commons/5/55/220701_Nayeon%28%EB%82%98%EC%97%B0%29_of_Twice_MusicBank_Fancam.jpg',
    classic: 'https://upload.wikimedia.org/wikipedia/commons/8/89/20220121%E2%80%94Nayeon_%EB%82%98%EC%97%B0_Campaign_Film%2C_Pearlygates_x_Twice_2022.jpg',
  },
  {
    id: 'jeongyeon',
    current: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/260306_Twice_Hamilton_Jeongyeon_%ED%8A%B8%EC%99%80%EC%9D%B4%EC%8A%A4_%EC%A0%95%EC%97%B0_%287%29_%28cropped%29.jpg',
    between: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/260306_Twice_Hamilton_Jeongyeon_%ED%8A%B8%EC%99%80%EC%9D%B4%EC%8A%A4_%EC%A0%95%EC%97%B0_%285%29_%28cropped%29.jpg',
    classic: 'https://upload.wikimedia.org/wikipedia/commons/8/81/220328_Yoo_Jeong-yeon_TWICE_digital_film.jpg',
  },
  {
    id: 'momo',
    current: 'https://upload.wikimedia.org/wikipedia/commons/0/08/TWICE_MOMO_April_2024.jpg',
    between: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/20220122%E2%80%94Momo_%EB%AA%A8%EB%AA%A8_Campaign_Film%2C_Pearlygates_x_Twice_2022.jpg',
    classic: 'https://upload.wikimedia.org/wikipedia/commons/4/40/171030_%ED%8A%B8%EC%99%80%EC%9D%B4%EC%8A%A4_LIKEY_%EC%87%BC%EC%BC%80%EC%9D%B4%EC%8A%A4_%EB%AA%A8%EB%AA%A8_%282%29.jpg',
  },
  {
    id: 'sana',
    current: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/2025_Sana_Minatozaki_from_TWICE.jpg',
    between: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Sana_Minatozaki_in_April_2026.png',
    classic: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/20220121%E2%80%94Sana_%EC%82%AC%EB%82%98_Campaign_Film%2C_Pearlygates_x_Twice_2022.jpg',
  },
  {
    id: 'jihyo',
    current: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/TWICE_Jihyo_Fred_May_2024.jpg',
    between: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/082726_Jihyo_at_The_Whoo_photocall_05.jpg',
    classic: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/20220121%E2%80%94Jihyo_%EC%A7%80%ED%9A%A8_Campaign_Film%2C_Pearlygates_x_Twice_2022.jpg',
  },
  {
    id: 'mina',
    current: 'https://upload.wikimedia.org/wikipedia/commons/4/45/20260721_Mina_Myoi_03.jpg',
    between: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Mina_Myoui_for_Pearly_Gates_Korea.jpg',
    classic: 'https://upload.wikimedia.org/wikipedia/commons/3/35/20220121%E2%80%94Mina_%EB%AF%B8%EB%82%98_Campaign_Film%2C_Pearlygates_x_Twice_2022.jpg',
  },
  {
    id: 'dahyun',
    current: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Dahyun_at_press_conference_for_You_Are_the_Apple_of_My_Eye_02_%28cropped%29.png',
    between: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/260618_Kim_Dahyun.png',
    classic: 'https://upload.wikimedia.org/wikipedia/commons/0/02/20220121%E2%80%94Dahyun_%EB%8B%A4%ED%98%84_Campaign_Film%2C_Pearlygates_x_Twice_2022.jpg',
  },
  {
    id: 'chaeyoung',
    current: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/241204_Chaeyoung_at_Rokh_H%26M_%282%29.png',
    between: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/TWICE%27s_Chayeong_%EC%86%90%EC%B1%84%EC%98%81_2024_04.png',
    classic: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Twice_in_Seattle_2026_-_TWICE._Chaeyoung_%2855045248379%29.jpg',
  },
  {
    id: 'tzuyu',
    current: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/20240305_Chou_Tzuyu_%E5%91%A8%E5%AD%90%E7%91%9C_03.jpg',
    between: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Twice_in_Seattle_2026_-_TWICE._Tzuyu_%2855045325500%29_%28cropped%29.jpg',
    classic: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/151020_%ED%8A%B8%EC%99%80%EC%9D%B4%EC%8A%A4_-_%EB%8D%B0%EB%B7%94_%EC%87%BC%EC%BC%80%EC%9D%B4%EC%8A%A4_TWICE_-_Debut_Showcase_13.jpg',
  },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function downloadPhoto(url, outPath) {
  try {
    await sleep(1100);
    const res = await fetch(url, { headers: BROWSER_HEADERS });
    if (!res.ok) {
      console.warn(`Failed ${url}: HTTP ${res.status}`);
      return false;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    await sharp(buf)
      .resize(540, 660, { fit: 'cover', position: sharp.strategy.attention })
      .webp({ quality: 92 })
      .toFile(outPath);
    console.log(`Saved real portrait photo: ${path.basename(outPath)} (${fs.statSync(outPath).size} bytes)`);
    return true;
  } catch (err) {
    console.warn(`Error for ${outPath}:`, err.message);
    return false;
  }
}

async function main() {
  const dir = path.join(process.cwd(), 'public', 'assets', 'members');
  fs.mkdirSync(dir, { recursive: true });

  for (const item of ERA_MAP) {
    console.log(`\n=== Downloading real photos for ${item.id} ===`);
    // Current
    const curPath = path.join(dir, `${item.id}-current.webp`);
    await downloadPhoto(item.current, curPath);

    // Between
    const betPath = path.join(dir, `${item.id}-between.webp`);
    await downloadPhoto(item.between, betPath);

    // Classic
    const clsPath = path.join(dir, `${item.id}-classic.webp`);
    await downloadPhoto(item.classic, clsPath);

    // Set default photo to current or between
    const defPath = path.join(dir, `${item.id}.webp`);
    if (fs.existsSync(curPath)) {
      fs.copyFileSync(curPath, defPath);
    } else if (fs.existsSync(betPath)) {
      fs.copyFileSync(betPath, defPath);
    }
  }

  console.log('\nAll real member photos processed!');
}

main();
