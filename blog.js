// ===== Blog — blog.js =====

// ---- Category Filtering ----
const filterBtns   = document.querySelectorAll('.filter-btn');
const catLinks     = document.querySelectorAll('.cat-link');
const postsGrid    = document.getElementById('posts-grid');
const featuredPost = document.querySelector('.featured-post');
const noResults    = document.getElementById('blog-no-results');

function filterPosts(cat) {
  if (!postsGrid) return;

  const cards = postsGrid.querySelectorAll('.blog-card');
  let visibleCount = 0;

  // Filter post cards
  cards.forEach(card => {
    const cardCat = card.dataset.cat;
    const show = cat === 'all' || cardCat === cat;
    card.style.display = show ? '' : 'none';
    if (show) visibleCount++;
  });

  // Handle featured post
  if (featuredPost) {
    const featCat = featuredPost.dataset.cat;
    const showFeatured = cat === 'all' || featCat === cat;
    featuredPost.style.display = showFeatured ? '' : 'none';
    if (showFeatured) visibleCount++;
  }

  // Show no results message
  if (noResults) {
    noResults.style.display = visibleCount === 0 ? 'block' : 'none';
  }
}

// Filter buttons (top bar)
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Sync sidebar cat links
    const cat = btn.dataset.cat;
    catLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.cat === cat);
    });

    filterPosts(cat);
  });
});

// Sidebar category links
catLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const cat = link.dataset.cat;
    catLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    // Sync filter buttons
    filterBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.cat === cat);
    });

    filterPosts(cat);

    // Scroll to top of blog grid smoothly
    const blogMain = document.querySelector('.blog-main');
    if (blogMain) {
      const offset = 140;
      const top = blogMain.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- Copy link button ----
const copyBtn = document.querySelector('.share-btn');
if (copyBtn) {
  copyBtn.addEventListener('click', e => {
    e.preventDefault();
    navigator.clipboard.writeText(window.location.href).then(() => {
      const orig = copyBtn.innerHTML;
      copyBtn.innerHTML = '✓ Copied!';
      setTimeout(() => { copyBtn.innerHTML = orig; }, 2000);
    });
  });
}
