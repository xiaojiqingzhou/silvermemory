(() => {
  // 🔷 汉堡菜单交互
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // 小屏点击链接关闭菜单
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.classList.remove('active');
          navMenu.classList.remove('active');
        }
      });
    });
  }

  // 🔷 折叠区域平滑展开/收起
  const toggleButtons = document.querySelectorAll('.btn-toggle-more');
  toggleButtons.forEach(btn => {
    const targetId = btn.getAttribute('aria-controls');
    const content = document.getElementById(targetId);

    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      btn.textContent = expanded ? '了解更多' : '收起';
      content.classList.toggle('hidden');
    });
  });

  // 🔷 轮播图切换逻辑
  const slider = document.querySelector('.image-slider');
  if (slider) {
    const images = slider.querySelectorAll('.slider-image');
    const prevBtn = slider.querySelector('.slider-btn.prev');
    const nextBtn = slider.querySelector('.slider-btn.next');
    const indicators = slider.querySelectorAll('.slider-indicators button');

    let currentIndex = 0;

    const showSlide = (index) => {
      if (index < 0) index = images.length - 1;
      if (index >= images.length) index = 0;
      images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
      });
      indicators.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
        dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
      });
      currentIndex = index;
    };

    prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));
    indicators.forEach((dot, i) => {
      dot.addEventListener('click', () => showSlide(i));
    });

    showSlide(0);

    // 可选：自动轮播
    setInterval(() => showSlide(currentIndex + 1), 7000);
  }

  // 🔷 Coze SDK 悬浮按钮调用（如页面引入 SDK，可启用）
  const cozeBtn = document.querySelector('#coze-chat-btn');
  if (cozeBtn && window.CozeWebSDK && CozeWebSDK.WebChatClient) {
    cozeBtn.addEventListener('click', () => {
      CozeWebSDK.WebChatClient.open();
    });
  }
})();
