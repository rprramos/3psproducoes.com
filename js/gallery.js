/* ==========================================================================
   3P's Produções - Photography Gallery (5 Separate Categories)
   1. Pessoas (Casuais / Ensaios)
   2. Corporativo (Retratos Profissionais & Executivos)
   3. Estúdio (Fotos de Estúdio, incluindo novidades)
   4. Gastronomia (Culinária & Pratos)
   5. Arquitetura (Imóveis & Interiores)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const galleryGrid = document.getElementById('fullGalleryGrid');
  if (!galleryGrid) return;

  // 5 Clean Categories Mapping:
  const categoryData = {
    pessoas: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      category: 'pessoas',
      categoryName: 'Pessoas (Ensaios)',
      title: `Ensaio Pessoas #${i + 1}`,
      imgSrc: `assets/images/photography/full_photo_${i + 3}.jpg`
    })),

    corporativo: Array.from({ length: 20 }, (_, i) => ({
      id: i + 21,
      category: 'corporativo',
      categoryName: 'Corporativo',
      title: `Retrato Corporativo #${i + 1}`,
      imgSrc: `assets/images/photography/full_photo_${i + 23}.jpg`
    })),

    estudio: [
      { id: 101, category: 'estudio', categoryName: 'Estúdio', title: 'Estúdio Produção #1', imgSrc: 'assets/images/photography/estudio_new_1.jpg' },
      { id: 102, category: 'estudio', categoryName: 'Estúdio', title: 'Estúdio Produção #2', imgSrc: 'assets/images/photography/estudio_new_2.jpg' },
      { id: 103, category: 'estudio', categoryName: 'Estúdio', title: 'Estúdio Produção #3', imgSrc: 'assets/images/photography/estudio_new_3.jpg' },
      { id: 104, category: 'estudio', categoryName: 'Estúdio', title: 'Estúdio Produção #4', imgSrc: 'assets/images/photography/estudio_new_4.jpg' },
      { id: 105, category: 'estudio', categoryName: 'Estúdio', title: 'Estúdio Produção #5', imgSrc: 'assets/images/photography/estudio_new_5.jpg' },
      ...Array.from({ length: 15 }, (_, i) => ({
        id: i + 106,
        category: 'estudio',
        categoryName: 'Estúdio',
        title: `Estúdio Iluminação #${i + 6}`,
        imgSrc: `assets/images/photography/full_photo_${i + 43}.jpg`
      }))
    ],

    gastronomia: Array.from({ length: 25 }, (_, i) => ({
      id: i + 121,
      category: 'gastronomia',
      categoryName: 'Gastronomia',
      title: `Fotografia Culinária #${i + 1}`,
      imgSrc: `assets/images/photography/full_photo_${i + 58}.jpg`
    })),

    arquitetura: Array.from({ length: 32 }, (_, i) => ({
      id: i + 146,
      category: 'arquitetura',
      categoryName: 'Arquitetura',
      title: `Projeto Arquitetura #${i + 1}`,
      imgSrc: `assets/images/photography/full_photo_${Math.min(i + 83, 115)}.jpg`
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

  // Initial Render: Default to "pessoas"
  renderCategory('pessoas');
});
