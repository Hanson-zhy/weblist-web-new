// 主应用逻辑
class App {
  constructor() {
    this.layoutManager = new LayoutManager();
    this.themeManager = new ThemeManager();
    this.init();
  }

  init() {
    // 初始化应用
    document.addEventListener('DOMContentLoaded', () => {
      console.log('应用初始化完成');
    });
  }
}

// 初始化应用
window.addEventListener('load', () => new App());