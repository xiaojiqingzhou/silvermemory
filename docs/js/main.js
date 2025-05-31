document.addEventListener('DOMContentLoaded', () => {
  // 汉堡菜单相关
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('primary-navigation');
  const navLinks = navMenu.querySelectorAll('a');

  // 初始样式与切换函数
  function closeMenu() {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.classList.remove('active');
    navMenu.classList.remove('open');
    navMenu.style.maxHeight = '0';
  }
  function openMenu() {
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.classList.add('active');
    navMenu.classList.add('open');
    navMenu.style.maxHeight = navMenu.scrollHeight + 'px';
  }

  // 监听汉堡菜单点击
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      navMenu.style.maxHeight = '0';
      const onTransitionEnd = () => {
        navMenu.classList.remove('open');
        navMenu.removeEventListener('transitionend', onTransitionEnd);
      };
      navMenu.addEventListener('transitionend', onTransitionEnd);
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.classList.remove('active');
    } else {
      openMenu();
    }
  });

  // 响应式：窗口变化时控制菜单显示和汉堡按钮
  function handleResize() {
    if (window.innerWidth < 768) {
      navMenu.style.overflow = 'hidden';
      if (!navMenu.classList.contains('open')) {
        navMenu.style.maxHeight = '0';
      }
      navToggle.style.display = 'flex';
      navMenu.setAttribute('aria-hidden', navToggle.getAttribute('aria-expanded') !== 'true');
    } else {
      navMenu.style.maxHeight = null;
      navMenu.style.overflow = null;
      navToggle.style.display = 'none';
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.classList.remove('active');
      navMenu.removeAttribute('aria-hidden');
    }
  }
  handleResize();
  window.addEventListener('resize', handleResize);

  // 平滑滚动效果
  navLinks.forEach(link => {
    if (link.hash) {
      link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          // 如果是移动端，点击链接后关闭菜单
          if (window.innerWidth < 768 && navMenu.classList.contains('open')) {
            navToggle.click();
          }
        }
      });
    }
  });

  // PC端导航悬停高亮（视觉层次强化）
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      navLinks.forEach(l => {
        if (l !== link) l.style.opacity = '0.6';
        else l.style.opacity = '1';
      });
    });
    link.addEventListener('mouseleave', () => {
      navLinks.forEach(l => (l.style.opacity = '1'));
    });
  });

  // 标题与正文字体层级优化（动态样式调整）
  // 这里假设标题用h1,h2,h3，正文用p
  const allTitles = document.querySelectorAll('h1, h2, h3');
  allTitles.forEach(title => {
    title.style.fontWeight = '700';
    title.style.color = '#cc7000'; // 深暖橙色
  });
  const allParagraphs = document.querySelectorAll('p');
  allParagraphs.forEach(p => {
    p.style.fontWeight = '400';
    p.style.color = '#4a4a4a'; // 深灰色，更易读
  });
});
