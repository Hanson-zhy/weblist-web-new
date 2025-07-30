// 工具函数
const utils = {
  // 格式化文件大小
  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  // 格式化日期
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  // 获取文件图标
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
  },

  // 防抖函数
  debounce(func, wait = 300) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }
};