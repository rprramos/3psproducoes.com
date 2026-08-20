const fs = require('fs');
const path = require('path');

const dir = 'd:\\Produtos Digitais\\assets\\images\\photography';
const files = fs.readdirSync(dir).filter(f => f.startsWith('full_photo_'));

console.log('Total files:', files.length);

// Generate a simple HTML viewer to visually inspect all 115 photos with their file names!
let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Photo Inspection Index</title>
  <style>
    body { background: #111; color: #fff; font-family: sans-serif; padding: 20px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 15px; }
    .card { background: #222; border-radius: 8px; padding: 10px; text-align: center; }
    .card img { width: 100%; height: 160px; object-fit: cover; border-radius: 4px; }
    .name { font-size: 12px; margin-top: 5px; color: #ffb700; word-break: break-all; }
  </style>
</head>
<body>
  <h1>Photo Inspection (115 photos)</h1>
  <div class="grid">
`;

files.forEach(file => {
  html += `
    <div class="card">
      <img src="assets/images/photography/${file}" alt="${file}">
      <div class="name">${file}</div>
    </div>
  `;
});

html += `
  </div>
</body>
</html>
`;

fs.writeFileSync('d:\\Produtos Digitais\\photo_inspector.html', html);
console.log('Created photo_inspector.html!');
