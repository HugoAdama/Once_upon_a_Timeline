async function main() {
  const res = await fetch('https://app.fans/_expo/static/js/web/index-f2504f3ba65187608a49e3d7f592a702.js');
  const js = await res.text();
  const idx = js.indexOf('1wf4jvdeel');
  console.log('1wf4jvdeel idx:', idx);
  // find query
  const queries = [...js.matchAll(/query\s+([A-Za-z0-9_]+)[^\{]*\{[^\}]+\}/g)].map(m => m[0]);
  console.log('Queries:', queries.slice(0, 5));
}
main();
