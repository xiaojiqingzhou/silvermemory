document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !expanded);
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
  });

  document.querySelectorAll('.btn-toggle-more').forEach(btn => {
    const targetId = btn.getAttribute('aria-controls');
    const content = document.getElementById(targetId);
    btn.addEventListener('click', () => {
      const isOpen = content.classList.contains('show');
      content.classList.toggle('show', !isOpen);
      btn.setAttribute('aria-expanded', !isOpen);
      btn.textContent = isOpen ? '了解更多' : '收起';
    });
  });

  const slides = document.querySelectorAll('.slider-image');
  const indicators = document.querySelectorAll('.indicator');
  const next = document.querySelector('.slider-btn.next');
  const prev = document.querySelector('.slider-btn.prev');
  let current = 0;
  let interval;

  function showSlide(index) {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === index);
      indicators[i].classList.toggle('active', i === index);
    });
    current = index;
  }

  function nextSlide() {
    showSlide((current + 1) % slides.length);
  }

  function prevSlideFn() {
    showSlide((current - 1 + slides.length) % slides.length);
  }

  next.addEventListener('click', () => {
    nextSlide();
    resetInterval();
  });

  prev.addEventListener('click', () => {
    prevSlideFn();
    resetInterval();
  });

  indicators.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      showSlide(i);
      resetInterval();
    });
  });

  function startInterval() {
    interval = setInterval(nextSlide, 5000);
  }

  function resetInterval() {
    clearInterval(interval);
    startInterval();
  }

  showSlide(0);
  startInterval();

  document.querySelector('.image-slider').addEventListener('mouseenter', () => clearInterval(interval));
  document.querySelector('.image-slider').addEventListener('mouseleave', startInterval);
});
