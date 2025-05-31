// 1. 汉堡菜单切换导航显示隐藏
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('primary-navigation');

  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
    navToggle.setAttribute('aria-expanded', !expanded);
    navMenu.classList.toggle('open');
  });
});

// 2. 了解更多按钮展开/收起
function toggleContent(id, btn) {
  const content = document.getElementById(id);
  const isHidden = content.style.display === 'none' || content.style.display === '';
  if (isHidden) {
    content.style.display = 'block';
    btn.setAttribute('aria-expanded', 'true');
    btn.textContent = '收起';
  } else {
    content.style.display = 'none';
    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = '了解更多';
  }
}

// 3. 轮播图功能（简单实现）
document.addEventListener('DOMContentLoaded', () => {
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  const slides = document.querySelectorAll('.slider-image');
  const indicators = document.querySelectorAll('.indicator');
  let currentIndex = 0;

  function updateSlides(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
      indicators[i].classList.toggle('active', i === index);
      indicators[i].setAttribute('aria-selected', i === index ? 'true' : 'false');
    });
    currentIndex = index;
  }

  prevBtn.addEventListener('click', () => {
    let index = currentIndex - 1;
    if (index < 0) index = slides.length - 1;
    updateSlides(index);
  });

  nextBtn.addEventListener('click', () => {
    let index = currentIndex + 1;
    if (index >= slides.length) index = 0;
    updateSlides(index);
  });

  indicators.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      updateSlides(i);
    });
  });

  // 初始化
  updateSlides(0);
});
