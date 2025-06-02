document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !expanded);
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
  });

  // 展开折叠“了解更多”
  document.querySelectorAll('.btn-toggle-more').forEach(button => {
    const targetId = button.getAttribute('aria-controls');
    const target = document.getElementById(targetId);
    button.addEventListener('click', () => {
      const isOpen = target.classList.contains('show');
      button.setAttribute('aria-expanded', !isOpen);
      button.textContent = isOpen ? '了解更多' : '收起';
      target.hidden = false;
      target.classList.toggle('show');
    });
  });

  // 轮播图
  const slides = document.querySelectorAll('.slider-image');
  const indicators = document.querySelectorAll('.indicator');
  let current = 0;
  let interval;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
      indicators[i].classList.toggle('active', i === index);
    });
    current = index;
  }

  function nextSlide() {
    showSlide((current + 1) % slides.length);
  }

  function prevSlide() {
    showSlide((current - 1 + slides.length) % slides.length);
  }

  document.querySelector('.slider-btn.next')?.addEventListener('click', () => {
    nextSlide();
    resetAuto();
  });

  document.querySelector('.slider-btn.prev')?.addEventListener('click', () => {
    prevSlide();
    resetAuto();
  });

  indicators.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      showSlide(index);
      resetAuto();
    });
  });

  function startAuto() {
    interval = setInterval(nextSlide, 5000);
  }

  function stopAuto() {
    clearInterval(interval);
  }

  function resetAuto() {
    stopAuto();
    startAuto();
  }

  const slider = document.querySelector('.image-slider');
  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);

  showSlide(0);
  startAuto();
});
