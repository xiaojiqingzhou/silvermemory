document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  // 汉堡菜单切换动画与展开
  if (navToggle && navMenu) {
    navMenu.style.overflow = 'hidden';
    navMenu.style.maxHeight = '0';
    navMenu.style.transition = 'max-height 0.3s ease';

    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !expanded);
      navToggle.classList.toggle('active');

      if (!expanded) {
        navMenu.classList.add('open');
        navMenu.style.maxHeight = navMenu.scrollHeight + 'px';
      } else {
        navMenu.style.maxHeight = '0';
        navMenu.addEventListener('transitionend', () => {
          navMenu.classList.remove('open');
        }, { once: true });
      }
    });
  }

  // 了解更多
  document.querySelectorAll('.btn-toggle-more').forEach((btn) => {
    const targetId = btn.getAttribute('aria-controls');
    const content = document.getElementById(targetId);
    if (!content) return;

    content.style.maxHeight = '0';
    content.classList.add('hidden');

    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      if (!isExpanded) {
        content.classList.remove('hidden');
        requestAnimationFrame(() => {
          content.style.transition = 'max-height 0.4s ease';
          content.style.maxHeight = content.scrollHeight + 'px';
        });
        btn.setAttribute('aria-expanded', 'true');
        btn.textContent = '收起';
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
        requestAnimationFrame(() => {
          content.style.maxHeight = '0';
        });
        btn.setAttribute('aria-expanded', 'false');
        btn.textContent = '了解更多';
        content.addEventListener('transitionend', () => {
          content.classList.add('hidden');
        }, { once: true });
      }
    });
  });

  // 轮播图逻辑
  const slides = document.querySelectorAll('.slider-image');
  const indicators = document.querySelectorAll('.indicator');
  const prev = document.querySelector('.slider-btn.prev');
  const next = document.querySelector('.slider-btn.next');

  let current = 0;
  let autoSlide;

  function updateSlider(index) {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === index);
      indicators[i].classList.toggle('active', i === index);
      indicators[i].setAttribute('aria-selected', i === index);
    });
    current = index;
  }

  function nextSlide() {
    updateSlider((current + 1) % slides.length);
  }

  function prevSlide() {
    updateSlider((current - 1 + slides.length) % slides.length);
  }

  function startSlider() {
    autoSlide = setInterval(nextSlide, 5000);
  }

  function stopSlider() {
    clearInterval(autoSlide);
  }

  next?.addEventListener('click', () => { nextSlide(); stopSlider(); startSlider(); });
  prev?.addEventListener('click', () => { prevSlide(); stopSlider(); startSlider(); });
  indicators.forEach((btn, i) => btn.addEventListener('click', () => { updateSlider(i); stopSlider(); startSlider(); }));

  document.querySelector('.image-slider')?.addEventListener('mouseenter', stopSlider);
  document.querySelector('.image-slider')?.addEventListener('mouseleave', startSlider);

  updateSlider(0);
  startSlider();
});
