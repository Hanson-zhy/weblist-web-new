// 状态管理
class StateManager {
  constructor() {
    this.state = {
      currentPath: '/',
      files: [],
      selectedFiles: [],
      theme: 'light',
      viewMode: 'list',
      sidebarCollapsed: false
    };
    this.listeners = new Map();
    this.loadFromLocalStorage();
  }

  // 获取状态
  getState() {
    return { ...this.state };
  }

  // 设置状态
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.saveToLocalStorage();
    this.notifyListeners();
  }

  // 保存到本地存储
  saveToLocalStorage() {
    localStorage.setItem('appState', JSON.stringify(this.state));
  }

  // 从本地存储加载
  loadFromLocalStorage() {
    const saved = localStorage.getItem('appState');
    if (saved) this.state = { ...this.state, ...JSON.parse(saved) };
  }

  // 注册监听器
  on(key, callback) {
    if (!this.listeners.has(key)) this.listeners.set(key, []);
    this.listeners.get(key).push(callback);
  }

  // 通知监听器
  notifyListeners() {
    this.listeners.forEach((callbacks) => {
      callbacks.forEach(callback => callback(this.getState()));
    });
  }
}

// 实例化状态管理器
const stateManager = new StateManager();