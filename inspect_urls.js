const fs = require('fs');

const categorized = JSON.parse(fs.readFileSync('categorized_photos.json', 'utf8'));

categorized.forEach((item, idx) => {
  console.log(`${item.fileName} => ${item.url}`);
});
