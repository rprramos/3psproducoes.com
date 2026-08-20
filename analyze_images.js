const fs = require('fs');
const path = require('path');
const http = require('http');

const allUrls = JSON.parse(fs.readFileSync('all_wix_urls.json', 'utf8'));

// Filter out logo, icons, video thumbnails (ytimg), linkedin icon, social icons
const validPhotoUrls = allUrls.filter(u => 
  !u.includes('f938695867374dc0bcb63857ac62e0c1') && // 3ps logo
  !u.includes('603340b7bcb14e7785c7b65b233cd9f9') && // linkedin / icon
  !u.includes('dc9641e157b2422b9f6a74d9b2b07f84') && // icon
  !u.includes('01ebbb5bf8834d1480caa0084663d653') && // quem sou old photo
  !u.includes('social') &&
  !u.includes('icon')
);

console.log('Valid portfolio photos count:', validPhotoUrls.length);

// Let's create specific categorized image sets
// Pessoas: 1..15
// Profissões: 16..30
// Estúdio: 31..45
// Gastronomia: 46..60
// Arquitetura: 61..75

const mappedUrls = [];
validPhotoUrls.forEach((url, idx) => {
  const fileNum = idx + 1;
  const fileName = `full_photo_${fileNum}.jpg`;
  
  // Categorize based on url patterns or chunks
  let cat = 'pessoas';
  let catName = 'Pessoas';

  if (idx < 15) {
    cat = 'pessoas';
    catName = 'Pessoas';
  } else if (idx < 30) {
    cat = 'profissoes';
    catName = 'Profissões';
  } else if (idx < 45) {
    cat = 'estudio';
    catName = 'Estúdio';
  } else if (idx < 65) {
    cat = 'gastronomia';
    catName = 'Gastronomia';
  } else {
    cat = 'arquitetura';
    catName = 'Arquitetura';
  }

  mappedUrls.push({
    id: fileNum,
    url: url,
    fileName: fileName,
    category: cat,
    categoryName: catName
  });
});

fs.writeFileSync('categorized_photos.json', JSON.stringify(mappedUrls, null, 2));
console.log('Saved categorized_photos.json with', mappedUrls.length, 'photos!');
