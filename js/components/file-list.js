// 文件列表组件
class FileList {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.stateManager = window.stateManager;
    this.selectedFileId = null;
    this.init();
  }

  init() {
    this.bindEvents();
    this.renderFiles();
    this.stateManager.on('files', () => this.renderFiles());
    this.dateFilter = { start: null, end: null };
    this.initDateFilter();
}

  bindEvents() {
    // 文件点击事件委托
    this.container.addEventListener('click', (e) => {
      const fileItem = e.target.closest('.file-item');
      if (fileItem) {
        const fileId = fileItem.dataset.id;
        this.selectFile(fileId);
      }
    });

    // 文件操作按钮事件
    this.container.addEventListener('click', (e) => {
      const actionBtn = e.target.closest('[data-action]');
      if (actionBtn) {
        e.stopPropagation();
        const fileId = actionBtn.closest('.file-item').dataset.id;
        const action = actionBtn.dataset.action;
        this.handleFileAction(fileId, action);
      }
    });
  }

  initDateFilter() {
    const container = document.getElementById('date-filter-container');
    const dropdown = document.getElementById('date-filter-dropdown');
    const applyBtn = document.getElementById('apply-date-filter');
    const resetBtn = document.getElementById('reset-date-filter');
    const dateInputs = dropdown.querySelectorAll('input[type="date"]');

    // 切换下拉菜单显示
    container.querySelector('button').addEventListener('click', () => {
      dropdown.classList.toggle('hidden');
    });

    // 点击外部关闭下拉菜单
    document.addEventListener('click', (e) => {
      if (!container.contains(e.target)) {
        dropdown.classList.add('hidden');
      }
    });

    // 应用筛选
    applyBtn.addEventListener('click', () => {
      this.dateFilter.start = dateInputs[0].value ? new Date(dateInputs[0].value) : null;
      this.dateFilter.end = dateInputs[1].value ? new Date(dateInputs[1].value) : null;
      dropdown.classList.add('hidden');
      this.renderFiles();
    });

    // 重置筛选
    resetBtn.addEventListener('click', () => {
      dateInputs[0].value = '';
      dateInputs[1].value = '';
      this.dateFilter.start = null;
      this.dateFilter.end = null;
      dropdown.classList.add('hidden');
      this.renderFiles();
    });
  }

  filterFiles(files) {
    if (!this.dateFilter.start && !this.dateFilter.end) return files;

    return files.filter(file => {
      const fileDate = new Date(file.modified);
      const hasStart = this.dateFilter.start && fileDate >= this.dateFilter.start;
      const hasEnd = this.dateFilter.end && fileDate <= this.dateFilter.end;

      if (this.dateFilter.start && this.dateFilter.end) {
        return hasStart && hasEnd;
      } else if (this.dateFilter.start) {
        return hasStart;
      } else if (this.dateFilter.end) {
        return hasEnd;
      }
      return true;
    });
  }

  renderFiles() {
    let files = this.stateManager.getState().files;
    // 应用日期筛选
    files = this.filterFiles(files);
    this.container.innerHTML = '';

    if (files.length === 0) {
      this.renderEmptyState();
      return;
    }

    files.forEach(file => {
      const fileItem = document.createElement('div');
      fileItem.className = `file-item ${this.selectedFileId === file.id ? 'selected' : ''}`;
      fileItem.dataset.id = file.id;
      fileItem.dataset.name = file.name;

      fileItem.innerHTML = `
        <div class="file-icon"><i class="fas ${this.getFileIcon(file.type)}"></i></div>
        <div class="file-info">
          <div class="file-name">${file.name}</div>
          <div class="file-meta">
            <span>${file.size ? utils.formatFileSize(file.size) : ''}</span>
            <span>${utils.formatDate(file.modified)}</span>
          </div>
        </div>
        <div class="file-actions">
          <button data-action="download" title="下载"><i class="fas fa-download"></i></button>
          <button data-action="copy-link" title="复制链接"><i class="fas fa-link"></i></button>
          <button data-action="more" title="更多"><i class="fas fa-ellipsis-v"></i></button>
        </div>
      `;

      this.container.appendChild(fileItem);
    });
  }

  renderEmptyState() {
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state text-center py-12';
    emptyState.innerHTML = `
      <div class="text-gray-400 mb-4"><i class="fas fa-folder-open text-5xl"></i></div>
      <h3 class="text-lg font-medium text-gray-700 dark:text-gray-300">文件夹为空</h3>
      <p class="text-gray-500 dark:text-gray-400 mt-1">上传文件或创建新文件夹</p>
      <button id="upload-empty-state" class="mt-4 btn btn-primary">
        <i class="fas fa-upload mr-2"></i>上传文件
      </button>
    `;
    this.container.appendChild(emptyState);
  }

  selectFile(fileId) {
    this.selectedFileId = fileId === this.selectedFileId ? null : fileId;
    this.renderFiles();
    this.stateManager.setState({ selectedFileId: this.selectedFileId });
  }

  handleFileAction(fileId, action) {
    const file = this.stateManager.getState().files.find(f => f.id === fileId);
    if (!file) return;

    switch(action) {
      case 'download':
        this.downloadFile(file);
        break;
      case 'copy-link':
        this.copyLink(file);
        break;
      case 'more':
        this.showMoreOptions(file);
        break;
    }
  }

  downloadFile(file) {
    console.log('Downloading file:', file);
    // 实现下载逻辑
  }

  copyLink(file) {
    const link = `https://example.com/files/${file.id}`;
    navigator.clipboard.writeText(link).then(() => {
      this.showNotification('链接已复制到剪贴板');
    });
  }

  showMoreOptions(file) {
    console.log('More options for file:', file);
    // 实现更多选项逻辑
  }

  showNotification(message) {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-gray-800 text-white px-4 py-2 rounded shadow-lg z-50 animate-fadeIn';
    notification.textContent = message;
    document.body.appendChild(notification);

    // 3秒后移除通知
    setTimeout(() => {
      notification.classList.add('animate-fadeOut');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  getFileIcon(fileType) {
    const icons = {
      folder: 'fa-folder',
      document: 'fa-file-alt',
      image: 'fa-file-image',
      video: 'fa-file-video',
      audio: 'fa-file-audio',
      pdf: 'fa-file-pdf',
      zip: 'fa-file-archive',
      code: 'fa-file-code'
    };
    return icons[fileType] || 'fa-file';
  }
}

// 初始化文件列表组件
window.addEventListener('load', () => {
  if (document.getElementById('file-container')) {
    window.fileList = new FileList('file-container');
  }
});