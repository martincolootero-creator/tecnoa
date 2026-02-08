// Data Manager - Handles all data persistence using localStorage

class DataManager {
    constructor() {
        this.initializeData();
    }

    initializeData() {
        // Initialize with default data if none exists
        if (!localStorage.getItem('techmarket_products')) {
            this.setDefaultProducts();
        }
        if (!localStorage.getItem('techmarket_categories')) {
            this.setDefaultCategories();
        }
        if (!localStorage.getItem('techmarket_banners')) {
            this.setDefaultBanners();
        }
        if (!localStorage.getItem('techmarket_sections')) {
            this.setDefaultSections();
        }
    }

    // Categories
    getCategories() {
        return JSON.parse(localStorage.getItem('techmarket_categories') || '[]');
    }

    saveCategories(categories) {
        localStorage.setItem('techmarket_categories', JSON.stringify(categories));
    }

    setDefaultCategories() {
        const categories = [
            { id: 'notebooks', name: 'Notebooks', icon: '💻' },
            { id: 'smartphones', name: 'Smartphones', icon: '📱' },
            { id: 'tablets', name: 'Tablets', icon: '📱' },
            { id: 'audio', name: 'Audio', icon: '🎧' },
            { id: 'gaming', name: 'Gaming', icon: '🎮' },
            { id: 'monitores', name: 'Monitores', icon: '🖥️' },
            { id: 'tv', name: 'Smart TV', icon: '📺' },
            { id: 'accesorios', name: 'Accesorios', icon: '⌨️' }
        ];
        this.saveCategories(categories);
    }

    // Products
    getProducts() {
        return JSON.parse(localStorage.getItem('techmarket_products') || '[]');
    }

    saveProducts(products) {
        localStorage.setItem('techmarket_products', JSON.stringify(products));
    }

    setDefaultProducts() {
        const products = [
            {
                id: 1,
                name: 'Notebook Lenovo IdeaPad 15.6" Intel Core i5 16GB 512GB SSD',
                price: 899999,
                oldPrice: 1199999,
                category: 'notebooks',
                image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400',
                featured: true,
                discount: 25
            },
            {
                id: 2,
                name: 'Samsung Galaxy S24 5G 256GB Negro',
                price: 1299999,
                oldPrice: 1599999,
                category: 'smartphones',
                image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
                featured: true,
                discount: 19
            },
            {
                id: 3,
                name: 'Apple iPad Air 10.9" 256GB Wi-Fi',
                price: 1499999,
                oldPrice: null,
                category: 'tablets',
                image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
                featured: true,
                discount: 0
            },
            {
                id: 4,
                name: 'Sony WH-1000XM5 Auriculares Inalámbricos con Cancelación de Ruido',
                price: 549999,
                oldPrice: 699999,
                category: 'audio',
                image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400',
                featured: true,
                discount: 21
            },
            {
                id: 5,
                name: 'PlayStation 5 + 2 Juegos',
                price: 1199999,
                oldPrice: 1399999,
                category: 'gaming',
                image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400',
                featured: true,
                discount: 14
            },
            {
                id: 6,
                name: 'Monitor Samsung 27" 4K UHD 144Hz',
                price: 649999,
                oldPrice: 799999,
                category: 'monitores',
                image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400',
                featured: false,
                discount: 19
            },
            {
                id: 7,
                name: 'Smart TV Samsung 55" 4K UHD Crystal',
                price: 899999,
                oldPrice: 1099999,
                category: 'tv',
                image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400',
                featured: true,
                discount: 18
            },
            {
                id: 8,
                name: 'Teclado Mecánico Logitech G Pro RGB',
                price: 159999,
                oldPrice: 199999,
                category: 'accesorios',
                image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400',
                featured: false,
                discount: 20
            },
            {
                id: 9,
                name: 'MacBook Air M2 13" 256GB',
                price: 2199999,
                oldPrice: null,
                category: 'notebooks',
                image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
                featured: true,
                discount: 0
            },
            {
                id: 10,
                name: 'iPhone 15 Pro 256GB Titanio Natural',
                price: 2499999,
                oldPrice: null,
                category: 'smartphones',
                image: 'https://images.unsplash.com/photo-1592286927505-267af106c39c?w=400',
                featured: false,
                discount: 0
            },
            {
                id: 11,
                name: 'JBL Flip 6 Parlante Bluetooth Portátil',
                price: 129999,
                oldPrice: 159999,
                category: 'audio',
                image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
                featured: false,
                discount: 19
            },
            {
                id: 12,
                name: 'Nintendo Switch OLED + Mario Kart 8',
                price: 749999,
                oldPrice: 849999,
                category: 'gaming',
                image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400',
                featured: true,
                discount: 12
            }
        ];
        this.saveProducts(products);
    }

    // Banners
    getBanners() {
        return JSON.parse(localStorage.getItem('techmarket_banners') || '[]');
    }

    saveBanners(banners) {
        localStorage.setItem('techmarket_banners', JSON.stringify(banners));
    }

    setDefaultBanners() {
        const banners = [
            {
                id: 1,
                title: 'Ofertas en Notebooks',
                subtitle: 'Hasta 40% OFF en modelos seleccionados',
                image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1400',
                link: '#notebooks',
                active: true
            },
            {
                id: 2,
                title: 'Smartphones 5G',
                subtitle: 'La última tecnología a tu alcance',
                image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1400',
                link: '#smartphones',
                active: true
            },
            {
                id: 3,
                title: 'Gaming Pro',
                subtitle: 'Todo lo que necesitas para jugar',
                image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1400',
                link: '#gaming',
                active: true
            }
        ];
        this.saveBanners(banners);
    }

    // Sections
    getSections() {
        return JSON.parse(localStorage.getItem('techmarket_sections') || '[]');
    }

    saveSections(sections) {
        localStorage.setItem('techmarket_sections', JSON.stringify(sections));
    }

    setDefaultSections() {
        const sections = [
            {
                id: 1,
                title: '🔥 Ofertas destacadas',
                type: 'featured',
                active: true,
                order: 1
            },
            {
                id: 2,
                title: '✨ Novedades',
                type: 'new',
                active: true,
                order: 2
            },
            {
                id: 3,
                title: '⭐ Más vendidos',
                type: 'bestsellers',
                active: true,
                order: 3
            }
        ];
        this.saveSections(sections);
    }

    // Utility Methods
    addProduct(product) {
        const products = this.getProducts();
        product.id = Date.now();
        products.push(product);
        this.saveProducts(products);
        return product;
    }

    updateProduct(productId, updates) {
        const products = this.getProducts();
        const index = products.findIndex(p => p.id === productId);
        if (index !== -1) {
            products[index] = { ...products[index], ...updates };
            this.saveProducts(products);
            return products[index];
        }
        return null;
    }

    deleteProduct(productId) {
        const products = this.getProducts();
        const filtered = products.filter(p => p.id !== productId);
        this.saveProducts(filtered);
    }

    addCategory(category) {
        const categories = this.getCategories();
        category.id = category.name.toLowerCase().replace(/\s+/g, '-');
        categories.push(category);
        this.saveCategories(categories);
        return category;
    }

    updateCategory(categoryId, updates) {
        const categories = this.getCategories();
        const index = categories.findIndex(c => c.id === categoryId);
        if (index !== -1) {
            categories[index] = { ...categories[index], ...updates };
            this.saveCategories(categories);
            return categories[index];
        }
        return null;
    }

    deleteCategory(categoryId) {
        const categories = this.getCategories();
        const filtered = categories.filter(c => c.id !== categoryId);
        this.saveCategories(filtered);
    }

    addBanner(banner) {
        const banners = this.getBanners();
        banner.id = Date.now();
        banners.push(banner);
        this.saveBanners(banners);
        return banner;
    }

    updateBanner(bannerId, updates) {
        const banners = this.getBanners();
        const index = banners.findIndex(b => b.id === bannerId);
        if (index !== -1) {
            banners[index] = { ...banners[index], ...updates };
            this.saveBanners(banners);
            return banners[index];
        }
        return null;
    }

    deleteBanner(bannerId) {
        const banners = this.getBanners();
        const filtered = banners.filter(b => b.id !== bannerId);
        this.saveBanners(filtered);
    }

    addSection(section) {
        const sections = this.getSections();
        section.id = Date.now();
        section.order = sections.length + 1;
        sections.push(section);
        this.saveSections(sections);
        return section;
    }

    updateSection(sectionId, updates) {
        const sections = this.getSections();
        const index = sections.findIndex(s => s.id === sectionId);
        if (index !== -1) {
            sections[index] = { ...sections[index], ...updates };
            this.saveSections(sections);
            return sections[index];
        }
        return null;
    }

    deleteSection(sectionId) {
        const sections = this.getSections();
        const filtered = sections.filter(s => s.id !== sectionId);
        this.saveSections(filtered);
    }

    formatPrice(price) {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    }
}

// Global instance
const dataManager = new DataManager();
