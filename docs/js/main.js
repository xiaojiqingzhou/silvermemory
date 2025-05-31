document.addEventListener('DOMContentLoaded', () => {
  // 1. 汉堡菜单切换导航显示隐藏
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('primary-navigation');

  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !expanded);
    navMenu.classList.toggle('open');
    navToggle.classList.toggle('active'); // 切换汉堡动画

    // 点击汉堡时关闭所有展开内容（如果你有多个展开块，可以根据需要调整）
    document.querySelectorAll('.expandable-content').forEach(content => {
      content.classList.add('hidden');
    });
    document.querySelectorAll('.expand-btn').forEach(btn => {
      btn.setAttribute('aria-expanded', 'false');
      btn.textContent = '了解更多';
    });
  });

  // 2. 了解更多按钮展开/收起，支持多个按钮
  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('.expand-btn');
    if (!btn) return;

    const targetId = btn.getAttribute('aria-controls');
    if (!targetId) return;

    const content = document.getElementById(targetId);
    if (!content) return;

    const isHidden = content.classList.contains('hidden');
    if (isHidden) {
      content.classList.remove('hidden');
      btn.setAttribute('aria-expanded', 'true');
      btn.textContent = '收起';
    } else {
      content.classList.add('hidden');
      btn.setAttribute('aria-expanded', 'false');
      btn.textContent = '了解更多';
    }
  });

  // 3. 轮播图功能（含键盘无障碍及自动轮播暂停）
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  const slides = document.querySelectorAll('.slider-image');
  const indicators = document.querySelectorAll('.slider-indicators button');
  let currentIndex = 0;
  let autoSlideInterval = null;
  const AUTO_SLIDE_DELAY = 5000;

  function updateSlides(index) {
    slides.forEach((slide, i) => {
      const isActive = i === index;
      slide.classList.toggle('active', isActive);
      indicators[i].classList.toggle('active', isActive);
      indicators[i].setAttribute('aria-selected', isActive ? 'true' : 'false');
      indicators[i].setAttribute('tabindex', isActive ? '0' : '-1');
    });
    currentIndex = index;
  }

  function showPrev() {
    let index = currentIndex - 1;
    if (index < 0) index = slides.length - 1;
    updateSlides(index);
  }

  function showNext() {
    let index = currentIndex + 1;
    if (index >= slides.length) index = 0;
    updateSlides(index);
  }

  function resetAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
    }
    startAutoSlide();
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      showNext();
    }, AUTO_SLIDE_DELAY);
  }

  // 按钮点击事件
  prevBtn.addEventListener('click', () => {
    showPrev();
    resetAutoSlide();
  });

  nextBtn.addEventListener('click', () => {
    showNext();
    resetAutoSlide();
  });

  // 指示器点击和键盘事件
  indicators.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      updateSlides(i);
      resetAutoSlide();
    });
    btn.addEventListener('keydown', e => {
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

  // 鼠标悬停和焦点管理暂停自动轮播
  const slider = document.querySelector('.slider');
  if (slider) {
    slider.addEventListener('mouseenter', () => {
      if (autoSlideInterval) clearInterval(autoSlideInterval);
    });
    slider.addEventListener('mouseleave', () => {
      resetAutoSlide();
    });
    slider.addEventListener('focusin', () => {
      if (autoSlideInterval) clearInterval(autoSlideInterval);
    });
    slider.addEventListener('focusout', () => {
      resetAutoSlide();
    });
  }

  // 初始化
  updateSlides(0);
  startAutoSlide();
});
