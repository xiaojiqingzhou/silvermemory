(() => {
  // ====== 导航汉堡按钮和菜单元素 ======
  const navToggleBtn = document.querySelector('.menu-toggle');  // 对应CSS中.menu-toggle类名
  const navMenu = document.querySelector('.page-nav ul');       // 导航菜单列表

  if (navToggleBtn && navMenu) {
    // 点击汉堡按钮切换菜单显示
    navToggleBtn.addEventListener('click', () => {
      const expanded = navToggleBtn.getAttribute('aria-expanded') === 'true';
      navToggleBtn.setAttribute('aria-expanded', String(!expanded));
      navToggleBtn.classList.toggle('active');
      navMenu.classList.toggle('active');  // CSS中通过.active控制显示
    });

    // 点击菜单内链接后关闭菜单（适用于小屏幕）
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) { // 和CSS媒体查询保持一致
          navToggleBtn.setAttribute('aria-expanded', 'false');
          navToggleBtn.classList.remove('active');
          navMenu.classList.remove('active');
        }
      });
    });

    // 监听窗口尺寸变化，自动关闭菜单防止状态异常
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        navToggleBtn.setAttribute('aria-expanded', 'false');
        navToggleBtn.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }

  // ====== 轮播图相关元素 ======
  const slider = document.querySelector('.image-slider');
  if (!slider) return;

  const images = slider.querySelectorAll('.slider-image');
  const prevBtn = slider.querySelector('.slider-btn.prev');
  const nextBtn = slider.querySelector('.slider-btn.next');
  const indicators = slider.querySelectorAll('.slider-indicators button');

  let currentIndex = 0;
  const total = images.length;

  // 自动轮播相关
  let autoPlayTimer = null;
  const AUTO_PLAY_INTERVAL = 5000;

  // 显示指定索引的图片及高亮指示器
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

  // 自动轮播启动
  function startAutoPlay() {
    if (autoPlayTimer) return;
    autoPlayTimer = setInterval(() => {
      showSlide(currentIndex + 1);
    }, AUTO_PLAY_INTERVAL);
  }

  // 自动轮播停止
  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  }

  // 上一张
  prevBtn.addEventListener('click', () => {
    showSlide(currentIndex - 1);
    stopAutoPlay();
    startAutoPlay();
  });

  // 下一张
  nextBtn.addEventListener('click', () => {
    showSlide(currentIndex + 1);
    stopAutoPlay();
    startAutoPlay();
  });

  // 点击指示器切换图片 & 支持键盘操作
  indicators.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      showSlide(i);
      stopAutoPlay();
      startAutoPlay();
    });
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showSlide(i);
        stopAutoPlay();
        startAutoPlay();
      }
    });
  });

  // 鼠标进入轮播区域暂停自动轮播，离开恢复
  slider.addEventListener('mouseenter', stopAutoPlay);
  slider.addEventListener('mouseleave', startAutoPlay);

  // 初始化显示第一张图片，启动自动轮播
  showSlide(0);
  startAutoPlay();

  // ====== 浮动聊天按钮事件绑定（假设存在CozeWebSDK） ======
  const floatingBtn = document.querySelector('#coze-chat-btn');
  if (floatingBtn && window.CozeWebSDK && CozeWebSDK.WebChatClient) {
    let clickTimeout = null;
    floatingBtn.addEventListener('click', () => {
      if (clickTimeout) return; // 防抖
      CozeWebSDK.WebChatClient.open();
      clickTimeout = setTimeout(() => clickTimeout = null, 500);
    });
  }
})();
