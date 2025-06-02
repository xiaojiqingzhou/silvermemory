document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  if (navToggle && navMenu) {
    navMenu.style.overflow = 'hidden';
    navMenu.style.maxHeight = '0';
    navMenu.style.transition = 'max-height 0.35s ease';
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !expanded);
      navToggle.classList.toggle('active');
      if (!expanded) {
        navMenu.classList.add('open');
        navMenu.style.maxHeight = navMenu.scrollHeight + 'px';
      } else {
        navMenu.style.maxHeight = '0';
        const onTransitionEnd = () => {
          navMenu.classList.remove('open');
          navMenu.removeEventListener('transitionend', onTransitionEnd);
        };
        navMenu.addEventListener('transitionend', onTransitionEnd);
      }
    });
  }
  const toggleButtons = document.querySelectorAll('.btn-toggle-more');
  toggleButtons.forEach((btn) => {
    const targetId = btn.getAttribute('aria-controls');
    btn.addEventListener('click', () => toggleContent(targetId, btn));
  });
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
  }
  function showNext() {
    updateSlides(currentIndex + 1);
  }
  function startAutoSlide() {
    autoSlideInterval = setInterval(showNext, AUTO_SLIDE_DELAY);
  }
  function resetAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    startAutoSlide();
  }
  prevBtn?.addEventListener('click', () => {
    showPrev();
    resetAutoSlide();
  });
  nextBtn?.addEventListener('click', () => {
    showNext();
    resetAutoSlide();
  });
  indicators.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      updateSlides(i);
      resetAutoSlide();
    });
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        showPrev();
        resetAutoSlide();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        showNext();
        resetAutoSlide();
      }
    });
  });
  updateSlides(0);
  startAutoSlide();
});
function toggleContent(id, btn) {
  const content = document.getElementById(id);
  if (!content || !btn) return;
  const isHidden = content.classList.contains('hidden');
  if (isHidden) {
    content.classList.remove('hidden');
    content.style.maxHeight = '0px';
    requestAnimationFrame(() => {
      content.style.transition = 'max-height 0.35s ease';
      content.style.maxHeight = content.scrollHeight + 'px';
    });
    btn.setAttribute('aria-expanded', 'true');
    btn.textContent = '收起';
  } else {
    content.style.maxHeight = content.scrollHeight + 'px';
    requestAnimationFrame(() => {
      content.style.transition = 'max-height 0.35s ease';
      content.style.maxHeight = '0';
    });
    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = '了解更多';
    const onTransitionEnd = () => {
      content.classList.add('hidden');
      content.style.maxHeight = '';
      content.style.transition = '';
      content.removeEventListener('transitionend', onTransitionEnd);
    };
    content.addEventListener('transitionend', onTransitionEnd);
  }
}
