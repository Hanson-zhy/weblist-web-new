// API接口封装
class ApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl || '/api';
  }

  // 文件列表请求
  async getFiles(path = '/') {
    try {
      const response = await fetch(`${this.baseUrl}/files?path=${encodeURIComponent(path)}`);
      if (!response.ok) throw new Error('网络请求失败');
      return await response.json();
    } catch (error) {
      console.error('获取文件列表失败:', error);
      return [];
    }
  }

  // 文件上传请求
  async uploadFile(file, path = '/') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', path);

    try {
      const response = await fetch(`${this.baseUrl}/upload`, {
        method: 'POST',
        body: formData
      });
      if (!response.ok) throw new Error('上传失败');
      return await response.json();
    } catch (error) {
      console.error('文件上传失败:', error);
      return null;
    }
  }
}

// 实例化API服务
const api = new ApiService();