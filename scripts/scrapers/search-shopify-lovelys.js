import fs from 'fs';

async function searchShopify() {
  try {
    const res = await fetch('https://jypj-store.com/products.json?limit=250', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    const data = await res.json();
    console.log('Total products on jypj-store:', data.products?.length);
    const lovelyProducts = data.products?.filter(p => /lovely|navely|jeongvely|movely/i.test(p.title) || /lovely/i.test(p.handle));
    console.log('Lovely products found:', lovelyProducts?.map(p => ({
      title: p.title,
      images: p.images?.map(img => img.src)
    })));
  } catch(e) {
    console.error('Error:', e.message);
  }
}

searchShopify();
