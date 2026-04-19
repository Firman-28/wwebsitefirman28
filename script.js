document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.slide');
    const navLinks = document.querySelectorAll('.nav-links a');
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-links');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalImg = document.getElementById('modal-img');
    const profileModal = document.getElementById('profileModal');

    let currentSlide = 0;
    let isTransitioning = false;

    // Initialize only if carousel exists
    if (carousel && slides.length > 0) {
        updateSlides();
    }

    // Navigation functions
    function goToSlide(index) {
        if (index !== 0) return; // Only allow slide 0
        if (isTransitioning || index === currentSlide) return;
        isTransitioning = true;

        currentSlide = index;
        updateSlides();

        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }

    function nextSlide() {
        // Only one slide, no next slide
        return;
    }

    function prevSlide() {
        // Only one slide, no previous slide
        return;
    }

    function updateSlides() {
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        carousel.style.transform = `translateX(0)`;

        // Update nav links active state
        navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === '#slide-1') {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Event listeners
    // No nav buttons or dots to listen to

    // Window resize handler
    window.addEventListener('resize', () => {
        updateSlides();
    });

    // Hamburger menu
    if (hamburger && navList) {
        hamburger.addEventListener('click', () => {
            navList.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const headerOffset = 100; // Account for fixed header
                    const elementPosition = targetElement.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
            // Close mobile menu after clicking
            navList.classList.remove('active');
            // For external links like profile.html, allow default behavior
        });
    });

    // Touch/swipe support for mobile
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;

    if (carousel) {
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            handleSwipe();
        });
    }

    function handleSwipe() {
        // Only one slide, no swipe needed
        return;
    }

    // Profile Gallery Modal
    const closeBtn = profileModal.querySelector('.close-btn');

    // Gallery item click handlers
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            // Add click effect
            item.classList.add('clicked');
            setTimeout(() => {
                item.classList.remove('clicked');
            }, 300);

            const imgSrc = item.dataset.img;
            const title = item.dataset.title;
            const desc = item.dataset.desc;

            modalImg.src = imgSrc;
            modalImg.alt = title;
            modalTitle.textContent = title;
            modalDesc.textContent = desc;
            profileModal.style.display = 'block';
        });
    });

    // Pancasila card click handlers
    const pancasilaModal = document.getElementById('pancasilaModal');
    const pancasilaTitle = document.getElementById('modal-title-pancasila');
    const pancasilaDesc = document.getElementById('modal-desc-pancasila');
    const pancasilaCloseBtn = pancasilaModal.querySelector('.close-btn');

    document.querySelectorAll('.pancasila-card').forEach(card => {
        card.addEventListener('click', () => {
            const title = card.dataset.title;
            const desc = card.dataset.desc;

            pancasilaTitle.textContent = title;
            pancasilaDesc.textContent = desc;
            pancasilaModal.style.display = 'block';
        });
    });

    // Interactive image click handlers (Negara and Geografi)
    document.querySelectorAll('.interactive').forEach(img => {
        img.addEventListener('click', () => {
            const title = img.dataset.title;
            const desc = img.dataset.desc;
            const imgSrc = img.dataset.img;

            if (img.id === 'negaraImage') {
                const negaraModal = document.getElementById('negaraModal');
                const negaraTitle = document.getElementById('modal-title-negara');
                const negaraDesc = document.getElementById('modal-desc-negara');
                const negaraImg = document.getElementById('modal-img-negara');

                negaraImg.src = imgSrc;
                negaraImg.alt = title;
                negaraTitle.textContent = title;
                negaraDesc.textContent = desc;
                negaraModal.style.display = 'block';
            } else if (img.id === 'geoImage') {
                const geoModal = document.getElementById('geografiModal');
                const geoTitle = document.getElementById('modal-title-geo');
                const geoDesc = document.getElementById('modal-desc-geo');
                const geoImg = document.getElementById('modal-img-geo');

                geoImg.src = imgSrc;
                geoImg.alt = title;
                geoTitle.textContent = title;
                geoDesc.textContent = desc;
                geoModal.style.display = 'block';
            }
        });
    });

    // Close buttons for all modals
    const closeButtons = document.querySelectorAll('.close-btn');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            modal.style.display = 'none';
        });
    });

    document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let nama = document.getElementById("nama").value;
    let email = document.getElementById("email").value;
    let pesan = document.getElementById("pesan").value;

    let nomor = "081514397312";

    let text = `Halo, saya ${nama}%0AEmail: ${email}%0APesan: ${pesan}`;

    let url = `https://wa.me/${nomor}?text=${text}`;

    window.open(url, "_blank");
});

    // Keyboard navigation for modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (profileModal.style.display === 'block') {
                profileModal.style.display = 'none';
            }
            if (pancasilaModal.style.display === 'block') {
                pancasilaModal.style.display = 'none';
            }
        }
    });
});