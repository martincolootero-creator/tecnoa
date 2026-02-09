// Admin Panel Controller

document.addEventListener('DOMContentLoaded', () => {
    loadDashboardStats();
    loadProductsTable();
    loadCategoriesTable();
    loadBannersTable();
    loadSectionsTable();
    setupForms();
});

// Tab Switching
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(`${tabName}-tab`).classList.add('active');
    event.target.classList.add('active');
}

// Dashboard Stats
function loadDashboardStats() {
    const products = dataManager.getProducts();
    const categories = dataManager.getCategories();
    const banners = dataManager.getBanners().filter(b => b.active);
    const sections = dataManager.getSections().filter(s => s.active);
    
    document.getElementById('stat-products').textContent = products.length;
    document.getElementById('stat-categories').textContent = categories.length;
    document.getElementById('stat-banners').textContent = banners.length;
    document.getElementById('stat-sections').textContent = sections.length;
}

// PRODUCTS
function loadProductsTable() {
    const products = dataManager.getProducts();
    const categories = dataManager.getCategories();
    const container = document.getElementById('products-table');
    
    if (products.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📦</div>
                <h3>No hay productos</h3>
                <p>Comienza agregando tu primer producto</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = `
        <table class="table">
            <thead>
                <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Destacado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${products.map(product => {
                    const category = categories.find(c => c.id === product.category);
                    return `
                        <tr>
                            <td><img src="${product.image}" onerror="this.src='https://via.placeholder.com/60'"></td>
                            <td style="max-width: 300px;">${product.name}</td>
                            <td>${category ? category.name : 'Sin categoría'}</td>
                            <td><strong>${dataManager.formatPrice(product.price)}</strong></td>
                            <td>${product.featured ? '<span class="badge badge-success">Sí</span>' : '<span class="badge">No</span>'}</td>
                            <td>
                                <div class="table-actions">
                                    <button class="btn btn-secondary" onclick="editProduct(${product.id})">Editar</button>
                                    <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Eliminar</button>
                                </div>
                            </td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
    `;
}

function openProductModal(productId = null) {
    const modal = document.getElementById('product-modal');
    const form = document.getElementById('product-form');
    const categories = dataManager.getCategories();
    
    // Populate category dropdown
    const categorySelect = document.getElementById('product-category');
    categorySelect.innerHTML = categories.map(cat => 
        `<option value="${cat.id}">${cat.name}</option>`
    ).join('');
    
    if (productId) {
        const product = dataManager.getProducts().find(p => p.id === productId);
        if (product) {
            document.getElementById('product-modal-title').textContent = 'Editar Producto';
            document.getElementById('product-id').value = product.id;
            document.getElementById('product-name').value = product.name;
            document.getElementById('product-price').value = product.price;
            document.getElementById('product-old-price').value = product.oldPrice || '';
            document.getElementById('product-category').value = product.category;
            document.getElementById('product-image').value = product.image;
            document.getElementById('product-featured').checked = product.featured;
        }
    } else {
        document.getElementById('product-modal-title').textContent = 'Agregar Producto';
        form.reset();
        document.getElementById('product-id').value = '';
    }
    
    modal.classList.add('active');
}

function closeProductModal() {
    document.getElementById('product-modal').classList.remove('active');
}

function editProduct(productId) {
    openProductModal(productId);
}

function deleteProduct(productId) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
        dataManager.deleteProduct(productId);
        loadProductsTable();
        loadDashboardStats();
    }
}

// CATEGORIES
function loadCategoriesTable() {
    const categories = dataManager.getCategories();
    const container = document.getElementById('categories-table');
    
    if (categories.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📁</div>
                <h3>No hay categorías</h3>
                <p>Agrega categorías para organizar tus productos</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = `
        <table class="table">
            <thead>
                <tr>
                    <th>Icono</th>
                    <th>Nombre</th>
                    <th>ID</th>
                    <th>Productos</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${categories.map(category => {
                    const products = dataManager.getProducts().filter(p => p.category === category.id);
                    return `
                        <tr>
                            <td style="font-size: 32px;">${category.icon}</td>
                            <td><strong>${category.name}</strong></td>
                            <td><code>${category.id}</code></td>
                            <td>${products.length} productos</td>
                            <td>
                                <div class="table-actions">
                                    <button class="btn btn-secondary" onclick="editCategory('${category.id}')">Editar</button>
                                    <button class="btn btn-danger" onclick="deleteCategory('${category.id}')">Eliminar</button>
                                </div>
                            </td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
    `;
}

function openCategoryModal(categoryId = null) {
    const modal = document.getElementById('category-modal');
    const form = document.getElementById('category-form');
    
    if (categoryId) {
        const category = dataManager.getCategories().find(c => c.id === categoryId);
        if (category) {
            document.getElementById('category-modal-title').textContent = 'Editar Categoría';
            document.getElementById('category-id').value = category.id;
            document.getElementById('category-name').value = category.name;
            document.getElementById('category-icon').value = category.icon;
        }
    } else {
        document.getElementById('category-modal-title').textContent = 'Agregar Categoría';
        form.reset();
        document.getElementById('category-id').value = '';
    }
    
    modal.classList.add('active');
}

function closeCategoryModal() {
    document.getElementById('category-modal').classList.remove('active');
}

function editCategory(categoryId) {
    openCategoryModal(categoryId);
}

function deleteCategory(categoryId) {
    const products = dataManager.getProducts().filter(p => p.category === categoryId);
    if (products.length > 0) {
        alert('No puedes eliminar una categoría que tiene productos. Elimina primero los productos o cámbialos de categoría.');
        return;
    }
    
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
        dataManager.deleteCategory(categoryId);
        loadCategoriesTable();
        loadDashboardStats();
    }
}

// BANNERS
function loadBannersTable() {
    const banners = dataManager.getBanners();
    const container = document.getElementById('banners-table');
    
    if (banners.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🎨</div>
                <h3>No hay banners</h3>
                <p>Agrega banners promocionales para el home</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = `
        <table class="table">
            <thead>
                <tr>
                    <th>Imagen</th>
                    <th>Título</th>
                    <th>Subtítulo</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${banners.map(banner => `
                    <tr>
                        <td><img src="${banner.image}" style="width: 120px; height: 40px; object-fit: cover;"></td>
                        <td><strong>${banner.title}</strong></td>
                        <td>${banner.subtitle}</td>
                        <td>${banner.active ? '<span class="badge badge-success">Activo</span>' : '<span class="badge badge-danger">Inactivo</span>'}</td>
                        <td>
                            <div class="table-actions">
                                <button class="btn btn-secondary" onclick="editBanner(${banner.id})">Editar</button>
                                <button class="btn btn-danger" onclick="deleteBanner(${banner.id})">Eliminar</button>
                            </div>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function openBannerModal(bannerId = null) {
    const modal = document.getElementById('banner-modal');
    const form = document.getElementById('banner-form');
    
    if (bannerId) {
        const banner = dataManager.getBanners().find(b => b.id === bannerId);
        if (banner) {
            document.getElementById('banner-modal-title').textContent = 'Editar Banner';
            document.getElementById('banner-id').value = banner.id;
            document.getElementById('banner-title').value = banner.title;
            document.getElementById('banner-subtitle').value = banner.subtitle;
            document.getElementById('banner-image').value = banner.image;
            document.getElementById('banner-link').value = banner.link;
            document.getElementById('banner-active').checked = banner.active;
        }
    } else {
        document.getElementById('banner-modal-title').textContent = 'Agregar Banner';
        form.reset();
        document.getElementById('banner-id').value = '';
    }
    
    modal.classList.add('active');
}

function closeBannerModal() {
    document.getElementById('banner-modal').classList.remove('active');
}

function editBanner(bannerId) {
    openBannerModal(bannerId);
}

function deleteBanner(bannerId) {
    if (confirm('¿Estás seguro de eliminar este banner?')) {
        dataManager.deleteBanner(bannerId);
        loadBannersTable();
        loadDashboardStats();
    }
}

// SECTIONS
function loadSectionsTable() {
    const sections = dataManager.getSections().sort((a, b) => a.order - b.order);
    const container = document.getElementById('sections-table');
    
    if (sections.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📐</div>
                <h3>No hay secciones</h3>
                <p>Agrega secciones para organizar el home</p>
            </div>
        `;
        return;
    }
    
    const typeLabels = {
        'featured': 'Destacados',
        'new': 'Novedades',
        'bestsellers': 'Más vendidos',
        'category': 'Categoría'
    };
    
    container.innerHTML = `
        <table class="table">
            <thead>
                <tr>
                    <th>Orden</th>
                    <th>Título</th>
                    <th>Tipo</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${sections.map(section => `
                    <tr>
                        <td><strong>#${section.order}</strong></td>
                        <td>${section.title}</td>
                        <td>${typeLabels[section.type] || section.type}</td>
                        <td>${section.active ? '<span class="badge badge-success">Activo</span>' : '<span class="badge badge-danger">Inactivo</span>'}</td>
                        <td>
                            <div class="table-actions">
                                <button class="btn btn-secondary" onclick="editSection(${section.id})">Editar</button>
                                <button class="btn btn-danger" onclick="deleteSection(${section.id})">Eliminar</button>
                            </div>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function openSectionModal(sectionId = null) {
    const modal = document.getElementById('section-modal');
    const form = document.getElementById('section-form');
    const categories = dataManager.getCategories();
    
    // Populate category dropdown
    const categorySelect = document.getElementById('section-category');
    categorySelect.innerHTML = categories.map(cat => 
        `<option value="${cat.id}">${cat.name}</option>`
    ).join('');
    
    if (sectionId) {
        const section = dataManager.getSections().find(s => s.id === sectionId);
        if (section) {
            document.getElementById('section-modal-title').textContent = 'Editar Sección';
            document.getElementById('section-id').value = section.id;
            document.getElementById('section-title').value = section.title;
            document.getElementById('section-type').value = section.type;
            document.getElementById('section-active').checked = section.active;
            if (section.categoryId) {
                document.getElementById('section-category').value = section.categoryId;
            }
            
            // Show/hide category selector
            if (section.type === 'category') {
                document.getElementById('section-category-group').style.display = 'block';
            }
        }
    } else {
        document.getElementById('section-modal-title').textContent = 'Agregar Sección';
        form.reset();
        document.getElementById('section-id').value = '';
        document.getElementById('section-category-group').style.display = 'none';
    }
    
    modal.classList.add('active');
}

function closeSectionModal() {
    document.getElementById('section-modal').classList.remove('active');
}

function editSection(sectionId) {
    openSectionModal(sectionId);
}

function deleteSection(sectionId) {
    if (confirm('¿Estás seguro de eliminar esta sección?')) {
        dataManager.deleteSection(sectionId);
        loadSectionsTable();
        loadDashboardStats();
    }
}

// FORM HANDLERS
function setupForms() {
    // Product Form
    document.getElementById('product-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const productData = {
            name: document.getElementById('product-name').value,
            price: parseInt(document.getElementById('product-price').value),
            oldPrice: document.getElementById('product-old-price').value ? parseInt(document.getElementById('product-old-price').value) : null,
            category: document.getElementById('product-category').value,
            image: document.getElementById('product-image').value,
            featured: document.getElementById('product-featured').checked
        };
        
        const productId = document.getElementById('product-id').value;
        
        if (productId) {
            dataManager.updateProduct(parseInt(productId), productData);
        } else {
            dataManager.addProduct(productData);
        }
        
        closeProductModal();
        loadProductsTable();
        loadDashboardStats();
    });
    
    // Category Form
    document.getElementById('category-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const categoryData = {
            name: document.getElementById('category-name').value,
            icon: document.getElementById('category-icon').value
        };
        
        const categoryId = document.getElementById('category-id').value;
        
        if (categoryId) {
            dataManager.updateCategory(categoryId, categoryData);
        } else {
            dataManager.addCategory(categoryData);
        }
        
        closeCategoryModal();
        loadCategoriesTable();
        loadDashboardStats();
    });
    
    // Banner Form
    document.getElementById('banner-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const bannerData = {
            title: document.getElementById('banner-title').value,
            subtitle: document.getElementById('banner-subtitle').value,
            image: document.getElementById('banner-image').value,
            link: document.getElementById('banner-link').value,
            active: document.getElementById('banner-active').checked
        };
        
        const bannerId = document.getElementById('banner-id').value;
        
        if (bannerId) {
            dataManager.updateBanner(parseInt(bannerId), bannerData);
        } else {
            dataManager.addBanner(bannerData);
        }
        
        closeBannerModal();
        loadBannersTable();
        loadDashboardStats();
    });
    
    // Section Form
    document.getElementById('section-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const sectionData = {
            title: document.getElementById('section-title').value,
            type: document.getElementById('section-type').value,
            active: document.getElementById('section-active').checked
        };
        
        if (sectionData.type === 'category') {
            sectionData.categoryId = document.getElementById('section-category').value;
        }
        
        const sectionId = document.getElementById('section-id').value;
        
        if (sectionId) {
            dataManager.updateSection(parseInt(sectionId), sectionData);
        } else {
            dataManager.addSection(sectionData);
        }
        
        closeSectionModal();
        loadSectionsTable();
        loadDashboardStats();
    });
    
    // Section type change handler
    document.getElementById('section-type').addEventListener('change', (e) => {
        const categoryGroup = document.getElementById('section-category-group');
        if (e.target.value === 'category') {
            categoryGroup.style.display = 'block';
        } else {
            categoryGroup.style.display = 'none';
        }
    });
}
