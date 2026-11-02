// Small interactions for the Soweto Fresh Bakery website.
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

mainNav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

// Menu category filtering and text search.
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter');
const productCards = document.querySelectorAll('.product-card');
const noResults = document.getElementById('noResults');
let activeCategory = 'all';

function updateProducts() {
  const query = (searchInput?.value || '').trim().toLowerCase();
  let visibleCount = 0;
  productCards.forEach(card => {
    const matchesCategory = activeCategory === 'all' || card.dataset.category === activeCategory;
    const matchesText = (card.dataset.name + ' ' + card.textContent).toLowerCase().includes(query);
    const show = matchesCategory && matchesText;
    card.hidden = !show;
    if (show) visibleCount++;
  });
  if (noResults) noResults.hidden = visibleCount !== 0;
}
searchInput?.addEventListener('input', updateProducts);
filterButtons.forEach(button => button.addEventListener('click', () => {
  activeCategory = button.dataset.filter;
  filterButtons.forEach(item => item.classList.toggle('active', item === button));
  updateProducts();
}));

// Gallery lightbox.
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    lightboxImage.src = item.dataset.full;
    lightbox.hidden = false;
    lightboxClose.focus();
  });
});
function closeLightbox() { lightbox.hidden = true; lightboxImage.removeAttribute('src'); }
lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && lightbox && !lightbox.hidden) closeLightbox(); });

// Client-side form checks. This demo does not send data to a server.
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
contactForm?.addEventListener('submit', event => {
  event.preventDefault();
  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    formMessage.textContent = 'Please complete the required fields with valid information.';
    return;
  }
  formMessage.textContent = 'Thanks! Your enquiry is valid. This demo form is not connected to a live inbox.';
  contactForm.reset();
});

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
