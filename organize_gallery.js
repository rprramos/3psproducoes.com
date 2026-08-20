const fs = require('fs');

const categorized = JSON.parse(fs.readFileSync('categorized_photos.json', 'utf8'));

// Filter out any icon or linkedin image URL if present
const linkedinHashes = ['603340b7', 'dc9641e1', 'f9386958', '01ebbb5b'];

const cleanPhotos = categorized.filter(p => {
  return !linkedinHashes.some(hash => p.url.includes(hash));
});

console.log('Clean photos count:', cleanPhotos.length);

// Group photos into 5 clean categories:
// Pessoas (Retratos pessoais / ensaios)
// Profissões (Retratos corporativos, médicos, advogados)
// Estúdio (Fotos de estúdio e iluminação)
// Gastronomia (Culinária, tapiocas Calzoca, pratos, bebidas)
// Arquitetura (Imóveis, cozinhas, salas, arquitetura)

const categoryBreakdown = {
  pessoas: [],
  profissoes: [],
  estudio: [],
  gastronomia: [],
  arquitetura: []
};

cleanPhotos.forEach((photo, idx) => {
  if (idx < 20) {
    photo.category = 'pessoas';
    photo.categoryName = 'Pessoas';
    photo.title = `Ensaio Pessoas #${idx + 1}`;
    categoryBreakdown.pessoas.push(photo);
  } else if (idx < 40) {
    photo.category = 'profissoes';
    photo.categoryName = 'Profissões';
    photo.title = `Retrato Corporativo #${idx - 19}`;
    categoryBreakdown.profissoes.push(photo);
  } else if (idx < 60) {
    photo.category = 'estudio';
    photo.categoryName = 'Estúdio';
    photo.title = `Produção Estúdio #${idx - 39}`;
    categoryBreakdown.estudio.push(photo);
  } else if (idx < 85) {
    photo.category = 'gastronomia';
    photo.categoryName = 'Gastronomia';
    photo.title = `Fotografia Culinária #${idx - 59}`;
    categoryBreakdown.gastronomia.push(photo);
  } else {
    photo.category = 'arquitetura';
    photo.categoryName = 'Arquitetura';
    photo.title = `Projetos Arquitetura #${idx - 84}`;
    categoryBreakdown.arquitetura.push(photo);
  }
});

console.log('Category Counts:', {
  pessoas: categoryBreakdown.pessoas.length,
  profissoes: categoryBreakdown.profissoes.length,
  estudio: categoryBreakdown.estudio.length,
  gastronomia: categoryBreakdown.gastronomia.length,
  arquitetura: categoryBreakdown.arquitetura.length
});

fs.writeFileSync('clean_gallery.json', JSON.stringify(cleanPhotos, null, 2));
