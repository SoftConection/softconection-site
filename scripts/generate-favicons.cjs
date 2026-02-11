const fs = require('fs');
const path = require('path');

// Base64 PNG (1x1 transparent) - fallback placeholder
const pngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=';

const outDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// Write PNG
const pngBuffer = Buffer.from(pngBase64, 'base64');
fs.writeFileSync(path.join(outDir, 'favicon-32x32.png'), pngBuffer);
console.log('Wrote public/favicon-32x32.png');

// Create ICO with a single PNG image entry (PNG-in-ICO is supported by modern browsers)
function createIcoFromPngBuffer(pngBuf) {
  const header = Buffer.alloc(6);
  // 0 reserved
  header.writeUInt16LE(0, 0);
  // type 1 = ICO
  header.writeUInt16LE(1, 2);
  // image count = 1
  header.writeUInt16LE(1, 4);

  const entry = Buffer.alloc(16);
  // width & height (use 32; 0 means 256)
  entry.writeUInt8(32, 0); // width
  entry.writeUInt8(32, 1); // height
  entry.writeUInt8(0, 2); // color palette
  entry.writeUInt8(0, 3); // reserved
  // color planes (for PNG, 0)
  entry.writeUInt16LE(0, 4);
  // bits per pixel (for PNG, 0)
  entry.writeUInt16LE(0, 6);
  // size in bytes
  entry.writeUInt32LE(pngBuf.length, 8);
  // offset from beginning of file (6 + 16 = 22)
  const offset = 6 + 16;
  entry.writeUInt32LE(offset, 12);

  return Buffer.concat([header, entry, pngBuf]);
}

const icoBuf = createIcoFromPngBuffer(pngBuffer);
fs.writeFileSync(path.join(outDir, 'favicon.ico'), icoBuf);
console.log('Wrote public/favicon.ico');

// Also write apple-touch icon (PNG placeholder)
fs.writeFileSync(path.join(outDir, 'apple-touch-icon.png'), pngBuffer);
console.log('Wrote public/apple-touch-icon.png');

console.log('Done generating favicons.');
