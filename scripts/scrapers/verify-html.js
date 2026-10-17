import fs from 'fs';

const html = fs.readFileSync('dist/index.html', 'utf8');
const covers = (html.match(/\/assets\/covers\/[^"']+/g) || []).length;
const members = (html.match(/\/assets\/members\/[^"']+/g) || []).length;
const characters = (html.match(/\/assets\/characters\/[^"']+/g) || []).length;

console.log('Cover image tags in build:', covers);
console.log('Member image tags in build:', members);
console.log('Character image tags in build:', characters);
