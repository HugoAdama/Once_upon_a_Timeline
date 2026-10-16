import fs from 'fs';

async function searchJypj() {
  try {
    const res = await fetch('https://jypj-store.com/collections/twice-official-goods', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    const text = await res.text();
    const imgs = [...text.matchAll(/https?:\/\/[^\s"'<>]+\.(?:png|jpg|jpeg|webp)/gi)].map(m => m[0]);
    console.log('Total images found on JYP Store:', imgs.length);
    const lovelyImgs = imgs.filter(i => /lovely/i.test(i));
    console.log('Lovely images:', lovelyImgs);
  } catch(e) {
    console.error('Error:', e.message);
  }
}

searchJypj();
