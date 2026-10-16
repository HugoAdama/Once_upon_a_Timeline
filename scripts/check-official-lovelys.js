import fs from 'fs';

async function fetchPage(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.twicejapan.com/'
      }
    });
    const text = await res.text();
    const imgs = [...text.matchAll(/https?:\/\/[^\s"'<>]+\.(?:png|jpg|jpeg|webp)/gi)].map(m => m[0]);
    console.log(`URL: ${url}`);
    const relevant = imgs.filter(i => /lovely|navely|jeongvely|movely|savely|jively|mively|davely|chaengvely|tzuvely/i.test(i));
    console.log('Relevant images found:', relevant);
    return imgs;
  } catch(e) {
    console.error(`Error fetching ${url}:`, e.message);
    return [];
  }
}

async function main() {
  await fetchPage('https://www.twicejapan.com/feature/mufg_lovelycard');
  await fetchPage('https://www.twicejapan.com/feature/7th_anniversary_lovelys');
  await fetchPage('https://twice.jype.com/');
}

main();
