/* ==========================================================================
   3P's Produções - Auto-Updating Live YouTube Feed
   Channel: @videomakerrodrigoramos (ID: UC6BH6FKBkqSEUn7Qwmp8W2D)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const channelId = 'UC6BH6FKBkqSEUn7Qwmp8W2D';
  const youtubeContainer = document.getElementById('youtubeLiveGrid');

  if (!youtubeContainer) return;

  // Primary API: rss2json converting YouTube RSS feed to JSON
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data && data.status === 'ok' && data.items && data.items.length > 0) {
        renderYouTubeFeed(data.items);
      } else {
        fetchFallbackProxy();
      }
    })
    .catch(() => {
      fetchFallbackProxy();
    });

  function fetchFallbackProxy() {
    // Fallback CORS Proxy fetch
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;
    fetch(proxyUrl)
      .then(res => res.json())
      .then(data => {
        if (data && data.contents) {
          const parser = new DOMParser();
          const xml = parser.parseFromString(data.contents, "text/xml");
          const entries = Array.from(xml.querySelectorAll("entry"));
          
          if (entries.length > 0) {
            const items = entries.map(entry => {
              const videoId = entry.querySelector("videoId")?.textContent || "";
              const title = entry.querySelector("title")?.textContent || "";
              return {
                title,
                link: `https://www.youtube.com/watch?v=${videoId}`,
                guid: videoId,
                thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
              };
            });
            renderYouTubeFeed(items);
            return;
          }
        }
        renderCuratedYouTube();
      })
      .catch(() => {
        renderCuratedYouTube();
      });
  }

  function renderYouTubeFeed(items) {
    youtubeContainer.innerHTML = '';
    items.forEach(item => {
      let videoId = item.guid;
      if (typeof videoId === 'string' && videoId.includes('yt:video:')) {
        videoId = videoId.replace('yt:video:', '');
      } else if (item.link) {
        const match = item.link.match(/v=([a-zA-Z0-9_-]+)/);
        if (match) videoId = match[1];
      }

      const thumb = item.thumbnail || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
      const title = item.title || 'Vídeo 3P\'s Produções';

      const card = document.createElement('div');
      card.className = 'video-card';
      card.onclick = () => window.openVideoModal(videoId);

      card.innerHTML = `
        <div class="video-thumb">
          <img src="${thumb}" alt="${title}" loading="lazy">
          <div class="play-icon"><i class="fa-solid fa-play"></i></div>
        </div>
        <div class="video-info">
          <h3 class="video-title">${title}</h3>
          <p class="video-desc">Última produção publicada no canal @videomakerrodrigoramos.</p>
        </div>
      `;
      youtubeContainer.appendChild(card);
    });
  }

  function renderCuratedYouTube() {
    // Curated default list if feed is unreachable
    const defaultVideos = [
      { id: 'YTT7JiTkgVI', title: 'Reels Médico - Vídeo Dinâmico', desc: 'Vídeo gravado e editado para ser dinâmico com legenda interativa.' },
      { id: 'TJq-UDLjBFo', title: 'Reels: Cicatriclear', desc: 'Conteúdo captado durante o evento de Bronze, Cicatriclear.' },
      { id: 'P0aTGN6WkKo', title: 'Reels: Corretor de Imóveis - Nyemeier', desc: 'Divulgação do empreendimento Costa Nyemeier.' },
      { id: 'cAhkHZcWKqI', title: 'Fórum ANB - Museu da Marinha', desc: 'Captação e cobertura do Fórum da ANB no Rio de Janeiro.' },
      { id: 'jJpyGaF7AB8', title: 'Reels: LA Comunicação', desc: 'Conteúdo gravado no estúdio da Barra da Tijuca.' },
      { id: '73AaKkBId6c', title: 'Vídeo Institucional: Tree Intelligence', desc: 'Roteirização, captação e edição no estúdio.' },
      { id: 'sKblSBXNpC4', title: 'Canal Sem Dogma', desc: 'Captação e edição para o canal de Rafael Schmidt.' },
      { id: 'L-azUanXJRs', title: 'Reels de Autoridade: Rio Prime Clinic', desc: 'Posicionamento para a CEO Karen Stephane.' },
      { id: 'cxhBEqAC8C4', title: 'Mercedes Benz Places - Dubai', desc: 'Vídeo de alto padrão imobiliário para CD Homes.' }
    ];

    youtubeContainer.innerHTML = '';
    defaultVideos.forEach(v => {
      const card = document.createElement('div');
      card.className = 'video-card';
      card.onclick = () => window.openVideoModal(v.id);
      card.innerHTML = `
        <div class="video-thumb">
          <img src="https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg" alt="${v.title}" loading="lazy">
          <div class="play-icon"><i class="fa-solid fa-play"></i></div>
        </div>
        <div class="video-info">
          <h3 class="video-title">${v.title}</h3>
          <p class="video-desc">${v.desc}</p>
        </div>
      `;
      youtubeContainer.appendChild(card);
    });
  }
});
