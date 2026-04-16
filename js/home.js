// home.js — Tecnomundo

document.addEventListener('DOMContentLoaded', () => {
    loadCategoryNav();
    loadBannerSlider();
    loadCategoryStrip();
    loadDynamicSections();
    setupSearch();
});

function loadCategoryNav() {
    const cats = dataManager.getCategories();
    const nav  = document.getElementById('catNavInner');
    nav.innerHTML = '<a href="#" class="hl-o">🔥 Ofertas</a><a href="#" class="hl-b">✨ Novedades</a>' +
        cats.map(c => `<a href="category.html?id=${c.id}">${c.icon} ${c.name}</a>`).join('');
}

let currentSlide = 0, sliderTimer;

function loadBannerSlider() {
    const banners = dataManager.getBanners().filter(b => b.active);
    const slider  = document.getElementById('bannerSlider');
    const dots    = document.getElementById('slideDots');
    if (!banners.length) {
        slider.innerHTML = '<div class="slide active" style="background:linear-gradient(135deg,#FF6517,#4E71FD);display:flex;align-items:center;justify-content:center;"><div style="color:white;text-align:center;"><h2 style="font-size:30px;font-weight:800;">Bienvenido a Tecnomundo</h2><p style="margin-top:10px;opacity:.85;">Configurá banners desde el Panel Admin</p></div></div>';
        return;
    }
    slider.innerHTML = banners.map((b,i) =>
        `<div class="slide${i===0?' active':''}" style="background-image:url('${b.image}')" data-link="${b.link}">
           <div class="slide-overlay"></div>
           <div class="slide-content"><span class="slide-tag">Promoción</span><h2>${b.title}</h2><p>${b.subtitle}</p></div>
         </div>`).join('');
    dots.innerHTML = banners.map((_,i) => `<button class="dot${i===0?' active':''}" onclick="goToSlide(${i})"></button>`).join('');
    slider.appendChild(dots);
    slider.querySelectorAll('.slide').forEach(s => {
        s.addEventListener('click', () => { if(s.dataset.link && s.dataset.link!=='#') window.location.href=s.dataset.link; });
        s.style.cursor='pointer';
    });
    if (banners.length > 1) sliderTimer = setInterval(advanceSlide, 5000);
}

function advanceSlide() {
    const slides=document.querySelectorAll('.slide'), dots=document.querySelectorAll('#slideDots .dot');
    slides[currentSlide].classList.remove('active'); dots[currentSlide]?.classList.remove('active');
    currentSlide=(currentSlide+1)%slides.length;
    slides[currentSlide].classList.add('active'); dots[currentSlide]?.classList.add('active');
}

function goToSlide(n) {
    clearInterval(sliderTimer);
    const slides=document.querySelectorAll('.slide'), dots=document.querySelectorAll('#slideDots .dot');
    slides[currentSlide].classList.remove('active'); dots[currentSlide]?.classList.remove('active');
    currentSlide=n;
    slides[currentSlide].classList.add('active'); dots[currentSlide]?.classList.add('active');
    sliderTimer=setInterval(advanceSlide,5000);
}

function loadCategoryStrip() {
    const cats=dataManager.getCategories();
    const grid=document.getElementById('catsIconsGrid');
    if(!cats.length){grid.innerHTML='<p style="color:#999;grid-column:1/-1;">Sin categorías. Agregá desde el Panel Admin.</p>';return;}
    grid.innerHTML=cats.map(c=>`<a href="category.html?id=${c.id}" class="cat-icon-item"><div class="cat-icon-circle">${c.icon}</div><span class="cat-icon-label">${c.name}</span></a>`).join('');
}

function loadDynamicSections() {
    const sections=dataManager.getSections().filter(s=>s.active).sort((a,b)=>a.order-b.order);
    const products=dataManager.getProducts();
    const container=document.getElementById('dynamicSections');
    container.innerHTML=sections.map(sec=>{
        let prods=[];
        switch(sec.type){
            case 'featured':    prods=products.filter(p=>p.featured).slice(0,10); break;
            case 'new':         prods=[...products].reverse().slice(0,10); break;
            case 'bestsellers': prods=products.slice(0,10); break;
            case 'category':    prods=products.filter(p=>p.category===sec.categoryId).slice(0,10); break;
            default:            prods=products.slice(0,10);
        }
        if(!prods.length) return '';
        return `<section class="prod-section"><div class="section-head"><h2>${sec.title}</h2><a href="#" class="see-all">Ver todos →</a></div><div class="prod-grid">${prods.map(p=>renderCard(p)).join('')}</div></section>`;
    }).join('');
    if(!container.innerHTML.trim()){
        container.innerHTML=`<section class="prod-section"><div class="section-head"><h2>Productos destacados</h2></div><div class="prod-grid">${products.slice(0,10).map(p=>renderCard(p)).join('')}</div></section>`;
    }
}

function renderCard(p){
    const d=p.oldPrice?Math.round((1-p.price/p.oldPrice)*100):0;
    const url=`product.html?id=${p.id}`;
    return `<div class="prod-card" onclick="window.location='${url}'" style="cursor:pointer">
        ${d>0?`<span class="disc-badge">${d}% OFF</span>`:''}
        <img class="prod-img" src="${p.image}" alt="${p.name}" onerror="this.src='https://placehold.co/300x300?text=Sin+imagen'">
        <div class="prod-name">${p.name}</div>
        ${p.oldPrice?`<div class="prod-old-price">${dataManager.formatPrice(p.oldPrice)}</div>`:''}
        <div class="prod-price">${dataManager.formatPrice(p.price)}</div>
        <div class="prod-installments">12 cuotas sin interés de ${dataManager.formatPrice(p.price/12)}</div>
    </div>`;
}

function setupSearch(){
    const input=document.getElementById('searchInput');
    if(!input) return;
    const go=()=>{const q=input.value.trim();if(q)window.location.href='search.html?q='+encodeURIComponent(q);};
    input.addEventListener('keydown',e=>{if(e.key==='Enter')go();});
    document.querySelector('.search-btn')?.addEventListener('click',go);
}
