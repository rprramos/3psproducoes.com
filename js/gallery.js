/* ==========================================================================
   3P's Produções - Full Photography Gallery Render (All Original Wix Photos)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const galleryGrid = document.getElementById('fullGalleryGrid');
  if (!galleryGrid) return;

  const totalPhotos = 115;
  const categories = ['pessoas', 'profissoes', 'estudio', 'gastronomia', 'arquitetura'];
  const categoryNames = {
    pessoas: 'Pessoas',
    profissoes: 'Profissões',
    estudio: 'Estúdio',
    gastronomia: 'Gastronomia',
    arquitetura: 'Arquitetura'
  };

  const galleryItems = [];

  for (let i = 1; i <= totalPhotos; i++) {
    const cat = categories[(i - 1) % categories.length];
    galleryItems.push({
      id: i,
      category: cat,
      categoryName: categoryNames[cat],
      title: `${categoryNames[cat]} - Projeto #${i}`,
      imgSrc: `assets/images/photography/full_photo_${i}.jpg`
    });
  }

  function renderGallery(filter = 'all') {
    galleryGrid.innerHTML = '';

    const filtered = filter === 'all' 
      ? galleryItems 
      : galleryItems.filter(item => item.category === filter);

    filtered.forEach(item => {
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
      renderGallery(cat);
    });
  });

  window.filterGallery = function(cat) {
    const btn = document.querySelector(`.tab-btn[data-filter="${cat}"]`);
    if (btn) btn.click();
  };

  // Initial Render
  renderGallery('all');
});
