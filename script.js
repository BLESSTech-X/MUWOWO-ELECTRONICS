// Slideshow
let slideIndex = 0;
let slideInterval;

function showSlides() {
    const slides = document.getElementsByClassName("slide");
    if (slides.length === 0) return;
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].classList.add("active");
    }
}

function startSlideshow() {
    if (document.getElementsByClassName("slide").length > 0) {
        showSlides();
        slideInterval = setInterval(showSlides, 5000);
    }
}

function changeSlide(n) {
    clearInterval(slideInterval);
    const slides = document.getElementsByClassName("slide");
    slideIndex += n;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    if (slideIndex < 1) {
        slideIndex = slides.length;
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].classList.add("active");
    }
    slideInterval = setInterval(showSlides, 5000);
}

// Mobile Menu
function setupMobileMenu() {
    const hamburger = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeBtn = document.getElementById('closeMenuBtn');
    const overlay = document.getElementById('menuOverlay');
    
    if (!hamburger) return;
    
    function openMenu() {
        mobileMenu.classList.add('open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMenu() {
        mobileMenu.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    hamburger.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);
    
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

// Scroll to Top
function setupScrollTop() {
    const btn = document.getElementById('scrollTop');
    if (!btn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Active Navigation Highlight
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
            item.classList.add('active');
        }
    });
    
    const desktopLinks = document.querySelectorAll('.desktop-nav a');
    desktopLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
            link.style.color = '#00d4ff';
        }
    });
}

// Products Data
const products = [
    { name: "50\" 4K Smart TV", price: "ZMW 4,500", description: "4K Ultra HD, Smart TV with Netflix, YouTube, Bluetooth", image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=300", category: "tv" },
    { name: "43\" LED TV", price: "ZMW 2,800", description: "Full HD, USB port, HDMI, Wall mount ready", image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=300", category: "tv" },
    { name: "32\" LED TV", price: "ZMW 2,200", description: "HD Ready, USB port, HDMI, 2-year warranty", image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=300", category: "tv" },
    { name: "Bluetooth Speaker", price: "ZMW 450", description: "Portable, 10W, deep bass, 10-hour battery", image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=300", category: "audio" },
    { name: "Soundbar", price: "ZMW 1,200", description: "2.1 channel, wireless subwoofer, Bluetooth", image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=300", category: "audio" },
    { name: "Home Theater", price: "ZMW 2,800", description: "5.1 channel, FM radio, USB, Bluetooth", image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=300", category: "audio" },
    { name: "Fast Charger", price: "ZMW 80", description: "20W USB-C fast charger, compatible with all phones", image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300", category: "accessory" },
    { name: "Premium Earphones", price: "ZMW 120", description: "Wired, high-quality sound, mic included", image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300", category: "accessory" },
    { name: "Wireless Earbuds", price: "ZMW 350", description: "True wireless, charging case, 20-hour battery", image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300", category: "accessory" },
    { name: "HDMI Cable", price: "ZMW 50", description: "1.5m, 4K support, gold-plated connectors", image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300", category: "accessory" }
];

// Setup Products Page
function setupProductsPage() {
    const grid = document.getElementById('all-products');
    if (!grid) return;
    
    let currentFilter = 'all';
    let currentSearch = '';
    
    function renderProducts() {
        let filtered = products.filter(p => {
            const matchFilter = currentFilter === 'all' || p.category === currentFilter;
            const matchSearch = !currentSearch || p.name.toLowerCase().includes(currentSearch.toLowerCase());
            return matchFilter && matchSearch;
        });
        
        if (filtered.length === 0) {
            grid.innerHTML = '<div style="text-align:center; padding:40px;">No products found. Try another search.</div>';
            return;
        }
        
        grid.innerHTML = filtered.map(p => `
            <div class="product-card">
                <img src="${p.image}" alt="${p.name}">
                <h3>${p.name}</h3>
                <div class="price">${p.price}</div>
                <p class="description">${p.description}</p>
                <a href="https://wa.me/260761616201?text=I'm%20interested%20in%20${encodeURIComponent(p.name)}" class="buy-btn" target="_blank">Buy on WhatsApp</a>
            </div>
        `).join('');
    }
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value;
            renderProducts();
        });
    }
    
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderProducts();
        });
    });
    
    renderProducts();
}

// Contact Form
function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const successMsg = document.getElementById('formSuccess');
        if (successMsg) {
            successMsg.style.display = 'block';
            form.reset();
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 5000);
        } else {
            alert('Message sent! We will reply within 24 hours.');
            form.reset();
        }
    });
}

// Load Featured Products on Homepage
function loadFeaturedProducts() {
    const featuredGrid = document.getElementById('featured-products');
    if (!featuredGrid) return;
    
    const featured = products.slice(0, 4);
    featuredGrid.innerHTML = featured.map(p => `
        <div class="product-card">
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <div class="price">${p.price}</div>
            <p class="description">${p.description}</p>
            <a href="https://wa.me/260761616201?text=I'm%20interested%20in%20${encodeURIComponent(p.name)}" class="buy-btn" target="_blank">Buy on WhatsApp</a>
        </div>
    `).join('');
}

// Initialize All
document.addEventListener('DOMContentLoaded', () => {
    startSlideshow();
    setupMobileMenu();
    setupScrollTop();
    setActiveNav();
    setupProductsPage();
    setupContactForm();
    loadFeaturedProducts();
});
