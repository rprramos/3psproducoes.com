const fs = require('fs');
const text = fs.readFileSync('C:\\Users\\rprra\\.gemini\\antigravity\\brain\\3a58b8af-7b9b-4cd0-b62e-b732f971ec84\\.system_generated\\steps\\238\\content.md', 'utf8');

const matches = Array.from(text.matchAll(/\"A\":\"([^\"]+)\"/g)).map(m => m[1]);
const cleanText = matches
  .map(t => t.replace(/\\n/g, '\n').replace(/\\"/g, '"'))
  .filter(t => t.length > 5 && !t.startsWith('http') && !t.includes('{'));

console.log('--- CANVA TABLE TEXT EXTRACTED ---');
cleanText.forEach((t, i) => {
  console.log(`[${i}] ${t}\n`);
});
