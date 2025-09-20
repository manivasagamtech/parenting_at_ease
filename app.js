// Parenting at Ease - Interactive JavaScript

// Global variables
let currentSection = 'home';
let isModalOpen = false;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    initializeApp();
});

function initializeApp() {
    console.log('Initializing app...');
    
    // Show loading screen for 2 seconds, then fade out
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 300);
        }
    }, 2000);

    // Initialize all components
    setTimeout(() => {
        initializeNavigation();
        initializeMobileMenu();
        initializeModal();
        initializeFAQ();
        initializeForms();
        initializeButtonHandlers();
        initializeAnimatedCounters();
        initializeTestimonialCarousel();
        initializeLazyLoading();
        initializeScrollEffects();
        console.log('All components initialized');
    }, 100);
}

// Navigation System for Single Page App
function initializeNavigation() {
    console.log('Initializing navigation...');
    
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const sections = document.querySelectorAll('.page-section');
    
    console.log('Found nav links:', navLinks.length);
    console.log('Found sections:', sections.length);

    // Handle navigation clicks
    navLinks.forEach((link, index) => {
        console.log(`Setting up nav link ${index}:`, link.getAttribute('href'));
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Nav link clicked:', this.getAttribute('href'));
            
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
            
            // Close mobile menu if open
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                resetHamburgerMenu();
            }
            
            // Update active states
            updateActiveNavLink(this);
        });
    });

    // Set initial section
    const initialHash = window.location.hash.substring(1) || 'home';
    showSection(initialHash);
}

// Show section function
function showSection(sectionId) {
    console.log('Showing section:', sectionId);
    
    const sections = document.querySelectorAll('.page-section');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    // Hide all sections
    sections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.style.display = 'block';
        
        console.log('Section shown:', sectionId);
        
        // Scroll to top smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Update URL hash
        if (history.pushState) {
            history.pushState(null, null, `#${sectionId}`);
        }
        
        currentSection = sectionId;
    } else {
        console.error('Section not found:', sectionId);
    }
    
    // Update active navigation link
    updateActiveNavLink(null, sectionId);
}

// Update active navigation link
function updateActiveNavLink(clickedLink, sectionId) {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    if (clickedLink) {
        const href = clickedLink.getAttribute('href');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === href) {
                link.classList.add('active');
            }
        });
    } else if (sectionId) {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }
}

// Mobile Menu Toggle
function initializeMobileMenu() {
    console.log('Initializing mobile menu...');
    
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    console.log('Mobile toggle found:', !!mobileMenuToggle);
    console.log('Mobile menu found:', !!mobileMenu);
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Mobile menu toggle clicked');
            
            const isActive = mobileMenu.classList.contains('active');
            
            if (isActive) {
                mobileMenu.classList.remove('active');
                resetHamburgerMenu();
            } else {
                mobileMenu.classList.add('active');
                animateHamburgerMenu();
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                if (mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    resetHamburgerMenu();
                }
            }
        });
    }
}

function animateHamburgerMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (!mobileMenuToggle) return;
    
    const spans = mobileMenuToggle.querySelectorAll('span');
    spans.forEach((span, index) => {
        if (index === 0) span.style.transform = 'rotate(45deg) translateY(9px)';
        if (index === 1) span.style.opacity = '0';
        if (index === 2) span.style.transform = 'rotate(-45deg) translateY(-9px)';
    });
}

function resetHamburgerMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (!mobileMenuToggle) return;
    
    const spans = mobileMenuToggle.querySelectorAll('span');
    spans.forEach(span => {
        span.style.transform = '';
        span.style.opacity = '';
    });
}

// Initialize Button Handlers
function initializeButtonHandlers() {
    console.log('Initializing button handlers...');
    
    // Hero section buttons
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    console.log('Found hero buttons:', heroButtons.length);
    
    heroButtons.forEach((btn, index) => {
        const btnClass = btn.className;
        console.log(`Setting up hero button ${index}:`, btnClass);
        
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Hero button clicked:', btnClass);
            
            if (btnClass.includes('btn--primary')) {
                // Book Free Consultation
                console.log('Opening contact modal...');
                openContactModal();
            } else if (btnClass.includes('btn--outline')) {
                // Learn More
                console.log('Navigating to about section...');
                showSection('about');
            } else if (btnClass.includes('btn--secondary')) {
                // WhatsApp
                console.log('Opening WhatsApp...');
                const whatsappUrl = 'https://wa.me/919876543210?text=Hi%20Mukti%2C%20I\'m%20interested%20in%20learning%20about%20your%20parenting%20coaching%20services';
                window.open(whatsappUrl, '_blank');
            }
        });
    });

    // Sticky CTA button
    const stickyCTA = document.querySelector('.sticky-cta');
    if (stickyCTA) {
        console.log('Setting up sticky CTA...');
        stickyCTA.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Sticky CTA clicked');
            openContactModal();
        });
    }

    // WhatsApp widget
    const whatsappWidget = document.querySelector('.whatsapp-widget');
    if (whatsappWidget) {
        console.log('Setting up WhatsApp widget...');
        whatsappWidget.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('WhatsApp widget clicked');
            const whatsappUrl = 'https://wa.me/919876543210?text=Hi%20Mukti%2C%20I\'m%20interested%20in%20learning%20about%20your%20parenting%20coaching%20services';
            window.open(whatsappUrl, '_blank');
        });
    }
}

// Modal Functionality
function initializeModal() {
    console.log('Initializing modal...');
    
    const modal = document.getElementById('contactModal');
    const modalOverlay = modal?.querySelector('.modal-overlay');
    const modalClose = modal?.querySelector('.modal-close');

    console.log('Modal found:', !!modal);
    
    if (!modal) return;

    // Close modal function
    function closeModal() {
        console.log('Closing modal...');
        modal.classList.add('hidden');
        document.body.style.overflow = '';
        isModalOpen = false;
    }

    // Event listeners for closing modal
    if (modalClose) {
        modalClose.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal();
        });
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal();
        });
    }

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });

    // Handle modal form submission
    const modalForm = document.getElementById('modalContactForm');
    if (modalForm) {
        modalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(modalForm, 'modal');
        });
    }
}

// Global function to open contact modal
function openContactModal(serviceType = '') {
    console.log('Opening contact modal for service:', serviceType);
    
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        isModalOpen = true;
        
        console.log('Modal opened successfully');
        
        // If service type is provided, update modal title
        if (serviceType) {
            const modalTitle = modal.querySelector('.modal-header h2');
            if (modalTitle) {
                modalTitle.textContent = `Book ${serviceType} Consultation`;
            }
        }
        
        // Focus on first input
        const firstInput = modal.querySelector('input[type="text"]');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    } else {
        console.error('Modal not found!');
    }
}

// FAQ Accordion
function initializeFAQ() {
    console.log('Initializing FAQ...');
    
    const faqQuestions = document.querySelectorAll('.faq-question');
    console.log('Found FAQ questions:', faqQuestions.length);
    
    faqQuestions.forEach((question, index) => {
        question.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('FAQ question clicked:', index);
            
            const faqItem = question.closest('.faq-item');
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't already active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// Form Handling
function initializeForms() {
    console.log('Initializing forms...');
    
    // Main contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        console.log('Setting up main contact form...');
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Contact form submitted');
            handleFormSubmission(contactForm, 'contact');
        });
    }

    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        console.log('Setting up newsletter form...');
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Newsletter form submitted');
            handleNewsletterSubmission(newsletterForm);
        });
    }

    // Service booking buttons
    setTimeout(() => {
        const serviceBookBtns = document.querySelectorAll('.service-book-btn');
        console.log('Setting up service booking buttons:', serviceBookBtns.length);
        
        serviceBookBtns.forEach((btn, index) => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Service book button clicked:', index);
                
                const serviceCard = btn.closest('.service-detailed-card');
                const serviceName = serviceCard?.querySelector('h3')?.textContent || 'Service';
                openContactModal(serviceName);
            });
        });

        // Program enrollment buttons
        const programBtns = document.querySelectorAll('.program-card .btn, .program-featured .btn');
        console.log('Setting up program buttons:', programBtns.length);
        
        programBtns.forEach((btn, index) => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Program button clicked:', index);
                
                const programCard = btn.closest('.program-card') || btn.closest('.program-featured');
                const programName = programCard?.querySelector('h2, h3')?.textContent || 'Program';
                openContactModal(programName);
            });
        });
    }, 500);

    // Add form validation
    addFormValidation();
}

function handleFormSubmission(form, formType) {
    console.log('Handling form submission:', formType);
    
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    
    if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            console.log('Form submission completed');
            
            // Show success message
            showNotification('Thank you! Your consultation request has been sent. I\'ll respond within 24 hours.', 'success');
            
            // Reset form
            form.reset();
            
            // Close modal if it's modal form
            if (formType === 'modal') {
                const modal = document.getElementById('contactModal');
                if (modal) {
                    modal.classList.add('hidden');
                    document.body.style.overflow = '';
                    isModalOpen = false;
                }
            }
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
        }, 1500);
    }
}

function handleNewsletterSubmission(form) {
    console.log('Handling newsletter submission');
    
    const emailInput = form.querySelector('input[type="email"]');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    if (emailInput && submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Subscribing...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            console.log('Newsletter subscription completed');
            showNotification('Welcome! Check your email for your free parenting guide.', 'success');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1000);
    }
}

function addFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearFieldError(input));
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remove existing error styling
    clearFieldError(field);

    // Check required fields
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required.';
    }

    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
    }

    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[\d\s\-\(\)]+$/;
        if (!phoneRegex.test(value) || value.length < 10) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number.';
        }
    }

    if (!isValid) {
        showFieldError(field, errorMessage);
    }

    return isValid;
}

function showFieldError(field, message) {
    field.style.borderColor = 'var(--color-error)';
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }

    // Add error message
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.style.color = 'var(--color-error)';
    errorElement.style.fontSize = 'var(--font-size-sm)';
    errorElement.style.marginTop = 'var(--space-4)';
    errorElement.textContent = message;
    
    field.parentNode.appendChild(errorElement);
}

function clearFieldError(field) {
    field.style.borderColor = '';
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Notification System
function showNotification(message, type = 'info') {
    console.log('Showing notification:', message, type);
    
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-${type === 'success' ? 'success' : 'primary'});
        color: var(--color-btn-primary-text);
        padding: var(--space-16) var(--space-20);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        z-index: 3000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: var(--space-8);">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Add CSS for notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Animated Counters
function initializeAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseFloat(element.dataset.target);
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = target * easeOut;
        
        if (target === 4.9) {
            element.textContent = currentValue.toFixed(1);
        } else {
            element.textContent = Math.floor(currentValue);
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target === 4.9 ? '4.9' : Math.floor(target);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Testimonial Carousel
function initializeTestimonialCarousel() {
    const carousel = document.getElementById('testimonialsCarousel');
    if (!carousel) return;
    
    const cards = carousel.querySelectorAll('.testimonial-card');
    if (cards.length <= 1) return;
    
    let currentIndex = 0;
    let autoPlayInterval;
    
    function showTestimonial(index) {
        cards.forEach((card, i) => {
            card.style.display = i === index ? 'block' : 'none';
        });
    }
    
    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % cards.length;
        showTestimonial(currentIndex);
    }
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextTestimonial, 5000);
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }
    
    // Initialize first testimonial
    showTestimonial(0);
    startAutoPlay();
    
    // Pause on hover
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
}

// Lazy Loading for Performance
function initializeLazyLoading() {
    const lazyElements = document.querySelectorAll('.lazy-load');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    lazyElements.forEach(element => {
        observer.observe(element);
    });
}

// Scroll Effects
function initializeScrollEffects() {
    // Show/hide sticky CTA based on scroll
    const stickyCTA = document.querySelector('.sticky-cta');
    if (stickyCTA) {
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 300) {
                stickyCTA.style.opacity = '1';
                stickyCTA.style.pointerEvents = 'auto';
            } else {
                stickyCTA.style.opacity = '0';
                stickyCTA.style.pointerEvents = 'none';
            }
        });
    }
}

// Download handlers for free resources
function handleDownload(resourceType) {
    showNotification(`Thank you! Your ${resourceType} is being prepared for download.`, 'success');
    
    setTimeout(() => {
        showNotification(`${resourceType} download started! Check your downloads folder.`, 'info');
    }, 2000);
}

// Video placeholder handlers
function handleVideoPlay(videoTitle) {
    showNotification(`${videoTitle} would open in a video player. This is a demo version.`, 'info');
}

// Initialize additional handlers after DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for everything to load
    setTimeout(() => {
        // Download buttons
        const downloadButtons = document.querySelectorAll('.download-card .btn');
        downloadButtons.forEach((btn, index) => {
            const resourceNames = [
                'Calm Parenting Toolkit',
                'Family Routine Planner',
                'Communication Starter Guide'
            ];
            
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                handleDownload(resourceNames[index] || 'Resource');
            });
        });

        // Video placeholders
        const videoThumbnails = document.querySelectorAll('.video-thumbnail');
        videoThumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function(e) {
                e.preventDefault();
                const title = thumbnail.querySelector('span')?.textContent || 'Video';
                handleVideoPlay(title);
            });
        });

        // Blog read more links
        const readMoreLinks = document.querySelectorAll('.blog-read-more');
        readMoreLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const articleTitle = link.closest('.blog-card').querySelector('h3').textContent;
                showNotification(`"${articleTitle}" would open in a full article view. This is a demo version.`, 'info');
            });
        });
        
        console.log('Additional handlers initialized');
    }, 1000);
});

// Browser back/forward handling
window.addEventListener('popstate', function(e) {
    const hash = window.location.hash.substring(1) || 'home';
    showSection(hash);
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log('Page load time:', loadTime + 'ms');
    
    if (loadTime > 4000) {
        console.warn('Page load time exceeded 4 seconds:', loadTime + 'ms');
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Make functions globally available
window.openContactModal = openContactModal;
window.showSection = showSection;
window.handleDownload = handleDownload;
window.showNotification = showNotification;
