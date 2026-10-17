import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Load the iTunes map
const itunesMap = JSON.parse(
  fs.readFileSync('C:/Users/PC/.gemini/antigravity-ide/brain/56cfa59c-05ec-44ec-80ba-65c6b8482129/scratch/itunes_albums.json', 'utf8')
);

// Map our 58 release files to their exact collectionName in itunesMap
const RELEASE_MAPPING = {
  // Korea
  'ten-the-story-goes-on.webp': 'TEN: The Story Goes On',
  'this-is-for.webp': 'THIS IS FOR',
  'strategy.webp': 'STRATEGY',
  'with-you-th.webp': 'With YOU-th',
  'ready-to-be.webp': 'READY TO BE',
  'between-1-2.webp': 'BETWEEN 1&2',
  'formula-of-love.webp': 'Formula of Love: O+T=<3',
  'taste-of-love.webp': 'Taste of Love - EP',
  'cry-for-me.webp': 'CRY FOR ME - Single',
  'eyes-wide-open.webp': 'Eyes wide open',
  'more-and-more.webp': 'MORE & MORE',
  'feel-special.webp': 'Feel Special',
  'fancy-you.webp': 'FANCY YOU - EP',
  'the-year-of-yes.webp': 'The year of "YES"',
  'yes-or-yes.webp': 'YES or YES',
  'summer-nights.webp': 'Summer Nights',
  'what-is-love.webp': 'What is Love? - EP',
  'merry-and-happy.webp': 'Merry & Happy',
  'twicetagram.webp': 'Twicetagram',
  'signal.webp': 'Signal - EP',
  'twicecoaster-lane-2.webp': 'TWICEcoaster : LANE2',
  'twicecoaster-lane-1.webp': 'TWICEcoaster: LANE1',
  'page-two.webp': 'Page Two - EP',
  'the-story-begins.webp': 'The Story Begins - EP',

  // Japan
  'best-2015-2025.webp': 'TWICE BEST ALBUM「#BEST 2015-2025」',
  'enemy.webp': 'ENEMY',
  'twice5.webp': '#TWICE5 -Japanese ver.-',
  'dive.webp': 'DIVE',
  'dance-again.webp': 'Dance Again - Single',
  'hare-hare.webp': 'Hare Hare - EP',
  'celebrate.webp': 'Celebrate',
  'just-be-yourself.webp': 'Just be yourself - Single',
  'twice4.webp': '#TWICE4 (Japanese ver.) - EP',
  'doughnut.webp': 'Doughnut - EP',
  'perfect-world.webp': 'Perfect World',
  'kura-kura.webp': 'Kura Kura - EP',
  'better.webp': 'BETTER - EP',
  'twice3.webp': '#TWICE3 (Japanese Version) - EP',
  'fanfare.webp': 'Fanfare - EP',
  'and-twice-repackage.webp': '&TWICE (Repackage)',
  'and-twice.webp': '&TWICE',
  'breakthrough.webp': 'Breakthrough - EP',
  'happy-happy.webp': 'HAPPY HAPPY - EP',
  'twice2.webp': '#TWICE2 (Japanese Version) - EP',
  'bdz-repackage.webp': 'BDZ - Repackage -',
  'stay-by-my-side.webp': 'STAY BY MY SIDE - Single',
  'bdz.webp': 'BDZ',
  'bdz-digital.webp': 'BDZ - Single',
  'i-want-you-back.webp': 'I WANT YOU BACK - Single',
  'wake-me-up.webp': 'Wake Me Up - EP',
  'candy-pop.webp': 'Candy Pop - EP',
  'one-more-time.webp': 'One More Time - EP',
  'twice1.webp': '#TWICE - EP',

  // Global
  'i-got-you.webp': 'I GOT YOU - Single',
  'the-remixes.webp': 'THE REMIXES',
  'moonlight-sunrise.webp': 'MOONLIGHT SUNRISE - Single',
  'the-feels.webp': 'The Feels - Single',
  'more-and-more-english.webp': 'MORE & MORE (English Ver.) - Single',
};

const BROWSER_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept': 'image/avif,image/webp,image/apng,image/jpeg,image/*,*/*;q=0.8',
};

async function downloadCover(targetFilename, collectionName) {
  let imgUrl = itunesMap[collectionName];
  if (!imgUrl) {
    // Try fuzzy match
    const foundKey = Object.keys(itunesMap).find(k => k.toLowerCase().includes(collectionName.toLowerCase()));
    if (foundKey) {
      imgUrl = itunesMap[foundKey];
    }
  }

  if (!imgUrl) {
    console.warn(`[SKIP] No iTunes cover found for ${targetFilename} (${collectionName})`);
    return false;
  }

  // Ensure high-res 600x600 or 1000x1000
  const highResUrl = imgUrl.replace(/\/\d+x\d+bb\./, '/600x600bb.');

  const res = await fetch(highResUrl, { headers: BROWSER_HEADERS });
  if (!res.ok) {
    console.warn(`[HTTP ${res.status}] Failed downloading ${highResUrl}`);
    return false;
  }

  const rawBuffer = Buffer.from(await res.arrayBuffer());
  const destPath = path.join(process.cwd(), 'public', 'assets', 'covers', targetFilename);

  await sharp(rawBuffer)
    .resize(600, 600, {
      fit: 'cover',
      position: 'center',
    })
    .webp({ quality: 92, effort: 5 })
    .toFile(destPath);

  const stats = fs.statSync(destPath);
  console.log(`[SUCCESS] ${targetFilename} saved (${stats.size} bytes) from "${collectionName}"`);
  return true;
}

async function main() {
  const coversDir = path.join(process.cwd(), 'public', 'assets', 'covers');
  fs.mkdirSync(coversDir, { recursive: true });

  console.log('Downloading all official album covers for TWICE...');
  let successCount = 0;
  let total = Object.keys(RELEASE_MAPPING).length;

  for (const [file, collectionName] of Object.entries(RELEASE_MAPPING)) {
    try {
      const ok = await downloadCover(file, collectionName);
      if (ok) successCount++;
    } catch (err) {
      console.error(`[ERROR] ${file}:`, err.message);
    }
    // Small pause to be polite
    await new Promise(r => setTimeout(r, 150));
  }

  console.log(`\nFINISHED: ${successCount} / ${total} covers successfully updated!`);
}

main().catch(console.error);
