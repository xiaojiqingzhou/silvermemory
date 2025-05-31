document.addEventListener('DOMContentLoaded', () => {
  // 汉堡菜单相关
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('primary-navigation');

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

  // 了解更多按钮展开/收起，平滑过渡版
  window.toggleContent = function(id, btn) {
    const content = document.getElementById(id);
    const isHidden = content.classList.contains('hidden');

    if (isHidden) {
      content.classList.remove('hidden');
      // 先设置 max-height 为0，再触发过渡到实际高度
      content.style.maxHeight = '0';
      // 浏览器渲染后触发过渡
      requestAnimationFrame(() => {
        content.style.transition = 'max-height 0.35s ease';
        content.style.maxHeight = content.scrollHeight + 'px';
      });
      btn.setAttribute('aria-expanded', 'true');
      btn.textContent = '收起';
    } else {
      content.style.maxHeight = content.scrollHeight + 'px';
      // 先触发浏览器渲染，保证过渡正常执行
      requestAnimationFrame(() => {
        content.style.transition = 'max-height 0.35s ease';
        content.style.maxHeight = '0';
      });
      btn.setAttribute('aria-expanded', 'false');
      btn.textContent = '了解更多';

      const onTransitionEnd = () => {
        content.classList.add('hidden');
        content.removeEventListener('transitionend', onTransitionEnd);
      };
      content.addEventListener('transitionend', onTransitionEnd);
    }
  };

  // 轮播图相关（保持不变）
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
    autoSlideInterval = setInterval(showNext, AUTO_SLIDE_DELAY);
  }

  function resetAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
    }
    startAutoSlide();
  }

  updateSlides(0);
  startAutoSlide();
});
