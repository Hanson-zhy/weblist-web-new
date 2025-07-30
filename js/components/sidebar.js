// 侧边栏组件
class Sidebar {
  constructor() {
    this.sidebarElement = document.getElementById('sidebar');
    this.toggleButton = document.getElementById('sidebar-toggle');
    this.isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    this.init();
  }

  init() {
    this.applyCollapsedState();
    this.bindEvents();
    this.checkScreenSize();
  }

  bindEvents() {
    // 侧边栏切换事件
    this.toggleButton.addEventListener('click', () => this.toggle());
    
    // 窗口大小变化事件
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  toggle() {
    this.isCollapsed = !this.isCollapsed;
    this.applyCollapsedState();
    localStorage.setItem('sidebarCollapsed', this.isCollapsed);
  }

  applyCollapsedState() {
    if (this.isCollapsed) {
      this.sidebarElement.classList.add('collapsed');
      this.sidebarElement.style.width = '60px';
      document.querySelectorAll('#sidebar span').forEach(el => el.style.display = 'none');
    } else {
      this.sidebarElement.classList.remove('collapsed');
      this.sidebarElement.style.width = '240px';
      document.querySelectorAll('#sidebar span').forEach(el => el.style.display = 'inline');
    }
  }

  checkScreenSize() {
    // 移动端自动折叠侧边栏
    if (window.innerWidth < 768) {
      this.isCollapsed = true;
      this.applyCollapsedState();
    } else {
      // 恢复保存的状态
      this.isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
      this.applyCollapsedState();
    }
  }
}

// 初始化侧边栏组件
document.addEventListener('DOMContentLoaded', () => new Sidebar());