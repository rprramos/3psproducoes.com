const https = require('https');

https.get({
  hostname: 'www.youtube.com',
  path: '/@videomakerrodrigoramos/videos',
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
}, res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    const videoMatches = Array.from(data.matchAll(/"videoId":"([a-zA-Z0-9_-]{11})"/g)).map(m => m[1]);
    const uniqueIds = Array.from(new Set(videoMatches)).slice(0, 9);
    console.log('LATEST YOUTUBE VIDEO IDS FOUND:', uniqueIds);
    
    // Also extract video titles
    const titleMatches = Array.from(data.matchAll(/"title":\{"runs":\[\{"text":"([^"]+)"\}/g)).map(m => m[1]);
    console.log('TITLES FOUND:', titleMatches.slice(0, 9));
  });
});
