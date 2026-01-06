// Fonctions d'animation améliorées pour le site SenVision

// Configuration des animations
const animationConfig = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Initialiser toutes les animations
function initAllAnimations() {
    setActiveNavigation();
    initScrollAnimations();
    initParallax();
    initMorphingButtons();
    initCounters();
    initGlitchEffect();
    initWaveEffect();
    init3DHoverEffect();
    initProgressBars();
    initTypewriter();
    initNeonEffect();
    initGradientBackground();
    initStickyNav();
    initPageEntrance();
    initContactForm();
    initThemeToggle();
    initBackToTop();
    initScrollProgress();
    initProductAnimations();
    initFilterAnimations();
    createParticles();
    
    console.log('✅ Toutes les animations sont initialisées');
}

// Gestion de la navigation active avec animation
function setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        
        if (currentPage === linkPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.classList.add('active');
            // Animation d'activation
            link.style.animation = 'none';
            setTimeout(() => {
                link.style.animation = 'pulse 0.5s ease';
            }, 100);
        } else {
            link.classList.remove('active');
        }
    });
}

// Animation au défilement avancée
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animateElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Ajouter un délai progressif pour les éléments enfants
                const childElements = entry.target.querySelectorAll('.animate-delay-1, .animate-delay-2, .animate-delay-3, .animate-delay-4, .animate-delay-5');
                childElements.forEach((el, index) => {
                    el.style.animationDelay = `${0.1 * (index + 1)}s`;
                });
                
                // Observer les compteurs dans cet élément
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    if (target) {
                        animateCounter(counter, target);
                    }
                });
            }
        });
    }, animationConfig);
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Effet de particules
function createParticles() {
    const heroSections = document.querySelectorAll('.hero-section, .page-hero');
    
    heroSections.forEach(section => {
        // Supprimer les particules existantes
        const existingParticles = section.querySelector('.particles');
        if (existingParticles) existingParticles.remove();
        
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        section.appendChild(particlesContainer);
        
        const count = section.classList.contains('hero-section') ? 30 : 20;
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Position aléatoire
            const size = Math.random() * 10 + 5;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.opacity = Math.random() * 0.5 + 0.2;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            
            particlesContainer.appendChild(particle);
        }
    });
}

// Effet de parallaxe
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-section');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = scrolled * 0.5;
            element.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    });
}

// Effet de morphing pour les boutons
function initMorphingButtons() {
    const buttons = document.querySelectorAll('.morphing-btn');
    
    if (buttons.length === 0) return;
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.borderRadius = '10px';
            button.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.borderRadius = '50px';
            button.style.transform = 'scale(1)';
        });
    });
}

// Compteur animé
function animateCounter(element, target, duration = 2000) {
    if (!element) return;
    
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Initialiser les compteurs
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        if (target && !counter.classList.contains('animated')) {
            counter.classList.add('animated');
            // Les compteurs seront animés quand ils seront visibles grâce à initScrollAnimations
        }
    });
}

// Effet de glitch pour les titres
function initGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    if (glitchElements.length === 0) return;
    
    glitchElements.forEach(element => {
        const text = element.textContent;
        element.setAttribute('data-text', text);
        element.classList.add('glitch-active');
        
        // Activer/désactiver aléatoirement
        setInterval(() => {
            element.classList.toggle('glitch-active');
        }, Math.random() * 4000 + 2000);
    });
}

// Effet de vague sur les sections
function initWaveEffect() {
    const waveContainers = document.querySelectorAll('.wave-container');
    
    if (waveContainers.length === 0) return;
    
    waveContainers.forEach(container => {
        const wave = document.createElement('div');
        wave.classList.add('wave');
        container.appendChild(wave);
    });
}

// Animation de chargement des produits
function animateProductLoad(container) {
    if (!container) return;
    
    const products = container.querySelectorAll('.product-card');
    products.forEach((product, index) => {
        product.style.opacity = '0';
        product.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            product.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            product.style.opacity = '1';
            product.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Effet de hover 3D pour les cartes
function init3DHoverEffect() {
    const cards = document.querySelectorAll('.product-card, .service-card, .brand-card, .stats-card');
    
    if (cards.length === 0) return;
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });
}

// Animation de la barre de progression
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar-custom');
    
    if (progressBars.length === 0) return;
    
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width') || '100';
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = `${width}%`;
            bar.style.transition = 'width 1.5s ease-in-out';
        }, 500);
    });
}

// Effet de texte machine à écrire
function typewriterEffect(element, text, speed = 50) {
    if (!element) return;
    
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialiser l'effet machine à écrire
function initTypewriter() {
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    if (typewriterElements.length === 0) return;
    
    typewriterElements.forEach(element => {
        const text = element.getAttribute('data-text') || element.textContent;
        typewriterEffect(element, text, 30);
    });
}

// Effet de néon clignotant
function initNeonEffect() {
    const neonElements = document.querySelectorAll('.neon-text');
    
    if (neonElements.length === 0) return;
    
    setInterval(() => {
        neonElements.forEach(element => {
            element.style.animation = 'neon-pulse 2s infinite alternate';
        });
    }, 2000);
}

// Animation de fond gradient fluide
function initGradientBackground() {
    const gradientElements = document.querySelectorAll('.gradient-bg');
    
    if (gradientElements.length === 0) return;
    
    gradientElements.forEach(element => {
        let hue = 0;
        
        setInterval(() => {
            hue = (hue + 1) % 360;
            element.style.background = `linear-gradient(135deg, hsl(${hue}, 70%, 60%), hsl(${(hue + 60) % 360}, 70%, 60%))`;
        }, 50);
    });
}

// Effet de navigation sticky avec animation
function initStickyNav() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
            
            if (currentScroll > lastScroll && currentScroll > 200) {
                // Scroll vers le bas
                navbar.style.transform = 'translateY(-100%)';
                navbar.style.transition = 'transform 0.3s ease';
            } else {
                // Scroll vers le haut
                navbar.style.transform = 'translateY(0)';
                navbar.style.transition = 'transform 0.3s ease';
            }
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

// Animation d'entrée de page
function initPageEntrance() {
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
    }, 100);
}

// Gestion du formulaire de contact avec animations
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    // Animation des labels
    const formInputs = contactForm.querySelectorAll('.form-control, .form-select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validation avec animation
        const requiredFields = contactForm.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('is-invalid');
                
                // Animation de secousse
                field.style.animation = 'none';
                setTimeout(() => {
                    field.style.animation = 'shake 0.5s ease';
                }, 10);
            } else {
                field.classList.remove('is-invalid');
            }
        });
        
        if (!isValid) {
            // Animation d'alerte
            const errorAlert = document.createElement('div');
            errorAlert.className = 'alert alert-danger mt-3 animate-fade-in-up';
            errorAlert.innerHTML = '<i class="bi bi-exclamation-triangle me-2"></i>Veuillez remplir tous les champs obligatoires.';
            
            // Supprimer les alertes existantes
            const existingAlerts = contactForm.querySelectorAll('.alert');
            existingAlerts.forEach(alert => alert.remove());
            
            contactForm.appendChild(errorAlert);
            
            setTimeout(() => {
                errorAlert.style.opacity = '0';
                errorAlert.style.transform = 'translateY(-10px)';
                setTimeout(() => errorAlert.remove(), 300);
            }, 3000);
            
            return;
        }
        
        // Simulation d'envoi avec animation
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<span class="loader loader-sm me-2"></span> Envoi en cours...';
        submitBtn.disabled = true;
        
        // Animation de succès
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i> Envoyé !';
            submitBtn.classList.remove('btn-primary');
            submitBtn.classList.add('btn-success');
            
            // Confetti animation
            createConfetti();
            
            // Afficher le message de succès
            const successAlert = document.getElementById('form-success');
            if (successAlert) {
                successAlert.style.display = 'block';
                successAlert.classList.add('animate-fade-in-up');
            }
            
            // Réinitialiser après 3 secondes
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.classList.remove('btn-success');
                submitBtn.classList.add('btn-primary');
                submitBtn.disabled = false;
                
                // Cacher le message de succès
                if (successAlert) {
                    successAlert.style.display = 'none';
                }
                
                // Réinitialisation du formulaire
                contactForm.reset();
            }, 3000);
        }, 1500);
    });
}

// Animation de confetti
function createConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '9999';
    
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

// Animation de préchargement
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) {
        // Si pas de preloader, initialiser directement
        initAllAnimations();
        return;
    }
    
    // Simuler un temps de chargement
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            preloader.style.display = 'none';
            // Initialiser les autres animations après le chargement
            initAllAnimations();
        }, 500);
    }, 1000);
}

// Gestion du mode sombre/clair
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        // Changer l'icône
        const icon = themeToggle.querySelector('i');
        if (isDarkMode) {
            icon.classList.remove('bi-moon');
            icon.classList.add('bi-sun');
        } else {
            icon.classList.remove('bi-sun');
            icon.classList.add('bi-moon');
        }
        
        // Sauvegarder la préférence
        localStorage.setItem('senvision-theme', isDarkMode ? 'dark' : 'light');
    });
    
    // Charger la préférence sauvegardée
    const savedTheme = localStorage.getItem('senvision-theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('bi-moon');
            icon.classList.add('bi-sun');
        }
    }
}

// Bouton retour en haut
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'flex';
            backToTop.classList.add('animate-fade-in');
        } else {
            backToTop.style.display = 'none';
            backToTop.classList.remove('animate-fade-in');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Barre de progression de défilement
function initScrollProgress() {
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const progressBar = document.querySelector('.progress-bar-scroll');
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    });
}

// Animation des produits
function initProductAnimations() {
    const productContainers = document.querySelectorAll('#featured-products, #products-catalog');
    productContainers.forEach(container => {
        if (container.children.length > 0) {
            animateProductLoad(container);
        }
    });
}

// Animation des filtres
function initFilterAnimations() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Animation de clic
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Animation pour changer l'état actif
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.classList.remove('animate-pulse');
            });
            this.classList.add('active');
            this.classList.add('animate-pulse');
            
            // Animation de filtre des produits
            const filter = this.getAttribute('data-filter');
            if (typeof filterProducts === 'function') {
                filterProducts(filter);
            }
        });
    });
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Ajouter une classe au body pour identifier la page actuelle
    const currentPage = window.location.pathname.split('/').pop();
    document.body.classList.add(`page-${currentPage.replace('.html', '') || 'accueil'}`);
    
    // Démarrer avec le préchargeur
    initPreloader();
});

// Exporter les fonctions pour une utilisation globale
window.SenVision = {
    animateCounter,
    createConfetti,
    typewriterEffect,
    initAllAnimations
};

function loadProducts(products, page = 1) {
  const catalog = document.getElementById('products-catalog');
  catalog.innerHTML = '';
  
  const start = (page - 1) * productsPerPage;
  const end = start + productsPerPage;
  const paginatedProducts = products.slice(start, end);
  
  if (paginatedProducts.length === 0) {
    // ... code existant ...
  }
  
  paginatedProducts.forEach((product, index) => {
    // Vérifier l'URL de l'image
    const imageUrl = product.image && product.image.trim() !== '' 
      ? product.image 
      : 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=300&fit=crop'; // Image de secours
    
    // Vérifier l'URL du logo
    const logoUrl = product.logo && product.logo.trim() !== ''
      ? product.logo
      : 'https://via.placeholder.com/300x100?text=Logo+Manquant';
    
    const col = document.createElement('div');
    col.className = 'col-lg-3 col-md-4 col-sm-6 animate-on-scroll';
    col.style.animationDelay = `${index * 0.1}s`;
    
    // ... reste du code ...
    
    col.innerHTML = `
      <div class="card product-card h-100">
        <div class="card-img-container">
          <img src="${imageUrl}" 
               class="card-img-top" 
               alt="${product.nom}"
               onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=300&fit=crop';">
          ${product.nouveau ? '<span class="badge-new">Nouveau</span>' : ''}
          ${product.promotion > 0 ? `<span class="badge-promo">-${product.promotion}%</span>` : ''}
        </div>
        <!-- ... reste du code ... -->
      </div>
    `;
    
    catalog.appendChild(col);
  });
}
