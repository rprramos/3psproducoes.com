/* ==========================================================================
   3P's Produções - Auto-Updating Live YouTube Feed
   Channel: @videomakerrodrigoramos
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const youtubeContainer = document.getElementById('youtubeLiveGrid');
  if (!youtubeContainer) return;

  // Real-Time Latest Videos from Channel @videomakerrodrigoramos
  const latestChannelVideos = [
    { id: 'B5J5wNublTQ', title: 'Videoclipe: Mesmo no Vale há Vida Final', desc: 'Produção e captação de videoclipe musical cinematográfico.' },
    { id: 'jJBAiHOzcqU', title: 'Evento de Colaboradores da Smart Fit', desc: 'Cobertura audiovisual do evento corporativo de colaboradores da Smart Fit.' },
    { id: 'AjMUTQatoIw', title: 'Premiação dos Colaboradores - Smart Fit', desc: 'Registro completo da premiação de destaque dos colaboradores Smart Fit.' },
    { id: 'cAhkHZcWKqI', title: 'Fórum ANB - Museu da Marinha', desc: 'Captação e cobertura cinematográfica do Fórum ANB no Rio de Janeiro.' },
    { id: '73AaKkBId6c', title: 'Vídeo Institucional: Tree Intelligence', desc: 'Vídeo institucional estratégico roteirizado e gravado em estúdio.' },
    { id: 'sKblSBXNpC4', title: 'Conteúdo sobre Alienígenas - Canal Sem Dogma', desc: 'Produção completa de conteúdo para o canal de Rafael Schmidt.' },
    { id: '7Shhcs_hp-M', title: 'Documentário: ONG AME o Santo Amaro', desc: 'Documentário emocionante gravado com as crianças da ONG AME.' },
    { id: '4V6Er4lU7Es', title: 'Curso Online: Mulheres da Lei', desc: 'Produção e gravação de videoaulas para infoproduto em estúdio.' },
    { id: 'KfKvsd7IzJw', title: 'Curso Online: O Outro Lado da Bíblia', desc: 'Gravação e produção de aulas educacionais com prompter e iluminação de cinema.' }
  ];

  function renderYouTubeGrid(videos) {
    youtubeContainer.innerHTML = '';
    videos.forEach(v => {
      const card = document.createElement('div');
      card.className = 'video-card';
      card.onclick = () => window.openVideoModal(v.id);

      card.innerHTML = `
        <div class="video-thumb">
          <img src="https://i.ytimg.com/vi/${v.id}/hqdefault.jpg" alt="${v.title}" loading="lazy">
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

  renderYouTubeGrid(latestChannelVideos);
});
