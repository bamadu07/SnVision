// Gestion du panier pour SenVision

class ShoppingCart {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('senvision-cart')) || [];
        this.init();
    }
    
    init() {
        this.updateCartDisplay();
        this.setupEventListeners();
    }
    
    // Ajouter un produit au panier
    addProduct(product) {
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1,
                promotion: product.promotion || 0
            });
        }
        
        this.saveCart();
        this.updateCartDisplay();
        this.showNotification(`${product.name} ajouté au panier`);
        
        return existingItem ? existingItem.quantity : 1;
    }
    
    // Retirer un produit du panier
    removeProduct(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartDisplay();
        this.showNotification('Produit retiré du panier');
    }
    
    // Mettre à jour la quantité
    updateQuantity(productId, quantity) {
        if (quantity < 1) {
            this.removeProduct(productId);
            return;
        }
        
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            this.saveCart();
            this.updateCartDisplay();
        }
    }
    
    // Vider le panier
    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartDisplay();
        this.showNotification('Panier vidé');
    }
    
    // Sauvegarder le panier dans le localStorage
    saveCart() {
        localStorage.setItem('senvision-cart', JSON.stringify(this.cart));
    }
    
    // Calculer le total
    calculateTotal() {
        return this.cart.reduce((total, item) => {
            const price = item.promotion > 0 ? 
                item.price * (1 - item.promotion/100) : 
                item.price;
            return total + (price * item.quantity);
        }, 0);
    }
    
    // Calculer le nombre d'articles
    calculateItemCount() {
        return this.cart.reduce((count, item) => count + item.quantity, 0);
    }
    
    // Mettre à jour l'affichage du panier
    updateCartDisplay() {
        const itemCount = this.calculateItemCount();
        const total = this.calculateTotal();
        
        // Mettre à jour les badges
        document.querySelectorAll('.cart-badge, .cart-badge-mobile').forEach(badge => {
            badge.textContent = itemCount;
            if (itemCount > 0) {
                badge.classList.add('notification-pulse');
                setTimeout(() => badge.classList.remove('notification-pulse'), 500);
            }
        });
        
        // Mettre à jour le résumé
        const cartCount = document.getElementById('cart-count');
        const cartSummaryTotal = document.getElementById('cart-summary-total');
        
        if (cartCount) cartCount.textContent = `${itemCount} article(s)`;
        if (cartSummaryTotal) cartSummaryTotal.textContent = `${Math.round(total).toLocaleString()} FCFA`;
        
        // Mettre à jour le dropdown
        this.updateCartDropdown();
        
        // Mettre à jour l'offcanvas
        this.updateCartOffcanvas();
        
        // Mettre à jour le total
        document.getElementById('cart-total').textContent = `${Math.round(total).toLocaleString()} FCFA`;
    }
    
    // Mettre à jour le dropdown du panier
    updateCartDropdown() {
        const cartItems = document.getElementById('cart-items');
        
        if (this.cart.length === 0) {
            cartItems.innerHTML = `
                <div class="text-center p-3">
                    <i class="bi bi-cart text-muted mb-2" style="font-size: 2rem;"></i>
                    <p class="text-muted mb-0">Votre panier est vide</p>
                </div>
            `;
            return;
        }
        
        let itemsHTML = '';
        
        this.cart.forEach(item => {
            const itemPrice = item.promotion > 0 ? 
                item.price * (1 - item.promotion/100) : 
                item.price;
            const itemTotal = itemPrice * item.quantity;
            
            itemsHTML += `
                <div class="cart-dropdown-item">
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="ms-2 flex-grow-1">
                            <div class="d-flex justify-content-between align-items-start">
                                <h6 class="mb-1 cart-item-name">${item.name}</h6>
                                <button class="btn btn-sm btn-link text-danger p-0" onclick="window.senvisionCart.removeProduct(${item.id})">
                                    <i class="bi bi-x"></i>
                                </button>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <small class="text-muted">${Math.round(itemPrice).toLocaleString()} FCFA x ${item.quantity}</small>
                                </div>
                                <small class="fw-bold">${Math.round(itemTotal).toLocaleString()} FCFA</small>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        
        cartItems.innerHTML = itemsHTML;
    }
    
    // Mettre à jour l'offcanvas du panier
    updateCartOffcanvas() {
        const cartItemsOffcanvas = document.getElementById('cart-items-offcanvas');
        const cartSubtotalOffcanvas = document.getElementById('cart-subtotal-offcanvas');
        const cartTotalOffcanvas = document.getElementById('cart-total-offcanvas');
        
        if (this.cart.length === 0) {
            cartItemsOffcanvas.innerHTML = `
                <div class="text-center py-5">
                    <i class="bi bi-cart display-4 text-muted mb-3"></i>
                    <p class="text-muted">Votre panier est vide</p>
                    <a href="marques.html" class="btn btn-primary mt-3">Découvrir nos produits</a>
                </div>
            `;
            cartSubtotalOffcanvas.textContent = '0 FCFA';
            cartTotalOffcanvas.textContent = '0 FCFA';
            return;
        }
        
        let itemsHTML = '';
        let subtotal = 0;
        
        this.cart.forEach(item => {
            const itemPrice = item.promotion > 0 ? 
                item.price * (1 - item.promotion/100) : 
                item.price;
            const itemTotal = itemPrice * item.quantity;
            subtotal += itemTotal;
            
            itemsHTML += `
                <div class="cart-item-offcanvas mb-3 p-3 border rounded">
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.name}" class="cart-offcanvas-image me-3">
                        <div class="flex-grow-1">
                            <h6 class="mb-1">${item.name}</h6>
                            <div class="d-flex justify-content-between align-items-center mt-2">
                                <div class="btn-group btn-group-sm">
                                    <button class="btn btn-outline-secondary" onclick="window.senvisionCart.updateQuantity(${item.id}, ${item.quantity - 1})" ${item.quantity <= 1 ? 'disabled' : ''}>
                                        <i class="bi bi-dash"></i>
                                    </button>
                                    <span class="btn btn-outline-secondary disabled quantity-display">${item.quantity}</span>
                                    <button class="btn btn-outline-secondary" onclick="window.senvisionCart.updateQuantity(${item.id}, ${item.quantity + 1})">
                                        <i class="bi bi-plus"></i>
                                    </button>
                                </div>
                                <div class="text-end">
                                    <div class="fw-bold">${Math.round(itemTotal).toLocaleString()} FCFA</div>
                                    <small class="text-muted">${Math.round(itemPrice).toLocaleString()} FCFA l'unité</small>
                                </div>
                            </div>
                            <button class="btn btn-sm btn-outline-danger w-100 mt-2" onclick="window.senvisionCart.removeProduct(${item.id})">
                                <i class="bi bi-trash me-1"></i> Retirer
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        cartItemsOffcanvas.innerHTML = itemsHTML;
        cartSubtotalOffcanvas.textContent = `${Math.round(subtotal).toLocaleString()} FCFA`;
        cartTotalOffcanvas.textContent = `${Math.round(subtotal).toLocaleString()} FCFA`;
    }
    
    // Afficher une notification
    showNotification(message) {
        // Créer la notification
        const notification = document.createElement('div');
        notification.className = 'alert alert-success position-fixed top-0 end-0 m-3 animate-fade-in-up';
        notification.style.zIndex = '99999';
        notification.innerHTML = `
            <i class="bi bi-check-circle me-2"></i>
            ${message}
        `;
        
        document.body.appendChild(notification);
        
        // Supprimer après 3 secondes
        setTimeout(() => {
            notification.classList.remove('animate-fade-in-up');
            notification.classList.add('animate-fade-in');
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Configurer les événements
    setupEventListeners() {
        // Bouton commander du dropdown
        document.getElementById('checkout-btn')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showOrderModal();
        });
        
        // Bouton commander de l'offcanvas
        document.getElementById('checkout-offcanvas-btn')?.addEventListener('click', () => {
            const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('cartOffcanvas'));
            offcanvas?.hide();
            this.showOrderModal();
        });
        
        // Bouton voir panier
        document.getElementById('view-cart-btn')?.addEventListener('click', () => {
            const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
            cartModal?.hide();
            
            if (window.innerWidth < 992) {
                const offcanvas = new bootstrap.Offcanvas(document.getElementById('cartOffcanvas'));
                offcanvas.show();
            }
        });
        
        // Confirmer commande
        document.getElementById('confirm-order-btn')?.addEventListener('click', () => {
            this.confirmOrder();
        });
    }
    
    // Afficher la modal de commande
    showOrderModal() {
        if (this.cart.length === 0) {
            this.showNotification('Votre panier est vide. Ajoutez des produits avant de commander.');
            return;
        }
        
        const orderSummary = document.getElementById('order-summary');
        const orderTotal = document.getElementById('order-total');
        
        let summaryHTML = '';
        let total = 0;
        
        this.cart.forEach(item => {
            const itemPrice = item.promotion > 0 ? 
                item.price * (1 - item.promotion/100) : 
                item.price;
            const itemTotal = itemPrice * item.quantity;
            total += itemTotal;
            
            summaryHTML += `
                <div class="d-flex justify-content-between border-bottom pb-2 mb-2">
                    <div>
                        <small>${item.name} x${item.quantity}</small>
                    </div>
                    <div>
                        <small>${Math.round(itemTotal).toLocaleString()} FCFA</small>
                    </div>
                </div>
            `;
        });
        
        orderSummary.innerHTML = summaryHTML;
        orderTotal.textContent = `${Math.round(total).toLocaleString()} FCFA`;
        
        const orderModal = new bootstrap.Modal(document.getElementById('orderModal'));
        orderModal.show();
    }
    
    // Confirmer la commande
    confirmOrder() {
        const name = document.getElementById('order-name').value;
        const phone = document.getElementById('order-phone').value;
        const email = document.getElementById('order-email').value;
        const address = document.getElementById('order-address').value;
        const notes = document.getElementById('order-notes').value;
        
        if (!name || !phone || !address) {
            alert('Veuillez remplir tous les champs obligatoires (*)');
            return;
        }
        
        // Calculer le total
        const total = this.calculateTotal();
        
        // Préparer les détails de la commande
        let orderDetails = '';
        this.cart.forEach(item => {
            const itemPrice = item.promotion > 0 ? 
                item.price * (1 - item.promotion/100) : 
                item.price;
            const itemTotal = itemPrice * item.quantity;
            
            orderDetails += `• ${item.name} x${item.quantity}: ${Math.round(itemTotal).toLocaleString()} FCFA\n`;
        });
        
        // Créer le message de commande
        const orderMessage = `
NOUVELLE COMMANDE SenVision
============================
Client: ${name}
Téléphone: ${phone}
Email: ${email || 'Non fourni'}
Adresse: ${address}

DÉTAILS DE LA COMMANDE:
${orderDetails}
-------------------------
TOTAL: ${Math.round(total).toLocaleString()} FCFA

Notes: ${notes || 'Aucune'}

Date: ${new Date().toLocaleString('fr-FR')}
        `;
        
        // Simuler l'envoi de la commande (en production, envoyer à un serveur)
        console.log('Commande reçue:', orderMessage);
        
        // Animation de succès
        const orderModal = bootstrap.Modal.getInstance(document.getElementById('orderModal'));
        orderModal.hide();
        
        // Confetti
        this.createConfetti();
        
        // Afficher le message de confirmation
        setTimeout(() => {
            const confirmationMessage = `
🎉 Commande confirmée !

Merci ${name} !

Votre commande de ${Math.round(total).toLocaleString()} FCFA a été enregistrée.

Récapitulatif:
${orderDetails}
Total: ${Math.round(total).toLocaleString()} FCFA

Nous vous contacterons au ${phone} dans les plus brefs délais pour confirmer la livraison à:
${address}

À bientôt chez SenVision !
            `;
            
            alert(confirmationMessage);
            
            // Vider le panier
            this.clearCart();
            
            // Réinitialiser le formulaire
            document.getElementById('order-form').reset();
        }, 500);
    }
    
    // Animation de confetti
    createConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.style.position = 'fixed';
        confettiContainer.style.top = '0';
        confettiContainer.style.left = '0';
        confettiContainer.style.width = '100%';
        confettiContainer.style.height = '100%';
        confettiContainer.style.pointerEvents = 'none';
        confettiContainer.style.zIndex = '99999';
        
        document.body.appendChild(confettiContainer);
        
        const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6'];
        
        for (let i = 0; i < 150; i++) {
            const confetti = document.createElement('div');
            const size = Math.random() * 10 + 5;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            confetti.style.position = 'absolute';
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.backgroundColor = color;
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.top = '-20px';
            
            // Animation
            const animation = confetti.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 3000 + 2000,
                easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
            });
            
            confettiContainer.appendChild(confetti);
            
            // Supprimer après animation
            animation.onfinish = () => confetti.remove();
        }
        
        // Supprimer le conteneur après l'animation
        setTimeout(() => confettiContainer.remove(), 5000);
    }
}

// Initialiser le panier quand la page est chargée
document.addEventListener('DOMContentLoaded', function() {
    window.senvisionCart = new ShoppingCart();
    
    // Exposer les fonctions globales pour les boutons HTML
    window.addToCart = function(productId) {
        // Trouver le produit dans les données chargées
        const product = window.allProducts?.find(p => p.id === productId);
        if (product) {
            const productData = {
                id: product.id,
                name: product.nom,
                price: parseInt(product.prix.replace(/\s/g, '')),
                image: product.image,
                promotion: product.promotion || 0
            };
            
            const quantity = window.senvisionCart.addProduct(productData);
            
            // Mettre à jour le bouton sur la carte produit
            const addButton = document.querySelector(`.add-to-cart-btn[data-product-id="${productId}"]`);
            if (addButton) {
                addButton.classList.remove('btn-outline-primary');
                addButton.classList.add('btn-success', 'cart-add-animation');
                addButton.innerHTML = '<i class="bi bi-check"></i>';
                addButton.disabled = true;
                
                setTimeout(() => {
                    addButton.classList.remove('cart-add-animation');
                }, 500);
            }
            
            // Afficher la modal de confirmation
            window.showCartModal(product);
        }
    };
    
    window.addToCartFromModal = function(productId) {
        window.addToCart(productId);
        const modal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
        modal?.hide();
    };
    
    window.removeFromCart = function(productId) {
        window.senvisionCart.removeProduct(productId);
        
        // Mettre à jour le bouton sur la carte produit
        const addButton = document.querySelector(`.add-to-cart-btn[data-product-id="${productId}"]`);
        if (addButton) {
            addButton.classList.remove('btn-success');
            addButton.classList.add('btn-outline-primary');
            addButton.innerHTML = '<i class="bi bi-cart-plus"></i>';
            addButton.disabled = false;
        }
    };
    
    window.updateQuantity = function(productId, quantity) {
        window.senvisionCart.updateQuantity(productId, quantity);
    };
    
    window.showCartModal = function(product) {
        const modalName = document.getElementById('cart-modal-product-name');
        const modalDetails = document.getElementById('cart-modal-product-details');
        
        if (modalName && modalDetails) {
            modalName.textContent = product.nom;
            modalDetails.innerHTML = `
                ${product.prix} FCFA<br>
                <small class="text-muted">Ajouté à votre panier</small>
            `;
            
            const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
            cartModal.show();
        }
    };
    
    window.showOrderModal = function() {
        window.senvisionCart.showOrderModal();
    };
    
    window.confirmOrder = function() {
        window.senvisionCart.confirmOrder();
    };
});