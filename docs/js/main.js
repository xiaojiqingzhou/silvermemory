// 立即执行，避免全局污染
(() => {
  const navToggleBtn = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('primary-navigation');

  // 切换导航菜单（汉堡）
  navToggleBtn.addEventListener('click', () => {
    const expanded = navToggleBtn.getAttribute('aria-expanded') === 'true';
    navToggleBtn.setAttribute('aria-expanded', String(!expanded));
    navToggleBtn.classList.toggle('active');
    navMenu.classList.toggle('open');
  });

  // 点击导航菜单内的链接后自动关闭（小屏幕）
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 720) {
        navToggleBtn.setAttribute('aria-expanded', 'false');
        navToggleBtn.classList.remove('active');
        navMenu.classList.remove('open');
      }
    });
  });

  // 轮播图逻辑
  const slider = document.querySelector('.image-slider');
  if (!slider) return;

  const images = slider.querySelectorAll('.slider-image');
  const prevBtn = slider.querySelector('.slider-btn.prev');
  const nextBtn = slider.querySelector('.slider-btn.next');
  const indicators = slider.querySelectorAll('.indicator');

  let currentIndex = 0;
  const total = images.length;

  // 切换图片函数
  function showSlide(index) {
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    images.forEach((img, i) => {
      img.classList.toggle('active', i === index);
    });
    indicators.forEach((btn, i) => {
      btn.classList.toggle('active', i === index);
      btn.setAttribute('aria-selected', i === index ? 'true' : 'false');
    });
    currentIndex = index;
  }

  // 上一张
  prevBtn.addEventListener('click', () => {
    showSlide(currentIndex - 1);
  });

  // 下一张
  nextBtn.addEventListener('click', () => {
    showSlide(currentIndex + 1);
  });

  // 点击指示器跳转
  indicators.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      showSlide(i);
    });
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showSlide(i);
      }
    });
  });

  // 初始化显示第一张
  showSlide(0);

  // 悬浮按钮打开智能体聊天
  const floatingBtn = document.querySelector('.floating-button');
  if (floatingBtn && window.CozeWebSDK) {
    floatingBtn.addEventListener('click', () => {
      // 这里假设CozeWebSDK.WebChatClient实例有open()方法，或者触发聊天窗口
      // 根据官方文档调整调用方式，这里示例：
      CozeWebSDK.WebChatClient.open();
    });
  }
})();
