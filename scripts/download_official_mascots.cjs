const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const mascotsOfficial = [
  { id: 'navely', name: 'Navely', member: 'Nayeon', url: 'https://cdn.shopify.com/s/files/1/0537/6835/6036/files/4570192838638_01_a4bb607e-220a-488d-9a1c-71c88dc62e0c.jpg?v=1722236902' },
  { id: 'jeongvely', name: 'Jeongvely', member: 'Jeongyeon', url: 'https://cdn.shopify.com/s/files/1/0537/6835/6036/files/4570192838645_01_c0f0a018-e8f0-45ea-bcd9-287da9772665.jpg?v=1722236898' },
  { id: 'movely', name: 'Movely', member: 'Momo', url: 'https://cdn.shopify.com/s/files/1/0537/6835/6036/files/4570192838652_01_c14ff3fa-b143-4bcc-a60f-3c7353e45487.jpg?v=1722236892' },
  { id: 'savely', name: 'Savely', member: 'Sana', url: 'https://cdn.shopify.com/s/files/1/0537/6835/6036/files/4570192838669_01_87a87039-b1ae-4fc1-bac4-766e0ead5a8a.jpg?v=1722236886' },
  { id: 'jively', name: 'Jively', member: 'Jihyo', url: 'https://cdn.shopify.com/s/files/1/0537/6835/6036/files/4570192838676_01_e00c4cfa-58df-40cc-a83d-d8c037b29080.jpg?v=1722236882' },
  { id: 'mively', name: 'Mively', member: 'Mina', url: 'https://cdn.shopify.com/s/files/1/0537/6835/6036/files/4570192838683_01_56f3dbd7-21a1-4bae-baff-6a5c25a05656.jpg?v=1722236878' },
  { id: 'davely', name: 'Davely', member: 'Dahyun', url: 'https://cdn.shopify.com/s/files/1/0537/6835/6036/files/4570192838690_01_0bad2188-4e27-4841-a6bd-b56bb0eb5017.jpg?v=1722236874' },
  { id: 'chaengvely', name: 'Chaengvely', member: 'Chaeyoung', url: 'https://cdn.shopify.com/s/files/1/0537/6835/6036/files/4570192838706_01_d8e0ae2b-4ce0-4f84-a961-e5db0fa49c3c.jpg?v=1722236869' },
  { id: 'tzuvely', name: 'Tzuvely', member: 'Tzuyu', url: 'https://cdn.shopify.com/s/files/1/0537/6835/6036/files/4570192838713_01_add3ea25-a692-44a2-9261-17c135bc5286.jpg?v=1722236864' },
];

const babyMascotsOfficial = [
  { id: 'baby-navely', name: 'Baby Navely', member: 'Nayeon', url: 'https://cdn.shopify.com/s/files/1/0537/6835/6036/files/4570192830908_01_59675077-b740-4650-910b-4dbde84d2a4b.jpg?v=1772610997' },
  { id: 'baby-jeongvely', name: 'Baby Jeongvely', member: 'Jeongyeon', url: 'https://cdn.shopify.com/s/files/1/0537/6835/6036/files/4570192830915_01_5e47f22d-6be7-4279-873d-d765de01a613.jpg?v=1772610994' },
  { id: 'baby-movely', name: 'Baby Movely', member: 'Momo', url: 'https://cdn.shopify.com/s/files/1/0537/6835/6036/files/4570192830922_01_86c6a450-91fc-4cd6-a974-c399cad63fcc.jpg?v=1772610991' },
  { id: 'baby-savely', name: 'Baby Savely', member: 'Sana', url: 'https://cdn.shopify.com/s/files/1/0537/6835/6036/files/01_9d3cf5af-1dd5-4156-8380-5e4866736131.jpg?v=1772610989' },
  { id: 'baby-jively', name: 'Baby Jively', member: 'Jihyo', url: 'https://cdn.shopify.com/s/files/1/0537/6835/6036/files/4570192830946_01_cf4dd70c-a189-40a9-ac34-44010c88ea03.jpg?v=1772610986' },
  { id: 'baby-mively', name: 'Baby Mively', member: 'Mina', url: 'https://cdn.shopify.com/s/files/1/0537/6835/6036/files/4570192830953_01_afcb9d9f-beca-43b1-a1b1-0d97d426227e.jpg?v=1772610984' },
  { id: 'baby-davely', name: 'Baby Davely', member: 'Dahyun', url: 'https://cdn.shopify.com/s/files/1/0537/6835/6036/files/4570192830960_01_b56c710b-4f61-44b2-9e69-deb7f7e1929a.jpg?v=1772610983' },
  { id: 'baby-chaengvely', name: 'Baby Chaengvely', member: 'Chaeyoung', url: 'https://cdn.shopify.com/s/files/1/0537/6835/6036/files/4570192830977_01_8279aae1-53f2-4217-b748-2d0210363133.jpg?v=1772610981' },
  { id: 'baby-tzuvely', name: 'Baby Tzuvely', member: 'Tzuyu', url: 'https://cdn.shopify.com/s/files/1/0537/6835/6036/files/4570192830984_01_e7e28cc0-65a7-431d-b550-2c5fc2e67fa1.jpg?v=1772610979' },
];

const charm9thOfficial = [
  { id: 'charm-navely', name: 'Charm Navely', member: 'Nayeon', url: 'https://cdn.shopify.com/s/files/1/0537/6835/6036/files/TW_Bagcharm_NAVELY.jpg?v=1782976254' },
  { id: 'charm-jeongvely', name: 'Charm Jeongvely', member: 'Jeongyeon', url: 'https://cdn.shopify.com/s/files/1/0537/6835/6036/files/TW_Bagcharm_JEONGVELY.jpg?v=1782976252' },
  { id: 'charm-movely', name: 'Charm Movely', member: 'Momo', url: 'https://cdn.shopify.com/s/files/1/0537/6835/6036/files/TW_Bagcharm_MOVELY.jpg?v=1782976250' },
  { id: 'charm-savely', name: 'Charm Savely', member: 'Sana', url: 'https://cdn.shopify.com/s/files/1/0537/6835/6036/files/TW_Bagcharm_SAVELY.jpg?v=1782976247' },
  { id: 'charm-jively', name: 'Charm Jively', member: 'Jihyo', url: 'https://cdn.shopify.com/s/files/1/0537/6835/6036/files/TW_Bagcharm_JIVELY.jpg?v=1782976244' },
  { id: 'charm-mively', name: 'Charm Mively', member: 'Mina', url: 'https://cdn.shopify.com/s/files/1/0537/6835/6036/files/TW_Bagcharm_MIVELY.jpg?v=1782976242' },
  { id: 'charm-davely', name: 'Charm Davely', member: 'Dahyun', url: 'https://cdn.shopify.com/s/files/1/0537/6835/6036/files/TW_Bagcharm_DAVELY.jpg?v=1782976240' },
  { id: 'charm-chaengvely', name: 'Charm Chaengvely', member: 'Chaeyoung', url: 'https://cdn.shopify.com/s/files/1/0537/6835/6036/files/TW_Bagcharm_CHAENGVELY_26998467-47c8-4bc7-a4db-40bdb2cc1330.jpg?v=1782976237' },
  { id: 'charm-tzuvely', name: 'Charm Tzuvely', member: 'Tzuyu', url: 'https://cdn.shopify.com/s/files/1/0537/6835/6036/files/TW_Bagcharm_TZUVELY_ed710086-441d-4c58-93e5-aa7f58d6831c.jpg?v=1782976235' },
];

const outDir = path.join(__dirname, '..', 'public', 'assets', 'characters');

async function processSet(items, prefix) {
  for (const item of items) {
    try {
      const res = await fetch(item.url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      
      const filename = prefix ? `${prefix}-${item.id}.webp` : `${item.id}.webp`;
      const targetPath = path.join(outDir, filename);

      await sharp(buf)
        .resize(500, 500, { fit: 'cover', position: 'center' })
        .webp({ quality: 88 })
        .toFile(targetPath);

      console.log(`[OK] Saved ${filename} (${item.name})`);
    } catch (err) {
      console.error(`[ERR] Failed ${item.id}:`, err.message);
    }
  }
}

async function main() {
  console.log('Downloading Lovelys Soft Toys (Official JYP Store)...');
  await processSet(mascotsOfficial, '');

  console.log('Downloading Baby Lovelys (Official JYP Store)...');
  await processSet(babyMascotsOfficial, '');

  console.log('Downloading 9th Anniversary Charms (Official JYP Store)...');
  await processSet(charm9thOfficial, '');

  console.log('Done downloading all official mascots!');
}

main();
