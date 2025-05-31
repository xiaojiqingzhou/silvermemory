(() => {
  // ====== 导航汉堡按钮和菜单元素 ======
  const navToggleBtn = document.querySelector('.nav-toggle');  // 对应CSS中.nav-toggle类名
  const navMenu = document.querySelector('.page-nav ul');       // 导航菜单列表

  if (navToggleBtn && navMenu) {
    navToggleBtn.addEventListener('click', () => {
      const expanded = navToggleBtn.getAttribute('aria-expanded') === 'true';
      navToggleBtn.setAttribute('aria-expanded', String(!expanded));
      navToggleBtn.classList.toggle('active');
      navMenu.classList.toggle('open');  // CSS中通过.open控制显示
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) { // 和CSS媒体查询保持一致
          navToggleBtn.setAttribute('aria-expanded', 'false');
          navToggleBtn.classList.remove('active');
          navMenu.classList.remove('open');
        }
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        navToggleBtn.setAttribute('aria-expanded', 'false');
        navToggleBtn.classList.remove('active');
        navMenu.classList.remove('open');
      }
    });
  }

  // ====== 轮播图相关元素 ======
  const slider = document.querySelector('.image-slider');
  if (slider) {
    const images = slider.querySelectorAll('.slider-image');
    const prevBtn = slider.querySelector('.slider-btn.prev');
    const nextBtn = slider.querySelector('.slider-btn.next');
    const indicators = slider.querySelectorAll('.slider-indicators button');

    let currentIndex = 0;
    const total = images.length;
    let autoPlayTimer = null;
    const AUTO_PLAY_INTERVAL = 5000;

    function showSlide(index) {
      if (index < 0) index = total - 1;
      if (index >= total) index = 0;
      images.forEach((img, i) => img.classList.toggle('active', i === index));
      indicators.forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
        btn.setAttribute('aria-selected', i === index ? 'true' : 'false');
      });
      currentIndex = index;
    }

    function startAutoPlay() {
      if (autoPlayTimer) return;
      autoPlayTimer = setInterval(() => {
        showSlide(currentIndex + 1);
      }, AUTO_PLAY_INTERVAL);
    }

    function stopAutoPlay() {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
    }

    prevBtn.addEventListener('click', () => {
      showSlide(currentIndex - 1);
      stopAutoPlay();
      startAutoPlay();
    });

    nextBtn.addEventListener('click', () => {
      showSlide(currentIndex + 1);
      stopAutoPlay();
      startAutoPlay();
    });

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

    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);

    showSlide(0);
    startAutoPlay();
  }

  // ====== 浮动聊天按钮事件绑定（假设存在CozeWebSDK） ======
  const floatingBtn = document.querySelector('#coze-chat-btn');
  if (floatingBtn && window.CozeWebSDK && CozeWebSDK.WebChatClient) {
    let clickTimeout = null;
    floatingBtn.addEventListener('click', () => {
      if (clickTimeout) return;
      CozeWebSDK.WebChatClient.open();
      clickTimeout = setTimeout(() => clickTimeout = null, 500);
    });
  }

  // ====== “了解更多”内容展开折叠逻辑 ======
  // 需要你的HTML结构中：
  // 1. “了解更多”按钮：class="toggle-more-btn"
  // 2. 对应内容容器：class="more-content"（与按钮对应，一般为同级或父子元素）

  const toggleButtons = document.querySelectorAll('.toggle-more-btn');

  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // 查找对应的.more-content容器，假设它是按钮的同级或父级的子元素
      // 这里采用查找同级元素方式，按需调整选择器
      let moreContent = btn.parentElement.querySelector('.more-content');
      if (!moreContent) {
        // 如果找不到，再尝试btn下一个兄弟元素
        moreContent = btn.nextElementSibling && btn.nextElementSibling.classList.contains('more-content')
          ? btn.nextElementSibling
          : null;
      }
      if (!moreContent) return;

      const isShown = moreContent.classList.toggle('show');
      btn.textContent = isShown ? '收起 ▲' : '了解更多 ▼';
      btn.setAttribute('aria-expanded', isShown);
    });
  });

})();
