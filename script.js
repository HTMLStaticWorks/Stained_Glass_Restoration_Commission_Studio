document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    const links = document.querySelectorAll('.nav-links a');

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const navOverlay = document.getElementById('nav-overlay');
    const menuClose = document.getElementById('menu-close');

    function closeMenu() {
        navLinks.classList.remove('nav-active');
        mobileToggle.classList.remove('toggle-active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Mobile menu toggle
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.add('nav-active');
        mobileToggle.classList.add('toggle-active');
        navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close menu listeners
    if (menuClose) menuClose.addEventListener('click', closeMenu);
    if (navOverlay) navOverlay.addEventListener('click', closeMenu);

    // Close menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('section, .about-image, .about-content, .portfolio-item, .restoration-card, .process-item, .masonry-item');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
        revealObserver.observe(el);
    });

    // Handle form submission (UI only)
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Message Sent!';
            btn.style.backgroundColor = '#28a745';
            form.reset();
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.backgroundColor = '';
            }, 3000);
        });
    }

    // Theme Toggle Logic
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcons(currentTheme);

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            updateThemeIcons(theme);
        });
    });

    function updateThemeIcons(theme) {
        themeToggles.forEach(toggle => {
            const icon = toggle.querySelector('i');
            if (theme === 'dark') {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    }

    // RTL Toggle Logic
    const rtlToggles = document.querySelectorAll('.rtl-toggle');
    const currentDir = localStorage.getItem('dir') || 'ltr';
    document.documentElement.setAttribute('dir', currentDir);

    rtlToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const dir = document.documentElement.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
            document.documentElement.setAttribute('dir', dir);
            localStorage.setItem('dir', dir);
        });
    });

    // Scroll Spy for active menu highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function scrollSpy() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const menuLinks = document.querySelectorAll(`.nav-links a[href*=${sectionId}]`);
            
            if (menuLinks.length > 0) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    menuLinks.forEach(link => link.classList.add('active'));
                } else {
                    menuLinks.forEach(link => link.classList.remove('active'));
                }
            }
        });
    }

    window.addEventListener('scroll', scrollSpy);
    scrollSpy(); // Initialize on load
});
