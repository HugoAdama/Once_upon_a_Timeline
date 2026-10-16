const fs = require('fs');

async function check() {
  const query = 'TDOONG';
  const url = `https://thejypshop.com/product/search.html?keyword=${query}`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const html = await res.text();
    console.log('TDOONG on thejypshop HTML length:', html.length);
    const hasProducts = html.includes('prdImg') || html.includes('thumbnail');
    console.log('hasProducts:', hasProducts);
  } catch (e) {
    console.error(e.message);
  }
}
check();
