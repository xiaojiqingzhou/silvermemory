document.addEventListener('DOMContentLoaded', () => {
    // ========== 汉堡菜单逻辑 ==========
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !expanded);
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('open');  // 控制 max-height 触发动画
            
            if (!expanded) {
                navMenu.style.maxHeight = navMenu.scrollHeight + 'px';
            } else {
                navMenu.style.maxHeight = '0';
            }
        });

        // 如果窗口大小变化时收起菜单
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                navMenu.style.maxHeight = '';
                navMenu.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.classList.remove('active');
            }
        });
    }

    // ========== 了解更多按钮逻辑 ==========
    function toggleContent(id, btn) {
        const content = document.getElementById(id);
        const isHidden = content.hasAttribute('hidden');
        
        if (isHidden) {
            content.removeAttribute('hidden');
            content.style.maxHeight = '0px';
            content.style.overflow = 'hidden';
            requestAnimationFrame(() => {
                content.style.transition = 'max-height 0.4s ease';
                content.style.maxHeight = content.scrollHeight + 'px';
            });
            btn.setAttribute('aria-expanded', 'true');
            btn.textContent = '收起';
        } else {
            content.style.maxHeight = content.scrollHeight + 'px';
            requestAnimationFrame(() => {
                content.style.transition = 'max-height 0.4s ease';
                content.style.maxHeight = '0';
            });
            btn.setAttribute('aria-expanded', 'false');
            btn.textContent = '了解更多';

            const onTransitionEnd = () => {
                content.setAttribute('hidden', '');
                content.style.maxHeight = '';
                content.style.transition = '';
                content.removeEventListener('transitionend', onTransitionEnd);
            };
            content.addEventListener('transitionend', onTransitionEnd);
        }
    }

    const toggleButtons = document.querySelectorAll('.btn-toggle-more');
    toggleButtons.forEach((btn) => {
        const targetId = btn.getAttribute('aria-controls');
        btn.addEventListener('click', () => toggleContent(targetId, btn));
    });

    // ========== 轮播图逻辑 ==========
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const slides = document.querySelectorAll('.slider-image');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;
    let autoSlideInterval = null;
    const AUTO_SLIDE_DELAY = 5000;

    function updateSlides(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });

        indicators.forEach((btn, i) => {
            const isActive = i === index;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
            btn.setAttribute('tabindex', isActive ? '0' : '-1');
        });

        currentIndex = index;
    }

    function showPrev() {
        updateSlides(currentIndex - 1);
        resetAutoSlide();
    }

    function showNext() {
        updateSlides(currentIndex + 1);
        resetAutoSlide();
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(showNext, AUTO_SLIDE_DELAY);
    }

    function resetAutoSlide() {
        if (autoSlideInterval) clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    if (prevBtn && nextBtn && slides.length > 0) {
        prevBtn.addEventListener('click', showPrev);
        nextBtn.addEventListener('click', showNext);
        
        indicators.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                updateSlides(i);
                resetAutoSlide();
            });

            btn.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    showPrev();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    showNext();
                }
            });
        });

        updateSlides(0);
        startAutoSlide();
    }

    // ========== 平滑滚动导航 ==========
    const navLinks = document.querySelectorAll('.page-nav a[href^="#"]');
    navLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const section = document.getElementById(targetId);
            
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
            
            // 移动端点击链接后关闭菜单
            if (window.innerWidth < 768 && navMenu.classList.contains('open')) {
                navToggle.click();
            }
        });
    });
});
