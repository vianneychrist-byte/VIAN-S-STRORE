// Store Configuration & Initial Data
let storeConfig = {
    whatsappNumber: '2250700000000'
};

const initialProducts = [
    {
        id: 'VS-01',
        name: 'Oversized Hoodie Streetwear Black',
        gender: 'HOMME',
        category: 'Hoodies',
        price: 18000,
        promoPrice: 15000,
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
        sizes: ['M', 'L', 'XL', 'XXL'],
        colors: ['Noir', 'Gris'],
        stock: 12,
        desc: 'Hoodie ultra confortable en coton lourd 400 GSM. Coupe oversized moderne typique du streetwear abidjanais.'
    },
    {
        id: 'VS-02',
        name: 'T-Shirt Graphic "VIVRE FRAIS"',
        gender: 'HOMME',
        category: 'T-shirts',
        price: 10000,
        promoPrice: 8500,
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Blanc', 'Noir', 'Orange'],
        stock: 20,
        desc: 'T-shirt graphique premium floqué du slogan officiel de la marque VIAN’S STORE.'
    },
    {
        id: 'VS-03',
        name: 'Ensemble Cargo Urban Fit Female',
        gender: 'FEMME',
        category: 'Ensembles',
        price: 25000,
        promoPrice: null,
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
        sizes: ['S', 'M', 'L'],
        colors: ['Beige', 'Noir'],
        stock: 8,
        desc: 'Top court et pantalon cargo assorti. Style urbain affirmé et respirant.'
    },
    {
        id: 'VS-04',
        name: 'Jean Wide Leg Brut Street',
        gender: 'HOMME',
        category: 'Jeans',
        price: 20000,
        promoPrice: 18000,
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80',
        sizes: ['30', '32', '34', '36'],
        colors: ['Bleu Brut', 'Noir Delavé'],
        stock: 15,
        desc: 'Jean coupe large en denim haute qualité. Finitions soignées et look décontracté.'
    },
    {
        id: 'VS-05',
        name: 'Crop Top & Veste Oversized',
        gender: 'FEMME',
        category: 'Tops et crop tops',
        price: 22000,
        promoPrice: null,
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
        sizes: ['S', 'M', 'L'],
        colors: ['Blanc/Orange', 'Noir'],
        stock: 10,
        desc: 'Ensemble féminin streetwear léger et tendance pour les sorties d’Abidjan.'
    }
];

const initialVideos = [
    {
        title: 'Drop Collection Urban 2026',
        productId: 'VS-01',
        videoUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=500&q=80'
    },
    {
        title: 'Focus T-Shirt "VIVRE FRAIS"',
        productId: 'VS-02',
        videoUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=500&q=80'
    }
];

let products = [...initialProducts];
let videos = [...initialVideos];
let cart = [];
let currentDeliveryFee = 1500;
let selectedSize = '';
let selectedColor = '';

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    renderCatalog(products);
    renderVideos();
    renderAdminProducts();
    updateNavWhatsApp();
});

function showSection(sectionId) {
    ['home', 'product-detail', 'trends', 'about', 'admin'].forEach(id => {
        document.getElementById(`view-${id}`).classList.add('hidden');
    });
    document.getElementById(`view-${sectionId}`).classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToCatalog() {
    showSection('home');
    document.getElementById('catalog-section').scrollIntoView({ behavior: 'smooth' });
}

function toggleMobileMenu() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
}

function toggleSearchModal() {
    document.getElementById('search-modal').classList.toggle('hidden');
}

function toggleCartModal() {
    document.getElementById('cart-modal').classList.toggle('hidden');
}

function renderCatalog(items) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = items.map(p => {
        const finalPrice = p.promoPrice || p.price;
        const hasPromo = p.promoPrice !== null;
        return `
            <div class="bg-brandGray rounded-2xl overflow-hidden border border-brandAnthracite hover:border-brandOrange transition flex flex-col justify-between">
                <div class="relative cursor-pointer" onclick="viewProductDetail('${p.id}')">
                    <img src="${p.image}" alt="${p.name}" class="w-full h-72 object-cover">
                    ${hasPromo ? `<span class="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded uppercase">PROMO</span>` : ''}
                    <span class="absolute top-3 right-3 bg-brandDark/80 text-white text-[10px] font-bold px-2 py-1 rounded">${p.gender}</span>
                </div>
                <div class="p-5 space-y-3 flex-grow flex flex-col justify-between">
                    <div>
                        <span class="text-xs text-gray-400 font-bold uppercase">${p.category}</span>
                        <h3 class="text-base font-bold text-white cursor-pointer hover:text-brandOrange transition" onclick="viewProductDetail('${p.id}')">${p.name}</h3>
                    </div>
                    <div class="space-y-3">
                        <div class="flex items-baseline gap-2">
                            <span class="text-lg font-black text-brandOrange">${finalPrice.toLocaleString('fr-FR')} FCFA</span>
                            ${hasPromo ? `<span class="text-xs text-gray-500 line-through">${p.price.toLocaleString('fr-FR')} FCFA</span>` : ''}
                        </div>
                        <button onclick="viewProductDetail('${p.id}')" class="w-full bg-brandAnthracite hover:bg-brandOrange text-white font-bold py-2.5 rounded-lg text-xs uppercase tracking-wider transition">
                            Commander / Variantes
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    lucide.createIcons();
}

function filterCatalog(category) {
    showSection('home');
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.classList.remove('bg-brandOrange');
        btn.classList.add('bg-brandAnthracite');
    });
    const activeBtn = document.getElementById(`btn-cat-${category}`);
    if (activeBtn) {
        activeBtn.classList.remove('bg-brandAnthracite');
        activeBtn.classList.add('bg-brandOrange');
    }

    if (category === 'all') {
        renderCatalog(products);
    } else if (category === 'promo') {
        renderCatalog(products.filter(p => p.promoPrice !== null));
    } else {
        renderCatalog(products.filter(p => p.gender === category));
    }
}

function viewProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const finalPrice = product.promoPrice || product.price;
    const container = document.getElementById('product-detail-container');

    container.innerHTML = `
        <div>
            <img src="${product.image}" alt="${product.name}" class="w-full h-96 md:h-[450px] object-cover rounded-xl border border-brandAnthracite">
        </div>
        <div class="space-y-6">
            <div>
                <span class="text-xs font-bold text-brandOrange uppercase">${product.gender} • ${product.category}</span>
                <h1 class="text-3xl font-black text-white mt-1">${product.name}</h1>
                <p class="text-xs text-gray-500 mt-1">Réf: ${product.id}</p>
            </div>

            <div class="flex items-baseline gap-3">
                <span class="text-2xl font-black text-brandOrange">${finalPrice.toLocaleString('fr-FR')} FCFA</span>
                ${product.promoPrice ? `<span class="text-sm text-gray-500 line-through">${product.price.toLocaleString('fr-FR')} FCFA</span>` : ''}
            </div>

            <p class="text-sm text-gray-300 leading-relaxed">${product.desc}</p>

            <div class="space-y-2">
                <label class="text-xs font-bold text-gray-400 uppercase">Taille disponible :</label>
                <div class="flex gap-2">
                    ${product.sizes.map((s, idx) => `
                        <button onclick="selectVariant('size', '${s}', this)" class="variant-size-btn border ${idx === 0 ? 'border-brandOrange text-brandOrange' : 'border-brandAnthracite text-white'} px-3 py-1.5 rounded text-xs font-bold">${s}</button>
                    `).join('')}
                </div>
            </div>

            <div class="space-y-2">
                <label class="text-xs font-bold text-gray-400 uppercase">Couleur disponible :</label>
                <div class="flex gap-2">
                    ${product.colors.map((c, idx) => `
                        <button onclick="selectVariant('color', '${c}', this)" class="variant-color-btn border ${idx === 0 ? 'border-brandOrange text-brandOrange' : 'border-brandAnthracite text-white'} px-3 py-1.5 rounded text-xs font-bold">${c}</button>
                    `).join('')}
                </div>
            </div>

            <div class="pt-4 space-y-3">
                <button onclick="addToCartFromDetail('${product.id}')" class="w-full bg-brandOrange hover:bg-brandOrangeHover text-white font-extrabold py-3.5 rounded-xl uppercase text-sm tracking-wider shadow-lg transition flex items-center justify-center gap-2">
                    <i data-lucide="shopping-bag" class="w-5 h-5"></i> Ajouter au panier
                </button>
            </div>
        </div>
    `;

    selectedSize = product.sizes[0] || 'Taille Unique';
    selectedColor = product.colors[0] || 'Couleur Unique';

    showSection('product-detail');
    lucide.createIcons();
}

function selectVariant(type, value, element) {
    if (type === 'size') {
        selectedSize = value;
        document.querySelectorAll('.variant-size-btn').forEach(b => {
            b.classList.remove('border-brandOrange', 'text-brandOrange');
            b.classList.add('border-brandAnthracite', 'text-white');
        });
        element.classList.remove('border-brandAnthracite', 'text-white');
        element.classList.add('border-brandOrange', 'text-brandOrange');
    } else {
        selectedColor = value;
        document.querySelectorAll('.variant-color-btn').forEach(b => {
            b.classList.remove('border-brandOrange', 'text-brandOrange');
            b.classList.add('border-brandAnthracite', 'text-white');
        });
        element.classList.remove('border-brandAnthracite', 'text-white');
        element.classList.add('border-brandOrange', 'text-brandOrange');
    }
}

function addToCartFromDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = cart.findIndex(item => item.id === productId && item.size === selectedSize && item.color === selectedColor);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.promoPrice || product.price,
            size: selectedSize,
            color: selectedColor,
            quantity: 1,
            image: product.image
        });
    }

    updateCartUI();
    toggleCartModal();
}

function updateCartQuantity(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCartUI();
}

function updateDeliveryFee() {
    const select = document.getElementById('client-commune');
    const value = select.value;
    if (value === 'Interieur') {
        currentDeliveryFee = 3000;
    } else if (value === 'Abobo') {
        currentDeliveryFee = 2000;
    } else {
        currentDeliveryFee = 1500;
    }
    updateCartUI();
}

function updateCartUI() {
    const itemsContainer = document.getElementById('cart-items');
    const badge = document.getElementById('cart-badge');
    
    const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.innerText = totalItemsCount;

    if (cart.length === 0) {
        itemsContainer.innerHTML = `<p class="text-center text-gray-500 text-sm py-8">Votre panier est vide.</p>`;
        document.getElementById('cart-subtotal').innerText = '0 FCFA';
        document.getElementById('cart-total').innerText = `${currentDeliveryFee.toLocaleString('fr-FR')} FCFA`;
        return;
    }

    itemsContainer.innerHTML = cart.map((item, idx) => `
        <div class="flex items-center gap-3 bg-brandDark p-3 rounded-xl border border-brandAnthracite">
            <img src="${item.image}" class="w-14 h-14 object-cover rounded-lg">
            <div class="flex-grow">
                <h4 class="text-xs font-bold text-white">${item.name}</h4>
                <p class="text-[10px] text-gray-400">Taille: ${item.size} | Couleur: ${item.color}</p>
                <p class="text-xs font-black text-brandOrange mt-1">${(item.price * item.quantity).toLocaleString('fr-FR')} FCFA</p>
            </div>
            <div class="flex items-center gap-2 bg-brandAnthracite rounded px-2 py-1">
                <button onclick="updateCartQuantity(${idx}, -1)" class="text-white text-xs font-bold">-</button>
                <span class="text-xs text-white px-1 font-bold">${item.quantity}</span>
                <button onclick="updateCartQuantity(${idx}, 1)" class="text-white text-xs font-bold">+</button>
            </div>
        </div>
    `).join('');

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + currentDeliveryFee;

    document.getElementById('cart-subtotal').innerText = `${subtotal.toLocaleString('fr-FR')} FCFA`;
    document.getElementById('cart-delivery').innerText = `${currentDeliveryFee.toLocaleString('fr-FR')} FCFA`;
    document.getElementById('cart-total').innerText = `${total.toLocaleString('fr-FR')} FCFA`;
}

function sendOrderToWhatsApp() {
    if (cart.length === 0) {
        alert('Votre panier est vide !');
        return;
    }

    const name = document.getElementById('client-name').value.trim();
    const phone = document.getElementById('client-phone').value.trim();
    const commune = document.getElementById('client-commune').value;
    const address = document.getElementById('client-address').value.trim();

    if (!name || !phone || !address) {
        alert('Veuillez remplir tous les champs de livraison obligatoires.');
        return;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + currentDeliveryFee;

    let message = `🛒 *NOUVELLE COMMANDE - VIAN’S STORE*\n`;
    message += `------------------------------------\n`;
    message += `👤 *Client:* ${name}\n`;
    message += `📞 *Téléphone:* ${phone}\n`;
    message += `📍 *Livraison:* ${commune} (${address})\n`;
    message += `------------------------------------\n`;
    message += `🛍️ *ARTICLES COMMANDÉS:*\n\n`;

    cart.forEach((item, idx) => {
        message += `${idx + 1}. *${item.name}*\n`;
        message += `   • Réf: ${item.id}\n`;
        message += `   • Taille: ${item.size} | Couleur: ${item.color}\n`;
        message += `   • Qté: ${item.quantity} x ${item.price.toLocaleString('fr-FR')} FCFA = ${(item.price * item.quantity).toLocaleString('fr-FR')} FCFA\n\n`;
    });

    message += `------------------------------------\n`;
    message += `💵 *Sous-total:* ${subtotal.toLocaleString('fr-FR')} FCFA\n`;
    message += `🚚 *Frais Livraison:* ${currentDeliveryFee.toLocaleString('fr-FR')} FCFA\n`;
    message += `🔥 *TOTAL À PAYER:* ${total.toLocaleString('fr-FR')} FCFA\n`;
    message += `------------------------------------\n`;
    message += `*« VIVRE, C'EST ÊTRE FRAIS ! »*`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${storeConfig.whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
}

function handleSearch() {
    const query = document.getElementById('search-input').value.toLowerCase().trim();
    const resultsContainer = document.getElementById('search-results');

    if (query === '') {
        resultsContainer.innerHTML = '';
        return;
    }

    const filtered = products.filter(p => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));

    if (filtered.length === 0) {
        resultsContainer.innerHTML = `<p class="text-xs text-gray-500 py-2">Aucun produit trouvé.</p>`;
        return;
    }

    resultsContainer.innerHTML = filtered.map(p => `
        <div onclick="viewProductDetail('${p.id}'); toggleSearchModal();" class="flex items-center gap-3 p-2 bg-brandDark rounded-lg cursor-pointer hover:bg-brandAnthracite">
            <img src="${p.image}" class="w-10 h-10 object-cover rounded">
            <div>
                <h4 class="text-xs font-bold text-white">${p.name}</h4>
                <p class="text-[10px] text-brandOrange font-bold">${(p.promoPrice || p.price).toLocaleString('fr-FR')} FCFA</p>
            </div>
        </div>
    `).join('');
}

function renderVideos() {
    const grid = document.getElementById('videos-grid');
    grid.innerHTML = videos.map(v => {
        const product = products.find(p => p.id === v.productId);
        return `
            <div class="bg-brandGray rounded-2xl overflow-hidden border border-brandAnthracite flex flex-col items-center p-4">
                <div class="relative w-full aspect-ratio-9-16 bg-black rounded-xl overflow-hidden border border-brandAnthracite flex items-center justify-center">
                    <img src="${v.videoUrl}" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div class="bg-brandOrange text-white p-4 rounded-full shadow-lg cursor-pointer">
                            <i data-lucide="play" class="w-8 h-8 fill-current"></i>
                        </div>
                    </div>
                </div>
                <h3 class="text-sm font-bold text-white mt-4 text-center">${v.title}</h3>
                ${product ? `
                    <button onclick="viewProductDetail('${product.id}')" class="mt-3 w-full bg-brandOrange hover:bg-brandOrangeHover text-white py-2 rounded-lg text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2">
                        <i data-lucide="eye" class="w-4 h-4"></i> Voir le Produit
                    </button>
                ` : ''}
            </div>
        `;
    }).join('');
    lucide.createIcons();
}

function updateNavWhatsApp() {
    document.getElementById('nav-whatsapp-link').href = `https://wa.me/${storeConfig.whatsappNumber}`;
}

function saveAdminSettings() {
    const newNum = document.getElementById('admin-wa-num').value.trim();
    if (newNum) {
        storeConfig.whatsappNumber = newNum;
        updateNavWhatsApp();
        alert('Numéro WhatsApp mis à jour avec succès !');
    }
}

function handleAddProduct(e) {
    e.preventDefault();
    const newProd = {
        id: document.getElementById('p-ref').value.trim(),
        name: document.getElementById('p-name').value.trim(),
        gender: document.getElementById('p-gender').value,
        category: document.getElementById('p-category').value,
        price: parseFloat(document.getElementById('p-price').value),
        promoPrice: document.getElementById('p-promo').value ? parseFloat(document.getElementById('p-promo').value) : null,
        image: document.getElementById('p-image').value.trim() || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=80',
        sizes: document.getElementById('p-sizes').value.split(',').map(s => s.trim()),
        colors: document.getElementById('p-colors').value.split(',').map(c => c.trim()),
        stock: 10,
        desc: document.getElementById('p-desc').value.trim() || 'Produit exclusif VIAN’S STORE.'
    };

    products.unshift(newProd);
    renderCatalog(products);
    renderAdminProducts();
    document.getElementById('add-product-form').reset();
    alert('Produit ajouté au catalogue !');
}

function deleteProduct(id) {
    if (confirm('Voulez-vous vraiment supprimer ce produit ?')) {
        products = products.filter(p => p.id !== id);
        renderCatalog(products);
        renderAdminProducts();
    }
}

function renderAdminProducts() {
    const list = document.getElementById('admin-products-list');
    list.innerHTML = products.map(p => `
        <div class="flex items-center justify-between bg-brandDark p-3 rounded-lg border border-brandAnthracite text-xs">
            <div class="flex items-center gap-3">
                <img src="${p.image}" class="w-10 h-10 object-cover rounded">
                <div>
                    <span class="font-bold text-white">${p.name}</span>
                    <span class="text-gray-500"> (${p.id})</span>
                    <p class="text-brandOrange font-black">${(p.promoPrice || p.price).toLocaleString('fr-FR')} FCFA</p>
                </div>
            </div>
            <button onclick="deleteProduct('${p.id}')" class="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded font-bold">Supprimer</button>
        </div>
    `).join('');
}
