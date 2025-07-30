// 顶部导航栏组件
class Header {
  constructor() {
    this.headerElement = document.querySelector('header');
    this.themeToggle = document.getElementById('theme-toggle');
    this.searchInput = document.querySelector('input[placeholder="搜索文件..."]');
    this.init();
  }

  init() {
    this.setHeaderHeight();
    this.bindEvents();
    this.applyThemeIcon();
  }

  setHeaderHeight() {
    // 设置顶栏高度为60px，符合设计要求
    this.headerElement.style.height = '60px';
  }

  bindEvents() {
    // 主题切换按钮事件
    this.themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      this.applyThemeIcon();
    });

    // 搜索框交互效果
    this.searchInput.addEventListener('focus', () => {
      this.searchInput.parentElement.classList.add('ring-2', 'ring-blue-500');
    });

    this.searchInput.addEventListener('blur', () => {
      this.searchInput.parentElement.classList.remove('ring-2', 'ring-blue-500');
    });
  }

  applyThemeIcon() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const iconElement = this.themeToggle.querySelector('i');
    
    if (currentTheme === 'dark') {
      iconElement.classList.remove('fa-moon');
      iconElement.classList.add('fa-sun');
    } else {
      iconElement.classList.remove('fa-sun');
      iconElement.classList.add('fa-moon');
    }
  }
}

// 初始化头部组件
document.addEventListener('DOMContentLoaded', () => new Header());