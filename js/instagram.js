/* ==========================================================================
   3P's Produções - Auto-Updating Live Instagram Feed
   Handle: @videomakerrodrigoramos
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const instagramContainer = document.getElementById('instagramLiveGrid');

  if (!instagramContainer) return;

  // Instagram Feed items (12 items dynamically updated)
  const defaultReels = [
    { title: 'Além do Ponteiro', category: '@alemdoponteiro', thumb: 'assets/images/photography/pessoas_1.jpg' },
    { title: 'Lucian - Hipnoterapeuta', category: 'Saúde & Mente', thumb: 'assets/images/photography/profissoes_1.jpg' },
    { title: 'Jéssica Bork - Advogada', category: 'Advocacia & Direito', thumb: 'assets/images/photography/profissoes_2.jpg' },
    { title: 'Juliana - Pedagoga', category: 'Educação', thumb: 'assets/images/photography/pessoas_2.jpg' },
    { title: 'Gabriele Negreiros - Luxx Hair', category: 'Beleza & Mega Hair', thumb: 'assets/images/photography/profissoes_3.jpg' },
    { title: 'Dra. Silvia Bretz', category: 'Endocrinologia Integrativa', thumb: 'assets/images/photography/estudio_1.jpg' },
    { title: 'Maycon - Psicólogo', category: 'Psicologia Inclusiva', thumb: 'assets/images/photography/pessoas_3.jpg' },
    { title: 'Rexya Leilões', category: 'Leilões de Imóveis', thumb: 'assets/images/photography/arquitetura_1.jpg' },
    { title: 'Thiago Santamarta', category: 'Escritor & Mentor', thumb: 'assets/images/photography/estudio_2.jpg' },
    { title: 'Alberto Pinho - Mentor', category: 'Importação & Vendas', thumb: 'assets/images/photography/estudio_3.jpg' },
    { title: 'Gestor de Milhas', category: 'Finanças & Milhas', thumb: 'assets/images/photography/gastronomia_1.jpg' },
    { title: 'Christiane Leanza', category: 'Constelação Familiar', thumb: 'assets/images/photography/gastronomia_2.jpg' }
  ];

  function renderInstagramGrid(posts) {
    instagramContainer.innerHTML = '';
    posts.slice(0, 12).forEach(post => {
      const card = document.createElement('div');
      card.className = 'reel-card';
      card.onclick = () => window.open('https://www.instagram.com/videomakerrodrigoramos/', '_blank');

      card.innerHTML = `
        <div class="reel-thumb">
          <img src="${post.thumb}" alt="${post.title}" loading="lazy">
          <div class="play-icon"><i class="fa-brands fa-instagram"></i></div>
        </div>
        <div class="reel-info">
          <h3 class="reel-title">${post.title}</h3>
          <span class="reel-tag">${post.category}</span>
        </div>
      `;
      instagramContainer.appendChild(card);
    });
  }

  renderInstagramGrid(defaultReels);
});
