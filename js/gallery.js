/* ==========================================================================
   3P's Produções - Photography Gallery (Strict Categorization, No Mix)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const galleryGrid = document.getElementById('fullGalleryGrid');
  if (!galleryGrid) return;

  // Clean, strictly mapped gallery data (LinkedIn & icon files filtered out)
  const categoryData = {
    pessoas: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      category: 'pessoas',
      categoryName: 'Pessoas',
      title: `Ensaio Pessoas #${i + 1}`,
      imgSrc: `assets/images/photography/full_photo_${i + 1}.jpg`
    })),

    profissoes: Array.from({ length: 20 }, (_, i) => ({
      id: i + 21,
      category: 'profissoes',
      categoryName: 'Profissões',
      title: `Retrato Corporativo #${i + 1}`,
      imgSrc: `assets/images/photography/full_photo_${i + 21}.jpg`
    })),

    estudio: Array.from({ length: 20 }, (_, i) => ({
      id: i + 41,
      category: 'estudio',
      categoryName: 'Estúdio',
      title: `Produção Estúdio #${i + 1}`,
      imgSrc: `assets/images/photography/full_photo_${i + 41}.jpg`
    })),

    gastronomia: Array.from({ length: 25 }, (_, i) => ({
      id: i + 61,
      category: 'gastronomia',
      categoryName: 'Gastronomia',
      title: `Fotografia Culinária #${i + 1}`,
      imgSrc: `assets/images/photography/full_photo_${i + 61}.jpg`
    })),

    arquitetura: Array.from({ length: 30 }, (_, i) => ({
      id: i + 86,
      category: 'arquitetura',
      categoryName: 'Arquitetura',
      title: `Projetos Arquitetura #${i + 1}`,
      imgSrc: `assets/images/photography/full_photo_${i + 86}.jpg`
    }))
  };

  function renderCategory(categoryKey) {
    galleryGrid.innerHTML = '';
    const items = categoryData[categoryKey] || categoryData['pessoas'];

    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'gallery-item';
      card.setAttribute('data-category', item.category);

      card.innerHTML = `
        <img src="${item.imgSrc}" alt="${item.title}" loading="lazy">
        <div class="gallery-overlay">
          <span class="gallery-cat">${item.categoryName}</span>
          <h3 class="gallery-title">${item.title}</h3>
        </div>
      `;

      // Click to open lightbox
      card.onclick = () => window.openLightbox(item.imgSrc, item.title);
      galleryGrid.appendChild(card);
    });
  }

  // Lightbox Modal
  const lightboxModal = document.createElement('div');
  lightboxModal.className = 'modal-overlay';
  lightboxModal.id = 'lightboxModal';
  lightboxModal.innerHTML = `
    <div class="modal-content" style="background: transparent; border: none; max-width: 90vw; text-align: center;">
      <button class="modal-close" onclick="closeLightbox()">&times;</button>
      <img id="lightboxImg" src="" style="max-width: 100%; max-height: 85vh; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.8); border: 1px solid rgba(255,255,255,0.2);">
      <h3 id="lightboxCaption" style="margin-top: 1rem; color: #fff;"></h3>
    </div>
  `;
  document.body.appendChild(lightboxModal);

  window.openLightbox = function(src, caption) {
    document.getElementById('lightboxImg').src = src;
    document.getElementById('lightboxCaption').innerText = caption;
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeLightbox = function() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  lightboxModal.onclick = (e) => {
    if (e.target === lightboxModal) closeLightbox();
  };

  // Filter Buttons Event Listeners
  const filterBtns = document.querySelectorAll('.tab-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');
      renderCategory(cat);
    });
  });

  window.filterGallery = function(cat) {
    const btn = document.querySelector(`.tab-btn[data-filter="${cat}"]`);
    if (btn) btn.click();
  };

  // Initial Render: Default to "pessoas" (No "Todas as Fotos" button!)
  renderCategory('pessoas');
});
