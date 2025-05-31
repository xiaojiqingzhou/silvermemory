// 1. 汉堡菜单切换导航显示隐藏
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('primary-navigation');

  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
    navToggle.setAttribute('aria-expanded', !expanded);
    navMenu.classList.toggle('open');
    navToggle.classList.toggle('active'); // 切换汉堡动画
  });
});

// 2. 了解更多按钮展开/收起
function toggleContent(id, btn) {
  const content = document.getElementById(id);
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
}

// 3. 轮播图功能（含键盘无障碍及自动轮播暂停）
document.addEventListener('DOMContentLoaded', () => {
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  const slides = document.querySelectorAll('.slider-image');
  const indicators = document.querySelectorAll('.slider-indicators button');
  let currentIndex = 0;
  let autoSlideInterval = null;
  const AUTO_SLIDE_DELAY = 5000;

  function updateSlides(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
      indicators[i].classList.toggle('active', i === index);
      indicators[i].setAttribute('aria-selected', i === index ? 'true' : 'false');
      indicators[i].setAttribute('tabindex', i === index ? '0' : '-1');
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

  prevBtn.addEventListener('click', () => {
    showPrev();
    resetAutoSlide();
  });

  nextBtn.addEventListener('click', () => {
    showNext();
    resetAutoSlide();
  });

  indicators.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      updateSlides(i);
      resetAutoSlide();
    });
    // 支持键盘左右键切换
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

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      showNext();
    }, AUTO_SLIDE_DELAY);
  }

  function resetAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
    }
    startAutoSlide();
  }

  // 初始化
  updateSlides(0);
  startAutoSlide();
});
