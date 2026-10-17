import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const MEMBERS = [
  {
    id: 'nayeon',
    name: 'Nayeon',
    current: 'Nayeon_251120_1.jpg',
    between: '220701_Nayeon(나연)_of_Twice_MusicBank_Fancam.jpg',
    classic: '20220121—Nayeon_나연_Campaign_Film,_Pearlygates_x_Twice_2022.jpg',
  },
  {
    id: 'jeongyeon',
    name: 'Jeongyeon',
    current: 'Twice_Jeongyeon_in_2023_03.jpg',
    between: '260306_Twice_Hamilton_Jeongyeon_트와이스_정연_(5)_(cropped).jpg',
    classic: '220328_Yoo_Jeong-yeon_TWICE_digital_film.jpg',
  },
  {
    id: 'momo',
    name: 'Momo',
    current: 'TWICE_MOMO_April_2024.jpg',
    between: '20220122—Momo_모모_Campaign_Film,_Pearlygates_x_Twice_2022.jpg',
    classic: '171030_트와이스_LIKEY_쇼케이스_모모_(2).jpg',
  },
  {
    id: 'sana',
    name: 'Sana',
    current: '2025_Sana_Minatozaki_from_TWICE.jpg',
    between: 'Sana_Minatozaki_in_April_2026.png',
    classic: '20220121—Sana_사나_Campaign_Film,_Pearlygates_x_Twice_2022.jpg',
  },
  {
    id: 'jihyo',
    name: 'Jihyo',
    current: 'TWICE_Jihyo_Fred_May_2024.jpg',
    between: '082726_Jihyo_at_The_Whoo_photocall_05.jpg',
    classic: '20220121—Jihyo_지효_Campaign_Film,_Pearlygates_x_Twice_2022.jpg',
  },
  {
    id: 'mina',
    name: 'Mina',
    current: '20260721_Mina_Myoi_03.jpg',
    between: 'Mina_Myoui_for_Pearly_Gates_Korea.jpg',
    classic: '20220121—Mina_미나_Campaign_Film,_Pearlygates_x_Twice_2022.jpg',
  },
  {
    id: 'dahyun',
    name: 'Dahyun',
    current: 'Dahyun_at_press_conference_for_You_Are_the_Apple_of_My_Eye_02_(cropped).png',
    between: '260618_Kim_Dahyun.png',
    classic: '20220121—Dahyun_다현_Campaign_Film,_Pearlygates_x_Twice_2022.jpg',
  },
  {
    id: 'chaeyoung',
    name: 'Chaeyoung',
    current: '241204_Chaeyoung_at_Rokh_H%26M_(2).png',
    between: "TWICE's_Chayeong_손채영_2024_04.png",
    classic: '20220121—Chaeyoung_채영_Campaign_Film,_Pearlygates_x_Twice_2022.jpg',
  },
  {
    id: 'tzuyu',
    name: 'Tzuyu',
    current: '20240305_Chou_Tzuyu_周子瑜_03.jpg',
    between: 'Twice_in_Seattle_2026_-_TWICE._Tzuyu_(55045325500)_(cropped).jpg',
    classic: '151020_트와이스_-_데뷔_쇼케이스_TWICE_-_Debut_Showcase_13.jpg',
  },
];

async function downloadFile(filename, outPath) {
  const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}?width=640`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      },
      redirect: 'follow',
    });
    if (!res.ok) {
      console.warn(`[${res.status}] Failed ${filename}`);
      return false;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    await sharp(buf)
      .resize(600, 380, { fit: 'cover', position: 'top' })
      .webp({ quality: 90 })
      .toFile(outPath);
    console.log(`Saved: ${path.basename(outPath)} (${fs.statSync(outPath).size} bytes)`);
    return true;
  } catch (err) {
    console.warn(`Error for ${filename}:`, err.message);
    return false;
  }
}

async function main() {
  const dir = path.join(process.cwd(), 'public', 'assets', 'members');
  fs.mkdirSync(dir, { recursive: true });

  for (const m of MEMBERS) {
    console.log(`\n=== Downloading real photos for ${m.name} ===`);
    const curPath = path.join(dir, `${m.id}-current.webp`);
    const betPath = path.join(dir, `${m.id}-between.webp`);
    const clsPath = path.join(dir, `${m.id}-classic.webp`);
    const defPath = path.join(dir, `${m.id}.webp`);

    await downloadFile(m.current, curPath);
    await downloadFile(m.between, betPath);
    await downloadFile(m.classic, clsPath);

    if (fs.existsSync(curPath)) {
      fs.copyFileSync(curPath, defPath);
    } else if (fs.existsSync(betPath)) {
      fs.copyFileSync(betPath, defPath);
    }
  }

  console.log('\nAll member real images across all eras downloaded successfully!');
}

main();
