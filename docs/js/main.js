(() => {
  // 导航汉堡按钮和菜单元素
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
  }
  
function toggleText(button) {
  const moreText = button.nextElementSibling;
  const isHidden = moreText.classList.contains("hidden");

  if (isHidden) {
    moreText.classList.remove("hidden");
    button.textContent = "收起";
  } else {
    moreText.classList.add("hidden");
    button.textContent = "了解更多";
  }
}
  // 轮播图相关元素
  const slider = document.querySelector('.image-slider');
  if (!slider) return;

  // 轮播图片，图片文件放在 /images/ 目录中，img标签src属性写成 src="images/xxx.jpg"
  const images = slider.querySelectorAll('.slider-image');
  const prevBtn = slider.querySelector('.slider-btn.prev');
  const nextBtn = slider.querySelector('.slider-btn.next');
  const indicators = slider.querySelectorAll('.slider-indicators button');

  let currentIndex = 0;
  const total = images.length;

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

  // 上一张
  prevBtn.addEventListener('click', () => {
    showSlide(currentIndex - 1);
  });

  // 下一张
  nextBtn.addEventListener('click', () => {
    showSlide(currentIndex + 1);
  });

  // 点击指示器切换图片 & 支持键盘操作
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

  // 初始化显示第一张图片
  showSlide(0);

  // 浮动聊天按钮事件绑定（假设存在CozeWebSDK）
  const floatingBtn = document.querySelector('#coze-chat-btn');
  if (floatingBtn && window.CozeWebSDK && CozeWebSDK.WebChatClient) {
    floatingBtn.addEventListener('click', () => {
      CozeWebSDK.WebChatClient.open();
    });
  }
})();
