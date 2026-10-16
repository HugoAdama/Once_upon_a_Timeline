async function main() {
  const res = await fetch('https://1kpop.cl/twice-presenta-tdoongz-sus-nuevos-personajes-oficiales/');
  const html = await res.text();
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const start = text.indexOf('TDOONGZ');
  console.log(text.substring(start, start + 2000));
}
main();
