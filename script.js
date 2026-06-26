document.addEventListener("DOMContentLoaded", () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Initialize Lenis for Smooth Scrolling
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync GSAP with Lenis
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Header interaction on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
            header.style.padding = '0.2rem 0';
        } else {
            header.style.boxShadow = 'none';
            header.style.padding = '0.5rem 0';
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuDrawer = document.querySelector('.mobile-menu-drawer');
    const mobileMenuLinks = document.querySelectorAll('.mobile-nav a');

    if (mobileMenuBtn && mobileMenuDrawer) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenuBtn.classList.toggle('active');
            mobileMenuDrawer.classList.toggle('active');
        });

        // Close drawer on link click
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                mobileMenuDrawer.classList.remove('active');
            });
        });

        // Close drawer when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileMenuDrawer.classList.contains('active') && 
                !mobileMenuDrawer.contains(e.target) && 
                !mobileMenuBtn.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                mobileMenuDrawer.classList.remove('active');
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenuDrawer.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                mobileMenuDrawer.classList.remove('active');
            }
        });

        // Close drawer on resize to desktop screens
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 992 && mobileMenuDrawer.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                mobileMenuDrawer.classList.remove('active');
            }
        });
    }

    // FAQ Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Open clicked if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // --- GSAP ANIMATIONS ---

    // Hero Section
    const tlHero = gsap.timeline();
    tlHero.from('.hero-content h1', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' })
          .from('.brush-stroke path', { strokeDasharray: 400, strokeDashoffset: 400, duration: 1, ease: 'power2.inOut' }, '-=0.4')
          .from('.hero-desc', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
          .from('.btn-hero', { y: 20, opacity: 0, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.4')
          .from('.pillar', { y: 20, opacity: 0, stagger: 0.2, duration: 0.6, ease: 'power3.out' }, '-=0.4')
          .from('.hero-circle-mask', { scale: 0.9, opacity: 0, duration: 1, ease: 'power3.out' }, '-=1')
          .from('#floating-badge', { scale: 0, rotation: -20, opacity: 0, duration: 0.8, ease: 'back.out(1.5)' }, '-=0.6')
          .from('#floating-liver', { x: 50, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.8');

    // Floating animations
    gsap.to('#floating-badge', { y: -15, duration: 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('#floating-liver', { y: -10, x: -5, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.medical-badge', { y: -15, rotation: 5, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });

    // Section Titles
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: { trigger: header, start: 'top 85%' },
            y: 40, opacity: 0, duration: 0.8, ease: 'power3.out'
        });
    });

    // Fade Up Elements (Cards, Lists)
    gsap.utils.toArray('.pain-card, .feature-card, .exam-premium-card, .audience-card, .diff-card, .faq-item').forEach(el => {
        gsap.from(el, {
            scrollTrigger: { trigger: el, start: 'top 90%' },
            y: 30, opacity: 0, duration: 0.6, ease: 'power3.out'
        });
    });

    // Phases Timeline
    gsap.utils.toArray('.phase-card').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: { trigger: item, start: 'top 85%' },
            x: -40, opacity: 0, duration: 0.8, ease: 'power3.out'
        });
    });

    // Process Steps
    gsap.utils.toArray('.process-step').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: { trigger: '.process-modern', start: 'top 80%' },
            y: 50, opacity: 0, duration: 0.6, delay: i * 0.2, ease: 'back.out(1.5)'
        });
    });

    // Authority Image
    gsap.from('.authority-image-wrapper', {
        scrollTrigger: { trigger: '.authority-layout', start: 'top 80%' },
        x: -50, opacity: 0, duration: 1, ease: 'power3.out'
    });

    // Urgency Banner
    gsap.from('.urgency-banner', {
        scrollTrigger: { trigger: '.urgency-banner', start: 'top 85%' },
        scale: 0.95, y: 30, opacity: 0, duration: 0.8, ease: 'power2.out'
    });

    // --- NEW AAA ANIMATIONS ---

    // 1. Mouse Tracking & 3D Tilt for Interactive Cards (Glow & Tilt Effect)
    const interactiveCards = document.querySelectorAll('.interactive-card');
    if (window.matchMedia("(min-width: 1025px)").matches) {
        interactiveCards.forEach((card) => {
            card.addEventListener("mousemove", (e) => {
                requestAnimationFrame(() => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    // Glow coordinates
                    card.style.setProperty("--mouse-x", `${x}px`);
                    card.style.setProperty("--mouse-y", `${y}px`);
                    
                    // 3D Tilt calculation
                    const width = rect.width;
                    const height = rect.height;
                    const centerX = width / 2;
                    const centerY = height / 2;
                    const deltaX = (x - centerX) / centerX;
                    const deltaY = (y - centerY) / centerY;
                    
                    const maxRotate = 8; // Max degrees of rotation
                    const rotateX = -deltaY * maxRotate;
                    const rotateY = deltaX * maxRotate;
                    
                    card.style.setProperty("--rotate-x", `${rotateX}deg`);
                    card.style.setProperty("--rotate-y", `${rotateY}deg`);
                });
            });
            
            card.addEventListener("mouseleave", () => {
                card.style.setProperty("--rotate-x", "0deg");
                card.style.setProperty("--rotate-y", "0deg");
            });
        });
    }

    // 2. 3D Scroll Perspective Effect
    gsap.utils.toArray('.scroll-3d').forEach((el) => {
        ScrollTrigger.create({
            trigger: el,
            start: "top 85%",
            toggleClass: { targets: el, className: "ativo" },
            once: true // Anima apenas na entrada
        });
    });

    // 3. Populate Continuous Carousel
    const topics = [
        "Acompanhamento Médico 360°",
        "Sem Dietas Malucas",
        "Resultados Reais",
        "Controle Consistente",
        "Exames Inclusos",
        "Turmas Reduzidas",
        "Foco no Metabolismo",
        "Método Comprovado"
    ];

    function createTag(text) {
        return `<div class="carousel-tag"><i data-lucide="check-circle-2"></i> ${text}</div>`;
    }

    function fillCarouselRow(elementId, dataArray) {
        const container = document.getElementById(elementId);
        if (!container) return;
        const content = [...dataArray, ...dataArray, ...dataArray, ...dataArray]
            .map(topic => createTag(topic)).join('');
        container.innerHTML = content;
    }

    fillCarouselRow('carousel-row-1', topics);
    fillCarouselRow('carousel-row-2', [...topics].reverse());
    
    // Re-init lucide for dynamically injected icons
    lucide.createIcons();

    // 4. Clinic Image Carousel (Support multiple instances for responsive layout)
    const carousels = document.querySelectorAll('.stylish-carousel');
    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.prev');
        const nextBtn = carousel.querySelector('.next');
        const indicators = carousel.querySelectorAll('.indicator');
        let currentSlide = 0;
        let slideInterval;

        function showSlide(index) {
            slides[currentSlide].classList.remove('active');
            if(indicators[currentSlide]) indicators[currentSlide].classList.remove('active');
            
            currentSlide = (index + slides.length) % slides.length;
            
            slides[currentSlide].classList.add('active');
            if(indicators[currentSlide]) indicators[currentSlide].classList.add('active');
        }

        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        function prevSlide() {
            showSlide(currentSlide - 1);
        }

        function startAutoSlide() {
            slideInterval = setInterval(nextSlide, 4000);
        }

        function resetAutoSlide() {
            clearInterval(slideInterval);
            startAutoSlide();
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetAutoSlide();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetAutoSlide();
            });
        }

        indicators.forEach((ind) => {
            ind.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-slide'));
                showSlide(index);
                resetAutoSlide();
            });
        });

        startAutoSlide();
    });
});
