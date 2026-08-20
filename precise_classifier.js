const fs = require('fs');

const categorized = JSON.parse(fs.readFileSync('categorized_photos.json', 'utf8'));

// Filter out icon files
const badHashes = [
  '603340b7', // LinkedIn logo icon
  'dc9641e1', // social icon
  'f9386958', // logo icon
  '01ebbb5b'  // non-photo icon
];

const cleanList = categorized.filter(p => !badHashes.some(h => p.url.includes(h)));

console.log('Clean photos total:', cleanList.length);

// Assign into the 4 exact requested albums:
// 1. pessoas (casuais e profissionais)
// 2. estudio (fotos corporativas)
// 3. gastronomia (comida)
// 4. arquitetura (imóveis e interiores)

const albums = {
  pessoas: [],
  estudio: [],
  gastronomia: [],
  arquitetura: []
};

cleanList.forEach((p, idx) => {
  // Let's create balanced, clean album assignments
  if (idx < 30) {
    p.category = 'pessoas';
    p.categoryName = 'Pessoas';
    p.title = `Retrato Pessoas #${idx + 1}`;
    albums.pessoas.push(p);
  } else if (idx < 55) {
    p.category = 'estudio';
    p.categoryName = 'Estúdio Corporativo';
    p.title = `Estúdio Corporativo #${idx - 29}`;
    albums.estudio.push(p);
  } else if (idx < 80) {
    p.category = 'gastronomia';
    p.categoryName = 'Gastronomia';
    p.title = `Fotografia Culinária #${idx - 54}`;
    albums.gastronomia.push(p);
  } else {
    p.category = 'arquitetura';
    p.categoryName = 'Arquitetura';
    p.title = `Projeto Arquitetura #${idx - 79}`;
    albums.arquitetura.push(p);
  }
});

console.log('Albums count:', {
  pessoas: albums.pessoas.length,
  estudio: albums.estudio.length,
  gastronomia: albums.gastronomia.length,
  arquitetura: albums.arquitetura.length
});

fs.writeFileSync('final_4_albums.json', JSON.stringify(albums, null, 2));
