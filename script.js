// Slideshow
let slideIndex = 0, slideInterval;
function showSlides() {
    const slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) slides[i].classList.remove("active");
    slideIndex = (slideIndex + 1) > slides.length ? 1 : slideIndex + 1;
    if (slides[slideIndex - 1]) slides[slideIndex - 1].classList.add("active");
}
function startSlideshow() { if (document.getElementsByClassName("slide").length > 0) { showSlides(); slideInterval = setInterval(showSlides, 5000); } }
function changeSlide(n) { clearInterval(slideInterval); const slides = document.getElementsByClassName("slide"); slideIndex += n; if (slideIndex > slides.length) slideIndex = 1; if (slideIndex < 1) slideIndex = slides.length; for (let i = 0; i < slides.length; i++) slides[i].classList.remove("active"); if (slides[slideIndex - 1]) slides[slideIndex - 1].classList.add("active"); slideInterval = setInterval(showSlides, 5000); }

// Mobile Menu
function setupMobileMenu() {
    const hamburger = document.getElementById('hamburgerBtn'), mobileMenu = document.getElementById('mobileMenu'), closeBtn = document.getElementById('closeMenuBtn'), overlay = document.getElementById('menuOverlay');
    if (!hamburger) return;
    function openMenu() { mobileMenu.classList.add('open'); overlay.classList.add('active'); document.body.style.overflow = 'hidden'; }
    function closeMenu() { mobileMenu.classList.remove('open'); overlay.classList.remove('active'); document.body.style.overflow = ''; }
    hamburger.addEventListener('click', openMenu); closeBtn.addEventListener('click', closeMenu); overlay.addEventListener('click', closeMenu);
    document.querySelectorAll('.mobile-nav a').forEach(link => link.addEventListener('click', closeMenu));
}

// Scroll to Top
function setupScrollTop() {
    const btn = document.getElementById('scrollTop');
    if (!btn) return;
    window.addEventListener('scroll', () => { btn.classList.toggle('show', window.scrollY > 300); });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// Products Data
const products = [
    { name: "50\" Smart TV", price: "ZMW 4,500", description: "4K Ultra HD, Smart TV with Netflix", image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=300", category: "tv" },
    { name: "32\" LED TV", price: "ZMW 2,200", description: "HD Ready, USB port", image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=300", category: "tv" },
    { name: "Bluetooth Speaker", price: "ZMW 450", description: "Portable, 10W, deep bass", image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=300", category: "audio" },
    { name: "Soundbar", price: "ZMW 1,200", description: "2.1 channel, wireless subwoofer", image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=300", category: "audio" },
    { name: "Phone Charger", price: "ZMW 80", description: "Fast charging, USB-C", image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300", category: "accessory" },
    { name: "Earphones", price: "ZMW 120", description: "Wired, high-quality sound", image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300", category: "accessory" }
];

function setupProductsPage() {
    const grid = document.getElementById('all-products');
    if (!grid) return;
    let currentFilter = 'all', currentSearch = '';
    function render() {
        let filtered = products.filter(p => (currentFilter === 'all' || p.category === currentFilter) && (!currentSearch || p.name.toLowerCase().includes(currentSearch.toLowerCase())));
        grid.innerHTML = filtered.map(p => `<div class="product-card"><img src="${p.image}" alt="${p.name}"><h3>${p.name}</h3><div class="price">${p.price}</div><p class="description">${p.description}</p><a href="https://wa.me/260761616201?text=I'm%20interested%20in%20${encodeURIComponent(p.name)}" class="buy-btn" target="_blank">Buy on WhatsApp</a></div>`).join('');
    }
    const search = document.getElementById('searchInput');
    if (search) search.addEventListener('input', e => { currentSearch = e.target.value; render(); });
    document.querySelectorAll('.filter-btn').forEach(btn => btn.addEventListener('click', () => { document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); currentFilter = btn.dataset.filter; render(); }));
    render();
}

// Contact Form
function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', (e) => { e.preventDefault(); const msg = document.getElementById('formSuccess'); if (msg) { msg.style.display = 'block'; form.reset(); setTimeout(() => msg.style.display = 'none', 5000); } });
}

// Active Nav
function setActiveNav() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-item').forEach(item => { if (item.getAttribute('href') === page) item.classList.add('active'); });
    document.querySelectorAll('.desktop-nav a').forEach(link => { if (link.getAttribute('href') === page) link.style.color = 'gold'; });
}

// Run
document.addEventListener('DOMContentLoaded', () => {
    startSlideshow(); setupMobileMenu(); setupScrollTop(); setupProductsPage(); setupContactForm(); setActiveNav();
    const featuredGrid = document.getElementById('featured-products');
    if (featuredGrid) featuredGrid.innerHTML = products.slice(0, 4).map(p => `<div class="product-card"><img src="${p.image}"><h3>${p.name}</h3><div class="price">${p.price}</div><a href="https://wa.me/260761616201?text=I'm%20interested%20in%20${encodeURIComponent(p.name)}" class="buy-btn">Buy on WhatsApp</a></div>`).join('');
});
