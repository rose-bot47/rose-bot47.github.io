// Rose Davison Portfolio - Interactions

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background on scroll
    const nav = document.querySelector('.nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            nav.style.background = 'rgba(10, 10, 12, 0.95)';
        } else {
            nav.style.background = 'rgba(10, 10, 12, 0.8)';
        }
        
        lastScroll = currentScroll;
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe project cards, software cards, and skill categories
    document.querySelectorAll('.project-card, .software-card, .skill-category').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });

    // Add staggered delay to grid items
    document.querySelectorAll('.project-grid').forEach(grid => {
        const cards = grid.querySelectorAll('.project-card, .software-card');
        cards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
        });
    });

    document.querySelectorAll('.skills-grid').forEach(grid => {
        const categories = grid.querySelectorAll('.skill-category');
        categories.forEach((cat, index) => {
            cat.style.transitionDelay = `${index * 0.1}s`;
        });
    });

    // Image lightbox
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const lightboxImg = lightbox.querySelector('.lightbox-img');
        const lightboxCaption = lightbox.querySelector('.lightbox-caption');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        let lastFocused = null;

        const openLightbox = (img) => {
            lastFocused = img;
            lightboxImg.src = img.currentSrc || img.src;
            lightboxImg.alt = img.alt || '';
            lightboxCaption.textContent = img.alt || '';
            lightbox.hidden = false;
            // next frame so the opacity/scale transition runs
            requestAnimationFrame(() => lightbox.classList.add('open'));
            document.body.style.overflow = 'hidden';
            closeBtn.focus();
        };

        const closeLightbox = () => {
            lightbox.classList.remove('open');
            document.body.style.overflow = '';
            const hide = () => {
                lightbox.hidden = true;
                lightboxImg.src = '';
                lightbox.removeEventListener('transitionend', hide);
            };
            lightbox.addEventListener('transitionend', hide);
            // fallback if transitions are disabled (reduced motion)
            setTimeout(() => { if (!lightbox.classList.contains('open')) hide(); }, 400);
            if (lastFocused) {
                lastFocused.focus();
                lastFocused = null;
            }
        };

        document.querySelectorAll('img:not(.lightbox-img)').forEach(img => {
            img.classList.add('zoomable');
            img.setAttribute('tabindex', '0');
            img.setAttribute('role', 'button');
            const label = img.alt ? `View larger image: ${img.alt}` : 'View larger image';
            img.setAttribute('aria-label', label);
            img.addEventListener('click', () => openLightbox(img));
            img.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(img);
                }
            });
        });

        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            // close when clicking the dimmed backdrop (not the image itself)
            if (e.target === lightbox || e.target === lightbox.querySelector('.lightbox-figure')) {
                closeLightbox();
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !lightbox.hidden) {
                closeLightbox();
            }
        });
    }
});
