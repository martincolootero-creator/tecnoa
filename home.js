// Home Page Controller

document.addEventListener('DOMContentLoaded', () => {
    loadBanners();
    loadCategories();
    loadSections();
    setupSearch();
    setupNavigation();
});

// Banner Slider
let currentBannerIndex = 0;
let bannerInterval;

function loadBanners() {
    const banners = dataManager.getBanners().filter(b => b.active);
    const slider = document.getElementById('bannerSlider');
    const dotsContainer = document.getElementById('bannerDots');
    
    if (banners.length === 0) {
        slider.innerHTML = '<div class="banner-slide active" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center;"><div class="banner-content" style="position: static;"><h2>Bienvenido a TechMarket</h2><p>Configura banners desde el Panel Admin</p></div></div>';
        return;
    }
    
    slider.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    banners.forEach((banner, index) => {
        // Create slide
        const slide = document.createElement('div');
        slide.className = 'banner-slide' + (index === 0 ? ' active' : '');
        slide.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${banner.image})`;
        slide.innerHTML = `
            <div class="banner-content">
                <h2>${banner.title}</h2>
                <p>${banner.subtitle}</p>
            </div>
        `;
        slide.onclick = () => window.location.href = banner.link;
        slider.appendChild(slide);
        
        // Create dot
        const dot = document.createElement('div');
        dot.className = 'dot' + (index === 0 ? ' active' : '');
        dot.onclick = () => goToBanner(index);
        dotsContainer.appendChild(dot);
    });
    
    if (banners.length > 1) {
        startBannerSlider();
    }
}

function startBannerSlider() {
    bannerInterval = setInterval(nextBanner, 5000);
}

function nextBanner() {
    const banners = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.dot');
    
    banners[currentBannerIndex].classList.remove('active');
    dots[currentBannerIndex].classList.remove('active');
    
    currentBannerIndex = (currentBannerIndex + 1) % banners.length;
    
    banners[currentBannerIndex].classList.add('active');
    dots[currentBannerIndex].classList.add('active');
}

function goToBanner(index) {
    const banners = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.dot');
    
    banners[currentBannerIndex].classList.remove('active');
    dots[currentBannerIndex].classList.remove('active');
    
    currentBannerIndex = index;
    
    banners[currentBannerIndex].classList.add('active');
    dots[currentBannerIndex].classList.add('active');
    
    clearInterval(bannerInterval);
    startBannerSlider();
}

// Categories
function loadCategories() {
    const categories = dataManager.getCategories();
    const grid = document.getElementById('categoriesGrid');
    
    if (categories.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999;">No hay categorías. Agrégalas desde el Panel Admin.</p>';
        return;
    }
    
    grid.innerHTML = categories.map(category => `
        <a href="category.html?id=${category.id}" class="category-card">
            <div class="category-icon">${category.icon}</div>
            <div class="category-name">${category.name}</div>
        </a>
    `).join('');
}

// Dynamic Sections
function loadSections() {
    const sections = dataManager.getSections().filter(s => s.active).sort((a, b) => a.order - b.order);
    const container = document.getElementById('dynamicSections');
    const products = dataManager.getProducts();
    
    container.innerHTML = sections.map(section => {
        let sectionProducts = [];
        
        switch(section.type) {
            case 'featured':
                sectionProducts = products.filter(p => p.featured).slice(0, 8);
                break;
            case 'new':
                sectionProducts = products.slice().reverse().slice(0, 8);
                break;
            case 'bestsellers':
                sectionProducts = products.slice(0, 8);
                break;
            case 'category':
                sectionProducts = products.filter(p => p.category === section.categoryId).slice(0, 8);
                break;
            default:
                sectionProducts = products.slice(0, 8);
        }
        
        if (sectionProducts.length === 0) return '';
        
        return `
            <section class="section">
                <div class="section-header">
                    <h2>${section.title}</h2>
                    <a href="#">Ver todos →</a>
                </div>
                <div class="product-grid">
                    ${sectionProducts.map(product => renderProduct(product)).join('')}
                </div>
            </section>
        `;
    }).join('');
}

function renderProduct(product) {
    const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
    
    return `
        <a href="product.html?id=${product.id}" class="product-card">
            ${discount > 0 ? `<div class="product-badge">${discount}% OFF</div>` : ''}
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/400x400?text=Imagen+no+disponible'">
            <div class="product-name">${product.name}</div>
            <div class="product-price">${dataManager.formatPrice(product.price)}</div>
            ${product.oldPrice ? `<div class="product-old-price">${dataManager.formatPrice(product.oldPrice)}</div>` : ''}
            <div class="product-installments">12 cuotas sin interés</div>
        </a>
    `;
}

// Navigation
function setupNavigation() {
    const categories = dataManager.getCategories();
    const nav = document.getElementById('navCategories');
    
    const categoryLinks = categories.map(cat => 
        `<a href="category.html?id=${cat.id}">${cat.icon} ${cat.name}</a>`
    ).join('');
    
    nav.innerHTML = `
        <a href="#ofertas">🔥 Ofertas</a>
        <a href="#nuevos">✨ Novedades</a>
        ${categoryLinks}
    `;
}

// Search
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `search.html?q=${encodeURIComponent(query)}`;
            }
        }
    });
}
