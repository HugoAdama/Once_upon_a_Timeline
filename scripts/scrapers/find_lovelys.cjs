const fs = require('fs');

async function main() {
  const urls = [
    'https://www.twicejapan.com/',
    'https://oncejapan.com/',
    'https://www.twicejapan.com/feature/lovelys_sanrio',
    'https://jypj-store.com/collections/twice-lovelys?page=1',
    'https://jypj-store.com/collections/twice-lovelys?page=2'
  ];
  for (const u of urls) {
    try {
      const res = await fetch(u, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      });
      const html = await res.text();
      const imgs = (html.match(/https?:\/\/[^"'\s<>]+\.(png|jpg|webp)/gi) || [])
        .filter(img => /lovely|navely|jeongvely|movely|savely|jively|mively|davely|chaengvely|tzuvely/i.test(img));
      console.log(u, '=> found:', imgs.length);
      imgs.slice(0, 5).forEach(img => console.log('  ', img));
    } catch (e) {
      console.log(u, 'error:', e.message);
    }
  }
}
main();
