const fs = require('fs');

async function download() {
  const url = 'https://1kpop.cl/wp-content/uploads/2026/10/Captura-de-pantalla-2026-10-08-a-las-10.51.04-a.m-720x480.png';
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync('tdoongz_screenshot.png', buf);
  console.log('Saved tdoongz_screenshot.png, size:', buf.length);
}
download();
