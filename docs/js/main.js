// main.js
document.addEventListener('DOMContentLoaded', () => {
  /* ==================== 1. 汉堡菜单展开/收起 ==================== */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu'); // 注意：HTML 中 <ul id="navMenu"> 对应此处

  if (navToggle && navMenu) {
    // 初始化 navMenu 隐藏高度和过渡
    navMenu.style.overflow = 'hidden';
    navMenu.style.maxHeight = '0';
    navMenu.style.transition = 'max-height 0.35s ease';

    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      // 切换 aria-expanded
      navToggle.setAttribute('aria-expanded', !expanded);
      // 切换汉堡按钮的 active 动画类
      navToggle.classList.toggle('active');

      if (!expanded) {
        // 展开导航
        navMenu.classList.add('open');
        // 动态设置 maxHeight 为内容的 scrollHeight，以触发过渡
        navMenu.style.maxHeight = navMenu.scrollHeight + 'px';
      } else {
        // 折叠导航：先将 maxHeight 设为 0
        navMenu.style.maxHeight = '0';
        // 在过渡结束后移除 .open 类，避免后续冲突
        const onTransitionEnd = () => {
          navMenu.classList.remove('open');
          navMenu.removeEventListener('transitionend', onTransitionEnd);
        };
        navMenu.addEventListener('transitionend', onTransitionEnd);
      }
    });
  }


  /* ==================== 2. “了解更多”按钮展开/折叠 ==================== */
  // 要求：HTML 中对应内容容器有 class="more-content hidden"，或者带 hidden 属性
  window.toggleContent = function (id, btn) {
    const content = document.getElementById(id);
    if (!content || !btn) return;

    // 使用 class "hidden" 作为隐藏标志
    const isHidden = content.classList.contains('hidden');

    if (isHidden) {
      // 1) 去掉 hidden
      content.classList.remove('hidden');
      // 2) 先将 maxHeight 设为 0，以保证从折叠到展开的过渡效果
      content.style.maxHeight = '0px';
      content.style.opacity = '1'; // 立即置为可见，后续通过 max-height 过渡

      // 3) 在下一帧触发过渡，将 maxHeight 设置为 scrollHeight
      requestAnimationFrame(() => {
        content.style.transition = 'max-height 0.35s ease, opacity 0.35s ease';
        content.style.maxHeight = content.scrollHeight + 'px';
      });

      // 更新按钮文字与 aria-expanded
      btn.setAttribute('aria-expanded', 'true');
      btn.textContent = '收起';

    } else {
      // 1) 获取当前内容的高度，准备从展开状态折叠
      content.style.maxHeight = content.scrollHeight + 'px';
      content.style.opacity = '1';

      // 2) 在下一帧（requestAnimationFrame）触发折叠
      requestAnimationFrame(() => {
        content.style.transition = 'max-height 0.35s ease, opacity 0.35s ease';
        content.style.maxHeight = '0';
        content.style.opacity = '0';
      });

      // 更新按钮文字与 aria-expanded
      btn.setAttribute('aria-expanded', 'false');
      btn.textContent = '了解更多';

      // 3) 过渡结束后重新加回 hidden 类，并清理行内样式
      const onTransitionEnd = () => {
        content.classList.add('hidden');
        content.style.maxHeight = '';
        content.style.opacity = '';
        content.style.transition = '';
        content.removeEventListener('transitionend', onTransitionEnd);
      };
      content.addEventListener('transitionend', onTransitionEnd);
    }
  };


  /* ==================== 3. 轮播图相关逻辑 ==================== */
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  const slides = document.querySelectorAll('.slider-image');
  const indicators = document.querySelectorAll('.slider-indicators button');
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

  // 绑定左右按钮
  prevBtn?.addEventListener('click', () => {
    showPrev();
    resetAutoSlide();
  });
  nextBtn?.addEventListener('click', () => {
    showNext();
    resetAutoSlide();
  });

  // 绑定指示器（可用左右键切换）
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

  // 初始化轮播
  updateSlides(0);
  startAutoSlide();
});
