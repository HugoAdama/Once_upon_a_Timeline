const sharp = require('sharp');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'assets', 'characters');

const crops = [
  // 1. Myodette (Mina - penguin)
  { id: 'myodette', left: 0, top: 250, width: 170, height: 170 },
  // 2. Yubbuibbui (Jeongyeon - black puppy)
  { id: 'yubbuibbui', left: 60, top: 160, width: 150, height: 150 },
  // 3. Parkzyoni (Jihyo - sleepy pink bear)
  { id: 'parkzyoni', left: 140, top: 250, width: 150, height: 150 },
  // 4. Sonchaetty (Chaeyoung - white tiger)
  { id: 'sonchaetty', left: 215, top: 160, width: 140, height: 140 },
  // 5. Shyam Shyam (Sana - purple deer)
  { id: 'shyam-shyam', left: 270, top: 260, width: 165, height: 165 },
  // 6. Imnabong (Nayeon - floppy rabbit)
  { id: 'imnabong', left: 345, top: 155, width: 165, height: 155 },
  // 7. Dupnyangee (Dahyun - white cat with scarf)
  { id: 'dupnyangee', left: 430, top: 245, width: 150, height: 155 },
  // 8. Mokuring (Momo - flying baby bear)
  { id: 'mokuring', left: 495, top: 90, width: 140, height: 145 },
  // 9. Tzukumi (Tzuyu - yellow unicorn)
  { id: 'tzukumi', left: 565, top: 240, width: 150, height: 165 },
];

async function run() {
  for (const c of crops) {
    const target = path.join(outDir, `${c.id}.webp`);
    await sharp('tdoongz_screenshot.png')
      .extract({ left: c.left, top: c.top, width: c.width, height: c.height })
      .resize(400, 400, { fit: 'cover' })
      .webp({ quality: 90 })
      .toFile(target);
    console.log(`[OK] Extracted ${c.id}.webp`);
  }
}
run();
