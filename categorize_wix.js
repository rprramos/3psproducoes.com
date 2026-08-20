const fs = require('fs');

const wixContent = fs.readFileSync('C:\\Users\\rprra\\.gemini\\antigravity\\brain\\3a58b8af-7b9b-4cd0-b62e-b732f971ec84\\.system_generated\\steps\\3\\content.md', 'utf8');

// Find sections or gallery image URLs in order
const lines = wixContent.split('\n');
console.log('Total lines in wix content:', lines.length);

// Let's find images around text sections
let currentSection = 'Geral';
const mapped = [];

lines.forEach(line => {
  if (line.includes('Pessoas') || line.includes('PESSOAS')) currentSection = 'Pessoas';
  else if (line.includes('Profissões') || line.includes('Profissoes') || line.includes('PROFISSÕES')) currentSection = 'Profissões';
  else if (line.includes('Estúdio') || line.includes('Estudio') || line.includes('ESTÚDIO')) currentSection = 'Estúdio';
  else if (line.includes('Gastronomia') || line.includes('GASTRONOMIA')) currentSection = 'Gastronomia';
  else if (line.includes('Arquitetura') || line.includes('ARQUITETURA')) currentSection = 'Arquitetura';

  const imgMatch = line.match(/https:\/\/static\.wixstatic\.com\/media\/[a-zA-Z0-9_~.\-%]+/g);
  if (imgMatch) {
    imgMatch.forEach(url => {
      mapped.push({ url, section: currentSection });
    });
  }
});

console.log('Total mapped image entries:', mapped.length);
fs.writeFileSync('wix_mapped_images.json', JSON.stringify(mapped, null, 2));
