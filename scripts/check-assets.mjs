import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const publicDir = path.join(root, 'public');
const required = ['favicon.svg', 'media/marcelina-junska-portrait.png', 'media/marcelina-junska.jpg'];

for (let id = 1; id <= 24; id += 1) {
  const number = String(id).padStart(2, '0');
  required.push(`media/post-${number}.${id <= 18 ? 'webp' : 'jpg'}`);
}

for (let id = 1; id <= 19; id += 1) {
  const number = String(id).padStart(2, '0');
  required.push(`media/reel-${number}.jpg`, `media/reel-${number}.mp4`);
}

const missing = required.filter((asset) => !fs.existsSync(path.join(publicDir, asset)));
const absoluteReferences = [];
for (const file of ['app/layout.tsx', 'app/page.tsx', 'app/hero-showcase.tsx', 'app/portfolio-gallery.tsx', 'app/portfolio-data.ts']) {
  const contents = fs.readFileSync(path.join(root, file), 'utf8');
  if (/\/media\/|\/favicon\.svg/.test(contents)) absoluteReferences.push(file);
}

if (missing.length || absoluteReferences.length) {
  if (missing.length) console.error(`Brakujące pliki (${missing.length}):\n${missing.join('\n')}`);
  if (absoluteReferences.length) console.error(`Ścieżki absolutne do zasobów (${absoluteReferences.length}):\n${absoluteReferences.join('\n')}`);
  process.exit(1);
}

console.log(`OK: sprawdzono ${required.length} plików multimedialnych i ikon.`);
