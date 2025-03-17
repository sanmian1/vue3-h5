// src/api/index.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VITE_API_BASE_URL, // 统一管理域名
  timeout: 10000,
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 可以在这里添加 token 等
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;