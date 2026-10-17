const fs = require('fs');

async function check() {
  const url = 'https://thejypshop.com/product/search.html?keyword=TDOONG';
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } });
  const html = await res.text();
  // check if there are no items
  if (html.includes('noData') || html.includes('검색결과가 없습니다')) {
    console.log('No results found for TDOONG on thejypshop');
  } else {
    console.log('Results found, search for product links');
    const prdLinks = [...html.matchAll(/href=["'](\/product\/[^"']+)["']/g)].map(m => m[1]);
    console.log('Product links:', [...new Set(prdLinks)]);
  }
}
check();
