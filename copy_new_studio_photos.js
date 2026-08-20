const fs = require('fs');
const path = require('path');

const uploads = [
  { src: 'C:\\Users\\rprra\\.gemini\\antigravity\\brain\\3a58b8af-7b9b-4cd0-b62e-b732f971ec84\\.user_uploaded\\media_1787223974841.jpg', dest: 'd:\\Produtos Digitais\\assets\\images\\photography\\estudio_new_1.jpg' },
  { src: 'C:\\Users\\rprra\\.gemini\\antigravity\\brain\\3a58b8af-7b9b-4cd0-b62e-b732f971ec84\\.user_uploaded\\media_1787223975422.jpg', dest: 'd:\\Produtos Digitais\\assets\\images\\photography\\estudio_new_2.jpg' },
  { src: 'C:\\Users\\rprra\\.gemini\\antigravity\\brain\\3a58b8af-7b9b-4cd0-b62e-b732f971ec84\\.user_uploaded\\media_1787223975481.jpg', dest: 'd:\\Produtos Digitais\\assets\\images\\photography\\estudio_new_3.jpg' },
  { src: 'C:\\Users\\rprra\\.gemini\\antigravity\\brain\\3a58b8af-7b9b-4cd0-b62e-b732f971ec84\\.user_uploaded\\media_1787223975484.jpg', dest: 'd:\\Produtos Digitais\\assets\\images\\photography\\estudio_new_4.jpg' },
  { src: 'C:\\Users\\rprra\\.gemini\\antigravity\\brain\\3a58b8af-7b9b-4cd0-b62e-b732f971ec84\\.user_uploaded\\media_1787224065610.jpg', dest: 'd:\\Produtos Digitais\\assets\\images\\photography\\estudio_new_5.jpg' }
];

uploads.forEach(u => {
  fs.copyFileSync(u.src, u.dest);
  console.log('Copied:', u.dest);
});
